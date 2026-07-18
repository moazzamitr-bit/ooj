"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { lotteryIntro } from "@/lib/campaign/copy";
import { useCampaignStore } from "@/store/campaign-store";

export default function LotteryIntroPage() {
  const setStep = useCampaignStore((s) => s.setStep);

  return (
    <div className="min-h-screen gradient-hero">
      <div className="mx-auto max-w-lg px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-center text-2xl font-extrabold text-primary-deep">{lotteryIntro.headline}</h1>
          <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600 md:text-base">
            {lotteryIntro.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <Card className="mt-8 border-violet-100">
            <CardContent className="p-5">
              <p className="mb-3 font-bold text-primary-deep">{lotteryIntro.winnersTitle}</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {lotteryIntro.prizes.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="font-bold text-primary">{lotteryIntro.cta}</p>
            <p className="mt-2 text-sm text-slate-500">{lotteryIntro.ctaSub}</p>
            <Link
              href="/student/field"
              className="mt-6 inline-block"
              onClick={() => setStep("field_select")}
            >
              <Button variant="gradient" size="lg">
                انتخاب رشته و شروع ۲ تست
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
