"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useApp } from "@/providers/app-provider";
import type { UserRole } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const { loginSendOtp, loginVerifyOtp } = useApp();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const result = await loginSendOtp(phone);
    setLoading(false);
    setMessage(result.message);
    if (result.success) setStep("otp");
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const result = await loginVerifyOtp(phone, otp, role);
    setLoading(false);
    setMessage(result.message);
    if (result.success) {
      if (role === "admin") router.push("/admin");
      else if (role === "parent") router.push("/parent/dashboard");
      else router.push("/student/profile");
    }
  };

  return (
    <div className="min-h-screen bg-lavender/30">
      <AppHeader showAuth={false} />

      <div className="mx-auto max-w-md px-6 py-12">
        <Card className="border-violet-100 shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">ورود به اوج</CardTitle>
            <p className="text-sm text-slate-500">با شماره موبایل وارد شوید</p>
          </CardHeader>
          <CardContent>
            <div className="mb-5 flex justify-center gap-2">
              {(["student", "parent", "admin"] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                    role === r ? "bg-primary text-white" : "bg-lavender text-slate-600"
                  }`}
                >
                  {r === "student" ? "دانش‌آموز" : r === "parent" ? "والد" : "مدیر"}
                </button>
              ))}
            </div>

            {step === "phone" ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <Label htmlFor="phone">شماره موبایل</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="09121234567"
                    dir="ltr"
                    className="text-left"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
                  {loading ? "در حال ارسال..." : "دریافت کد تأیید"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <Label htmlFor="otp">کد تأیید</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    dir="ltr"
                    className="text-center tracking-widest"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    required
                  />
                  <p className="mt-2 text-xs text-slate-400">در حالت توسعه: 123456</p>
                </div>
                <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
                  {loading ? "در حال ورود..." : "ورود"}
                </Button>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="w-full text-center text-sm text-primary hover:underline"
                >
                  تغییر شماره
                </button>
              </form>
            )}

            {message && (
              <p className={`mt-4 text-center text-sm ${message.includes("موفق") ? "text-success" : "text-slate-600"}`}>
                {message}
              </p>
            )}

            <p className="mt-6 text-center text-xs text-slate-400">
              <Link href="/" className="text-primary hover:underline">
                بازگشت به صفحه اصلی
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
