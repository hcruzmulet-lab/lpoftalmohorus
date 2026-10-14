"use client";

import { useEffect, useId, useState } from "react";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { campaigns, type CampaignId } from "@/lib/campaigns";
import {
  buildWhatsAppMessage,
  readUtm,
  validateLead,
  whatsappUrl,
} from "@/lib/leads";
import {
  SELECT_INTEREST_EVENT,
  submitLead,
  type SelectInterestDetail,
} from "@/lib/submit-lead";
import { btn } from "@/components/landing/site";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-12 w-full rounded-[10px] border border-input bg-white px-4 text-[15px] text-ink placeholder:text-ink-soft/60 transition-colors focus:border-horus focus:outline-none focus:ring-3 focus:ring-horus/20 aria-[invalid=true]:border-destructive";

type Status = "idle" | "sending" | "done";

export function LeadForm({
  campaign,
  title,
  submitLabel = "Enviar por WhatsApp",
}: {
  campaign: CampaignId;
  title?: string;
  submitLabel?: string;
}) {
  const uid = useId();
  const config = campaigns[campaign];
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [waLink, setWaLink] = useState("");

  useEffect(() => {
    const onSelect = (e: Event) => {
      const detail = (e as CustomEvent<SelectInterestDetail>).detail;
      if (detail.campaign === campaign) {
        setValues((v) => ({ ...v, interest: detail.interest }));
      }
    };
    window.addEventListener(SELECT_INTEREST_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_INTEREST_EVENT, onSelect);
  }, [campaign]);

  const set =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const preview = buildWhatsAppMessage({ campaign, ...values });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const result = validateLead({
      campaign,
      ...values,
      page: window.location.pathname,
      referrer: document.referrer,
      utm: readUtm(window.location.search),
    });
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors({});

    const link = whatsappUrl(buildWhatsAppMessage(result.lead));
    setWaLink(link);
    // Se abre dentro del clic para que el navegador no lo bloquee.
    const win = window.open(link, "_blank");
    if (win) win.opener = null;

    setStatus("sending");
    await submitLead(result.lead);
    setStatus("done");
  };

  const field = (key: string) => ({
    id: `${uid}-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-error` : undefined,
  });

  const errorText = (key: string) =>
    errors[key] ? (
      <p id={`${uid}-${key}-error`} className="mt-1.5 text-sm text-destructive">
        {errors[key]}
      </p>
    ) : null;

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-white p-6 sm:p-8" role="status">
        <CheckCircle2 className="size-10 text-horus" aria-hidden="true" />
        <p className="mt-4 font-display text-2xl font-bold text-ink">
          Listo, te escribimos por WhatsApp
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          Si la conversación no se abrió, tócala aquí y envía el mensaje.
        </p>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className={cn(btn.primary, "mt-6 w-full")}>
          <MessageCircle className="size-[18px]" aria-hidden="true" />
          Abrir WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl bg-white p-6 sm:p-8">
      {title && <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>}

      <div className={cn("grid gap-5 sm:grid-cols-2", title && "mt-6")}>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-name`} className="mb-2 block text-sm font-semibold text-ink">
            Nombre completo
          </label>
          <input {...field("name")} autoComplete="name" placeholder="Ej. María García" value={values.name} onChange={set("name")} className={fieldClass} />
          {errorText("name")}
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className="mb-2 block text-sm font-semibold text-ink">
            Teléfono / WhatsApp
          </label>
          <input {...field("phone")} type="tel" autoComplete="tel" placeholder="+593 99 123 4567" value={values.phone} onChange={set("phone")} className={fieldClass} />
          {errorText("phone")}
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className="mb-2 block text-sm font-semibold text-ink">
            Correo <span className="font-normal text-ink-soft">(opcional)</span>
          </label>
          <input {...field("email")} type="email" autoComplete="email" placeholder="tu@email.com" value={values.email} onChange={set("email")} className={fieldClass} />
          {errorText("email")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-interest`} className="mb-2 block text-sm font-semibold text-ink">
            {config.interestLabel}
          </label>
          <select {...field("interest")} value={values.interest} onChange={set("interest")} className={fieldClass}>
            <option value="">Selecciona una opción</option>
            {config.interests.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
          {errorText("interest")}
        </div>

        {/* Honeypot: invisible para personas */}
        <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor={`${uid}-website`}>No llenar este campo</label>
          <input id={`${uid}-website`} tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-horus-mist p-4">
        <p className="text-[13px] font-semibold text-ink-soft">Así llegará tu mensaje</p>
        <p aria-live="polite" className="mt-1.5 whitespace-pre-line text-[15px] leading-relaxed text-ink">
          {preview}
        </p>
      </div>

      <button type="submit" disabled={status === "sending"} className={cn(btn.primary, "mt-6 h-14 w-full text-base disabled:opacity-70")}>
        <MessageCircle className="size-[18px]" aria-hidden="true" />
        {status === "sending" ? "Enviando…" : submitLabel}
      </button>
      <p className="mt-4 text-center text-[13px] text-ink-soft">
        Tus datos solo se usan para coordinar tu atención.
      </p>
    </form>
  );
}
