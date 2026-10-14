"use client";

import Image from "next/image";
import { CheckCircle2, Phone } from "lucide-react";
import { btn, contact, selectService } from "./site";

const reasons = [
  "Especialista con 15+ años",
  "Tecnología de última generación",
  "Atención personalizada",
  "Procedimientos mínimamente invasivos",
];

export function Highlights() {
  return (
    <section aria-label="Por qué elegirnos" className="bg-white pb-24 md:pb-28">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
        {/* Valoración */}
        <article className="relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl bg-horus-mist p-7">
          <h3 className="font-display text-xl font-semibold text-ink">
            Valoración visual completa
          </h3>
          <p className="mt-4 font-display text-[2.5rem] font-bold leading-none text-gold-ink">
            30 min
          </p>
          <p className="mt-3 max-w-[13rem] text-sm leading-relaxed text-ink-soft">
            Agudeza visual, presión ocular y fondo de ojo en una sola visita.
          </p>
          <a
            href="#citas"
            onClick={() => selectService("valoracion")}
            className={`${btn.smallOutline} mt-auto self-start`}
          >
            Reservar valoración
          </a>
        </article>

        {/* Por qué elegirnos */}
        <article className="flex min-h-[260px] flex-col rounded-2xl bg-horus-mist p-7">
          <h3 className="font-display text-xl font-semibold text-ink">
            ¿Por qué elegirnos?
          </h3>
          <ul className="mt-5 space-y-3">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-[15px] text-ink">
                <CheckCircle2
                  className="mt-0.5 size-[18px] shrink-0 text-horus"
                  aria-hidden="true"
                />
                {r}
              </li>
            ))}
          </ul>
          <a href="#especialista" className={`${btn.smallOutline} mt-auto self-start`}>
            Conoce a la doctora
          </a>
        </article>

        {/* Cuida tu visión */}
        <article className="relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl bg-horus-mist">
          <div className="relative z-10 flex flex-1 flex-col p-7 pr-[calc(38%+1rem)] lg:pr-[calc(30%+1rem)]">
            <h3 className="font-display text-xl font-semibold text-ink">
              Cuida tu visión hoy
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Un diagnóstico temprano evita tratamientos mayores.
            </p>
            <a href="#citas" className={`${btn.small} mt-auto self-start`}>
              Agendar ahora
            </a>
          </div>
          <Image
            src="/modelo-ojo.jpg"
            alt="Modelo anatómico del ojo en manos de la doctora"
            fill
            sizes="(min-width: 1024px) 160px, 40vw"
            className="!left-auto !w-[38%] object-cover object-[35%_center] lg:!w-[30%]"
          />
        </article>

        {/* 24/7 */}
        <article className="relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl bg-ink p-7 text-white">
          <h3 className="font-display text-xl font-semibold">Estamos para ti</h3>
          <p className="font-display text-[2.5rem] font-bold leading-none text-gold">24/7</p>
          <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-white/80">
            Atención de emergencias oculares cualquier día, a cualquier hora.
          </p>
          <a
            href={contact.phoneHref}
            className="mt-auto inline-flex h-10 items-center gap-2 self-start rounded-[10px] bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-gold"
          >
            <Phone className="size-4" aria-hidden="true" />
            Llamar ahora
          </a>
        </article>
      </div>
    </section>
  );
}
