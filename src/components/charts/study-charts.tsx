"use client";

import { SketchBarChart } from "@/components/charts/sketch-bar-chart";
import { useApp } from "@/providers/app-provider";

interface ChartPanelProps {
  title: string;
  children: React.ReactNode;
  unit: string;
}

function ChartPanel({ title, unit, children }: ChartPanelProps) {
  return (
    <article className="flex h-full min-h-[300px] flex-col overflow-hidden rounded-[20px] border border-slate-200/80 bg-gradient-to-b from-[#F4F6FC] to-[#E9EDF8] p-2 shadow-[0_10px_26px_rgba(30,41,59,0.09)]">
      <header className="mb-1 flex h-8 shrink-0 items-center justify-between gap-2 px-2">
        <span className="rounded-full border border-white/90 bg-white/75 px-2 py-1 text-[10px] font-bold text-slate-500 shadow-sm">
          {unit}
        </span>
        <h3 className="text-right text-[13px] font-extrabold leading-5 tracking-tight text-slate-800">
          {title}
        </h3>
      </header>
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/80 bg-white/30">
        <div className="absolute inset-0">{children}</div>
      </div>
    </article>
  );
}

export function StudyCharts() {
  const { chartData } = useApp();
  const { subjects, monthly, weekly, daily } = chartData;

  return (
    <div>
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4" dir="rtl">
        <ChartPanel title="مقایسه روزهای هفته" unit="دقیقه">
          <div className="h-full w-full" dir="ltr">
            <SketchBarChart
              data={daily}
              yMax={180}
              yStep={20}
              labelMode="angled"
              valueUnit="دقیقه"
              palette="green"
              persianYAxis
            />
          </div>
        </ChartPanel>

        <ChartPanel title="مقایسه هفته‌ها" unit="ساعت">
          <div className="h-full w-full" dir="ltr">
            <SketchBarChart
              data={weekly}
              yMax={9}
              yStep={1}
              labelMode="angled"
              palette="orange"
              persianYAxis
            />
          </div>
        </ChartPanel>

        <ChartPanel title="مقایسه ماه‌ها" unit="ساعت">
          <div className="h-full w-full" dir="ltr">
            <SketchBarChart
              data={monthly}
              yMax={50}
              yStep={5}
              labelMode="angled"
              palette="black"
              persianYAxis
            />
          </div>
        </ChartPanel>

        <ChartPanel title="پیشرفت تست دروس" unit="ساعت">
          <div className="h-full w-full" dir="ltr">
            <SketchBarChart
              data={subjects}
              yMax={100}
              yStep={10}
              labelMode="grade"
              valueUnit="ساعت"
              palette="blue"
              persianYAxis
            />
          </div>
        </ChartPanel>
      </div>
    </div>
  );
}
