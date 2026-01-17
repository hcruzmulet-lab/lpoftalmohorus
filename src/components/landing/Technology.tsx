"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Scan,
  Monitor,
  Microscope,
  Activity,
  CheckCircle2,
} from "lucide-react";

const technologies = [
  {
    icon: Scan,
    name: "Tomografía de Coherencia Óptica (OCT)",
    description:
      "Imágenes de alta resolución de la retina para diagnósticos precisos",
  },
  {
    icon: Monitor,
    name: "Topógrafo Corneal",
    description: "Mapeo 3D completo de la córnea para cirugías personalizadas",
  },
  {
    icon: Microscope,
    name: "Microscopio Quirúrgico Premium",
    description: "Visualización de última generación para cirugías de precisión",
  },
  {
    icon: Activity,
    name: "Láser Excimer de Última Generación",
    description: "Tecnología avanzada para correcciones refractivas perfectas",
  },
];

const advantages = [
  "Equipos de marcas líderes mundiales",
  "Tecnología exclusiva en Ecuador",
  "Resultados superiores comprobados",
  "Procedimientos mínimamente invasivos",
  "Mayor seguridad y precisión",
  "Recuperación más rápida",
];

export function Technology() {
  return (
    <section id="tecnologia" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="secondary"
            className="bg-[#7c3aed]/10 text-[#7c3aed] border-[#7c3aed]/20 mb-4"
          >
            El Factor Horus
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tecnología que Marca la{" "}
            <span className="text-[#7c3aed]">Diferencia</span>
          </h2>
          <p className="text-muted-foreground">
            En OFTALMO HORUS Center contamos con equipamiento de última
            generación que no encontrarás en otros centros del país. Tu visión
            merece lo mejor.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Technology Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {technologies.map((tech, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center mb-4">
                    <tech.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tech.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right - Visual and Advantages */}
          <div className="space-y-8">
            {/* Visual with background image */}
            <div className="relative rounded-3xl aspect-video overflow-hidden">
              <Image
                src="/dr1.jpeg"
                alt="Tecnología oftalmológica"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7c3aed]/90 via-[#7c3aed]/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h3 className="text-xl font-bold mb-2">
                  Precisión Milimétrica
                </h3>
                <p className="text-white/90 text-sm max-w-xs">
                  Nuestra tecnología permite diagnósticos y tratamientos con una
                  precisión sin precedentes
                </p>
              </div>
            </div>

            {/* Advantages */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-4">
                ¿Por qué elegir nuestra tecnología?
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#7c3aed] flex-shrink-0" />
                    <span className="text-sm">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom banner */}
        <div className="mt-16 bg-gradient-to-r from-[#7c3aed] to-[#d4a853] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">
            La única clínica en Ecuador con este nivel tecnológico
          </h3>
          <p className="text-white/90">
            Invertimos constantemente en la mejor tecnología para ofrecerte
            resultados excepcionales
          </p>
        </div>
      </div>
    </section>
  );
}
