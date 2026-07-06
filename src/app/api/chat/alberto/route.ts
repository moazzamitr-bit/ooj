import { NextResponse } from "next/server";

const FALLBACK_RESPONSES: Record<string, string> = {
  default:
    "سلام! من آلبرتو هستم. هر سوالی درباره برنامه مطالعه، انتخاب رشته یا استراتژی کنکور داری بپرس.",
  مطالعه:
    "پیشنهاد من: هر روز ۲ ساعت مطالعه متمرکز + ۱ ساعت تست‌زنی. فصل‌های ضعیف‌تر رو صبح بخون، وقتی ذهنت تازه‌تره.",
  شیمی:
    "شیمی رو با مفاهیم پایه شروع کن. فصل ساختار اتم و جدول تناوبی پایه همه فصل‌هاست. هر روز ۱۵ تست بزن.",
  کنکور:
    "برای کنکور، اول نقشه درسی بکش. هفته‌ای ۳ جلسه مرور + ۴ جلسه تست‌زنی داشته باش. من کنارت هستم!",
};

function getFallbackReply(message: string) {
  const lower = message.toLowerCase();
  for (const [key, reply] of Object.entries(FALLBACK_RESPONSES)) {
    if (key !== "default" && lower.includes(key)) return reply;
  }
  return FALLBACK_RESPONSES.default;
}

export async function POST(request: Request) {
  try {
    const { message, studentName } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({ success: false, message: "پیام خالی است." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `تو آلبرتو، مشاور هوشمند کنکور پلتفرم اوج هستی. به فارسی و دوستانه پاسخ بده. دانش‌آموز: ${studentName ?? "کاربر"}.`,
            },
            { role: "user", content: message },
          ],
          max_tokens: 300,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content ?? getFallbackReply(message);
        return NextResponse.json({ success: true, reply });
      }
    }

    return NextResponse.json({
      success: true,
      reply: getFallbackReply(message),
      fallback: true,
    });
  } catch {
    return NextResponse.json({ success: false, message: "خطا در پاسخ‌دهی." }, { status: 500 });
  }
}
