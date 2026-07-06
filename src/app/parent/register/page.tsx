"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import { fields, grades, provinces } from "@/lib/data/mock-data";
import { registerChild } from "@/lib/services/parent.service";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export default function ParentRegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    childPhone: "",
    grade: "",
    field: "",
    province: "",
    city: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSupabaseConfigured) {
        const res = await fetch("/api/parent/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!data.success) {
          setError(data.message);
          setLoading(false);
          return;
        }
      } else {
        registerChild(form);
      }
      router.push("/parent/success");
    } catch {
      setError("خطا در ثبت‌نام. دوباره تلاش کنید.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-lavender/30">
      <AppHeader showAuth={false} />

      <div className="mx-auto max-w-lg px-6 py-12">
        <Card className="border-violet-100 shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">ثبت‌نام فرزند</CardTitle>
            <p className="text-sm text-slate-500">
              اطلاعات فرزندتان را وارد کنید تا لینک ثبت‌نام برایش ارسال شود.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="phone">شماره موبایل فرزند</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="09123456789"
                  dir="ltr"
                  className="text-left"
                  value={form.childPhone}
                  onChange={(e) => setForm({ ...form, childPhone: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="grade">پایه تحصیلی</Label>
                <Select
                  id="grade"
                  value={form.grade}
                  onChange={(e) => setForm({ ...form, grade: e.target.value })}
                  required
                >
                  <option value="">انتخاب کنید</option>
                  {grades.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="field">رشته</Label>
                <Select
                  id="field"
                  value={form.field}
                  onChange={(e) => setForm({ ...form, field: e.target.value })}
                  required
                >
                  <option value="">انتخاب کنید</option>
                  {fields.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="province">استان</Label>
                <Select
                  id="province"
                  value={form.province}
                  onChange={(e) => setForm({ ...form, province: e.target.value })}
                  required
                >
                  <option value="">انتخاب کنید</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="city">شهر</Label>
                <Input
                  id="city"
                  placeholder="نام شهر"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  required
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
                {loading ? "در حال ارسال..." : "ارسال لینک برای فرزند"}
              </Button>
            </form>

            <p className="mt-4 text-center text-xs text-slate-400">
              <Link href="/" className="text-primary hover:underline">بازگشت به صفحه اصلی</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
