"use client";

import { useState } from "react";
import { MapPin, Map } from "lucide-react";
import { SegmentedControl } from "@/components/ui/segmented-control";
import type { UniversityType } from "@/types";

export function IranMapCard() {
  const [universityType, setUniversityType] = useState<UniversityType>("دولتی");

  return (
    <div className="glass-premium flex h-full flex-col overflow-hidden">
      <div className="border-b border-slate-50 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Map className="h-4 w-4 text-primary" aria-hidden />
            <h3 className="text-sm font-extrabold text-primary-deep">نقشه ایران</h3>
          </div>
          <SegmentedControl
            options={[
              { value: "دولتی" as UniversityType, label: "دولتی" },
              { value: "آزاد" as UniversityType, label: "آزاد" },
            ]}
            value={universityType}
            onChange={setUniversityType}
            className="scale-90"
          />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-lavender-soft/80 to-white p-6">
        <svg viewBox="0 0 280 420" className="h-[200px] w-full max-w-[190px]" aria-hidden>
          <defs>
            <linearGradient id="map-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E8ECFF" />
              <stop offset="100%" stopColor="#F5F2FF" />
            </linearGradient>
            <linearGradient id="province-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6D4DFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#2F80FF" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path
            d="M140 30 L200 70 L220 130 L210 210 L180 290 L140 370 L100 290 L70 210 L60 130 L80 70 Z"
            fill="url(#map-fill)"
            stroke="#C7D2FE"
            strokeWidth="1.5"
          />
          <path
            d="M120 120 L160 100 L175 150 L155 200 L125 210 L105 170 Z"
            fill="url(#province-fill)"
            stroke="#6D4DFF"
            strokeWidth="2"
            className="cursor-pointer"
          />
          <circle cx="140" cy="155" r="7" fill="#6D4DFF" className="drop-shadow-sm">
            <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>

        <div className="mt-3 flex items-center gap-2 rounded-full border border-violet-100 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
          <MapPin className="h-4 w-4 text-primary" aria-hidden />
          <span className="text-sm font-bold text-primary-deep">همدان / همدان</span>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-4 text-[10px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary/35" /> رتبه پایین‌تر
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" /> رتبه بالاتر
          </span>
        </div>
        <p className="mt-2 text-[10px] text-slate-400">نوع دانشگاه: {universityType}</p>
      </div>
    </div>
  );
}

export function AdmissionRankPanel() {
  const [universityType, setUniversityType] = useState<UniversityType>("دولتی");

  const rankData =
    universityType === "دولتی"
      ? [
          { major: "پزشکی", rank: 3850 },
          { major: "دندانپزشکی", rank: 4100 },
          { major: "داروسازی", rank: 5600 },
          { major: "فیزیوتراپی", rank: 9200 },
          { major: "پرستاری", rank: 14500 },
        ]
      : [
          { major: "پزشکی", rank: 8500 },
          { major: "دندانپزشکی", rank: 11000 },
          { major: "داروسازی", rank: 14000 },
          { major: "پرستاری", rank: 24000 },
        ];

  return (
    <div className="glass-premium flex h-full flex-col overflow-hidden">
      <div className="border-b border-slate-50 px-5 py-4">
        <h3 className="text-sm font-extrabold text-primary-deep">
          نقشه قبولی رشته‌ها در استان‌ها
        </h3>
        <p className="mt-1 text-[11px] leading-5 text-slate-400">
          با کلیک روی هر شهر، حداقل رتبه‌های قبولی رشته‌ها را ببین.
        </p>
        <div className="mt-3">
          <SegmentedControl
            options={[
              { value: "دولتی" as UniversityType, label: "دولتی" },
              { value: "آزاد" as UniversityType, label: "آزاد" },
            ]}
            value={universityType}
            onChange={setUniversityType}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-lavender-soft/80">
              <th className="px-5 py-3 text-right text-xs font-bold text-slate-500">حداقل رتبه</th>
              <th className="px-5 py-3 text-right text-xs font-bold text-slate-500">رشته</th>
            </tr>
          </thead>
          <tbody>
            {rankData.map((row) => (
              <tr
                key={row.major}
                className="border-t border-slate-50 transition hover:bg-lavender-soft/50"
              >
                <td className="tabular-nums px-5 py-3.5 text-sm font-bold text-primary">
                  {row.rank.toLocaleString("fa-IR")}
                </td>
                <td className="px-5 py-3.5 font-medium text-primary-deep">{row.major}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdmissionHeatmap() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <IranMapCard />
      <AdmissionRankPanel />
    </div>
  );
}
