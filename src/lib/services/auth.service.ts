import { isSupabaseConfigured } from "@/lib/supabase/client";
import { AUTH_KEY } from "@/lib/local-db";
import type { AuthSession } from "@/lib/utils/auth";
import type { Student, UserRole } from "@/types";

const useClientSupabase =
  isSupabaseConfigured && process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export async function sendOtp(phone: string): Promise<{ success: boolean; message: string }> {
  if (!/^09\d{9}$/.test(phone)) {
    return { success: false, message: "شماره موبایل معتبر نیست." };
  }

  if (useClientSupabase) {
    const { sendOtpViaSupabaseClient } = await import("@/lib/services/supabase-auth.client");
    return sendOtpViaSupabaseClient(phone);
  }

  if (isSupabaseConfigured) {
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    return res.json();
  }

  const { sendOtp: localSend } = await import("@/lib/utils/auth");
  return localSend(phone);
}

export async function verifyOtp(
  phone: string,
  otp: string,
  role: UserRole = "student"
): Promise<{ success: boolean; session?: AuthSession; student?: Student; message: string }> {
  if (useClientSupabase) {
    const { verifyOtpViaSupabaseClient } = await import("@/lib/services/supabase-auth.client");
    return verifyOtpViaSupabaseClient(phone, otp, role);
  }

  if (isSupabaseConfigured) {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp, role }),
    });
    const data = await res.json();
    if (data.success && data.session) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(data.session));
      if (data.student) {
        const { upsertLocalStudent } = await import("@/lib/local-db");
        upsertLocalStudent(data.student);
      }
    }
    return data;
  }

  const { verifyOtp: localVerify } = await import("@/lib/utils/auth");
  return localVerify(phone, otp, role);
}

export function getStoredSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
  }
}
