"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#7c3aed] via-[#a78bfa] to-[#7c3aed] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#d4a853]/20 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Calendar className="w-10 h-10" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Agenda tu Cita con Nosotros
          </h2>

          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Programa tu consulta de manera sencilla y conveniente. Elige tu
            horario preferido y te garantizamos una atención sin tiempos de
            espera innecesarios.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#7c3aed] hover:bg-white/90 px-8 py-6 text-lg"
              asChild
            >
              <a href="#citas">
                Agendar Ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              <a href="tel:+593999999999">Llamar: +593 99 999 9999</a>
            </Button>
          </div>

          <p className="text-white/60 text-sm mt-8">
            Horario de atención: Lunes a Viernes 8:00 - 18:00 | Sábados 8:00 -
            13:00
          </p>
        </div>
      </div>
    </section>
  );
}
