import Image from "next/image";
import { ArrowRight, Award, Users, CalendarClock, Headset, Star } from "lucide-react";
import { btn, contact } from "./site";
import { Iris } from "./Iris";

const highlights = [
  { icon: Award, value: "15+", label: "Años de trayectoria" },
  { icon: Users, value: "+10k", label: "Pacientes atendidos" },
  { icon: CalendarClock, value: "99%", label: "Cirugías exitosas" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-horus-mist">
      <div className="mx-auto grid max-w-7xl items-center gap-y-6 px-4 pt-12 md:px-6 lg:min-h-[640px] lg:grid-cols-[1.05fr_1fr] lg:pt-0">
        {/* Copy */}
        <div className="relative z-10 py-4 lg:py-20">
          <h1
            className="rise font-display text-[clamp(2.5rem,5.4vw,4.4rem)] font-bold leading-[1.04] text-ink"
            style={{ "--d": "0ms" } as React.CSSProperties}
          >
            Tu visión en <span className="text-horus">manos expertas</span>
          </h1>
          <p
            className="rise mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-soft"
            style={{ "--d": "90ms" } as React.CSSProperties}
          >
            Cirugía de cataratas, corrección láser, glaucoma y oftalmología
            pediátrica en Quito, con la Dra. Yelín Vento Rojas y tecnología de
            diagnóstico de última generación.
          </p>

          <div
            className="rise mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ "--d": "180ms" } as React.CSSProperties}
          >
            <a href="#citas" className={btn.primary}>
              Agendar cita
              <ArrowRight className="size-[18px]" aria-hidden="true" />
            </a>
            <a href="#servicios" className={btn.outline}>
              Nuestros servicios
            </a>
          </div>

          <ul
            className="rise mt-10 grid grid-cols-3 gap-3 sm:mt-12 sm:max-w-xl sm:gap-5"
            style={{ "--d": "270ms" } as React.CSSProperties}
          >
            {highlights.map((item) => (
              <li key={item.label} className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-horus text-white">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-xl font-bold leading-none text-ink">
                    {item.value}
                  </span>
                  <span className="mt-1 text-[13px] leading-tight text-ink-soft">
                    {item.label}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-6 flex items-center gap-2 text-sm text-ink-soft sm:hidden">
            <span className="font-display text-base font-bold text-ink">4.9</span>
            <span className="flex gap-0.5" aria-label="5 estrellas">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-gold text-gold" aria-hidden="true" />
              ))}
            </span>
            +500 reseñas en Google
          </p>
        </div>

        {/* Doctora sobre el iris */}
        <div className="relative mx-auto h-[420px] w-full max-w-[560px] sm:h-[520px] lg:h-full lg:min-h-[640px] lg:max-w-none">
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

          {/* Tarjeta 24/7 */}
          <a
            href={contact.phoneHref}
            className="absolute bottom-6 right-0 z-10 flex w-36 flex-col items-center rounded-2xl bg-white px-4 py-5 text-center shadow-[0_18px_40px_-16px_rgba(29,20,51,0.35)] transition-transform duration-300 hover:-translate-y-1 sm:right-4 lg:bottom-16 lg:right-0"
          >
            <Headset className="size-7 text-horus" aria-hidden="true" />
            <span className="mt-2 font-display text-3xl font-bold text-ink">24/7</span>
            <span className="mt-1 text-[13px] leading-tight text-ink-soft">
              Emergencias oculares
            </span>
          </a>

          {/* Reseñas */}
          <div className="absolute left-0 top-6 z-10 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-16px_rgba(29,20,51,0.35)] sm:flex lg:left-2 lg:top-24">
            <span className="font-display text-2xl font-bold text-ink">4.9</span>
            <span className="flex flex-col">
              <span className="flex gap-0.5" aria-label="5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-gold text-gold" aria-hidden="true" />
                ))}
              </span>
              <span className="mt-1 text-[12px] text-ink-soft">+500 reseñas en Google</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
