"use client";

import Link from "next/link";
import { Bell, User } from "lucide-react";
import { OwjLogo } from "@/components/layout/owj-logo";
import { cn } from "@/lib/utils/cn";

interface AppHeaderProps {
  showAuth?: boolean;
  authLabel?: string;
  authHref?: string;
  className?: string;
}

export function AppHeader({
  showAuth = true,
  authLabel = "ورود / ثبت‌نام",
  authHref = "/parent/dashboard",
  className,
}: AppHeaderProps) {
  return (
    <header className={cn("border-b border-slate-100 bg-white", className)}>
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="اعلان‌ها"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-lavender-soft"
          >
            <Bell className="h-5 w-5" />
          </button>
          {showAuth && (
            <Link
              href={authHref}
              className="flex h-10 items-center gap-2 rounded-xl border border-slate-100 px-4 text-sm font-medium text-primary-deep transition hover:bg-lavender-soft"
            >
              <User className="h-4 w-4 text-slate-500" aria-hidden />
              {authLabel}
            </Link>
          )}
        </div>

        <Link href="/" className="flex items-center gap-2.5">
          <OwjLogo />
          <span className="text-xl font-extrabold text-primary-deep">اوج</span>
        </Link>
      </div>
    </header>
  );
}
