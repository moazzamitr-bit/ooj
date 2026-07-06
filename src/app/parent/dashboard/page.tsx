"use client";

import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { ParentReportCard } from "@/components/parent/parent-report-card";
import { StudyCharts } from "@/components/charts/study-charts";
import { AlbertoCard } from "@/components/dashboard/alberto-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/providers/app-provider";
import { getChildReport } from "@/lib/services/parent.service";
import { formatStudyTime } from "@/lib/utils/persian";

export default function ParentDashboardPage() {
  const { student } = useApp();
  const report = getChildReport(student.id);

  return (
    <div className="min-h-screen bg-white">
      <AppHeader authLabel="خروج" authHref="/login" />

      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lavender text-3xl">
            👨‍🎓
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-primary-deep">{student.full_name}</h1>
            <p className="text-sm text-slate-500">
              {student.grade} — {student.field} — هدف: {student.target_major}
            </p>
          </div>
        </div>

        <section className="mb-8">
          <ParentReportCard report={report} />
        </section>

        <section className="mb-8">
          <StudyCharts />
        </section>

        <section className="mb-8 grid gap-6 md:grid-cols-2">
          <Card className="border-violet-100">
            <CardHeader>
              <CardTitle className="text-base">💪 درس قوی</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="success">{report.strongSubject}</Badge>
              <p className="mt-3 text-sm text-slate-500">
                عملکرد عالی در تست‌های این درس — دقت بالای ۸۰٪
              </p>
            </CardContent>
          </Card>

          <Card className="border-violet-100">
            <CardHeader>
              <CardTitle className="text-base">⚠️ نیاز به توجه</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="warning">{report.needsAttention}</Badge>
              <p className="mt-3 text-sm text-slate-500">
                پیشنهاد: ۳۰ دقیقه مطالعه بیشتر در این فصل
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <Card className="border-violet-100 bg-lavender/30">
            <CardHeader>
              <CardTitle className="text-base">🧠 خلاصه آلبرتو</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-primary-deep">{report.albertoSummary}</p>
              <p className="mt-3 text-xs text-slate-400">
                زمان مطالعه امروز: {formatStudyTime(report.studyTimeMinutes)}
              </p>
            </CardContent>
          </Card>
        </section>

        <AlbertoCard />
      </main>

      <AppFooter />
    </div>
  );
}
