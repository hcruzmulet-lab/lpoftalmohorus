// Datos de contacto: los valores actuales son de ejemplo, reemplazar antes de publicar.
export const contact = {
  phoneDisplay: "+593 99 999 9999",
  phoneHref: "tel:+593999999999",
  whatsapp: "593999999999",
  email: "info@oftalmohorus.com",
  addressLine: "Av. Principal #123",
  city: "Quito, Ecuador",
  hours: ["Lun – Vie: 8:00 – 18:00", "Sáb: 8:00 – 13:00"],
};

export const services = [
  { id: "valoracion", name: "Valoración General" },
  { id: "cataratas", name: "Cirugía de Cataratas" },
  { id: "laser", name: "Corrección Láser" },
  { id: "glaucoma", name: "Tratamiento de Glaucoma" },
  { id: "pediatrica", name: "Oftalmología Pediátrica" },
] as const;

export type ServiceId = (typeof services)[number]["id"];

// Evento para preseleccionar un servicio en el formulario de citas
export const SELECT_SERVICE_EVENT = "horus:select-service";

export function selectService(id: ServiceId) {
  window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: id }));
}

export const btn = {
  primary:
    "inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-horus px-6 text-[15px] font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-horus-deep active:translate-y-px",
  outline:
    "inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-horus/40 bg-white px-6 text-[15px] font-semibold text-horus transition-[background-color,border-color,transform] duration-200 hover:border-horus hover:bg-horus-mist active:translate-y-px",
  small:
    "inline-flex h-10 items-center justify-center gap-2 rounded-[10px] bg-horus px-4 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-horus-deep active:translate-y-px",
  smallOutline:
    "inline-flex h-10 items-center justify-center gap-2 rounded-[10px] border border-horus/40 bg-white px-4 text-sm font-semibold text-horus transition-[background-color,border-color] duration-200 hover:border-horus hover:bg-horus-mist",
};
