"use client";

import Link from "next/link";
import { Crown, Sparkles } from "lucide-react";
import { ReferralFallingBanknotes } from "@/components/referral/referral-falling-banknotes";

function SparkleField() {
  const sparkles = [
    { top: "14%", left: "12%", size: 10, delay: 0 },
    { top: "22%", left: "88%", size: 8, delay: 0.4 },
    { top: "38%", left: "6%", size: 6, delay: 0.8 },
    { top: "48%", left: "94%", size: 9, delay: 1.1 },
    { top: "62%", left: "18%", size: 7, delay: 0.2 },
    { top: "70%", left: "80%", size: 8, delay: 0.6 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {sparkles.map((s, i) => (
        <Sparkles
          key={i}
          className="absolute text-primary/35"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animation: `pulse 2.4s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function CloudShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 48"
      className={className}
      aria-hidden
      fill="none"
    >
      <ellipse cx="36" cy="30" rx="28" ry="16" fill="rgb(255 255 255 / 0.55)" />
      <ellipse cx="62" cy="24" rx="34" ry="18" fill="rgb(255 255 255 / 0.7)" />
      <ellipse cx="88" cy="30" rx="24" ry="14" fill="rgb(255 255 255 / 0.5)" />
    </svg>
  );
}

export function ReferralRewardBanner() {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-violet-100/70 shadow-[0_12px_40px_rgba(109,77,255,0.14)]">
      <Link
        href="/student/referral"
        className="relative block min-h-[320px] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:min-h-[360px]"
        aria-label="کمپین دعوت ویژه — ۲,۰۰۰,۰۰۰ تومان جایزه نقدی هفتگی، دوستاتو دعوت کن"
      >
        <div className="absolute inset-0 gradient-referral gradient-mesh" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(255_255_255/0.75),transparent_55%)]" />

        <SparkleField />
        <ReferralFallingBanknotes />

        <CloudShape className="pointer-events-none absolute -bottom-2 left-4 h-10 w-24 opacity-80 md:left-8 md:h-12 md:w-28" />
        <CloudShape className="pointer-events-none absolute -bottom-1 right-6 h-9 w-20 opacity-70 md:right-10 md:h-11 md:w-24" />

        <div className="relative z-10 flex flex-col items-center px-5 py-8 text-center md:px-10 md:py-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-1.5 text-sm font-bold text-primary shadow-sm backdrop-blur-sm">
            <Crown className="h-4 w-4 text-amber-500" aria-hidden />
            کمپین دعوت ویژه
          </div>

          <div className="relative">
            <p
              className="text-[2.6rem] font-black leading-none tracking-tight text-transparent md:text-[3.4rem] lg:text-[4rem]"
              style={{
                backgroundImage: "linear-gradient(135deg, #6d4dff 0%, #4f46e5 45%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextStroke: "2px white",
                paintOrder: "stroke fill",
                filter: "drop-shadow(0 2px 0 rgb(255 255 255 / 0.9)) drop-shadow(0 8px 18px rgb(109 77 255 / 0.18))",
              }}
            >
              ۲,۰۰۰,۰۰۰
            </p>
            <p
              className="mt-1 text-2xl font-extrabold text-transparent md:text-3xl"
              style={{
                backgroundImage: "linear-gradient(135deg, #6d4dff, #7c3aed)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextStroke: "1px white",
                paintOrder: "stroke fill",
              }}
            >
              تومان
            </p>
          </div>

          <h2 className="mt-3 text-xl font-extrabold text-slate-900 md:text-2xl">
            جایزه نقدی هفتگی!
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
            هر دوستی که با دعوت تو عضو بشه
          </p>
          <p className="mt-1 text-base font-extrabold text-slate-900 md:text-lg">
            فوری به حسابت واریز می‌شود!
          </p>

          <p className="mt-5 text-xs text-slate-400 md:text-sm">
            حداکثر ۲ دعوت موفق در هر هفته
          </p>
        </div>
      </Link>
    </section>
  );
}
