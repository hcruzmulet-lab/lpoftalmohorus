"use client";

import type { ReactNode } from "react";
import type { CampaignId } from "@/lib/campaigns";
import { selectInterest } from "@/lib/submit-lead";

export function InterestButton({
  campaign,
  interest,
  children,
  className,
}: {
  campaign: CampaignId;
  interest: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href="#formulario" onClick={() => selectInterest(campaign, interest)} className={className}>
      {children}
    </a>
  );
}
