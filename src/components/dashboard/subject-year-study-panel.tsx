"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { SubjectTestSection } from "@/components/dashboard/subject-card";
import { toPersianDigits, formatPercent } from "@/lib/utils/persian";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  getYearStudyStructure,
  TALFIYI_TEST_DIFFICULTIES,
  TEST_DIFFICULTIES,
  type TestDifficulty,
} from "@/lib/data/study-structure-data";
import { MODE_LABELS, PRACTICE_COUNTS } from "@/lib/testing/constants";
import { countOpenMistakes } from "@/lib/services/test-session.service";
import { useApp } from "@/providers/app-provider";
import type { TestMode } from "@/types/test-session";

const difficultyStyles: Record<TestDifficulty, string> = {
  simple: "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200",
  medium: "hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200",
  hard: "hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200",
  konkur: "hover:bg-primary/5 hover:text-primary hover:border-primary/20",
};

interface SubjectYearStudyPanelProps {
  subjectId: string;
  subjectName: string;
  section: SubjectTestSection;
}

interface PendingLaunch {
  chapterId: string;
  chapterTitle: string;
  topicId: string;
  topicTitle: string;
  difficulty: TestDifficulty;
}

export function SubjectYearStudyPanel({
  subjectId,
  subjectName,
  section,
}: SubjectYearStudyPanelProps) {
  const router = useRouter();
  const { student } = useApp();
  const { title, chapters } = getYearStudyStructure(subjectId, subjectName, section);
  const [openChapterId, setOpenChapterId] = useState<string | null>(chapters[0]?.id ?? null);
  const [pending, setPending] = useState<PendingLaunch | null>(null);
  const [mode, setMode] = useState<TestMode>("practice");
  const [count, setCount] = useState<(typeof PRACTICE_COUNTS)[number]>(10);
  const openMistakes = countOpenMistakes(student.id, subjectId);

  const difficulties =
    section === "konkur_talfiyi"
      ? TALFIYI_TEST_DIFFICULTIES
      : section === "konkur_sarasari"
        ? TEST_DIFFICULTIES.filter((difficulty) => difficulty.id === "konkur")
        : TEST_DIFFICULTIES;

  const handleTestClick = (
    chapterId: string,
    chapterTitle: string,
    topicId: string,
    topicTitle: string,
    difficulty: TestDifficulty
  ) => {
    setPending({ chapterId, chapterTitle, topicId, topicTitle, difficulty });
    setMode("practice");
    setCount(10);
  };

  const launch = () => {
    if (!pending) return;
    const params = new URLSearchParams({
      mode,
      subjectId,
      subjectName,
      chapterId: pending.chapterId,
      chapterTitle: pending.chapterTitle,
      topicId: pending.topicId,
      topicTitle: pending.topicTitle,
      difficulty: pending.difficulty,
      count: String(mode === "practice" ? count : 20),
      autostart: "1",
    });
    router.push(`/student/practice/?${params.toString()}`);
  };

  return (
    <div className="overflow-hidden rounded-[1.35rem] border border-slate-100 bg-white shadow-[0_12px_40px_rgb(17_26_76_0.07)]">
      <div className="flex items-center justify-center gap-3 border-b border-slate-100 bg-gradient-to-l from-lavender-soft via-white to-white px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BookOpen className="h-5 w-5" aria-hidden />
        </div>
        <h2 className="text-lg font-extrabold text-primary-deep md:text-xl">{title}</h2>
      </div>

      {openMistakes > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-100 bg-amber-50/70 px-5 py-3">
          <p className="text-sm font-semibold text-amber-900">
            {toPersianDigits(openMistakes)} سوال در بانک ضعف این درس
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const first = chapters[0];
              const topic = first?.topics[0];
              if (!first || !topic) return;
              setPending({
                chapterId: first.id,
                chapterTitle: first.title,
                topicId: topic.id,
                topicTitle: topic.title,
                difficulty: "medium",
              });
              setMode("mistake_review");
            }}
          >
            مرور غلط‌ها
          </Button>
        </div>
      )}

      <div className="space-y-3 p-4 md:p-5">
        {chapters.map((chapter) => {
          const isOpen = openChapterId === chapter.id;

          return (
            <div
              key={chapter.id}
              className={cn(
                "overflow-hidden rounded-2xl border transition-all duration-300",
                isOpen
                  ? "border-primary/15 bg-lavender-soft/30 shadow-[0_4px_20px_rgb(109_77_255_0.06)]"
                  : "border-slate-100 bg-white hover:border-slate-200"
              )}
            >
              <button
                type="button"
                onClick={() => setOpenChapterId(isOpen ? null : chapter.id)}
                className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3.5 text-right md:px-5"
              >
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden
                />
                <div className="min-w-0 text-right">
                  <span className="text-base font-extrabold text-primary-deep md:text-lg">
                    {toPersianDigits(chapter.title)}
                  </span>
                  <span className="me-3 text-sm font-extrabold text-primary tabular-nums md:text-base">
                    {formatPercent(chapter.progressPercent)}
                  </span>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
                    isOpen ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"
                  )}
                >
                  {toPersianDigits(chapter.topics.length)} موضوع
                </span>
              </button>

              <div
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-slate-100/80 px-3 pb-4 pt-3 md:px-4">
                    <div className="mb-4 px-1 text-right">
                      <p className="mb-1.5 text-xs text-slate-500">درصد پیشرفت مطالعه</p>
                      <Progress
                        value={chapter.progressPercent}
                        barClassName="bg-gradient-to-l from-primary to-electric-blue"
                        trackClassName="bg-slate-100"
                        height="sm"
                      />
                    </div>
                    <div className="overflow-x-auto pb-1">
                      <div className="flex min-w-max justify-end gap-3">
                        {chapter.topics.map((topic) => (
                          <div
                            key={topic.id}
                            className="w-[148px] shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
                          >
                            <div className="border-b border-slate-100 bg-slate-50/80 px-3 py-2.5 text-center text-xs font-extrabold leading-5 text-primary-deep">
                              {topic.title}
                            </div>
                            <div
                              className={cn(
                                "grid gap-1.5 p-2",
                                difficulties.length === 3 ? "grid-cols-3" : "grid-cols-2"
                              )}
                            >
                              {difficulties.map((difficulty) => (
                                <button
                                  key={difficulty.id}
                                  type="button"
                                  onClick={() =>
                                    handleTestClick(
                                      chapter.id,
                                      chapter.title,
                                      topic.id,
                                      topic.title,
                                      difficulty.id
                                    )
                                  }
                                  className={cn(
                                    "rounded-lg border border-slate-100 bg-white px-1 py-2 text-center text-[10px] font-bold text-slate-600 transition-all duration-200 md:text-[11px]",
                                    difficultyStyles[difficulty.id]
                                  )}
                                >
                                  {difficulty.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pending && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 p-4 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-extrabold text-primary-deep">شروع تست</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {pending.topicTitle} · {pending.chapterTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPending(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50"
                aria-label="بستن"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {(Object.keys(MODE_LABELS) as TestMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  disabled={m === "mistake_review" && openMistakes === 0}
                  onClick={() => setMode(m)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-bold disabled:opacity-40",
                    mode === m
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-slate-100 text-slate-600"
                  )}
                >
                  {MODE_LABELS[m]}
                </button>
              ))}
            </div>

            {mode === "practice" && (
              <div className="mt-3 flex gap-2">
                {PRACTICE_COUNTS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCount(n)}
                    className={cn(
                      "flex-1 rounded-xl border py-2 text-sm font-bold",
                      count === n
                        ? "border-primary bg-primary text-white"
                        : "border-slate-100 text-slate-600"
                    )}
                  >
                    {toPersianDigits(n)}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-5 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setPending(null)}>
                انصراف
              </Button>
              <Button className="flex-1" onClick={launch}>
                شروع
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
