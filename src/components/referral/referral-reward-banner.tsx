"use client";

import Image from "next/image";
import Link from "next/link";

import campaignBg from "@/assets/images/referral-campaign-bg.png";

export function ReferralRewardBanner() {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-violet-100/70 shadow-[0_12px_40px_rgba(109,77,255,0.14)]">
      <Link
        href="/student/referral"
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="کمپین دعوت ویژه — ۲,۰۰۰,۰۰۰ تومان جایزه نقدی هفتگی، دوستاتو دعوت کن"
      >
        <Image
          src={campaignBg}
          alt="کمپین دعوت ویژه: ۲,۰۰۰,۰۰۰ تومان جایزه نقدی هفتگی! هر دوستی که با دعوت تو عضو بشه فوری به حسابت واریز می‌شود. حداکثر ۲ دعوت موفق در هر هفته."
          priority
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </Link>
    </section>
  );
}
