"use client";

import { CheckSquare, Send, Star, UserPlus } from "lucide-react";
import { formatPersianNumber } from "@/lib/utils/persian";

interface ReferralStatsRowProps {
  sent: number;
  registered: number;
  quizCompleted: number;
  totalChances: number;
}

const statItems = [
  { key: "sent", label: "دعوت‌های ارسال‌شده", icon: Send, tone: "text-primary bg-primary/10" },
  { key: "registered", label: "ثبت‌نام‌شده‌ها", icon: UserPlus, tone: "text-electric-blue bg-electric-blue/10" },
  { key: "quizCompleted", label: "تست اول کامل‌شده", icon: CheckSquare, tone: "text-success bg-success/10" },
  { key: "totalChances", label: "مجموع شانس‌های طلایی", icon: Star, tone: "text-warning bg-warning/15" },
] as const;

export function ReferralStatsRow({
  sent,
  registered,
  quizCompleted,
  totalChances,
}: ReferralStatsRowProps) {
  const values = { sent, registered, quizCompleted, totalChances };

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {statItems.map(({ key, label, icon: Icon, tone }) => (
        <article
          key={key}
          className="rounded-[1.25rem] border border-slate-100 bg-white p-5 shadow-[0_4px_20px_rgb(17_26_76_0.04)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-slate-500 md:text-sm">{label}</p>
              <p className="mt-2 text-2xl font-extrabold text-primary-deep md:text-3xl">
                {formatPersianNumber(values[key])}
              </p>
            </div>
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone}`}>
              <Icon className="h-5 w-5" aria-hidden />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
