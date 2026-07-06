"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useApp } from "@/providers/app-provider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AlbertoChatModalProps {
  open: boolean;
  onClose: () => void;
}

export function AlbertoChatModal({ open, onClose }: AlbertoChatModalProps) {
  const { student } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `سلام ${student.full_name}! من آلبرتو هستم. هر سوالی درباره مطالعه، کنکور یا برنامه‌ریزی داری بپرس.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  if (!open) return null;

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat/alberto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, studentName: student.full_name }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "متأسفم، الان نتونستم پاسخ بدم. دوباره امتحان کن." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "خطا در ارتباط. لطفاً دوباره تلاش کن." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="flex h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h3 className="font-bold text-primary-deep">گفت‌وگو با آلبرتو</h3>
            <p className="text-xs text-slate-400">مشاور هوشمند کنکور</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-lavender"
            aria-label="بستن"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6",
                msg.role === "user"
                  ? "mr-auto bg-primary text-white"
                  : "ml-auto bg-lavender-soft text-primary-deep"
              )}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="ml-auto flex items-center gap-2 rounded-2xl bg-lavender-soft px-4 py-3 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              در حال نوشتن...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-slate-100 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="پیام خود را بنویسید..."
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white transition hover:opacity-90 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
