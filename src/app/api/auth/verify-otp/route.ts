import { NextResponse } from "next/server";
import { verifyStoredOtp } from "@/lib/server/otp-store";
import { createServerSupabase } from "@/lib/supabase/server";
import { mapSupabaseStudent, mapSupabaseUser } from "@/lib/supabase/mappers";
import type { UserRole } from "@/types";

async function ensureSupabaseStudent(
  supabase: NonNullable<ReturnType<typeof createServerSupabase>>,
  userId: string,
  phone: string
) {
  const { data: existing } = await supabase
    .from("students")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) return existing;

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
  return created;
}

export async function POST(request: Request) {
  try {
    const { phone, otp, role = "student" } = (await request.json()) as {
      phone: string;
      otp: string;
      role?: UserRole;
    };

    if (!/^09\d{9}$/.test(phone)) {
      return NextResponse.json({ success: false, message: "شماره موبایل معتبر نیست." });
    }

    const devBypass = process.env.NODE_ENV === "development" && otp === "123456";
    if (!devBypass && !verifyStoredOtp(phone, otp)) {
      return NextResponse.json({ success: false, message: "کد تأیید نادرست یا منقضی شده است." });
    }

    const supabase = createServerSupabase();
    if (supabase) {
      const { data: existing } = await supabase
        .from("users")
        .select("*")
        .eq("phone", phone)
        .maybeSingle();

      let userRow = existing;
      if (!userRow) {
        const { data: created, error } = await supabase
          .from("users")
          .insert({ phone, role })
          .select()
          .single();
        if (error) throw error;
        userRow = created;
      }

      const user = mapSupabaseUser(userRow);
      let student = null;

      if (role === "student") {
        const studentRow = await ensureSupabaseStudent(supabase, user.id, phone);
        student = mapSupabaseStudent(studentRow);
      }

      return NextResponse.json({
        success: true,
        message: "ورود با موفقیت انجام شد.",
        session: { user, token: `sb_${user.id}` },
        student,
      });
    }

    const session = {
      user: {
        id: `user_${phone.slice(-4)}`,
        phone,
        role,
        created_at: new Date().toISOString(),
      },
      token: `token_${phone}`,
    };

    return NextResponse.json({
      success: true,
      message: "ورود با موفقیت انجام شد.",
      session,
    });
  } catch (error) {
    console.error("verify-otp error:", error);
    return NextResponse.json({ success: false, message: "خطا در تأیید کد." }, { status: 500 });
  }
}
