"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motherLanding } from "@/lib/campaign/copy";
import { registerMotherLead } from "@/lib/campaign/campaign.service";
import { useCampaignStore } from "@/store/campaign-store";
import { ParentReportCard } from "@/components/parent/parent-report-card";
import { parentDailyReport } from "@/lib/data/mock-data";

export default function MotherLandingPage() {
  const router = useRouter();
  const setMotherLead = useCampaignStore((s) => s.setMotherLead);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await registerMotherLead(phone.trim());
      if (!res.success) {
        setError(res.message);
        return;
      }
      setMotherLead(phone.trim(), res.inviteCode, res.leadId);
      router.push("/parent/success");
    } catch {
      setError("خطا در ثبت. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <AppHeader authLabel="ورود" authHref="/login" />

      <section className="gradient-hero">
        <div className="mx-auto max-w-[720px] px-6 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-extrabold leading-tight text-primary-deep md:text-4xl">
              {motherLanding.title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
              {motherLanding.body}
            </p>
            <p className="mt-4 text-sm text-slate-500">{motherLanding.privacy}</p>

            <Card className="mx-auto mt-8 max-w-md border-violet-100 text-right shadow-md">
              <CardContent className="p-6">
                <p className="mb-4 text-sm font-medium text-primary-deep">{motherLanding.cta}</p>
                <form onSubmit={onSubmit} className="space-y-3">
                  <input
                    type="tel"
                    inputMode="numeric"
                    dir="ltr"
                    placeholder="0912xxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-lg tracking-wider outline-none focus:border-primary"
                    maxLength={11}
                    required
                  />
                  {error ? <p className="text-sm text-red-500">{error}</p> : null}
                  <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
                    {loading ? "در حال ثبت..." : "دریافت گزارش رایگان"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-12">
        <h2 className="mb-6 text-center text-lg font-bold text-primary-deep">نمونه گزارش روزانه</h2>
        <ParentReportCard report={parentDailyReport} />
      </section>

      <AppFooter />
    </div>
  );
}
