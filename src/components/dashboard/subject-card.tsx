"use client";

import { cn } from "@/lib/utils/cn";
import { SubjectIcon } from "@/components/dashboard/subject-icon";
import type { Subject } from "@/types";

export type SubjectTestSection =
  | "year1"
  | "year2"
  | "year3"
  | "konkur_talfiyi"
  | "konkur_sarasari";

const subjectThemes: Record<
  string,
  {
    surface: string;
    iconWrap: string;
    icon: string;
    name: string;
    panel: string;
    cellActive: string;
    cellIdle: string;
    ring: string;
    divider: string;
  }
> = {
  sub_bio: {
    surface: "bg-gradient-to-b from-emerald-50 to-emerald-50/70",
    iconWrap: "bg-white/90 text-emerald-600 shadow-[0_2px_8px_rgb(16_185_129_0.12)]",
    icon: "text-emerald-600",
    name: "text-emerald-950",
    panel: "bg-white/75 border-emerald-100/80",
    cellActive: "bg-emerald-500 text-white shadow-[0_2px_8px_rgb(16_185_129_0.25)]",
    cellIdle: "bg-white/80 text-emerald-950/80 hover:bg-emerald-100/70",
    ring: "ring-emerald-300/50",
    divider: "divide-emerald-100/90",
  },
  sub_geo: {
    surface: "bg-gradient-to-b from-amber-50 to-amber-50/70",
    iconWrap: "bg-white/90 text-amber-700 shadow-[0_2px_8px_rgb(180_83_9_0.12)]",
    icon: "text-amber-700",
    name: "text-amber-950",
    panel: "bg-white/75 border-amber-100/80",
    cellActive: "bg-amber-600 text-white shadow-[0_2px_8px_rgb(180_83_9_0.25)]",
    cellIdle: "bg-white/80 text-amber-950/80 hover:bg-amber-100/70",
    ring: "ring-amber-300/50",
    divider: "divide-amber-100/90",
  },
  sub_chem: {
    surface: "bg-gradient-to-b from-sky-50 to-sky-50/70",
    iconWrap: "bg-white/90 text-sky-600 shadow-[0_2px_8px_rgb(47_128_255_0.12)]",
    icon: "text-sky-600",
    name: "text-sky-950",
    panel: "bg-white/75 border-sky-100/80",
    cellActive: "bg-sky-500 text-white shadow-[0_2px_8px_rgb(47_128_255_0.25)]",
    cellIdle: "bg-white/80 text-sky-950/80 hover:bg-sky-100/70",
    ring: "ring-sky-300/50",
    divider: "divide-sky-100/90",
  },
  sub_physics: {
    surface: "bg-gradient-to-b from-violet-50 to-violet-50/70",
    iconWrap: "bg-white/90 text-violet-600 shadow-[0_2px_8px_rgb(139_92_246_0.12)]",
    icon: "text-violet-600",
    name: "text-violet-950",
    panel: "bg-white/75 border-violet-100/80",
    cellActive: "bg-violet-500 text-white shadow-[0_2px_8px_rgb(139_92_246_0.25)]",
    cellIdle: "bg-white/80 text-violet-950/80 hover:bg-violet-100/70",
    ring: "ring-violet-300/50",
    divider: "divide-violet-100/90",
  },
  sub_math: {
    surface: "bg-gradient-to-b from-indigo-50 to-indigo-50/70",
    iconWrap: "bg-white/90 text-indigo-600 shadow-[0_2px_8px_rgb(99_102_241_0.12)]",
    icon: "text-indigo-600",
    name: "text-indigo-950",
    panel: "bg-white/75 border-indigo-100/80",
    cellActive: "bg-indigo-500 text-white shadow-[0_2px_8px_rgb(99_102_241_0.25)]",
    cellIdle: "bg-white/80 text-indigo-950/80 hover:bg-indigo-100/70",
    ring: "ring-indigo-300/50",
    divider: "divide-indigo-100/90",
  },
};

interface SubjectCardProps {
  subject: Subject;
  isActive?: boolean;
  activeSection?: SubjectTestSection | null;
  onSectionClick?: (section: SubjectTestSection) => void;
}

function GradeCellButton({
  grade,
  section,
  isActive,
  theme,
  onClick,
}: {
  grade: string;
  section: SubjectTestSection;
  isActive: boolean;
  theme: (typeof subjectThemes)[string];
  onClick?: (section: SubjectTestSection) => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(section);
      }}
      className={cn(
        "flex min-h-11 w-full flex-col items-center justify-center rounded-xl px-1 py-1.5 text-center transition-all duration-200",
        isActive ? theme.cellActive : theme.cellIdle
      )}
    >
      <span className="text-[9px] font-bold leading-none opacity-80">پایه</span>
      <span className="mt-1 text-sm font-extrabold leading-none tabular-nums">{grade}</span>
    </button>
  );
}

function CellButton({
  label,
  section,
  isActive,
  theme,
  onClick,
}: {
  label: string;
  section: SubjectTestSection;
  isActive: boolean;
  theme: (typeof subjectThemes)[string];
  onClick?: (section: SubjectTestSection) => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(section);
      }}
      className={cn(
        "flex min-h-9 w-full items-center justify-center rounded-lg px-1 text-center text-[11px] font-bold leading-4 transition-all duration-200",
        isActive ? theme.cellActive : theme.cellIdle
      )}
    >
      {label}
    </button>
  );
}

export function SubjectCard({
  subject,
  isActive,
  activeSection,
  onSectionClick,
}: SubjectCardProps) {
  const theme = subjectThemes[subject.id] ?? subjectThemes.sub_chem;

  return (
    <div
      className={cn(
        "group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 text-right shadow-[0_4px_18px_rgb(17_26_76_0.05)] transition-all duration-300",
        theme.surface,
        isActive && cn("shadow-[0_10px_28px_rgb(17_26_76_0.08)] ring-2", theme.ring)
      )}
    >
      <div className="flex items-center gap-2.5 px-3.5 pb-3 pt-3.5">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            theme.iconWrap
          )}
        >
          <SubjectIcon
            subjectId={subject.id}
            iconClassName={cn("!h-4 !w-4", theme.icon)}
          />
        </div>
        <h3
          className={cn(
            "min-w-0 flex-1 text-[15px] font-extrabold leading-6 tracking-tight md:text-base",
            theme.name
          )}
          title={subject.name}
        >
          <span className="line-clamp-2">{subject.name}</span>
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-3 pb-3">
        <div className={cn("rounded-2xl border p-2", theme.panel)}>
          <div className={cn("grid grid-cols-3 gap-1.5", theme.divider)}>
            <GradeCellButton
              grade="۱۰"
              section="year1"
              isActive={activeSection === "year1"}
              theme={theme}
              onClick={onSectionClick}
            />
            <GradeCellButton
              grade="۱۱"
              section="year2"
              isActive={activeSection === "year2"}
              theme={theme}
              onClick={onSectionClick}
            />
            <GradeCellButton
              grade="۱۲"
              section="year3"
              isActive={activeSection === "year3"}
              theme={theme}
              onClick={onSectionClick}
            />
          </div>
        </div>

        <div className={cn("rounded-2xl border p-2", theme.panel)}>
          <p className="mb-1.5 text-center text-[10px] font-bold tracking-wide text-slate-500">
            کنکور
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            <CellButton
              label="تالیفی"
              section="konkur_talfiyi"
              isActive={activeSection === "konkur_talfiyi"}
              theme={theme}
              onClick={onSectionClick}
            />
            <CellButton
              label="سراسری"
              section="konkur_sarasari"
              isActive={activeSection === "konkur_sarasari"}
              theme={theme}
              onClick={onSectionClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
