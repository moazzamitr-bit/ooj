"use client";

import { useState } from "react";
import { CopyReferralLink } from "@/components/referral/copy-referral-link";
import { ReferralRewardBanner } from "@/components/referral/referral-reward-banner";
import { AppHeader } from "@/components/layout/app-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { referralStatusLabels } from "@/lib/data/mock-data";
import { formatPersianNumber } from "@/lib/utils/persian";
import { useApp } from "@/providers/app-provider";
import {
  getStudentInvitedFriends,
  getStudentReferralStats,
  inviteFriend,
} from "@/lib/services/referral.service";

export default function StudentReferralPage() {
  const { student, refresh } = useApp();
  const stats = getStudentReferralStats(student.id);
  const invitedFriends = getStudentInvitedFriends(student.id);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const shareText = encodeURIComponent(
    `با لینک دعوت من به اوج بپیوند! https://owj.app/invite/${student.referral_code}`
  );
  const shareUrl = `https://owj.app/invite/${student.referral_code}`;

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = inviteFriend(student.id, phone);
    setLoading(false);
    setMessage(result.message);
    if (result.success) {
      setPhone("");
      refresh();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AppHeader authLabel="داشبورد" authHref="/student/profile" />

      <main className="mx-auto max-w-[900px] px-6 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-primary-deep">
            دوستاتو دعوت کن، شانس طلایی بگیر
          </h1>
          <p className="mt-3 text-slate-500">
            حداکثر {formatPersianNumber(stats.maxInvites)} دوست می‌تونی دعوت کنی
          </p>
        </div>

        <div className="mt-8">
          <CopyReferralLink referralCode={student.referral_code} />
        </div>

        <Card className="mt-6 border-violet-100">
          <CardHeader>
            <CardTitle className="text-base">دعوت با شماره موبایل</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvite} className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="invite-phone" className="sr-only">
                  شماره موبایل
                </Label>
                <Input
                  id="invite-phone"
                  type="tel"
                  placeholder="09123456789"
                  dir="ltr"
                  className="text-left"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" variant="gradient" disabled={loading}>
                {loading ? "..." : "ارسال دعوت"}
              </Button>
            </form>
            {message && <p className="mt-2 text-sm text-slate-500">{message}</p>}
          </CardContent>
        </Card>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            📱 واتساپ
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[#0088cc] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            ✈️ تلگرام
          </a>
          <a
            href={`sms:?body=${shareText}`}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            💬 پیامک
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard title="دعوت‌های ارسال‌شده" value={formatPersianNumber(stats.sent)} icon="📤" />
          <StatCard title="ثبت‌نام‌شده‌ها" value={formatPersianNumber(stats.registered)} icon="✅" />
          <StatCard title="تست اول کامل‌شده" value={formatPersianNumber(stats.quizCompleted)} icon="📝" />
          <StatCard title="مجموع شانس‌ها" value={formatPersianNumber(stats.totalChances)} icon="🎰" />
        </div>

        <Card className="mt-8 border-violet-100">
          <CardHeader>
            <CardTitle className="text-base">دوستان دعوت‌شده</CardTitle>
          </CardHeader>
          <CardContent>
            {invitedFriends.length === 0 ? (
              <p className="text-center text-sm text-slate-400">هنوز کسی دعوت نشده.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-violet-100">
                      <th className="px-4 py-3 text-right font-bold text-primary-deep">شانس کسب‌شده</th>
                      <th className="px-4 py-3 text-right font-bold text-primary-deep">وضعیت</th>
                      <th className="px-4 py-3 text-right font-bold text-primary-deep">شماره</th>
                      <th className="px-4 py-3 text-right font-bold text-primary-deep">نام</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invitedFriends.map((friend, i) => (
                      <tr key={i} className="border-b border-violet-50">
                        <td className="px-4 py-3 font-medium text-primary">
                          {formatPersianNumber(friend.earnedChances)}
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={
                              friend.status === "quiz_completed"
                                ? "success"
                                : friend.status === "registered"
                                ? "purple"
                                : "default"
                            }
                          >
                            {referralStatusLabels[friend.status]}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 dir-ltr text-left text-slate-500">{friend.phone}</td>
                        <td className="px-4 py-3 text-primary-deep">{friend.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 space-y-4 rounded-2xl border border-violet-100 bg-lavender/30 p-6">
          <h3 className="font-bold text-primary-deep">قوانین کمپین:</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• هر دوست ثبت‌نام‌شده = ۱ شانس</li>
            <li>• هر دوست که تست اول را کامل کند = ۲ شانس اضافه</li>
            <li>• حداکثر ۱۰ دعوت در کل</li>
          </ul>
        </div>

        <div className="mt-8">
          <ReferralRewardBanner />
        </div>
      </main>
    </div>
  );
}
