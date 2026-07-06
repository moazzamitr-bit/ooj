"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/providers/app-provider";
import { formatPersianNumber } from "@/lib/utils/persian";

const prizes = [
  { icon: "🏆", title: "لپ‌تاپ", chances: 500 },
  { icon: "📱", title: "گوشی هوشمند", chances: 300 },
  { icon: "🎧", title: "هدفون", chances: 100 },
  { icon: "📚", title: "کتاب کمک‌درسی", chances: 50 },
  { icon: "💰", title: "جایزه نقدی", chances: 20 },
];

export default function StudentRewardPage() {
  const { student } = useApp();

  return (
    <div className="min-h-screen gradient-hero">
      <div className="mx-auto max-w-[700px] px-6 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mx-auto mb-6 text-7xl"
        >
          🎉
        </motion.div>

        <h1 className="text-3xl font-extrabold text-primary-deep">
          تبریک! اولین شانس طلایی‌ات رو گرفتی
        </h1>

        <Card className="mx-auto mt-8 max-w-sm border-violet-100 shadow-lg">
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">شانس‌های فعلی</p>
            <p className="mt-2 text-4xl font-extrabold text-primary">
              {formatPersianNumber(student.total_chances)}
            </p>
          </CardContent>
        </Card>

        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-primary-deep">جوایز</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {prizes.map((prize) => (
              <Card key={prize.title} className="border-violet-100">
                <CardContent className="p-4 text-center">
                  <span className="text-2xl">{prize.icon}</span>
                  <p className="mt-2 text-sm font-medium text-primary-deep">{prize.title}</p>
                  <p className="text-xs text-slate-400">{formatPersianNumber(prize.chances)} شانس</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/student/quiz">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              ۲ تست کنکوری دیگر حل کن
            </Button>
          </Link>
          <Link href="/student/referral">
            <Button variant="gradient" size="lg" className="w-full sm:w-auto">
              دوستاتو دعوت کن
            </Button>
          </Link>
        </div>

        <Link href="/student/profile" className="mt-6 inline-block text-sm text-primary hover:underline">
          رفتن به داشبورد
        </Link>
      </div>
    </div>
  );
}
