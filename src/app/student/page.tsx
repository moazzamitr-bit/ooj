"use client";

import Link from "next/link";
import { UserCircle } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import {
  ContinueYesterdayCard,
  CourseCycleCard,
  FlashcardCard,
  SubjectPickerCard,
} from "@/components/student/student-home-cards";
import { useApp } from "@/providers/app-provider";

export default function StudentHomePage() {
  const { student } = useApp();
  const firstName = student.full_name.split(" ")[0] || "دوست من";

  return (
    <div className="min-h-dvh bg-white">
      <AppHeader authLabel="پروفایل من" authHref="/student/profile" />

      <main className="mx-auto max-w-[1200px] space-y-8 px-6 py-8 md:px-8 md:py-10">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">خوش آمدی به اوج</p>
            <h1 className="mt-1 text-2xl font-extrabold text-primary-deep md:text-3xl">
              سلام {firstName}، از کجا شروع می‌کنی؟
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">
              یکی از گزینه‌های زیر را انتخاب کن تا مسیر مطالعه‌ات را ادامه بدهی.
            </p>
          </div>

          <Link
            href="/student/profile"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-100 px-4 text-sm font-medium text-primary-deep transition hover:bg-lavender-soft"
          >
            <UserCircle className="h-4 w-4 text-primary" aria-hidden />
            مشاهده پروفایل کامل
          </Link>
        </section>

        <section className="rounded-2xl border border-primary/15 bg-gradient-to-l from-[#F3F0FF] to-[#EEF4FF] p-5 md:p-6">
          <p className="text-sm font-bold text-primary">🌙 روز دوم — ترفند مخفی آلبرتو</p>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            لینک را برای دوستات بفرست؛ هر باز شدن لینک = ۵ شانس طلایی در صندوقچه.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/student/day2"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-white"
            >
              شروع روز دوم
            </Link>
            <Link
              href="/student/lottery/result/?result=lose"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-primary-deep"
            >
              نتیجه قرعه‌کشی
            </Link>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <ContinueYesterdayCard />
          <CourseCycleCard />
          <FlashcardCard />
          <SubjectPickerCard />
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
