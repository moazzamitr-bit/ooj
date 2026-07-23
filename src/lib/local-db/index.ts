import type {
  AdmissionRankData,
  Chapter,
  InvitedFriend,
  ParentDailyReport,
  Question,
  Referral,
  Student,
  StudySession,
  Subchapter,
  Subject,
  User,
} from "@/types";
import type {
  DailyTestRewards,
  MistakeItem,
  TestSessionRecord,
} from "@/types/test-session";
import {
  admissionRankData,
  mockChapters,
  mockQuestions,
  mockReferrals,
  mockStudent,
  mockSubjects,
  mockSubchapters,
  parentDailyReport,
} from "@/lib/data/mock-data";
import {
  chemChaptersMockup,
  profileStudentDisplay,
  profileSubjectProgress,
} from "@/lib/data/profile-mock-data";

const DB_KEY = "owj_local_db_v1";
const AUTH_KEY = "owj_auth_session";

export interface LocalDatabase {
  users: User[];
  students: Student[];
  subjects: Subject[];
  chapters: Record<string, Chapter[]>;
  subchapters: Record<string, Subchapter[]>;
  questions: Question[];
  answers: Array<{
    id: string;
    student_id: string;
    question_id: string;
    selected_option: string;
    is_correct: boolean;
    time_spent_seconds: number;
    created_at: string;
  }>;
  study_sessions: StudySession[];
  test_sessions: TestSessionRecord[];
  mistakes: MistakeItem[];
  daily_test_rewards: Record<string, DailyTestRewards>;
  referrals: Referral[];
  admission_ranks: AdmissionRankData[];
  chapter_progress: Record<string, Record<string, number>>;
  wallet_balance: Record<string, number>;
  quiz_completed: Record<string, boolean>;
  otp_codes: Record<string, { code: string; expires_at: number }>;
}

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function mergeSubjects(existing: Subject[] | undefined, defaults: Subject[]): Subject[] {
  if (!existing?.length) return defaults;
  const byId = new Map(existing.map((subject) => [subject.id, subject]));
  for (const subject of defaults) {
    if (!byId.has(subject.id)) byId.set(subject.id, subject);
  }
  return defaults.map((subject) => byId.get(subject.id) ?? subject);
}

function defaultDb(): LocalDatabase {
  const studentId = mockStudent.id;
  const chapters: Record<string, Chapter[]> = { ...mockChapters };

  if (chapters.sub_chem) {
    chapters.sub_chem = chemChaptersMockup.map((ch, i) => ({
      id: ch.id,
      subject_id: "sub_chem",
      title: ch.title,
      order_index: i + 1,
      test_progress_percent: ch.percent,
      study_progress_percent: ch.percent,
    }));
  }

  return {
    users: [
      {
        id: mockStudent.user_id,
        phone: "09121234567",
        role: "student",
        created_at: mockStudent.created_at,
      },
    ],
    students: [{ ...mockStudent }],
    subjects: mockSubjects,
    chapters,
    subchapters: mockSubchapters,
    questions: mockQuestions,
    answers: [],
    study_sessions: [],
    test_sessions: [],
    mistakes: [],
    daily_test_rewards: {},
    referrals: mockReferrals,
    admission_ranks: admissionRankData,
    chapter_progress: {
      [studentId]: Object.fromEntries(
        chemChaptersMockup.map((c) => [c.id, c.percent])
      ),
    },
    wallet_balance: { [studentId]: 0 },
    quiz_completed: { [studentId]: false },
    otp_codes: {},
  };
}

export function loadLocalDb(): LocalDatabase {
  if (typeof window === "undefined") return defaultDb();
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    const db = defaultDb();
    saveLocalDb(db);
    return db;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<LocalDatabase>;
    const defaults = defaultDb();
    const db: LocalDatabase = {
      ...defaults,
      ...parsed,
      users: parsed.users?.length ? parsed.users : defaults.users,
      students: parsed.students?.length ? parsed.students : defaults.students,
      subjects: mergeSubjects(parsed.subjects, defaults.subjects),
      chapters: { ...defaults.chapters, ...parsed.chapters },
      subchapters: { ...defaults.subchapters, ...parsed.subchapters },
      questions: parsed.questions?.length ? parsed.questions : defaults.questions,
      answers: parsed.answers ?? defaults.answers,
      study_sessions: parsed.study_sessions ?? defaults.study_sessions,
      test_sessions: parsed.test_sessions ?? defaults.test_sessions,
      mistakes: parsed.mistakes ?? defaults.mistakes,
      daily_test_rewards: parsed.daily_test_rewards ?? defaults.daily_test_rewards,
      referrals: parsed.referrals ?? defaults.referrals,
      admission_ranks: parsed.admission_ranks?.length ? parsed.admission_ranks : defaults.admission_ranks,
      chapter_progress: { ...defaults.chapter_progress, ...parsed.chapter_progress },
      wallet_balance: { ...defaults.wallet_balance, ...parsed.wallet_balance },
      quiz_completed: { ...defaults.quiz_completed, ...parsed.quiz_completed },
      otp_codes: parsed.otp_codes ?? defaults.otp_codes,
    };
    saveLocalDb(db);
    return db;
  } catch {
    const db = defaultDb();
    saveLocalDb(db);
    return db;
  }
}

export function saveLocalDb(db: LocalDatabase) {
  if (typeof window !== "undefined") {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }
}

export function getLocalStudentByUserId(userId: string): Student | null {
  const db = loadLocalDb();
  return db.students.find((s) => s.user_id === userId) ?? null;
}

export function getLocalStudentById(studentId: string): Student | null {
  const db = loadLocalDb();
  return db.students.find((s) => s.id === studentId) ?? null;
}

export function getLocalStudentByReferralCode(code: string): Student | null {
  const db = loadLocalDb();
  return db.students.find((s) => s.referral_code === code) ?? null;
}

export function updateLocalStudent(studentId: string, patch: Partial<Student>) {
  const db = loadLocalDb();
  db.students = db.students.map((s) =>
    s.id === studentId ? { ...s, ...patch } : s
  );
  saveLocalDb(db);
}

/** بعد از ورود با Supabase، پروفایل را در localStorage هم نگه می‌دارد تا UI کار کند */
export function upsertLocalStudent(student: Student) {
  const db = loadLocalDb();
  const index = db.students.findIndex((s) => s.user_id === student.user_id || s.id === student.id);
  if (index >= 0) {
    db.students[index] = { ...db.students[index], ...student };
  } else {
    db.students.push(student);
    if (!db.chapter_progress[student.id]) db.chapter_progress[student.id] = {};
    if (db.wallet_balance[student.id] === undefined) db.wallet_balance[student.id] = 0;
    if (db.quiz_completed[student.id] === undefined) db.quiz_completed[student.id] = false;
  }
  saveLocalDb(db);
}

export function getSubjectProgress(studentId: string): Record<string, number> {
  const db = loadLocalDb();
  const student = db.students.find((s) => s.id === studentId);
  if (!student) return profileSubjectProgress;

  const result: Record<string, number> = {};
  for (const subject of db.subjects) {
    const chapters = db.chapters[subject.id] ?? [];
    if (chapters.length === 0) {
      result[subject.id] = profileSubjectProgress[subject.id] ?? 0;
      continue;
    }
    const progress = db.chapter_progress[studentId] ?? {};
    const sum = chapters.reduce((acc, ch) => {
      const fromProgress = progress[ch.id];
      const value =
        fromProgress !== undefined && fromProgress > 0
          ? fromProgress
          : ch.study_progress_percent;
      return acc + value;
    }, 0);
    const computed = Math.round(sum / chapters.length);
    result[subject.id] =
      computed > 0 ? computed : (profileSubjectProgress[subject.id] ?? 0);
  }
  return result;
}

export function getChapterProgress(studentId: string, subjectId: string) {
  const db = loadLocalDb();
  const chapters = db.chapters[subjectId] ?? [];
  const progress = db.chapter_progress[studentId] ?? {};
  return chapters.map((ch) => ({
    ...ch,
    study_progress_percent: progress[ch.id] ?? ch.study_progress_percent,
    test_progress_percent: progress[ch.id] ?? ch.test_progress_percent,
  }));
}

export function recordQuizAnswers(
  studentId: string,
  answers: Array<{ questionId: string; selected: string; isCorrect: boolean; timeSpent: number }>,
  meta?: { subjectId?: string; chapterId?: string; awardChance?: boolean }
) {
  const db = loadLocalDb();
  const now = new Date().toISOString();
  const subjectId = meta?.subjectId ?? "sub_chem";
  const chapterId = meta?.chapterId ?? "ch_chem_2";

  for (const a of answers) {
    db.answers.push({
      id: uid("ans"),
      student_id: studentId,
      question_id: a.questionId,
      selected_option: a.selected,
      is_correct: a.isCorrect,
      time_spent_seconds: a.timeSpent,
      created_at: now,
    });
  }

  const correct = answers.filter((a) => a.isCorrect).length;
  db.study_sessions.push({
    id: uid("sess"),
    student_id: studentId,
    subject_id: subjectId,
    chapter_id: chapterId,
    duration_minutes: Math.max(1, Math.round(answers.reduce((s, a) => s + a.timeSpent, 0) / 60)),
    test_count: answers.length,
    correct_count: correct,
    created_at: now,
  });

  const student = db.students.find((s) => s.id === studentId);
  if (student) {
    if (meta?.awardChance !== false) {
      student.total_chances += 1;
    }
    db.quiz_completed[studentId] = true;

    const progress = db.chapter_progress[studentId] ?? {};
    const bump = answers.length >= 10 ? 8 : 5;
    progress[chapterId] = Math.min(100, (progress[chapterId] ?? 0) + bump);
    db.chapter_progress[studentId] = progress;
  }

  saveLocalDb(db);
  return { correct, total: answers.length };
}

export function saveTestSessionRecord(session: TestSessionRecord) {
  const db = loadLocalDb();
  db.test_sessions.unshift(session);
  saveLocalDb(db);
}

export function ensureQuestionsPersisted(questions: Question[]) {
  const db = loadLocalDb();
  const existing = new Set(db.questions.map((q) => q.id));
  let changed = false;
  for (const q of questions) {
    if (!existing.has(q.id)) {
      db.questions.push(q);
      existing.add(q.id);
      changed = true;
    }
  }
  if (changed) saveLocalDb(db);
}

export function getMistakeBank(studentId: string, subjectId?: string): MistakeItem[] {
  const db = loadLocalDb();
  return db.mistakes.filter(
    (m) =>
      m.student_id === studentId &&
      !m.mastered &&
      (!subjectId || m.subject_id === subjectId)
  );
}

export function upsertMistakesFromAnswers(
  studentId: string,
  items: Array<{
    questionId: string;
    subjectId: string;
    chapterId: string;
    topicId: string | null;
    isCorrect: boolean;
  }>,
  masteryStreak: number
) {
  const db = loadLocalDb();
  const now = new Date().toISOString();
  let newlyMastered = 0;

  for (const item of items) {
    const existing = db.mistakes.find(
      (m) => m.student_id === studentId && m.question_id === item.questionId
    );

    if (!item.isCorrect) {
      if (existing) {
        existing.wrong_count += 1;
        existing.streak_correct = 0;
        existing.mastered = false;
        existing.last_seen = now;
        existing.chapter_id = item.chapterId;
        existing.topic_id = item.topicId;
      } else {
        db.mistakes.push({
          question_id: item.questionId,
          student_id: studentId,
          subject_id: item.subjectId,
          chapter_id: item.chapterId,
          topic_id: item.topicId,
          wrong_count: 1,
          streak_correct: 0,
          last_seen: now,
          mastered: false,
        });
      }
      continue;
    }

    if (!existing || existing.mastered) continue;
    existing.streak_correct += 1;
    existing.last_seen = now;
    if (existing.streak_correct >= masteryStreak) {
      existing.mastered = true;
      newlyMastered += 1;
    }
  }

  saveLocalDb(db);
  return { newlyMastered };
}

export function getDailyTestRewards(studentId: string, dateKey: string): DailyTestRewards {
  const db = loadLocalDb();
  const key = `${studentId}:${dateKey}`;
  return (
    db.daily_test_rewards[key] ?? {
      date: dateKey,
      practice: 0,
      exam_pass: 0,
      mistake_clear: 0,
    }
  );
}

export function bumpDailyTestReward(
  studentId: string,
  dateKey: string,
  kind: keyof Omit<DailyTestRewards, "date">,
  amount = 1
) {
  const db = loadLocalDb();
  const key = `${studentId}:${dateKey}`;
  const current = getDailyTestRewards(studentId, dateKey);
  const next = { ...current, [kind]: current[kind] + amount };
  db.daily_test_rewards[key] = next;
  saveLocalDb(db);
  return next;
}

export function addStudentChances(studentId: string, amount: number) {
  if (amount <= 0) return;
  const db = loadLocalDb();
  const student = db.students.find((s) => s.id === studentId);
  if (!student) return;
  student.total_chances += amount;
  saveLocalDb(db);
}

export function hasValidTestToday(studentId: string, minQuestions: number): boolean {
  const db = loadLocalDb();
  const today = new Date().toDateString();
  return db.study_sessions.some(
    (s) =>
      s.student_id === studentId &&
      new Date(s.created_at).toDateString() === today &&
      s.test_count >= minQuestions
  );
}

export function getRecentTestSessions(studentId: string, limit = 10): TestSessionRecord[] {
  const db = loadLocalDb();
  return db.test_sessions.filter((s) => s.student_id === studentId).slice(0, limit);
}

export function getWeakestSubjectName(studentId: string): string | null {
  const db = loadLocalDb();
  const open = db.mistakes.filter((m) => m.student_id === studentId && !m.mastered);
  if (open.length === 0) return null;
  const counts = new Map<string, number>();
  for (const m of open) {
    counts.set(m.subject_id, (counts.get(m.subject_id) ?? 0) + 1);
  }
  let worstId = "";
  let worstCount = -1;
  for (const [id, count] of counts) {
    if (count > worstCount) {
      worstId = id;
      worstCount = count;
    }
  }
  return db.subjects.find((s) => s.id === worstId)?.name ?? null;
}

export function getStrongestSubjectFromSessions(studentId: string): string | null {
  const db = loadLocalDb();
  const today = new Date().toDateString();
  const todaySessions = db.study_sessions.filter(
    (s) => s.student_id === studentId && new Date(s.created_at).toDateString() === today
  );
  if (todaySessions.length === 0) return null;

  const bySubject = new Map<string, { correct: number; total: number }>();
  for (const s of todaySessions) {
    const cur = bySubject.get(s.subject_id) ?? { correct: 0, total: 0 };
    cur.correct += s.correct_count;
    cur.total += s.test_count;
    bySubject.set(s.subject_id, cur);
  }

  let bestId = "";
  let bestAcc = -1;
  for (const [id, stats] of bySubject) {
    if (stats.total === 0) continue;
    const acc = stats.correct / stats.total;
    if (acc > bestAcc) {
      bestAcc = acc;
      bestId = id;
    }
  }
  return db.subjects.find((s) => s.id === bestId)?.name ?? null;
}

export function createReferral(studentId: string, phone: string) {
  const db = loadLocalDb();
  const referral: Referral = {
    id: uid("ref"),
    referrer_student_id: studentId,
    referred_phone: phone,
    referred_student_id: null,
    status: "sent",
    reward_chances: 0,
    cash_reward_amount: 0,
    created_at: new Date().toISOString(),
  };
  db.referrals.unshift(referral);
  saveLocalDb(db);
  return referral;
}

export function getReferralStats(studentId: string) {
  const db = loadLocalDb();
  const mine = db.referrals.filter((r) => r.referrer_student_id === studentId);
  return {
    sent: mine.length,
    registered: mine.filter((r) => r.status !== "sent").length,
    quizCompleted: mine.filter((r) => r.status === "quiz_completed" || r.status === "rewarded").length,
    maxInvites: 1,
  };
}

export function getInvitedFriends(studentId: string): InvitedFriend[] {
  const db = loadLocalDb();
  return db.referrals
    .filter((r) => r.referrer_student_id === studentId)
    .map((r) => ({
      name: r.referred_phone,
      phone: r.referred_phone,
      status: r.status,
      earnedChances: r.reward_chances,
    }));
}

export function registerParentChild(data: {
  childPhone: string;
  grade: string;
  field: string;
  province: string;
  city: string;
  parentPhone?: string;
  parentName?: string;
}) {
  const db = loadLocalDb();
  const userId = uid("user");
  const parentId = uid("parent");
  const studentId = uid("student");
  const referralCode = `OWJ-${data.childPhone.slice(-4)}${Date.now().toString(36).slice(-4).toUpperCase()}`;

  db.users.push({
    id: userId,
    phone: data.childPhone,
    role: "student",
    created_at: new Date().toISOString(),
  });

  db.students.push({
    id: studentId,
    user_id: userId,
    parent_id: parentId,
    full_name: "دانش‌آموز جدید",
    province: data.province,
    city: data.city,
    grade: data.grade,
    field: data.field as Student["field"],
    target_major: "نامشخص",
    avatar_url: null,
    total_chances: 0,
    referral_code: referralCode,
    created_at: new Date().toISOString(),
  });

  db.chapter_progress[studentId] = {};
  db.wallet_balance[studentId] = 0;
  db.quiz_completed[studentId] = false;

  saveLocalDb(db);
  return { studentId, referralCode };
}

export function getParentReport(studentId: string): ParentDailyReport {
  const db = loadLocalDb();
  const sessions = db.study_sessions.filter((s) => s.student_id === studentId);
  const today = new Date().toDateString();
  const todaySessions = sessions.filter(
    (s) => new Date(s.created_at).toDateString() === today
  );

  if (todaySessions.length === 0) return parentDailyReport;

  const studyTimeMinutes = todaySessions.reduce((sum, s) => sum + s.duration_minutes, 0);
  const testsAnswered = todaySessions.reduce((sum, s) => sum + s.test_count, 0);
  const correct = todaySessions.reduce((sum, s) => sum + s.correct_count, 0);
  const accuracy = testsAnswered > 0 ? Math.round((correct / testsAnswered) * 100) : 0;

  const strongSubject =
    getStrongestSubjectFromSessions(studentId) ??
    db.subjects.find((s) => s.id === todaySessions[0]?.subject_id)?.name ??
    "شیمی";
  const needsAttention = getWeakestSubjectName(studentId) ?? "نیاز به تمرین بیشتر";

  const lastExam = db.test_sessions.find(
    (s) =>
      s.student_id === studentId &&
      s.mode === "exam" &&
      new Date(s.created_at).toDateString() === today
  );

  const examBit = lastExam
    ? lastExam.passed
      ? " آخرین آزمون شبیه‌سازی را قبول شد."
      : " آخرین آزمون شبیه‌سازی را مردود شد؛ مرور غلط‌ها پیشنهاد می‌شود."
    : "";

  return {
    studyTimeMinutes,
    testsAnswered,
    accuracy,
    weeklyProgress: Math.min(100, Math.round(studyTimeMinutes / 2 + accuracy / 2)),
    strongSubject,
    needsAttention,
    albertoSummary: `امروز ${studyTimeMinutes} دقیقه مطالعه و ${testsAnswered} تست ثبت شد؛ دقت ${accuracy}٪. نقطهٔ قوت: ${strongSubject}. نیازمند توجه: ${needsAttention}.${examBit}`,
  };
}

export function getAdmissionRanks(province: string, universityType: "دولتی" | "آزاد") {
  const db = loadLocalDb();
  return db.admission_ranks
    .filter((r) => r.province === province && r.university_type === universityType)
    .sort((a, b) => a.min_rank - b.min_rank);
}

export function getStudyAnalytics(studentId: string) {
  const db = loadLocalDb();
  const sessions = db.study_sessions.filter((s) => s.student_id === studentId);

  const dailyTimeChartData = [
    { time: "صبح زود", studyMinutes: 0, testCount: 0 },
    { time: "صبح", studyMinutes: 0, testCount: 0 },
    { time: "ظهر", studyMinutes: 0, testCount: 0 },
    { time: "عصر", studyMinutes: 0, testCount: 0 },
    { time: "شب", studyMinutes: 0, testCount: 0 },
    { time: "نیمه‌شب", studyMinutes: 0, testCount: 0 },
  ];

  if (sessions.length > 0) {
    const last = sessions[sessions.length - 1];
    dailyTimeChartData[4].studyMinutes = last.duration_minutes;
    dailyTimeChartData[4].testCount = last.test_count;
  } else {
    return null;
  }

  return { dailyTimeChartData, hasRealData: sessions.length > 0 };
}

export function getProfileDisplay(student: Student) {
  return {
    full_name: student.full_name || profileStudentDisplay.full_name,
    location_line: `${student.city}، ${student.province}`,
    grade_line: `${student.grade} ${student.field}`,
    target_major: student.target_major,
    days_remaining: profileStudentDisplay.days_remaining,
  };
}

export { AUTH_KEY };
