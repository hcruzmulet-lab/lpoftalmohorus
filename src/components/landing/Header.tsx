"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { btn, contact } from "./site";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Inicio", href: "#inicio" },
  { name: "Servicios", href: "#servicios" },
  { name: "Especialista", href: "#especialista" },
  { name: "Tecnología", href: "#tecnologia" },
  { name: "Testimonios", href: "#testimonios" },
  { name: "Contacto", href: "#citas" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
      // Sección activa: la última cuyo inicio ya pasó bajo la barra
      let current = navLinks[0].href;
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el && el.getBoundingClientRect().top <= 120) current = link.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Barra superior de información */}
      <div className="hidden bg-horus-mist text-[13px] text-ink-soft md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-5">
            <span>Tu visión, nuestra prioridad</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-horus" aria-hidden="true" />
              Emergencias oculares 24/7
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={contact.phoneHref}
              className="flex items-center gap-1.5 transition-colors hover:text-horus"
            >
              <Phone className="size-3.5 text-horus" aria-hidden="true" />
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-horus"
            >
              <Mail className="size-3.5 text-horus" aria-hidden="true" />
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 bg-white transition-shadow duration-300",
          isScrolled && "shadow-[0_6px_24px_-12px_rgba(29,20,51,0.18)]"
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 md:px-6">
          <a href="#inicio" aria-label="OFTALMO HORUS Center, ir al inicio">
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-[15px] font-medium transition-colors",
                    isActive ? "text-horus" : "text-ink hover:text-horus"
                  )}
                >
                  {link.name}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-horus transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <a href="#citas" className={btn.small}>
              Agendar cita
            </a>
          </div>

          <button
            className="grid size-11 place-items-center rounded-[10px] text-ink transition-colors hover:bg-horus-mist lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="menu-movil"
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            id="menu-movil"
            aria-label="Principal móvil"
            className="bg-white px-4 pb-6 pt-2 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="block py-3 text-base font-medium text-ink hover:text-horus"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#citas"
              className={cn(btn.primary, "mt-3 w-full")}
              onClick={() => setIsMenuOpen(false)}
            >
              Agendar cita
            </a>
            <a
              href={contact.phoneHref}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-ink-soft"
            >
              <Phone className="size-4 text-horus" />
              Emergencias 24/7: {contact.phoneDisplay}
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
