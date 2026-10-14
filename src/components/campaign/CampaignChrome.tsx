import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Logo } from "@/components/landing/Logo";
import { btn, contact } from "@/components/landing/site";

const helloLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hola, quisiera información.")}`;

export function CampaignHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" aria-label="OFTALMO HORUS Center, ir al sitio principal">
          <Logo />
        </Link>
        <a href={helloLink} target="_blank" rel="noopener noreferrer" className={btn.small}>
          <MessageCircle className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Escríbenos</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}

export function CampaignFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-6">
        <Logo inverted />
        <p className="text-[15px] leading-relaxed text-white/70">
          {contact.addressLine}, {contact.city}
          <br />
          {contact.hours[0]} · {contact.hours[1]} · Emergencias 24/7
        </p>
        <Link href="/" className="text-[15px] font-semibold text-white transition-colors hover:text-gold">
          Conoce el centro →
        </Link>
      </div>
    </footer>
  );
}
