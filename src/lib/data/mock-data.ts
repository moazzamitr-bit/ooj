import type {
  AdmissionRankData,
  Chapter,
  DailyStudyData,
  InvitedFriend,
  MonthlyStudyData,
  ParentDailyReport,
  Question,
  Referral,
  Student,
  Subject,
  Subchapter,
  SubjectRadarData,
  WeeklyStudyData,
} from "@/types";

export const mockStudent: Student = {
  id: "student_1",
  user_id: "user_1",
  parent_id: "parent_1",
  full_name: "آزاد احمدی",
  province: "همدان",
  city: "همدان",
  grade: "دوم تجربی",
  field: "تجربی",
  target_major: "پزشکی",
  avatar_url: null,
  total_chances: 237,
  referral_code: "OWJ-AZAD2026",
  created_at: "2026-01-15T10:00:00Z",
};

export const mockSubjects: Subject[] = [
  { id: "sub_bio", name: "زیست", field: "تجربی", grade: "دهم", icon: "🧬", color: "#20C997" },
  { id: "sub_geo", name: "زمین‌شناسی", field: "تجربی", grade: "دهم", icon: "🪨", color: "#B7791F" },
  { id: "sub_chem", name: "شیمی", field: "تجربی", grade: "دهم", icon: "⚗️", color: "#FF9F1C" },
  { id: "sub_physics", name: "فیزیک", field: "تجربی", grade: "دهم", icon: "⚡", color: "#6D4DFF" },
  { id: "sub_math", name: "ریاضی", field: "تجربی", grade: "دهم", icon: "📐", color: "#2F80FF" },
];

export const mockChapters: Record<string, Chapter[]> = {
  sub_chem: [
    { id: "ch_chem_1", subject_id: "sub_chem", title: "فصل ۱: هسته اتم", order_index: 1, test_progress_percent: 72, study_progress_percent: 68 },
    { id: "ch_chem_2", subject_id: "sub_chem", title: "فصل ۲: سطح انرژی", order_index: 2, test_progress_percent: 58, study_progress_percent: 55 },
    { id: "ch_chem_3", subject_id: "sub_chem", title: "فصل ۳: جدول تناوبی عناصر", order_index: 3, test_progress_percent: 41, study_progress_percent: 38 },
    { id: "ch_chem_4", subject_id: "sub_chem", title: "فصل ۴: موازنه واکنش‌ها", order_index: 4, test_progress_percent: 25, study_progress_percent: 22 },
    { id: "ch_chem_5", subject_id: "sub_chem", title: "فصل ۵: اکسیداسیون و احیا", order_index: 5, test_progress_percent: 14, study_progress_percent: 12 },
  ],
  sub_physics: [
    { id: "ch_phy_1", subject_id: "sub_physics", title: "فصل ۱: اندازه‌گیری", order_index: 1, test_progress_percent: 65, study_progress_percent: 60 },
    { id: "ch_phy_2", subject_id: "sub_physics", title: "فصل ۲: دینامیک", order_index: 2, test_progress_percent: 48, study_progress_percent: 45 },
    { id: "ch_phy_3", subject_id: "sub_physics", title: "فصل ۳: کار و انرژی", order_index: 3, test_progress_percent: 35, study_progress_percent: 32 },
  ],
  sub_bio: [
    { id: "ch_bio_1", subject_id: "sub_bio", title: "فصل ۱: تنظیم عصبی", order_index: 1, test_progress_percent: 80, study_progress_percent: 75 },
    { id: "ch_bio_2", subject_id: "sub_bio", title: "فصل ۲: تنظیم شیمیایی", order_index: 2, test_progress_percent: 62, study_progress_percent: 58 },
    { id: "ch_bio_3", subject_id: "sub_bio", title: "فصل ۳: ایمنی", order_index: 3, test_progress_percent: 45, study_progress_percent: 40 },
  ],
  sub_geo: [
    { id: "ch_geo_1", subject_id: "sub_geo", title: "فصل ۱: آفرینش کیهان و تکوین زمین", order_index: 1, test_progress_percent: 58, study_progress_percent: 54 },
    { id: "ch_geo_2", subject_id: "sub_geo", title: "فصل ۲: منابع معدنی و ذخایر انرژی", order_index: 2, test_progress_percent: 42, study_progress_percent: 38 },
    { id: "ch_geo_3", subject_id: "sub_geo", title: "فصل ۳: پویایی پوسته زمین", order_index: 3, test_progress_percent: 31, study_progress_percent: 28 },
  ],
  sub_math: [
    { id: "ch_math_1", subject_id: "sub_math", title: "فصل ۱: مجموعه‌ها", order_index: 1, test_progress_percent: 70, study_progress_percent: 66 },
    { id: "ch_math_2", subject_id: "sub_math", title: "فصل ۲: مثلثات", order_index: 2, test_progress_percent: 52, study_progress_percent: 48 },
    { id: "ch_math_3", subject_id: "sub_math", title: "فصل ۳: توابع", order_index: 3, test_progress_percent: 38, study_progress_percent: 35 },
  ],
};

export const mockSubchapters: Record<string, Subchapter[]> = {
  ch_chem_2: [
    { id: "sc_1", chapter_id: "ch_chem_2", title: "زیرمبحث ۱: لایه‌ها و ترازها", order_index: 1, type: "lesson" },
    { id: "sc_2", chapter_id: "ch_chem_2", title: "زیرمبحث ۲: آرایش الکترونی", order_index: 2, type: "lesson" },
    { id: "sc_3", chapter_id: "ch_chem_2", title: "زیرمبحث ۳: یونش و پایداری", order_index: 3, type: "practice" },
    { id: "sc_4", chapter_id: "ch_chem_2", title: "زیرمبحث ۴: تمرین و تست", order_index: 4, type: "test" },
  ],
  ch_chem_1: [
    { id: "sc_5", chapter_id: "ch_chem_1", title: "زیرمبحث ۱: ساختار اتم", order_index: 1, type: "lesson" },
    { id: "sc_6", chapter_id: "ch_chem_1", title: "زیرمبحث ۲: ایزوتوپ‌ها", order_index: 2, type: "practice" },
    { id: "sc_7", chapter_id: "ch_chem_1", title: "زیرمبحث ۳: تست فصل", order_index: 3, type: "test" },
  ],
};

export const mockQuestions: Question[] = [
  {
    id: "q1",
    subject_id: "sub_chem",
    chapter_id: "ch_chem_2",
    subchapter_id: "sc_2",
    question_text: "کدام یک از گزینه‌های زیر درباره آرایش الکترونی عنصر نیتروژن (Z=7) در حالت پایه صحیح است؟",
    option_a: "1s² 2s² 2p³",
    option_b: "1s² 2s² 2p² 3s¹",
    option_c: "1s² 2s³ 2p²",
    option_d: "1s² 2p⁵",
    correct_option: "a",
    explanation: "نیتروژن دارای ۷ الکترون است و آرایش الکترونی آن 1s² 2s² 2p³ می‌باشد.",
    difficulty: "متوسط",
    source_year: 1402,
    suggested_time_seconds: 90,
    tags: ["شیمی", "اتم", "آرایش الکترونی"],
  },
  {
    id: "q2",
    subject_id: "sub_chem",
    chapter_id: "ch_chem_2",
    subchapter_id: "sc_1",
    question_text: "در مدل بور، الکترون در کدام شرایط انرژی ثابت دارد؟",
    option_a: "هنگام انتقال بین ترازها",
    option_b: "در ترازهای مجاز",
    option_c: "هنگام برخورد با هسته",
    option_d: "در هر مسیری که حرکت کند",
    correct_option: "b",
    explanation: "در مدل بور، الکترون فقط در ترازهای مجاز انرژی ثابت دارد.",
    difficulty: "آسان",
    source_year: 1401,
    suggested_time_seconds: 60,
    tags: ["شیمی", "اتم", "مدل بور"],
  },
  {
    id: "q3",
    subject_id: "sub_bio",
    chapter_id: "ch_bio_1",
    subchapter_id: "sc_1",
    question_text: "کدام بخش از مغز مسئول تنظیم تعادل بدن و فعالیت‌های خودکار است؟",
    option_a: "مخچه",
    option_b: "هیپوتالamus",
    option_c: "بصل‌النخاع",
    option_d: "قشر مغز",
    correct_option: "c",
    explanation: "بصل‌النخاع مرکز کنترل فعالیت‌های خودکار مانند تنفس و ضربان قلب است.",
    difficulty: "متوسط",
    source_year: 1403,
    suggested_time_seconds: 75,
    tags: ["زیست", "تنظیم عصبی"],
  },
  {
    id: "q4",
    subject_id: "sub_physics",
    chapter_id: "ch_phy_2",
    subchapter_id: "sc_1",
    question_text: "طبق قانون دوم نیوتن، شتاب جسم با چه کمیتی رابطه مستقیم دارد؟",
    option_a: "جرم",
    option_b: "نیروی خالص وارد بر آن",
    option_c: "سرعت",
    option_d: "مسافت",
    correct_option: "b",
    explanation: "F = ma، بنابراین شتاب با نیروی خالص رابطه مستقیم دارد.",
    difficulty: "آسان",
    source_year: 1402,
    suggested_time_seconds: 45,
    tags: ["فیزیک", "دینامیک"],
  },
  {
    id: "q5",
    subject_id: "sub_math",
    chapter_id: "ch_math_2",
    subchapter_id: "sc_1",
    question_text: "مقدار sin(30°) برابر است با:",
    option_a: "√3/2",
    option_b: "1/2",
    option_c: "√2/2",
    option_d: "1",
    correct_option: "b",
    explanation: "sin(30°) = 1/2 یکی از مقادیر پایه مثلثات است.",
    difficulty: "آسان",
    source_year: 1401,
    suggested_time_seconds: 30,
    tags: ["ریاضی", "مثلثات"],
  },
];

export const dailyStudyData: DailyStudyData[] = [
  { day: "شنبه", studyMinutes: 180, testCount: 45 },
  { day: "یکشنبه", studyMinutes: 210, testCount: 52 },
  { day: "دوشنبه", studyMinutes: 165, testCount: 38 },
  { day: "سه‌شنبه", studyMinutes: 275, testCount: 68 },
  { day: "چهارشنبه", studyMinutes: 240, testCount: 55 },
  { day: "پنجشنبه", studyMinutes: 195, testCount: 42 },
  { day: "جمعه", studyMinutes: 120, testCount: 28 },
];

export const weeklyStudyData: WeeklyStudyData[] = [
  { week: "هفته ۱", studyMinutes: 980, testCount: 210 },
  { week: "هفته ۲", studyMinutes: 1120, testCount: 245 },
  { week: "هفته ۳", studyMinutes: 1050, testCount: 230 },
  { week: "هفته ۴", studyMinutes: 1385, testCount: 328 },
];

export const monthlyStudyData: MonthlyStudyData[] = [
  { month: "مهر", studyMinutes: 3200, testCount: 680 },
  { month: "آبان", studyMinutes: 3800, testCount: 820 },
  { month: "آذر", studyMinutes: 4100, testCount: 910 },
  { month: "دی", studyMinutes: 4535, testCount: 1013 },
];

export const subjectRadarData: SubjectRadarData[] = [
  { subject: "شیمی", value: 72 },
  { subject: "فیزیک", value: 58 },
  { subject: "زیست", value: 85 },
  { subject: "ریاضی", value: 65 },
];

export const admissionRankData: AdmissionRankData[] = [
  { id: "ar1", province: "همدان", city: "همدان", university_type: "دولتی", major: "پزشکی", min_rank: 3850, year: 1404, created_at: "2026-01-01" },
  { id: "ar2", province: "همدان", city: "همدان", university_type: "دولتی", major: "دندانپزشکی", min_rank: 4100, year: 1404, created_at: "2026-01-01" },
  { id: "ar3", province: "همدان", city: "همدان", university_type: "دولتی", major: "داروسازی", min_rank: 5600, year: 1404, created_at: "2026-01-01" },
  { id: "ar4", province: "همدان", city: "همدان", university_type: "دولتی", major: "فیزیوتراپی", min_rank: 9200, year: 1404, created_at: "2026-01-01" },
  { id: "ar5", province: "همدان", city: "همدان", university_type: "دولتی", major: "پرستاری", min_rank: 14500, year: 1404, created_at: "2026-01-01" },
  { id: "ar6", province: "همدان", city: "همدان", university_type: "آزاد", major: "پزشکی", min_rank: 8500, year: 1404, created_at: "2026-01-01" },
  { id: "ar7", province: "همدان", city: "همدان", university_type: "آزاد", major: "دندانپزشکی", min_rank: 11000, year: 1404, created_at: "2026-01-01" },
  { id: "ar8", province: "همدان", city: "همدان", university_type: "آزاد", major: "داروسازی", min_rank: 14000, year: 1404, created_at: "2026-01-01" },
  { id: "ar9", province: "همدان", city: "همدان", university_type: "آزاد", major: "پرستاری", min_rank: 24000, year: 1404, created_at: "2026-01-01" },
];

export const mockReferrals: Referral[] = [
  { id: "ref1", referrer_student_id: "student_1", referred_phone: "09123456789", referred_student_id: "student_2", status: "quiz_completed", reward_chances: 3, cash_reward_amount: 500000, created_at: "2026-02-01" },
  { id: "ref2", referrer_student_id: "student_1", referred_phone: "09121234567", referred_student_id: "student_3", status: "registered", reward_chances: 1, cash_reward_amount: 500000, created_at: "2026-02-10" },
  { id: "ref3", referrer_student_id: "student_1", referred_phone: "09131234567", referred_student_id: null, status: "sent", reward_chances: 0, cash_reward_amount: 0, created_at: "2026-03-01" },
];

export const invitedFriends: InvitedFriend[] = [
  { name: "سارا محمدی", phone: "09123456789", status: "quiz_completed", earnedChances: 3 },
  { name: "علی رضایی", phone: "09121234567", status: "registered", earnedChances: 1 },
  { name: "—", phone: "09131234567", status: "sent", earnedChances: 0 },
];

export const parentDailyReport: ParentDailyReport = {
  studyTimeMinutes: 275,
  testsAnswered: 128,
  accuracy: 78,
  weeklyProgress: 63,
  strongSubject: "زیست‌شناسی",
  needsAttention: "شیمی — فصل موازنه واکنش‌ها",
  albertoSummary: "آزاد امروز ۴ ساعت و ۳۵ دقیقه مطالعه مؤثر داشته. در تست‌های زیست عملکرد عالی نشان داد (دقت ۸۵٪). پیشنهاد می‌کنم فردا روی فصل موازنه شیمی تمرکز کند.",
};

export const referralStats = {
  sent: 5,
  registered: 2,
  quizCompleted: 1,
  totalChances: 4,
  maxInvites: 3,
};

export const provinces = [
  "تهران", "اصفهان", "فارس", "خراسان رضوی", "آذربایجان شرقی",
  "خوزستان", "مازندران", "گیلان", "کرمان", "همدان",
];

export const grades = ["دهم", "یازدهم", "دوازدهم", "فارغ‌التحصیل"];

export const fields = ["تجربی", "ریاضی", "انسانی"] as const;

export const referralStatusLabels: Record<string, string> = {
  sent: "ارسال‌شده",
  registered: "ثبت‌نام‌شده",
  quiz_completed: "تست کامل‌شده",
  rewarded: "پاداش‌گرفته",
};

export const subchapterTypeLabels: Record<string, string> = {
  lesson: "درس",
  practice: "تمرین",
  test: "تست",
  review: "مرور",
};
