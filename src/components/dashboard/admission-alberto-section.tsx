"use client";

import { useMemo, useState } from "react";
import { BookOpen, Info, MapPin } from "lucide-react";
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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[7fr_13fr] lg:items-start">
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

        <div className="grid flex-1 lg:grid-cols-[13fr_7fr]">
          <div className="order-2 flex min-h-[480px] flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-[#EFF6FF] to-[#F8FAFC] px-2 py-4 lg:order-1 lg:min-h-[520px] lg:px-3 lg:py-5">
            <AdmissionPencil selectedCode={selectedCode} onSelect={setSelectedCode} />
          </div>

          <div className="order-1 flex min-w-0 flex-col border-r border-slate-100 p-4 lg:order-2 lg:p-5">
            {/*
              Push city + ranks as one block so they sit beside the pencil city rows
              (eraser 72 + ferrule ~78 + table header ~36 ≈ 186px).
            */}
            <div className="flex flex-col gap-3 lg:mt-[186px]">
              <div className="overflow-hidden rounded-xl bg-gradient-to-br from-[#2563eb] via-[#1d4ed8] to-[#1e40af] px-3 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
                <p className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-100/90">
                  <MapPin className="h-3 w-3" aria-hidden />
                  شهر انتخاب‌شده
                </p>
                <p className="mt-1.5 text-xl font-black leading-tight tracking-tight text-white drop-shadow-sm lg:text-2xl">
                  {selectedProvince.name_fa}
                </p>
              </div>

              <p className="text-[11px] text-slate-500">
                حداقل رتبه قبولی استان:{" "}
                <span className="font-bold tabular-nums text-primary">
                  {provinceMaxRank.toLocaleString("fa-IR")}
                </span>
              </p>

              <p className="text-xs font-bold text-slate-500">
                حداقل رتبه قبولی رشته‌های پزشکی
              </p>

              <ul className="space-y-0">
                {rankRows.map((row) => (
                  <li
                    key={row.major}
                    className="flex items-center justify-between gap-2 border-t border-slate-50 py-2.5 first:border-t-0 first:pt-0"
                  >
                    <span className="text-sm font-medium text-primary-deep">{row.major}</span>
                    <span className="shrink-0 tabular-nums text-sm font-bold text-primary">
                      {row.rank.toLocaleString("fa-IR")}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-2 flex items-center gap-1.5 text-[10px] leading-5 text-slate-400">
                <Info className="h-3.5 w-3.5 shrink-0" aria-hidden />
                اعداد بر اساس کارنامه‌های سال قبل می‌باشد
              </p>
            </div>
          </div>
        </div>
      </div>

      <AlbertoCard className="min-h-[440px] min-w-0 lg:h-[520px]" compact />
    </div>
  );
}
