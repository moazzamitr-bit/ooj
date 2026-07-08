"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { SubjectTestSection } from "@/components/dashboard/subject-card";
import {
  getYearStudyStructure,
  TEST_DIFFICULTIES,
  type TestDifficulty,
} from "@/lib/data/study-structure-data";

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
    <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-[0_8px_30px_rgb(17_26_76_0.06)]">
      <div className="border-b-2 border-slate-200 bg-white px-6 py-5 text-center">
        <h2 className="text-lg font-extrabold text-primary-deep md:text-xl">{title}</h2>
      </div>

      <div className="divide-y-2 divide-slate-200">
        {chapters.map((chapter) => {
          const isOpen = openChapterId === chapter.id;

          return (
            <div key={chapter.id} className="flex min-h-[72px]">
              {/* محتوای فصل — سمت چپ */}
              <div className="min-w-0 flex-1">
                {isOpen ? (
                  <div className="overflow-x-auto p-3 md:p-4">
                    <div
                      className="inline-grid min-w-full gap-0 rounded-xl border-2 border-slate-200"
                      style={{
                        gridTemplateColumns: `repeat(${chapter.topics.length}, minmax(110px, 1fr))`,
                      }}
                    >
                      {chapter.topics.map((topic, topicIndex) => (
                        <div
                          key={topic.id}
                          className={cn(
                            "flex min-w-[110px] flex-col bg-white",
                            topicIndex > 0 && "border-s border-slate-200"
                          )}
                        >
                          <div className="border-b border-slate-200 px-2 py-3 text-center text-xs font-extrabold leading-5 text-primary-deep md:text-sm">
                            {topic.title}
                          </div>
                          <div className="grid grid-cols-4">
                            {TEST_DIFFICULTIES.map((difficulty, diffIndex) => (
                              <button
                                key={difficulty.id}
                                type="button"
                                onClick={() =>
                                  handleTestClick(chapter.id, topic.id, difficulty.id)
                                }
                                className={cn(
                                  "min-h-[40px] bg-white px-1 py-2 text-center text-[10px] font-bold leading-4 text-primary-deep transition hover:bg-lavender-soft md:min-h-[44px] md:text-xs",
                                  diffIndex > 0 && "border-s border-slate-200"
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
                ) : (
                  <div className="flex h-full items-center px-4 text-sm text-slate-400 md:px-6">
                    برای دیدن موضوعات و تست‌ها کلیک کنید
                  </div>
                )}
              </div>

              {/* برچسب فصل — سمت راست */}
              <button
                type="button"
                onClick={() => setOpenChapterId(isOpen ? null : chapter.id)}
                className={cn(
                  "flex w-20 shrink-0 flex-col items-center justify-center border-s-2 border-slate-200 px-2 py-4 text-center transition md:w-24",
                  isOpen ? "bg-lavender-soft text-primary" : "bg-white hover:bg-slate-50"
                )}
              >
                <span className="text-sm font-extrabold leading-6 text-primary-deep md:text-base">
                  {chapter.title}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
