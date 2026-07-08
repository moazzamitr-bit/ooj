"use client";

import { useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatPercent } from "@/lib/utils/persian";
import { useApp } from "@/providers/app-provider";
import { Progress } from "@/components/ui/progress";

interface StudyStructureAccordionProps {
  subjectName: string;
  subjectId: string;
}

export function StudyStructureAccordion({ subjectName, subjectId }: StudyStructureAccordionProps) {
  const { getChaptersForSubject } = useApp();

  const chapters = useMemo(() => {
    const data = getChaptersForSubject(subjectId);
    return data.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      percent: chapter.study_progress_percent,
    }));
  }, [getChaptersForSubject, subjectId]);

  const yearTestGroups = useMemo(
    () => [
      { id: "year1", label: "اول" },
      { id: "year2", label: "دوم" },
      { id: "year3", label: "سوم" },
      { id: "talfiyi", label: "کنکور تالیفی" },
      { id: "sarasari", label: "کنکور سراسری" },
    ],
    []
  );

  const [activeGroupId, setActiveGroupId] = useState(yearTestGroups[0]?.id ?? "year1");

  const activeGroupIndex = Math.max(
    0,
    yearTestGroups.findIndex((g) => g.id === activeGroupId)
  );

  const testsForActiveGroup = useMemo(() => {
    if (chapters.length === 0) return [];

    // اگر تعداد فصل‌ها کمتر بود، در کنکورها از آخرین فصل موجود استفاده می‌کنیم.
    if (activeGroupIndex <= 2) {
      const item = chapters[activeGroupIndex];
      return item ? [item] : [];
    }

    if (activeGroupIndex === 3) {
      const item = chapters[3] ?? chapters[chapters.length - 1];
      return item ? [item] : [];
    }

    const item = chapters[4] ?? chapters[chapters.length - 1];
    return item ? [item] : [];
  }, [activeGroupIndex, chapters]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_rgb(17_26_76_0.04)]">
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BookOpen className="h-5 w-5" aria-hidden />
        </div>
        <h2 className="text-base font-extrabold text-primary-deep">تست‌های سالیانه {subjectName}</h2>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="border-l border-slate-100 p-5 lg:p-6">
          <div className="space-y-2">
            {yearTestGroups.map((group, idx) => {
              const isActive = group.id === activeGroupId;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveGroupId(group.id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-right transition",
                    isActive ? "bg-lavender-soft" : "hover:bg-slate-50"
                  )}
                >
                  <span className="flex-1 text-sm font-bold leading-6 text-primary-deep">{group.label}</span>
                  <span
                    className={cn(
                      "rounded-full bg-white px-2.5 py-1 text-xs font-semibold",
                      isActive ? "text-primary bg-primary/10" : "text-slate-400"
                    )}
                  >
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-50/50 p-5 lg:p-6">
          <div className="space-y-3">
            {testsForActiveGroup.length === 0 ? (
              <p className="text-sm text-slate-400">هنوز داده‌ای برای این درس آماده نشده.</p>
            ) : (
              testsForActiveGroup.map((test) => (
                <div
                  key={test.id}
                  className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-primary-deep truncate">
                        {yearTestGroups[activeGroupIndex]?.label}: {test.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        درصد پیشرفت مطالعه
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-primary">
                        {formatPercent(test.percent)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Progress
                      value={test.percent}
                      barClassName="bg-gradient-to-l from-primary to-electric-blue"
                      trackClassName="bg-slate-100"
                      height="sm"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
