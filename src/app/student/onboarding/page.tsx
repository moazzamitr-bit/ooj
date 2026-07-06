"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  { icon: "⚡", title: "سریع‌تر درس بخوان", description: "با برنامه هوشمند آلبرتو، زمان مطالعه‌ات بهینه می‌شود." },
  { icon: "🎯", title: "بهتر یاد بگیر", description: "تست‌های هدفمند بر اساس سطح تو." },
  { icon: "🧠", title: "کمتر فراموش کن", description: "مرور هوشمند و فلش‌کارت‌های شخصی‌سازی‌شده." },
];

export default function StudentOnboardingPage() {
  return (
    <div className="min-h-screen gradient-hero">
      <div className="mx-auto max-w-[800px] px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-xl ring-4 ring-primary/10">
            <span className="text-6xl">🧑‍🔬</span>
          </div>

          <h1 className="text-3xl font-extrabold text-primary-deep md:text-4xl">
            سلام! به اوج خوش اومدی
          </h1>
          <p className="mt-4 text-lg text-primary">
            من آلبرتو هستم، همراه هوشمند کنکور تو.
          </p>
          <p className="mt-2 text-slate-600">
            کمکت می‌کنم سریع‌تر درس بخونی، بهتر یاد بگیری و کمتر فراموش کنی.
          </p>

          <Link href="/student/quiz" className="mt-8 inline-block">
            <Button variant="gradient" size="lg">
              شروع تست ۲ دقیقه‌ای
            </Button>
          </Link>
        </motion.div>

        <Card className="mx-auto mt-12 max-w-md border-violet-100 glass-card">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">🧑‍🔬</span>
              <div className="text-right">
                <p className="font-bold text-primary-deep">آلبرتو</p>
                <p className="text-xs text-slate-400">مشاور هوشمند کنکور</p>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-lavender/50 p-4 text-sm text-primary-deep">
              «سلام! آماده‌ای ببینیم الان تو کدوم سطحی؟ فقط ۲ دقیقه وقت می‌بره! 🚀»
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Card className="h-full border-violet-100 text-center">
                <CardContent className="p-5">
                  <span className="text-3xl">{b.icon}</span>
                  <h3 className="mt-3 font-bold text-primary-deep">{b.title}</h3>
                  <p className="mt-2 text-xs text-slate-500">{b.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
