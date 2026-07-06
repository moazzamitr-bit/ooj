const otpStore = new Map<string, { code: string; expiresAt: number }>();

export function storeOtp(phone: string, code: string, ttlMs = 5 * 60 * 1000) {
  otpStore.set(phone, { code, expiresAt: Date.now() + ttlMs });
}

export function verifyStoredOtp(phone: string, code: string) {
  const entry = otpStore.get(phone);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(phone);
    return false;
  }
  const ok = entry.code === code;
  if (ok) otpStore.delete(phone);
  return ok;
}

export function generateOtp() {
  return process.env.NODE_ENV === "development" ? "123456" : String(Math.floor(100000 + Math.random() * 900000));
}
