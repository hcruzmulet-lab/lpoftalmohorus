import { ArrowRight, Phone } from "lucide-react";
import { contact } from "./site";

export function CTA() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-horus px-8 py-14 text-white md:px-14 md:py-16">
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold md:text-[2.5rem]">
                Agenda tu cita con nosotros
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/85">
                Elige tu horario preferido y te atendemos sin tiempos de espera
                innecesarios. Lunes a viernes 8:00 – 18:00, sábados 8:00 – 13:00.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href="#citas"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-white px-6 text-[15px] font-semibold text-horus transition-colors hover:bg-gold hover:text-ink"
              >
                Agendar ahora
                <ArrowRight className="size-[18px]" aria-hidden="true" />
              </a>
              <a
                href={contact.phoneHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-white/50 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="size-[18px]" aria-hidden="true" />
                {contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
