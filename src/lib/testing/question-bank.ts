import { mockQuestions, mockSubjects } from "@/lib/data/mock-data";
import type { TestDifficulty } from "@/lib/data/study-structure-data";
import type { Question } from "@/types";
import type { TestMode } from "@/types/test-session";

const DIFFICULTY_FA: Record<TestDifficulty, Question["difficulty"]> = {
  simple: "آسان",
  medium: "متوسط",
  hard: "سخت",
  konkur: "سخت",
};

const TEMPLATES: Array<{
  stem: string;
  options: [string, string, string, string];
  correct: Question["correct_option"];
  explanation: string;
}> = [
  {
    stem: "کدام گزینه دربارهٔ «{topic}» درست است؟",
    options: [
      "تعریف و کاربرد اصلی آن درست بیان شده",
      "هیچ ربطی به این مبحث ندارد",
      "فقط در موارد استثنایی درست است",
      "کاملاً نادرست است",
    ],
    correct: "a",
    explanation: "گزینهٔ اول تعریف و کاربرد اصلی مبحث را درست بیان می‌کند.",
  },
  {
    stem: "در مبحث «{topic}»، کدام نتیجه‌گیری صحیح است؟",
    options: [
      "نتیجه وابسته به شرایط خاص است",
      "نتیجهٔ استاندارد و پذیرفته‌شده همین است",
      "نتیجه همیشه غلط است",
      "اصلاً قابل بررسی نیست",
    ],
    correct: "b",
    explanation: "در چارچوب استاندارد کتاب درسی، گزینهٔ دوم نتیجهٔ درست است.",
  },
  {
    stem: "اگر در «{topic}» اشتباه رایجی رخ دهد، علت اصلی معمولاً چیست؟",
    options: [
      "بی‌توجهی به واحدها",
      "فراموشی فرمول",
      "جا‌به‌جایی مفهوم کلیدی",
      "همه موارد می‌تواند باشد",
    ],
    correct: "d",
    explanation: "اشتباهات رایج اغلب ترکیبی از واحد، فرمول و مفهوم هستند.",
  },
  {
    stem: "کدام مسیر برای تسلط بر «{topic}» منطقی‌تر است؟",
    options: [
      "فقط حفظ کردن گزینه‌ها",
      "خواندن مفهوم + حل تمرین هدفمند",
      "رد شدن از تست‌های سخت",
      "حذف کامل مبحث",
    ],
    correct: "b",
    explanation: "ترکیب مفهوم و تمرین هدفمند پایدارترین مسیر تسلط است.",
  },
  {
    stem: "در سطح {difficulty}، کدام توصیف از «{topic}» دقیق‌تر است؟",
    options: [
      "مفهوم پایه و پیش‌نیاز فصل",
      "موضوع فرعی بدون کاربرد",
      "فقط برای کنکور مهم است",
      "در کتاب درسی نیست",
    ],
    correct: "a",
    explanation: "این مبحث معمولاً پایهٔ فهم فصل و پیش‌نیاز تست‌های بعدی است.",
  },
];

function subjectName(subjectId: string) {
  return mockSubjects.find((s) => s.id === subjectId)?.name ?? "درس";
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function makeGeneratedQuestion(input: {
  index: number;
  subjectId: string;
  chapterId: string;
  topicId: string | null;
  topicTitle: string;
  difficulty: TestDifficulty;
}): Question {
  const template = TEMPLATES[input.index % TEMPLATES.length];
  const difficultyFa = DIFFICULTY_FA[input.difficulty];
  const topic = input.topicTitle || "این فصل";
  const stem = template.stem
    .replaceAll("{topic}", topic)
    .replaceAll("{difficulty}", difficultyFa);

  return {
    id: `gen_${input.subjectId}_${input.chapterId}_${input.topicId ?? "ch"}_${input.difficulty}_${input.index}`,
    subject_id: input.subjectId,
    chapter_id: input.chapterId,
    subchapter_id: input.topicId ?? `${input.chapterId}_sc`,
    question_text: stem,
    option_a: template.options[0],
    option_b: template.options[1],
    option_c: template.options[2],
    option_d: template.options[3],
    correct_option: template.correct,
    explanation: `${template.explanation} (مبحث: ${topic} — ${subjectName(input.subjectId)})`,
    difficulty: difficultyFa,
    source_year: 1403,
    suggested_time_seconds: input.difficulty === "konkur" ? 75 : 55,
    tags: [subjectName(input.subjectId), topic, difficultyFa],
  };
}

/** بانک پایه + سوالات تولیدشده برای پوشش درخت مطالعه */
export function getAllBaseQuestions(): Question[] {
  return mockQuestions;
}

export function buildSessionQuestions(input: {
  mode: TestMode;
  subjectId: string;
  chapterId: string;
  topicId: string | null;
  topicTitle?: string;
  difficulty: TestDifficulty;
  count: number;
  mistakeQuestionIds?: string[];
  seedBank?: Question[];
}): Question[] {
  const bank = input.seedBank?.length ? input.seedBank : getAllBaseQuestions();
  const difficultyFa = DIFFICULTY_FA[input.difficulty];

  if (input.mode === "mistake_review" && input.mistakeQuestionIds?.length) {
    const mistakes = input.mistakeQuestionIds
      .map((id) => bank.find((q) => q.id === id) ?? regenerateFromId(id, input))
      .filter(Boolean) as Question[];
    return shuffle(mistakes).slice(0, Math.max(1, input.count));
  }

  const subjectMatched = bank.filter((q) => q.subject_id === input.subjectId);
  const difficultyMatched = subjectMatched.filter((q) => q.difficulty === difficultyFa);
  const chapterMatched = difficultyMatched.filter(
    (q) => q.chapter_id === input.chapterId || q.chapter_id.startsWith(input.subjectId)
  );

  let pool = shuffle(
    chapterMatched.length >= 3
      ? chapterMatched
      : difficultyMatched.length >= 2
        ? difficultyMatched
        : subjectMatched.length > 0
          ? subjectMatched
          : bank
  );

  const needed = Math.max(1, input.count);
  const out: Question[] = [];
  const topicTitle = input.topicTitle ?? "مبحث انتخاب‌شده";

  for (let i = 0; out.length < needed; i += 1) {
    if (i < pool.length) {
      const base = pool[i];
      out.push({
        ...base,
        id: `${base.id}__${input.chapterId}__${input.topicId ?? "t"}__${i}`,
        subject_id: input.subjectId,
        chapter_id: input.chapterId,
        subchapter_id: input.topicId ?? base.subchapter_id,
        difficulty: difficultyFa,
        tags: [...new Set([...(base.tags ?? []), topicTitle, difficultyFa])],
      });
    } else {
      out.push(
        makeGeneratedQuestion({
          index: i,
          subjectId: input.subjectId,
          chapterId: input.chapterId,
          topicId: input.topicId,
          topicTitle,
          difficulty: input.difficulty,
        })
      );
    }
  }

  return out;
}

function regenerateFromId(
  id: string,
  input: {
    subjectId: string;
    chapterId: string;
    topicId: string | null;
    topicTitle?: string;
    difficulty: TestDifficulty;
  }
): Question | null {
  if (!id.startsWith("gen_")) return null;
  return makeGeneratedQuestion({
    index: Math.abs(hash(id)) % 50,
    subjectId: input.subjectId,
    chapterId: input.chapterId,
    topicId: input.topicId,
    topicTitle: input.topicTitle ?? "مرور غلط",
    difficulty: input.difficulty,
  });
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}
