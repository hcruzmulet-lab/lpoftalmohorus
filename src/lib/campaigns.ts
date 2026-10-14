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
  return typeof value === "string" && Object.hasOwn(campaigns, value);
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
