"use client";

import { useState } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { getAlbertBullets } from "@/lib/data/profile-mock-data";
import { AlbertoChatModal } from "@/components/dashboard/alberto-chat-modal";
import { useApp } from "@/providers/app-provider";

const ALBERTO_DRIVE_ID = "15YzNFQGeO4YNTpeDg0ZXxOgR394waVRv";
const ALBERTO_DRIVE_PREVIEW = `https://drive.google.com/file/d/${ALBERTO_DRIVE_ID}/preview`;
const ALBERTO_DRIVE_STREAM = `https://drive.google.com/uc?export=download&id=${ALBERTO_DRIVE_ID}`;

interface AlbertoCardProps {
  className?: string;
  compact?: boolean;
}

function AlbertoMedia() {
  const [useIframe, setUseIframe] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const localSrc = `${basePath}/videos/alberto.mp4`;

  if (useIframe) {
    return (
      <iframe
        src={ALBERTO_DRIVE_PREVIEW}
        title="آلبرتو، مشاور هوشمند اوج"
        className="absolute top-1/2 left-1/2 h-[135%] w-[135%] -translate-x-1/2 -translate-y-1/2 border-0"
        allow="autoplay; fullscreen; encrypted-media"
      />
    );
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="h-full w-full object-cover object-[center_12%]"
      onError={() => setUseIframe(true)}
    >
      <source src={localSrc} type="video/mp4" />
      <source src={ALBERTO_DRIVE_STREAM} type="video/mp4" />
    </video>
  );
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

          <div className="relative order-first h-64 w-full shrink-0 overflow-hidden bg-[#EDE8FF] md:order-none md:h-full md:min-h-0 md:w-[44%]">
            <AlbertoMedia />
          </div>
        </div>
      </div>

      <AlbertoChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
