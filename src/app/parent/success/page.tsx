"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle, Copy, Share2 } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motherSuccess } from "@/lib/campaign/copy";
import { childInviteUrl } from "@/lib/campaign/routing";
import { useCampaignStore } from "@/store/campaign-store";

export default function ParentSuccessPage() {
  const inviteCode = useCampaignStore((s) => s.inviteCode);
  const [copied, setCopied] = useState(false);

  const link = useMemo(
    () => (inviteCode ? childInviteUrl(inviteCode) : ""),
    [inviteCode]
  );

  async function copyLink() {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareSms() {
    if (!link) return;
    window.location.href = `sms:?&body=${encodeURIComponent(
      `سلام! لینک ۷ روز رایگان آلبرتو:\n${link}`
    )}`;
  }

  return (
    <div className="min-h-screen bg-lavender/30">
      <AppHeader showAuth={false} />

      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <Card className="border-violet-100 shadow-md">
          <CardContent className="p-8 md:p-10">
            <CheckCircle className="mx-auto h-14 w-14 text-success" />
            <h1 className="mt-5 text-2xl font-extrabold text-primary-deep">{motherSuccess.title}</h1>
            <p className="mt-4 leading-8 text-slate-600">{motherSuccess.body}</p>
            <p className="mt-3 leading-7 text-slate-500">{motherSuccess.share}</p>
            <p className="mt-3 text-sm leading-7 text-slate-500">{motherSuccess.reportNote}</p>

            {link ? (
              <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                <p className="mb-2 text-xs font-semibold text-primary">👇 لینک اختصاصی فرزندتان</p>
                <p className="break-all text-sm font-medium text-primary-deep" dir="ltr">
                  {link}
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Button type="button" variant="gradient" className="flex-1 gap-2" onClick={copyLink}>
                    <Copy className="h-4 w-4" />
                    {copied ? "کپی شد" : "کپی لینک"}
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 gap-2" onClick={shareSms}>
                    <Share2 className="h-4 w-4" />
                    ارسال برای فرزند
                  </Button>
                </div>
              </div>
            ) : (
              <p className="mt-6 text-sm text-amber-600">
                لینک پیدا نشد. از صفحه اصلی دوباره شماره را ثبت کنید.
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3">
              {inviteCode ? (
                <Link href={`/invite/${inviteCode}`}>
                  <Button variant="outline" className="w-full">
                    پیش‌نمایش لینک فرزند
                  </Button>
                </Link>
              ) : null}
              <Link href="/parent/dashboard">
                <Button variant="ghost" className="w-full">
                  مشاهده داشبورد والد
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
