"use client";

import Image from "next/image";
import Link from "next/link";
import { Crown, ShieldCheck, UserPlus, Wallet } from "lucide-react";

import campaignBg from "@/assets/images/referral-campaign-bg.png";

const infoRows = [
  {
    id: "invite",
    text: (
      <>
        <span aria-hidden>🎁 </span>
        هر دوستی که با دعوت تو عضو بشه:
      </>
    ),
    icon: UserPlus,
  },
  {
    id: "reward",
    text: (
      <>
        <span aria-hidden>💵 </span>
        <span className="font-extrabold text-primary">۱,۰۰۰,۰۰۰ تومان</span> فوری به حسابت
        واریز می‌شه!
      </>
    ),
    icon: Wallet,
  },
  {
    id: "limit",
    text: (
      <>
        <span aria-hidden>🔥 </span>
        حداکثر ۲ دعوت موفق در هر هفته
      </>
    ),
    icon: ShieldCheck,
  },
] as const;

function InfoRow({
  text,
  icon: Icon,
}: {
  text: React.ReactNode;
  icon: typeof UserPlus;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/85 bg-white/95 px-4 py-3 shadow-[0_6px_20px_rgba(109,77,255,0.1)] backdrop-blur-sm">
      <p className="flex-1 text-right text-sm font-semibold leading-7 text-slate-700 md:text-[15px]">
        {text}
      </p>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#5B3FE8] shadow-[0_4px_14px_rgba(109,77,255,0.35)]">
        <Icon className="h-5 w-5 text-white" strokeWidth={2} aria-hidden />
      </span>
    </div>
  );
}

export function ReferralRewardBanner() {
  return (
    <section className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-violet-100/70 shadow-[0_12px_40px_rgba(109,77,255,0.14)] md:min-h-[460px]">
      <Image
        src={campaignBg}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 1200px"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#F3EEFF]/95 via-[#F3EEFF]/45 to-transparent md:from-[#F3EEFF]/88 md:via-[#F3EEFF]/25 md:to-transparent"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col px-5 py-6 md:px-8 md:py-8">
        <div className="mb-5 flex flex-col items-center text-center">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-lg text-primary" aria-hidden>
              ❦
            </span>
            <Crown className="h-5 w-5 text-primary" strokeWidth={2} aria-hidden />
            <span className="text-lg text-primary" aria-hidden>
              ❦
            </span>
          </div>
          <span className="inline-flex items-center rounded-full border border-white/80 bg-white/90 px-5 py-1.5 text-sm font-bold text-primary shadow-sm">
            کمپین دعوت ویژه
          </span>

          <h2
            className="mt-4 text-[2rem] font-extrabold leading-tight text-primary-deep md:text-[2.35rem]"
            style={{
              textShadow:
                "2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 4px 12px rgba(17,26,76,0.12)",
            }}
          >
            ۲,۰۰۰,۰۰۰ تومان
          </h2>
          <p className="mt-1 text-lg font-extrabold text-primary-deep md:text-xl">
            جایزه نقدی هفتگی!
          </p>
        </div>

        <div className="grid flex-1 items-end gap-6 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col gap-3 md:max-w-md md:justify-self-end">
            {infoRows.map((row) => (
              <InfoRow key={row.id} text={row.text} icon={row.icon} />
            ))}

            <Link
              href="/student/referral"
              className="mt-2 inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-[#2F5BFF] via-primary to-[#6D4DFF] text-base font-extrabold text-white shadow-[0_10px_28px_rgba(47,91,255,0.35)] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <UserPlus className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              دوستاتو دعوت کن
            </Link>
          </div>

          <div className="hidden md:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
