"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin } from "lucide-react";

export function Appointment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="citas" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Form */}
          <div>
            <Badge
              variant="secondary"
              className="bg-[#7c3aed]/10 text-[#7c3aed] border-[#7c3aed]/20 mb-4"
            >
              Agenda tu Cita
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transforma tu <span className="text-[#7c3aed]">Mirada</span> Hoy
            </h2>
            <p className="text-muted-foreground mb-8">
              Completa el formulario y nuestro equipo se pondrá en contacto
              contigo para confirmar tu cita en las próximas 24 horas.
            </p>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      placeholder="Ingresa tu nombre completo"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+593 99 999 9999"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Fecha Preferida</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Servicio de Interés</Label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Selecciona un servicio</option>
                        <option value="valoracion">Valoración General</option>
                        <option value="cataratas">Cirugía de Cataratas</option>
                        <option value="laser">Corrección Láser</option>
                        <option value="glaucoma">Tratamiento Glaucoma</option>
                        <option value="pediatrica">
                          Oftalmología Pediátrica
                        </option>
                      </select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#7c3aed] hover:bg-[#7c3aed]/90 h-14 text-lg"
                  >
                    Solicitar Cita
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Al enviar este formulario, aceptas nuestra política de
                    privacidad. Tus datos están seguros con nosotros.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right - Map with floating contact card */}
          <div className="relative h-full min-h-[600px]">
            {/* Map Container */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7975!2d-78.4678!3d-0.1807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTAnNTAuNSJTIDc4wrAyOCcwNC4xIlc!5e0!3m2!1ses!2sec!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "600px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[30%]"
              />

              {/* Floating Contact Card */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <Card className="border border-[#7c3aed] shadow-2xl bg-white/70 backdrop-blur-xl max-w-lg">
                  <CardContent className="px-3 py-0.5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#7c3aed]" />
                        <p className="font-medium text-xs">+593 99 999 9999</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#7c3aed]" />
                        <p className="font-medium text-xs">info@oftalmohorus.com</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#7c3aed]" />
                        <p className="font-medium text-xs">Quito, Ecuador</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
