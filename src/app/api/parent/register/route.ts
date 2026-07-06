import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { childPhone, grade, field, province, city } = body;

    if (!childPhone || !grade || !field || !province || !city) {
      return NextResponse.json({ success: false, message: "همه فیلدها الزامی است." }, { status: 400 });
    }

    if (!/^09\d{9}$/.test(childPhone)) {
      return NextResponse.json({ success: false, message: "شماره موبایل معتبر نیست." });
    }

    const supabase = createServerSupabase();
    if (supabase) {
      const referralCode = `OWJ-${childPhone.slice(-4)}${Date.now().toString(36).slice(-4).toUpperCase()}`;

      const { data: user, error: userErr } = await supabase
        .from("users")
        .insert({ phone: childPhone, role: "student" })
        .select()
        .single();

      if (userErr && !userErr.message.includes("duplicate")) throw userErr;

      const { data: student, error: stuErr } = await supabase
        .from("students")
        .insert({
          user_id: user?.id,
          full_name: "دانش‌آموز جدید",
          province,
          city,
          grade,
          field,
          target_major: "نامشخص",
          referral_code: referralCode,
        })
        .select()
        .single();

      if (stuErr) throw stuErr;

      return NextResponse.json({
        success: true,
        studentId: student.id,
        referralCode,
        message: "ثبت‌نام با موفقیت انجام شد.",
      });
    }

    return NextResponse.json({
      success: true,
      clientSide: true,
      message: "از سمت کلاینت ذخیره شود.",
    });
  } catch {
    return NextResponse.json({ success: false, message: "خطا در ثبت‌نام." }, { status: 500 });
  }
}
