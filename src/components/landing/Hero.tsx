"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, CheckCircle } from "lucide-react";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[calc(100vh-300px)] pt-20 pb-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/header.jpg"
          alt="OFTALMO HORUS Center"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 right-10 w-72 h-72 bg-[#7c3aed]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#d4a853]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          {/* Glassmorphism card */}
          <div className="bg-white/40 backdrop-blur-2xl backdrop-saturate-150 rounded-3xl p-8 md:p-12 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <div className="space-y-8">
              <div className="flex justify-end">
                <Badge
                  variant="secondary"
                  className="bg-white/60 text-black border-white/40 px-4 py-2 font-medium"
                >
                  Centro Oftalmológico de Excelencia
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-black tracking-tight">
                Tu visión en manos expertas
                <br />
                Excelencia Oftalmológica
              </h1>

              <p className="text-lg text-black/80 max-w-2xl font-medium">
                En OFTALMO HORUS Center brindamos atención oftalmológica con los
                más altos estándares internacionales. La Dra. Yelín Vento Rojas y
                su equipo están comprometidos con tu salud visual.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#7c3aed] hover:bg-[#7c3aed]/90 text-white px-8 py-6 text-lg shadow-lg shadow-[#7c3aed]/25"
                  asChild
                >
                  <a href="#citas">
                    Agendar Valoración VIP
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/5 px-8 py-6 text-lg bg-white/50"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Ver Video
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-black/70 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#7c3aed]" />
                  Tecnología de punta
                </div>
                <div className="flex items-center gap-2 text-sm text-black/70 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#7c3aed]" />
                  Atención personalizada
                </div>
                <div className="flex items-center gap-2 text-sm text-black/70 font-medium">
                  <CheckCircle className="w-5 h-5 text-[#7c3aed]" />
                  Resultados garantizados
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
