"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLocalStudentByReferralCode } from "@/lib/local-db";
import { useCampaignStore } from "@/store/campaign-store";
import albertoPortrait from "@/assets/images/alberto-portrait.png";

export default function InvitePageClient({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const referrer = getLocalStudentByReferralCode(code);
  const setInviteCode = useCampaignStore((s) => s.setInviteCode);
  const setStep = useCampaignStore((s) => s.setStep);

  useEffect(() => {
    setInviteCode(code);
    setStep("intro");
  }, [code, setInviteCode, setStep]);

  return (
    <div className="min-h-screen gradient-hero">
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <Card className="border-violet-100 shadow-lg">
          <CardContent className="p-8">
            <div className="relative mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full bg-[#F3F0FF]">
              <Image src={albertoPortrait} alt="آلبرتو" fill className="object-cover object-[center_20%]" />
            </div>
            <h1 className="text-2xl font-extrabold text-primary-deep">سلام! من آلبرتو هستم</h1>
            {referrer ? (
              <p className="mt-3 text-slate-600">{referrer.full_name} تو را دعوت کرده!</p>
            ) : (
              <p className="mt-3 text-slate-600">۷ روز رایگان مشاور هوشمند کنکور منتظرته.</p>
            )}
            <p className="mt-2 text-xs text-slate-400" dir="ltr">
              کد: {code}
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Link href="/student/onboarding">
                <Button variant="gradient" size="lg" className="w-full">
                  شروع با آلبرتو
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
