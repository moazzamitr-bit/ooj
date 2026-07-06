"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, MessageCircle, Send, Sparkles } from "lucide-react";
import albertoImage from "@/assets/images/alberto.png";
import { cn } from "@/lib/utils/cn";

interface ReferralHeroProps {
  referralCode: string;
  shareUrl: string;
  shareText: string;
}

export function ReferralHero({ referralCode, shareUrl, shareText }: ReferralHeroProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const copy = async (text: string, type: "link" | "code") => {
    await navigator.clipboard.writeText(text);
    if (type === "link") {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const displayCode = referralCode.replace(/^OWJ-/, "OJ").slice(0, 8).toUpperCase();

  return (
    <section className="relative overflow-hidden rounded-[2rem] gradient-referral gradient-mesh p-6 md:p-10 lg:p-12">
      <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-electric-blue/10 blur-3xl" />

      <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        {/* آلبرتو + حباب */}
        <div className="relative order-2 flex justify-center lg:order-1">
          <div className="relative w-full max-w-[340px]">
            <div className="absolute -top-2 right-4 z-10 max-w-[220px] rounded-2xl border border-white/70 bg-white/95 px-4 py-3 text-sm font-medium leading-7 text-primary-deep shadow-lg backdrop-blur-sm">
              با دعوت هر دوست، شانس تو در کنکور و بعد از آن بیشتر می‌شود!
              <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-white/70 bg-white/95" />
            </div>

            <div className="relative mt-16 h-[280px] w-full overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-[#E8E0FF]/60 to-transparent md:h-[320px]">
              <Image
                src={albertoImage}
                alt="آلبرتو"
                fill
                className="object-cover object-[center_10%]"
                sizes="340px"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F0EBFF] to-transparent" />
            </div>

            <div className="absolute bottom-8 left-4 text-4xl drop-shadow-lg" aria-hidden>
              🎟️
            </div>
            <div className="absolute bottom-16 right-6 text-3xl drop-shadow-lg" aria-hidden>
              ⭐
            </div>
          </div>
        </div>

        {/* محتوا + کارت دعوت */}
        <div className="order-1 text-right lg:order-2">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            کمپین شانس طلایی
          </div>

          <h1 className="text-2xl font-extrabold leading-tight text-primary-deep md:text-4xl">
            دوستاتو دعوت کن،
            <span className="mt-1 block bg-gradient-to-l from-primary to-electric-blue bg-clip-text text-transparent">
              شانس طلایی بگیر.
            </span>
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
            هر دعوت، یه قدم به رتبه‌ی بهتر نزدیک‌تر!
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-white/80 bg-white p-5 shadow-[0_12px_40px_rgb(109_77_255_0.12)] md:p-6">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-500">کد دعوت شما</label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => copy(referralCode, "code")}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm transition hover:text-primary"
                    aria-label="کپی کد"
                  >
                    {copiedCode ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <span className="flex-1 text-left font-mono text-sm font-bold tracking-wider text-primary-deep dir-ltr">
                    {displayCode}
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-500">لینک دعوت اختصاصی شما</label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => copy(shareUrl, "link")}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm transition hover:text-primary"
                    aria-label="کپی لینک"
                  >
                    {copiedLink ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <span className="flex-1 truncate text-left text-xs text-slate-500 dir-ltr md:text-sm">
                    {shareUrl}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => copy(shareUrl, "link")}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-primary to-electric-blue py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:opacity-95"
              >
                {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedLink ? "کپی شد!" : "کپی لینک"}
              </button>

              <div className="grid grid-cols-3 gap-3 pt-1">
                {[
                  {
                    href: `sms:?body=${encodeURIComponent(shareText)}`,
                    label: "پیامک",
                    icon: MessageCircle,
                    color: "text-primary bg-primary/10",
                  },
                  {
                    href: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
                    label: "واتساپ",
                    icon: null,
                    emoji: "💬",
                    color: "text-[#25D366] bg-[#25D366]/10",
                  },
                  {
                    href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
                    label: "تلگرام",
                    icon: Send,
                    color: "text-[#0088cc] bg-[#0088cc]/10",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === "پیامک" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-white py-3 transition hover:border-primary/20 hover:shadow-sm"
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full text-lg",
                        item.color
                      )}
                    >
                      {item.emoji ?? (item.icon && <item.icon className="h-5 w-5" />)}
                    </span>
                    <span className="text-xs font-medium text-slate-600">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
