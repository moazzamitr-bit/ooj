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

// نمودار روزانه: مجموع زمان مطالعه در هر روز از هفته
export const dailyTimeChartData = [
  { day: "شنبه", studyMinutes: 420, testCount: 0 },
  { day: "یکشنبه", studyMinutes: 480, testCount: 0 },
  { day: "دوشنبه", studyMinutes: 390, testCount: 0 },
  { day: "سه‌شنبه", studyMinutes: 540, testCount: 0 },
  { day: "چهارشنبه", studyMinutes: 510, testCount: 0 },
  { day: "پنجشنبه", studyMinutes: 450, testCount: 0 },
  { day: "جمعه", studyMinutes: 300, testCount: 0 },
];

// نمودار هفتگی
export const weeklyReadingChartData = [
  { week: "هفته ۱", studyMinutes: 2700, testCount: 0 },
  { week: "هفته ۲", studyMinutes: 3000, testCount: 0 },
  { week: "هفته ۳", studyMinutes: 2850, testCount: 0 },
  { week: "هفته ۴", studyMinutes: 3200, testCount: 0 },
  { week: "هفته ۵", studyMinutes: 3100, testCount: 0 },
];

// نمودار ماهانه
export const monthlyChartData = [
  { month: "مهر", studyMinutes: 5200, testCount: 0 },
  { month: "آبان", studyMinutes: 4800, testCount: 0 },
  { month: "آذر", studyMinutes: 5100, testCount: 0 },
  { month: "دی", studyMinutes: 5500, testCount: 0 },
];

// نمودار دروس (مطالعه هر درس)
export const subjectDailyRadarData = [
  { subject: "زیست", studyMinutes: 450, testCount: 0 },
  { subject: "شیمی", studyMinutes: 420, testCount: 0 },
  { subject: "فیزیک", studyMinutes: 390, testCount: 0 },
  { subject: "ریاضی", studyMinutes: 360, testCount: 0 },
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
  ];
}

/** @deprecated use getAlbertBullets */
export const albertBullets = getAlbertBullets("آریا");
