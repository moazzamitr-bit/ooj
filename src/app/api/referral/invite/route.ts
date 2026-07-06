import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { studentId, phone } = await request.json();

    if (!studentId || !phone) {
      return NextResponse.json({ success: false, message: "داده نامعتبر." }, { status: 400 });
    }

    if (!/^09\d{9}$/.test(phone)) {
      return NextResponse.json({ success: false, message: "شماره موبایل معتبر نیست." });
    }

    const supabase = createServerSupabase();
    if (supabase) {
      const { error } = await supabase.from("referrals").insert({
        referrer_student_id: studentId,
        referred_phone: phone,
        status: "sent",
      });
      if (error) throw error;
      return NextResponse.json({ success: true, message: "دعوت ثبت شد." });
    }

    return NextResponse.json({ success: true, clientSide: true });
  } catch {
    return NextResponse.json({ success: false, message: "خطا در ثبت دعوت." }, { status: 500 });
  }
}
