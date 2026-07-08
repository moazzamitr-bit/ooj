"use client";

import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { SubjectTestSection } from "@/components/dashboard/subject-card";
import { toPersianDigits, formatPercent } from "@/lib/utils/persian";
import { Progress } from "@/components/ui/progress";
import {
  getYearStudyStructure,
  TEST_DIFFICULTIES,
  type TestDifficulty,
} from "@/lib/data/study-structure-data";

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

export function SubjectYearStudyPanel({
  subjectId,
  subjectName,
  section,
}: SubjectYearStudyPanelProps) {
  const { title, chapters } = getYearStudyStructure(subjectId, subjectName, section);
  const [openChapterId, setOpenChapterId] = useState<string | null>(chapters[0]?.id ?? null);

  const handleTestClick = (chapterId: string, topicId: string, difficulty: TestDifficulty) => {
    console.log("test click", { chapterId, topicId, difficulty });
  };

  return (
    <div className="overflow-hidden rounded-[1.35rem] border border-slate-100 bg-white shadow-[0_12px_40px_rgb(17_26_76_0.07)]">
      <div className="flex items-center justify-center gap-3 border-b border-slate-100 bg-gradient-to-l from-lavender-soft via-white to-white px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BookOpen className="h-5 w-5" aria-hidden />
        </div>
        <h2 className="text-lg font-extrabold text-primary-deep md:text-xl">{title}</h2>
      </div>

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
                className="flex w-full items-center gap-3 px-4 py-3.5 text-right md:px-5"
              >
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden
                />
                <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
                  <span className="shrink-0 text-sm font-extrabold text-primary tabular-nums md:text-base">
                    {formatPercent(chapter.progressPercent)}
                  </span>
                  <span className="truncate text-base font-extrabold text-primary-deep md:text-lg">
                    {toPersianDigits(chapter.title)}
                  </span>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
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
                    <div className="mb-4 px-1">
                      <p className="mb-1.5 text-xs text-slate-500">درصد پیشرفت مطالعه</p>
                      <Progress
                        value={chapter.progressPercent}
                        barClassName="bg-gradient-to-l from-primary to-electric-blue"
                        trackClassName="bg-slate-100"
                        height="sm"
                      />
                    </div>
                    <div className="overflow-x-auto pb-1">
                      <div className="flex min-w-max gap-3">
                        {chapter.topics.map((topic) => (
                          <div
                            key={topic.id}
                            className="w-[148px] shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
                          >
                            <div className="border-b border-slate-100 bg-slate-50/80 px-3 py-2.5 text-center text-xs font-extrabold leading-5 text-primary-deep">
                              {topic.title}
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 p-2">
                              {TEST_DIFFICULTIES.map((difficulty) => (
                                <button
                                  key={difficulty.id}
                                  type="button"
                                  onClick={() =>
                                    handleTestClick(chapter.id, topic.id, difficulty.id)
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
    </div>
  );
}
