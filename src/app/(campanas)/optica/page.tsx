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
const offer: {
  icon: typeof Eye;
  interest: string;
  title: string;
  text: string;
  chips?: string[];
}[] = [
  { icon: Eye, interest: "examen", title: "Examen visual", text: "Medimos tu vista con equipos de diagnóstico y te entregamos tu receta." },
  { icon: Glasses, interest: "lentes-receta", title: "Monturas", text: "Elige la montura que va contigo, con asesoría para tu rostro y tu receta." },
  { icon: Layers, interest: "lentes-receta", title: "Lunas para cada necesidad", text: "Elige el tratamiento según tu receta y tu día a día.", chips: ["Antirreflejo", "Filtro de luz azul", "Fotocromáticas", "Progresivas"] },
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
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{o.text}</p>
                {o.chips && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {o.chips.map((chip) => (
                      <li key={chip} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-ink">
                        {chip}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="flex-1" aria-hidden="true" />
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
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
            {steps.map((s) => (
              <li key={s.title} className="border-t-2 border-gold/70 pt-6 md:pr-10">
                <h3 className="font-display text-xl font-semibold text-gold">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cierre */}
      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto max-w-2xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-bold text-ink md:text-[2.5rem]">¿Hace cuánto no te mides la vista?</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Si ves borroso, te cansas al leer o tus lentes ya no te sirven,
            es momento de un examen.
          </p>
          <div className="mt-10">
            <LeadForm campaign="optica" surface="mist" />
          </div>
        </div>
      </section>
    </>
  );
}
