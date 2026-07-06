import { supabase } from "@/lib/supabase/client";
import { mapSupabaseStudent, mapSupabaseUser } from "@/lib/supabase/mappers";
import { upsertLocalStudent } from "@/lib/local-db";
import { AUTH_KEY } from "@/lib/local-db";
import type { AuthSession } from "@/lib/utils/auth";
import type { Student, UserRole } from "@/types";

const DEV_OTP = "123456";

async function ensureStudent(userId: string, phone: string) {
  const { data: existing } = await supabase
    .from("students")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) return mapSupabaseStudent(existing);

  const referralCode = `OWJ-${phone.slice(-4)}${Date.now().toString(36).slice(-4).toUpperCase()}`;
  const { data: created, error } = await supabase
    .from("students")
    .insert({
      user_id: userId,
      full_name: "دانش‌آموز جدید",
      province: "تهران",
      city: "تهران",
      grade: "دوازدهم",
      field: "تجربی",
      target_major: "نامشخص",
      referral_code: referralCode,
      total_chances: 0,
    })
    .select()
    .single();

  if (error) throw error;
  return mapSupabaseStudent(created);
}

/** ورود مستقیم از مرورگر — برای GitHub Pages (بدون API Route) */
export async function verifyOtpViaSupabaseClient(
  phone: string,
  otp: string,
  role: UserRole = "student"
): Promise<{ success: boolean; session?: AuthSession; student?: Student; message: string }> {
  const devBypass =
    (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") &&
    otp === DEV_OTP;

  if (!devBypass && otp !== DEV_OTP) {
    return { success: false, message: "کد تأیید نادرست است. (روی سایت آنلاین: 123456)" };
  }

  const { data: existing } = await supabase.from("users").select("*").eq("phone", phone).maybeSingle();

  let userRow = existing;
  if (!userRow) {
    const { data: created, error } = await supabase
      .from("users")
      .insert({ phone, role })
      .select()
      .single();
    if (error) {
      console.error(error);
      return { success: false, message: "خطا در ثبت کاربر در Supabase." };
    }
    userRow = created;
  }

  const user = mapSupabaseUser(userRow);
  let student: Student | undefined;

  if (role === "student") {
    try {
      student = await ensureStudent(user.id, phone);
      upsertLocalStudent(student);
    } catch {
      return { success: false, message: "خطا در ساخت پروفایل دانش‌آموز." };
    }
  }

  const session: AuthSession = { user, token: `sb_${user.id}` };
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));

  return { success: true, session, student, message: "ورود با موفقیت انجام شد." };
}

export async function sendOtpViaSupabaseClient(
  phone: string
): Promise<{ success: boolean; message: string }> {
  if (!/^09\d{9}$/.test(phone)) {
    return { success: false, message: "شماره موبایل معتبر نیست." };
  }
  return {
    success: true,
    message: `کد تأیید (${DEV_OTP}) ارسال شد.`,
  };
}
