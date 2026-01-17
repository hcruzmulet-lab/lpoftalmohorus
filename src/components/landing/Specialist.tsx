"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Award,
  Globe,
  Heart,
  ArrowRight,
  Quote,
} from "lucide-react";

const credentials = [
  {
    icon: GraduationCap,
    title: "Formación de Excelencia",
    description:
      "Especialización en oftalmología en las mejores instituciones de Latinoamérica",
  },
  {
    icon: Award,
    title: "Certificaciones Internacionales",
    description:
      "Avalada por sociedades oftalmológicas de prestigio mundial",
  },
  {
    icon: Globe,
    title: "Experiencia Global",
    description:
      "Formación continua y actualización en centros de referencia internacional",
  },
  {
    icon: Heart,
    title: "Enfoque Humano",
    description:
      "Cada paciente es único, con necesidades y expectativas que merecen atención personalizada",
  },
];

export function Specialist() {
  return (
    <section id="especialista" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image and decorations */}
          <div className="relative">
            {/* Main image container */}
            <div className="relative bg-gradient-to-br from-[#7c3aed]/10 to-[#d4a853]/10 rounded-3xl p-6">
              <div className="aspect-[3/4] relative rounded-2xl overflow-hidden">
                <Image
                  src="/dra3.jpeg"
                  alt="Dra. Yelín Vento Rojas - Oftalmóloga Especialista"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Decorative badge */}
              <div className="absolute -top-4 -right-4 bg-[#d4a853] text-white rounded-2xl px-6 py-3 shadow-lg">
                <p className="text-2xl font-bold">15+</p>
                <p className="text-xs">Años de Experiencia</p>
              </div>

              {/* Quote card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl max-w-xs">
                <Quote className="w-8 h-8 text-[#7c3aed]/20 mb-2" />
                <p className="text-sm italic text-muted-foreground">
                  &ldquo;Mi misión es devolver la claridad visual a cada
                  paciente, utilizando la mejor tecnología con un toque
                  humano.&rdquo;
                </p>
                <p className="text-sm font-semibold text-[#7c3aed] mt-2">
                  - Dra. Yelín Vento Rojas
                </p>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div>
              <Badge
                variant="secondary"
                className="bg-[#7c3aed]/10 text-[#7c3aed] border-[#7c3aed]/20 mb-4"
              >
                Conozca a la Especialista
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Dra. Yelín Vento Rojas
                <span className="block text-xl text-[#7c3aed] font-normal mt-2">
                  Fundadora de OFTALMO HORUS Center
                </span>
              </h2>
              <p className="text-muted-foreground">
                Con más de 15 años dedicados a la oftalmología, la Dra. Yelín
                Vento Rojas ha transformado la vida de miles de pacientes en
                Ecuador. Su pasión por la excelencia médica y su compromiso con
                el bienestar de cada persona la llevaron a fundar OFTALMO HORUS
                Center, un centro de referencia oftalmológica con los más altos
                estándares internacionales.
              </p>
            </div>

            {/* Credentials grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {credentials.map((credential, index) => (
                <Card key={index} className="border-0 bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center flex-shrink-0">
                        <credential.icon className="w-5 h-5 text-[#7c3aed]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">
                          {credential.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {credential.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#7c3aed] hover:bg-[#7c3aed]/90"
                asChild
              >
                <a href="#citas">
                  Agendar Consulta
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/5"
              >
                Ver Trayectoria Completa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
