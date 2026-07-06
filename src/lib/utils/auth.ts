import { AUTH_KEY, loadLocalDb, saveLocalDb, getLocalStudentByUserId } from "@/lib/local-db";
import { mockStudent } from "@/lib/data/mock-data";
import type { User, UserRole } from "@/types";

const MOCK_OTP = "123456";

export interface AuthSession {
  user: User;
  token: string;
}

export async function sendOtp(phone: string): Promise<{ success: boolean; message: string }> {
  await delay(600);
  if (!/^09\d{9}$/.test(phone)) {
    return { success: false, message: "شماره موبایل معتبر نیست." };
  }
  const db = loadLocalDb();
  db.otp_codes[phone] = { code: MOCK_OTP, expires_at: Date.now() + 5 * 60 * 1000 };
  saveLocalDb(db);
  return { success: true, message: `کد تأیید (${MOCK_OTP}) ارسال شد.` };
}

export async function verifyOtp(
  phone: string,
  otp: string,
  role: UserRole = "student"
): Promise<{ success: boolean; session?: AuthSession; message: string }> {
  await delay(800);

  const db = loadLocalDb();
  const otpEntry = db.otp_codes[phone];
  const otpValid =
    otp === MOCK_OTP || (otpEntry && otpEntry.expires_at > Date.now() && otpEntry.code === otp);
  if (!otpValid) {
    return { success: false, message: "کد تأیید نادرست است." };
  }
  delete db.otp_codes[phone];

  let user = db.users.find((u) => u.phone === phone);
  if (!user) {
    user = {
      id: `user_${phone.slice(-4)}`,
      phone,
      role,
      created_at: new Date().toISOString(),
    };
    db.users.push(user);
  }

  if (role === "student" && !getLocalStudentByUserId(user.id)) {
    db.students.push({
      ...mockStudent,
      id: `student_${phone.slice(-4)}`,
      user_id: user.id,
      referral_code: `OWJ-${phone.slice(-4)}`,
      total_chances: 0,
      created_at: new Date().toISOString(),
    });
    db.chapter_progress[`student_${phone.slice(-4)}`] = {};
    db.wallet_balance[`student_${phone.slice(-4)}`] = 0;
    db.quiz_completed[`student_${phone.slice(-4)}`] = false;
  }

  saveLocalDb(db);

  const session: AuthSession = {
    user,
    token: `mock_token_${phone}`,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  }

  return { success: true, session, message: "ورود با موفقیت انجام شد." };
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

export function clearSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
