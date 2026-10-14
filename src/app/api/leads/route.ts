import { interestName, validateLead } from "@/lib/leads";

const WEBHOOK_TIMEOUT_MS = 8000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, errors: { form: "Solicitud inválida." } }, { status: 400 });
  }

  const honeypot =
    body !== null && typeof body === "object" ? (body as Record<string, unknown>).website : "";
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return Response.json({ ok: true });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }
  const { lead } = result;

  const url = process.env.LEADS_WEBHOOK_URL;
  const secret = process.env.LEADS_WEBHOOK_SECRET;
  if (!url || !secret) {
    console.error("[leads] webhook no configurado", { campaign: lead.campaign });
    return Response.json({ ok: false }, { status: 503 });
  }

  const payload = {
    secret,
    timestamp: new Date().toISOString(),
    campaign: lead.campaign,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    interest: interestName(lead.campaign, lead.interest),
    page: lead.page,
    referrer: lead.referrer,
    ...lead.utm,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    const data: unknown = await res.json().catch(() => null);
    const accepted =
      res.ok && data !== null && typeof data === "object" && (data as { ok?: unknown }).ok === true;
    if (!accepted) {
      console.error("[leads] webhook rechazó el lead", {
        campaign: lead.campaign,
        status: res.status,
      });
      return Response.json({ ok: false }, { status: 502 });
    }
  } catch (error) {
    console.error("[leads] error al llamar al webhook", {
      campaign: lead.campaign,
      error: error instanceof Error ? error.name : "unknown",
    });
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
