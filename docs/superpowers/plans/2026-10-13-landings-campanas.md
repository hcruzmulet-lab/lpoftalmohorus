# Landings de campaña con captura de leads — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tres landings de campaña (`/cirugias`, `/dra-yelin`, `/optica`) cuyo formulario guarda cada lead en una Google Sheet (vía Apps Script) y abre WhatsApp; el formulario de la home también guarda en la hoja.

**Architecture:** La lógica pura (configuración de campañas, UTM, validación, mensaje de WhatsApp) vive en `src/lib/` y se prueba con Vitest. Un route handler `POST /api/leads` revalida y reenvía al webhook de Apps Script con un secreto. Un componente cliente `LeadForm` reutilizable abre WhatsApp en el mismo clic y guarda en paralelo; las tres páginas viven en el route group `src/app/(campanas)/` con un layout propio sin navegación del sitio.

**Tech Stack:** Next.js 16.1.3 (App Router, Turbopack) · React 19.2.3 · TypeScript 5 · Tailwind CSS 4 · lucide-react · Vitest 3 (nuevo, devDependency).

**Spec:** `docs/superpowers/specs/2026-10-13-landings-campanas-design.md`

## Global Constraints

- Rutas exactas: `/cirugias`, `/dra-yelin`, `/optica`; route group `src/app/(campanas)/`.
- Campañas: `"cirugias" | "dra-yelin" | "optica" | "sitio"`.
- Variables de entorno: `LEADS_WEBHOOK_URL`, `LEADS_WEBHOOK_SECRET`. Nunca se exponen al cliente (sin prefijo `NEXT_PUBLIC_`).
- Columnas de la hoja, en este orden: `fecha · campaña · nombre · teléfono · correo · interés · página · referrer · utm_source · utm_medium · utm_campaign · utm_content · utm_term`.
- Respuestas de `/api/leads`: honeypot → 200 sin guardar; inválido → 400 `{ok:false, errors}`; sin variables → 503; webhook falla → 502; éxito → 200 `{ok:true}`. Timeout del webhook: 8 s.
- Logs del servidor: solo campaña y código/tipo de error, nunca nombre, teléfono ni correo.
- Todo el copy visible en español (Ecuador), tuteo. Sin afirmaciones médicas, precios ni promociones inventadas: la promo de óptica solo se muestra si `opticaPromo` no está vacío; el contenido destacado de la Dra. se oculta si `drYelinFeatured` está vacío.
- Diseño: extensión del sistema de `DESIGN.md` (tokens `horus`, `horus-deep`, `horus-soft`, `horus-mist`, `ink`, `ink-soft`, `gold`, `gold-ink`, `line`; fuentes `font-display` Sora y `font-sans` Figtree; botones de `btn` en `site.ts`). Sin eyebrows (etiquetas pequeñas sobre títulos), sin degradados de fondo, sombras solo en lo que flota.
- Vitest es la única dependencia nueva.

## Review Focus

- **Teléfono con formato local real** (`+593 99 123 4567`, `099-123-4567`, `(02) 234 5678`): debe aceptarse; `abc`, `123` o 25 dígitos se rechazan. → test en Task 1.
- **El Apps Script responde 200 con un cuerpo que no es `{ok:true}`** (página HTML de error de Google, o `{ok:false}` por secreto incorrecto): la ruta debe responder 502, no fingir éxito. → test en Task 2.
- **Doble clic en "Enviar"**: un solo lead y una sola ventana de WhatsApp; el botón queda deshabilitado mientras envía. → verificación manual en Task 4.
- **Navegador bloquea la ventana de WhatsApp**: el usuario ve un enlace "Abrir WhatsApp" en el estado final. → verificación manual en Task 4.
- **Cuerpo con tipos raros** (`name: 123`, `utm: "x"`, JSON inválido): 400 limpio, nunca 500. → tests en Task 1 y Task 2.

---

## File Structure

| Archivo | Responsabilidad |
| --- | --- |
| `vitest.config.ts` | Config de Vitest con alias `@` |
| `src/lib/campaigns.ts` | Config por campaña, intereses, extras de óptica y Dra. |
| `src/lib/leads.ts` | `readUtm`, `validateLead`, `interestName`, `buildWhatsAppMessage`, `whatsappUrl` |
| `src/lib/leads.test.ts` | Tests de `leads.ts` |
| `src/lib/submit-lead.ts` | `submitLead` (fetch cliente a `/api/leads`) y evento `selectInterest` |
| `src/app/api/leads/route.ts` | Endpoint POST |
| `src/app/api/leads/route.test.ts` | Tests del endpoint |
| `docs/leads-apps-script.gs` | Script para la hoja + instrucciones |
| `.env.example` | Variables documentadas |
| `src/components/campaign/LeadForm.tsx` | Formulario reutilizable |
| `src/components/campaign/InterestButton.tsx` | Botón que preselecciona interés y baja al formulario |
| `src/components/campaign/CampaignChrome.tsx` | `CampaignHeader` y `CampaignFooter` |
| `src/app/(campanas)/layout.tsx` | Layout de campañas |
| `src/app/(campanas)/cirugias/page.tsx` | Landing cirugías |
| `src/app/(campanas)/dra-yelin/page.tsx` | Landing Dra. Yelín |
| `src/app/(campanas)/optica/page.tsx` | Landing óptica |
| `src/components/landing/Testimonials.tsx` | (mod) exportar `testimonials` |
| `src/components/landing/Specialist.tsx` | (mod) exportar `credentials` |
| `src/components/landing/Appointment.tsx` | (mod) guardar en `/api/leads` |

---

### Task 1: Vitest, configuración de campañas y lógica de leads

**Files:**
- Create: `vitest.config.ts`, `src/lib/campaigns.ts`, `src/lib/leads.ts`, `src/lib/leads.test.ts`
- Modify: `package.json` (devDependency + script `test`)

**Interfaces:**
- Consumes: `contact.whatsapp` y `services` de `src/components/landing/site.ts`.
- Produces:
  - `type CampaignId = "cirugias" | "dra-yelin" | "optica" | "sitio"`
  - `type Interest = { id: string; name: string; description?: string }`
  - `campaigns: Record<CampaignId, Campaign>` con `Campaign = { id; interestLabel: string; interests: Interest[]; messageIntro: string }`
  - `isCampaignId(v: unknown): v is CampaignId`
  - `opticaPromo: string`, `drYelinSocial: SocialProfile[]` (`{ network: string; handle: string; url: string }`), `drYelinFeatured: FeaturedLink[]` (`{ title: string; url: string }`)
  - `type Utm`, `UTM_KEYS`, `readUtm(search: string): Utm`
  - `type Lead = { campaign: CampaignId; name: string; phone: string; email: string; interest: string; page: string; referrer: string; utm: Utm; website: string }`
  - `validateLead(input: unknown): { ok: true; lead: Lead } | { ok: false; errors: Record<string, string> }`
  - `interestName(campaign: CampaignId, id: string): string`
  - `buildWhatsAppMessage(lead: Pick<Lead, "campaign" | "name" | "phone" | "email" | "interest">, extra?: string): string`
  - `whatsappUrl(message: string): string`

- [ ] **Step 1: Instalar Vitest y agregar script**

```bash
npm install -D vitest@^3
npm pkg set scripts.test="vitest run"
```

Crear `vitest.config.ts`:

```ts
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 2: Crear la configuración de campañas**

`src/lib/campaigns.ts`:

```ts
import { services } from "@/components/landing/site";

export type CampaignId = "cirugias" | "dra-yelin" | "optica" | "sitio";

export type Interest = { id: string; name: string; description?: string };

export type Campaign = {
  id: CampaignId;
  interestLabel: string;
  interests: Interest[];
  messageIntro: string;
};

// Descripciones médicas: borrador para que la Dra. lo valide antes del lanzamiento.
export const campaigns: Record<CampaignId, Campaign> = {
  cirugias: {
    id: "cirugias",
    interestLabel: "¿Qué cirugía te interesa?",
    messageIntro: "Quisiera una valoración para cirugía",
    interests: [
      { id: "catarata", name: "Catarata", description: "Reemplazamos el cristalino opaco por un lente intraocular para recuperar una visión nítida." },
      { id: "pterigion", name: "Pterigión", description: "Retiramos la carnosidad que crece sobre el ojo y reducimos el riesgo de que vuelva a aparecer." },
      { id: "excimer", name: "Excímer láser (cirugía refractiva)", description: "Corregimos miopía, hipermetropía y astigmatismo para que dependas menos de lentes." },
      { id: "crosslinking", name: "Crosslinking", description: "Fortalecemos la córnea para frenar el avance del queratocono." },
      { id: "anillos", name: "Anillos corneales para queratocono", description: "Implantamos anillos que regularizan la forma de la córnea y mejoran la visión." },
      { id: "blefaroplastia", name: "Blefaroplastia", description: "Retiramos el exceso de piel de los párpados que pesa sobre la mirada o limita la visión." },
      { id: "tumor-parpado", name: "Tumor de párpados y conjuntiva", description: "Extirpamos lesiones de párpado y conjuntiva con estudio de la muestra cuando hace falta." },
      { id: "herida-corneal", name: "Heridas corneales", description: "Reparamos lesiones de la córnea por golpes o cuerpos extraños para proteger la visión." },
      { id: "herida-parpado", name: "Heridas de párpados", description: "Reconstruimos el párpado tras un trauma para recuperar su función y su forma." },
      { id: "valoracion", name: "No sé, quiero una valoración" },
    ],
  },
  "dra-yelin": {
    id: "dra-yelin",
    interestLabel: "Motivo de la consulta",
    messageIntro: "Quisiera agendar una consulta con la Dra. Yelín",
    interests: [
      { id: "consulta", name: "Consulta general" },
      { id: "cirugia", name: "Cirugía" },
      { id: "segunda-opinion", name: "Segunda opinión" },
      { id: "otro", name: "Otro" },
    ],
  },
  optica: {
    id: "optica",
    interestLabel: "¿Qué necesitas?",
    messageIntro: "Quisiera información de la óptica",
    interests: [
      { id: "examen", name: "Examen visual" },
      { id: "lentes-receta", name: "Lentes con receta" },
      { id: "renovar", name: "Renovar mis lentes" },
      { id: "ninos", name: "Lentes para niños" },
    ],
  },
  sitio: {
    id: "sitio",
    interestLabel: "Servicio",
    messageIntro: "Quisiera agendar una cita",
    interests: services.map((s) => ({ id: s.id, name: s.name })),
  },
};

export function isCampaignId(value: unknown): value is CampaignId {
  return typeof value === "string" && value in campaigns;
}

// Vacío = el bloque de promoción no se muestra en /optica.
export const opticaPromo = "";

export type SocialProfile = { network: string; handle: string; url: string };
export type FeaturedLink = { title: string; url: string };

// Placeholders: reemplazar por los perfiles reales de la Dra. antes del lanzamiento.
export const drYelinSocial: SocialProfile[] = [
  { network: "Instagram", handle: "@usuario", url: "https://www.instagram.com/" },
  { network: "TikTok", handle: "@usuario", url: "https://www.tiktok.com/" },
  { network: "Facebook", handle: "OFTALMO HORUS Center", url: "https://www.facebook.com/" },
];

// Vacío = la sección de contenido destacado no se muestra.
export const drYelinFeatured: FeaturedLink[] = [];
```

- [ ] **Step 3: Escribir los tests de la lógica (fallan)**

`src/lib/leads.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  buildWhatsAppMessage,
  interestName,
  readUtm,
  validateLead,
  whatsappUrl,
} from "./leads";

const valid = {
  campaign: "cirugias",
  name: "María García",
  phone: "+593 99 123 4567",
  email: "maria@example.com",
  interest: "catarata",
  page: "/cirugias",
  referrer: "https://instagram.com/",
  utm: { utm_source: "instagram", utm_medium: "bio", utm_campaign: "cirugias-oct" },
  website: "",
};

describe("readUtm", () => {
  it("lee las cinco claves UTM", () => {
    const utm = readUtm("?utm_source=ig&utm_medium=bio&utm_campaign=c&utm_content=v1&utm_term=t");
    expect(utm).toEqual({
      utm_source: "ig",
      utm_medium: "bio",
      utm_campaign: "c",
      utm_content: "v1",
      utm_term: "t",
    });
  });

  it("devuelve strings vacíos cuando faltan", () => {
    expect(readUtm("")).toEqual({
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
    });
  });

  it("recorta valores a 200 caracteres", () => {
    const utm = readUtm(`?utm_source=${"a".repeat(300)}`);
    expect(utm.utm_source).toHaveLength(200);
  });
});

describe("validateLead", () => {
  it("acepta un lead válido y normaliza", () => {
    const result = validateLead({ ...valid, name: "  María García  " });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.name).toBe("María García");
      expect(result.lead.utm.utm_source).toBe("instagram");
      expect(result.lead.utm.utm_term).toBe("");
    }
  });

  it.each(["+593 99 123 4567", "099-123-4567", "(02) 234 5678", "0991234567"])(
    "acepta el teléfono %s",
    (phone) => {
      expect(validateLead({ ...valid, phone }).ok).toBe(true);
    },
  );

  it.each(["abc", "123", "1".repeat(25), ""])("rechaza el teléfono %j", (phone) => {
    const result = validateLead({ ...valid, phone });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.phone).toBeDefined();
  });

  it("exige nombre", () => {
    const result = validateLead({ ...valid, name: " " });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.name).toBeDefined();
  });

  it("acepta correo vacío y rechaza correo inválido", () => {
    expect(validateLead({ ...valid, email: "" }).ok).toBe(true);
    const result = validateLead({ ...valid, email: "maria@" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.email).toBeDefined();
  });

  it("rechaza un interés que no pertenece a la campaña", () => {
    const result = validateLead({ ...valid, interest: "examen" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.interest).toBeDefined();
  });

  it("rechaza una campaña desconocida", () => {
    const result = validateLead({ ...valid, campaign: "otra" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.campaign).toBeDefined();
  });

  it("no revienta con tipos raros", () => {
    expect(validateLead(null).ok).toBe(false);
    expect(validateLead("x").ok).toBe(false);
    const result = validateLead({ ...valid, name: 123, utm: "x" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.name).toBeDefined();
  });
});

describe("mensaje de WhatsApp", () => {
  it("incluye nombre, interés y contacto", () => {
    const message = buildWhatsAppMessage({
      campaign: "cirugias",
      name: "María",
      phone: "0991234567",
      email: "",
      interest: "catarata",
    });
    expect(message).toBe(
      "Hola, soy María. Quisiera una valoración para cirugía: Catarata.\nMi contacto: 0991234567",
    );
  });

  it("usa un marcador si falta el nombre y agrega una línea extra", () => {
    const message = buildWhatsAppMessage(
      { campaign: "optica", name: "", phone: "", email: "", interest: "" },
      "Fecha preferida: lunes",
    );
    expect(message).toBe("Hola, soy [tu nombre]. Quisiera información de la óptica.\nFecha preferida: lunes");
  });

  it("traduce el id de interés a su nombre", () => {
    expect(interestName("optica", "examen")).toBe("Examen visual");
    expect(interestName("optica", "nada")).toBe("");
  });

  it("arma la URL de wa.me codificada", () => {
    expect(whatsappUrl("Hola mundo")).toBe("https://wa.me/593999999999?text=Hola%20mundo");
  });
});
```

- [ ] **Step 4: Correr los tests y verificar que fallan**

Run: `npm test`
Expected: FAIL con `Failed to resolve import "./leads"`.

- [ ] **Step 5: Implementar `src/lib/leads.ts`**

```ts
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

export function whatsappUrl(message: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 6: Correr los tests y verificar que pasan**

Run: `npm test`
Expected: PASS, todos los tests de `src/lib/leads.test.ts`.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/lib/campaigns.ts src/lib/leads.ts src/lib/leads.test.ts
git commit -m "Add campaign config and lead validation helpers with tests"
```

---

### Task 2: Endpoint `/api/leads`, script de la hoja y variables de entorno

**Files:**
- Create: `src/app/api/leads/route.ts`, `src/app/api/leads/route.test.ts`, `docs/leads-apps-script.gs`, `.env.example`
- Modify: `.gitignore` (permitir `.env.example`)

**Interfaces:**
- Consumes: `validateLead`, `interestName`, `type Lead` de `src/lib/leads.ts`.
- Produces: `POST /api/leads` con cuerpo JSON `Lead` (sin requerir `website`) y respuestas `{ok:boolean, errors?}` con los códigos de Global Constraints.

- [ ] **Step 1: Escribir los tests del endpoint (fallan)**

`src/app/api/leads/route.test.ts`:

```ts
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
```

- [ ] **Step 2: Correr y verificar que fallan**

Run: `npm test -- src/app/api/leads/route.test.ts`
Expected: FAIL con `Failed to resolve import "./route"`.

- [ ] **Step 3: Implementar `src/app/api/leads/route.ts`**

```ts
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
```

- [ ] **Step 4: Correr y verificar que pasan**

Run: `npm test`
Expected: PASS, todos los tests (lib + route).

- [ ] **Step 5: Script de la hoja y variables**

`docs/leads-apps-script.gs`:

```js
/**
 * Webhook de leads para OFTALMO HORUS Center.
 *
 * Configuración (una sola vez):
 * 1. Crea una Google Sheet nueva (por ejemplo "Leads OFTALMO HORUS") y compártela solo con el equipo.
 * 2. En la hoja: Extensiones → Apps Script. Borra el contenido y pega este archivo completo.
 * 3. Configuración del proyecto (engranaje) → Propiedades de la secuencia de comandos →
 *    Agregar propiedad: LEADS_SECRET = una clave larga y aleatoria.
 * 4. Implementar → Nueva implementación → Tipo: Aplicación web.
 *    Ejecutar como: Yo. Quién tiene acceso: Cualquier persona. Implementar y autorizar.
 * 5. Copia la URL que termina en /exec.
 * 6. En el hosting (Vercel → Settings → Environment Variables) y en .env.local:
 *      LEADS_WEBHOOK_URL=<la URL /exec>
 *      LEADS_WEBHOOK_SECRET=<la misma clave del paso 3>
 * 7. Si cambias este código, vuelve a Implementar → Administrar implementaciones → Editar → Nueva versión.
 */

const SHEET_NAME = "Leads";
const HEADERS = [
  "fecha", "campaña", "nombre", "teléfono", "correo", "interés", "página", "referrer",
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
];

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: "json" });
  }

  const secret = PropertiesService.getScriptProperties().getProperty("LEADS_SECRET");
  if (!secret || data.secret !== secret) {
    return json({ ok: false, error: "secret" });
  }

  const sheet = getSheet();
  sheet.appendRow([
    data.timestamp ? new Date(data.timestamp) : new Date(),
    data.campaign || "",
    data.name || "",
    // Apóstrofo para que Sheets no convierta el teléfono en número.
    data.phone ? "'" + data.phone : "",
    data.email || "",
    data.interest || "",
    data.page || "",
    data.referrer || "",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || "",
    data.utm_content || "",
    data.utm_term || "",
  ]);

  return json({ ok: true });
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```

`.env.example`:

```bash
# URL /exec del Apps Script publicado como aplicación web (ver docs/leads-apps-script.gs)
LEADS_WEBHOOK_URL=
# Misma clave que la propiedad LEADS_SECRET del Apps Script
LEADS_WEBHOOK_SECRET=
```

Agregar al final de `.gitignore`:

```
!.env.example
```

- [ ] **Step 6: Verificar que `.env.example` no está ignorado**

Run: `git check-ignore .env.example; echo $?`
Expected: `1` (no ignorado).

- [ ] **Step 7: Commit**

```bash
git add src/app/api/leads docs/leads-apps-script.gs .env.example .gitignore
git commit -m "Add /api/leads endpoint forwarding to Google Sheets webhook"
```

---

### Task 3: Componentes de captura (`LeadForm`, `InterestButton`, envío)

**Files:**
- Create: `src/lib/submit-lead.ts`, `src/components/campaign/LeadForm.tsx`, `src/components/campaign/InterestButton.tsx`

**Interfaces:**
- Consumes: `campaigns`, `type CampaignId` (Task 1); `readUtm`, `validateLead`, `buildWhatsAppMessage`, `whatsappUrl`, `type Lead` (Task 1); `btn` de `site.ts`.
- Produces:
  - `submitLead(lead: Lead): Promise<boolean>`
  - `SELECT_INTEREST_EVENT = "horus:select-interest"`, `selectInterest(campaign: CampaignId, interest: string): void`
  - `<LeadForm campaign: CampaignId; title?: string; submitLabel?: string />` (el ancla `#formulario` la pone la página)
  - `<InterestButton campaign: CampaignId; interest: string; children: ReactNode; className?: string />`

- [ ] **Step 1: Helper de envío y evento**

`src/lib/submit-lead.ts`:

```ts
import type { CampaignId } from "./campaigns";
import type { Lead } from "./leads";

export async function submitLead(lead: Lead): Promise<boolean> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      keepalive: true,
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const SELECT_INTEREST_EVENT = "horus:select-interest";

export type SelectInterestDetail = { campaign: CampaignId; interest: string };

export function selectInterest(campaign: CampaignId, interest: string) {
  window.dispatchEvent(
    new CustomEvent<SelectInterestDetail>(SELECT_INTEREST_EVENT, {
      detail: { campaign, interest },
    }),
  );
}
```

- [ ] **Step 2: `LeadForm`**

`src/components/campaign/LeadForm.tsx`:

```tsx
"use client";

import { useEffect, useId, useState } from "react";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { campaigns, type CampaignId } from "@/lib/campaigns";
import {
  buildWhatsAppMessage,
  readUtm,
  validateLead,
  whatsappUrl,
  type Utm,
} from "@/lib/leads";
import {
  SELECT_INTEREST_EVENT,
  submitLead,
  type SelectInterestDetail,
} from "@/lib/submit-lead";
import { btn } from "@/components/landing/site";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-12 w-full rounded-[10px] border border-input bg-white px-4 text-[15px] text-ink placeholder:text-ink-soft/60 transition-colors focus:border-horus focus:outline-none focus:ring-3 focus:ring-horus/20 aria-[invalid=true]:border-destructive";

type Status = "idle" | "sending" | "done";

export function LeadForm({
  campaign,
  title,
  submitLabel = "Enviar por WhatsApp",
}: {
  campaign: CampaignId;
  title?: string;
  submitLabel?: string;
}) {
  const uid = useId();
  const config = campaigns[campaign];
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    website: "",
  });
  const [utm, setUtm] = useState<Utm | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [waLink, setWaLink] = useState("");

  useEffect(() => {
    setUtm(readUtm(window.location.search));
    const onSelect = (e: Event) => {
      const detail = (e as CustomEvent<SelectInterestDetail>).detail;
      if (detail.campaign === campaign) {
        setValues((v) => ({ ...v, interest: detail.interest }));
      }
    };
    window.addEventListener(SELECT_INTEREST_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_INTEREST_EVENT, onSelect);
  }, [campaign]);

  const set =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const preview = buildWhatsAppMessage({ campaign, ...values });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const result = validateLead({
      campaign,
      ...values,
      page: window.location.pathname,
      referrer: document.referrer,
      utm: utm ?? readUtm(window.location.search),
    });
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors({});

    const link = whatsappUrl(buildWhatsAppMessage(result.lead));
    setWaLink(link);
    // Se abre dentro del clic para que el navegador no lo bloquee.
    const win = window.open(link, "_blank");
    if (win) win.opener = null;

    setStatus("sending");
    await submitLead(result.lead);
    setStatus("done");
  };

  const field = (key: string) => ({
    id: `${uid}-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-error` : undefined,
  });

  const errorText = (key: string) =>
    errors[key] ? (
      <p id={`${uid}-${key}-error`} className="mt-1.5 text-sm text-destructive">
        {errors[key]}
      </p>
    ) : null;

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-white p-6 sm:p-8" role="status">
        <CheckCircle2 className="size-10 text-horus" aria-hidden="true" />
        <p className="mt-4 font-display text-2xl font-bold text-ink">
          Listo, te escribimos por WhatsApp
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          Si la conversación no se abrió, tócala aquí y envía el mensaje.
        </p>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className={cn(btn.primary, "mt-6 w-full")}>
          <MessageCircle className="size-[18px]" aria-hidden="true" />
          Abrir WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl bg-white p-6 sm:p-8">
      {title && <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>}

      <div className={cn("grid gap-5 sm:grid-cols-2", title && "mt-6")}>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-name`} className="mb-2 block text-sm font-semibold text-ink">
            Nombre completo
          </label>
          <input {...field("name")} autoComplete="name" placeholder="Ej. María García" value={values.name} onChange={set("name")} className={fieldClass} />
          {errorText("name")}
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className="mb-2 block text-sm font-semibold text-ink">
            Teléfono / WhatsApp
          </label>
          <input {...field("phone")} type="tel" autoComplete="tel" placeholder="+593 99 123 4567" value={values.phone} onChange={set("phone")} className={fieldClass} />
          {errorText("phone")}
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className="mb-2 block text-sm font-semibold text-ink">
            Correo <span className="font-normal text-ink-soft">(opcional)</span>
          </label>
          <input {...field("email")} type="email" autoComplete="email" placeholder="tu@email.com" value={values.email} onChange={set("email")} className={fieldClass} />
          {errorText("email")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-interest`} className="mb-2 block text-sm font-semibold text-ink">
            {config.interestLabel}
          </label>
          <select {...field("interest")} value={values.interest} onChange={set("interest")} className={fieldClass}>
            <option value="">Selecciona una opción</option>
            {config.interests.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
          {errorText("interest")}
        </div>

        {/* Honeypot: invisible para personas */}
        <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor={`${uid}-website`}>No llenar este campo</label>
          <input id={`${uid}-website`} tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-horus-mist p-4">
        <p className="text-[13px] font-semibold text-ink-soft">Así llegará tu mensaje</p>
        <p aria-live="polite" className="mt-1.5 whitespace-pre-line text-[15px] leading-relaxed text-ink">
          {preview}
        </p>
      </div>

      <button type="submit" disabled={status === "sending"} className={cn(btn.primary, "mt-6 h-14 w-full text-base disabled:opacity-70")}>
        <MessageCircle className="size-[18px]" aria-hidden="true" />
        {status === "sending" ? "Enviando…" : submitLabel}
      </button>
      <p className="mt-4 text-center text-[13px] text-ink-soft">
        Tus datos solo se usan para coordinar tu atención.
      </p>
    </form>
  );
}
```

- [ ] **Step 3: `InterestButton`**

`src/components/campaign/InterestButton.tsx`:

```tsx
"use client";

import type { ReactNode } from "react";
import type { CampaignId } from "@/lib/campaigns";
import { selectInterest } from "@/lib/submit-lead";

export function InterestButton({
  campaign,
  interest,
  children,
  className,
}: {
  campaign: CampaignId;
  interest: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href="#formulario" onClick={() => selectInterest(campaign, interest)} className={className}>
      {children}
    </a>
  );
}
```

- [ ] **Step 4: Verificar tipos y lint**

Run: `npx tsc --noEmit && npm run lint && npm test`
Expected: sin errores; tests en PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/submit-lead.ts src/components/campaign/LeadForm.tsx src/components/campaign/InterestButton.tsx
git commit -m "Add reusable campaign lead form"
```

---

### Task 4: Layout de campañas y landing `/cirugias`

**Files:**
- Create: `src/components/campaign/CampaignChrome.tsx`, `src/app/(campanas)/layout.tsx`, `src/app/(campanas)/cirugias/page.tsx`
- Modify: `src/components/landing/Testimonials.tsx:3` (`const testimonials` → `export const testimonials`)

**Interfaces:**
- Consumes: `LeadForm`, `InterestButton` (Task 3); `campaigns` (Task 1); `Logo` de `src/components/landing/Logo.tsx`; `btn`, `contact` de `site.ts`; `testimonials` exportado.
- Produces: `CampaignHeader`, `CampaignFooter`; ruta `/cirugias`; patrón de página que siguen Tasks 5 y 6 (secciones con `mx-auto max-w-7xl px-4 md:px-6`, `py-24 md:py-28`, formulario en `#formulario`).

- [ ] **Step 1: Exportar los testimonios**

En `src/components/landing/Testimonials.tsx` línea 3, cambiar `const testimonials = [` por `export const testimonials = [`.

- [ ] **Step 2: Header y footer de campaña**

`src/components/campaign/CampaignChrome.tsx`:

```tsx
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Logo } from "@/components/landing/Logo";
import { btn, contact } from "@/components/landing/site";

const helloLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hola, quisiera información.")}`;

export function CampaignHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" aria-label="OFTALMO HORUS Center, ir al sitio principal">
          <Logo />
        </Link>
        <a href={helloLink} target="_blank" rel="noopener noreferrer" className={btn.small}>
          <MessageCircle className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Escríbenos</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}

export function CampaignFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-6">
        <Logo inverted />
        <p className="text-[15px] leading-relaxed text-white/70">
          {contact.addressLine}, {contact.city}
          <br />
          {contact.hours[0]} · {contact.hours[1]} · Emergencias 24/7
        </p>
        <Link href="/" className="text-[15px] font-semibold text-white transition-colors hover:text-gold">
          Conoce el centro →
        </Link>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Layout del grupo**

`src/app/(campanas)/layout.tsx`:

```tsx
import { CampaignFooter, CampaignHeader } from "@/components/campaign/CampaignChrome";

export default function CampaignLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CampaignHeader />
      <main>{children}</main>
      <CampaignFooter />
    </>
  );
}
```

- [ ] **Step 4: Página `/cirugias`**

`src/app/(campanas)/cirugias/page.tsx`:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { LeadForm } from "@/components/campaign/LeadForm";
import { InterestButton } from "@/components/campaign/InterestButton";
import { testimonials } from "@/components/landing/Testimonials";
import { campaigns } from "@/lib/campaigns";

export const metadata: Metadata = {
  title: "Cirugía ocular en Quito | Dra. Yelín Vento Rojas",
  description:
    "Catarata, pterigión, cirugía refractiva, queratocono, blefaroplastia y más. Agenda tu valoración con la Dra. Yelín Vento Rojas.",
  openGraph: {
    title: "Cirugía ocular con la Dra. Yelín Vento Rojas",
    description: "Agenda tu valoración quirúrgica en OFTALMO HORUS Center, Quito.",
    images: ["/dr1.jpeg"],
    locale: "es_EC",
    type: "website",
  },
};

const surgeries = campaigns.cirugias.interests.filter((i) => i.description);

// Borrador: validar con la Dra. antes del lanzamiento.
const steps = [
  { title: "Valoración", text: "Revisamos tu caso y te explicamos si la cirugía es para ti." },
  { title: "Estudios", text: "Medimos tu ojo con equipos de diagnóstico para planificar con precisión." },
  { title: "Cirugía", text: "La Dra. realiza el procedimiento con la técnica adecuada para tu caso." },
  { title: "Controles", text: "Te acompañamos en la recuperación hasta el alta." },
];

// Borrador: validar con la Dra. antes del lanzamiento.
const faqs = [
  { q: "¿La cirugía duele?", a: "Se usa anestesia para que no sientas dolor durante el procedimiento. Después puede haber molestias leves que se controlan con las indicaciones que te damos." },
  { q: "¿Cuánto dura la recuperación?", a: "Depende de la cirugía. En la valoración te explicamos los tiempos de tu caso y cuándo puedes volver a tus actividades." },
  { q: "¿Necesito estudios antes?", a: "Sí. En la valoración definimos qué estudios necesitas para planificar la cirugía con seguridad." },
  { q: "¿Cómo agendo?", a: "Completa el formulario y te escribimos por WhatsApp para coordinar tu valoración." },
];

const proof = testimonials.filter((t) => /catarata|láser/i.test(t.role));

export default function CirugiasPage() {
  return (
    <>
      {/* Hero con formulario */}
      <section className="bg-horus-mist">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <h1 className="font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold leading-[1.05] text-ink">
              Cirugía ocular con la <span className="text-horus">Dra. Yelín Vento Rojas</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Catarata, pterigión, cirugía refractiva, queratocono y cirugía de
              párpados en Quito. Agenda tu valoración y te explicamos tu caso.
            </p>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {[
                { value: "15+", label: "Años de trayectoria" },
                { value: "99%", label: "Cirugías exitosas" },
                { value: "+10k", label: "Pacientes atendidos" },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-bold text-horus">{s.value}</dd>
                  <dd className="mt-1 text-sm text-ink-soft">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div id="formulario" className="scroll-mt-24">
            <LeadForm campaign="cirugias" title="Agenda tu valoración" />
          </div>
        </div>
      </section>

      {/* Cirugías */}
      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="max-w-2xl font-display text-3xl font-bold text-ink md:text-[2.5rem]">
            Cirugías que realizamos
          </h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {surgeries.map((s) => (
              <li key={s.id} className="flex flex-col rounded-2xl bg-horus-mist p-7">
                <h3 className="font-display text-xl font-semibold text-ink">{s.name}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">{s.description}</p>
                <InterestButton
                  campaign="cirugias"
                  interest={s.id}
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-[15px] font-semibold text-horus hover:text-horus-deep"
                >
                  Quiero valoración
                  <ArrowRight className="size-4" aria-hidden="true" />
                </InterestButton>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proceso */}
      <section className="bg-ink py-24 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-bold md:text-[2.5rem]">Así es el camino a tu cirugía</h2>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.title} className="rounded-2xl bg-white/[0.06] p-7">
                <h3 className="font-display text-xl font-semibold text-gold">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Prueba */}
      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink md:text-[2.5rem]">Pacientes que ya ven mejor</h2>
            <p className="mt-5 flex items-center gap-2 text-lg text-ink-soft">
              <span className="font-display text-2xl font-bold text-ink">4.9</span>
              <span className="flex gap-0.5" aria-label="5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-gold text-gold" aria-hidden="true" />
                ))}
              </span>
              +500 reseñas en Google
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {proof.map((t) => (
              <figure key={t.name} className="rounded-2xl bg-horus-mist p-7">
                <blockquote className="text-[16px] leading-relaxed text-ink">&ldquo;{t.content}&rdquo;</blockquote>
                <figcaption className="mt-5">
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="block text-sm text-ink-soft">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="bg-horus-mist py-24 md:py-28">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-bold text-ink md:text-[2.5rem]">Preguntas frecuentes</h2>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white p-6 open:pb-7">
                <summary className="cursor-pointer list-none font-display text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/dr1.jpeg" alt="La Dra. Vento Rojas trabajando con el microscopio quirúrgico" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
          <LeadForm campaign="cirugias" title="Da el primer paso hoy" />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Verificar build y probar en el navegador**

Run: `npm run build && npm run lint && npm test`
Expected: build compila (si falla con `next/font/google queries have exactly one entry`, repetir: es un fallo intermitente conocido de Turbopack en 16.1.3), lint y tests en PASS.

Luego `npx next start -p 3123` y en `http://localhost:3123/cirugias`:
1. Clic en "Quiero valoración" de "Catarata" → baja al formulario con "Catarata" seleccionada en ambos formularios.
2. Enviar vacío → errores en línea en nombre y teléfono, sin abrir WhatsApp.
3. Enviar válido → se abre una pestaña de `wa.me` con el mensaje; el formulario muestra "Listo, te escribimos por WhatsApp" con el enlace "Abrir WhatsApp". Sin variables de entorno, la red muestra `POST /api/leads` → 503 y la UX igual termina en "Listo".
4. Doble clic rápido en "Enviar" → una sola pestaña y una sola petición (`status === "sending"` corta el segundo envío).
5. Bloquear pop-ups en el navegador y enviar → aparece "Listo" con el enlace "Abrir WhatsApp" funcionando.

- [ ] **Step 6: Commit**

```bash
git add src/components/campaign/CampaignChrome.tsx "src/app/(campanas)" src/components/landing/Testimonials.tsx
git commit -m "Add campaign layout and /cirugias landing"
```

---

### Task 5: Landing `/dra-yelin`

**Files:**
- Create: `src/app/(campanas)/dra-yelin/page.tsx`
- Modify: `src/components/landing/Specialist.tsx:5` (`const credentials` → `export const credentials`)

**Interfaces:**
- Consumes: `LeadForm` (Task 3); `drYelinSocial`, `drYelinFeatured` (Task 1); `Iris` de `src/components/landing/Iris.tsx`; `credentials` exportado; `btn` de `site.ts`.
- Produces: ruta `/dra-yelin`.

- [ ] **Step 1: Exportar las credenciales**

En `src/components/landing/Specialist.tsx` línea 5, cambiar `const credentials = [` por `export const credentials = [`.

- [ ] **Step 2: Página `/dra-yelin`**

`src/app/(campanas)/dra-yelin/page.tsx`:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, CalendarCheck } from "lucide-react";
import { LeadForm } from "@/components/campaign/LeadForm";
import { Iris } from "@/components/landing/Iris";
import { credentials } from "@/components/landing/Specialist";
import { btn } from "@/components/landing/site";
import { drYelinFeatured, drYelinSocial } from "@/lib/campaigns";

export const metadata: Metadata = {
  title: "Dra. Yelín Vento Rojas | Oftalmóloga en Quito",
  description:
    "Oftalmóloga con más de 15 años de trayectoria y fundadora de OFTALMO HORUS Center. Síguela en redes y agenda tu consulta.",
  openGraph: {
    title: "Dra. Yelín Vento Rojas, oftalmóloga",
    description: "Síguela en redes y agenda tu consulta en OFTALMO HORUS Center.",
    images: ["/dra3.jpeg"],
    locale: "es_EC",
    type: "profile",
  },
};

export default function DraYelinPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-horus-mist">
        <div className="mx-auto grid max-w-7xl items-center gap-y-6 px-4 pt-12 md:px-6 lg:min-h-[600px] lg:grid-cols-[1.05fr_1fr] lg:pt-0">
          <div className="relative z-10 py-4 lg:py-20">
            <h1 className="font-display text-[clamp(2.5rem,5.2vw,4.25rem)] font-bold leading-[1.04] text-ink">
              Dra. Yelín <span className="text-horus">Vento Rojas</span>
            </h1>
            <p className="mt-4 text-lg font-medium text-ink">
              Oftalmóloga · Fundadora de OFTALMO HORUS Center
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Más de 15 años devolviendo la claridad visual a miles de pacientes
              en Ecuador. Aquí comparto cómo cuidar tus ojos.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#formulario" className={btn.primary}>
                <CalendarCheck className="size-[18px]" aria-hidden="true" />
                Agendar consulta
              </a>
              {drYelinSocial.map((s) => (
                <a key={s.network} href={s.url} target="_blank" rel="noopener noreferrer" className={btn.outline}>
                  {s.network}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="relative mx-auto h-[420px] w-full max-w-[560px] sm:h-[500px] lg:h-full lg:min-h-[600px] lg:max-w-none">
            <Iris className="absolute -right-[18%] bottom-[-22%] w-[105%] max-w-[640px] sm:-right-[8%] lg:-right-[22%] lg:bottom-[-18%] lg:w-[118%] lg:max-w-[720px]" />
            <Image
              src="/dra-hero.webp"
              alt="Dra. Yelín Vento Rojas sosteniendo un modelo anatómico del ojo"
              width={633}
              height={687}
              priority
              sizes="(min-width: 1024px) 520px, 90vw"
              className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom lg:left-[46%]"
            />
          </div>
        </div>
      </section>

      {/* Sobre ella */}
      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 md:px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
            <Image src="/dra3.jpeg" alt="La Dra. examinando con la lámpara de hendidura" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover object-[62%_center]" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-ink md:text-[2.5rem]">Su trayectoria</h2>
            <blockquote className="mt-6 rounded-2xl bg-horus-mist p-6">
              <p className="text-[17px] leading-relaxed text-ink">
                &ldquo;Mi misión es devolver la claridad visual a cada paciente,
                utilizando la mejor tecnología con un toque humano.&rdquo;
              </p>
            </blockquote>
            <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {credentials.map((c) => (
                <li key={c.title} className="flex items-start gap-3.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-horus text-white">
                    <c.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{c.title}</span>
                    <span className="mt-1 block text-[15px] leading-snug text-ink-soft">{c.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contenido destacado (oculto si no hay enlaces) */}
      {drYelinFeatured.length > 0 && (
        <section className="bg-ink py-24 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="font-display text-3xl font-bold md:text-[2.5rem]">Lo último en sus redes</h2>
            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {drYelinFeatured.map((f) => (
                <li key={f.url}>
                  <a href={f.url} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-white/[0.06] p-7 transition-colors hover:bg-white/[0.1]">
                    <span className="font-display text-xl font-semibold">{f.title}</span>
                    <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-gold">
                      Ver publicación
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Redes */}
      <section className="bg-horus-mist py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-bold text-ink md:text-[2.5rem]">Síguela en redes</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {drYelinSocial.map((s) => (
              <li key={s.network}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-2xl bg-white p-6 transition-transform duration-300 hover:-translate-y-1">
                  <span>
                    <span className="block font-display text-lg font-semibold text-ink">{s.network}</span>
                    <span className="block text-[15px] text-ink-soft">{s.handle}</span>
                  </span>
                  <ArrowRight className="size-5 text-horus" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Formulario */}
      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink md:text-[2.5rem]">Agenda tu consulta con la Dra. Yelín</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              Déjanos tus datos y te escribimos por WhatsApp para coordinar el día y la hora.
            </p>
          </div>
          <div id="formulario" className="scroll-mt-24">
            <LeadForm campaign="dra-yelin" />
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verificar**

Run: `npm run build && npm run lint && npm test`
Expected: build y lint sin errores, tests PASS.

En `http://localhost:3123/dra-yelin`: "Agendar consulta" baja al formulario; los botones de redes abren en pestaña nueva; la sección "Lo último en sus redes" **no** aparece (lista vacía); enviar un lead válido abre WhatsApp con "Quisiera agendar una consulta con la Dra. Yelín".

- [ ] **Step 4: Commit**

```bash
git add "src/app/(campanas)/dra-yelin" src/components/landing/Specialist.tsx
git commit -m "Add /dra-yelin campaign landing"
```

---

### Task 6: Landing `/optica`

**Files:**
- Create: `src/app/(campanas)/optica/page.tsx`

**Interfaces:**
- Consumes: `LeadForm`, `InterestButton` (Task 3); `opticaPromo` (Task 1).
- Produces: ruta `/optica`.

- [ ] **Step 1: Página `/optica`**

`src/app/(campanas)/optica/page.tsx`:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Eye, Glasses, Layers } from "lucide-react";
import { LeadForm } from "@/components/campaign/LeadForm";
import { InterestButton } from "@/components/campaign/InterestButton";
import { opticaPromo } from "@/lib/campaigns";

export const metadata: Metadata = {
  title: "Óptica en Quito: examen visual y lentes | OFTALMO HORUS",
  description:
    "Mídete la vista con especialistas y elige tus monturas y lunas en la óptica de OFTALMO HORUS Center.",
  openGraph: {
    title: "Mídete la vista y estrena lentes",
    description: "Examen visual, monturas y lunas en OFTALMO HORUS Center, Quito.",
    images: ["/dra3.jpeg"],
    locale: "es_EC",
    type: "website",
  },
};

// Confirmar con la óptica los tipos de lunas que vende.
const offer = [
  { icon: Eye, interest: "examen", title: "Examen visual", text: "Medimos tu vista con equipos de diagnóstico y te entregamos tu receta." },
  { icon: Glasses, interest: "lentes-receta", title: "Monturas", text: "Elige la montura que va contigo, con asesoría para tu rostro y tu receta." },
  { icon: Layers, interest: "lentes-receta", title: "Lunas para cada necesidad", text: "Antirreflejo, filtro de luz azul, fotocromáticas y progresivas." },
];

const steps = [
  { title: "Examen visual", text: "Medimos tu vista y revisamos la salud de tus ojos." },
  { title: "Elige tu montura", text: "Te asesoramos con la montura y las lunas para tu receta." },
  { title: "Retira tus lentes", text: "Te avisamos por WhatsApp cuando estén listos." },
];

export default function OpticaPage() {
  return (
    <>
      {/* Hero con formulario */}
      <section className="bg-horus-mist">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <h1 className="font-display text-[clamp(2.25rem,4.8vw,3.9rem)] font-bold leading-[1.05] text-ink">
              Mídete la vista y <span className="text-horus">estrena lentes</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Examen visual con especialistas, monturas y lunas en un solo lugar,
              dentro de un centro oftalmológico.
            </p>
            <div className="relative mt-10 hidden aspect-[16/10] max-w-xl overflow-hidden rounded-2xl lg:block">
              <Image src="/dra3.jpeg" alt="Examen visual con lámpara de hendidura" fill priority sizes="560px" className="object-cover object-[62%_center]" />
            </div>
          </div>
          <div id="formulario" className="scroll-mt-24">
            <LeadForm campaign="optica" title="Reserva tu examen visual" />
          </div>
        </div>
      </section>

      {/* Promoción: solo si está definida */}
      {opticaPromo && (
        <section className="bg-horus py-14 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-6">
            <p className="max-w-3xl font-display text-2xl font-bold md:text-3xl">{opticaPromo}</p>
            <a href="#formulario" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[10px] bg-white px-6 text-[15px] font-semibold text-horus transition-colors hover:bg-gold hover:text-ink">
              Quiero la promoción
              <ArrowRight className="size-[18px]" aria-hidden="true" />
            </a>
          </div>
        </section>
      )}

      {/* Qué incluye */}
      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="max-w-2xl font-display text-3xl font-bold text-ink md:text-[2.5rem]">
            Todo para ver bien, en un solo lugar
          </h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {offer.map((o) => (
              <li key={o.title} className="flex flex-col rounded-2xl bg-horus-mist p-7">
                <span className="grid size-12 place-items-center rounded-xl bg-horus text-white">
                  <o.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{o.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">{o.text}</p>
                <InterestButton
                  campaign="optica"
                  interest={o.interest}
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-[15px] font-semibold text-horus hover:text-horus-deep"
                >
                  Me interesa
                  <ArrowRight className="size-4" aria-hidden="true" />
                </InterestButton>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proceso */}
      <section className="bg-ink py-24 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-bold md:text-[2.5rem]">Tus lentes en tres pasos</h2>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.title} className="rounded-2xl bg-white/[0.06] p-7">
                <h3 className="font-display text-xl font-semibold text-gold">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cierre */}
      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink md:text-[2.5rem]">¿Hace cuánto no te mides la vista?</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              Si ves borroso, te cansas al leer o tus lentes ya no te sirven,
              es momento de un examen.
            </p>
          </div>
          <LeadForm campaign="optica" />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verificar**

Run: `npm run build && npm run lint && npm test`
Expected: sin errores.

En `http://localhost:3123/optica`: no aparece bloque de promoción (`opticaPromo` vacío); "Me interesa" en "Examen visual" selecciona "Examen visual" en los dos formularios; cambiar temporalmente `opticaPromo` a `"Prueba"` muestra la franja violeta, y se revierte a `""` antes del commit.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(campanas)/optica"
git commit -m "Add /optica campaign landing"
```

---

### Task 7: Formulario de la home guarda en la hoja

**Files:**
- Modify: `src/components/landing/Appointment.tsx`

**Interfaces:**
- Consumes: `validateLead`, `buildWhatsAppMessage`, `whatsappUrl`, `readUtm` (Task 1); `submitLead` (Task 3). Los ids de `services` de `site.ts` son los intereses de la campaña `sitio`.
- Produces: la home envía leads con `campaign: "sitio"`.

- [ ] **Step 1: Reemplazar mensaje, validación y envío**

En `src/components/landing/Appointment.tsx`:

1. Imports: agregar
```ts
import { buildWhatsAppMessage, readUtm, validateLead, whatsappUrl } from "@/lib/leads";
import { submitLead } from "@/lib/submit-lead";
```
y quitar `contact` de la importación de `./site` solo si deja de usarse (sigue usándose en el bloque de contacto: se mantiene).

2. Reemplazar el `useMemo` de `message` por:
```ts
  const dateLine = form.date ? `Fecha preferida: ${formatDate(form.date)}` : undefined;
  const message = buildWhatsAppMessage(
    { campaign: "sitio", name: form.name, phone: form.phone, email: form.email, interest: form.service },
    dateLine,
  );
```
y quitar `useMemo` y `serviceName` si quedan sin uso.

3. Agregar estado de errores del servidor/cliente: reemplazar `showErrors` + `nameMissing` + `phoneMissing` por
```ts
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
```
y en los inputs usar `aria-invalid={errors.name ? true : undefined}` / `errors.phone`, mostrando `errors.name` y `errors.phone` como texto de error (mismos `id="name-error"`/`"phone-error"` existentes).

4. Reemplazar `handleSubmit` por:
```ts
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const result = validateLead({
      campaign: "sitio",
      name: form.name,
      phone: form.phone,
      email: form.email,
      interest: form.service,
      page: window.location.pathname,
      referrer: document.referrer,
      utm: readUtm(window.location.search),
    });
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    const win = window.open(whatsappUrl(message), "_blank");
    if (win) win.opener = null;
    setSending(true);
    await submitLead(result.lead);
    setSending(false);
  };
```

5. El botón submit: `disabled={sending}` y texto `{sending ? "Enviando…" : "Enviar por WhatsApp"}`.

- [ ] **Step 2: Verificar**

Run: `npm run build && npm run lint && npm test`
Expected: sin errores.

En `http://localhost:3123/#citas`: enviar vacío muestra errores de nombre y teléfono; "Agendar este servicio" en una tarjeta sigue preseleccionando el servicio; enviar válido abre WhatsApp con "Hola, soy … Quisiera agendar una cita: <servicio>." y la línea de fecha si se eligió; la red muestra `POST /api/leads` con `campaign: "sitio"`.

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/Appointment.tsx
git commit -m "Save home appointment leads to the sheet"
```

---

### Task 8: Verificación visual y revisión de diseño

**Files:**
- Modify: solo lo que la revisión encuentre.

**Interfaces:**
- Consumes: todas las rutas.
- Produces: capturas en `.impeccable/review/` y veredicto.

- [ ] **Step 1: Detector y suite completa**

Run:
```bash
npm test && npm run lint && npm run build
~/.claude/skills/impeccable/scripts/impeccable detect --json src/components/campaign "src/app/(campanas)"
```
Expected: tests PASS, lint limpio, build OK, detector `[]` o hallazgos corregidos.

- [ ] **Step 2: Capturas**

Con `npx next start -p 3123` (antes: `lsof -ti tcp:3123 | xargs kill` para no servir una build vieja), capturar con Chrome DevTools a página completa (viewport con alto = `scrollHeight`, imágenes lazy forzadas a eager) cada ruta en 1440 y 390:
`.impeccable/review/cirugias-desktop.png`, `cirugias-mobile.png`, `dra-yelin-desktop.png`, `dra-yelin-mobile.png`, `optica-desktop.png`, `optica-mobile.png`.

Revisar en cada captura: formulario visible en el primer viewport de desktop; sin desbordamiento horizontal en 390 (`document.documentElement.scrollWidth === 390`); títulos en 2 líneas o menos; sin secciones vacías.

- [ ] **Step 3: Revisión final**

Lanzar el revisor de Impeccable (agente general con `~/.claude/skills/impeccable/agents/impeccable_finish_reviewer.toml`) con el spec, `DESIGN.md`, las 6 capturas y las rutas. Aplicar un lote de correcciones, recapturar y una ronda de veredicto como máximo.

- [ ] **Step 4: Commit**

```bash
git add -A src
git commit -m "Polish campaign landings after design review"
```
