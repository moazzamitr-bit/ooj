"use client";

import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { ReferralFriendsTable } from "@/components/referral/referral-friends-table";
import { ReferralHero } from "@/components/referral/referral-hero";
import { ReferralInfoSection } from "@/components/referral/referral-info-section";
import { ReferralStatsRow } from "@/components/referral/referral-stats-row";
import { ReferralTipsBanner } from "@/components/referral/referral-tips-banner";
import { useApp } from "@/providers/app-provider";
import {
  getStudentInvitedFriends,
  getStudentReferralStats,
} from "@/lib/services/referral.service";

export default function StudentReferralPage() {
  const { student } = useApp();
  const stats = getStudentReferralStats(student.id);
  const invitedFriends = getStudentInvitedFriends(student.id);

  const shareText = `با لینک دعوت من به اوج بپیوند! https://owj.app/invite/${student.referral_code}`;
  const shareUrl = `https://owj.app/invite/${student.referral_code}`;

  return (
    <div className="min-h-dvh bg-[#FAFBFF]">
      <AppHeader authLabel="داشبورد" authHref="/student" />

      <main className="mx-auto max-w-[1200px] space-y-8 px-6 py-8 md:px-8 md:py-10">
        <ReferralHero
          referralCode={student.referral_code}
          shareUrl={shareUrl}
          shareText={shareText}
        />

        <ReferralStatsRow
          sent={stats.sent}
          registered={stats.registered}
          quizCompleted={stats.quizCompleted}
          totalChances={stats.totalChances}
        />

        <ReferralInfoSection />

        <ReferralFriendsTable friends={invitedFriends} />

        <ReferralTipsBanner />
      </main>

      <AppFooter />
    </div>
  );
}
