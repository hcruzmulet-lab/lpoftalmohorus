import { Star } from "lucide-react";

export const testimonials = [
  {
    name: "María García",
    role: "Paciente de cirugía láser",
    content:
      "Después de 20 años usando lentes, la Dra. Yelín me devolvió la libertad visual. El procedimiento fue rápido y sin dolor. ¡Ahora veo mejor que nunca!",
    initials: "MG",
  },
  {
    name: "Carlos Mendoza",
    role: "Paciente de cataratas",
    content:
      "La atención en OFTALMO HORUS es de primer nivel. Desde la primera consulta me sentí en confianza. La cirugía de cataratas cambió mi vida completamente.",
    initials: "CM",
  },
  {
    name: "Ana Rodríguez",
    role: "Madre de paciente pediátrico",
    content:
      "Llevé a mi hijo por un problema de estrabismo. La Dra. Yelín fue increíblemente paciente y cariñosa. El tratamiento fue todo un éxito.",
    initials: "AR",
  },
  {
    name: "Roberto Pérez",
    role: "Paciente de glaucoma",
    content:
      "El diagnóstico temprano y el tratamiento del glaucoma me salvaron la visión. Eternamente agradecido con la Dra. Yelín y todo su equipo.",
    initials: "RP",
  },
];

const ratings = [
  { value: "4.9", label: "Calificación promedio" },
  { value: "+500", label: "Reseñas en Google" },
  { value: "98%", label: "Pacientes satisfechos" },
  { value: "95%", label: "Nos recomiendan" },
];

function TestimonialCard({
  t,
  hidden = false,
}: {
  t: (typeof testimonials)[number];
  hidden?: boolean;
}) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="flex w-[min(86vw,400px)] shrink-0 flex-col rounded-2xl bg-horus-mist p-7"
    >
      <span className="flex gap-0.5" aria-label="5 de 5 estrellas">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-gold text-gold" aria-hidden="true" />
        ))}
      </span>
      <blockquote className="mt-4 flex-1 text-[16px] leading-relaxed text-ink">
        &ldquo;{t.content}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-horus font-semibold text-white">
          {t.initials}
        </span>
        <span>
          <span className="block font-semibold text-ink">{t.name}</span>
          <span className="block text-sm text-ink-soft">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section id="testimonios" className="overflow-hidden bg-white py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold text-ink md:text-[2.5rem]">
              Lo que dicen nuestros pacientes
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Miles de pacientes han confiado en nosotros para cuidar su
              visión. Estas son algunas de sus historias.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4">
            {ratings.map((r) => (
              <div key={r.label}>
                <dt className="sr-only">{r.label}</dt>
                <dd className="font-display text-3xl font-bold text-horus">{r.value}</dd>
                <dd className="mt-1 text-sm text-ink-soft">{r.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-14 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="animate-marquee flex w-max gap-5 pl-5 motion-reduce:w-auto motion-reduce:overflow-x-auto motion-reduce:pb-4">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
          {testimonials.map((t) => (
            <TestimonialCard key={`dup-${t.name}`} t={t} hidden />
          ))}
        </div>
      </div>
    </section>
  );
}
