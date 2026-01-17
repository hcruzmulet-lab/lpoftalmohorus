"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Zap, Shield, Baby } from "lucide-react";

const services = [
  {
    icon: Eye,
    title: "Cirugía de Cataratas",
    description:
      "Procedimientos de última generación con lentes intraoculares premium para restaurar tu visión de forma definitiva.",
  },
  {
    icon: Zap,
    title: "Corrección Láser",
    description:
      "Libérate de los lentes con tecnología LASIK y PRK. Procedimientos seguros y resultados inmediatos.",
  },
  {
    icon: Shield,
    title: "Tratamiento de Glaucoma",
    description:
      "Diagnóstico temprano y tratamiento integral del glaucoma para preservar tu visión a largo plazo.",
  },
  {
    icon: Baby,
    title: "Oftalmología Pediátrica",
    description:
      "Cuidado especializado para los ojos de los más pequeños. Detección y tratamiento de problemas visuales infantiles.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#7c3aed] font-semibold mb-2">
            Nuestros Servicios
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Especialidades que Transforman Vidas
          </h2>
          <p className="text-gray-500">
            Ofrecemos una gama completa de servicios oftalmológicos con la más
            avanzada tecnología y un equipo humano comprometido con tu bienestar
            visual.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group border border-gray-200 hover:border-[#7c3aed]/50 rounded-2xl shadow-none hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-8 text-center">
                {/* Icon */}
                <div className="mb-6">
                  <service.icon className="w-14 h-14 mx-auto text-[#7c3aed] stroke-[1.5]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-black mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 bg-gradient-to-r from-[#7c3aed]/5 to-[#d4a853]/5 rounded-3xl p-8 md:p-12 border border-[#7c3aed]">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-black">
                ¿No estás seguro qué servicio necesitas?
              </h3>
              <p className="text-gray-500 mb-6">
                Agenda una valoración completa y nuestro equipo te orientará
                hacia el tratamiento más adecuado para ti.
              </p>
              <Button
                size="lg"
                className="bg-[#7c3aed] hover:bg-[#7c3aed]/90"
                asChild
              >
                <a href="#citas">
                  Solicitar Valoración
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <p className="text-3xl font-bold text-[#7c3aed]">24/7</p>
                <p className="text-sm text-gray-500">
                  Atención de emergencias
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <p className="text-3xl font-bold text-[#7c3aed]">30 min</p>
                <p className="text-sm text-gray-500">
                  Valoración completa
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
