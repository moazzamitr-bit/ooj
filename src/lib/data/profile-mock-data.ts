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
export type ChartBarTone = "blue" | "green" | "red" | "orange" | "black";
export type ChartPalette = "green" | "orange" | "black" | "blue";

export interface ProfileChartBar {
  label: string;
  value: number;
  kind?: ChartBarKind;
  /** Group label for clustered bars (e.g. subject name above grade trio). */
  group?: string;
  /** Per-bar color override (used for grade columns). */
  tone?: ChartBarTone;
  /** Cap for this bar (e.g. 100 / 100 / 30 hours). */
  maxValue?: number;
}

/** نمودار دروس - ساعت مطالعه هر پایه (آبی/سبز تا ۱۰۰، قرمز تا ۳۰) */
export const subjectGradeTestChartData: ProfileChartBar[] = [
  { label: "۱۰", value: 100, kind: "grade", group: "زیست", tone: "blue", maxValue: 100 },
  { label: "۱۱", value: 72, kind: "grade", group: "زیست", tone: "green", maxValue: 100 },
  { label: "۱۲", value: 18, kind: "grade", group: "زیست", tone: "red", maxValue: 30 },
  { label: "۱۰", value: 100, kind: "grade", group: "زمین", tone: "blue", maxValue: 100 },
  { label: "۱۱", value: 55, kind: "grade", group: "زمین", tone: "green", maxValue: 100 },
  { label: "۱۲", value: 12, kind: "grade", group: "زمین", tone: "red", maxValue: 30 },
  { label: "۱۰", value: 100, kind: "grade", group: "شیمی", tone: "blue", maxValue: 100 },
  { label: "۱۱", value: 88, kind: "grade", group: "شیمی", tone: "green", maxValue: 100 },
  { label: "۱۲", value: 24, kind: "grade", group: "شیمی", tone: "red", maxValue: 30 },
  { label: "۱۰", value: 92, kind: "grade", group: "فیزیک", tone: "blue", maxValue: 100 },
  { label: "۱۱", value: 61, kind: "grade", group: "فیزیک", tone: "green", maxValue: 100 },
  { label: "۱۲", value: 15, kind: "grade", group: "فیزیک", tone: "red", maxValue: 30 },
  { label: "۱۰", value: 100, kind: "grade", group: "ریاضی", tone: "blue", maxValue: 100 },
  { label: "۱۱", value: 70, kind: "grade", group: "ریاضی", tone: "green", maxValue: 100 },
  { label: "۱۲", value: 20, kind: "grade", group: "ریاضی", tone: "red", maxValue: 30 },
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
  { label: "هفته ۱", value: 4.5 },
  { label: "هفته ۲", value: 5 },
  { label: "هفته ۳", value: 6.5 },
  { label: "هفته ۴", value: 7 },
  { label: "هفته ۵", value: 5.5 },
  { label: "هفته ۶", value: 8 },
  { label: "هفته ۷", value: 6 },
  { label: "هفته ۸", value: 7.5 },
  { label: "هفته ۹", value: 5 },
  { label: "هفته ۱۰", value: 6.5 },
  { label: "هفته ۱۱", value: 7 },
  { label: "هفته ۱۲", value: 8.5 },
  { label: "هفته ۱۳", value: 6 },
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
    { text: "من مشاور فوق حرفه ای توام که میتونم …" },
    {
      text: "با امتحانات رایگان هفتگی و ماهانه ای که ازت\nمی کنم رتبه احتمالی  کنکور تو پیشگویی کنم!",
    },
    { text: "هر سوال مهمی داشتی میتونم بهت جواب بدم!" },
    { text: "هر مسئله سختی داشتی میتونم برات حل کنم!" },
    { text: "برات برنامه مطالعه روزانه درست می کنم!" },
    { text: "برات فلش کارت اختصاصی درست می کنم!" },
    { text: "برای شب امتحان نکات مهم را دوره می کنم!" },
    { text: "و از همه مهم تر…." },
    { text: "پیشرفت درسی تو با بقیه مقایسه می کنم!!!" },
  ];
}

/** @deprecated use getAlbertBullets */
export const albertBullets = getAlbertBullets("آریا");
