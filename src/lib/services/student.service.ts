import {
  getChapterProgress,
  getLocalStudentByUserId,
  getProfileDisplay,
  getSubjectProgress,
  loadLocalDb,
  updateLocalStudent,
} from "@/lib/local-db";
import { mockStudent } from "@/lib/data/mock-data";
import type { Student } from "@/types";

export function getCurrentStudent(userId?: string): Student {
  if (!userId) return mockStudent;
  return getLocalStudentByUserId(userId) ?? mockStudent;
}

export function getStudentProfile(student: Student) {
  return getProfileDisplay(student);
}

export function getStudentSubjectProgress(studentId: string) {
  return getSubjectProgress(studentId);
}

export function getStudentChapters(studentId: string, subjectId: string) {
  return getChapterProgress(studentId, subjectId);
}

export function updateStudentProfile(studentId: string, patch: Partial<Student>) {
  updateLocalStudent(studentId, patch);
}

export function getAdminStats() {
  const db = loadLocalDb();
  return {
    students: db.students.length,
    parents: db.users.filter((u) => u.role === "parent").length,
    questions: db.questions.length,
    referrals: db.referrals.length,
    users: db.users,
    studentsList: db.students,
    questionsList: db.questions,
    referralsList: db.referrals,
    admissionList: db.admission_ranks,
  };
}
