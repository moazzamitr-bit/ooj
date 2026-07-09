"use client";

import { SketchBarChart } from "@/components/charts/sketch-bar-chart";
import { useApp } from "@/providers/app-provider";

interface ChartPanelProps {
  title: string;
  children: React.ReactNode;
}

function ChartPanel({ title, children }: ChartPanelProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <h3 className="mb-3 text-center text-sm font-extrabold tracking-tight text-slate-800">
        {title}
      </h3>
      <div className="flex-1">{children}</div>
    </article>
  );
}

export function StudyCharts() {
  const { chartData } = useApp();
  const { subjects, monthly, weekly, daily } = chartData;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4" dir="rtl">
        <ChartPanel title="روزانه - ساعت">
          <SketchBarChart data={daily} yMax={12} yStep={1} labelMode="angled" />
        </ChartPanel>

        <ChartPanel title="هفتگی - ساعت">
          <SketchBarChart data={weekly} yMax={50} yStep={5} labelMode="compact" />
        </ChartPanel>

        <ChartPanel title="ماهانه - ساعت">
          <SketchBarChart data={monthly} yMax={50} yStep={5} labelMode="monthly" />
        </ChartPanel>

        <ChartPanel title="دروس - ساعت">
          <SketchBarChart data={subjects} yMax={350} yStep={50} />
        </ChartPanel>
      </div>
    </div>
  );
}
