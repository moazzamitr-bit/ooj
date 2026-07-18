"use client";

import { ChanceToast } from "@/components/campaign/chance-toast";
import { InviteOpenListener } from "@/components/campaign/invite-open-listener";

export function CampaignOverlays() {
  return (
    <>
      <InviteOpenListener />
      <ChanceToast />
    </>
  );
}
