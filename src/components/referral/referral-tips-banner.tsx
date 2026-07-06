"use client";

import Image from "next/image";
import { referralTips } from "@/lib/data/referral-page-mock-data";
import albertoImage from "@/assets/images/alberto.png";

export function ReferralTipsBanner() {
  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-sky-100 bg-gradient-to-l from-[#F0F7FF] via-[#F5FAFF] to-white p-6 md:p-8">
      <div className="grid items-center gap-6 lg:grid-cols-[auto_1fr_auto]">
        <div className="relative mx-auto h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white shadow-md lg:mx-0">
          <Image src={albertoImage} alt="" fill className="object-cover object-top" sizes="80px" />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {referralTips.map((tip) => (
            <div
              key={tip.text}
              className="flex items-center gap-3 rounded-xl border border-white/80 bg-white/70 px-4 py-3 backdrop-blur-sm"
            >
              <span className="text-xl" aria-hidden>
                {tip.icon}
              </span>
              <p className="text-sm font-medium leading-6 text-slate-600">{tip.text}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-base font-extrabold text-primary-deep lg:text-right lg:text-lg">
          دعوت هوشمندانه = شانس بیشتر
        </p>
      </div>
    </section>
  );
}
