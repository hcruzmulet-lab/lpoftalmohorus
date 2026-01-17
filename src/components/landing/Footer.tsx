"use client";

import { Separator } from "@/components/ui/separator";
import {
  Eye,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

const footerLinks = {
  menu: [
    { name: "Inicio", href: "#inicio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Tecnología", href: "#tecnologia" },
    { name: "Especialista", href: "#especialista" },
  ],
  servicios: [
    { name: "Cirugía de Cataratas", href: "#servicios" },
    { name: "Corrección Láser", href: "#servicios" },
    { name: "Tratamiento Glaucoma", href: "#servicios" },
    { name: "Oftalmología Pediátrica", href: "#servicios" },
  ],
  legal: [
    { name: "Términos y Condiciones", href: "#" },
    { name: "Política de Privacidad", href: "#" },
    { name: "Aviso Legal", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="space-y-6">
            <a href="#inicio" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#d4a853] flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">
                  OFTALMO HORUS
                </span>
                <span className="text-xs text-white/60">Center</span>
              </div>
            </a>
            <p className="text-white/70 text-sm leading-relaxed">
              Centro oftalmológico de excelencia dedicado a transformar vidas a
              través de la mejor atención visual. Tu visión es nuestra misión.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#7c3aed] transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Menu column */}
          <div>
            <h4 className="font-semibold mb-6">Menú</h4>
            <ul className="space-y-3">
              {footerLinks.menu.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#d4a853] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div>
            <h4 className="font-semibold mb-6">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#d4a853] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="font-semibold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#d4a853] flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  Av. Principal #123
                  <br />
                  Quito, Ecuador
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#d4a853] flex-shrink-0" />
                <a
                  href="tel:+593999999999"
                  className="text-white/70 hover:text-white text-sm"
                >
                  +593 99 999 9999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#d4a853] flex-shrink-0" />
                <a
                  href="mailto:info@oftalmohorus.com"
                  className="text-white/70 hover:text-white text-sm"
                >
                  info@oftalmohorus.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#d4a853] flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  Lun - Vie: 8:00 - 18:00
                  <br />
                  Sáb: 8:00 - 13:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} OFTALMO HORUS Center. Todos los
            derechos reservados.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white/50 hover:text-white/70 text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
