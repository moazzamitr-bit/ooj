"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";

import banknoteImage from "@/assets/images/banknote-100k.png";

const confettiBills = Array.from({ length: 20 }, (_, i) => {
  const spread = ((i % 10) / 9) * Math.PI * 1.35 - Math.PI * 0.85;
  const power = 0.65 + (i % 4) * 0.14;
  const burstX = Math.cos(spread) * (70 + (i % 5) * 22) * power;
  const burstY = Math.sin(spread) * (-55 - (i % 3) * 18) * power;
  const driftX = burstX * 0.4 + (i % 2 === 0 ? 14 : -14);
  const settleY = 70 + (i % 5) * 22;

  return {
    id: i,
    burstX,
    burstY,
    driftX,
    settleY,
    width: 44 + (i % 5) * 6,
    rotateStart: -35 + (i % 8) * 10,
    spin: (i % 2 === 0 ? 1 : -1) * (160 + (i % 5) * 40),
    delay: (i % 10) * 0.16 + Math.floor(i / 10) * 1.2,
    duration: 2.6 + (i % 4) * 0.3,
  };
});

function ConfettiBanknote({
  bill,
  reduceMotion,
}: {
  bill: (typeof confettiBills)[number];
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[58%] z-[2] -translate-x-1/2"
      initial={{ x: 0, y: 0, rotate: bill.rotateStart, opacity: 0, scale: 0.12 }}
      animate={
        reduceMotion
          ? { x: bill.burstX * 0.45, y: bill.burstY * 0.25, opacity: 0.7, scale: 0.8 }
          : {
              x: [0, bill.burstX, bill.burstX + bill.driftX, bill.burstX + bill.driftX * 1.1],
              y: [0, bill.burstY, bill.burstY + bill.settleY * 0.5, bill.burstY + bill.settleY],
              rotate: [
                bill.rotateStart,
                bill.rotateStart + bill.spin * 0.35,
                bill.rotateStart + bill.spin * 0.7,
                bill.rotateStart + bill.spin,
              ],
              opacity: [0, 1, 0.95, 0],
              scale: [0.12, 1, 0.9, 0.7],
            }
      }
      transition={
        reduceMotion
          ? { duration: 0.3 }
          : {
              repeat: Infinity,
              repeatDelay: 0.5,
              duration: bill.duration,
              delay: bill.delay,
              ease: [0.18, 0.85, 0.32, 1],
              times: [0, 0.2, 0.58, 1],
            }
      }
      aria-hidden
    >
      <Image
        src={banknoteImage}
        alt=""
        width={bill.width * 2}
        height={Math.round(bill.width * 0.45)}
        className="h-auto drop-shadow-[0_8px_16px_rgba(17,26,76,0.25)]"
        style={{ width: bill.width }}
      />
    </motion.div>
  );
}

function GiftBoxVisual({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
      className="relative z-20"
    >
      <div
        className="absolute -inset-6 rounded-full bg-primary/25 blur-2xl"
        aria-hidden
      />
      <div
        className="absolute -inset-3 rounded-3xl bg-electric-blue/15 blur-xl"
        aria-hidden
      />

      <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-primary via-[#7B5CFF] to-violet-500 shadow-[0_20px_50px_rgb(109_77_255_0.45)] md:h-[104px] md:w-[104px]">
        <Gift className="h-11 w-11 text-white md:h-12 md:w-12" strokeWidth={1.5} aria-hidden />
        <div className="absolute inset-0 rounded-[1.35rem] bg-gradient-to-t from-black/10 to-white/20" />
      </div>

      <div className="absolute -top-4 left-1/2 h-5 w-12 -translate-x-1/2 rounded-t-2xl bg-gradient-to-b from-violet-300 to-violet-400 shadow-sm" />
      <div className="absolute -top-2 left-1/2 h-3.5 w-9 -translate-x-1/2 rounded-full bg-violet-200" />

      {!reduceMotion && (
        <motion.div
          className="absolute -right-2 -top-2 text-warning"
          animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          aria-hidden
        >
          <Sparkles className="h-5 w-5" />
        </motion.div>
      )}
    </motion.div>
  );
}

export function ReferralRewardBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-violet-100/80 bg-gradient-to-bl from-[#F8F5FF] via-[#F0EBFF] to-[#E8F4FF] shadow-[0_8px_40px_rgb(109_77_255_0.12)]">
      <div
        className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-electric-blue/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgb(109_77_255_0.08),transparent_55%)]"
        aria-hidden
      />

      <div className="relative grid min-h-[280px] items-center gap-6 p-6 md:grid-cols-2 md:gap-4 md:p-8 lg:min-h-[300px] lg:p-10">
        {/* متن — سمت راست در RTL */}
        <div className="relative z-10 flex flex-col justify-center text-right">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            کمپین دعوت ویژه
          </div>

          <h2 className="text-xl font-extrabold leading-[1.65] text-primary-deep md:text-[1.65rem]">
            <span className="block">💰 ۲,۰۰۰,۰۰۰ تومان</span>
            <span className="bg-gradient-to-l from-primary to-electric-blue bg-clip-text text-transparent">
              جایزه نقدی هفتگی!
            </span>
          </h2>

          <div className="mt-5 space-y-3 rounded-2xl border border-white/60 bg-white/55 p-4 backdrop-blur-md md:p-5">
            <p className="text-sm leading-7 text-slate-700 md:text-[15px]">
              🎁 هر دوستی که با دعوت تو عضو بشه:
            </p>
            <p className="text-sm font-bold leading-7 text-primary-deep md:text-base">
              💵 ۱,۰۰۰,۰۰۰ تومان فوری به حسابت واریز می‌شه!
            </p>
            <p className="inline-flex w-fit items-center rounded-xl bg-lavender-soft px-3 py-1.5 text-xs font-semibold text-primary md:text-sm">
              🔥 حداکثر ۲ دعوت موفق در هر هفته
            </p>
          </div>
        </div>

        {/* باکس هدیه + اسکناس — سمت چپ در RTL */}
        <div className="relative flex min-h-[220px] items-center justify-center md:min-h-[260px]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {confettiBills.map((bill) => (
              <ConfettiBanknote key={bill.id} bill={bill} reduceMotion={reduceMotion} />
            ))}
          </div>

          <div className="relative flex h-full w-full max-w-[280px] items-center justify-center rounded-[1.5rem] border border-white/50 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm md:max-w-none">
            <GiftBoxVisual reduceMotion={reduceMotion} />

            {!reduceMotion &&
              [0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute opacity-20"
                  style={{
                    left: `${20 + i * 25}%`,
                    top: `${15 + i * 10}%`,
                  }}
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.35, 0.1] }}
                  transition={{ repeat: Infinity, duration: 2 + i * 0.5, delay: i * 0.3 }}
                  aria-hidden
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
