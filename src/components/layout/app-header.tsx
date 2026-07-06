"use client";

import Link from "next/link";
import { Bell, User } from "lucide-react";
import { OwjLogo } from "@/components/layout/owj-logo";
import { cn } from "@/lib/utils/cn";

const headerNavLinks = [
  { href: "#", label: "درباره اوج" },
  { href: "#", label: "دوره‌ها" },
  { href: "#", label: "اساتید" },
  { href: "#", label: "بلاگ" },
  { href: "#", label: "تماس با ما" },
] as const;

interface AppHeaderProps {
  showAuth?: boolean;
  authLabel?: string;
  authHref?: string;
  className?: string;
}

export function AppHeader({
  showAuth = true,
  authLabel = "ورود / ثبت‌نام",
  authHref = "/login",
  className,
}: AppHeaderProps) {
  return (
    <header className={cn("border-b border-slate-100 bg-white", className)}>
      <div className="relative mx-auto h-16 max-w-[1600px] px-6 md:px-8">
        {/* لوگو + منو — سمت راست صفحه */}
        <div className="absolute inset-y-0 right-6 flex items-center gap-5 md:right-8 md:gap-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <OwjLogo />
            <span className="text-xl font-extrabold text-primary-deep">اوج</span>
          </Link>

          <nav className="hidden items-center gap-4 md:flex lg:gap-5" aria-label="منوی اصلی">
            {headerNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-sm font-medium text-slate-600 transition hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ورود + اعلان — سمت چپ صفحه */}
        <div className="absolute inset-y-0 left-6 flex items-center gap-3 md:left-8">
          {showAuth && (
            <Link
              href={authHref}
              className="flex h-10 items-center gap-2 rounded-xl border border-slate-100 px-4 text-sm font-medium text-primary-deep transition hover:bg-lavender-soft"
            >
              <User className="h-4 w-4 text-slate-500" aria-hidden />
              <span className="hidden sm:inline">{authLabel}</span>
            </Link>
          )}
          <button
            type="button"
            aria-label="اعلان‌ها"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-lavender-soft"
          >
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
