"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { referralStatusLabels } from "@/lib/data/mock-data";
import { getAdminStats } from "@/lib/services/student.service";
import { formatPersianNumber } from "@/lib/utils/persian";
import { cn } from "@/lib/utils/cn";

const tabs = [
  { id: "users", label: "کاربران" },
  { id: "students", label: "دانش‌آموزان" },
  { id: "questions", label: "سوالات" },
  { id: "referrals", label: "دعوت‌ها" },
  { id: "rewards", label: "جوایز" },
  { id: "admission", label: "رتبه قبولی" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");
  const stats = getAdminStats();

  return (
    <div className="min-h-screen bg-lavender/20">
      <AppHeader authLabel="خروج" authHref="/login" />

      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <h1 className="mb-2 text-2xl font-extrabold text-primary-deep">پنل مدیریت اوج</h1>
        <p className="mb-8 text-sm text-slate-500">مدیریت کاربران، سوالات، دعوت‌ها و جوایز</p>

        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard title="دانش‌آموزان" value={formatPersianNumber(stats.students)} icon="👨‍🎓" />
          <StatCard title="والدین" value={formatPersianNumber(stats.parents)} icon="👨‍👩‍👧" />
          <StatCard title="سوالات" value={formatPersianNumber(stats.questions)} icon="❓" />
          <StatCard title="دعوت‌ها" value={formatPersianNumber(stats.referrals)} icon="🔗" />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-slate-500 hover:bg-lavender"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "users" && (
          <Card className="border-violet-100">
            <CardHeader><CardTitle className="text-base">کاربران</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-violet-100">
                    <th className="px-4 py-3 text-right">نقش</th>
                    <th className="px-4 py-3 text-right">شماره</th>
                    <th className="px-4 py-3 text-right">شناسه</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.users.map((user) => (
                    <tr key={user.id} className="border-b border-violet-50">
                      <td className="px-4 py-3">
                        <Badge variant={user.role === "admin" ? "warning" : user.role === "parent" ? "success" : "purple"}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 dir-ltr text-left">{user.phone}</td>
                      <td className="px-4 py-3">{user.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {activeTab === "students" && (
          <Card className="border-violet-100">
            <CardHeader><CardTitle className="text-base">دانش‌آموزان</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-violet-100">
                    <th className="px-4 py-3 text-right">شانس</th>
                    <th className="px-4 py-3 text-right">رشته</th>
                    <th className="px-4 py-3 text-right">نام</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.studentsList.map((s) => (
                    <tr key={s.id} className="border-b border-violet-50">
                      <td className="px-4 py-3">{formatPersianNumber(s.total_chances)}</td>
                      <td className="px-4 py-3">{s.field}</td>
                      <td className="px-4 py-3 font-medium">{s.full_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {activeTab === "questions" && (
          <Card className="border-violet-100">
            <CardHeader><CardTitle className="text-base">سوالات ({formatPersianNumber(stats.questions)})</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.questionsList.map((q) => (
                  <div key={q.id} className="rounded-xl border border-violet-50 p-4">
                    <div className="flex gap-2">
                      <Badge>{q.difficulty}</Badge>
                      <Badge variant="purple">{q.tags[0]}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-primary-deep">{q.question_text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "referrals" && (
          <Card className="border-violet-100">
            <CardHeader><CardTitle className="text-base">دعوت‌ها</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-violet-100">
                    <th className="px-4 py-3 text-right">جایزه</th>
                    <th className="px-4 py-3 text-right">وضعیت</th>
                    <th className="px-4 py-3 text-right">شماره</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.referralsList.map((ref) => (
                    <tr key={ref.id} className="border-b border-violet-50">
                      <td className="px-4 py-3">{formatPersianNumber(ref.reward_chances)} شانس</td>
                      <td className="px-4 py-3">
                        <Badge>{referralStatusLabels[ref.status] ?? ref.status}</Badge>
                      </td>
                      <td className="px-4 py-3 dir-ltr text-left">{ref.referred_phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {activeTab === "rewards" && (
          <Card className="border-violet-100">
            <CardHeader><CardTitle className="text-base">جوایز</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.studentsList.map((s) => (
                  <div key={s.id} className="rounded-xl border border-violet-50 p-4">
                    <Badge variant="purple">chance</Badge>
                    <p className="mt-2 text-sm">
                      مجموع شانس‌ها: {formatPersianNumber(s.total_chances)} — {s.full_name}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "admission" && (
          <Card className="border-violet-100">
            <CardHeader><CardTitle className="text-base">داده‌های رتبه قبولی</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-violet-100">
                    <th className="px-4 py-3 text-right">رتبه</th>
                    <th className="px-4 py-3 text-right">رشته</th>
                    <th className="px-4 py-3 text-right">نوع</th>
                    <th className="px-4 py-3 text-right">شهر</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.admissionList.slice(0, 12).map((item) => (
                    <tr key={item.id} className="border-b border-violet-50">
                      <td className="px-4 py-3">{formatPersianNumber(item.min_rank)}</td>
                      <td className="px-4 py-3">{item.major}</td>
                      <td className="px-4 py-3"><Badge>{item.university_type}</Badge></td>
                      <td className="px-4 py-3">{item.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
