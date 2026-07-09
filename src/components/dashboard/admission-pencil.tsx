"use client";

import { BookOpen, GraduationCap } from "lucide-react";
import { provinceMaxRankRows } from "@/lib/data/province-max-ranks";

interface AdmissionPencilProps {
  selectedCode: string;
  onSelect: (code: string) => void;
}

function PencilTip() {
  return (
    <svg viewBox="0 0 248 88" className="w-full" aria-hidden>
      <defs>
        <linearGradient id="pencilWave" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B6FE8" />
          <stop offset="100%" stopColor="#6D4DFF" />
        </linearGradient>
        <linearGradient id="pencilWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8C98E" />
          <stop offset="100%" stopColor="#C89A52" />
        </linearGradient>
      </defs>
      <path d="M0 0 H248 V18 C210 30 176 42 124 58 C72 42 38 30 0 18 Z" fill="url(#pencilWave)" />
      <path d="M88 58 L124 88 L160 58 Z" fill="url(#pencilWood)" />
      <path d="M116 72 L124 88 L132 72 Z" fill="#2E3440" />
    </svg>
  );
}

export function AdmissionPencil({ selectedCode, onSelect }: AdmissionPencilProps) {
  return (
    <div className="flex w-full items-start justify-center gap-4 sm:gap-5">
      <div className="hidden w-[128px] shrink-0 pt-8 text-right sm:block">
        <BookOpen className="ms-auto h-8 w-8 text-primary" strokeWidth={1.75} aria-hidden />
        <h3 className="mt-3 text-base font-extrabold leading-7 text-primary-deep">
          حداکثر رتبه
          <br />
          قبولی در استان‌ها
        </h3>
        <div className="mt-4 rounded-2xl border border-primary/20 bg-white/90 p-3 shadow-sm">
          <div className="mb-2 flex justify-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <GraduationCap className="h-5 w-5 text-primary" aria-hidden />
            </span>
          </div>
          <p className="text-center text-[10px] leading-5 text-slate-600">
            اعداد نشان‌دهنده بالاترین رتبه قبولی
            <br />
            (در سهمیه منطقه) در هر استان است.
          </p>
        </div>
      </div>

      <div
        className="flex w-[248px] max-w-full flex-col items-center"
        role="group"
        aria-label="مداد حداکثر رتبه قبولی استان‌ها"
      >
        <div
          className="h-9 w-[104px] rounded-t-full bg-gradient-to-b from-[#D9CBFF] to-[#BBA6FF] shadow-[inset_0_-2px_4px_rgba(255,255,255,0.45)]"
          aria-hidden
        />

        <div
          className="relative z-10 -mt-0.5 flex h-6 w-[118px] items-center justify-center rounded-sm bg-gradient-to-b from-[#D7DCE5] via-[#A8B0BC] to-[#8C95A3] shadow-md"
          aria-hidden
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/50 bg-white/90">
            <BookOpen className="h-3 w-3 text-primary" strokeWidth={2} aria-hidden />
          </span>
        </div>

        <div className="relative w-full shadow-[0_14px_30px_rgba(61,111,184,0.28)]">
          <div
            className="absolute inset-y-0 left-0 w-[10px] bg-gradient-to-r from-[#2F5F9E] to-[#4A7FCC]"
            aria-hidden
          />
          <div
            className="absolute inset-y-0 right-0 w-[10px] bg-gradient-to-l from-[#2F5F9E] to-[#4A7FCC]"
            aria-hidden
          />

          <div className="mx-[10px] overflow-hidden bg-white">
            <div className="grid grid-cols-2 bg-[#1E2A5E] px-3 py-2.5 text-[10px] font-bold text-white">
              <span className="text-right">استان</span>
              <span className="text-left">حداکثر رتبه قبولی</span>
            </div>

            <div className="max-h-[340px] overflow-y-auto bg-white">
              {provinceMaxRankRows.map((row) => {
                const isSelected = row.code === selectedCode;
                return (
                  <button
                    key={row.code}
                    type="button"
                    onClick={() => onSelect(row.code)}
                    className={`grid w-full grid-cols-2 border-b border-slate-100 px-3 py-2 text-[10px] transition ${
                      isSelected
                        ? "bg-primary/12 text-primary-deep"
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
        </div>

        <div className="-mt-px w-full">
          <PencilTip />
        </div>
      </div>
    </div>
  );
}
