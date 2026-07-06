"use client";

import Link from "next/link";
import { Gift, Sparkles, Star } from "lucide-react";
import { goldenChanceRules } from "@/lib/data/referral-page-mock-data";

export function ReferralInfoSection() {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <article className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-bl from-electric-blue via-[#5B8CFF] to-primary p-6 text-white shadow-[0_12px_40px_rgb(47_128_255_0.25)] md:p-8">
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-10">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">جایزه ویژه</p>
              <h2 className="mt-2 text-xl font-extrabold leading-8 md:text-2xl">
                با هر دعوت، یک شانس طلایی بگیر!
              </h2>
            </div>
            <span className="text-5xl" aria-hidden>
              🏆
            </span>
          </div>

          <div className="flex items-end justify-between gap-4">
            <Link
              href="/student/reward"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary shadow-lg transition hover:bg-white/95"
            >
              <Gift className="h-4 w-4" aria-hidden />
              مشاهده جایزه‌ها
            </Link>
            <div className="flex -space-x-2 space-x-reverse" aria-hidden>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/90 text-lg shadow-md ring-2 ring-white/30"
                >
                  ⭐
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      <article className="rounded-[1.5rem] border border-slate-100 bg-white p-6 shadow-[0_4px_20px_rgb(17_26_76_0.04)] md:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-warning/15 text-warning">
            <Star className="h-5 w-5 fill-warning" aria-hidden />
          </div>
          <h2 className="text-lg font-extrabold text-primary-deep">سیستم شانس طلایی</h2>
        </div>

        <ul className="space-y-4">
          {goldenChanceRules.map((rule, index) => (
            <li key={rule} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lavender text-xs font-bold text-primary">
                {index + 1}
              </span>
              {rule}
            </li>
          ))}
        </ul>

        <p className="mt-5 flex items-center gap-2 rounded-xl bg-lavender-soft px-4 py-3 text-xs leading-6 text-slate-500">
          <Sparkles className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          شانس‌های کسب‌شده در قرعه‌کشی‌های هفتگی و فصلی اوج استفاده می‌شوند.
        </p>
      </article>
    </section>
  );
}
