import {
  addStudentChances,
  bumpDailyTestReward,
  ensureQuestionsPersisted,
  getDailyTestRewards,
  getMistakeBank,
  hasValidTestToday,
  loadLocalDb,
  recordQuizAnswers,
  saveTestSessionRecord,
  upsertMistakesFromAnswers,
} from "@/lib/local-db";
import type { TestDifficulty } from "@/lib/data/study-structure-data";
import { buildSessionQuestions } from "@/lib/testing/question-bank";
import {
  DAILY_REWARD_CAPS,
  EXAM_PASS_CHANCE_REWARD,
  EXAM_QUESTION_COUNT,
  EXAM_SECONDS_PER_QUESTION,
  getPassThreshold,
  MIN_VALID_SESSION_QUESTIONS,
  MISTAKE_CLEAR_BATCH,
  MISTAKE_CLEAR_CHANCE_REWARD,
  MISTAKE_MASTERY_STREAK,
  PRACTICE_CHANCE_REWARD,
  todayKey,
} from "@/lib/testing/constants";
import type { Question } from "@/types";
import type {
  AnswerOption,
  TestMode,
  TestSessionConfig,
  TestSessionRecord,
  TestSessionResult,
} from "@/types/test-session";

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function resolveQuestionCount(mode: TestMode, difficulty: TestDifficulty, count?: number) {
  if (mode === "exam") return EXAM_QUESTION_COUNT[difficulty];
  if (mode === "mistake_review") return Math.min(15, Math.max(5, count ?? 10));
  return count && count > 0 ? count : 10;
}

export function getExamDurationSeconds(difficulty: TestDifficulty, count: number) {
  return count * EXAM_SECONDS_PER_QUESTION;
}

export function createPracticeQuestionSet(config: TestSessionConfig): Question[] {
  const count = resolveQuestionCount(config.mode, config.difficulty, config.count);
  const db = typeof window !== "undefined" ? loadLocalDb() : null;
  const mistakeIds =
    config.mode === "mistake_review" && config.subjectId
      ? getMistakeBank(
          // student resolved at submit time; for building we need studentId in config later
          (config as TestSessionConfig & { studentId?: string }).studentId ?? "student_1",
          config.subjectId
        ).map((m) => m.question_id)
      : undefined;

  return buildSessionQuestions({
    mode: config.mode,
    subjectId: config.subjectId,
    chapterId: config.chapterId,
    topicId: config.topicId,
    topicTitle: config.topicTitle,
    difficulty: config.difficulty,
    count,
    mistakeQuestionIds: mistakeIds,
    seedBank: db?.questions,
  });
}

export function buildQuestionsForStudent(
  studentId: string,
  config: TestSessionConfig
): Question[] {
  const count = resolveQuestionCount(config.mode, config.difficulty, config.count);
  const db = loadLocalDb();
  const mistakeIds =
    config.mode === "mistake_review"
      ? getMistakeBank(studentId, config.subjectId).map((m) => m.question_id)
      : undefined;

  if (config.mode === "mistake_review" && (!mistakeIds || mistakeIds.length === 0)) {
    return [];
  }

  return buildSessionQuestions({
    mode: config.mode,
    subjectId: config.subjectId,
    chapterId: config.chapterId,
    topicId: config.topicId,
    topicTitle: config.topicTitle,
    difficulty: config.difficulty,
    count: config.mode === "mistake_review" ? Math.min(count, mistakeIds!.length) : count,
    mistakeQuestionIds: mistakeIds,
    seedBank: db.questions,
  });
}

export function evaluateAnswers(
  questions: Question[],
  answers: Record<string, AnswerOption>
) {
  let correct = 0;
  const scored = questions.map((q) => {
    const selected = answers[q.id];
    const isCorrect = selected != null && selected === q.correct_option;
    if (isCorrect) correct += 1;
    return {
      questionId: q.id,
      selected: selected ?? "",
      isCorrect,
      timeSpent: q.suggested_time_seconds,
    };
  });
  return { correct, total: questions.length, scored };
}

function computeRewards(input: {
  studentId: string;
  mode: TestMode;
  total: number;
  passed: boolean | null;
  newlyMastered: number;
}): { chances: number; reason: string | null } {
  const date = todayKey();
  const daily = getDailyTestRewards(input.studentId, date);
  let chances = 0;
  const reasons: string[] = [];

  if (
    input.mode === "practice" &&
    input.total >= MIN_VALID_SESSION_QUESTIONS &&
    daily.practice < DAILY_REWARD_CAPS.practice
  ) {
    chances += PRACTICE_CHANCE_REWARD;
    bumpDailyTestReward(input.studentId, date, "practice");
    reasons.push(`تمرین موضوعی (+${PRACTICE_CHANCE_REWARD} شانس)`);
  }

  if (
    input.mode === "exam" &&
    input.passed &&
    daily.exam_pass < DAILY_REWARD_CAPS.exam_pass
  ) {
    chances += EXAM_PASS_CHANCE_REWARD;
    bumpDailyTestReward(input.studentId, date, "exam_pass");
    reasons.push(`قبولی آزمون شبیه‌سازی (+${EXAM_PASS_CHANCE_REWARD} شانس)`);
  }

  if (input.newlyMastered > 0) {
    const batches = Math.floor(input.newlyMastered / MISTAKE_CLEAR_BATCH);
    const canAward = Math.min(batches, DAILY_REWARD_CAPS.mistake_clear - daily.mistake_clear);
    if (canAward > 0) {
      chances += canAward * MISTAKE_CLEAR_CHANCE_REWARD;
      bumpDailyTestReward(input.studentId, date, "mistake_clear", canAward);
      reasons.push(`پاک‌سازی بانک ضعف (+${canAward * MISTAKE_CLEAR_CHANCE_REWARD} شانس)`);
    }
  }

  return {
    chances,
    reason: reasons.length ? reasons.join(" · ") : null,
  };
}

function albertoTip(input: {
  mode: TestMode;
  passed: boolean | null;
  accuracy: number;
  subjectName?: string;
  hasMistakes: boolean;
}): string | null {
  if (input.mode === "exam" && input.passed === false) {
    return "مردود شدی؛ نگران نباش. اول مرور غلط‌ها را بزن، بعد دوباره همان آزمون را امتحان کن.";
  }
  if (input.accuracy < 70 && input.hasMistakes) {
    return `دقتت روی ${input.subjectName ?? "این درس"} هنوز پایین است. یک تمرین ۱۰ سوالی از بانک غلط‌ها شروع کن.`;
  }
  if (input.mode === "exam" && input.passed) {
    return "قبول شدی! حالا می‌توانی سراغ مبحث بعدی یا یک آزمون سخت‌تر بروی.";
  }
  return null;
}

export function submitTestSession(input: {
  studentId: string;
  config: TestSessionConfig;
  questions: Question[];
  answers: Record<string, AnswerOption>;
  durationSeconds: number;
}): TestSessionResult {
  const { correct, total, scored } = evaluateAnswers(input.questions, input.answers);
  const answered = scored.filter((s) => s.selected);
  const threshold = getPassThreshold(input.config.difficulty, total);
  const passed =
    input.config.mode === "exam" ? correct >= threshold.minCorrect : null;

  ensureQuestionsPersisted(input.questions);

  const { newlyMastered } = upsertMistakesFromAnswers(
    input.studentId,
    answered.map((a) => ({
      questionId: a.questionId,
      subjectId: input.config.subjectId,
      chapterId: input.config.chapterId,
      topicId: input.config.topicId,
      isCorrect: a.isCorrect,
    })),
    MISTAKE_MASTERY_STREAK
  );

  // Persist answers without auto +1 chance (rewards handled below)
  if (answered.length > 0) {
    recordQuizAnswers(
      input.studentId,
      answered.map((a) => ({
        questionId: a.questionId,
        selected: a.selected,
        isCorrect: a.isCorrect,
        timeSpent: Math.max(5, Math.round(input.durationSeconds / Math.max(1, answered.length))),
      })),
      {
        subjectId: input.config.subjectId,
        chapterId: input.config.chapterId,
        awardChance: false,
      }
    );
  }

  const reward = computeRewards({
    studentId: input.studentId,
    mode: input.config.mode,
    total: answered.length,
    passed,
    newlyMastered,
  });

  if (reward.chances > 0) {
    addStudentChances(input.studentId, reward.chances);
  }

  const session: TestSessionRecord = {
    id: uid("ts"),
    student_id: input.studentId,
    mode: input.config.mode,
    subject_id: input.config.subjectId,
    chapter_id: input.config.chapterId,
    topic_id: input.config.topicId,
    difficulty: input.config.difficulty,
    question_ids: input.questions.map((q) => q.id),
    answers: input.answers,
    correct_count: correct,
    total,
    passed,
    duration_seconds: input.durationSeconds,
    chances_awarded: reward.chances,
    created_at: new Date().toISOString(),
  };

  saveTestSessionRecord(session);

  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const openMistakes = getMistakeBank(input.studentId, input.config.subjectId).length;

  return {
    session,
    chancesAwarded: reward.chances,
    rewardReason: reward.reason,
    masteredMistakeCount: newlyMastered,
    albertoTip: albertoTip({
      mode: input.config.mode,
      passed,
      accuracy,
      subjectName: input.config.subjectName,
      hasMistakes: openMistakes > 0,
    }),
  };
}

export function studentHasValidTestToday(studentId: string) {
  return hasValidTestToday(studentId, MIN_VALID_SESSION_QUESTIONS);
}

export function countOpenMistakes(studentId: string, subjectId?: string) {
  return getMistakeBank(studentId, subjectId).length;
}

export function getContinuePracticeHref(studentId: string): string | null {
  const mistakes = getMistakeBank(studentId);
  if (mistakes.length > 0) {
    const m = mistakes[0];
    const params = new URLSearchParams({
      mode: "mistake_review",
      subjectId: m.subject_id,
      chapterId: m.chapter_id,
      topicId: m.topic_id ?? "",
      difficulty: "medium",
    });
    return `/student/practice/?${params.toString()}`;
  }

  const sessions = loadLocalDb().test_sessions.filter((s) => s.student_id === studentId);
  if (sessions.length === 0) return null;
  const last = sessions[0];
  const params = new URLSearchParams({
    mode: "practice",
    subjectId: last.subject_id,
    chapterId: last.chapter_id,
    topicId: last.topic_id ?? "",
    difficulty: last.difficulty,
    count: "10",
  });
  return `/student/practice/?${params.toString()}`;
}
