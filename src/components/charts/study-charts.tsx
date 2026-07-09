"use client";

import { SketchBarChart } from "@/components/charts/sketch-bar-chart";
import { weeklyChartFootnote } from "@/lib/data/profile-mock-data";
import { useApp } from "@/providers/app-provider";

interface ChartPanelProps {
  title: string;
  children: React.ReactNode;
}

function ChartPanel({ title, children }: ChartPanelProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-[#FAFCFF] p-3 shadow-sm">
      <h3 className="mb-2 text-center text-xs font-bold text-slate-800">{title}</h3>
      <div className="flex-1">{children}</div>
    </article>
  );
}

export function StudyCharts() {
  const { chartData } = useApp();
  const { subjects, monthly, weekly, daily } = chartData;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ChartPanel title="دروس - ساعت">
          <SketchBarChart data={subjects} yMax={350} yStep={50} />
        </ChartPanel>

        <ChartPanel title="ماهانه - ساعت">
          <SketchBarChart data={monthly} yMax={50} yStep={5} compactLabels />
        </ChartPanel>

        <ChartPanel title="هفتگی - ساعت">
          <SketchBarChart data={weekly} yMax={50} yStep={5} compactLabels />
        </ChartPanel>

        <ChartPanel title="روزانه - ساعت">
          <SketchBarChart data={daily} yMax={12} yStep={1} />
        </ChartPanel>
      </div>

      <p className="text-[10px] leading-5 text-slate-500 xl:text-right">{weeklyChartFootnote}</p>
    </div>
  );
}
