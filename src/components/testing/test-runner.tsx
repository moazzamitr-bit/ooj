"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import { toPersianDigits, formatPercent } from "@/lib/utils/persian";
import { getPassThreshold, MODE_LABELS } from "@/lib/testing/constants";
import type { Question } from "@/types";
import type {
  AnswerOption,
  TestSessionConfig,
  TestSessionResult,
} from "@/types/test-session";

type Phase = "running" | "result" | "review";

interface TestRunnerProps {
  config: TestSessionConfig;
  questions: Question[];
  durationSeconds: number | null;
  immediateFeedback: boolean;
  onSubmit: (payload: {
    answers: Record<string, AnswerOption>;
    durationSeconds: number;
  }) => TestSessionResult;
  backHref?: string;
}

export function TestRunner({
  config,
  questions,
  durationSeconds,
  immediateFeedback,
  onSubmit,
  backHref = "/student/profile/",
}: TestRunnerProps) {
  const [phase, setPhase] = useState<Phase>("running");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerOption>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [startedAt] = useState(() => Date.now());
  const [result, setResult] = useState<TestSessionResult | null>(null);
  const [reviewFilter, setReviewFilter] = useState<"all" | "wrong">("all");
  const [reviewIndex, setReviewIndex] = useState(0);

  const question = questions[index];
  const answeredCount = Object.keys(answers).length;
  const threshold = getPassThreshold(config.difficulty, questions.length);

  const finish = useCallback(() => {
    const elapsed = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
    const res = onSubmit({ answers, durationSeconds: elapsed });
    setResult(res);
    setPhase("result");
  }, [answers, onSubmit, startedAt]);

  useEffect(() => {
    if (phase !== "running" || timeLeft == null) return;
    if (timeLeft <= 0) {
      finish();
      return;
    }
    const t = setInterval(() => setTimeLeft((v) => (v == null ? v : v - 1)), 1000);
    return () => clearInterval(t);
  }, [timeLeft, phase, finish]);

  const selectOption = (opt: AnswerOption) => {
    if (phase !== "running") return;
    if (immediateFeedback && revealed[question.id]) return;
    setAnswers((prev) => ({ ...prev, [question.id]: opt }));
    if (immediateFeedback) {
      setRevealed((prev) => ({ ...prev, [question.id]: true }));
    }
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(question.id)) next.delete(question.id);
      else next.add(question.id);
      return next;
    });
  };

  const minutes = timeLeft != null ? Math.floor(timeLeft / 60) : null;
  const seconds = timeLeft != null ? timeLeft % 60 : null;

  const reviewQuestions = useMemo(() => {
    if (!result) return questions;
    if (reviewFilter === "all") return questions;
    return questions.filter((q) => {
      const selected = result.session.answers[q.id];
      return !selected || selected !== q.correct_option;
    });
  }, [questions, result, reviewFilter]);

  const reviewQ = reviewQuestions[reviewIndex] ?? reviewQuestions[0];

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="text-xl font-extrabold text-primary-deep">سوالی پیدا نشد</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          برای مرور غلط‌ها هنوز موردی در بانک ضعف نیست. اول یک تمرین موضوعی بزن.
        </p>
        <Link
          href={backHref}
          className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-white shadow-md hover:bg-primary/90"
        >
          بازگشت به پروفایل
        </Link>
      </div>
    );
  }

  if (phase === "result" && result) {
    const { session, chancesAwarded, rewardReason, albertoTip } = result;
    const accuracy = session.total
      ? Math.round((session.correct_count / session.total) * 100)
      : 0;
    const wrong = session.total - session.correct_count;

    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="rounded-[1.5rem] border border-slate-100 bg-white p-6 shadow-[0_12px_40px_rgb(17_26_76_0.07)] md:p-8">
          <Badge variant="purple">{MODE_LABELS[config.mode]}</Badge>
          <h1 className="mt-4 text-2xl font-extrabold text-primary-deep">نتیجه جلسه</h1>
          <p className="mt-2 text-sm text-slate-500">
            {config.subjectName}
            {config.chapterTitle ? ` · ${config.chapterTitle}` : ""}
            {config.topicTitle ? ` · ${config.topicTitle}` : ""}
          </p>

          {session.passed != null && (
            <div
              className={cn(
                "mt-5 rounded-2xl px-4 py-3 text-center text-lg font-extrabold",
                session.passed
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              )}
            >
              {session.passed ? "قبول شدی" : "مردود شدی"}
              <p className="mt-1 text-xs font-semibold opacity-80">
                حد قبولی: حداکثر {toPersianDigits(threshold.maxErrors)} غلط از{" "}
                {toPersianDigits(session.total)}
              </p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">نمره</p>
              <p className="mt-1 text-xl font-extrabold text-primary-deep">
                {formatPercent(accuracy)}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">درست</p>
              <p className="mt-1 text-xl font-extrabold text-emerald-600">
                {toPersianDigits(session.correct_count)}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">غلط</p>
              <p className="mt-1 text-xl font-extrabold text-rose-600">
                {toPersianDigits(wrong)}
              </p>
            </div>
          </div>

          {chancesAwarded > 0 && (
            <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
              +{toPersianDigits(chancesAwarded)} شانس طلایی
              {rewardReason ? ` — ${rewardReason}` : ""}
            </p>
          )}

          {albertoTip && (
            <div className="mt-4 rounded-xl border border-violet-100 bg-lavender/40 px-4 py-3 text-sm leading-7 text-primary-deep">
              <p className="font-extrabold">آلبرتو</p>
              <p className="mt-1">{albertoTip}</p>
            </div>
          )}

          {config.mode === "practice" && wrong > 0 && config.topicId && (
            <Link
              href={`/student/profile/?subject=${config.subjectId}&focus=${config.topicId}`}
              className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-violet-100 bg-white px-5 text-sm font-medium text-primary-deep hover:bg-lavender"
            >
              برو مبحث مرتبط را بخوان
            </Link>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              className="flex-1"
              onClick={() => {
                setReviewFilter("wrong");
                setReviewIndex(0);
                setPhase("review");
              }}
            >
              مرور تصحیح
            </Button>
            <Link
              href={backHref}
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-violet-100 bg-white px-5 text-sm font-medium text-primary-deep hover:bg-lavender"
            >
              بازگشت
            </Link>
          </div>

          {result.session.passed === false && (
            <Link
              href={`/student/practice/?mode=mistake_review&subjectId=${config.subjectId}&chapterId=${config.chapterId}&topicId=${config.topicId ?? ""}&difficulty=${config.difficulty}`}
              className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-white shadow-md hover:bg-primary/90"
            >
              شروع مرور غلط‌ها
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (phase === "review" && result && reviewQ) {
    const selected = result.session.answers[reviewQ.id];
    const options = [
      { key: "a" as const, text: reviewQ.option_a },
      { key: "b" as const, text: reviewQ.option_b },
      { key: "c" as const, text: reviewQ.option_c },
      { key: "d" as const, text: reviewQ.option_d },
    ];

    return (
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-lg font-extrabold text-primary-deep">تصحیح آزمون</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setReviewFilter("all");
                setReviewIndex(0);
              }}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold",
                reviewFilter === "all" ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
              )}
            >
              همه
            </button>
            <button
              type="button"
              onClick={() => {
                setReviewFilter("wrong");
                setReviewIndex(0);
              }}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold",
                reviewFilter === "wrong" ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
              )}
            >
              فقط غلط‌ها
            </button>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            سوال {toPersianDigits(reviewIndex + 1)} از {toPersianDigits(reviewQuestions.length)}
          </p>
          <p className="mt-3 text-base leading-8 text-primary-deep">{reviewQ.question_text}</p>
          <div className="mt-5 space-y-2">
            {options.map((opt) => {
              const isCorrect = opt.key === reviewQ.correct_option;
              const isSelected = selected === opt.key;
              return (
                <div
                  key={opt.key}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border p-3 text-sm",
                    isCorrect && "border-emerald-300 bg-emerald-50",
                    isSelected && !isCorrect && "border-rose-300 bg-rose-50"
                  )}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  ) : isSelected ? (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                  ) : (
                    <span className="mt-0.5 h-4 w-4 shrink-0" />
                  )}
                  <span>
                    <strong className="me-2">{opt.key.toUpperCase()}.</strong>
                    {opt.text}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700">
            <p className="font-extrabold text-primary-deep">توضیح</p>
            <p className="mt-1">{reviewQ.explanation}</p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              disabled={reviewIndex === 0}
              onClick={() => setReviewIndex((i) => Math.max(0, i - 1))}
            >
              <ChevronRight className="h-4 w-4" />
              قبلی
            </Button>
            <Link
              href={backHref}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-violet-100 bg-white px-5 text-sm font-medium text-primary-deep hover:bg-lavender"
            >
              پایان مرور
            </Link>
            <Button
              disabled={reviewIndex >= reviewQuestions.length - 1}
              onClick={() =>
                setReviewIndex((i) => Math.min(reviewQuestions.length - 1, i + 1))
              }
            >
              بعدی
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const options = [
    { key: "a" as const, text: question.option_a },
    { key: "b" as const, text: question.option_b },
    { key: "c" as const, text: question.option_c },
    { key: "d" as const, text: question.option_d },
  ];
  const selected = answers[question.id];
  const showFeedback = immediateFeedback && revealed[question.id] && selected;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge variant="purple">{MODE_LABELS[config.mode]}</Badge>
          <h1 className="mt-2 text-base font-extrabold text-primary-deep md:text-lg">
            {config.subjectName}
            {config.topicTitle ? ` · ${config.topicTitle}` : ""}
          </h1>
        </div>
        <div className="flex items-center gap-3 text-sm">
          {minutes != null && seconds != null && (
            <span className="inline-flex items-center gap-1.5 font-mono font-bold text-primary">
              <Clock className="h-4 w-4" />
              {toPersianDigits(minutes)}:
              {toPersianDigits(seconds.toString().padStart(2, "0"))}
            </span>
          )}
          <span className="text-slate-500">
            {toPersianDigits(answeredCount)}/{toPersianDigits(questions.length)} پاسخ
          </span>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm md:p-7">
        <p className="text-sm text-slate-500">
          سوال {toPersianDigits(index + 1)} از {toPersianDigits(questions.length)}
        </p>
        <p className="mt-3 text-base leading-8 text-primary-deep md:text-lg">
          {question.question_text}
        </p>

        <div className="mt-6 space-y-3">
          {options.map((opt) => {
            const isSelected = selected === opt.key;
            const isCorrect = opt.key === question.correct_option;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => selectOption(opt.key)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border p-4 text-right transition-all",
                  isSelected && !showFeedback && "border-primary bg-primary/5 ring-2 ring-primary/20",
                  showFeedback && isCorrect && "border-emerald-400 bg-emerald-50",
                  showFeedback && isSelected && !isCorrect && "border-rose-400 bg-rose-50",
                  !isSelected && !showFeedback && "border-slate-100 hover:border-primary/30"
                )}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lavender text-sm font-bold text-primary">
                  {opt.key.toUpperCase()}
                </span>
                <span className="text-sm text-primary-deep">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700">
            <p className="font-extrabold text-primary-deep">توضیح</p>
            <p className="mt-1">{question.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-2">
          <Button
            variant="outline"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            <ChevronRight className="h-4 w-4" />
            قبلی
          </Button>

          <button
            type="button"
            onClick={toggleFlag}
            className={cn(
              "rounded-xl p-2 transition-colors",
              flagged.has(question.id)
                ? "bg-amber-100 text-amber-700"
                : "text-slate-400 hover:bg-slate-50"
            )}
            aria-label="پرچم"
          >
            {flagged.has(question.id) ? (
              <Flag className="h-5 w-5 fill-current" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>

          {index < questions.length - 1 ? (
            <Button onClick={() => setIndex((i) => i + 1)}>
              بعدی
              <ChevronLeft className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={finish}>پایان آزمون</Button>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {questions.map((q, i) => {
          const hasAnswer = Boolean(answers[q.id]);
          const isFlagged = flagged.has(q.id);
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition",
                i === index && "ring-2 ring-primary ring-offset-1",
                hasAnswer && "bg-primary text-white",
                !hasAnswer && "bg-slate-100 text-slate-600",
                isFlagged && "outline outline-2 outline-offset-1 outline-amber-400"
              )}
            >
              {toPersianDigits(i + 1)}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="outline" onClick={finish}>
          پایان و مشاهده نتیجه
        </Button>
      </div>
    </div>
  );
}
