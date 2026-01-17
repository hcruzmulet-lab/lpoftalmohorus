"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "María García",
    role: "Paciente de Cirugía Láser",
    content:
      "Después de 20 años usando lentes, la Dra. Yelín me devolvió la libertad visual. El procedimiento fue rápido y sin dolor. ¡Ahora veo mejor que nunca!",
    rating: 5,
    image: "MG",
  },
  {
    name: "Carlos Mendoza",
    role: "Paciente de Cataratas",
    content:
      "La atención en OFTALMO HORUS es de primer nivel. Desde la primera consulta me sentí en confianza. La cirugía de cataratas cambió mi vida completamente.",
    rating: 5,
    image: "CM",
  },
  {
    name: "Ana Rodríguez",
    role: "Madre de Paciente Pediátrico",
    content:
      "Llevé a mi hijo por un problema de estrabismo. La Dra. Yelín fue increíblemente paciente y cariñosa. El tratamiento fue todo un éxito.",
    rating: 5,
    image: "AR",
  },
  {
    name: "Roberto Pérez",
    role: "Paciente de Glaucoma",
    content:
      "El diagnóstico temprano y el tratamiento del glaucoma me salvaron la visión. Eternamente agradecido con la Dra. Yelín y todo su equipo.",
    rating: 5,
    image: "RP",
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="secondary"
            className="bg-[#7c3aed]/10 text-[#7c3aed] border-[#7c3aed]/20 mb-4"
          >
            Testimonios
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lo que Dicen Nuestros{" "}
            <span className="text-[#7c3aed]">Pacientes</span>
          </h2>
          <p className="text-muted-foreground">
            Miles de pacientes han confiado en nosotros para cuidar su visión.
            Estas son algunas de sus historias.
          </p>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="relative">
        <div className="flex animate-scroll gap-6 hover:pause-animation">
          {/* First set */}
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-[400px] border border-[#7c3aed] rounded-2xl shadow-lg"
            >
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-[#7c3aed]/20 mb-4" />

                <p className="text-gray-600 mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.image}
                    </div>
                    <div>
                      <p className="font-semibold text-black">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#7c3aed] text-[#7c3aed]"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {/* Duplicate set for seamless loop */}
          {testimonials.map((testimonial, index) => (
            <Card
              key={`dup-${index}`}
              className="flex-shrink-0 w-[400px] border border-[#7c3aed] rounded-2xl shadow-lg"
            >
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-[#7c3aed]/20 mb-4" />

                <p className="text-gray-600 mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.image}
                    </div>
                    <div>
                      <p className="font-semibold text-black">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#7c3aed] text-[#7c3aed]"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Stats bar */}
        <div className="mt-16 bg-gradient-to-r from-[#7c3aed]/5 to-[#7c3aed]/10 rounded-3xl p-8 border border-[#7c3aed]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#7c3aed]">
                4.9
              </p>
              <div className="flex justify-center gap-0.5 my-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#7c3aed] text-[#7c3aed]"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Calificación Promedio
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#7c3aed]">
                +500
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Reseñas en Google
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#7c3aed]">
                98%
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Pacientes Satisfechos
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#7c3aed]">
                95%
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Nos Recomiendan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
