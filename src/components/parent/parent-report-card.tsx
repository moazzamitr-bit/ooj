import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPercent, formatStudyTime, toPersianDigits } from "@/lib/utils/persian";
import type { ParentDailyReport } from "@/types";

interface ParentReportCardProps {
  report: ParentDailyReport;
}

export function ParentReportCard({ report }: ParentReportCardProps) {
  const stats = [
    { label: "زمان مطالعه امروز", value: formatStudyTime(report.studyTimeMinutes), icon: "⏱️" },
    { label: "تست‌های پاسخ داده شده", value: `${toPersianDigits(report.testsAnswered)} تست`, icon: "📝" },
    { label: "دقت امروز", value: formatPercent(report.accuracy), icon: "🎯" },
    { label: "پیشرفت هفتگی", value: formatPercent(report.weeklyProgress), icon: "📈" },
  ];

  return (
    <Card className="border-violet-100 bg-gradient-to-br from-white to-lavender/30">
      <CardHeader>
        <CardTitle>گزارش روزانه فرزند شما</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white p-4 shadow-sm">
              <span className="text-2xl">{stat.icon}</span>
              <p className="mt-2 text-xs text-slate-500">{stat.label}</p>
              <p className="mt-1 text-lg font-bold text-primary-deep">{stat.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
