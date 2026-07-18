"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { day5Marathon } from "@/lib/campaign/copy";
import { useCampaignStore } from "@/store/campaign-store";
import { formatPersianNumber, formatStudyTime } from "@/lib/utils/persian";
import {
  MARATHON_WINNER_SLOTS,
  getMarathonProgress,
  getMarathonWeekMinutes,
} from "@/types/campaign";

export default function MarathonGamePage() {
  const startDay5 = useCampaignStore((s) => s.startDay5);
  const advance = useCampaignStore((s) => s.advanceMarathonWeek);
  const campaign = useCampaignStore((s) => s.campaign);
  const isMember = campaign.is_golden_member ?? false;
  const progress = getMarathonProgress(campaign.marathon_week ?? 0);

  useEffect(() => {
    if (campaign.day !== 5) startDay5();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const remainingEstimate = Math.max(
    MARATHON_WINNER_SLOTS,
    800 - progress.completedWeeks * 60
  );

  return (
    <div className="min-h-screen gradient-hero">
      <AppHeader authLabel="خانه" authHref="/student" />
      <div className="mx-auto max-w-lg px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h1 className="text-center text-xl font-extrabold leading-8 text-primary-deep md:text-2xl">
            {day5Marathon.headline}
          </h1>
          <p className="text-center text-sm font-bold text-amber-700">{day5Marathon.subtitle}</p>
          <p className="text-center text-sm font-medium text-primary-deep">{day5Marathon.prizeLine}</p>

          <div className="space-y-2 text-sm leading-7 text-slate-600">
            {day5Marathon.intro.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <Card className="overflow-hidden border-sky-200/80 bg-gradient-to-b from-[#0c4a6e] to-[#082f49] text-white shadow-xl">
            <CardContent className="space-y-4 p-5">
              <p className="text-center text-sm font-bold text-sky-200">مسیر ماراتون</p>

              <div className="relative mx-auto h-3 max-w-sm overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-300 to-orange-400"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(progress.completedWeeks / progress.maxWeeks) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                {[1, 2, 3].map((w) => {
                  const done = progress.completedWeeks >= w;
                  const active = !progress.done && progress.currentWeek === w;
                  return (
                    <div
                      key={w}
                      className={`rounded-xl border px-2 py-2 ${
                        done
                          ? "border-amber-300/60 bg-amber-400/25"
                          : active
                            ? "border-sky-300 bg-sky-500/30"
                            : "border-white/15 bg-white/5"
                      }`}
                    >
                      <p className="font-bold">هفته {formatPersianNumber(w)}</p>
                      <p className="mt-0.5 opacity-80">{formatStudyTime(getMarathonWeekMinutes(w))}</p>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl bg-black/25 px-3 py-3 text-center">
                {progress.done ? (
                  <>
                    <p className="text-xs text-white/70">ماراتون کامل شد</p>
                    <p className="mt-1 text-2xl font-extrabold text-amber-300">
                      در جمع {formatPersianNumber(MARATHON_WINNER_SLOTS)} نفر نهایی
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-white/70">
                      هفته جاری: {formatPersianNumber(progress.currentWeek)}
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-amber-300">
                      {formatStudyTime(progress.currentWeekMinutes)}
                    </p>
                    <p className="mt-1 text-[11px] text-sky-200">
                      هفته‌های تکمیل‌شده: {formatPersianNumber(progress.completedWeeks)} /{" "}
                      {formatPersianNumber(progress.maxWeeks)}
                    </p>
                  </>
                )}
              </div>

              <p className="text-center text-[11px] text-white/70">
                تخمین باقی‌مانده در رقابت: حدود {formatPersianNumber(remainingEstimate)} نفر
              </p>

              {!isMember ? (
                <div className="space-y-2">
                  <p className="text-center text-sm text-amber-100">{day5Marathon.memberOnly}</p>
                  <Link href="/student/membership/">
                    <Button variant="gradient" className="w-full">
                      {day5Marathon.lockedCta}
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="gradient"
                  className="w-full"
                  onClick={() => advance()}
                  disabled={progress.done}
                >
                  {day5Marathon.advanceCta}
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-100">
            <CardContent className="space-y-2 p-4 text-sm leading-7 text-slate-600">
              {day5Marathon.scheduleHint.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-2 rounded-2xl border border-slate-100 bg-white/70 p-4 text-sm leading-7 text-slate-600">
            {day5Marathon.rules.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {!isMember ? (
              <Link href="/student/membership/">
                <Button variant="gradient" size="lg" className="w-full">
                  عضویت طلایی اوج
                </Button>
              </Link>
            ) : null}
            <Link href="/student/games/iran-tour/">
              <Button variant="outline" size="lg" className="w-full">
                بازگشت به ایران‌گردی
              </Button>
            </Link>
            <Link href="/student">
              <Button variant="outline" size="lg" className="w-full">
                خانه
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
