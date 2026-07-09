"use client";

import Image from "next/image";
import { provinceMaxRankRows } from "@/lib/data/province-max-ranks";
import pencilBg from "@/assets/images/admission-pencil-bg.png";

interface AdmissionPencilProps {
  selectedCode: string;
  onSelect: (code: string) => void;
}

export function AdmissionPencil({ selectedCode, onSelect }: AdmissionPencilProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="relative w-full max-w-[300px]">
        <Image
          src={pencilBg}
          alt="مداد حداکثر رتبه قبولی استان‌ها"
          width={576}
          height={1024}
          className="h-auto w-full select-none"
          priority
        />

        <div
          className="absolute flex flex-col overflow-hidden rounded-sm bg-white shadow-inner"
          style={{
            top: "12.8%",
            left: "20.5%",
            right: "20.5%",
            bottom: "23.5%",
          }}
        >
          <div className="grid grid-cols-2 bg-[#1E2A5E] px-2 py-2 text-[9px] font-bold text-white sm:text-[10px]">
            <span className="text-right">استان</span>
            <span className="text-left">حداکثر رتبه قبولی</span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto bg-white">
            {provinceMaxRankRows.map((row) => {
              const isSelected = row.code === selectedCode;
              return (
                <button
                  key={row.code}
                  type="button"
                  onClick={() => onSelect(row.code)}
                  className={`grid w-full grid-cols-2 border-b border-slate-100 px-2 py-1.5 text-[9px] transition sm:px-2.5 sm:py-2 sm:text-[10px] ${
                    isSelected
                      ? "bg-primary/15 text-primary-deep"
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
    </div>
  );
}
