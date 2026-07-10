"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Crown, Flame, Sparkles, UserPlus, Wallet } from "lucide-react";

import giftBoxImage from "@/assets/images/referral-gift-box.png";
import { FallingBanknotes } from "@/components/referral/falling-banknotes";
import { cn } from "@/lib/utils/cn";

const infoPills = [
  {
    text: "هر دوستی که با دعوت تو عضو بشه:",
    icon: UserPlus,
  },
  {
    text: "فوری به حسابت واریز می‌شود!",
    icon: Wallet,
  },
  {
    text: "حداکثر ۲ دعوت موفق در هر هفته",
    icon: Flame,
  },
] as const;

function LaurelBranch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 24"
      className={cn("h-5 w-8 text-primary/55", className)}
      aria-hidden
    >
      <path
        d="M2 12c6-8 14-10 20-8-2 4-2 8 0 12-6 2-14 0-20-4z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M6 12c3-4 8-5 12-4-1 2-1 5 0 7-4 1-9 0-12-3z"
        fill="currentColor"
      />
    </svg>
  );
}

function InfoPill({
  text,
  icon: Icon,
}: {
  text: string;
  icon: typeof UserPlus;
}) {
  return (
    <div className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-2xl border border-white/85 bg-white/92 px-3 py-2.5 shadow-[0_6px_18px_rgba(109,77,255,0.1)] backdrop-blur-sm md:px-4 md:py-3">
      <p className="text-right text-[11px] font-bold leading-6 text-slate-700 md:text-xs lg:text-[13px]">
        {text}
      </p>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#5B3FE8] shadow-[0_4px_12px_rgba(109,77,255,0.32)] md:h-10 md:w-10">
        <Icon className="h-4 w-4 text-white md:h-[18px] md:w-[18px]" strokeWidth={2.2} aria-hidden />
      </span>
    </div>
  );
}

export function ReferralRewardBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-violet-100/70 shadow-[0_12px_40px_rgba(109,77,255,0.14)]">
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#F4EEFF] via-[#ECE4FF] to-[#E2EEFF]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(109,77,255,0.16),transparent_42%),radial-gradient(circle_at_82%_68%,rgba(47,128,255,0.12),transparent_38%),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.65),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-10 top-8 h-36 w-36 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 bottom-6 h-40 w-40 rounded-full bg-electric-blue/10 blur-3xl"
        aria-hidden
      />

      <FallingBanknotes />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[12, 28, 44, 61, 73, 86].map((left, index) => (
          <Sparkles
            key={left}
            className="absolute text-white/80"
            style={{
              left: `${left}%`,
              top: `${10 + (index % 3) * 22}%`,
              width: 12 + (index % 2) * 4,
              height: 12 + (index % 2) * 4,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-4 py-6 md:px-7 md:py-8">
        <div className="mb-5 flex flex-col items-center text-center">
          <div className="mb-2 flex items-center gap-2">
            <LaurelBranch className="scale-x-[-1]" />
            <Crown className="h-5 w-5 text-primary" strokeWidth={2} aria-hidden />
            <LaurelBranch />
          </div>
          <span className="inline-flex items-center rounded-full border border-white/80 bg-white/90 px-5 py-1.5 text-sm font-bold text-primary shadow-sm">
            کمپین دعوت ویژه
          </span>

          <h2
            className="mt-3 bg-gradient-to-b from-[#2F80FF] via-primary to-[#6D4DFF] bg-clip-text text-[2rem] font-extrabold leading-tight text-transparent md:text-[2.4rem]"
            style={{
              WebkitTextStroke: "2px white",
              paintOrder: "stroke fill",
              filter: "drop-shadow(0 4px 10px rgba(17,26,76,0.12))",
            }}
          >
            ۲,۰۰۰,۰۰۰ تومان
          </h2>
          <p className="mt-1 flex items-center justify-center gap-2 text-lg font-extrabold text-primary-deep md:text-xl">
            <Sparkles className="h-4 w-4 text-primary/70" aria-hidden />
            جایزه نقدی هفتگی!
            <Sparkles className="h-4 w-4 text-primary/70" aria-hidden />
          </p>
        </div>

        <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-6">
          <div className="relative flex min-h-[200px] items-end justify-center lg:min-h-[260px] lg:justify-start">
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="relative w-full max-w-[300px] lg:max-w-[340px]"
            >
              <Image
                src={giftBoxImage}
                alt=""
                width={680}
                height={520}
                className="h-auto w-full object-contain drop-shadow-[0_22px_36px_rgba(109,77,255,0.28)]"
                priority
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-2">
              {infoPills.map((pill) => (
                <InfoPill key={pill.text} text={pill.text} icon={pill.icon} />
              ))}
            </div>

            <Link
              href="/student/referral"
              className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-[#2F5BFF] via-primary to-[#6D4DFF] text-base font-extrabold text-white shadow-[0_10px_28px_rgba(47,91,255,0.35)] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="کمپین دعوت ویژه — دوستاتو دعوت کن"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <UserPlus className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              دوستاتو دعوت کن
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
