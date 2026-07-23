"use client";

import { Suspense, useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppHeader } from "@/components/layout/app-header";
import { TestRunner } from "@/components/testing/test-runner";
import { Button } from "@/components/ui/button";
import { useApp } from "@/providers/app-provider";
import { useCampaignStore } from "@/store/campaign-store";
import type { TestDifficulty } from "@/lib/data/study-structure-data";
import { PRACTICE_COUNTS, MODE_LABELS } from "@/lib/testing/constants";
import {
  buildQuestionsForStudent,
  getExamDurationSeconds,
  resolveQuestionCount,
  submitTestSession,
} from "@/lib/services/test-session.service";
import type { AnswerOption, TestMode, TestSessionConfig } from "@/types/test-session";
import { toPersianDigits } from "@/lib/utils/persian";

function parseMode(raw: string | null): TestMode {
  if (raw === "exam" || raw === "mistake_review" || raw === "practice") return raw;
  return "practice";
}

function parseDifficulty(raw: string | null): TestDifficulty {
  if (raw === "simple" || raw === "medium" || raw === "hard" || raw === "konkur") return raw;
  return "medium";
}

function PracticeContent() {
  const searchParams = useSearchParams();
  const { student, refresh } = useApp();
  const addChances = useCampaignStore((s) => s.addChances);

  const initialConfig = useMemo<TestSessionConfig>(() => {
    const mode = parseMode(searchParams.get("mode"));
    const difficulty = parseDifficulty(searchParams.get("difficulty"));
    const countParam = Number(searchParams.get("count") || "10");
    return {
      mode,
      subjectId: searchParams.get("subjectId") || "sub_chem",
      chapterId: searchParams.get("chapterId") || "ch_chem_2",
      topicId: searchParams.get("topicId") || null,
      difficulty,
      count: Number.isFinite(countParam) ? countParam : 10,
      subjectName: searchParams.get("subjectName") || undefined,
      chapterTitle: searchParams.get("chapterTitle") || undefined,
      topicTitle: searchParams.get("topicTitle") || undefined,
    };
  }, [searchParams]);

  const [config, setConfig] = useState(initialConfig);
  const hasModeParam = Boolean(searchParams.get("mode"));
  const [started, setStarted] = useState(
    () => searchParams.get("autostart") === "1" || hasModeParam
  );
  const [sessionKey, setSessionKey] = useState(0);

  const questions = useMemo(() => {
    if (!started) return [];
    return buildQuestionsForStudent(student.id, config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, sessionKey, student.id, config]);

  const durationSeconds =
    config.mode === "exam"
      ? getExamDurationSeconds(
          config.difficulty,
          resolveQuestionCount(config.mode, config.difficulty, config.count)
        )
      : null;

  const handleSubmit = useCallback(
    (payload: { answers: Record<string, AnswerOption>; durationSeconds: number }) => {
      const result = submitTestSession({
        studentId: student.id,
        config,
        questions,
        answers: payload.answers,
        durationSeconds: payload.durationSeconds,
      });
      if (result.chancesAwarded > 0) {
        addChances(result.chancesAwarded);
      }
      useCampaignStore.setState((s) => ({
        campaign: {
          ...s.campaign,
          last_test_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      }));
      refresh();
      return result;
    },
    [addChances, config, questions, refresh, student.id]
  );

  return (
    <>
      {!started ? (
        <div className="mx-auto max-w-lg px-6 py-12">
          <div className="rounded-[1.5rem] border border-slate-100 bg-white p-6 shadow-sm">
            <h1 className="text-xl font-extrabold text-primary-deep">شروع تست</h1>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              حالت و تعداد سوال را انتخاب کن. در تمرین بعد از هر پاسخ توضیح می‌بینی؛ در
              آزمون شبیه‌سازی فقط در پایان تصحیح می‌شود.
            </p>

            <div className="mt-5 space-y-2">
              {(Object.keys(MODE_LABELS) as TestMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setConfig((c) => ({ ...c, mode }))}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-bold ${
                    config.mode === mode
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-slate-100 text-slate-600"
                  }`}
                >
                  {MODE_LABELS[mode]}
                </button>
              ))}
            </div>

            {config.mode === "practice" && (
              <div className="mt-4 flex gap-2">
                {PRACTICE_COUNTS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setConfig((c) => ({ ...c, count: n }))}
                    className={`flex-1 rounded-xl border py-2 text-sm font-bold ${
                      config.count === n
                        ? "border-primary bg-primary text-white"
                        : "border-slate-100 text-slate-600"
                    }`}
                  >
                    {toPersianDigits(n)} سوال
                  </button>
                ))}
              </div>
            )}

            <Button
              className="mt-6 w-full"
              onClick={() => {
                setSessionKey((k) => k + 1);
                setStarted(true);
              }}
            >
              شروع {MODE_LABELS[config.mode]}
            </Button>
          </div>
        </div>
      ) : (
        <TestRunner
          key={sessionKey}
          config={config}
          questions={questions}
          durationSeconds={durationSeconds}
          immediateFeedback={config.mode !== "exam"}
          onSubmit={handleSubmit}
          backHref="/student/profile/"
        />
      )}
    </>
  );
}

export default function StudentPracticePage() {
  return (
    <div className="min-h-dvh bg-lavender/20">
      <AppHeader authLabel="پروفایل" authHref="/student/profile" />
      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center text-slate-400">
            در حال آماده‌سازی تست...
          </div>
        }
      >
        <PracticeContent />
      </Suspense>
    </div>
  );
}
