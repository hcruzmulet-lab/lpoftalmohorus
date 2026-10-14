import { contact } from "@/components/landing/site";
import { campaigns, isCampaignId, type CampaignId } from "./campaigns";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type Utm = Record<(typeof UTM_KEYS)[number], string>;

export type Lead = {
  campaign: CampaignId;
  name: string;
  phone: string;
  email: string;
  interest: string;
  page: string;
  referrer: string;
  utm: Utm;
  website: string;
};

export type LeadValidation =
  | { ok: true; lead: Lead }
  | { ok: false; errors: Record<string, string> };

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export function readUtm(search: string): Utm {
  const params = new URLSearchParams(search);
  return Object.fromEntries(
    UTM_KEYS.map((key) => [key, text(params.get(key), 200)]),
  ) as Utm;
}

const PHONE_PATTERN = /^[+\d\s()-]{7,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(input: unknown): LeadValidation {
  const data =
    input !== null && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const errors: Record<string, string> = {};

  const campaign = data.campaign;
  if (!isCampaignId(campaign)) errors.campaign = "Campaña desconocida.";

  const name = text(data.name, 100);
  if (name.length < 2) errors.name = "Escribe tu nombre.";

  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const digits = phone.replace(/\D/g, "").length;
  if (!PHONE_PATTERN.test(phone) || digits < 7 || digits > 15) {
    errors.phone = "Escribe un teléfono válido, por ejemplo +593 99 123 4567.";
  }

  const email = text(data.email, 120);
  if (email && !EMAIL_PATTERN.test(email)) errors.email = "Revisa tu correo.";

  const interest = text(data.interest, 60);
  if (
    interest &&
    isCampaignId(campaign) &&
    !campaigns[campaign].interests.some((i) => i.id === interest)
  ) {
    errors.interest = "Elige una opción de la lista.";
  }

  if (Object.keys(errors).length > 0 || !isCampaignId(campaign)) {
    return { ok: false, errors };
  }

  const rawUtm =
    data.utm !== null && typeof data.utm === "object"
      ? (data.utm as Record<string, unknown>)
      : {};
  const utm = Object.fromEntries(
    UTM_KEYS.map((key) => [key, text(rawUtm[key], 200)]),
  ) as Utm;

  return {
    ok: true,
    lead: {
      campaign,
      name,
      phone,
      email,
      interest,
      page: text(data.page, 200),
      referrer: text(data.referrer, 500),
      utm,
      website: text(data.website, 200),
    },
  };
}

export function interestName(campaign: CampaignId, id: string): string {
  return campaigns[campaign].interests.find((i) => i.id === id)?.name ?? "";
}

export function buildWhatsAppMessage(
  lead: Pick<Lead, "campaign" | "name" | "phone" | "email" | "interest">,
  extra?: string,
): string {
  const campaign = campaigns[lead.campaign];
  const name = lead.name.trim() || "[tu nombre]";
  const interest = interestName(lead.campaign, lead.interest);
  const lines = [
    `Hola, soy ${name}. ${campaign.messageIntro}${interest ? `: ${interest}` : ""}.`,
  ];
  if (extra) lines.push(extra);
  const contactLine = [lead.phone.trim(), lead.email.trim()].filter(Boolean).join(" · ");
  if (contactLine) lines.push(`Mi contacto: ${contactLine}`);
  return lines.join("\n");
}

// Google Sheets interpreta como fórmula todo valor que empiece con = + - @.
export function sheetSafe(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
