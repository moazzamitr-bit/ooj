"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { day5Membership } from "@/lib/campaign/copy";
import { useCampaignStore } from "@/store/campaign-store";
import { formatCurrencyToman } from "@/lib/utils/persian";

export default function GoldenMembershipPage() {
  const router = useRouter();
  const startDay5 = useCampaignStore((s) => s.startDay5);
  const activate = useCampaignStore((s) => s.activateGoldenMembership);
  const campaign = useCampaignStore((s) => s.campaign);
  const isMember = campaign.is_golden_member ?? false;
  const [committed, setCommitted] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (campaign.day !== 5) startDay5();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePay = () => {
    if (!committed || isMember) return;
    setPaying(true);
    activate();
    window.setTimeout(() => {
      router.push("/student/games/marathon/");
    }, 400);
  };

  return (
    <div className="min-h-screen gradient-hero">
      <AppHeader authLabel="خانه" authHref="/student" />
      <div className="mx-auto max-w-lg px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h1 className="text-center text-xl font-extrabold leading-8 text-primary-deep md:text-2xl">
            {day5Membership.headline}
          </h1>
          <p className="text-center text-sm font-bold text-amber-700">{day5Membership.hook}</p>

          <Card className="overflow-hidden border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg">
            <CardContent className="space-y-3 p-5 text-center">
              <p className="text-xs text-slate-500">حق عضویت ترم سه‌ماهه</p>
              <p className="text-lg text-slate-400 line-through">
                {formatCurrencyToman(day5Membership.fullPrice)}
              </p>
              <p className="text-3xl font-extrabold text-amber-700">
                {formatCurrencyToman(day5Membership.discountPrice)}
              </p>
              <p className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-800">
                ۵۰٪ تخفیف ویژه دوره ۷ روزه
              </p>
              <p className="text-sm font-medium text-rose-600">{day5Membership.urgency}</p>
            </CardContent>
          </Card>

          <div className="space-y-2 rounded-2xl border border-slate-100 bg-white/80 p-4 text-sm leading-7 text-slate-600">
            <p className="font-bold text-primary-deep">اگر تا پایان این فرصت ثبت‌نام کنی:</p>
            {day5Membership.benefits.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          {isMember ? (
            <Card className="border-emerald-200 bg-emerald-50/80">
              <CardContent className="space-y-3 p-5 text-center">
                <p className="font-bold text-emerald-800">{day5Membership.alreadyMember}</p>
                <Link href="/student/games/marathon/">
                  <Button variant="gradient" size="lg" className="w-full">
                    ورود به دوی ماراتون
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-slate-100">
              <CardContent className="space-y-4 p-5">
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-7 text-slate-700">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-primary"
                    checked={committed}
                    onChange={(e) => setCommitted(e.target.checked)}
                  />
                  <span>{day5Membership.commitment}</span>
                </label>

                <Button
                  type="button"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  disabled={!committed || paying}
                  onClick={handlePay}
                >
                  {paying ? "در حال فعال‌سازی..." : day5Membership.payCta}
                </Button>
                <p className="text-center text-[11px] text-slate-400">
                  پرداخت واقعی هنوز وصل نیست — این دکمه عضویت را به‌صورت شبیه‌سازی فعال می‌کند.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col gap-2">
            <Link href="/student/games/marathon/">
              <Button variant="outline" size="lg" className="w-full">
                مشاهده قوانین ماراتون
              </Button>
            </Link>
            <Link href="/student">
              <Button variant="outline" size="lg" className="w-full">
                خانه
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
