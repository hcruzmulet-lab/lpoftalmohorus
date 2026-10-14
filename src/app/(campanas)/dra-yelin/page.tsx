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
              <p className="text-lg leading-relaxed text-ink">
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
