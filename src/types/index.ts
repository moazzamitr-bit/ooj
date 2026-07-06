export type UserRole = "student" | "parent" | "admin";

export type StudentField = "تجربی" | "ریاضی" | "انسانی";

export type SubchapterType = "lesson" | "practice" | "test" | "review";

export type ReferralStatus = "sent" | "registered" | "quiz_completed" | "rewarded";

export type RewardType = "chance" | "cash";

export type UniversityType = "دولتی" | "آزاد";

export interface User {
  id: string;
  phone: string;
  role: UserRole;
  created_at: string;
}

export interface Student {
  id: string;
  user_id: string;
  parent_id: string | null;
  full_name: string;
  province: string;
  city: string;
  grade: string;
  field: StudentField;
  target_major: string;
  avatar_url: string | null;
  total_chances: number;
  referral_code: string;
  created_at: string;
}

export interface Parent {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  created_at: string;
}

export interface Subject {
  id: string;
  name: string;
  field: StudentField;
  grade: string;
  icon: string;
  color: string;
}

export interface Chapter {
  id: string;
  subject_id: string;
  title: string;
  order_index: number;
  test_progress_percent: number;
  study_progress_percent: number;
}

export interface Subchapter {
  id: string;
  chapter_id: string;
  title: string;
  order_index: number;
  type: SubchapterType;
}

export interface Question {
  id: string;
  subject_id: string;
  chapter_id: string;
  subchapter_id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: "a" | "b" | "c" | "d";
  explanation: string;
  difficulty: "آسان" | "متوسط" | "سخت";
  source_year: number;
  suggested_time_seconds: number;
  tags: string[];
}

export interface StudentAnswer {
  id: string;
  student_id: string;
  question_id: string;
  selected_option: "a" | "b" | "c" | "d";
  is_correct: boolean;
  time_spent_seconds: number;
  created_at: string;
}

export interface StudySession {
  id: string;
  student_id: string;
  subject_id: string;
  chapter_id: string;
  duration_minutes: number;
  test_count: number;
  correct_count: number;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_student_id: string;
  referred_phone: string;
  referred_student_id: string | null;
  status: ReferralStatus;
  reward_chances: number;
  cash_reward_amount: number;
  created_at: string;
}

export interface Reward {
  id: string;
  student_id: string;
  type: RewardType;
  amount: number;
  reason: string;
  created_at: string;
}

export interface AdmissionRankData {
  id: string;
  province: string;
  city: string;
  university_type: UniversityType;
  major: string;
  min_rank: number;
  year: number;
  created_at: string;
}

export interface DailyStudyData {
  day: string;
  studyMinutes: number;
  testCount: number;
}

export interface WeeklyStudyData {
  week: string;
  studyMinutes: number;
  testCount: number;
}

export interface MonthlyStudyData {
  month: string;
  studyMinutes: number;
  testCount: number;
}

export interface SubjectRadarData {
  subject: string;
  value: number;
}

export interface InvitedFriend {
  name: string;
  phone: string;
  status: ReferralStatus;
  earnedChances: number;
}

export interface ParentDailyReport {
  studyTimeMinutes: number;
  testsAnswered: number;
  accuracy: number;
  weeklyProgress: number;
  strongSubject: string;
  needsAttention: string;
  albertoSummary: string;
}
