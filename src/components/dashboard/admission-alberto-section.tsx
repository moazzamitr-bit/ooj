"use client";

import { useMemo, useState } from "react";
import { BookOpen, Info, MapPin } from "lucide-react";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { AlbertoCard } from "@/components/dashboard/alberto-card";
import {
  IRAN_MAP_VIEWBOX,
  iranProvinces,
  provinceAdmissionIntensity,
} from "@/lib/data/iran-provinces";
import { getProvinceAdmissionRanks } from "@/lib/services/admission.service";
import { useApp } from "@/providers/app-provider";
import type { UniversityType } from "@/types";

function getProvinceFill(code: string, selectedCode: string) {
  if (code === selectedCode) return "#6D4DFF";
  const intensity = provinceAdmissionIntensity[code] ?? 0.3;
  const opacity = 0.2 + intensity * 0.5;
  return `rgba(109, 77, 255, ${opacity.toFixed(2)})`;
}

export function AdmissionAlbertoSection() {
  const { student } = useApp();
  const [universityType, setUniversityType] = useState<UniversityType>("دولتی");
  const [selectedCode, setSelectedCode] = useState("Ham");

  const selectedProvince = useMemo(
    () => iranProvinces.find((p) => p.code === selectedCode) ?? iranProvinces.find((p) => p.code === "Ham")!,
    [selectedCode]
  );

  const rankRows = useMemo(
    () => getProvinceAdmissionRanks(selectedProvince.name_fa, universityType),
    [selectedProvince.name_fa, universityType]
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-stretch">
      <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_rgb(17_26_76_0.04)]">
        <div className="border-b border-slate-100 px-5 py-4 lg:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" aria-hidden />
            </div>
            <h2 className="text-sm font-extrabold leading-6 text-primary-deep">
              نقشه قبولی رشته‌ها در استان‌ها
            </h2>
          </div>
        </div>

        <div className="grid flex-1 lg:grid-cols-2">
          <div className="flex flex-col border-l border-slate-100 p-5 lg:p-6">
            <div className="mb-4 rounded-xl bg-lavender-soft px-3 py-2.5">
              <p className="text-[11px] text-slate-500">خدمات شهر انتخاب‌شده</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-primary-deep">
                <MapPin className="h-4 w-4 text-primary" aria-hidden />
                {selectedProvince.name_fa} | {student.city}
              </p>
            </div>

            <p className="mb-3 text-xs font-bold text-slate-500">حداقل مورد قبول</p>

            <ul className="flex-1 space-y-0">
              {rankRows.map((row) => (
                <li
                  key={row.major}
                  className="flex items-center justify-between border-t border-slate-50 py-3.5 first:border-t-0 first:pt-0"
                >
                  <span className="font-medium text-primary-deep">{row.major}</span>
                  <span className="tabular-nums text-sm font-bold text-primary">
                    {row.rank.toLocaleString("fa-IR")} رتبه
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
              <Info className="h-3.5 w-3.5 shrink-0" aria-hidden />
              اعداد بر اساس کارنامه‌های سال قبل می‌باشد
            </p>
          </div>

          <div className="flex flex-col items-center justify-center bg-slate-50/40 p-5 lg:p-6">
            <div className="relative w-full max-w-[240px]">
              <svg
                viewBox={IRAN_MAP_VIEWBOX}
                className="mx-auto h-auto w-full max-h-[220px]"
                role="img"
                aria-label="نقشه استان‌های ایران"
              >
                {iranProvinces.map((province) => {
                  const isSelected = province.code === selectedCode;
                  return (
                    <path
                      key={province.code}
                      d={province.path}
                      fill={getProvinceFill(province.code, selectedCode)}
                      stroke={isSelected ? "#4C35D9" : "#D8CCFF"}
                      strokeWidth={isSelected ? 2 : 0.75}
                      className="cursor-pointer transition-all duration-200 hover:brightness-95"
                      onClick={() => setSelectedCode(province.code)}
                      aria-label={province.name_fa}
                    />
                  );
                })}
              </svg>

              <div className="pointer-events-none absolute left-[52%] top-[46%] -translate-x-1/2">
                <div className="flex flex-col items-center">
                  <MapPin className="h-5 w-5 fill-primary text-primary drop-shadow" aria-hidden />
                  <div className="mt-1 rounded-lg bg-primary-deep px-2.5 py-1 text-[10px] font-medium text-white shadow-md">
                    {selectedProvince.name_fa} | {student.city}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 w-full max-w-[240px] space-y-3">
              <div className="flex justify-center">
                <SegmentedControl
                  options={[
                    { value: "آزاد" as UniversityType, label: "آزاد" },
                    { value: "دولتی" as UniversityType, label: "دولتی" },
                  ]}
                  value={universityType}
                  onChange={setUniversityType}
                />
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <span>کمتر قبول</span>
                <div className="h-2 flex-1 rounded-full bg-gradient-to-l from-violet-200 to-primary" />
                <span>بیشتر قبول</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlbertoCard className="h-full min-h-[440px] min-w-0" compact />
    </div>
  );
}
