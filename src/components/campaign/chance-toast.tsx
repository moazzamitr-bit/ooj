"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { chanceToastMessage } from "@/lib/campaign/copy";
import { useCampaignStore } from "@/store/campaign-store";

export function ChanceToast() {
  const toast = useCampaignStore((s) => s.chanceToast);
  const clear = useCampaignStore((s) => s.clearChanceToast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => clear(), 4500);
    return () => clearTimeout(t);
  }, [toast, clear]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[80] w-[min(92vw,420px)] -translate-x-1/2">
      <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-[0_12px_40px_rgba(16,185,129,0.25)]">
        <span className="text-2xl">🎁</span>
        <p className="flex-1 text-sm font-bold leading-6 text-primary-deep">
          {chanceToastMessage(toast.added, toast.total)}
        </p>
        <button
          type="button"
          onClick={clear}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
          aria-label="بستن"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
