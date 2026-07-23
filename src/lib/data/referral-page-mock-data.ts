/** داده‌های نمایشی صفحه دعوت — مطابق mockup */

import type { InvitedFriend } from "@/types";

export const referralPageStats = {
  sent: 27,
  registered: 16,
  quizCompleted: 9,
  totalChances: 34,
  maxInvites: 3,
};

export const referralPageFriends: InvitedFriend[] = [
  {
    name: "سارا محمدی",
    phone: "09123456789",
    status: "quiz_completed",
    earnedChances: 3,
    firstTestCompleted: true,
    invitedAgo: "۲ روز پیش",
    avatarColor: "from-pink-400 to-rose-500",
  },
  {
    name: "علی رضایی",
    phone: "09121234567",
    status: "registered",
    earnedChances: 1,
    firstTestCompleted: false,
    invitedAgo: "۵ روز پیش",
    avatarColor: "from-sky-400 to-blue-500",
  },
  {
    name: "مریم حسینی",
    phone: "09131234567",
    status: "quiz_completed",
    earnedChances: 3,
    firstTestCompleted: true,
    invitedAgo: "۱ هفته پیش",
    avatarColor: "from-violet-400 to-purple-500",
  },
  {
    name: "—",
    phone: "09141234567",
    status: "sent",
    earnedChances: 0,
    firstTestCompleted: false,
    invitedAgo: "۲ هفته پیش",
    avatarColor: "from-slate-300 to-slate-400",
  },
  {
    name: "رضا کریمی",
    phone: "09151234567",
    status: "registered",
    earnedChances: 1,
    firstTestCompleted: false,
    invitedAgo: "۳ هفته پیش",
    avatarColor: "from-emerald-400 to-teal-500",
  },
];

export const goldenChanceRules = [
  "هر دوستی که ثبت‌نام کند = ۱ شانس طلایی",
  "هر دوستی که تست اول را کامل کند = ۲ شانس طلایی اضافه",
  "شانس‌ها تا پایان فصل کنکور معتبرند",
];

export const referralTips = [
  { icon: "👥", text: "به هم‌کلاسی‌ها پیشنهاد بده" },
  { icon: "💬", text: "در گروه‌های مطالعه به اشتراک بگذار" },
  { icon: "✨", text: "تجربه‌ات از اوج را توصیف کن" },
];
