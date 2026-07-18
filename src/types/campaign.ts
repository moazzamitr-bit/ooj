export type CampaignDay = 1 | 2 | 3 | 4 | 5;

export type CampaignStep =
  | "mother_landing"
  | "mother_success"
  | "intro"
  | "riddle"
  | "riddle_success"
  | "lottery_intro"
  | "field_select"
  | "quiz"
  | "complete_profile"
  | "reward"
  | "home"
  | "referral"
  | "treasure"
  | "iran_tour"
  | "marathon"
  | "membership";

export interface MotherLead {
  id: string;
  phone: string;
  child_invite_code: string;
  student_id: string | null;
  created_at: string;
}

export interface StudentCampaign {
  id: string;
  student_id: string | null;
  mother_lead_id: string | null;
  day: CampaignDay;
  step: CampaignStep;
  field: string | null;
  golden_chances: number;
  chance_chest: number;
  last_test_at: string | null;
  riddle_answered: boolean;
  profile_completed: boolean;
  lottery_entered: boolean;
  treasure_step: number;
  iran_provinces_unlocked: string[];
  marathon_week: number;
  is_golden_member: boolean;
  updated_at: string;
  created_at: string;
  /** local-only helpers */
  invite_code?: string;
  mother_phone?: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  phone?: string;
}

export const CAMPAIGN_STORAGE_KEY = "owj_campaign_v1";
