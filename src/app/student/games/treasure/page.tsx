"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { day3Treasure } from "@/lib/campaign/copy";
import { useCampaignStore } from "@/store/campaign-store";
import { formatPersianNumber } from "@/lib/utils/persian";
import {
  TREASURE_FLOORS,
  TREASURE_STEPS_PER_FLOOR,
  getTreasureProgress,
} from "@/types/campaign";

export default function TreasureGamePage() {
  const startDay3 = useCampaignStore((s) => s.startDay3);
  const climb = useCampaignStore((s) => s.climbTreasureStep);
  const campaign = useCampaignStore((s) => s.campaign);
  const progress = getTreasureProgress(campaign.treasure_step ?? 0);

  useEffect(() => {
    if (campaign.day !== 3) startDay3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen gradient-hero">
      <AppHeader authLabel="خانه" authHref="/student" />
      <div className="mx-auto max-w-lg px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h1 className="text-center text-xl font-extrabold leading-8 text-primary-deep md:text-2xl">
            {day3Treasure.headline}
          </h1>

          <div className="space-y-2 text-sm leading-7 text-slate-600">
            {day3Treasure.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          {/* Tower visual */}
          <Card className="overflow-hidden border-amber-200/80 bg-gradient-to-b from-[#1e3a8a] to-[#0f172a] text-white shadow-xl">
            <CardContent className="space-y-3 p-5">
              <p className="text-center text-sm font-bold text-amber-200">🏰 برج قارون</p>
              <div className="mx-auto flex max-w-[220px] flex-col-reverse gap-2">
                {Array.from({ length: TREASURE_FLOORS }, (_, i) => {
                  const floor = i + 1;
                  const unlocked = progress.completedFloors >= floor;
                  const active = progress.currentFloor === floor && progress.step < progress.maxSteps;
                  const width = 70 + floor * 10;
                  return (
                    <div
                      key={floor}
                      className={`mx-auto rounded-xl border px-3 py-3 text-center transition ${
                        unlocked
                          ? "border-amber-300 bg-amber-400/30"
                          : active
                            ? "border-sky-300 bg-sky-500/25"
                            : "border-white/15 bg-white/5"
                      }`}
                      style={{ width: `${width}%` }}
                    >
                      <p className="text-xs font-bold">طبقه {formatPersianNumber(floor)}</p>
                      <p className="mt-1 text-[10px] opacity-80">
                        {unlocked ? "باز شد 🎁" : active ? `${formatPersianNumber(progress.stepInFloor)}/${formatPersianNumber(TREASURE_STEPS_PER_FLOOR)} پله` : "قفل"}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl bg-black/25 px-3 py-3 text-center">
                <p className="text-xs text-white/70">پله‌های صعود</p>
                <p className="mt-1 text-3xl font-extrabold text-amber-300">
                  {formatPersianNumber(progress.step)}
                  <span className="text-base text-white/50"> / {formatPersianNumber(progress.maxSteps)}</span>
                </p>
                {progress.stepsToNextFloor > 0 ? (
                  <p className="mt-1 text-[11px] text-sky-200">
                    {formatPersianNumber(progress.stepsToNextFloor)} پله تا طبقه بعدی
                  </p>
                ) : (
                  <p className="mt-1 text-[11px] text-amber-200">به قله برج رسیدی!</p>
                )}
              </div>

              <Button
                type="button"
                variant="gradient"
                className="w-full"
                onClick={() => climb()}
                disabled={progress.step >= progress.maxSteps}
              >
                شبیه‌سازی ۲۰ دقیقه تست (+۱ پله و +۱ شانس)
              </Button>
            </CardContent>
          </Card>

          <Card className="border-violet-100">
            <CardContent className="space-y-2 p-4 text-sm leading-7 text-slate-600">
              {day3Treasure.rules.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-3">
            {day3Treasure.floors.map((f) => {
              const unlocked = progress.completedFloors >= f.floor;
              return (
                <Card
                  key={f.floor}
                  className={`border ${unlocked ? "border-amber-200 bg-amber-50/60" : "border-slate-100 bg-white/70"}`}
                >
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-bold text-primary-deep">
                        {f.floor === 1 ? "🥉" : f.floor === 2 ? "🥈" : "🥇"} {f.title}
                      </p>
                      <span className={`text-xs font-semibold ${unlocked ? "text-amber-700" : "text-slate-400"}`}>
                        {unlocked ? "باز" : "قفل"}
                      </span>
                    </div>
                    <ul className="grid grid-cols-1 gap-1 text-sm text-slate-600 sm:grid-cols-2">
                      {f.prizes.map((p) => (
                        <li key={p}>🎁 {p}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="space-y-2 rounded-2xl border border-slate-100 bg-white/70 p-4 text-sm leading-7 text-slate-600">
            {day3Treasure.start.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="space-y-2 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm leading-7 text-primary-deep">
            {day3Treasure.iranTeaser.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <Link href="/student/quiz">
              <Button variant="gradient" size="lg" className="w-full">
                برو تست بزن و صعود کن
              </Button>
            </Link>
            <Link href="/student">
              <Button variant="outline" size="lg" className="w-full">
                بازگشت به خانه
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
