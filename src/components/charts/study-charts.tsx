"use client";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { SketchBarChart } from "@/components/charts/sketch-bar-chart";
import { useApp } from "@/providers/app-provider";

interface ChartPanelProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

function ChartPanel({ title, children, footer }: ChartPanelProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-[#EEF1FA] p-[5px] shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
      <h3 className="mb-1 text-center text-sm font-extrabold tracking-tight text-slate-800">
        {title}
      </h3>
      <div className="flex min-h-0 flex-1 flex-col justify-end rounded-[14px] bg-[#EEF1FA]">
        {children}
      </div>
      {footer}
    </article>
  );
}

function WeeklyScrollHint() {
  return (
    <div
      className="mt-1 flex items-center justify-center gap-3 px-2 pb-1 text-[11px] font-bold text-slate-500"
      aria-label="برای دیدن بقیه هفته‌ها نمودار را به چپ و راست بکشید"
    >
      <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 shadow-sm">
        <ChevronsLeft className="h-3.5 w-3.5 text-primary" aria-hidden />
        <span>کوچک</span>
      </span>
      <span className="text-[10px] font-semibold text-slate-400">چپ و راست بکشید</span>
      <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 shadow-sm">
        <span>بزرگ</span>
        <ChevronsRight className="h-3.5 w-3.5 text-primary" aria-hidden />
      </span>
    </div>
  );
}

export function StudyCharts() {
  const { chartData } = useApp();
  const { subjects, monthly, weekly, daily } = chartData;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4" dir="rtl">
        <ChartPanel title="مقایسه روزهای هفته – دقیقه">
          <div dir="ltr">
            <SketchBarChart
              data={daily}
              yMax={180}
              yStep={20}
              labelMode="angled"
              valueUnit="دقیقه"
              persianYAxis
            />
          </div>
        </ChartPanel>

        <ChartPanel title="مقایسه هفته‌ها – ساعت" footer={<WeeklyScrollHint />}>
          <div dir="ltr" className="min-w-0">
            <SketchBarChart
              data={weekly}
              yMax={9}
              yStep={1}
              labelMode="compact"
              visibleBars={9}
            />
          </div>
        </ChartPanel>

        <ChartPanel title="مقایسه ماه‌ها – ساعت">
          <SketchBarChart data={monthly} yMax={50} yStep={5} labelMode="monthly" />
        </ChartPanel>

        <ChartPanel title="دروس – ساعت">
          <div dir="ltr">
            <SketchBarChart
              data={subjects}
              yMax={100}
              yStep={10}
              labelMode="grade"
              valueUnit="درصد"
              persianYAxis
            />
          </div>
        </ChartPanel>
      </div>
    </div>
  );
}
