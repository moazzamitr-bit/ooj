# اوج (Owj)

پلتفرم هوشمند کنکور برای دانش‌آموزان و والدین — با مشاور AI آلبرتو.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Supabase (اختیاری — با fallback محلی)
- Zustand

## Routes

| Route | Description |
|-------|-------------|
| `/` | لندینگ مادر — ثبت شماره و شروع ۷ روز رایگان |
| `/login` | ورود با OTP |
| `/invite/[code]` | لینک اختصاصی فرزند / دعوت |
| `/parent/register` | ثبت‌نام فرزند (فرم قدیمی) |
| `/parent/success` | موفقیت مادر + لینک فرزند |
| `/parent/dashboard` | گزارش روزانه والد |
| `/student/onboarding` | معرفی آلبرتو |
| `/student/riddle` | معمای روز اول |
| `/student/riddle/success` | آفرین + اولین شانس |
| `/student/lottery-intro` | معرفی قرعه‌کشی افتتاحیه |
| `/student/field` | انتخاب رشته |
| `/student/quiz` | ۲ تست |
| `/student/complete-profile` | ثبت مشخصات دانش‌آموز |
| `/student/reward` | ۲ شانس طلایی + قوانین |
| `/student/lottery/result` | نتیجه قرعه‌کشی (برنده/بازنده) |
| `/student/day2` | روز دوم — دعوت دوستان و صندوقچه شانس |
| `/student/day3` | هدایت به گنج قارون |
| `/student/games/treasure` | روز سوم — برج گنج قارون |
| `/student/day4` | هدایت به تور ایران‌گردی |
| `/student/games/iran-tour` | روز چهارم — نقشه ۳۱ استان |
| `/student/day5` | هدایت به ماراتون / عضویت طلایی |
| `/student/games/marathon` | روز پنجم — دوی ماراتون |
| `/student/membership` | عضویت طلایی (paywall شبیه‌سازی) |
| `/parent/day2` | پیام مادر شب دوم |
| `/student/referral` | دعوت دوستان |
| `/student/profile` | داشبورد دانش‌آموز |
| `/admin` | پنل مدیریت |

## API Routes

| Route | Description |
|-------|-------------|
| `/api/auth/send-otp` | ارسال کد تأیید |
| `/api/auth/verify-otp` | تأیید OTP و ورود |
| `/api/quiz/submit` | ثبت پاسخ‌های تست |
| `/api/parent/register` | ثبت‌نام فرزند |
| `/api/referral/invite` | ثبت دعوت |
| `/api/chat/alberto` | چت با آلبرتو |

## Local Development

```bash
npm install
npm run dev
```

باز کنید: [http://localhost:3000](http://localhost:3000)

## احراز هویت (حالت توسعه)

- صفحه ورود: `/login`
- کد OTP: `123456`
- شماره نمونه: `09121234567`

## ذخیره‌سازی داده

**بدون Supabase:** داده‌ها در `localStorage` (کلید `owj_local_db_v1`) ذخیره می‌شوند — تست، دعوت، پیشرفت فصل‌ها و گزارش والدین واقعاً persist می‌شوند.

**با Supabase:** فایل `src/lib/supabase/schema.sql` را در SQL Editor اجرا کنید و متغیرهای `.env.local` را پر کنید.

## Environment Variables

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=          # اختیاری — برای پاسخ هوشمند آلبرتو
```

## قابلیت‌های فعال

- ورود OTP (محلی + API)
- تست کنکوری با ثبت پاسخ و امتیازدهی
- پیشرفت فصل‌ها بعد از تست
- دعوت دوستان با شماره موبایل
- ثبت‌نام والدین
- گزارش روزانه والد بر اساس جلسات مطالعه
- چت آلبرتو (fallback هوشمند + OpenAI اختیاری)
- پنل ادمین با داده واقعی
- نقشه قبولی استان‌ها

## GitHub Pages

با `GITHUB_PAGES=true` خروجی static است — API routes کار نمی‌کنند. برای production کامل از Vercel یا سرور Node استفاده کنید.
