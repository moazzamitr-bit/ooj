import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

const OPEN_KEY = "owj_invite_opens_v1";
const LAST_KEY = "owj_last_invite_open";

/**
 * Record an invite link open. Other tabs (the referrer) pick this up via the `storage` event.
 * Same-tab listeners are intentionally not notified — the opener must not self-award.
 */
export function broadcastInviteOpen(code: string) {
  if (typeof window === "undefined" || !code) return;
  const payload = { code, at: Date.now() };
  try {
    const prev = JSON.parse(localStorage.getItem(OPEN_KEY) || "[]") as unknown[];
    const next = [...prev, payload].slice(-50);
    localStorage.setItem(OPEN_KEY, JSON.stringify(next));
    localStorage.setItem(LAST_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }

  if (isSupabaseConfigured) {
    void supabase.from("campaign_sms_log").insert({
      phone: code,
      template_key: "invite_open",
      body: `invite_open:${code}`,
      status: "simulated",
    });
  }
}

export function listenInviteOpens(handler: (code: string) => void) {
  if (typeof window === "undefined") return () => undefined;

  const onStorage = (e: StorageEvent) => {
    if (e.key !== LAST_KEY || !e.newValue) return;
    try {
      const parsed = JSON.parse(e.newValue) as { code?: string };
      if (parsed.code) handler(parsed.code);
    } catch {
      /* ignore */
    }
  };

  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}
