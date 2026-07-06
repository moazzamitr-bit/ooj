"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { mockStudent, mockSubjects } from "@/lib/data/mock-data";
import {
  dailyTimeChartData,
  monthlyChartData,
  subjectDailyRadarData,
  weeklyReadingChartData,
} from "@/lib/data/profile-mock-data";
import { loadLocalDb } from "@/lib/local-db";
import {
  getCurrentStudent,
  getStudentChapters,
  getStudentProfile,
  getStudentSubjectProgress,
} from "@/lib/services/student.service";
import {
  clearSession,
  getStoredSession,
  sendOtp,
  verifyOtp,
} from "@/lib/services/auth.service";
import type { AuthSession } from "@/lib/utils/auth";
import type { Student, UserRole } from "@/types";

interface AppContextValue {
  session: AuthSession | null;
  student: Student;
  profile: ReturnType<typeof getStudentProfile>;
  subjectProgress: Record<string, number>;
  subjects: typeof mockSubjects;
  isLoading: boolean;
  refresh: () => void;
  loginSendOtp: (phone: string) => Promise<{ success: boolean; message: string }>;
  loginVerifyOtp: (
    phone: string,
    otp: string,
    role?: UserRole
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  getChaptersForSubject: (subjectId: string) => ReturnType<typeof getStudentChapters>;
  chartData: {
    daily: typeof dailyTimeChartData;
    weekly: typeof weeklyReadingChartData;
    monthly: typeof monthlyChartData;
    radar: typeof subjectDailyRadarData;
  };
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [student, setStudent] = useState<Student>(mockStudent);
  const [subjectProgress, setSubjectProgress] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    loadLocalDb();
    const stored = getStoredSession();
    setSession(stored);
    const s = getCurrentStudent(stored?.user.id);
    setStudent(s);
    setSubjectProgress(getStudentSubjectProgress(s.id));
    setIsLoading(false);
  }, [tick]);

  const profile = useMemo(() => getStudentProfile(student), [student]);

  const chartData = useMemo(() => {
    const db = loadLocalDb();
    const sessions = db.study_sessions.filter((s) => s.student_id === student.id);
    if (sessions.length === 0) {
      return {
        daily: dailyTimeChartData,
        weekly: weeklyReadingChartData,
        monthly: monthlyChartData,
        radar: subjectDailyRadarData,
      };
    }
    const last = sessions[sessions.length - 1];
    const daily = [...dailyTimeChartData];
    daily[4] = { ...daily[4], studyMinutes: last.duration_minutes, testCount: last.test_count };
    return {
      daily,
      weekly: weeklyReadingChartData,
      monthly: monthlyChartData,
      radar: subjectDailyRadarData,
    };
  }, [student.id, tick]);

  const loginSendOtp = useCallback(async (phone: string) => sendOtp(phone), []);

  const loginVerifyOtp = useCallback(
    async (phone: string, otp: string, role: UserRole = "student") => {
      const result = await verifyOtp(phone, otp, role);
      if (result.success && result.session) {
        setSession(result.session);
        const s = result.student ?? getCurrentStudent(result.session.user.id);
        setStudent(s);
        setSubjectProgress(getStudentSubjectProgress(s.id));
      }
      return result;
    },
    []
  );

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
    setStudent(mockStudent);
    setSubjectProgress(getStudentSubjectProgress(mockStudent.id));
  }, []);

  const getChaptersForSubject = useCallback(
    (subjectId: string) => getStudentChapters(student.id, subjectId),
    [student.id, tick]
  );

  const value: AppContextValue = {
    session,
    student,
    profile,
    subjectProgress,
    subjects: mockSubjects,
    isLoading,
    refresh,
    loginSendOtp,
    loginVerifyOtp,
    logout,
    getChaptersForSubject,
    chartData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
