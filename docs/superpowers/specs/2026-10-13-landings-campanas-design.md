# Landings de campaña con captura de leads — Diseño

Fecha: 2026-10-13 · Estado: aprobado por secciones en conversación, pendiente revisión del spec escrito.

## Objetivo

Tres landing pages, una por campaña, dentro del sitio Next.js existente, para captar leads de tráfico orgánico (pixels después):

| Ruta | Campaña | Acción principal |
| --- | --- | --- |
| `/cirugias` | Cirugías | Lead para valoración de una cirugía concreta |
| `/dra-yelin` | Posicionamiento de la Dra. Yelín en redes | Seguirla en redes **y** agendar consulta, mismo peso |
| `/optica` | Venta de lentes en óptica | Lead para examen visual / lentes |

Cada lead se **guarda en una Google Sheet** y además **abre WhatsApp** con el mensaje armado. El formulario de citas de la home también guarda en la misma hoja (campaña `sitio`).

## Decisiones confirmadas

- Almacenamiento: Google Sheet vía Google Apps Script publicado como web app (opción 1). Sin base de datos.
- Tráfico orgánico por ahora: se capturan UTM en cada lead; sin Meta/Google/TikTok pixel.
- Óptica: examen visual + monturas y lunas oftálmicas. Promoción aún no definida.
- Dra. Yelín: hub con redes y consulta al mismo nivel.

## Supuestos (corregibles)

- Hosting con runtime de servidor (Vercel o similar). La ruta `/api/leads` no funciona con export estático.
- Las landings no muestran la navegación del sitio: solo logo, botón de WhatsApp y footer corto.
- Usuarios de redes, enlaces de contenido destacado, número de WhatsApp y datos de contacto siguen siendo placeholders en `src/lib/campaigns.ts` / `site.ts`.

## Arquitectura

### Rutas

`src/app/(campanas)/layout.tsx` (route group, no altera URLs) con header de campaña (logo + botón WhatsApp) y footer corto. Páginas:

- `src/app/(campanas)/cirugias/page.tsx`
- `src/app/(campanas)/dra-yelin/page.tsx`
- `src/app/(campanas)/optica/page.tsx`

Cada página exporta su propio `metadata` (title, description, openGraph) para compartirse bien en redes.

### Configuración — `src/lib/campaigns.ts`

Un objeto por campaña (`cirugias`, `dra-yelin`, `optica`, `sitio`):

```ts
type CampaignId = "cirugias" | "dra-yelin" | "optica" | "sitio";

type Campaign = {
  id: CampaignId;
  interestLabel: string;              // etiqueta del select, p. ej. "¿Qué cirugía te interesa?"
  interests: { id: string; name: string }[];
  messageIntro: string;               // inicio del mensaje de WhatsApp
};

// Extras por campaña
export const opticaPromo: string = "";          // vacío = bloque de promo oculto
export const drYelinSocial: { network: string; handle: string; url: string }[];
export const drYelinFeatured: { title: string; url: string }[]; // 3 enlaces
```

Opciones de interés:

- **cirugias**: Pterigión · Catarata · Crosslinking · Excímer láser (cirugía refractiva) · Tumor de párpados y conjuntiva · Anillos corneales para queratocono · Blefaroplastia · Heridas corneales · Heridas de párpados · No sé, quiero una valoración.
- **dra-yelin**: Consulta general · Cirugía · Segunda opinión · Otro.
- **optica**: Examen visual · Lentes con receta · Renovar mis lentes · Lentes para niños.
- **sitio**: los servicios existentes de `site.ts`.

### Lógica pura — `src/lib/leads.ts`

- `readUtm(search: string): Utm` — extrae `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` (strings vacíos si faltan, recortados a 200 caracteres).
- `validateLead(input: unknown): { ok: true; lead: Lead } | { ok: false; errors: Record<string, string> }` — nombre (2–100), teléfono (7–20 caracteres, dígitos, espacios, `+`, `-`, `()`), correo opcional con formato válido, `campaign` debe ser un `CampaignId`, `interest` opcional y debe pertenecer a la campaña, textos recortados. Mensajes de error en español.
- `buildWhatsAppMessage(campaign, lead): string` — mensaje en español con nombre, interés y contacto.
- `whatsappUrl(message): string` — `https://wa.me/<número>?text=<encoded>`.

Tipo `Lead`: `campaign, name, phone, email, interest, page, referrer, utm, website` (`website` es el honeypot).

### Endpoint — `src/app/api/leads/route.ts`

`POST` JSON:

1. Si `website` (honeypot) trae texto → `200 {ok:true}` sin guardar.
2. `validateLead` → si falla, `400 {ok:false, errors}`.
3. Si falta `LEADS_WEBHOOK_URL` o `LEADS_WEBHOOK_SECRET` → `503 {ok:false}` y `console.error` sin datos personales.
4. Reenvía al Apps Script: `POST` con `{secret, timestamp ISO, ...lead, utm aplanado}`, timeout de 8 s.
5. Respuesta del script no OK o error de red → `502 {ok:false}`; log solo con campaña y código.
6. Éxito → `200 {ok:true}`.

### Formulario — `src/components/campaign/LeadForm.tsx` (client)

Props: `campaign: CampaignId`, `defaultInterest?: string`, `id?: string` (para anclas), `compact?: boolean`.

- Campos: nombre*, teléfono*, correo (opcional), interés (select de la campaña), honeypot oculto (`website`, `tabIndex=-1`, `aria-hidden`, fuera de pantalla).
- Al montar: lee UTM de `location.search`, `location.pathname` y `document.referrer`.
- Escucha el evento existente para preseleccionar interés (generalizado a `SELECT_INTEREST_EVENT` con `{campaign, interest}`).
- Muestra la vista previa del mensaje de WhatsApp en vivo (patrón ya usado en la home).
- Envío:
  1. Valida en cliente con `validateLead`; si hay errores los muestra en línea (`aria-invalid`, `aria-describedby`) y no continúa.
  2. Abre WhatsApp **dentro del mismo handler del clic** (`window.open(url, "_blank", "noopener")`) para evitar el bloqueador de pop-ups.
  3. `fetch("/api/leads", { method: "POST", keepalive: true })` en paralelo; un fallo no bloquea al usuario.
  4. Estado final: "Listo, te escribimos por WhatsApp" con botón para reabrir WhatsApp si la ventana no se abrió.
- Estado de envío: botón deshabilitado con texto "Enviando…" mientras dura el fetch.

### Home

`src/components/landing/Appointment.tsx` usa la misma ruta `/api/leads` con `campaign: "sitio"` y los mismos helpers de `leads.ts` (mantiene su diseño y la fecha preferida, que viaja en el mensaje).

### Apps Script — `docs/leads-apps-script.gs`

`doPost(e)`: parsea JSON, compara `secret` con la propiedad de script `LEADS_SECRET`, rechaza si no coincide, hace `appendRow` en la hoja `Leads` (la crea con encabezados si no existe) y devuelve JSON `{ok:true}`. Incluye instrucciones paso a paso: crear hoja, pegar script, definir propiedad, publicar como app web (ejecutar como yo, acceso: cualquiera), copiar URL a `LEADS_WEBHOOK_URL`.

Columnas: `fecha · campaña · nombre · teléfono · correo · interés · página · referrer · utm_source · utm_medium · utm_campaign · utm_content · utm_term`.

### Variables de entorno

`.env.example` con `LEADS_WEBHOOK_URL=` y `LEADS_WEBHOOK_SECRET=`.

## Contenido por landing

Todas: formulario visible en el primer viewport (desktop) o inmediatamente tras el titular (móvil), y repetido al final.

### `/cirugias`

1. **Hero**: "Cirugía ocular con la Dra. Yelín Vento Rojas", párrafo corto, cifras reales (15+ años, 99% cirugías exitosas, +10k pacientes) y formulario.
2. **Las 9 cirugías**: nombre + una línea en lenguaje simple de qué trata; botón "Quiero valoración" que preselecciona esa cirugía y lleva al formulario.
3. **Proceso**: valoración → estudios → cirugía → controles.
4. **Prueba**: testimonios reales de cataratas y láser (de la home) + 4.9★ / +500 reseñas.
5. **Preguntas frecuentes**: 4–5 preguntas (`<details>` accesible).
6. **Formulario final**.

### `/dra-yelin`

1. **Hero**: foto recortada de la Dra. sobre el iris, nombre, "Oftalmóloga · Fundadora de OFTALMO HORUS Center", bio de 2 líneas, botones de redes y "Agendar consulta" con el mismo peso.
2. **Sobre ella**: trayectoria, credenciales (de la home) y su cita.
3. **Contenido destacado**: 3 tarjetas que enlazan a videos o posts (`drYelinFeatured`); si la lista está vacía, la sección se oculta.
4. **Redes**: fila de perfiles con usuario visible.
5. **Formulario de consulta**.

### `/optica`

1. **Hero**: "Mídete la vista y estrena lentes", párrafo, formulario.
2. **Qué incluye**: examen visual, monturas, tipos de lunas (antirreflejo, filtro de luz azul, fotocromáticas, progresivas).
3. **Promoción**: renderiza `opticaPromo` solo si no está vacío.
4. **Proceso**: examen → elige tu montura → retira tus lentes.
5. **Formulario final**.

## Diseño visual

Extensión del mundo establecido en `DESIGN.md` (violeta `#7c3aed`, dorado `#d4a853`, tinta `#1d1433`, lavanda `#f6f3fc`, Sora + Figtree, iris como motivo). No se crea una identidad nueva. Secciones vecinas con composiciones distintas. Reglas de Impeccable aplicadas (sin eyebrows, sin degradados, sombras solo en lo que flota). Al terminar: detector `impeccable detect`, capturas desktop 1440 y móvil 390, revisión final.

## Contenido a validar por la clínica antes del lanzamiento

- Textos médicos: descripción de cada cirugía, proceso y respuestas del FAQ (borrador escrito por el desarrollo, **no verificado**).
- Tipos de lunas que realmente vende la óptica.
- Usuarios de redes y 3 enlaces de contenido de la Dra.
- Texto de la promoción de la óptica.
- Número de WhatsApp y datos de contacto reales (ya pendientes en la home).
- Fotos de la óptica: no existen; se usan fotos de la Dra. y gráficos de marca, nunca stock presentado como propio.

## Pruebas

- Agregar `vitest` como devDependency y script `test`.
- Unitarias en `src/lib/leads.test.ts`: `readUtm` (completo, vacío, recorte), `validateLead` (válido, faltan obligatorios, teléfono inválido, correo inválido, interés ajeno a la campaña, campaña desconocida), `buildWhatsAppMessage`.
- Ruta en `src/app/api/leads/route.test.ts` con `fetch` simulado: éxito 200, inválido 400, honeypot 200 sin llamar al webhook, sin variables 503, webhook falla 502.
- Verificación: `npm run build`, `npm run lint`, `npm test`, capturas de las 3 rutas en 1440 y 390.

## Fuera de alcance

Pixels de anuncios, base de datos, panel de leads, envío de correos, A/B testing, CMS.
