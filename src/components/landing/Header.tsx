"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Eye } from "lucide-react";

const navLinks = [
  { name: "Inicio", href: "#inicio" },
  { name: "Servicios", href: "#servicios" },
  { name: "Tecnología", href: "#tecnologia" },
  { name: "Especialista", href: "#especialista" },
  { name: "Testimonios", href: "#testimonios" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4">
      <div
        className={`
          mx-auto max-w-6xl
          bg-white/40 backdrop-blur-2xl backdrop-saturate-150
          border border-white/50
          rounded-2xl
          shadow-[0_8px_32px_rgba(124,58,237,0.08)]
          transition-all duration-300
          ${isScrolled ? "bg-white/60 shadow-[0_8px_32px_rgba(124,58,237,0.12)]" : ""}
        `}
      >
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#d4a853] flex items-center justify-center shadow-md">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-[#7c3aed] leading-tight">
                  OFTALMO HORUS
                </span>
                <span className="text-[10px] text-muted-foreground">Center</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/70 hover:text-[#7c3aed] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                className="bg-[#7c3aed] hover:bg-[#7c3aed]/90 text-white px-5 rounded-xl shadow-md shadow-[#7c3aed]/25"
                asChild
              >
                <a href="#citas">Agendar Cita</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-white/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-white/30">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-foreground/70 hover:text-[#7c3aed] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <Button
                  className="bg-[#7c3aed] hover:bg-[#7c3aed]/90 text-white w-full mt-2 rounded-xl"
                  asChild
                >
                  <a href="#citas">Agendar Cita</a>
                </Button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
