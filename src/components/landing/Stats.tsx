"use client";

import { Users, Award, Clock, Heart } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "+10k",
    label: "Pacientes Atendidos",
    description: "Confianza de miles de familias",
  },
  {
    icon: Award,
    value: "99%",
    label: "Cirugías Exitosas",
    description: "Resultados comprobados",
  },
  {
    icon: Clock,
    value: "15+",
    label: "Años de Trayectoria",
    description: "Experiencia que respalda",
  },
  {
    icon: Heart,
    value: "100%",
    label: "Compromiso",
    description: "Con tu salud visual",
  },
];

export function Stats() {
  return (
    <section className="relative -mt-20 z-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="bg-[#7c3aed] rounded-3xl py-10 px-8 shadow-2xl shadow-[#7c3aed]/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <stat.icon className="w-12 h-12 mx-auto text-white mb-4" />
                <p className="text-4xl md:text-5xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-white/90 font-medium">{stat.label}</p>
                <p className="text-white/60 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
