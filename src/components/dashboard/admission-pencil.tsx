"use client";

import { BookOpen, GraduationCap } from "lucide-react";
import { provinceMaxRankRows } from "@/lib/data/province-max-ranks";

interface AdmissionPencilProps {
  selectedCode: string;
  onSelect: (code: string) => void;
}

export function AdmissionPencil({ selectedCode, onSelect }: AdmissionPencilProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4 lg:flex-row lg:items-start lg:gap-6">
      <div className="w-full max-w-[220px] shrink-0 text-right lg:pt-6">
        <div className="mb-3 flex justify-end">
          <BookOpen className="h-8 w-8 text-primary" strokeWidth={1.75} aria-hidden />
        </div>
        <h3 className="text-lg font-extrabold leading-8 text-primary-deep">
          حداکثر رتبه
          <br />
          قبولی در استان‌ها
        </h3>
        <div className="mt-4 rounded-2xl border border-primary/20 bg-white/80 p-3 shadow-sm">
          <div className="mb-2 flex justify-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <GraduationCap className="h-5 w-5 text-primary" aria-hidden />
            </span>
          </div>
          <p className="text-center text-[11px] leading-5 text-slate-600">
            اعداد نشان‌دهنده بالاترین رتبه قبولی
            <br />
            (در سهمیه منطقه) در هر استان است.
          </p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[300px]">
        <div className="mx-auto flex w-[220px] flex-col items-center">
          <div className="h-7 w-[88px] rounded-t-full bg-[#C9B8FF] shadow-inner" aria-hidden />
          <div className="flex h-5 w-[104px] items-center justify-center rounded-sm bg-gradient-to-b from-slate-300 to-slate-400 shadow">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/90">
              <BookOpen className="h-3 w-3 text-primary" aria-hidden />
            </span>
          </div>

          <div className="w-full overflow-hidden rounded-b-none border-x-4 border-[#4F7FD9] bg-[#5B8FDE] shadow-[0_8px_24px_rgba(79,127,217,0.35)]">
            <div className="grid grid-cols-2 bg-[#1E2A5E] px-3 py-2 text-[10px] font-bold text-white">
              <span className="text-right">استان</span>
              <span className="text-left">حداکثر رتبه قبولی</span>
            </div>

            <div className="max-h-[300px] overflow-y-auto bg-white/95">
              {provinceMaxRankRows.map((row) => {
                const isSelected = row.code === selectedCode;
                return (
                  <button
                    key={row.code}
                    type="button"
                    onClick={() => onSelect(row.code)}
                    className={`grid w-full grid-cols-2 border-b border-slate-100 px-3 py-2 text-[10px] transition ${
                      isSelected
                        ? "bg-primary/10 text-primary-deep"
                        : "bg-white text-slate-700 hover:bg-lavender-soft"
                    }`}
                  >
                    <span className="truncate text-right font-semibold">{row.name}</span>
                    <span className="text-left font-bold tabular-nums">
                      {row.maxRank.toLocaleString("fa-IR")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="h-4 w-full bg-gradient-to-b from-[#8B6FE8] to-[#6D4DFF]"
            style={{ clipPath: "polygon(0 0, 100% 0, 92% 100%, 8% 100%)" }}
            aria-hidden
          />
          <div
            className="h-10 w-0 border-l-[14px] border-r-[14px] border-t-[36px] border-l-transparent border-r-transparent border-t-[#2E3440]"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
