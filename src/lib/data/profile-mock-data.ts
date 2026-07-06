/** داده‌های دقیق mockup صفحه پروفایل — بدون تغییر متن یا اعداد */

export const profileSubjectProgress: Record<string, number> = {
  sub_math: 65,
  sub_bio: 40,
  sub_physics: 50,
  sub_chem: 70,
};

export const profileSubjectOrder = ["sub_math", "sub_bio", "sub_physics", "sub_chem"] as const;

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

export const dailyTimeChartData = [
  { time: "صبح زود", studyMinutes: 40, testCount: 12 },
  { time: "صبح", studyMinutes: 85, testCount: 28 },
  { time: "ظهر", studyMinutes: 60, testCount: 18 },
  { time: "عصر", studyMinutes: 120, testCount: 45 },
  { time: "شب", studyMinutes: 135, testCount: 52 },
  { time: "نیمه‌شب", studyMinutes: 30, testCount: 8 },
];

export const weeklyReadingChartData = [
  { day: "شنبه", studyMinutes: 90, testCount: 25 },
  { day: "یکشنبه", studyMinutes: 110, testCount: 32 },
  { day: "دوشنبه", studyMinutes: 75, testCount: 20 },
  { day: "سه‌شنبه", studyMinutes: 130, testCount: 48 },
  { day: "چهارشنبه", studyMinutes: 105, testCount: 35 },
  { day: "پنجشنبه", studyMinutes: 95, testCount: 28 },
  { day: "جمعه", studyMinutes: 60, testCount: 15 },
];

export const monthlyChartData = [
  { week: "هفته ۱", studyMinutes: 80, testCount: 22 },
  { week: "هفته ۲", studyMinutes: 100, testCount: 30 },
  { week: "هفته ۳", studyMinutes: 95, testCount: 28 },
  { week: "هفته ۴", studyMinutes: 125, testCount: 42 },
  { week: "هفته ۵", studyMinutes: 110, testCount: 35 },
];

export const subjectDailyRadarData = [
  { subject: "شیمی", studyMinutes: 90, testCount: 55 },
  { subject: "فیزیک", studyMinutes: 70, testCount: 40 },
  { subject: "زیست", studyMinutes: 110, testCount: 65 },
  { subject: "ریاضی", studyMinutes: 80, testCount: 48 },
];

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
    { text: "🌙 من همیشه بیدارم... کلیکم کن!" },
  ];
}

/** @deprecated use getAlbertBullets */
export const albertBullets = getAlbertBullets("آریا");
