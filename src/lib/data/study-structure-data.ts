import type { SubjectTestSection } from "@/components/dashboard/subject-card";
import { mockChapters } from "@/lib/data/mock-data";

export type TestDifficulty = "simple" | "medium" | "hard" | "konkur";

export const TEST_DIFFICULTIES: { id: TestDifficulty; label: string }[] = [
  { id: "simple", label: "ساده" },
  { id: "medium", label: "متوسط" },
  { id: "hard", label: "سخت" },
  { id: "konkur", label: "کنکور" },
];

export interface StudyTopicNode {
  id: string;
  title: string;
}

export interface StudyChapterNode {
  id: string;
  title: string;
  topics: StudyTopicNode[];
}

const SECTION_LABELS: Record<SubjectTestSection, string> = {
  year1: "سال اول",
  year2: "سال دوم",
  year3: "سال سوم",
  konkur_talfiyi: "کنکور تالیفی",
  konkur_sarasari: "کنکور سراسری",
};

/** موضوعات نمونه شیمی سال سوم — فصل ۱ مطابق mockup */
const CHEM_YEAR3_CHAPTER1_TOPICS: StudyTopicNode[] = [
  { id: "top_chem_y3_c1_1", title: "هسته اتم" },
  { id: "top_chem_y3_c1_2", title: "ترازهای انرژی" },
  { id: "top_chem_y3_c1_3", title: "ظرفیت عناصر" },
  { id: "top_chem_y3_c1_4", title: "خواص عناصر" },
];

const TOPIC_TEMPLATES: Record<string, string[][]> = {
  sub_chem: [
    ["ساختار اتم", "ایزوتوپ‌ها", "پرتوها", "مدل‌های اتمی"],
    ["لایه الکترونی", "تراز انرژی", "آرایش الکترونی", "یونش"],
    ["جدول تناوبی", "خواص دوره‌ای", "خواص گروهی", "شعاع اتمی"],
    ["موازنه واکنش", "ضرایب", "واکنش‌های شیمیایی", "استوکیومتری"],
    ["اکسیداسیون", "احیا", "نیمه‌واکنش", "سلول گالوانی"],
  ],
  sub_bio: [
    ["نورون", "سیناپس", "رفلاکس", "اعصاب"],
    ["هورمون", "غده‌ها", "بازخورد", "تنظیم"],
    ["ایمنی ذاتی", "ایمنی اکتسابی", "آنتی‌ژن", "پادتن"],
  ],
  sub_physics: [
    ["خطا", "دقت", "ابزار", "واحد"],
    ["نیرو", "شتاب", "جرم", "اصطکاک"],
    ["کار", "انرژی", "توان", "بقای انرژی"],
  ],
  sub_math: [
    ["تعریف مجموعه", "عملیات", "نمودار ون", "بازه"],
    ["نسبت‌ها", "دایره مثلثاتی", "توابع", "معادلات"],
    ["دامنه", "برد", "نمودار", "توابع ترکیبی"],
  ],
};

function chapterCountForSection(section: SubjectTestSection): number {
  if (section === "year1") return 3;
  if (section === "year2") return 3;
  if (section === "year3") return 3;
  return 2;
}

function topicsForChapter(
  subjectId: string,
  section: SubjectTestSection,
  chapterIndex: number,
  chapterId: string
): StudyTopicNode[] {
  if (subjectId === "sub_chem" && section === "year3" && chapterIndex === 0) {
    return CHEM_YEAR3_CHAPTER1_TOPICS;
  }

  const templates = TOPIC_TEMPLATES[subjectId] ?? TOPIC_TEMPLATES.sub_chem;
  const row = templates[chapterIndex % templates.length] ?? templates[0];

  return row.map((title, i) => ({
    id: `${chapterId}_topic_${i + 1}`,
    title,
  }));
}

export function getSectionLabel(section: SubjectTestSection): string {
  return SECTION_LABELS[section];
}

export function getYearStudyStructure(
  subjectId: string,
  subjectName: string,
  section: SubjectTestSection
): { title: string; chapters: StudyChapterNode[] } {
  const allChapters = mockChapters[subjectId] ?? [];
  const count = Math.min(chapterCountForSection(section), allChapters.length);
  const chapters = allChapters.slice(0, count);

  return {
    title: `${subjectName} ${SECTION_LABELS[section]}`,
    chapters: chapters.map((chapter, index) => ({
      id: `${chapter.id}_${section}`,
      title: `فصل ${index + 1}`,
      topics: topicsForChapter(subjectId, section, index, chapter.id),
    })),
  };
}
