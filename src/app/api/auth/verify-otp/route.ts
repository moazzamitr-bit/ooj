import { NextResponse } from "next/server";
import { verifyStoredOtp } from "@/lib/server/otp-store";
import { createServerSupabase } from "@/lib/supabase/server";
import type { UserRole } from "@/types";

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

      let user = existing;
      if (!user) {
        const { data: created, error } = await supabase
          .from("users")
          .insert({ phone, role })
          .select()
          .single();
        if (error) throw error;
        user = created;
      }

      return NextResponse.json({
        success: true,
        message: "ورود با موفقیت انجام شد.",
        session: { user, token: `sb_${user.id}` },
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
  } catch {
    return NextResponse.json({ success: false, message: "خطا در تأیید کد." }, { status: 500 });
  }
}
