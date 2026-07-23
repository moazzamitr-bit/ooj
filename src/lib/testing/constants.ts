import type { TestDifficulty } from "@/lib/data/study-structure-data";
import type { TestMode } from "@/types/test-session";

/** حداقل سوال برای جلسهٔ معتبر (پاداش و بازی) */
export const MIN_VALID_SESSION_QUESTIONS = 10;

/** سقف شانس روزانه برای هر نوع پاداش */
export const DAILY_REWARD_CAPS = {
  practice: 3,
  exam_pass: 3,
  mistake_clear: 2,
} as const;

export const PRACTICE_CHANCE_REWARD = 1;
export const EXAM_PASS_CHANCE_REWARD = 2;
export const MISTAKE_CLEAR_BATCH = 5;
export const MISTAKE_CLEAR_CHANCE_REWARD = 1;
export const MISTAKE_MASTERY_STREAK = 2;

export const PRACTICE_COUNTS = [10, 20, 30] as const;

export const EXAM_QUESTION_COUNT: Record<TestDifficulty, number> = {
  simple: 20,
  medium: 20,
  hard: 25,
  konkur: 30,
};

/** حداکثر نسبت غلط برای قبولی (سبک DGT) */
export const PASS_MAX_ERROR_RATIO: Record<TestDifficulty, number> = {
  simple: 0.2,
  medium: 0.15,
  hard: 0.1,
  konkur: 0.1,
};

export const EXAM_SECONDS_PER_QUESTION = 60;

export const MODE_LABELS: Record<TestMode, string> = {
  practice: "تمرین موضوعی",
  exam: "آزمون شبیه‌سازی",
  mistake_review: "مرور غلط‌ها",
};

export function getPassThreshold(difficulty: TestDifficulty, total: number) {
  const maxErrors = Math.floor(total * PASS_MAX_ERROR_RATIO[difficulty]);
  return {
    maxErrors,
    minCorrect: total - maxErrors,
    passPercent: Math.round(((total - maxErrors) / total) * 100),
  };
}

export function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}
