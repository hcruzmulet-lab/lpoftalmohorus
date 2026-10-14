import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { Logo } from "./Logo";
import { contact } from "./site";

const footerLinks = {
  menu: [
    { name: "Inicio", href: "#inicio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Especialista", href: "#especialista" },
    { name: "Tecnología", href: "#tecnologia" },
    { name: "Testimonios", href: "#testimonios" },
  ],
  servicios: [
    { name: "Cirugía de Cataratas", href: "#servicios" },
    { name: "Corrección Láser", href: "#servicios" },
    { name: "Tratamiento de Glaucoma", href: "#servicios" },
    { name: "Oftalmología Pediátrica", href: "#servicios" },
  ],
  legal: [
    { name: "Términos y condiciones", href: "#" },
    { name: "Política de privacidad", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <a href="#inicio" aria-label="OFTALMO HORUS Center, ir al inicio">
              <Logo inverted />
            </a>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-white/70">
              Centro oftalmológico en Quito dedicado a transformar vidas a
              través de la mejor atención visual.
            </p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-[10px] bg-white/[0.08] transition-colors hover:bg-horus"
                >
                  <s.icon className="size-[18px]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Menú del pie">
            <h3 className="font-display text-base font-semibold">Menú</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.menu.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-[15px] text-white/70 transition-colors hover:text-gold">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Servicios">
            <h3 className="font-display text-base font-semibold">Servicios</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.servicios.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-[15px] text-white/70 transition-colors hover:text-gold">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-base font-semibold">Contacto</h3>
            <ul className="mt-5 space-y-4 text-[15px] text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-[18px] shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {contact.addressLine}, {contact.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-[18px] shrink-0 text-gold" aria-hidden="true" />
                <a href={contact.phoneHref} className="hover:text-white">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-[18px] shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-[18px] shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {contact.hours[0]}
                  <br />
                  {contact.hours[1]} · Emergencias 24/7
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-2xl bg-white/[0.05] px-6 py-5 text-sm text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} OFTALMO HORUS Center. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            {footerLinks.legal.map((l) => (
              <a key={l.name} href={l.href} className="transition-colors hover:text-white">
                {l.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
