import {
  createReferral,
  getInvitedFriends,
  getReferralStats,
  loadLocalDb,
} from "@/lib/local-db";

export function getStudentReferralStats(studentId: string) {
  const stats = getReferralStats(studentId);
  const db = loadLocalDb();
  const student = db.students.find((s) => s.id === studentId);
  return {
    ...stats,
    totalChances: student?.total_chances ?? 0,
  };
}

export function getStudentInvitedFriends(studentId: string) {
  return getInvitedFriends(studentId);
}

export function inviteFriend(studentId: string, phone: string) {
  if (!/^09\d{9}$/.test(phone)) {
    return { success: false, message: "شماره موبایل معتبر نیست." };
  }
  const stats = getReferralStats(studentId);
  if (stats.sent >= stats.maxInvites) {
    return { success: false, message: "به حداکثر تعداد دعوت رسیده‌اید." };
  }
  createReferral(studentId, phone);
  return { success: true, message: "دعوت با موفقیت ارسال شد." };
}
