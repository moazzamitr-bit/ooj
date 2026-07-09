"use client";

import { useState } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { getAlbertBullets } from "@/lib/data/profile-mock-data";
import { AlbertoChatModal } from "@/components/dashboard/alberto-chat-modal";
import { useApp } from "@/providers/app-provider";

const albertoVideoSrc = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/videos/alberto-idle-loop.mp4`;

interface AlbertoCardProps {
  className?: string;
  compact?: boolean;
}

export function AlbertoCard({ className, compact }: AlbertoCardProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const { student } = useApp();
  const firstName = student.full_name.split(" ")[0] || "دوست من";
  const bullets = getAlbertBullets(firstName);

  return (
    <>
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-l from-[#F3F0FF] to-[#EDE8FF] shadow-[0_4px_20px_rgb(17_26_76_0.04)]",
          className
        )}
      >
        <div
          className={cn(
            "flex h-full min-h-0",
            compact ? "flex-col md:flex-row md:items-stretch" : "flex-col gap-4 md:flex-row md:items-stretch"
          )}
        >
          <div className="z-10 m-3 flex min-h-0 min-w-0 flex-1 flex-col rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgb(17_26_76_0.06)] md:m-4 md:p-6">
            <div className="mb-4 flex items-center justify-end gap-2">
              <h2 className="text-lg font-extrabold text-primary-deep md:text-xl">آلبرتو</h2>
              <Sparkles className="h-5 w-5 text-primary" aria-hidden />
            </div>

            <ul className="flex-1 space-y-2.5 overflow-y-auto">
              {bullets.map((item) => (
                <li
                  key={item.text}
                  className="text-sm leading-7 text-primary-deep md:text-base md:leading-8"
                >
                  <span className="whitespace-pre-line">{item.text}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setChatOpen(true)}
              className="mt-5 flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-l from-primary to-electric-blue px-4 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:opacity-95 md:text-base"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="h-4 w-4" aria-hidden />
              </span>
              من همیشه بیدارم... کلیکم کن!
            </button>
          </div>

          <div className="relative order-first h-64 w-full shrink-0 overflow-hidden md:order-none md:h-full md:min-h-0 md:w-[44%]">
            <video
              src={albertoVideoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full scale-[1.15] object-cover object-[center_28%]"
              aria-label="آلبرتو، مشاور هوشمند اوج"
            />
          </div>
        </div>
      </div>

      <AlbertoChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
