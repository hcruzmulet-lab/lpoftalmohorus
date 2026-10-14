import { CampaignFooter, CampaignHeader } from "@/components/campaign/CampaignChrome";

export default function CampaignLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CampaignHeader />
      <main>{children}</main>
      <CampaignFooter />
    </>
  );
}
