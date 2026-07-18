"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { chanceRules } from "@/lib/campaign/copy";
import { useCampaignStore } from "@/store/campaign-store";
import { formatPersianNumber } from "@/lib/utils/persian";

export default function StudentRewardPage() {
  const chances = useCampaignStore((s) => s.campaign.golden_chances);
  const setStep = useCampaignStore((s) => s.setStep);

  return (
    <div className="min-h-screen gradient-hero">
      <div className="mx-auto max-w-[700px] px-6 py-16 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <div className="mx-auto mb-6 text-6xl">🎉</div>
          <h1 className="text-2xl font-extrabold text-primary-deep md:text-3xl">
            تبریک! با ۲ شانس طلایی وارد قرعه‌کشی شدی
          </h1>

          <Card className="mx-auto mt-8 max-w-sm border-violet-100 shadow-lg">
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">شانس‌های طلایی</p>
              <p className="mt-2 text-4xl font-extrabold text-primary">
                {formatPersianNumber(Math.max(2, chances))}
              </p>
            </CardContent>
          </Card>

          <Card className="mx-auto mt-6 max-w-md border-violet-100 text-right">
            <CardContent className="space-y-3 p-6 text-sm leading-7 text-slate-600">
              <p className="font-bold text-primary-deep">{chanceRules.title}</p>
              <p className="whitespace-pre-line">{chanceRules.body}</p>
              <p className="whitespace-pre-line">{chanceRules.tip}</p>
            </CardContent>
          </Card>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/student/lottery/result/?result=lose" onClick={() => setStep("lottery_result")}>
              <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                نتیجه قرعه‌کشی (شبیه‌سازی)
              </Button>
            </Link>
            <Link href="/student/day2" onClick={() => setStep("day2_intro")}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                روز دوم — دعوت دوستان
              </Button>
            </Link>
          </div>
          <Link href="/student" onClick={() => setStep("home")} className="mt-4 inline-block text-sm text-primary underline">
            رفتن به صفحه اصلی
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
