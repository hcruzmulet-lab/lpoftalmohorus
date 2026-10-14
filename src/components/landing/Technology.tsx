import Image from "next/image";
import { Scan, Monitor, Microscope, Activity, Check } from "lucide-react";

const technologies = [
  {
    icon: Scan,
    name: "Tomografía de Coherencia Óptica (OCT)",
    description: "Imágenes de alta resolución de la retina para diagnósticos precisos.",
  },
  {
    icon: Monitor,
    name: "Topógrafo corneal",
    description: "Mapeo 3D completo de la córnea para cirugías personalizadas.",
  },
  {
    icon: Microscope,
    name: "Microscopio quirúrgico premium",
    description: "Visualización de última generación para cirugías de precisión.",
  },
  {
    icon: Activity,
    name: "Láser excimer de última generación",
    description: "Tecnología avanzada para correcciones refractivas exactas.",
  },
];

const advantages = [
  "Equipos de marcas líderes mundiales",
  "Tecnología exclusiva en Ecuador",
  "Procedimientos mínimamente invasivos",
  "Recuperación más rápida",
];

export function Technology() {
  return (
    <section id="tecnologia" className="bg-ink py-24 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <h2 className="font-display text-3xl font-bold md:text-[2.5rem]">
            Tecnología que marca la diferencia
          </h2>
          <p className="text-lg leading-relaxed text-white/75 lg:justify-self-end lg:max-w-md">
            Equipamiento de última generación que no encontrarás en otros
            centros del país. Tu visión merece lo mejor.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-[480px]">
            <Image
              src="/dr1.jpeg"
              alt="La Dra. Vento Rojas trabajando con el microscopio quirúrgico"
              fill
              sizes="(min-width: 1024px) 620px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <ul className="space-y-2">
              {technologies.map((t) => (
                <li key={t.name} className="flex items-start gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-white/[0.05]">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-horus">
                    <t.icon className="size-6" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold">
                      {t.name}
                    </span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-white/70">
                      {t.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-white/[0.06] p-6">
              <p className="font-display text-lg font-semibold">
                La única clínica en Ecuador con este nivel tecnológico
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {advantages.map((a) => (
                  <li key={a} className="flex items-center gap-2.5 text-[15px] text-white/85">
                    <Check className="size-4 shrink-0 text-gold" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
