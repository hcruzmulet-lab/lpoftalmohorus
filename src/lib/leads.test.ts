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
