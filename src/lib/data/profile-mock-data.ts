/** داده‌های دقیق mockup صفحه پروفایل — بدون تغییر متن یا اعداد */

export const profileSubjectProgress: Record<string, number> = {
  sub_bio: 40,
  sub_geo: 35,
  sub_chem: 70,
  sub_physics: 50,
  sub_math: 65,
};

// نمایش از راست به چپ: زیست - زمین شناسی - شیمی - فیزیک - ریاضی
export const profileSubjectOrder = [
  "sub_bio",
  "sub_geo",
  "sub_chem",
  "sub_physics",
  "sub_math",
] as const;

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

export type ChartBarKind = "default" | "total" | "surplus" | "grade";

export interface ProfileChartBar {
  label: string;
  value: number;
  kind?: ChartBarKind;
  /** Group label for clustered bars (e.g. subject name above grade trio). */
  group?: string;
}

/** نمودار دروس - درصد تکمیل تست هر پایه (۰ تا ۱۰۰) */
export const subjectGradeTestChartData: ProfileChartBar[] = [
  { label: "۱۰", value: 72, kind: "grade", group: "زیست" },
  { label: "۱۱", value: 48, kind: "grade", group: "زیست" },
  { label: "۱۲", value: 35, kind: "grade", group: "زیست" },
  { label: "۱۰", value: 55, kind: "grade", group: "زمین" },
  { label: "۱۱", value: 40, kind: "grade", group: "زمین" },
  { label: "۱۲", value: 28, kind: "grade", group: "زمین" },
  { label: "۱۰", value: 80, kind: "grade", group: "شیمی" },
  { label: "۱۱", value: 62, kind: "grade", group: "شیمی" },
  { label: "۱۲", value: 44, kind: "grade", group: "شیمی" },
  { label: "۱۰", value: 58, kind: "grade", group: "فیزیک" },
  { label: "۱۱", value: 46, kind: "grade", group: "فیزیک" },
  { label: "۱۲", value: 33, kind: "grade", group: "فیزیک" },
  { label: "۱۰", value: 70, kind: "grade", group: "ریاضی" },
  { label: "۱۱", value: 52, kind: "grade", group: "ریاضی" },
  { label: "۱۲", value: 38, kind: "grade", group: "ریاضی" },
];

/** @deprecated use subjectGradeTestChartData */
export const subjectHoursChartData = subjectGradeTestChartData;

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

/** نمودار هفتگی - ساعت (یک ترم ۱۳ هفته‌ای، بدون ستون مجموع — مقیاس ۰ تا ۹) */
export const weeklyHoursChartData: ProfileChartBar[] = [
  { label: "هفته\n۱", value: 4.5 },
  { label: "هفته\n۲", value: 5 },
  { label: "هفته\n۳", value: 6.5 },
  { label: "هفته\n۴", value: 7 },
  { label: "هفته\n۵", value: 5.5 },
  { label: "هفته\n۶", value: 8 },
  { label: "هفته\n۷", value: 6 },
  { label: "هفته\n۸", value: 7.5 },
  { label: "هفته\n۹", value: 5 },
  { label: "هفته\n۱۰", value: 6.5 },
  { label: "هفته\n۱۱", value: 7 },
  { label: "هفته\n۱۲", value: 8.5 },
  { label: "هفته\n۱۳", value: 6 },
];

/** نمودار روزانه - دقیقه: ۳ مجموع کوچک، مازاد ابتدا، ۷ روز، مازاد آخر — مقیاس ۰ تا ۱۸۰ */
export const dailyMinutesChartData: ProfileChartBar[] = [
  { label: "مطالعه", value: 160, kind: "total" },
  { label: "تست", value: 110, kind: "total" },
  { label: "مرور", value: 70, kind: "total" },
  { label: "", value: 20, kind: "surplus" },
  { label: "شنبه", value: 20 },
  { label: "یکشنبه", value: 80 },
  { label: "دوشنبه", value: 120 },
  { label: "سه‌شنبه", value: 40 },
  { label: "چهارشنبه", value: 40 },
  { label: "پنجشنبه", value: 20 },
  { label: "جمعه", value: 40 },
  { label: "", value: 20, kind: "surplus" },
];

/** @deprecated use dailyMinutesChartData */
export const dailyHoursChartData = dailyMinutesChartData;

export const weeklyChartFootnote =
  "در ستون کوچک اول و آخر مربوط به مازاد هفته است. مثلا اگر انتهای ماه از پنجشنبه شروع می‌شود، روزهای پنجشنبه و جمعه در این ستون کوتاه قرار می‌گیرد یا اگر یکی دو روز از آخر ماه زیاد آمد در آخرین ستون کوتاه قرار می‌گیرد.";

/** @deprecated use dailyMinutesChartData */
export const dailyTimeChartData = dailyMinutesChartData.map((bar) => ({
  day: bar.label,
  studyMinutes: bar.value,
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

/** @deprecated use subjectGradeTestChartData */
export const subjectDailyRadarData = [
  { subject: "ریاضی", studyMinutes: 275 * 60, testCount: 0 },
  { subject: "فیزیک", studyMinutes: 225 * 60, testCount: 0 },
  { subject: "شیمی", studyMinutes: 175 * 60, testCount: 0 },
  { subject: "زیست", studyMinutes: 250 * 60, testCount: 0 },
  { subject: "زمین شناسی", studyMinutes: 140 * 60, testCount: 0 },
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
    { text: `سلام ${firstName}` },
    { text: "من آلبرتو مشاور هوشمند تو هستم!" },
    { text: "من در هر موضوعی میتونم بهت مشاوره بدم!" },
    { text: "من حتی میتونم آینده ات را پیشگویی کنم!" },
    { text: "هر سوالی را میتونم جواب بدم!" },
    { text: "هر مسئله ای را میتونم برات حل کنم!" },
    { text: "برات برنامه مطالعه روزانه درست می کنم!" },
    { text: "برات فلش کارت اختصاصی درست می کنم!" },
    { text: "برای شب امتحان نکات مهم را دوره می کنم!" },
    { text: "و از همه مهمتر…." },
    { text: "پیشرفت درسی تو با بقیه مقایسه می کنم!!!" },
  ];
}

/** @deprecated use getAlbertBullets */
export const albertBullets = getAlbertBullets("آریا");
