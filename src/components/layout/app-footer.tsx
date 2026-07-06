import Link from "next/link";
import { Camera, Globe, Play, Send } from "lucide-react";
import { OwjLogo } from "@/components/layout/owj-logo";

export function AppFooter() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 pb-10 md:px-8">
      <footer className="overflow-hidden rounded-2xl border border-slate-100 bg-[#FAFAFC] shadow-[0_4px_20px_rgb(17_26_76_0.04)]">
        <div className="px-8 py-12">
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-6">
            <div className="col-span-2">
              <div className="flex items-center gap-3">
                <OwjLogo className="h-10 w-10" />
                <span className="text-xl font-extrabold text-primary-deep">اوج</span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
                اوج یک پلتفرم آموزشی جامع برای موفقیت در کنکور و آزمون‌های مهم است.
              </p>
              <div className="mt-5 flex gap-3">
                {[
                  { icon: Camera, label: "اینستاگرام" },
                  { icon: Send, label: "تلگرام" },
                  { icon: Play, label: "یوتیوب" },
                  { icon: Globe, label: "وب‌سایت" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-primary/30 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-extrabold text-primary-deep">دسترسی سریع</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-primary">درباره اوج</Link></li>
                <li><Link href="#" className="hover:text-primary">اساتید</Link></li>
                <li><Link href="#" className="hover:text-primary">دوره‌ها</Link></li>
                <li><Link href="#" className="hover:text-primary">بلاگ</Link></li>
                <li><Link href="#" className="hover:text-primary">تماس با ما</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-extrabold text-primary-deep">خدمات</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-primary">مشاوره تحصیلی</Link></li>
                <li><Link href="#" className="hover:text-primary">برنامه‌ریزی درسی</Link></li>
                <li><Link href="#" className="hover:text-primary">آزمون آنلاین</Link></li>
                <li><Link href="#" className="hover:text-primary">تحلیل کارنامه</Link></li>
                <li><Link href="#" className="hover:text-primary">کلاس آنلاین</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-extrabold text-primary-deep">راهنما</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-primary">سوالات متداول</Link></li>
                <li><Link href="#" className="hover:text-primary">نحوه استفاده</Link></li>
                <li><Link href="#" className="hover:text-primary">قوانین و مقررات</Link></li>
                <li><Link href="#" className="hover:text-primary">پشتیبانی</Link></li>
                <li><Link href="#" className="hover:text-primary">بلاگ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-extrabold text-primary-deep">درباره اوج</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-primary">درباره ما</Link></li>
                <li><Link href="#" className="hover:text-primary">تیم ما</Link></li>
                <li><Link href="#" className="hover:text-primary">فرصت‌های شغلی</Link></li>
                <li><Link href="#" className="hover:text-primary">همکاری با ما</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 text-xs text-slate-400 md:flex-row">
            <p>کلیه حقوق این سایت متعلق به گروه آموزشی اوج می‌باشد.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <Link href="#" className="hover:text-primary">سیاست حفظ حریم خصوصی</Link>
              <Link href="#" className="hover:text-primary">شرایط و قوانین</Link>
              <span>طراحی و توسعه با 💜 توسط تیم اوج</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
