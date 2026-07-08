import type { SubjectTestSection } from "@/components/dashboard/subject-card";

export interface StudyTopicNode {
  id: string;
  title: string;
}

export interface StudyChapterNode {
  id: string;
  title: string;
  topics: StudyTopicNode[];
  progressPercent: number;
}

type GradeKey = "year1" | "year2" | "year3";

function topics(subjectId: string, chapterId: string, titles: string[]): StudyTopicNode[] {
  return titles.map((title, i) => ({
    id: `${subjectId}_${chapterId}_t${i + 1}`,
    title,
  }));
}

function mockChapterProgress(subjectId: string, grade: GradeKey, index: number): number {
  const gradeOffset = grade === "year1" ? 0 : grade === "year2" ? 7 : 14;
  const hash =
    subjectId.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0) +
    index * 17 +
    gradeOffset;
  return Math.min(92, 22 + (hash % 68));
}

function chapter(
  subjectId: string,
  grade: GradeKey,
  index: number,
  title: string,
  topicTitles: string[],
  progressPercent?: number
): StudyChapterNode {
  const id = `${subjectId}_${grade}_ch${index}`;
  return {
    id,
    title,
    topics: topics(subjectId, id, topicTitles),
    progressPercent: progressPercent ?? mockChapterProgress(subjectId, grade, index),
  };
}

const BIO_CURRICULUM: Record<GradeKey, StudyChapterNode[]> = {
  year1: [
    chapter("sub_bio", "year1", 1, "فصل ۱: دنیای زنده", [
      "ویژگی‌های جانداران",
      "سطوح سازمان‌یافتگی حیات",
      "روش مطالعه زیست‌شناسی",
    ]),
    chapter("sub_bio", "year1", 2, "فصل ۲: گوارش و جذب مواد", [
      "ساختار دستگاه گوارش",
      "دهان و دندان",
      "معده",
      "روده باریک",
      "روده بزرگ",
      "آنزیم‌های گوارشی",
      "جذب مواد غذایی",
      "کبد و پانکراس",
    ]),
    chapter("sub_bio", "year1", 3, "فصل ۳: تبادلات گازی", [
      "دستگاه تنفس",
      "مسیر عبور هوا",
      "ساختار شش‌ها",
      "تبادل گازها",
      "انتقال اکسیژن",
    ]),
    chapter("sub_bio", "year1", 4, "فصل ۴: گردش مواد در بدن", [
      "قلب",
      "رگ‌ها",
      "خون",
      "گلبول قرمز",
      "گلبول سفید",
      "پلاکت",
      "دستگاه لنفی",
    ]),
    chapter("sub_bio", "year1", 5, "فصل ۵: تنظیم اسمزی و دفع مواد زائد", [
      "کلیه",
      "نفرون",
      "تشکیل ادرار",
      "تنظیم آب و نمک",
    ]),
    chapter("sub_bio", "year1", 6, "فصل ۶: از یاخته تا گیاه", [
      "یاخته گیاهی",
      "بافت‌های گیاهی",
      "ریشه",
      "ساقه",
      "برگ",
    ]),
    chapter("sub_bio", "year1", 7, "فصل ۷: جذب و انتقال مواد در گیاهان", [
      "جذب آب",
      "آوند چوبی",
      "آوند آبکش",
      "تعرق",
      "انتقال مواد",
    ]),
  ],
  year2: [
    chapter("sub_bio", "year2", 1, "فصل ۱: تنظیم عصبی", [
      "یاخته‌های عصبی (نورون)",
      "دستگاه عصبی مرکزی",
      "دستگاه عصبی محیطی",
      "پیام عصبی",
      "انتقال پیام عصبی",
      "انعکاس‌ها",
      "مغز و نخاع",
    ]),
    chapter("sub_bio", "year2", 2, "فصل ۲: حواس", [
      "گیرنده‌های حسی",
      "چشم",
      "ساختار چشم",
      "تشکیل تصویر",
      "گوش",
      "تعادل",
      "حس بویایی",
      "حس چشایی",
      "پوست و گیرنده‌های آن",
    ]),
    chapter("sub_bio", "year2", 3, "فصل ۳: دستگاه حرکتی", [
      "استخوان‌ها",
      "اسکلت بدن",
      "مفصل‌ها",
      "ماهیچه‌ها",
      "انقباض ماهیچه",
      "حرکت بدن",
    ]),
    chapter("sub_bio", "year2", 4, "فصل ۴: تنظیم شیمیایی", [
      "هورمون‌ها",
      "غدد درون‌ریز",
      "هیپوفیز",
      "تیروئید",
      "لوزالمعده",
      "تنظیم قند خون",
      "تنظیم هورمونی بدن",
    ]),
    chapter("sub_bio", "year2", 5, "فصل ۵: ایمنی", [
      "دفاع غیر اختصاصی",
      "دفاع اختصاصی",
      "گلبول‌های سفید",
      "پادتن‌ها",
      "واکسن",
      "بیماری‌های خودایمنی",
    ]),
    chapter("sub_bio", "year2", 6, "فصل ۶: تقسیم یاخته", [
      "چرخه یاخته‌ای",
      "تقسیم میتوز",
      "تقسیم میوز",
      "کروموزوم‌ها",
      "سرطان",
    ]),
    chapter("sub_bio", "year2", 7, "فصل ۷: تولید مثل", [
      "دستگاه تولید مثل مرد",
      "دستگاه تولید مثل زن",
      "تشکیل گامت",
      "لقاح",
      "رشد جنین",
    ]),
    chapter("sub_bio", "year2", 8, "فصل ۸: تولید مثل نهاندانگان", [
      "ساختار گل",
      "گرده‌افشانی",
      "لقاح در گیاهان",
      "تشکیل دانه",
      "تشکیل میوه",
    ]),
    chapter("sub_bio", "year2", 9, "فصل ۹: پاسخ گیاهان به محرک‌ها", [
      "هورمون‌های گیاهی",
      "رشد گیاه",
      "پاسخ به نور",
      "پاسخ به جاذبه",
      "حرکات گیاهان",
    ]),
  ],
  year3: [
    chapter("sub_bio", "year3", 1, "فصل ۱: مولکول‌های اطلاعاتی", [
      "DNA",
      "RNA",
      "نوکلئوتیدها",
      "همانندسازی DNA",
    ]),
    chapter("sub_bio", "year3", 2, "فصل ۲: جریان اطلاعات در یاخته", [
      "رونویسی",
      "ترجمه",
      "پروتئین‌سازی",
      "تنظیم بیان ژن",
    ]),
    chapter("sub_bio", "year3", 3, "فصل ۳: انتقال اطلاعات در نسل‌ها", [
      "ژنتیک",
      "قوانین مندل",
      "صفات",
      "ژنوتیپ و فنوتیپ",
    ]),
    chapter("sub_bio", "year3", 4, "فصل ۴: تغییر در اطلاعات وراثتی", [
      "جهش",
      "عوامل جهش‌زا",
      "تغییرات ژنتیکی",
      "تکامل",
    ]),
    chapter("sub_bio", "year3", 5, "فصل ۵: از ماده به انرژی", [
      "تنفس سلولی",
      "ATP",
      "گلیکولیز",
      "چرخه کربس",
    ]),
    chapter("sub_bio", "year3", 6, "فصل ۶: از انرژی به ماده", [
      "فتوسنتز",
      "واکنش‌های نوری",
      "چرخه کالوین",
    ]),
    chapter("sub_bio", "year3", 7, "فصل ۷: فناوری‌های نوین زیستی", [
      "مهندسی ژنتیک",
      "زیست‌فناوری",
      "DNA نوترکیب",
    ]),
    chapter("sub_bio", "year3", 8, "فصل ۸: رفتارهای جانوران", [
      "رفتار غریزی",
      "رفتار اکتسابی",
      "ارتباط جانوران",
    ]),
  ],
};

const CHEM_CURRICULUM: Record<GradeKey, StudyChapterNode[]> = {
  year1: [
    chapter("sub_chem", "year1", 1, "فصل ۱: کیهان، زادگاه الفبای هستی", [
      "ساختار اتم",
      "عدد اتمی",
      "عدد جرمی",
      "ایزوتوپ‌ها",
      "جدول تناوبی عناصر",
      "آرایش الکترونی",
    ]),
    chapter("sub_chem", "year1", 2, "فصل ۲: ردپای گازها در زندگی", [
      "گازها",
      "فشار گاز",
      "حجم گاز",
      "قوانین گازها",
      "رفتار گازها",
    ]),
    chapter("sub_chem", "year1", 3, "فصل ۳: آب، آهنگ زندگی", [
      "ساختار آب",
      "محلول‌ها",
      "انحلال‌پذیری",
      "غلظت",
      "اسید و باز",
    ]),
  ],
  year2: [
    chapter("sub_chem", "year2", 1, "فصل ۱: قدر هدایای زمینی را بدانیم", [
      "نفت و منابع هیدروکربنی",
      "آلکان‌ها",
      "آلکن‌ها",
      "آلکین‌ها",
      "ایزومری",
      "نام‌گذاری ترکیبات آلی",
      "واکنش‌های هیدروکربن‌ها",
    ]),
    chapter("sub_chem", "year2", 2, "فصل ۲: در پی غذای سالم", [
      "کربوهیدرات‌ها",
      "چربی‌ها",
      "پروتئین‌ها",
      "ساختار مولکول‌های زیستی",
      "پلیمرهای طبیعی",
    ]),
    chapter("sub_chem", "year2", 3, "فصل ۳: پوشاک، نیازی پایان‌ناپذیر", [
      "پلیمرها",
      "پلیمرهای طبیعی و مصنوعی",
      "الیاف",
      "ساختار پلیمرها",
      "واکنش پلیمری شدن",
    ]),
  ],
  year3: [
    chapter("sub_chem", "year3", 1, "فصل ۱: مولکول‌ها در خدمت تندرستی", [
      "داروها",
      "اسیدها و بازها",
      "pH",
      "تعادل شیمیایی",
    ]),
    chapter("sub_chem", "year3", 2, "فصل ۲: آسایش و رفاه در سایه شیمی", [
      "واکنش‌های شیمیایی",
      "انرژی واکنش",
      "سرعت واکنش",
      "تعادل",
    ]),
    chapter("sub_chem", "year3", 3, "فصل ۳: شیمی جلوه‌ای از هنر، زیبایی و ماندگاری", [
      "رنگ‌ها",
      "پلیمرها",
      "مواد مصنوعی",
      "مواد جدید",
    ]),
    chapter("sub_chem", "year3", 4, "فصل ۴: شیمی راهی به سوی آینده روشن‌تر", [
      "الکتروشیمی",
      "سلول گالوانی",
      "باتری‌ها",
      "اکسایش و کاهش",
      "الکترولیز",
    ]),
  ],
};

const PHYSICS_CURRICULUM: Record<GradeKey, StudyChapterNode[]> = {
  year1: [
    chapter("sub_physics", "year1", 1, "فصل ۱: فیزیک و اندازه‌گیری", [
      "کمیت‌های فیزیکی",
      "یکاها",
      "تبدیل واحد",
      "اندازه‌گیری",
    ]),
    chapter("sub_physics", "year1", 2, "فصل ۲: ویژگی‌های فیزیکی مواد", [
      "چگالی",
      "فشار",
      "فشار در مایعات",
      "شناوری",
    ]),
    chapter("sub_physics", "year1", 3, "فصل ۳: کار، انرژی و توان", [
      "کار",
      "انرژی جنبشی",
      "انرژی پتانسیل",
      "توان",
    ]),
    chapter("sub_physics", "year1", 4, "فصل ۴: دما و گرما", [
      "دما",
      "گرما",
      "تعادل گرمایی",
      "انتقال گرما",
    ]),
  ],
  year2: [
    chapter("sub_physics", "year2", 1, "فصل ۱: الکتریسیته ساکن", [
      "بار الکتریکی",
      "قانون کولن",
      "میدان الکتریکی",
      "پتانسیل الکتریکی",
      "خازن",
    ]),
    chapter("sub_physics", "year2", 2, "فصل ۲: جریان الکتریکی", [
      "جریان الکتریکی",
      "مقاومت",
      "قانون اهم",
      "مدارهای الکتریکی",
      "مدار سری و موازی",
      "توان الکتریکی",
    ]),
    chapter("sub_physics", "year2", 3, "فصل ۳: مغناطیس", [
      "میدان مغناطیسی",
      "آهنربا",
      "نیروی مغناطیسی",
      "حرکت ذرات باردار در میدان مغناطیسی",
    ]),
    chapter("sub_physics", "year2", 4, "فصل ۴: القای الکترومغناطیسی", [
      "شار مغناطیسی",
      "قانون فاراده",
      "قانون لنز",
      "مولدها",
      "جریان القایی",
    ]),
  ],
  year3: [
    chapter("sub_physics", "year3", 1, "فصل ۱: حرکت بر خط راست", [
      "مکان",
      "جابه‌جایی",
      "سرعت",
      "شتاب",
      "نمودار حرکت",
    ]),
    chapter("sub_physics", "year3", 2, "فصل ۲: دینامیک", [
      "نیرو",
      "قوانین نیوتن",
      "اصطکاک",
      "حرکت دایره‌ای",
    ]),
    chapter("sub_physics", "year3", 3, "فصل ۳: نوسان و موج", [
      "حرکت نوسانی",
      "دوره و بسامد",
      "موج",
      "صوت",
    ]),
    chapter("sub_physics", "year3", 4, "فصل ۴: برهم‌کنش‌های موج", [
      "بازتاب موج",
      "شکست موج",
      "تداخل",
      "پراش",
    ]),
    chapter("sub_physics", "year3", 5, "فصل ۵: آشنایی با فیزیک اتمی و هسته‌ای", [
      "مدل اتمی",
      "فوتون",
      "کوانتوم",
      "رادیواکتیویته",
      "انرژی هسته‌ای",
    ]),
  ],
};

const MATH_CURRICULUM: Record<GradeKey, StudyChapterNode[]> = {
  year1: [
    chapter("sub_math", "year1", 1, "فصل ۱: مجموعه، الگو و دنباله", [
      "مجموعه‌ها",
      "بازه‌ها",
      "الگوهای عددی",
      "دنباله",
    ]),
    chapter("sub_math", "year1", 2, "فصل ۲: مثلثات", [
      "نسبت‌های مثلثاتی",
      "سینوس",
      "کسینوس",
      "تانژانت",
    ]),
    chapter("sub_math", "year1", 3, "فصل ۳: توان‌های گویا و عبارت‌های جبری", [
      "توان",
      "رادیکال",
      "اتحادها",
      "تجزیه",
    ]),
    chapter("sub_math", "year1", 4, "فصل ۴: معادله‌ها و نامعادله‌ها", [
      "معادله درجه دوم",
      "نامعادله",
      "قدرمطلق",
    ]),
    chapter("sub_math", "year1", 5, "فصل ۵: تابع", [
      "تعریف تابع",
      "دامنه",
      "برد",
      "نمودار تابع",
    ]),
    chapter("sub_math", "year1", 6, "فصل ۶: شمارش", [
      "اصل ضرب",
      "جایگشت",
      "ترکیب",
    ]),
    chapter("sub_math", "year1", 7, "فصل ۷: آمار و احتمال", [
      "داده‌ها",
      "میانگین",
      "احتمال",
    ]),
  ],
  year2: [
    chapter("sub_math", "year2", 1, "فصل ۱: هندسه تحلیلی و جبر", [
      "مختصات",
      "فاصله دو نقطه",
      "معادله خط",
      "شیب خط",
      "دایره",
    ]),
    chapter("sub_math", "year2", 2, "فصل ۲: هندسه", [
      "تشابه",
      "روابط طولی",
      "قضیه تالس",
      "کاربردهای هندسه",
    ]),
    chapter("sub_math", "year2", 3, "فصل ۳: تابع", [
      "انواع تابع",
      "ترکیب تابع",
      "تابع وارون",
      "نمودار تابع",
    ]),
    chapter("sub_math", "year2", 4, "فصل ۴: مثلثات", [
      "روابط مثلثاتی",
      "توابع مثلثاتی",
      "معادلات مثلثاتی",
    ]),
    chapter("sub_math", "year2", 5, "فصل ۵: توابع نمایی و لگاریتمی", [
      "تابع نمایی",
      "تابع لگاریتمی",
      "خواص لگاریتم",
    ]),
    chapter("sub_math", "year2", 6, "فصل ۶: حد و پیوستگی", [
      "مفهوم حد",
      "محاسبه حد",
      "پیوستگی",
    ]),
    chapter("sub_math", "year2", 7, "فصل ۷: آمار و احتمال", [
      "احتمال",
      "شمارش",
      "میانگین",
      "واریانس",
    ]),
  ],
  year3: [
    chapter("sub_math", "year3", 1, "فصل ۱: تابع", [
      "تابع چندجمله‌ای",
      "تابع نمایی",
      "تابع لگاریتمی",
      "ترکیب توابع",
    ]),
    chapter("sub_math", "year3", 2, "فصل ۲: مثلثات", [
      "روابط مثلثاتی",
      "معادلات مثلثاتی",
      "نمودار توابع مثلثاتی",
    ]),
    chapter("sub_math", "year3", 3, "فصل ۳: حد و پیوستگی", [
      "حدهای یک‌طرفه",
      "حد بی‌نهایت",
      "رفع ابهام",
    ]),
    chapter("sub_math", "year3", 4, "فصل ۴: مشتق", [
      "مفهوم مشتق",
      "قواعد مشتق‌گیری",
      "مشتق توابع",
    ]),
    chapter("sub_math", "year3", 5, "فصل ۵: کاربرد مشتق", [
      "صعود و نزول تابع",
      "نقاط بحرانی",
      "بیشینه و کمینه",
      "رسم نمودار",
    ]),
    chapter("sub_math", "year3", 6, "فصل ۶: احتمال", [
      "احتمال شرطی",
      "متغیر تصادفی",
      "توزیع احتمال",
    ]),
  ],
};

export const CURRICULUM: Record<string, Record<GradeKey, StudyChapterNode[]>> = {
  sub_bio: BIO_CURRICULUM,
  sub_chem: CHEM_CURRICULUM,
  sub_physics: PHYSICS_CURRICULUM,
  sub_math: MATH_CURRICULUM,
};

export const SUBJECT_FULL_NAMES: Record<string, string> = {
  sub_bio: "زیست‌شناسی",
  sub_chem: "شیمی",
  sub_physics: "فیزیک",
  sub_math: "ریاضی",
};

export const GRADE_LABELS: Record<GradeKey, string> = {
  year1: "دهم",
  year2: "یازدهم",
  year3: "دوازدهم",
};

export function getChaptersForSection(
  subjectId: string,
  section: SubjectTestSection
): StudyChapterNode[] {
  const subject = CURRICULUM[subjectId];
  if (!subject) return [];

  if (section === "year1" || section === "year2" || section === "year3") {
    return subject[section];
  }

  const prefix = section === "konkur_talfiyi" ? "talfiyi" : "sarasari";
  return (["year1", "year2", "year3"] as const).flatMap((grade) =>
    subject[grade].map((ch) => ({
      ...ch,
      id: `${ch.id}_${prefix}`,
      progressPercent: Math.max(15, ch.progressPercent - 6),
    }))
  );
}
