import { NextResponse } from "next/server";
import { generateOtp, storeOtp } from "@/lib/server/otp-store";

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!/^09\d{9}$/.test(phone)) {
      return NextResponse.json({ success: false, message: "شماره موبایل معتبر نیست." });
    }

    const code = generateOtp();
    storeOtp(phone, code);

    const message =
      process.env.NODE_ENV === "development"
        ? `کد تأیید (${code}) ارسال شد.`
        : "کد تأیید به شماره شما ارسال شد.";

    return NextResponse.json({ success: true, message });
  } catch {
    return NextResponse.json({ success: false, message: "خطا در ارسال کد." }, { status: 500 });
  }
}
