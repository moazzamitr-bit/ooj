"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { getAlbertBullets } from "@/lib/data/profile-mock-data";
import { AlbertoChatModal } from "@/components/dashboard/alberto-chat-modal";
import { useApp } from "@/providers/app-provider";
import albertoPortrait from "@/assets/images/alberto-portrait.png";

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
          <div className="z-10 m-3 flex min-h-0 min-w-0 flex-1 flex-col rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgb(17_26_76_0.06)] md:m-4 md:p-8">
            <div className="mb-5 flex items-center justify-start gap-3">
              <h2 className="text-2xl font-extrabold text-primary-deep md:text-3xl">آلبرتو</h2>
              <Sparkles className="h-7 w-7 shrink-0 text-primary md:h-8 md:w-8" aria-hidden />
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-3 overflow-y-auto py-1 md:gap-4 md:py-2">
              {bullets.map((item) => (
                <li
                  key={item.text}
                  className="text-[17px] font-medium leading-8 text-primary-deep md:text-[18px] md:leading-9"
                >
                  <span className="whitespace-pre-line">{item.text}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setChatOpen(true)}
              className="mt-6 flex h-14 w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-gradient-to-l from-primary to-electric-blue px-4 text-lg font-bold text-white shadow-lg shadow-primary/25 transition hover:opacity-95 md:h-16 md:text-xl"
            >
              من همیشه بیدارم... کلیکم کن!
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="h-4 w-4" aria-hidden />
              </span>
            </button>
          </div>

          <div className="relative order-first h-64 w-full shrink-0 overflow-hidden bg-[#F3F0FF] md:order-none md:h-full md:min-h-0 md:w-[54%]">
            <Image
              src={albertoPortrait}
              alt="آلبرتو، مشاور هوشمند اوج"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>

      <AlbertoChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
