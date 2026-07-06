import { recordQuizAnswers, loadLocalDb } from "@/lib/local-db";
import { mockQuestions } from "@/lib/data/mock-data";
import type { Question } from "@/types";

export function getQuizQuestions(): Question[] {
  const db = loadLocalDb();
  return db.questions.length > 0 ? db.questions : mockQuestions;
}

export function submitQuiz(
  studentId: string,
  answers: Array<{ questionId: string; selected: string; timeSpent: number }>
) {
  const questions = getQuizQuestions();
  const scored = answers.map((a) => {
    const q = questions.find((q) => q.id === a.questionId);
    const isCorrect = q ? a.selected === q.correct_option : false;
    return { ...a, isCorrect };
  });

  return recordQuizAnswers(studentId, scored);
}
