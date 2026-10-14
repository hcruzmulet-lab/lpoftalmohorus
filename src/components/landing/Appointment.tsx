"use client";

import { useEffect, useMemo, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import {
  btn,
  contact,
  services,
  SELECT_SERVICE_EVENT,
  type ServiceId,
} from "./site";

type FormState = {
  name: string;
  phone: string;
  email: string;
  date: string;
  service: ServiceId | "";
};

const fieldClass =
  "h-12 w-full rounded-[10px] border border-input bg-white px-4 text-[15px] text-ink placeholder:text-ink-soft/60 transition-colors focus:border-horus focus:outline-none focus:ring-3 focus:ring-horus/20 aria-[invalid=true]:border-destructive";

function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-EC", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function Appointment() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    date: "",
    service: "",
  });
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<ServiceId>).detail;
      setForm((f) => ({ ...f, service: id }));
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  const update = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const serviceName = services.find((s) => s.id === form.service)?.name;

  const message = useMemo(() => {
    const lines = [
      `Hola, soy ${form.name.trim() || "[tu nombre]"}. Quisiera agendar una cita`,
      serviceName ? `para ${serviceName}` : "de valoración",
      form.date ? `el ${formatDate(form.date)}.` : "en la fecha más próxima disponible.",
    ];
    const contactLine = [form.phone.trim(), form.email.trim()].filter(Boolean).join(" · ");
    return `${lines.join(" ")}${contactLine ? `\nMi contacto: ${contactLine}` : ""}`;
  }, [form, serviceName]);

  const nameMissing = form.name.trim() === "";
  const phoneMissing = form.phone.trim() === "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameMissing || phoneMissing) {
      setShowErrors(true);
      return;
    }
    const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="citas" className="bg-horus-mist py-24 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink md:text-[2.5rem]">
            Agenda tu cita
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
            Completa tus datos y envíalos por WhatsApp. Nuestro equipo confirma
            tu cita en menos de 24 horas.
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-9 rounded-2xl bg-white p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">
                  Nombre completo
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  placeholder="Ej. María García"
                  value={form.name}
                  onChange={update("name")}
                  aria-invalid={showErrors && nameMissing}
                  aria-describedby={showErrors && nameMissing ? "name-error" : undefined}
                  className={fieldClass}
                />
                {showErrors && nameMissing && (
                  <p id="name-error" className="mt-1.5 text-sm text-destructive">
                    Escribe tu nombre para saber a quién atender.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-ink">
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+593 99 999 9999"
                  value={form.phone}
                  onChange={update("phone")}
                  aria-invalid={showErrors && phoneMissing}
                  aria-describedby={showErrors && phoneMissing ? "phone-error" : undefined}
                  className={fieldClass}
                />
                {showErrors && phoneMissing && (
                  <p id="phone-error" className="mt-1.5 text-sm text-destructive">
                    Necesitamos un teléfono para confirmar tu cita.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">
                  Correo <span className="font-normal text-ink-soft">(opcional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={update("email")}
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="service" className="mb-2 block text-sm font-semibold text-ink">
                  Servicio
                </label>
                <select
                  id="service"
                  value={form.service}
                  onChange={update("service")}
                  className={fieldClass}
                >
                  <option value="">Selecciona un servicio</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="mb-2 block text-sm font-semibold text-ink">
                  Fecha preferida
                </label>
                <input
                  id="date"
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={update("date")}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="mt-7 rounded-xl bg-horus-mist p-4">
              <p className="text-[13px] font-semibold text-ink-soft">
                Así llegará tu mensaje
              </p>
              <p
                aria-live="polite"
                className="mt-1.5 whitespace-pre-line text-[15px] leading-relaxed text-ink"
              >
                {message}
              </p>
            </div>

            <button type="submit" className={`${btn.primary} mt-6 h-14 w-full text-base`}>
              <Send className="size-[18px]" aria-hidden="true" />
              Enviar por WhatsApp
            </button>
            <p className="mt-4 text-center text-[13px] text-ink-soft">
              Tus datos solo se usan para coordinar tu cita.
            </p>
          </form>
        </div>

        {/* Mapa y contacto */}
        <div className="flex flex-col gap-5">
          <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-2xl bg-white">
            <iframe
              title="Ubicación de OFTALMO HORUS Center en Quito"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7975!2d-78.4678!3d-0.1807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTAnNTAuNSJTIDc4wrAyOCcwNC4xIlc!5e0!3m2!1ses!2sec!4v1234567890"
              className="absolute inset-0 size-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <ul className="grid gap-5 rounded-2xl bg-white p-6 sm:grid-cols-2">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-horus" aria-hidden="true" />
              <span className="text-[15px] text-ink">
                {contact.addressLine}
                <br />
                <span className="text-ink-soft">{contact.city}</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-horus" aria-hidden="true" />
              <span className="text-[15px] text-ink">
                {contact.hours[0]}
                <br />
                <span className="text-ink-soft">{contact.hours[1]}</span>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-5 shrink-0 text-horus" aria-hidden="true" />
              <a href={contact.phoneHref} className="text-[15px] text-ink hover:text-horus">
                {contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-5 shrink-0 text-horus" aria-hidden="true" />
              <a
                href={`mailto:${contact.email}`}
                className="break-all text-[15px] text-ink hover:text-horus"
              >
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
