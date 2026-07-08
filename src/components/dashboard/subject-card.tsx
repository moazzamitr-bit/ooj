"use client";

import { cn } from "@/lib/utils/cn";
import { formatPercent } from "@/lib/utils/persian";
import { SubjectIcon } from "@/components/dashboard/subject-icon";
import { Progress } from "@/components/ui/progress";
import type { Subject } from "@/types";

export type SubjectTestSection =
  | "year1"
  | "year2"
  | "year3"
  | "konkur_talfiyi"
  | "konkur_sarasari";

const subjectThemes: Record<string, { border: string; activeCell: string; name: string }> = {
  sub_bio: {
    border: "border-emerald-200",
    activeCell: "bg-emerald-50 text-emerald-700",
    name: "text-emerald-800",
  },
  sub_chem: {
    border: "border-blue-200",
    activeCell: "bg-blue-50 text-blue-700",
    name: "text-blue-800",
  },
  sub_physics: {
    border: "border-violet-200",
    activeCell: "bg-violet-50 text-violet-700",
    name: "text-violet-800",
  },
  sub_math: {
    border: "border-indigo-200",
    activeCell: "bg-indigo-50 text-indigo-800",
    name: "text-indigo-900",
  },
};

interface SubjectCardProps {
  subject: Subject;
  progress?: number;
  isActive?: boolean;
  activeSection?: SubjectTestSection | null;
  onSectionClick?: (section: SubjectTestSection) => void;
}

function CellButton({
  label,
  section,
  isActive,
  onClick,
  className,
}: {
  label: string;
  section: SubjectTestSection;
  isActive: boolean;
  onClick?: (section: SubjectTestSection) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(section);
      }}
      className={cn(
        "flex min-h-[44px] w-full items-center justify-center border-slate-200 px-1 text-center text-xs font-bold leading-5 text-primary-deep transition hover:bg-slate-50 md:text-sm",
        isActive && "bg-lavender-soft text-primary ring-1 ring-inset ring-primary/25",
        className
      )}
    >
      {label}
    </button>
  );
}

export function SubjectCard({
  subject,
  progress = 0,
  isActive,
  activeSection,
  onSectionClick,
}: SubjectCardProps) {
  const theme = subjectThemes[subject.id] ?? subjectThemes.sub_chem;

  return (
    <div
      className={cn(
        "flex h-full min-h-[240px] w-full flex-col overflow-hidden rounded-2xl border-2 bg-white text-right shadow-[0_4px_20px_rgb(17_26_76_0.04)] transition-all md:min-h-[280px]",
        theme.border,
        isActive ? "ring-2 ring-primary/35 shadow-md" : "hover:shadow-md"
      )}
    >
      {/* نام درس — فضای بالایی */}
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 py-5 md:py-6">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 md:h-14 md:w-14",
            theme.activeCell
          )}
        >
          <SubjectIcon subjectId={subject.id} />
        </div>
        <h3 className={cn("text-xl font-extrabold md:text-2xl", theme.name)}>{subject.name}</h3>
        <p className="text-2xl font-extrabold text-primary">{formatPercent(progress)}</p>
        <div className="w-full px-2">
          <Progress
            value={progress}
            barClassName="bg-gradient-to-l from-primary to-electric-blue"
            trackClassName="bg-slate-100"
            height="sm"
          />
          <p className="mt-1 text-center text-[11px] font-semibold text-slate-400">درصد پیشرفت</p>
        </div>
      </div>

      {/* جدول پایین: اول | دوم | سوم | کنکور */}
      <div className="grid grid-cols-4 border-t-2 border-slate-200">
        <CellButton
          label="اول"
          section="year1"
          isActive={activeSection === "year1"}
          onClick={onSectionClick}
          className="border-l border-slate-200"
        />
        <CellButton
          label="دوم"
          section="year2"
          isActive={activeSection === "year2"}
          onClick={onSectionClick}
          className="border-l border-slate-200"
        />
        <CellButton
          label="سوم"
          section="year3"
          isActive={activeSection === "year3"}
          onClick={onSectionClick}
          className="border-l border-slate-200"
        />

        {/* ستون کنکور */}
        <div className="flex min-h-[88px] flex-col">
          <div className="flex min-h-[44px] items-center justify-center border-b border-slate-200 text-xs font-bold text-primary-deep md:text-sm">
            کنکور
          </div>
          <div className="grid flex-1 grid-cols-2">
            <CellButton
              label="تالیفی"
              section="konkur_talfiyi"
              isActive={activeSection === "konkur_talfiyi"}
              onClick={onSectionClick}
              className="border-l border-slate-200"
            />
            <CellButton
              label="سراسری"
              section="konkur_sarasari"
              isActive={activeSection === "konkur_sarasari"}
              onClick={onSectionClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
