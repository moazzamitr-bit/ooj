"use client";

import { Suspense, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLocalStudentByReferralCode } from "@/lib/local-db";
import { useCampaignStore } from "@/store/campaign-store";
import albertoPortrait from "@/assets/images/alberto-portrait.png";

function InviteContent() {
  const searchParams = useSearchParams();
  const code = useMemo(() => {
    const fromQuery = searchParams.get("code")?.trim();
    if (fromQuery) return fromQuery;
    if (typeof window === "undefined") return "";
    // Support legacy path /invite/OWJ-xxx/ via 404 redirect query
    const parts = window.location.pathname.split("/").filter(Boolean);
    const inviteIdx = parts.indexOf("invite");
    if (inviteIdx >= 0 && parts[inviteIdx + 1] && parts[inviteIdx + 1] !== "index.html") {
      return decodeURIComponent(parts[inviteIdx + 1]);
    }
    return "";
  }, [searchParams]);

  const referrer = code ? getLocalStudentByReferralCode(code) : null;
  const setInviteCode = useCampaignStore((s) => s.setInviteCode);
  const setStep = useCampaignStore((s) => s.setStep);

  useEffect(() => {
    if (!code) return;
    setInviteCode(code);
    setStep("intro");
    // Notify referrer (other tab / same browser listeners)
    void import("@/lib/campaign/invite-opens").then((m) => m.broadcastInviteOpen(code));
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
            {code ? (
              <p className="mt-2 text-xs text-slate-400" dir="ltr">
                کد: {code}
              </p>
            ) : (
              <p className="mt-3 text-sm text-amber-600">کد دعوت در لینک پیدا نشد.</p>
            )}

            <div className="mt-8 flex flex-col gap-3">
              <Link href="/student/onboarding">
                <Button variant="gradient" size="lg" className="w-full" disabled={!code}>
                  شروع با آلبرتو
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full">
                  بازگشت
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function InvitePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-slate-500">در حال بارگذاری...</div>
      }
    >
      <InviteContent />
    </Suspense>
  );
}
