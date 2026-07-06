import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ParentSuccessPage() {
  return (
    <div className="min-h-screen bg-lavender/30">
      <AppHeader showAuth={false} />

      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <Card className="border-violet-100 shadow-md">
          <CardContent className="p-10">
            <CheckCircle className="mx-auto h-16 w-16 text-success" />
            <h1 className="mt-6 text-2xl font-extrabold text-primary-deep">
              لینک ثبت‌نام ارسال شد!
            </h1>
            <p className="mt-4 leading-7 text-slate-500">
              لینک ثبت‌نام برای فرزندتان از طریق پیامک ارسال شد.
              پس از تکمیل ثبت‌نام توسط فرزند، می‌توانید گزارش‌های مطالعه را مشاهده کنید.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/parent/dashboard">
                <Button variant="gradient" size="lg" className="w-full">
                  مشاهده داشبورد
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  بازگشت به صفحه اصلی
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
