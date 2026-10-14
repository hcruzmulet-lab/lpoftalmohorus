import { cn } from "@/lib/utils";

/** Marca provisional: ojo de Horus estilizado (ceja, almendra, iris dorado, lágrima y espiral). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="64" height="64" rx="16" fill="#7c3aed" />
      {/* ceja */}
      <path d="M12 19.5C22 14.5 39 13 53 17" stroke="#fff" strokeWidth="3.5" />
      {/* almendra */}
      <path
        d="M10 31c7-8 16-11.5 24-11.5S48 23 54 30.5C47 35.5 40 38 32 38s-15.5-2.5-22-7Z"
        stroke="#fff"
        strokeWidth="3.5"
      />
      {/* iris */}
      <circle cx="32" cy="29" r="7" fill="#d4a853" />
      <circle cx="32" cy="29" r="3" fill="#1d1433" />
      {/* lágrima */}
      <path d="M24 38.5 21 51" stroke="#fff" strokeWidth="3.5" />
      {/* espiral */}
      <path
        d="M34 38.5c1 6 4.5 10.5 10 10.5 4 0 6-2.5 6-5s-2-4-4-4-3.2 1.2-3.2 2.8"
        stroke="#d4a853"
        strokeWidth="3.5"
      />
    </svg>
  );
}

export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="size-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[17px] font-bold tracking-[-0.02em]",
            inverted ? "text-white" : "text-ink"
          )}
        >
          OFTALMO <span className={inverted ? "text-gold" : "text-horus"}>HORUS</span>
        </span>
        <span
          className={cn(
            "mt-1 text-[12px] font-medium",
            inverted ? "text-white/70" : "text-ink-soft"
          )}
        >
          Center · Oftalmología
        </span>
      </span>
    </span>
  );
}
