"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Layers,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { SubjectIcon } from "@/components/dashboard/subject-icon";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils/cn";
import {
  courseCycle,
  flashcardStats,
  studySubjectOrder,
  yesterdayPath,
} from "@/lib/data/student-home-data";
import { formatPercent } from "@/lib/utils/persian";
import { useApp } from "@/providers/app-provider";
import { useStudentStore } from "@/store/student-store";
import type { Subject } from "@/types";

const subjectThemes: Record<string, { ring: string; bg: string; text: string }> = {
  sub_chem: { ring: "ring-[#2F80FF]/30", bg: "bg-[#2F80FF]/10", text: "text-[#2F80FF]" },
  sub_physics: { ring: "ring-[#6D4DFF]/30", bg: "bg-[#6D4DFF]/10", text: "text-[#6D4DFF]" },
  sub_bio: { ring: "ring-[#20C997]/30", bg: "bg-[#20C997]/10", text: "text-[#20C997]" },
  sub_math: { ring: "ring-[#111A4C]/30", bg: "bg-[#111A4C]/10", text: "text-[#111A4C]" },
};

function HomeCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-[0_4px_20px_rgb(17_26_76_0.04)] md:p-6",
        className
      )}
    >
      {children}
    </motion.article>
  );
}

export function ContinueYesterdayCard() {
  const { setActiveSubject } = useStudentStore();

  const handleContinue = () => {
    setActiveSubject(yesterdayPath.subjectId);
  };

  return (
    <HomeCard delay={0.05} className="bg-gradient-to-bl from-[#F8F5FF] via-white to-white">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Play className="h-5 w-5" aria-hidden />
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
          دیروز
        </span>
      </div>

      <h2 className="text-lg font-extrabold text-primary-deep">ادامه مسیر دیروز</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        {yesterdayPath.subjectName} · {yesterdayPath.chapterTitle}
      </p>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
          <span>پیشرفت فصل</span>
          <span className="font-bold text-primary">{formatPercent(yesterdayPath.progressPercent)}</span>
        </div>
        <Progress value={yesterdayPath.progressPercent} barClassName="bg-gradient-to-l from-primary to-electric-blue" />
      </div>

      <p className="mt-3 text-xs text-slate-400">
        حدود {yesterdayPath.minutesLeft} دقیقه تا اتمام این بخش باقی مانده
      </p>

      <Link
        href="/student/profile"
        onClick={handleContinue}
        className="mt-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-l from-primary to-electric-blue py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:opacity-95"
      >
        ادامه مطالعه
        <ArrowLeft className="h-4 w-4" aria-hidden />
      </Link>
    </HomeCard>
  );
}

export function CourseCycleCard() {
  const cyclePercent = Math.round((courseCycle.completedLessons / courseCycle.totalLessons) * 100);

  return (
    <HomeCard delay={0.1}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric-blue/10 text-electric-blue">
          <RotateCcw className="h-5 w-5" aria-hidden />
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
          روز {courseCycle.currentDay} از {courseCycle.totalDays}
        </span>
      </div>

      <h2 className="text-lg font-extrabold text-primary-deep">دوره کردن دروس</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        برنامه امروز: <span className="font-semibold text-primary-deep">{courseCycle.todaySubject}</span>
      </p>

      <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>درس‌های امروز</span>
          <span className="font-bold text-primary-deep">
            {courseCycle.completedLessons} از {courseCycle.totalLessons}
          </span>
        </div>
        <div className="mt-3">
          <Progress value={cyclePercent} barClassName="bg-gradient-to-l from-electric-blue to-primary" />
        </div>
      </div>

      <Link
        href="/student/profile"
        className="mt-auto flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white py-3 text-sm font-bold text-primary transition hover:bg-lavender-soft"
      >
        <BookOpen className="h-4 w-4" aria-hidden />
        مشاهده برنامه دوره
      </Link>
    </HomeCard>
  );
}

export function FlashcardCard() {
  return (
    <HomeCard delay={0.15} className="bg-gradient-to-bl from-[#F0F7FF] via-white to-white">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-warning/15 text-warning">
          <Layers className="h-5 w-5" aria-hidden />
        </div>
        <span className="flex items-center gap-1 rounded-full bg-warning/10 px-2.5 py-1 text-[11px] font-semibold text-warning">
          <Sparkles className="h-3 w-3" aria-hidden />
          {flashcardStats.streakDays} روز پیاپی
        </span>
      </div>

      <h2 className="text-lg font-extrabold text-primary-deep">فلش‌کارت</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        مرور سریع مفاهیم برای ماندگاری بیشتر در حافظه
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
          <p className="text-2xl font-extrabold text-primary">{flashcardStats.dueToday}</p>
          <p className="mt-1 text-xs text-slate-500">کارت امروز</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
          <p className="text-2xl font-extrabold text-success">{flashcardStats.mastered}</p>
          <p className="mt-1 text-xs text-slate-500">تسلط یافته</p>
        </div>
      </div>

      <button
        type="button"
        className="mt-auto rounded-full bg-gradient-to-l from-warning to-[#FFB84D] py-3 text-sm font-bold text-white shadow-lg shadow-warning/20 transition hover:opacity-95"
      >
        شروع فلش‌کارت
      </button>
    </HomeCard>
  );
}

function SubjectPickButton({ subject }: { subject: Subject }) {
  const router = useRouter();
  const { setActiveSubject } = useStudentStore();
  const { subjectProgress } = useApp();
  const theme = subjectThemes[subject.id] ?? subjectThemes.sub_chem;
  const progress = subjectProgress[subject.id] ?? 0;

  const handleSelect = () => {
    setActiveSubject(subject.id);
    router.push("/student/profile");
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className={cn(
        "flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-3 transition hover:border-primary/20 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl ring-2",
          theme.bg,
          theme.text,
          theme.ring
        )}
      >
        <SubjectIcon subjectId={subject.id} />
      </div>
      <span className="text-sm font-bold text-primary-deep">{subject.name}</span>
      <span className="text-[11px] text-slate-400">{formatPercent(progress)}</span>
    </button>
  );
}

export function SubjectPickerCard() {
  const { subjects } = useApp();
  const orderedSubjects = studySubjectOrder
    .map((id) => subjects.find((s) => s.id === id))
    .filter(Boolean) as Subject[];

  return (
    <HomeCard delay={0.2}>
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-success/10 text-success">
        <BookOpen className="h-5 w-5" aria-hidden />
      </div>

      <h2 className="text-lg font-extrabold text-primary-deep">انتخاب درس برای مطالعه</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        یکی از دروس را انتخاب کن تا ساختار مطالعه‌ات در پروفایل باز شود
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {orderedSubjects.map((subject) => (
          <SubjectPickButton key={subject.id} subject={subject} />
        ))}
      </div>
    </HomeCard>
  );
}
