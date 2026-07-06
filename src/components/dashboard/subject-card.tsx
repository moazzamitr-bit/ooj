"use client";

import { cn } from "@/lib/utils/cn";
import { Progress } from "@/components/ui/progress";
import { SubjectIcon } from "@/components/dashboard/subject-icon";
import { formatPercent } from "@/lib/utils/persian";
import type { Subject } from "@/types";

const subjectThemes: Record<string, { iconBg: string; bar: string; track: string }> = {
  sub_chem: { iconBg: "bg-[#2F80FF]/10 text-[#2F80FF]", bar: "from-[#2F80FF] to-[#5B9DFF]", track: "bg-blue-50" },
  sub_physics: { iconBg: "bg-[#6D4DFF]/10 text-[#6D4DFF]", bar: "from-[#6D4DFF] to-[#9B7BFF]", track: "bg-violet-50" },
  sub_bio: { iconBg: "bg-[#20C997]/10 text-[#20C997]", bar: "from-[#20C997] to-[#4DD4AC]", track: "bg-emerald-50" },
  sub_math: { iconBg: "bg-[#111A4C]/10 text-[#111A4C]", bar: "from-[#111A4C] to-[#3D4A8C]", track: "bg-indigo-50" },
};

interface SubjectCardProps {
  subject: Subject;
  progress: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function SubjectCard({ subject, progress, isActive, onClick }: SubjectCardProps) {
  const theme = subjectThemes[subject.id] ?? subjectThemes.sub_chem;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "w-full rounded-2xl border bg-white p-5 text-right shadow-[0_4px_20px_rgb(17_26_76_0.04)] transition-all",
        isActive ? "border-[#2F80FF] ring-1 ring-[#2F80FF]/30" : "border-slate-100 hover:border-violet-100"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            theme.iconBg
          )}
        >
          <SubjectIcon subjectId={subject.id} />
        </div>
        <h3 className="flex-1 text-base font-bold text-primary-deep">{subject.name}</h3>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="tabular-nums text-sm font-bold text-primary">{formatPercent(progress)}</span>
        <span className="text-xs text-slate-400">درصد پیشرفت</span>
      </div>

      <div className="mt-2">
        <Progress
          value={progress}
          barClassName={cn("bg-gradient-to-l", theme.bar)}
          trackClassName={theme.track}
          height="sm"
        />
      </div>
    </button>
  );
}
