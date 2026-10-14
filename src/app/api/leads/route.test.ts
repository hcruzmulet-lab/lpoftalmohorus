import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const lead = {
  campaign: "optica",
  name: "Carlos Mendoza",
  phone: "0991234567",
  email: "",
  interest: "examen",
  page: "/optica",
  referrer: "",
  utm: { utm_source: "instagram" },
  website: "",
};

const request = (body: unknown) =>
  new Request("http://localhost/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubEnv("LEADS_WEBHOOK_URL", "https://script.google.com/macros/s/test/exec");
  vi.stubEnv("LEADS_WEBHOOK_SECRET", "secreto");
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  fetchMock.mockReset();
});

describe("POST /api/leads", () => {
  it("guarda un lead válido y reenvía columnas planas con el secreto", async () => {
    fetchMock.mockResolvedValue(Response.json({ ok: true }));
    const res = await POST(request(lead));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://script.google.com/macros/s/test/exec");
    const sent = JSON.parse(init.body);
    expect(sent).toMatchObject({
      secret: "secreto",
      campaign: "optica",
      name: "Carlos Mendoza",
      phone: "0991234567",
      interest: "Examen visual",
      utm_source: "instagram",
      utm_medium: "",
    });
    expect(typeof sent.timestamp).toBe("string");
  });

  it("responde 400 con datos inválidos", async () => {
    const res = await POST(request({ ...lead, phone: "abc" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.errors.phone).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("responde 400 con JSON inválido", async () => {
    const res = await POST(request("{no es json"));
    expect(res.status).toBe(400);
  });

  it("ignora en silencio el honeypot", async () => {
    const res = await POST(request({ ...lead, website: "http://spam" }));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("responde 503 sin variables de entorno", async () => {
    vi.stubEnv("LEADS_WEBHOOK_URL", "");
    const res = await POST(request(lead));
    expect(res.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("responde 502 si el webhook falla", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    const res = await POST(request(lead));
    expect(res.status).toBe(502);
  });

  it("responde 502 si el webhook devuelve 200 sin ok:true", async () => {
    fetchMock.mockResolvedValue(new Response("<html>Error</html>", { status: 200 }));
    expect((await POST(request(lead))).status).toBe(502);
    fetchMock.mockResolvedValue(Response.json({ ok: false, error: "secret" }));
    expect((await POST(request(lead))).status).toBe(502);
  });

  it("no registra datos personales en los logs", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    await POST(request(lead));
    const logged = JSON.stringify(vi.mocked(console.error).mock.calls);
    expect(logged).not.toContain("Carlos");
    expect(logged).not.toContain("0991234567");
  });
});
