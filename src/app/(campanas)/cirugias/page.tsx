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
                <blockquote className="text-[15px] leading-relaxed text-ink">&ldquo;{t.content}&rdquo;</blockquote>
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
