"use client";

import { useEffect } from "react";
import { listenInviteOpens } from "@/lib/campaign/invite-opens";
import { useCampaignStore } from "@/store/campaign-store";
import { useApp } from "@/providers/app-provider";

/** Awards +5 chances when THIS student's invite link is opened (same browser / storage sync). */
export function InviteOpenListener() {
  const { student } = useApp();
  const inviteCode = useCampaignStore((s) => s.inviteCode);
  const campaignInvite = useCampaignStore((s) => s.campaign.invite_code);
  const record = useCampaignStore((s) => s.recordLinkOpenForMe);

  useEffect(() => {
    const myCodes = new Set(
      [student.referral_code, inviteCode, campaignInvite].filter(Boolean) as string[]
    );

    return listenInviteOpens((code) => {
      if (myCodes.has(code)) record();
    });
  }, [student.referral_code, inviteCode, campaignInvite, record]);

  return null;
}
