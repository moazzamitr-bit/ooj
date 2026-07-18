"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { afterTwoTests } from "@/lib/campaign/copy";
import { createStudentFromInvite } from "@/lib/campaign/campaign.service";
import { useCampaignStore } from "@/store/campaign-store";

export default function CompleteProfilePage() {
  const router = useRouter();
  const campaign = useCampaignStore((s) => s.campaign);
  const inviteCode = useCampaignStore((s) => s.inviteCode);
  const markProfileDone = useCampaignStore((s) => s.markProfileDone);
  const addChances = useCampaignStore((s) => s.addChances);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPhone, setConfirmPhone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!confirmPhone) {
      setError("لطفاً تأیید کنید شماره موبایل درست است.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const code = inviteCode || campaign.invite_code || `OWJ-${phone.slice(-4)}`;
      const field = campaign.field || "تجربی";
      const res = await createStudentFromInvite({
        inviteCode: code,
        fullName: `${firstName} ${lastName}`.trim(),
        phone,
        city,
        field,
      });
      if (!res.success) {
        setError(res.message || "خطا در ثبت");
        return;
      }
      // ensure 2 golden chances after two tests
      if (campaign.golden_chances < 2) addChances(2 - campaign.golden_chances);
      markProfileDone({
        first_name: firstName,
        last_name: lastName,
        city,
        phone,
      });
      router.push("/student/reward");
    } catch {
      setError("خطا در ثبت مشخصات.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen gradient-hero">
      <div className="mx-auto max-w-lg px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-primary-deep">{afterTwoTests.title}</h1>
          <p className="mt-3 leading-7 text-slate-600">{afterTwoTests.body}</p>
          <p className="mt-2 text-sm text-slate-500">{afterTwoTests.smsNote}</p>
          <p className="mt-4 text-sm font-medium text-primary-deep">{afterTwoTests.formNote}</p>
        </div>

        <Card className="mt-8 border-violet-100">
          <CardContent className="p-6">
            <form onSubmit={onSubmit} className="space-y-4 text-right">
              <Field label="👤 نام" value={firstName} onChange={setFirstName} required />
              <Field label="👤 نام خانوادگی" value={lastName} onChange={setLastName} required />
              <Field label="🏙️ شهرستان" value={city} onChange={setCity} required />
              <Field
                label="📱 شماره موبایل"
                value={phone}
                onChange={setPhone}
                required
                dir="ltr"
                placeholder="0912xxxxxxx"
              />
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={confirmPhone}
                  onChange={(e) => setConfirmPhone(e.target.checked)}
                />
                ✅ شماره موبایل درسته؟ بله
              </label>
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
                {loading ? "در حال ثبت..." : "ثبت و ورود به قرعه‌کشی"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  dir,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  dir?: "ltr" | "rtl";
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-slate-600">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        dir={dir}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-primary"
      />
    </label>
  );
}
