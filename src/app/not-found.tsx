"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * GitHub Pages serves this for unknown paths.
 * Legacy invite URLs like /ooj/invite/OWJ-xxx/ are rewritten to /ooj/invite/?code=OWJ-xxx
 */
export default function NotFound() {
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const prefix = `${base}/invite/`;
    if (path.startsWith(prefix) || path === `${base}/invite`) {
      const rest = path.slice(prefix.length);
      const code = rest.split("/")[0];
      if (code && code !== "index.html") {
        window.location.replace(`${base}/invite/?code=${encodeURIComponent(decodeURIComponent(code))}`);
        return;
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      <h1 className="text-2xl font-extrabold text-primary-deep">صفحه پیدا نشد</h1>
      <p className="text-slate-500">اگر از لینک دعوت آمده‌اید، چند لحظه صبر کنید...</p>
      <Link href="/" className="text-primary underline">
        بازگشت به خانه
      </Link>
    </div>
  );
}
