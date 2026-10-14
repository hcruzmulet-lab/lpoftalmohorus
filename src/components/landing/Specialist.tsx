import Image from "next/image";
import { GraduationCap, Award, Globe, Heart, ArrowRight } from "lucide-react";
import { btn } from "./site";

export const credentials = [
  {
    icon: GraduationCap,
    title: "Formación de excelencia",
    description:
      "Especialización en oftalmología en las mejores instituciones de Latinoamérica.",
  },
  {
    icon: Award,
    title: "Certificaciones internacionales",
    description: "Avalada por sociedades oftalmológicas de prestigio mundial.",
  },
  {
    icon: Globe,
    title: "Experiencia global",
    description:
      "Formación continua en centros de referencia internacional.",
  },
  {
    icon: Heart,
    title: "Enfoque humano",
    description:
      "Cada paciente es único y merece atención personalizada.",
  },
];

export function Specialist() {
  return (
    <section id="especialista" className="bg-horus-mist py-24 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:px-6 lg:grid-cols-2 lg:gap-20">
        {/* Foto */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/dra3.jpeg"
              alt="Dra. Yelín Vento Rojas examinando con la lámpara de hendidura"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover object-[62%_center]"
            />
          </div>
          <div className="absolute -bottom-6 right-4 rounded-2xl bg-white px-6 py-4 shadow-[0_18px_40px_-16px_rgba(29,20,51,0.35)] sm:right-8">
            <p className="font-display text-3xl font-bold leading-none text-horus">15+</p>
            <p className="mt-1 text-sm text-ink-soft">Años de experiencia</p>
          </div>
        </div>

        {/* Contenido */}
        <div>
          <h2 className="font-display text-3xl font-bold text-ink md:text-[2.5rem]">
            Dra. Yelín Vento Rojas
          </h2>
          <p className="mt-2 text-lg font-medium text-horus">
            Fundadora de OFTALMO HORUS Center
          </p>
          <p className="mt-6 text-[17px] leading-relaxed text-ink-soft">
            Con más de 15 años dedicados a la oftalmología, la Dra. Vento Rojas
            ha transformado la vida de miles de pacientes en Ecuador. Su pasión
            por la excelencia médica y su compromiso con cada persona la
            llevaron a fundar un centro de referencia con estándares
            internacionales.
          </p>

          <blockquote className="mt-8 rounded-2xl bg-white p-6">
            <p className="text-[17px] leading-relaxed text-ink">
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
                  <span className="mt-1 block text-[15px] leading-snug text-ink-soft">
                    {c.description}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <a href="#citas" className={`${btn.primary} mt-10`}>
            Agendar consulta con la doctora
            <ArrowRight className="size-[18px]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
