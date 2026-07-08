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
    card: string;
    iconWrap: string;
    icon: string;
    name: string;
    footer: string;
    cellActive: string;
    cellIdle: string;
    ring: string;
  }
> = {
  sub_bio: {
    card: "from-emerald-50/70 via-white to-white",
    iconWrap: "bg-gradient-to-br from-emerald-100 to-emerald-50 shadow-[0_4px_14px_rgb(16_185_129_0.12)]",
    icon: "text-emerald-600",
    name: "text-emerald-900",
    footer: "bg-emerald-50/40",
    cellActive: "bg-emerald-500 text-white shadow-[0_2px_8px_rgb(16_185_129_0.25)]",
    cellIdle: "text-emerald-900/80 hover:bg-emerald-100/60",
    ring: "ring-emerald-300/50",
  },
  sub_chem: {
    card: "from-sky-50/70 via-white to-white",
    iconWrap: "bg-gradient-to-br from-sky-100 to-blue-50 shadow-[0_4px_14px_rgb(47_128_255_0.12)]",
    icon: "text-sky-600",
    name: "text-sky-900",
    footer: "bg-sky-50/40",
    cellActive: "bg-sky-500 text-white shadow-[0_2px_8px_rgb(47_128_255_0.25)]",
    cellIdle: "text-sky-900/80 hover:bg-sky-100/60",
    ring: "ring-sky-300/50",
  },
  sub_physics: {
    card: "from-violet-50/70 via-white to-white",
    iconWrap: "bg-gradient-to-br from-violet-100 to-violet-50 shadow-[0_4px_14px_rgb(139_92_246_0.12)]",
    icon: "text-violet-600",
    name: "text-violet-900",
    footer: "bg-violet-50/40",
    cellActive: "bg-violet-500 text-white shadow-[0_2px_8px_rgb(139_92_246_0.25)]",
    cellIdle: "text-violet-900/80 hover:bg-violet-100/60",
    ring: "ring-violet-300/50",
  },
  sub_math: {
    card: "from-indigo-50/70 via-white to-white",
    iconWrap: "bg-gradient-to-br from-indigo-100 to-indigo-50 shadow-[0_4px_14px_rgb(99_102_241_0.12)]",
    icon: "text-indigo-600",
    name: "text-indigo-900",
    footer: "bg-indigo-50/40",
    cellActive: "bg-indigo-500 text-white shadow-[0_2px_8px_rgb(99_102_241_0.25)]",
    cellIdle: "text-indigo-900/80 hover:bg-indigo-100/60",
    ring: "ring-indigo-300/50",
  },
};

interface SubjectCardProps {
  subject: Subject;
  isActive?: boolean;
  activeSection?: SubjectTestSection | null;
  onSectionClick?: (section: SubjectTestSection) => void;
}

function CellButton({
  label,
  section,
  isActive,
  theme,
  onClick,
  className,
}: {
  label: string;
  section: SubjectTestSection;
  isActive: boolean;
  theme: (typeof subjectThemes)[string];
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
        "flex min-h-[42px] w-full items-center justify-center rounded-lg px-1 text-center text-[11px] font-bold leading-5 transition-all duration-200 md:min-h-[44px] md:text-xs",
        isActive ? theme.cellActive : theme.cellIdle,
        className
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
        "group flex h-full w-full flex-col overflow-hidden rounded-[1.35rem] border border-slate-100/90 bg-white text-right shadow-[0_4px_24px_rgb(17_26_76_0.05)] transition-all duration-300",
        isActive && cn("shadow-[0_12px_40px_rgb(17_26_76_0.08)] ring-2", theme.ring)
      )}
    >
      <div className={cn("flex items-center justify-center bg-gradient-to-b px-4 py-6", theme.card)}>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl md:h-12 md:w-12",
              theme.iconWrap
            )}
          >
            <SubjectIcon subjectId={subject.id} iconClassName={theme.icon} />
          </div>
          <h3 className={cn("text-lg font-extrabold tracking-tight md:text-xl", theme.name)}>
            {subject.name}
          </h3>
        </div>
      </div>

      <div className={cn("border-t border-white/60 px-2.5 py-2.5", theme.footer)}>
        <div className="grid grid-cols-4 gap-1.5">
          <CellButton
            label="اول"
            section="year1"
            isActive={activeSection === "year1"}
            theme={theme}
            onClick={onSectionClick}
          />
          <CellButton
            label="دوم"
            section="year2"
            isActive={activeSection === "year2"}
            theme={theme}
            onClick={onSectionClick}
          />
          <CellButton
            label="سوم"
            section="year3"
            isActive={activeSection === "year3"}
            theme={theme}
            onClick={onSectionClick}
          />

          <div className="flex min-h-[88px] flex-col gap-1">
            <div className="flex min-h-[38px] items-center justify-center rounded-lg bg-white/50 text-[10px] font-bold text-slate-500 md:text-[11px]">
              کنکور
            </div>
            <div className="grid flex-1 grid-cols-2 divide-x divide-white/80">
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
    </div>
  );
}
