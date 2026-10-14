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
