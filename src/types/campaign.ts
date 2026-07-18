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
  | "lottery_result"
  | "home"
  | "day2_intro"
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

export interface ChanceToast {
  added: number;
  total: number;
  at: number;
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
  link_opens: number;
  last_test_at: string | null;
  riddle_answered: boolean;
  profile_completed: boolean;
  lottery_entered: boolean;
  lottery_won: boolean | null;
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
export const INVITE_OPEN_EVENT = "owj-invite-open";
export const CHANCES_PER_LINK_OPEN = 5;
