"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Alias route for Day 3 */
export default function Day3RedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/student/games/treasure/");
  }, [router]);
  return (
    <div className="flex min-h-screen items-center justify-center text-slate-500">
      در حال ورود به گنج قارون...
    </div>
  );
}
