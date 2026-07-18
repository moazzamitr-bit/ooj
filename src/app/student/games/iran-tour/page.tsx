"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { day4IranTour } from "@/lib/campaign/copy";
import { getProvinceQuiz } from "@/lib/campaign/province-quiz";
import { iranProvinces, IRAN_MAP_VIEWBOX } from "@/lib/data/iran-provinces";
import { useCampaignStore } from "@/store/campaign-store";
import { formatPersianNumber } from "@/lib/utils/persian";

export default function IranTourPage() {
  const startDay4 = useCampaignStore((s) => s.startDay4);
  const unlockProvince = useCampaignStore((s) => s.unlockProvince);
  const addChances = useCampaignStore((s) => s.addChances);
  const climbTreasureStep = useCampaignStore((s) => s.climbTreasureStep);
  const campaign = useCampaignStore((s) => s.campaign);

  const unlocked = useMemo(
    () => new Set(campaign.iran_provinces_unlocked ?? []),
    [campaign.iran_provinces_unlocked]
  );
  const unlockedCount = unlocked.size;

  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  useEffect(() => {
    if (campaign.day !== 4) startDay4();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selected = iranProvinces.find((p) => p.code === selectedCode) ?? null;
  const quiz = selected ? getProvinceQuiz(selected.code, selected.name_fa) : null;
  const quizParts = quiz ? [quiz.center, quiz.attraction, quiz.souvenir] : [];

  function discoverNext() {
    const next = iranProvinces.find((p) => !unlocked.has(p.code));
    if (!next) return;
    const ok = unlockProvince(next.code);
    if (ok) {
      setSelectedCode(next.code);
      setQuizIndex(0);
      setQuizDone(false);
    }
  }

  function answerQuiz(optionIndex: number) {
    if (!quiz || !selected || quizDone) return;
    const part = quizParts[quizIndex];
    if (optionIndex === part.correct) addChances(1);
    if (quizIndex >= quizParts.length - 1) {
      setQuizDone(true);
    } else {
      setQuizIndex((i) => i + 1);
    }
  }

  return (
    <div className="min-h-screen gradient-hero">
      <AppHeader authLabel="خانه" authHref="/student" />
      <div className="mx-auto max-w-2xl px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h1 className="text-center text-2xl font-extrabold text-primary-deep">{day4IranTour.headline}</h1>
          <p className="text-center text-sm font-bold text-amber-700">{day4IranTour.prizeLine}</p>

          <div className="space-y-2 text-sm leading-7 text-slate-600">
            {day4IranTour.intro.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <Card className="border-emerald-100 bg-white/90">
            <CardContent className="p-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-bold text-primary-deep">پیشرفت نقشه</span>
                <span className="tabular-nums text-primary">
                  {formatPersianNumber(unlockedCount)} / {formatPersianNumber(31)}
                </span>
              </div>

              <div className="overflow-hidden rounded-xl bg-[#E8F5E9]">
                <svg viewBox={IRAN_MAP_VIEWBOX} className="h-auto w-full" role="img" aria-label="نقشه ایران">
                  {iranProvinces.map((p, idx) => {
                    const isOn = unlocked.has(p.code);
                    const isSel = selectedCode === p.code;
                    return (
                      <path
                        key={p.code}
                        d={p.path}
                        fill={isSel ? "#2563eb" : isOn ? "#34d399" : "#cbd5e1"}
                        stroke="#fff"
                        strokeWidth={1.2}
                        className="cursor-pointer transition hover:opacity-90"
                        onClick={() => {
                          if (isOn) {
                            setSelectedCode(p.code);
                            setQuizIndex(0);
                            setQuizDone(true);
                          }
                        }}
                      >
                        <title>
                          {formatPersianNumber(idx + 1)}. {p.name_fa}
                        </title>
                      </path>
                    );
                  })}
                </svg>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="gradient"
                  className="flex-1"
                  onClick={discoverNext}
                  disabled={unlockedCount >= 31}
                >
                  شبیه‌سازی ۱ ساعت تست (+۱ استان)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => climbTreasureStep()}
                >
                  ۲۰ دقیقه تست (+شانس و پله قارون)
                </Button>
              </div>
            </CardContent>
          </Card>

          {selected && quiz ? (
            <Card className="border-violet-100">
              <CardContent className="space-y-3 p-4">
                <p className="font-bold text-primary-deep">استان کشف‌شده: {selected.name_fa}</p>
                {!quizDone ? (
                  <>
                    <p className="text-sm text-slate-500">{day4IranTour.quizIntro}</p>
                    <p className="text-sm font-medium text-primary-deep">{quizParts[quizIndex].q}</p>
                    <div className="space-y-2">
                      {quizParts[quizIndex].options.map((opt, i) => (
                        <Button
                          key={opt}
                          type="button"
                          variant="outline"
                          className="h-auto w-full justify-start py-2.5 text-right"
                          onClick={() => answerQuiz(i)}
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">
                      سؤال {formatPersianNumber(quizIndex + 1)} از {formatPersianNumber(3)}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-emerald-700">{day4IranTour.quizReward}</p>
                )}
              </CardContent>
            </Card>
          ) : null}

          <Card className="border-slate-100">
            <CardContent className="space-y-2 p-4 text-sm leading-7 text-slate-600">
              {day4IranTour.rewards.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-2 rounded-2xl border border-slate-100 bg-white/70 p-4 text-sm leading-7 text-slate-600">
            {day4IranTour.triple.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <p className="text-sm font-medium leading-7 text-primary-deep">{day4IranTour.question}</p>

          <div className="space-y-2 rounded-2xl border border-orange-100 bg-orange-50/70 p-4 text-sm leading-7 text-primary-deep">
            {day4IranTour.marathonTeaser.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <Link href="/student/quiz">
              <Button variant="gradient" size="lg" className="w-full">
                برو تست بزن و استان کشف کن
              </Button>
            </Link>
            <Link href="/student/games/treasure/">
              <Button variant="outline" size="lg" className="w-full">
                بازگشت به گنج قارون
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
