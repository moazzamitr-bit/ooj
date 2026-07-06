import { create } from "zustand";
import { mockStudent, mockChapters } from "@/lib/data/mock-data";
import type { Student } from "@/types";

interface StudentStore {
  student: Student;
  activeSubjectId: string | null;
  activeChapterId: string | null;
  bookmarkedQuestions: string[];
  quizCompleted: boolean;
  setActiveSubject: (subjectId: string) => void;
  setActiveChapter: (chapterId: string | null) => void;
  toggleBookmark: (questionId: string) => void;
  addChance: (amount: number) => void;
  setQuizCompleted: (completed: boolean) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  student: mockStudent,
  activeSubjectId: null,
  activeChapterId: "ch_chem_2",
  bookmarkedQuestions: [],
  quizCompleted: false,
  setActiveSubject: (subjectId) =>
    set((state) => {
      const chapters = mockChapters[subjectId] ?? [];
      return {
        activeSubjectId: subjectId,
        activeChapterId: chapters[0]?.id ?? null,
      };
    }),
  setActiveChapter: (chapterId) => set({ activeChapterId: chapterId }),
  toggleBookmark: (questionId) =>
    set((state) => ({
      bookmarkedQuestions: state.bookmarkedQuestions.includes(questionId)
        ? state.bookmarkedQuestions.filter((id) => id !== questionId)
        : [...state.bookmarkedQuestions, questionId],
    })),
  addChance: (amount) =>
    set((state) => ({
      student: {
        ...state.student,
        total_chances: state.student.total_chances + amount,
      },
    })),
  setQuizCompleted: (completed) => set({ quizCompleted: completed }),
}));
