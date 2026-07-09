"use client";

import { BookOpen } from "lucide-react";
import { provinceMaxRankRows } from "@/lib/data/province-max-ranks";

interface AdmissionPencilProps {
  selectedCode: string;
  onSelect: (code: string) => void;
}

const PENCIL_W = 168;

function PencilTip() {
  return (
    <svg
      viewBox={`0 0 ${PENCIL_W} 56`}
      width={PENCIL_W}
      height={56}
      className="block"
      aria-hidden
    >
      <defs>
        <linearGradient id="pencilWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0D49A" />
          <stop offset="100%" stopColor="#C89A52" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={PENCIL_W} height="5" fill="#D4A853" />
      <path
        d={`M14 5 H${PENCIL_W - 14} L${PENCIL_W / 2} 46 Z`}
        fill="url(#pencilWood)"
      />
      <path
        d={`M${PENCIL_W / 2 - 7} 38 L${PENCIL_W / 2} 56 L${PENCIL_W / 2 + 7} 38 Z`}
        fill="#2E3440"
      />
    </svg>
  );
}

export function AdmissionPencil({ selectedCode, onSelect }: AdmissionPencilProps) {
  return (
    <div className="flex w-full items-start justify-center">
      <div
        className="flex flex-col items-center"
        style={{ width: PENCIL_W }}
        role="group"
        aria-label="مداد حداکثر رتبه قبولی استان‌ها"
      >
        <div
          className="h-7 w-[62px] rounded-t-full bg-gradient-to-b from-[#D9CBFF] to-[#BBA6FF] shadow-[inset_0_-1px_3px_rgba(255,255,255,0.5)]"
          aria-hidden
        />

        <div
          className="relative z-10 -mt-px flex h-5 w-[72px] items-center justify-center rounded-sm bg-gradient-to-b from-[#D7DCE5] via-[#A8B0BC] to-[#8C95A3] shadow-sm"
          aria-hidden
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/50 bg-white/90">
            <BookOpen className="h-2.5 w-2.5 text-primary" strokeWidth={2} aria-hidden />
          </span>
        </div>

        <div
          className="relative w-full shadow-[0_10px_24px_rgba(61,111,184,0.22)]"
          style={{ width: PENCIL_W }}
        >
          <div
            className="absolute inset-y-0 start-0 w-[6px] bg-gradient-to-r from-[#2F5F9E] to-[#4A7FCC]"
            aria-hidden
          />
          <div
            className="absolute inset-y-0 end-0 w-[6px] bg-gradient-to-l from-[#2F5F9E] to-[#4A7FCC]"
            aria-hidden
          />

          <div className="mx-[6px] overflow-hidden bg-white">
            <div className="grid grid-cols-[1fr_auto] gap-1 bg-[#1E2A5E] px-2 py-2 text-[9px] font-bold text-white">
              <span className="text-right">استان</span>
              <span className="whitespace-nowrap text-left">رتبه</span>
            </div>

            <div className="max-h-[300px] overflow-y-auto bg-white">
              {provinceMaxRankRows.map((row) => {
                const isSelected = row.code === selectedCode;
                return (
                  <button
                    key={row.code}
                    type="button"
                    onClick={() => onSelect(row.code)}
                    className={`grid w-full grid-cols-[1fr_auto] gap-1 border-b border-slate-100 px-2 py-1.5 text-[9px] transition ${
                      isSelected
                        ? "bg-primary/12 text-primary-deep"
                        : "bg-white text-slate-700 hover:bg-lavender-soft"
                    }`}
                  >
                    <span className="truncate text-right font-semibold">{row.name}</span>
                    <span className="whitespace-nowrap text-left font-bold tabular-nums">
                      {row.maxRank.toLocaleString("fa-IR")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <PencilTip />
      </div>
    </div>
  );
}
