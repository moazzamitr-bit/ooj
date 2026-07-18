"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useStudentStore } from "@/store/student-store";
import { useApp } from "@/providers/app-provider";
import { useCampaignStore } from "@/store/campaign-store";
import { getQuizQuestions, submitQuiz } from "@/lib/services/quiz.service";
import { cn } from "@/lib/utils/cn";
import { toPersianDigits } from "@/lib/utils/persian";

const QUIZ_DURATION = 120;

export default function StudentQuizPage() {
  const router = useRouter();
  const { student, refresh } = useApp();
  const { toggleBookmark, bookmarkedQuestions, setQuizCompleted } = useStudentStore();
  const addChances = useCampaignStore((s) => s.addChances);
  const setStep = useCampaignStore((s) => s.setStep);
  const questions = getQuizQuestions().slice(0, 2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [startTime, setStartTime] = useState(Date.now());

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const finishQuiz = useCallback(() => {
    const allAnswers = questions.map((q) => ({
      questionId: q.id,
      selected: answers[q.id] ?? "",
      timeSpent: Math.round((Date.now() - startTime) / 1000 / questions.length),
    })).filter((a) => a.selected);

    if (allAnswers.length > 0) {
      submitQuiz(student.id, allAnswers);
      refresh();
    }

    setQuizCompleted(true);
    addChances(1); // second golden chance (first came from riddle)
    setStep("complete_profile");
    router.push("/student/complete-profile");
  }, [addChances, answers, questions, refresh, router, setQuizCompleted, setStep, startTime, student.id]);

  useEffect(() => {
    if (timeLeft <= 0) {
      finishQuiz();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finishQuiz]);

  const handleNext = () => {
    if (selectedOption) {
      setAnswers({ ...answers, [question.id]: selectedOption });
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(answers[questions[currentIndex + 1].id] ?? null);
      setStartTime(Date.now());
    } else {
      const finalAnswers = selectedOption
        ? { ...answers, [question.id]: selectedOption }
        : answers;
      setAnswers(finalAnswers);
      setTimeout(finishQuiz, 0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(answers[questions[currentIndex - 1].id] ?? null);
    }
  };

  const options = [
    { key: "a", text: question.option_a },
    { key: "b", text: question.option_b },
    { key: "c", text: question.option_c },
    { key: "d", text: question.option_d },
  ];

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-lavender/20">
      <div className="mx-auto max-w-[1000px] px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-4 w-4" />
            <span className="font-mono font-bold text-primary">
              {toPersianDigits(minutes)}:{toPersianDigits(seconds.toString().padStart(2, "0"))}
            </span>
          </div>
          <Badge variant="purple">
            سوال {toPersianDigits(currentIndex + 1)} از {toPersianDigits(questions.length)}
          </Badge>
        </div>

        <Progress value={progress} className="mb-8" />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-violet-100">
              <CardContent className="p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge>{question.tags[0]}</Badge>
                  <Badge variant="default">{question.difficulty}</Badge>
                  <Badge variant="default">سال {toPersianDigits(question.source_year)}</Badge>
                </div>

                <p className="text-lg leading-8 text-primary-deep">{question.question_text}</p>

                <div className="mt-6 space-y-3">
                  {options.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setSelectedOption(opt.key)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border p-4 text-right transition-all",
                        selectedOption === opt.key
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-violet-100 hover:border-primary/30 hover:bg-lavender/50"
                      )}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lavender text-sm font-bold text-primary">
                        {opt.key.toUpperCase()}
                      </span>
                      <span className="text-sm text-primary-deep">{opt.text}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
                    <ChevronRight className="h-4 w-4" />
                    قبلی
                  </Button>

                  <button
                    type="button"
                    onClick={() => toggleBookmark(question.id)}
                    className={cn(
                      "rounded-xl p-2 transition-colors",
                      bookmarkedQuestions.includes(question.id)
                        ? "bg-warning/10 text-warning"
                        : "text-slate-400 hover:bg-lavender"
                    )}
                  >
                    <Bookmark className="h-5 w-5" />
                  </button>

                  <Button variant="default" onClick={handleNext}>
                    {currentIndex === questions.length - 1 ? "پایان تست" : "بعدی"}
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-violet-100 bg-gradient-to-br from-lavender to-white sticky top-8">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🧑‍🔬</span>
                  <div>
                    <p className="font-bold text-primary-deep">نکته آلبرتو</p>
                    <p className="text-xs text-slate-400">مشاور هوشمند</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-primary-deep">
                  {currentIndex === 0
                    ? "آروم باش! این تست فقط برای شناخت سطحته. هر سوالی بلد نبودی، رد شو."
                    : currentIndex === questions.length - 1
                    ? "آخرین سوال! بعدش اولین شانس طلایی‌ات رو می‌گیری 🎉"
                    : "خوب پیش میری! اگه مطمئن نیستی، گزینه‌ای که بیشتر به نظرت درسته رو انتخاب کن."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
