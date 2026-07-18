"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { riddleSuccessLines } from "@/lib/campaign/copy";
import { useCampaignStore } from "@/store/campaign-store";

export default function RiddleSuccessPage() {
  const setStep = useCampaignStore((s) => s.setStep);
  const chances = useCampaignStore((s) => s.campaign.golden_chances);

  return (
    <div className="min-h-screen gradient-hero">
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="space-y-3 text-lg font-medium leading-8 text-primary-deep">
            {riddleSuccessLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">شانس طلایی فعلی: {chances}</p>
          <Link
            href="/student/lottery-intro"
            className="mt-8 inline-block"
            onClick={() => setStep("lottery_intro")}
          >
            <Button variant="gradient" size="lg">
              ادامه
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
