"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Day4RedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/student/games/iran-tour/");
  }, [router]);
  return (
    <div className="flex min-h-screen items-center justify-center text-slate-500">
      در حال ورود به تور ایران‌گردی...
    </div>
  );
}
