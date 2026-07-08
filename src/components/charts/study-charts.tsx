"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, Clock, Rocket, Star } from "lucide-react";
import { useApp } from "@/providers/app-provider";

interface ChartCardProps {
  title: string;
  insight: string;
  icon: "clock" | "calendar";
  showRocket?: boolean;
  children: React.ReactNode;
}

function ChartCard({ title, insight, icon, showRocket, children }: ChartCardProps) {
  const HeaderIcon = icon === "clock" ? Clock : Calendar;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_rgb(17_26_76_0.04)]">
      <div className="flex items-start justify-between px-5 pt-5">
        <h3 className="flex-1 text-sm font-extrabold leading-6 text-primary-deep">{title}</h3>
        <HeaderIcon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} aria-hidden />
      </div>

      <div className="flex items-center justify-center gap-4 px-5 pt-3 text-[10px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 bg-primary" />
          زمان مطالعه (ساعت)
        </span>
      </div>

      <div className="flex-1 px-2 pt-1">{children}</div>

      <div className="mx-4 mb-4 flex items-start gap-2 rounded-xl bg-slate-50 px-3.5 py-3">
        {showRocket && <Rocket className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />}
        <p className="flex-1 text-[11px] leading-5 text-slate-600">{insight}</p>
        <Star className="mt-0.5 h-4 w-4 shrink-0 fill-warning/20 text-warning" aria-hidden />
      </div>
    </article>
  );
}

const chartColors = { study: "#6D4DFF" };
const tooltipStyle = { borderRadius: 12, border: "1px solid #f1f5f9", fontSize: 12 };

interface StudyBarChartProps {
  data: Array<Record<string, string | number>>;
  xKey: string;
}

function StudyBarChart({ data, xKey }: StudyBarChartProps) {
  const dataWithHours = data.map((d) => {
    const studyMinutes = typeof d.studyMinutes === "number" ? d.studyMinutes : 0;
    return { ...d, studyHours: studyMinutes / 60 };
  });

  const maxHours = Math.max(...dataWithHours.map((d) => (typeof d.studyHours === "number" ? d.studyHours : 0)), 1);
  const niceMax = Math.ceil(maxHours);
  const step = niceMax <= 6 ? 1 : niceMax <= 12 ? 2 : 5;
  const ticks = Array.from({ length: Math.floor(niceMax / step) + 1 }, (_, i) => i * step);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={dataWithHours} margin={{ top: 4, right: 8, left: -16, bottom: 0 }} barGap={2} barCategoryGap="18%">
        <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, niceMax]} ticks={ticks} tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(109, 77, 255, 0.06)" }} />
        <Bar
          dataKey="studyHours"
          name="زمان مطالعه (ساعت)"
          fill={chartColors.study}
          radius={0}
          maxBarSize={16}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function StudyCharts() {
  const { chartData } = useApp();
  const { daily, weekly, monthly, radar } = chartData;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <ChartCard
        title="نمودار روزانه (مجموع ساعت مطالعه)"
        insight="هر روز که پیش می‌ری، تاثیرش تو نمودار هم دیده میشه."
        icon="clock"
      >
        <StudyBarChart data={daily} xKey="day" />
      </ChartCard>

      <ChartCard
        title="نمودار هفتگی"
        insight="روند هفته‌ به‌ هفته رو ادامه بده."
        icon="calendar"
        showRocket={false}
      >
        <StudyBarChart data={weekly} xKey="week" />
      </ChartCard>

      <ChartCard
        title="نمودار ماهانه"
        insight="پیشرفت عالیه—ماه بعد هم همین مسیر رو برو."
        icon="calendar"
        showRocket
      >
        <StudyBarChart data={monthly} xKey="month" />
      </ChartCard>

      <ChartCard
        title="نمودار دروس"
        insight="تعادل بین درس‌ها رو حفظ کن تا نتیجه‌ها شگفت‌انگیز بشه."
        icon="clock"
      >
        <StudyBarChart data={radar} xKey="subject" />
      </ChartCard>
    </div>
  );
}
