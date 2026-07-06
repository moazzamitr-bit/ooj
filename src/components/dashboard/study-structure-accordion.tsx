"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ClipboardList,
  FlaskConical,
  Layers,
  Settings,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatPercent } from "@/lib/utils/persian";
import { mockSubchapters } from "@/lib/data/mock-data";
import { chemSubchaptersMockup } from "@/lib/data/profile-mock-data";
import { useApp } from "@/providers/app-provider";

const subchapterIconMap = {
  layers: Layers,
  book: BookOpen,
  settings: Settings,
  zap: Zap,
  flask: FlaskConical,
  clipboard: ClipboardList,
};

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

  const [activeChapterId, setActiveChapterId] = useState(chapters[0]?.id ?? "");
  const [activeSubchapterId, setActiveSubchapterId] = useState<string | null>(null);

  useEffect(() => {
    setActiveChapterId(chapters[0]?.id ?? "");
    setActiveSubchapterId(null);
  }, [chapters]);

  const subchapters = useMemo(() => {
    if (subjectId === "sub_chem") {
      return chemSubchaptersMockup;
    }

    return (mockSubchapters[activeChapterId] ?? []).map((sub) => ({
      id: sub.id,
      title: sub.title,
      icon: "book" as const,
    }));
  }, [subjectId, activeChapterId]);

  useEffect(() => {
    if (subchapters.length > 0) {
      setActiveSubchapterId(subchapters[0].id);
    } else {
      setActiveSubchapterId(null);
    }
  }, [subchapters]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_rgb(17_26_76_0.04)]">
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BookOpen className="h-5 w-5" aria-hidden />
        </div>
        <h2 className="text-base font-extrabold text-primary-deep">
          ساختار مطالعه {subjectName} دهم
        </h2>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="border-l border-slate-100 p-5 lg:p-6">
          <div className="space-y-2">
            {chapters.map((chapter) => {
              const isActive = activeChapterId === chapter.id;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => setActiveChapterId(chapter.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right transition",
                    isActive ? "bg-lavender-soft" : "hover:bg-slate-50"
                  )}
                >
                  <ChevronDown
                    className={cn("h-4 w-4 shrink-0 text-slate-400", isActive && "text-primary")}
                    aria-hidden
                  />
                  <span className="flex-1 text-sm font-medium leading-6 text-primary-deep">
                    <span className="tabular-nums font-bold text-primary">
                      {formatPercent(chapter.percent)}
                    </span>
                    <span className="mx-2 text-slate-300" aria-hidden>
                      ·
                    </span>
                    {chapter.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-50/50 p-5 lg:p-6">
          <ul className="space-y-2">
            {subchapters.map((sub) => {
              const Icon = subchapterIconMap[sub.icon as keyof typeof subchapterIconMap] ?? BookOpen;
              const isActive = activeSubchapterId === sub.id;
              return (
                <li key={sub.id}>
                  <button
                    type="button"
                    onClick={() => setActiveSubchapterId(sub.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-right transition",
                      isActive
                        ? "border-primary/25 bg-lavender-soft shadow-sm"
                        : "border-transparent bg-white hover:border-slate-100"
                    )}
                  >
                    <ChevronLeft className="h-4 w-4 shrink-0 text-slate-300" aria-hidden />
                    <span className="flex-1 text-sm font-medium text-primary-deep">{sub.title}</span>
                    <Icon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
