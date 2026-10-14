import type { CampaignId } from "./campaigns";
import type { Lead } from "./leads";

export async function submitLead(lead: Lead): Promise<boolean> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      keepalive: true,
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const SELECT_INTEREST_EVENT = "horus:select-interest";

export type SelectInterestDetail = { campaign: CampaignId; interest: string };

export function selectInterest(campaign: CampaignId, interest: string) {
  window.dispatchEvent(
    new CustomEvent<SelectInterestDetail>(SELECT_INTEREST_EVENT, {
      detail: { campaign, interest },
    }),
  );
}
