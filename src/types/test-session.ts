import type { TestDifficulty } from "@/lib/data/study-structure-data";

export type TestMode = "practice" | "exam" | "mistake_review";

export type AnswerOption = "a" | "b" | "c" | "d";

export interface MistakeItem {
  question_id: string;
  student_id: string;
  subject_id: string;
  chapter_id: string;
  topic_id: string | null;
  wrong_count: number;
  streak_correct: number;
  last_seen: string;
  mastered: boolean;
}

export interface TestSessionRecord {
  id: string;
  student_id: string;
  mode: TestMode;
  subject_id: string;
  chapter_id: string;
  topic_id: string | null;
  difficulty: TestDifficulty;
  question_ids: string[];
  answers: Record<string, AnswerOption>;
  correct_count: number;
  total: number;
  passed: boolean | null;
  duration_seconds: number;
  chances_awarded: number;
  created_at: string;
}

export interface DailyTestRewards {
  date: string;
  practice: number;
  exam_pass: number;
  mistake_clear: number;
}

export interface TestSessionConfig {
  mode: TestMode;
  subjectId: string;
  chapterId: string;
  topicId: string | null;
  difficulty: TestDifficulty;
  count: number;
  subjectName?: string;
  chapterTitle?: string;
  topicTitle?: string;
}

export interface TestSessionResult {
  session: TestSessionRecord;
  chancesAwarded: number;
  rewardReason: string | null;
  masteredMistakeCount: number;
  albertoTip: string | null;
}
