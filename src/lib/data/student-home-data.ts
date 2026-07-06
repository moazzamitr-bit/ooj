/** داده‌های صفحه خانه دانش‌آموز */

export const yesterdayPath = {
  subjectId: "sub_chem",
  subjectName: "شیمی",
  chapterTitle: "فصل ۲: سطح انرژی",
  progressPercent: 55,
  minutesLeft: 18,
};

export const courseCycle = {
  currentDay: 12,
  totalDays: 30,
  todaySubject: "فیزیک",
  completedLessons: 4,
  totalLessons: 6,
};

export const flashcardStats = {
  dueToday: 24,
  mastered: 156,
  streakDays: 5,
};

export const studySubjectOrder = ["sub_bio", "sub_chem", "sub_physics", "sub_math"] as const;
