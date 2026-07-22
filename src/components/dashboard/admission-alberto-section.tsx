"use client";

import { useMemo, useState } from "react";
import { AdmissionPencil } from "@/components/dashboard/admission-pencil";
import { AlbertoCard } from "@/components/dashboard/alberto-card";
import { iranProvinces } from "@/lib/data/iran-provinces";
import { getProvinceMaxAcceptanceRank } from "@/lib/data/province-max-ranks";
import { getProvinceMedicalRanks } from "@/lib/services/admission.service";

export function AdmissionAlbertoSection() {
  const [selectedCode, setSelectedCode] = useState("Ham");

  const selectedProvince = useMemo(
    () => iranProvinces.find((p) => p.code === selectedCode) ?? iranProvinces.find((p) => p.code === "Ham")!,
    [selectedCode]
  );

  const rankRows = useMemo(
    () => getProvinceMedicalRanks(selectedProvince.name_fa, selectedProvince.code, "دولتی"),
    [selectedProvince.name_fa, selectedProvince.code]
  );

  const provinceMaxRank = getProvinceMaxAcceptanceRank(selectedProvince.code);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[7fr_13fr] lg:items-stretch">
      <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_rgb(17_26_76_0.04)]">
        <div className="grid flex-1 lg:grid-cols-[10fr_12fr]">
          <div className="order-2 flex min-h-[560px] flex-col items-center justify-start overflow-hidden bg-white px-1 py-3 lg:order-1 lg:min-h-[600px] lg:px-2 lg:py-4">
            <AdmissionPencil selectedCode={selectedCode} onSelect={setSelectedCode} />
          </div>

          <div className="order-1 flex min-w-0 flex-col border-r border-slate-100 p-4 lg:order-2 lg:p-5">
            <div className="lg:mt-8">
              <div className="overflow-hidden rounded-xl bg-gradient-to-br from-[#2563eb] via-[#1d4ed8] to-[#1e40af] px-3 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
                <p className="text-[10px] font-semibold text-blue-100/90">شهر روبه‌رو</p>
                <p className="mt-2 text-2xl font-black leading-tight tracking-tight text-white drop-shadow-sm lg:text-3xl">
                  {selectedProvince.name_fa}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-1 flex-col">
              <p className="mb-2 text-[11px] text-slate-500">
                حداقل رتبه قبولی استان:{" "}
                <span className="font-bold text-primary tabular-nums">
                  {provinceMaxRank.toLocaleString("fa-IR")}
                </span>
              </p>

              <p className="mb-3 text-xs font-bold text-slate-500">
                حداقل رتبه قبولی رشته‌های پزشکی
              </p>

              <ul className="flex-1 space-y-0">
                {rankRows.map((row) => (
                  <li
                    key={row.major}
                    className="flex items-center justify-between gap-2 border-t border-slate-50 py-3 first:border-t-0 first:pt-0"
                  >
                    <span className="text-sm font-medium text-primary-deep">{row.major}</span>
                    <span className="shrink-0 tabular-nums text-sm font-bold text-primary">
                      {row.rank.toLocaleString("fa-IR")} رتبه
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <AlbertoCard className="h-full min-h-[440px] min-w-0" compact />
    </div>
  );
}
