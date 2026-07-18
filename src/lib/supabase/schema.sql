-- اوج Platform Database Schema
-- Run this in Supabase SQL Editor

CREATE TYPE user_role AS ENUM ('student', 'parent', 'admin');
CREATE TYPE student_field AS ENUM ('تجربی', 'ریاضی', 'انسانی');
CREATE TYPE subchapter_type AS ENUM ('lesson', 'practice', 'test', 'review');
CREATE TYPE referral_status AS ENUM ('sent', 'registered', 'quiz_completed', 'rewarded');
CREATE TYPE reward_type AS ENUM ('chance', 'cash');
CREATE TYPE university_type AS ENUM ('دولتی', 'آزاد');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES parents(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  province TEXT NOT NULL,
  city TEXT NOT NULL,
  grade TEXT NOT NULL,
  field student_field NOT NULL,
  target_major TEXT,
  avatar_url TEXT,
  total_chances INTEGER DEFAULT 0,
  referral_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  field student_field NOT NULL,
  grade TEXT NOT NULL,
  icon TEXT,
  color TEXT
);

CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  test_progress_percent INTEGER DEFAULT 0,
  study_progress_percent INTEGER DEFAULT 0
);

CREATE TABLE subchapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  type subchapter_type NOT NULL
);

CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID REFERENCES subjects(id),
  chapter_id UUID REFERENCES chapters(id),
  subchapter_id UUID REFERENCES subchapters(id),
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option TEXT NOT NULL CHECK (correct_option IN ('a', 'b', 'c', 'd')),
  explanation TEXT,
  difficulty TEXT,
  source_year INTEGER,
  suggested_time_seconds INTEGER,
  tags TEXT[]
);

CREATE TABLE student_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id),
  selected_option TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id),
  chapter_id UUID REFERENCES chapters(id),
  duration_minutes INTEGER,
  test_count INTEGER,
  correct_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  referred_phone TEXT NOT NULL,
  referred_student_id UUID REFERENCES students(id),
  status referral_status DEFAULT 'sent',
  reward_chances INTEGER DEFAULT 0,
  cash_reward_amount INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  type reward_type NOT NULL,
  amount INTEGER NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE admission_rank_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  province TEXT NOT NULL,
  city TEXT NOT NULL,
  university_type university_type NOT NULL,
  major TEXT NOT NULL,
  min_rank INTEGER NOT NULL,
  year INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_students_referral_code ON students(referral_code);
CREATE INDEX idx_referrals_referrer ON referrals(referrer_student_id);
CREATE INDEX idx_admission_rank_province ON admission_rank_data(province, city, university_type);

-- Campaign funnel (Day 1–5)
CREATE TABLE IF NOT EXISTS mother_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT UNIQUE NOT NULL,
  child_invite_code TEXT UNIQUE NOT NULL,
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE UNIQUE,
  mother_lead_id UUID REFERENCES mother_leads(id) ON DELETE SET NULL,
  day INTEGER NOT NULL DEFAULT 1 CHECK (day BETWEEN 1 AND 5),
  step TEXT NOT NULL DEFAULT 'intro',
  field TEXT,
  golden_chances INTEGER NOT NULL DEFAULT 0,
  chance_chest INTEGER NOT NULL DEFAULT 0,
  last_test_at TIMESTAMPTZ,
  riddle_answered BOOLEAN NOT NULL DEFAULT FALSE,
  profile_completed BOOLEAN NOT NULL DEFAULT FALSE,
  lottery_entered BOOLEAN NOT NULL DEFAULT FALSE,
  treasure_step INTEGER NOT NULL DEFAULT 0,
  iran_provinces_unlocked TEXT[] NOT NULL DEFAULT '{}',
  marathon_week INTEGER NOT NULL DEFAULT 0,
  is_golden_member BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS campaign_sms_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  template_key TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'simulated',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mother_leads_invite ON mother_leads(child_invite_code);
CREATE INDEX IF NOT EXISTS idx_campaign_student ON student_campaigns(student_id);
CREATE INDEX IF NOT EXISTS idx_sms_log_phone ON campaign_sms_log(phone);
