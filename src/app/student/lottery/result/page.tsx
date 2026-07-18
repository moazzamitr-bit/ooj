"use client";

import Link from "next/link";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { lotteryLoser, lotteryWinner } from "@/lib/campaign/copy";
import { useCampaignStore } from "@/store/campaign-store";

function ResultContent() {
  const searchParams = useSearchParams();
  const setLotteryResult = useCampaignStore((s) => s.setLotteryResult);
  const startDay2 = useCampaignStore((s) => s.startDay2);
  const campaign = useCampaignStore((s) => s.campaign);

  const wonParam = searchParams.get("result");
  const won = wonParam === "win" || (wonParam !== "lose" && campaign.lottery_won === true);

  useEffect(() => {
    setLotteryResult(won);
  }, [won, setLotteryResult]);

  const name = campaign.first_name || "قهرمان";
  const content = won ? lotteryWinner(name, "۱۰٬۰۰۰٬۰۰۰") : lotteryLoser;

  return (
    <div className="min-h-screen gradient-hero">
      <div className="mx-auto max-w-lg px-6 py-14 text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-extrabold text-primary-deep">{content.title}</h1>
          <Card className="mt-6 border-violet-100 text-right">
            <CardContent className="space-y-3 p-6 text-sm leading-7 text-slate-600">
              {content.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </CardContent>
          </Card>

          <div className="mt-8 flex flex-col gap-3">
            <Link href="/student/day2" onClick={() => startDay2()}>
              <Button variant="gradient" size="lg" className="w-full">
                برو به ترفند مخفی روز دوم
              </Button>
            </Link>
            <div className="flex gap-2">
              <Link href="/student/lottery/result/?result=lose" className="flex-1">
                <Button variant="outline" className="w-full">
                  حالت بازنده
                </Button>
              </Link>
              <Link href="/student/lottery/result/?result=win" className="flex-1">
                <Button variant="outline" className="w-full">
                  حالت برنده
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function LotteryResultPage() {
  return (
    <Suspense
      fallback={<div className="flex min-h-screen items-center justify-center text-slate-400">...</div>}
    >
      <ResultContent />
    </Suspense>
  );
}
