"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Share2 } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { day2Alberto } from "@/lib/campaign/copy";
import { childInviteUrl } from "@/lib/campaign/routing";
import { useCampaignStore } from "@/store/campaign-store";
import { useApp } from "@/providers/app-provider";
import { formatPersianNumber } from "@/lib/utils/persian";

export default function Day2Page() {
  const { student } = useApp();
  const startDay2 = useCampaignStore((s) => s.startDay2);
  const setStep = useCampaignStore((s) => s.setStep);
  const campaign = useCampaignStore((s) => s.campaign);
  const recordOpen = useCampaignStore((s) => s.recordLinkOpenForMe);
  const inviteCode = useCampaignStore((s) => s.inviteCode);
  const [copied, setCopied] = useState(false);

  const code = inviteCode || campaign.invite_code || student.referral_code;
  const shareUrl = useMemo(() => childInviteUrl(code), [code]);

  useEffect(() => {
    startDay2();
  }, [startDay2]);

  async function copy() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareSms() {
    window.location.href = `sms:?&body=${encodeURIComponent(
      `سلام! ۷ روز رایگان آلبرتو رو امتحان کن:\n${shareUrl}`
    )}`;
  }

  return (
    <div className="min-h-screen gradient-hero">
      <AppHeader authLabel="خانه" authHref="/student" />
      <div className="mx-auto max-w-lg px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h1 className="text-center text-2xl font-extrabold text-primary-deep">{day2Alberto.greeting}</h1>
          <p className="whitespace-pre-line text-sm leading-7 text-slate-600">{day2Alberto.tip}</p>
          <p className="text-sm leading-7 text-slate-600">{day2Alberto.budget}</p>
          <p className="text-sm font-medium leading-7 text-primary-deep">{day2Alberto.deadline}</p>
          <p className="whitespace-pre-line text-sm leading-7 text-slate-600">{day2Alberto.reward}</p>

          <Card className="border-violet-100">
            <CardContent className="space-y-2 p-4 text-sm font-medium text-primary-deep">
              {day2Alberto.examples.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </CardContent>
          </Card>

          <p className="text-sm leading-7 text-slate-600">{day2Alberto.saveNote}</p>
          <p className="text-center text-base font-bold text-primary">{day2Alberto.dream}</p>

          <Card className="border-primary/20 bg-white/80">
            <CardContent className="p-4 text-center">
              <p className="text-xs text-slate-500">لینک اختصاصی تو</p>
              <p className="mt-2 break-all text-sm font-medium text-primary-deep" dir="ltr">
                {shareUrl}
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button type="button" variant="gradient" className="flex-1 gap-2" onClick={copy}>
                  <Copy className="h-4 w-4" />
                  {copied ? "کپی شد" : "کپی لینک"}
                </Button>
                <Button type="button" variant="outline" className="flex-1 gap-2" onClick={shareSms}>
                  <Share2 className="h-4 w-4" />
                  ارسال برای دوستان
                </Button>
              </div>
              <p className="mt-3 text-[11px] text-slate-400">
                فقط لینک‌هایی که تا ساعت ۱۰ فردا شب باز بشن، امتیاز می‌گیرن.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-100 bg-amber-50/50">
            <CardContent className="space-y-2 p-4 text-center">
              <p className="text-sm text-slate-500">صندوقچه شانس</p>
              <p className="text-3xl font-extrabold text-primary">
                {formatPersianNumber(campaign.chance_chest)}
              </p>
              <p className="text-xs text-slate-500">
                باز شدن لینک: {formatPersianNumber(campaign.link_opens)} نفر
              </p>
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => recordOpen()}>
                شبیه‌سازی: یک دوست لینک را باز کرد (+۵)
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-2 rounded-2xl border border-slate-100 bg-white/70 p-4 text-sm leading-7 text-slate-600">
            {day2Alberto.chestRules.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="space-y-2 rounded-2xl border border-violet-100 bg-violet-50/60 p-4 text-sm leading-7 text-primary-deep">
            {day2Alberto.treasureTeaser.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Link href="/student/referral" onClick={() => setStep("referral")}>
              <Button variant="gradient" size="lg" className="w-full">
                مدیریت دعوت‌ها
              </Button>
            </Link>
            <Link href="/student">
              <Button variant="outline" size="lg" className="w-full">
                بازگشت به خانه
              </Button>
            </Link>
            <Link href="/parent/day2" className="text-center text-sm text-primary underline">
              پیش‌نمایش پیام مادر (شب دوم)
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
