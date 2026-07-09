"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Crown, ShieldCheck, UserPlus, Wallet } from "lucide-react";

import giftBoxImage from "@/assets/images/referral-gift-box.png";

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
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_6px_20px_rgba(109,77,255,0.08)]">
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
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-violet-100/70 bg-gradient-to-b from-[#F3EEFF] via-[#ECE6FF] to-[#E4F0FF] shadow-[0_12px_40px_rgba(109,77,255,0.14)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(109,77,255,0.12),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(47,128,255,0.1),transparent_40%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden
      />

      <div className="relative px-5 py-6 md:px-8 md:py-8">
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

        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col gap-3 md:order-1">
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

          <div className="relative flex min-h-[220px] items-center justify-center md:order-2 md:min-h-[280px]">
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-[320px]"
            >
              <Image
                src={giftBoxImage}
                alt="جعبه هدیه با اسکناس"
                width={640}
                height={640}
                className="h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(109,77,255,0.25)]"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
