"use client";

import { ChevronLeft, Star } from "lucide-react";
import { formatPersianNumber } from "@/lib/utils/persian";
import { cn } from "@/lib/utils/cn";
import type { InvitedFriend } from "@/types";

interface ReferralFriendsTableProps {
  friends: InvitedFriend[];
}

function StatusBadge({ status }: { status: InvitedFriend["status"] }) {
  const isRegistered = status !== "sent";
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        isRegistered ? "bg-success/10 text-success" : "bg-slate-100 text-slate-500"
      )}
    >
      {isRegistered ? "ثبت‌نام کرده" : "هنوز ثبت‌نام نکرده"}
    </span>
  );
}

function Avatar({ name, color }: { name: string; color?: string }) {
  const initial = name === "—" ? "?" : name.charAt(0);
  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white",
        color ?? "from-slate-400 to-slate-500"
      )}
    >
      {initial}
    </div>
  );
}

export function ReferralFriendsTable({ friends }: ReferralFriendsTableProps) {
  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-[0_4px_20px_rgb(17_26_76_0.04)]">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-lg font-extrabold text-primary-deep">دوستان و وضعیت دعوت‌ها</h2>
      </div>

      {friends.length === 0 ? (
        <p className="px-6 py-12 text-center text-sm text-slate-400">هنوز کسی دعوت نشده.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-xs text-slate-500">
                <th className="px-6 py-4 text-right font-semibold">نام دوست</th>
                <th className="px-4 py-4 text-right font-semibold">وضعیت ثبت‌نام</th>
                <th className="px-4 py-4 text-right font-semibold">تست اول</th>
                <th className="px-4 py-4 text-right font-semibold">شانس دریافتی</th>
                <th className="px-6 py-4 text-right font-semibold">زمان دعوت</th>
              </tr>
            </thead>
            <tbody>
              {friends.map((friend) => (
                <tr key={friend.phone} className="border-b border-slate-50 transition hover:bg-lavender-soft/40">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={friend.name} color={friend.avatarColor} />
                      <div>
                        <p className="font-semibold text-primary-deep">{friend.name}</p>
                        <p className="text-xs text-slate-400 dir-ltr text-right">{friend.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={friend.status} />
                  </td>
                  <td className="px-4 py-4">
                    {friend.firstTestCompleted ? (
                      <span className="font-medium text-success">تکمیل شده</span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {friend.earnedChances > 0 ? (
                      <span className="inline-flex items-center gap-1.5 font-bold text-warning">
                        {formatPersianNumber(friend.earnedChances)} شانس
                        <Star className="h-4 w-4 fill-warning" aria-hidden />
                      </span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {friend.invitedAgo ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="border-t border-slate-100 px-6 py-4">
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:opacity-80"
        >
          مشاهده همه دعوت‌ها
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </section>
  );
}
