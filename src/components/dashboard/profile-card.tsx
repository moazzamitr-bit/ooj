"use client";

import { User } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatPersianNumber } from "@/lib/utils/persian";
import { useApp } from "@/providers/app-provider";

interface ProfileCardProps {
  className?: string;
}

export function ProfileCard({ className }: ProfileCardProps) {
  const { student } = useApp();

  return (
    <div className={cn("flex shrink-0 flex-col", className)}>
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-gradient-to-br from-sky-100 via-blue-50 to-violet-100 shadow-[0_8px_24px_rgb(47_128_255_0.15)] ring-1 ring-slate-100">
            <User className="h-14 w-14 text-slate-400/80" strokeWidth={1.2} aria-hidden />
          </div>
        </div>

        <div className="text-right">
          <h1 className="text-[1.35rem] font-extrabold text-primary-deep">{student.full_name}</h1>
          <p className="mt-1.5 text-sm text-slate-500">{student.city}</p>
          <p className="text-sm text-slate-500">{student.grade}</p>
          <p className="mt-1 text-sm font-semibold text-primary-deep">هدف {student.target_major}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-600">
        تعداد شانس‌ها{" "}
        <span className="tabular-nums font-extrabold text-primary">
          {formatPersianNumber(student.total_chances)}
        </span>
      </p>
    </div>
  );
}
