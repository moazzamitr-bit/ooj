import { loadLocalDb } from "@/lib/local-db";
import {
  dailyMinutesChartData,
  monthlyHoursChartData,
  subjectGradeTestChartData,
  weeklyHoursChartData,
  type ProfileChartBar,
} from "@/lib/data/profile-mock-data";

const DAY_LABELS = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

function weekdayIndex(date: Date) {
  const js = date.getDay();
  return (js + 1) % 7;
}

/** اگر جلسه واقعی باشد، نمودارها را با دادهٔ study_sessions غنی می‌کند */
export function getStudentChartData(studentId: string): {
  daily: ProfileChartBar[];
  weekly: ProfileChartBar[];
  monthly: ProfileChartBar[];
  subjects: ProfileChartBar[];
} {
  const db = loadLocalDb();
  const sessions = db.study_sessions.filter((s) => s.student_id === studentId);

  if (sessions.length === 0) {
    return {
      daily: dailyMinutesChartData,
      weekly: weeklyHoursChartData,
      monthly: monthlyHoursChartData,
      subjects: subjectGradeTestChartData,
    };
  }

  const dayMinutes = new Map<string, number>();
  for (const label of DAY_LABELS) dayMinutes.set(label, 0);

  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 6);

  let todayMinutes = 0;
  for (const s of sessions) {
    const d = new Date(s.created_at);
    if (d.toDateString() === now.toDateString()) {
      todayMinutes += s.duration_minutes;
    }
    if (d < weekAgo) continue;
    const label = DAY_LABELS[weekdayIndex(d)];
    dayMinutes.set(label, (dayMinutes.get(label) ?? 0) + s.duration_minutes);
  }

  const daily: ProfileChartBar[] = dailyMinutesChartData.map((bar) => {
    if (!DAY_LABELS.includes(bar.label)) return bar;
    return { ...bar, value: Math.max(bar.value, dayMinutes.get(bar.label) ?? 0) };
  });

  // bump "تست" total with today's test minutes proxy
  const todayTests = sessions
    .filter((s) => new Date(s.created_at).toDateString() === now.toDateString())
    .reduce((sum, s) => sum + s.test_count, 0);
  const dailyWithTotals = daily.map((bar) => {
    if (bar.label === "مطالعه" && todayMinutes > 0) {
      return { ...bar, value: Math.max(bar.value, todayMinutes) };
    }
    if (bar.label === "تست" && todayTests > 0) {
      return { ...bar, value: Math.max(bar.value, todayTests * 2) };
    }
    return bar;
  });

  const weekly = weeklyHoursChartData.map((bar, i, arr) =>
    i === arr.length - 1 && todayMinutes > 0
      ? { ...bar, value: Math.min(9, Number((bar.value + todayMinutes / 60).toFixed(1))) }
      : bar
  );

  const monthly = monthlyHoursChartData.map((bar, i, arr) =>
    i === arr.length - 1 && todayMinutes > 0
      ? { ...bar, value: Math.min(50, Number((bar.value + todayMinutes / 60).toFixed(1))) }
      : bar
  );

  const subjectTotals = new Map<string, number>();
  for (const s of sessions) {
    subjectTotals.set(s.subject_id, (subjectTotals.get(s.subject_id) ?? 0) + s.test_count);
  }

  const nameById = new Map(db.subjects.map((s) => [s.id, s.name]));
  const subjects = subjectGradeTestChartData.map((bar) => {
    if (!bar.group) return bar;
    const subjectId = [...nameById.entries()].find(([, name]) =>
      bar.group!.includes(name) || name.includes(bar.group!)
    )?.[0];
    if (!subjectId) return bar;
    const tests = subjectTotals.get(subjectId) ?? 0;
    if (tests === 0) return bar;
    const bump = Math.min(8, Math.round(tests / 3));
    const cap = bar.maxValue ?? 100;
    return { ...bar, value: Math.min(cap, bar.value + bump) };
  });

  return {
    daily: dailyWithTotals,
    weekly,
    monthly,
    subjects,
  };
}
