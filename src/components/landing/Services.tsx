"use client";

import { ArrowRight, Eye, Zap, ShieldCheck, Baby } from "lucide-react";
import { selectService, type ServiceId } from "./site";

const items: {
  id: ServiceId;
  icon: typeof Eye;
  title: string;
  description: string;
}[] = [
  {
    id: "cataratas",
    icon: Eye,
    title: "Cirugía de Cataratas",
    description:
      "Lentes intraoculares premium para restaurar tu visión de forma definitiva.",
  },
  {
    id: "laser",
    icon: Zap,
    title: "Corrección Láser",
    description:
      "LASIK y PRK para dejar los lentes. Procedimientos seguros con resultados inmediatos.",
  },
  {
    id: "glaucoma",
    icon: ShieldCheck,
    title: "Tratamiento de Glaucoma",
    description:
      "Diagnóstico temprano y tratamiento integral para preservar tu visión a largo plazo.",
  },
  {
    id: "pediatrica",
    icon: Baby,
    title: "Oftalmología Pediátrica",
    description:
      "Detección y tratamiento de problemas visuales en los más pequeños, con paciencia y cariño.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="bg-white py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink md:text-[2.5rem]">
            Nuestros servicios
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-4 block h-1 w-12 rounded-full bg-horus"
          />
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Especialidades que transforman vidas, con la tecnología más avanzada
            y un equipo comprometido con tu bienestar visual.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s) => (
            <li
              key={s.id}
              className="group flex flex-col items-center rounded-2xl border border-line bg-white px-7 pb-7 pt-9 text-center transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-horus/50"
            >
              <span className="grid size-[68px] place-items-center rounded-2xl bg-horus-soft text-horus transition-colors duration-300 group-hover:bg-horus group-hover:text-white">
                <s.icon className="size-8 stroke-[1.6]" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">
                {s.description}
              </p>
              <a
                href="#citas"
                onClick={() => selectService(s.id)}
                className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-horus"
              >
                Agendar este servicio
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
