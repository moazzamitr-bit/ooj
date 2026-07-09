"use client";

import { useMemo, useState } from "react";
import { BookOpen, Info, MapPin } from "lucide-react";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { AdmissionPencil } from "@/components/dashboard/admission-pencil";
import { AlbertoCard } from "@/components/dashboard/alberto-card";
import { iranProvinces } from "@/lib/data/iran-provinces";
import { getProvinceMaxAcceptanceRank } from "@/lib/data/province-max-ranks";
import { getProvinceMedicalRanks } from "@/lib/services/admission.service";
import { useApp } from "@/providers/app-provider";
import type { UniversityType } from "@/types";

export function AdmissionAlbertoSection() {
  const { student } = useApp();
  const [universityType, setUniversityType] = useState<UniversityType>("دولتی");
  const [selectedCode, setSelectedCode] = useState("Ham");

  const selectedProvince = useMemo(
    () => iranProvinces.find((p) => p.code === selectedCode) ?? iranProvinces.find((p) => p.code === "Ham")!,
    [selectedCode]
  );

  const rankRows = useMemo(
    () => getProvinceMedicalRanks(selectedProvince.name_fa, selectedProvince.code, universityType),
    [selectedProvince.name_fa, selectedProvince.code, universityType]
  );

  const provinceMaxRank = getProvinceMaxAcceptanceRank(selectedProvince.code);

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
              <p className="text-[11px] text-slate-500">استان انتخاب‌شده</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-primary-deep">
                <MapPin className="h-4 w-4 text-primary" aria-hidden />
                {selectedProvince.name_fa} | {student.city}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                حداکثر رتبه قبولی استان:{" "}
                <span className="font-bold text-primary tabular-nums">
                  {provinceMaxRank.toLocaleString("fa-IR")}
                </span>
              </p>
            </div>

            <p className="mb-3 text-xs font-bold text-slate-500">
              حداکثر رتبه قبولی رشته‌های پزشکی
            </p>

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

          <div className="flex min-h-[520px] flex-col items-center justify-start bg-gradient-to-b from-[#F7F4FF] to-[#EEF4FF] p-4 lg:min-h-[560px] lg:p-5">
            <AdmissionPencil selectedCode={selectedCode} onSelect={setSelectedCode} />

            <div className="mt-3 w-full max-w-[280px]">
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
            </div>
          </div>
        </div>
      </div>

      <AlbertoCard className="h-full min-h-[440px] min-w-0" compact />
    </div>
  );
}
