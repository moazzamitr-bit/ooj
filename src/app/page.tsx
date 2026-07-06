"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ParentReportCard } from "@/components/parent/parent-report-card";
import { parentDailyReport } from "@/lib/data/mock-data";

const features = [
  {
    icon: "📊",
    title: "گزارش روزانه",
    description: "هر روز دقیقاً بدانید فرزندتان چقدر درس خوانده و چند تست زده است.",
  },
  {
    icon: "🧠",
    title: "تحلیل هوشمند",
    description: "آلبرتو، مشاور هوشمند اوج، نقاط قوت و ضعف فرزندتان را تحلیل می‌کند.",
  },
  {
    icon: "💚",
    title: "آرامش خاطر والدین",
    description: "بدون نگرانی، پیشرفت واقعی فرزندتان را از راه دور دنبال کنید.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader authLabel="ورود" authHref="/login" />

      <section className="gradient-hero">
        <div className="mx-auto max-w-[1200px] px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              پلتفرم هوشمند کنکور
            </span>
            <h1 className="text-3xl font-extrabold leading-tight text-primary-deep md:text-5xl">
              آیا می‌دانید فرزند کنکوری شما
              <br />
              <span className="text-primary">هر روز چقدر درس می‌خواند؟</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              اوج با کمک مشاور هوشمند آلبرتو، فعالیت درسی فرزند شما را تحلیل می‌کند
              و گزارش مطالعه، تست‌زنی و پیشرفت او را به شما نشان می‌دهد.
            </p>
            <Link href="/parent/register" className="mt-8 inline-block">
              <Button variant="gradient" size="lg">
                شروع ۷ روز رایگان
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              <Card className="h-full border-violet-100 transition-shadow hover:shadow-md">
                <CardContent className="p-6 text-center">
                  <span className="text-4xl">{feature.icon}</span>
                  <h3 className="mt-4 text-lg font-bold text-primary-deep">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[800px] px-6 pb-20">
        <h2 className="mb-6 text-center text-xl font-bold text-primary-deep">
          نمونه گزارش روزانه
        </h2>
        <ParentReportCard report={parentDailyReport} />
      </section>

      <AppFooter />
    </div>
  );
}
