/** داده‌های دقیق mockup صفحه پروفایل — بدون تغییر متن یا اعداد */

export const profileSubjectProgress: Record<string, number> = {
  sub_math: 65,
  sub_bio: 40,
  sub_physics: 50,
  sub_chem: 70,
};

// نمایش از راست به چپ: زیست - شیمی - فیزیک - ریاضی
export const profileSubjectOrder = ["sub_bio", "sub_chem", "sub_physics", "sub_math"] as const;

export const profileStudentDisplay = {
  full_name: "آزاد احمدی",
  location_line: "ایمان، عثمان",
  grade_line: "دهم تجربی",
  target_major: "پزشکی",
  days_remaining: 237,
};

export const chemChaptersMockup = [
  { id: "ch_chem_1", title: "فصل ۱: درصد پیشرفت شما", percent: 73 },
  { id: "ch_chem_2", title: "فصل ۲: ساختار اتمی", percent: 65 },
  { id: "ch_chem_3", title: "فصل ۳: جدول تناوبی", percent: 44 },
  { id: "ch_chem_4", title: "فصل ۴: موازنه واکنش‌ها", percent: 34 },
  { id: "ch_chem_5", title: "فصل ۵: اکسیداسیون و احیا", percent: 21 },
];

export const chemSubchaptersMockup = [
  { id: "sc_m1", title: "ترسمت ۱: درس‌ها و تمرین‌ها", icon: "layers" },
  { id: "sc_m2", title: "ترسمت ۲: مفاهیم بنیادی", icon: "book" },
  { id: "sc_m3", title: "ترسمت ۳: ساختار الکترونی", icon: "settings" },
  { id: "sc_m4", title: "ترسمت ۴: انرژی واکنش", icon: "zap" },
  { id: "sc_m5", title: "ترسمت ۵: آزمایش‌ها", icon: "flask" },
  { id: "sc_m6", title: "ترسمت ۶: مرور و تست", icon: "clipboard" },
];

export type ChartBarKind = "default" | "total" | "surplus";

export interface ProfileChartBar {
  label: string;
  value: number;
  kind?: ChartBarKind;
}

/** نمودار دروس - ساعت (مقیاس ۰ تا ۳۵۰) */
export const subjectHoursChartData: ProfileChartBar[] = [
  { label: "ریاضی", value: 275 },
  { label: "فیزیک", value: 225 },
  { label: "شیمی", value: 175 },
  { label: "زیست", value: 250 },
];

/** نمودار ماهانه - ساعت (مقیاس ۰ تا ۵۰) */
export const monthlyHoursChartData: ProfileChartBar[] = [
  { label: "مهر", value: 42 },
  { label: "آبان", value: 28 },
  { label: "آذر", value: 16 },
  { label: "دی", value: 12 },
  { label: "بهمن", value: 5 },
  { label: "اسفند", value: 4 },
  { label: "فروردین", value: 18 },
  { label: "اردیبهشت", value: 18 },
  { label: "خرداد", value: 40 },
];

/** نمودار هفتگی - ساعت (مقیاس ۰ تا ۵۰) — ستون‌های کوتاه اول/آخر = مازاد هفته */
export const weeklyHoursChartData: ProfileChartBar[] = [
  { label: "", value: 2, kind: "surplus" },
  { label: "۷ روز\nاول", value: 43 },
  { label: "۷ روز\nدوم", value: 13 },
  { label: "۷ روز\nسوم", value: 8 },
  { label: "۷ روز\nچهارم", value: 15 },
  { label: "۲ روز\nآخر", value: 9 },
  { label: "", value: 1, kind: "surplus" },
];

/** نمودار روزانه - ساعت (چپ→راست): مجموع، مازاد ابتدا، ۷ روز، مازاد آخر */
export const dailyHoursChartData: ProfileChartBar[] = [
  { label: "مجموع", value: 10, kind: "total" },
  { label: "", value: 2, kind: "surplus" },
  { label: "شنبه", value: 1 },
  { label: "یکشنبه", value: 4 },
  { label: "دوشنبه", value: 6 },
  { label: "سه‌شنبه", value: 2 },
  { label: "چهارشنبه", value: 2 },
  { label: "پنجشنبه", value: 1 },
  { label: "جمعه", value: 2 },
  { label: "", value: 1, kind: "surplus" },
];

export const weeklyChartFootnote =
  "در ستون کوچک اول و آخر مربوط به مازاد هفته است. مثلا اگر انتهای ماه از پنجشنبه شروع می‌شود، روزهای پنجشنبه و جمعه در این ستون کوتاه قرار می‌گیرد یا اگر یکی دو روز از آخر ماه زیاد آمد در آخرین ستون کوتاه قرار می‌گیرد.";

/** @deprecated use dailyHoursChartData */
export const dailyTimeChartData = dailyHoursChartData.map((bar) => ({
  day: bar.label,
  studyMinutes: bar.value * 60,
  testCount: 0,
}));

/** @deprecated use weeklyHoursChartData */
export const weeklyReadingChartData = weeklyHoursChartData
  .filter((bar) => bar.kind !== "surplus")
  .map((bar) => ({
    week: bar.label.replace(/\n/g, " "),
    studyMinutes: bar.value * 60,
    testCount: 0,
  }));

/** @deprecated use monthlyHoursChartData */
export const monthlyChartData = monthlyHoursChartData.map((bar) => ({
  month: bar.label,
  studyMinutes: bar.value * 60,
  testCount: 0,
}));

/** @deprecated use subjectHoursChartData */
export const subjectDailyRadarData = subjectHoursChartData.map((bar) => ({
  subject: bar.label,
  studyMinutes: bar.value * 60,
  testCount: 0,
}));

export const hamadanAdmissionRanksDolati = [
  { major: "پزشکی", rank: 2350 },
  { major: "دندانپزشکی", rank: 4100 },
  { major: "داروسازی", rank: 5350 },
  { major: "فیزیوتراپی", rank: 9100 },
  { major: "پرستاری", rank: 12600 },
];

export const hamadanAdmissionRanksAzad = [
  { major: "پزشکی", rank: 6800 },
  { major: "دندانپزشکی", rank: 9200 },
  { major: "داروسازی", rank: 11500 },
  { major: "فیزیوتراپی", rank: 15800 },
  { major: "پرستاری", rank: 21000 },
];

/** @deprecated use hamadanAdmissionRanksDolati */
export const hamadanAdmissionRanks = hamadanAdmissionRanksDolati;

export function getAlbertBullets(firstName: string) {
  return [
    { text: `🔥 سلام ${firstName}!` },
    { text: "📚 هر سوالی بلد نبودی، از من بپرس!" },
    { text: "📝 هر مسئله‌ای سخت بود، بهم بده!" },
    { text: "🧮 برنامه درسی خواستی، برات می‌چینم." },
    { text: "🧠 فلش‌کارت خواستی، برات می‌سازم." },
    { text: "🎯 مهمتر از همه..." },
    { text: "📊 هر هفته می‌گم چقدر پیشرفت کردی و\nنسبت به بقیه کجایی!" },
  ];
}

/** @deprecated use getAlbertBullets */
export const albertBullets = getAlbertBullets("آریا");
