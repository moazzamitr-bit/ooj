"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { albertoIntroLines } from "@/lib/campaign/copy";
import { useCampaignStore } from "@/store/campaign-store";
import albertoPortrait from "@/assets/images/alberto-portrait.png";

export default function StudentOnboardingPage() {
  const setStep = useCampaignStore((s) => s.setStep);

  return (
    <div className="min-h-screen gradient-hero">
      <div className="mx-auto max-w-[720px] px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="relative mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full bg-[#F3F0FF] shadow-xl ring-4 ring-primary/10">
            <Image
              src={albertoPortrait}
              alt="آلبرتو"
              fill
              className="object-cover object-[center_20%]"
              priority
            />
          </div>

          <div className="space-y-2 text-base leading-8 text-primary-deep md:text-lg">
            {albertoIntroLines.map((line) => (
              <p key={line} className="font-medium">
                {line}
              </p>
            ))}
          </div>

          <div className="my-8 border-t border-dashed border-primary/20" />

          <p className="text-lg font-bold text-primary">🎯 آماده‌ای؟</p>
          <p className="mt-2 text-slate-600">اول با یه معمای خیلی ساده شروع کنیم...</p>

          <Link
            href="/student/riddle"
            className="mt-8 inline-block"
            onClick={() => setStep("riddle")}
          >
            <Button variant="gradient" size="lg">
              شروع معما
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
