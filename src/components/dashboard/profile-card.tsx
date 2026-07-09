"use client";

import Image from "next/image";
import { GraduationCap, MapPin, Sparkles, Star, Target } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatPersianNumber } from "@/lib/utils/persian";
import studentAvatar from "@/assets/images/student-avatar.png";
import { useApp } from "@/providers/app-provider";

interface ProfileCardProps {
  className?: string;
}

export function ProfileCard({ className }: ProfileCardProps) {
  const { student } = useApp();

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-[1.35rem] border border-violet-100/80 bg-gradient-to-br from-[#F7F4FF] via-white to-[#EEF4FF] p-5 shadow-[0_8px_32px_rgb(109_77_255_0.1)] md:p-6 xl:min-w-[300px]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -start-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-8 -end-6 h-24 w-24 rounded-full bg-electric-blue/10 blur-2xl"
        aria-hidden
      />

      <div className="relative flex items-start gap-4">
        <div className="relative shrink-0">
          <div
            className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary via-electric-blue to-primary opacity-80"
            aria-hidden
          />
          <div className="relative h-[96px] w-[96px] overflow-hidden rounded-full border-[3px] border-white bg-slate-100 shadow-[0_8px_24px_rgb(47_128_255_0.2)] md:h-[104px] md:w-[104px]">
            <Image
              src={student.avatar_url ?? studentAvatar}
              alt={`عکس پروفایل ${student.full_name}`}
              fill
              className="object-cover object-[center_20%]"
              sizes="104px"
              priority
            />
          </div>
          <span className="absolute -bottom-1 -end-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-primary to-electric-blue shadow-md">
            <Sparkles className="h-4 w-4 text-white" aria-hidden />
          </span>
        </div>

        <div className="min-w-0 flex-1 text-right">
          <h1 className="text-xl font-extrabold leading-tight text-primary-deep md:text-[1.4rem]">
            {student.full_name}
          </h1>

          <div className="mt-3 flex flex-col gap-2">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-100 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
              {student.city}
            </span>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-100 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
              <GraduationCap className="h-3.5 w-3.5 shrink-0 text-electric-blue" aria-hidden />
              {student.grade}
            </span>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/15 bg-primary/8 px-3 py-1.5 text-xs font-bold text-primary-deep">
              <Target className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
              هدف {student.target_major}
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-between gap-3 rounded-2xl border border-primary/15 bg-white/85 px-4 py-3.5 shadow-[inset_0_1px_0_rgb(255_255_255_0.8)] backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 shadow-sm">
            <Star className="h-5 w-5 fill-amber-400 text-amber-500" aria-hidden />
          </span>
          <p className="text-sm font-medium text-slate-600">تعداد شانس‌ها</p>
        </div>
        <p className="text-2xl font-extrabold tabular-nums text-primary md:text-[1.65rem]">
          {formatPersianNumber(student.total_chances)}
        </p>
      </div>
    </div>
  );
}
