"use client";

import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLocalStudentByReferralCode } from "@/lib/local-db";

export default function InvitePageClient({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const referrer = getLocalStudentByReferralCode(code);

  return (
    <div className="min-h-screen gradient-hero">
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <Card className="border-violet-100 shadow-lg">
          <CardContent className="p-8">
            <span className="text-5xl">🎓</span>
            <h1 className="mt-4 text-2xl font-extrabold text-primary-deep">دعوت به اوج</h1>
            {referrer ? (
              <p className="mt-3 text-slate-600">
                {referrer.full_name} تو را به اوج دعوت کرده!
              </p>
            ) : (
              <p className="mt-3 text-slate-600">به پلتفرم هوشمند کنکور اوج خوش آمدی!</p>
            )}
            <p className="mt-2 text-sm text-slate-400">کد دعوت: {code}</p>

            <div className="mt-8 flex flex-col gap-3">
              <Link href="/login">
                <Button variant="gradient" size="lg" className="w-full">
                  ثبت‌نام و شروع
                </Button>
              </Link>
              <Link href="/student/onboarding">
                <Button variant="outline" size="lg" className="w-full">
                  شروع تست رایگان
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
