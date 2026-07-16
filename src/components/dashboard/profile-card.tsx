"use client";

import Image from "next/image";
import { GraduationCap, MapPin, Star, Target } from "lucide-react";
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
        "flex h-full w-fit max-w-[300px] shrink-0 flex-col justify-between rounded-2xl border border-violet-100/80 bg-gradient-to-br from-[#F7F4FF] via-white to-[#EEF4FF] p-5 shadow-[0_6px_24px_rgb(109_77_255_0.08)]",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div
            className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-electric-blue opacity-70"
            aria-hidden
          />
          <div className="relative h-[128px] w-[128px] overflow-hidden rounded-full border-[3px] border-white bg-slate-100 shadow-sm">
            <Image
              src={student.avatar_url ?? studentAvatar}
              alt={`عکس پروفایل ${student.full_name}`}
              fill
              className="object-cover object-[center_20%]"
              sizes="128px"
              priority
            />
          </div>
        </div>

        <div className="min-w-0 text-right">
          <h1 className="text-[1.35rem] font-extrabold leading-tight text-primary-deep">
            {student.full_name}
          </h1>

          <div className="mt-3 space-y-1.5 text-xs leading-5 text-slate-500">
            <p className="flex items-center justify-end gap-1.5">
              <span>{student.city}</span>
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            </p>
            <p className="flex items-center justify-end gap-1.5">
              <span>{student.grade}</span>
              <GraduationCap className="h-3.5 w-3.5 shrink-0 text-electric-blue" aria-hidden />
            </p>
            <p className="flex items-center justify-end gap-1.5 font-semibold text-primary-deep">
              <span>هدف {student.target_major}</span>
              <Target className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 rounded-xl border border-primary/10 bg-white/80 px-3 py-3">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <Star className="h-4 w-4 fill-amber-400 text-amber-500" aria-hidden />
          <span>تعداد شانس‌ها</span>
        </div>
        <span className="text-xl font-extrabold tabular-nums text-primary">
          {formatPersianNumber(student.total_chances)}
        </span>
      </div>
    </div>
  );
}
