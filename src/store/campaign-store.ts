"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CampaignDay, CampaignStep, ChanceToast, StudentCampaign } from "@/types/campaign";
import {
  CAMPAIGN_STORAGE_KEY,
  CHANCES_PER_LINK_OPEN,
  TREASURE_MAX_STEPS,
} from "@/types/campaign";

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function emptyCampaign(partial?: Partial<StudentCampaign>): StudentCampaign {
  const now = new Date().toISOString();
  return {
    id: uid("camp"),
    student_id: null,
    mother_lead_id: null,
    day: 1,
    step: "mother_landing",
    field: null,
    golden_chances: 0,
    chance_chest: 0,
    link_opens: 0,
    last_test_at: null,
    riddle_answered: false,
    profile_completed: false,
    lottery_entered: false,
    lottery_won: null,
    treasure_step: 0,
    iran_provinces_unlocked: [],
    marathon_week: 0,
    is_golden_member: false,
    updated_at: now,
    created_at: now,
    ...partial,
  };
}

interface CampaignState {
  campaign: StudentCampaign;
  motherPhone: string | null;
  inviteCode: string | null;
  chanceToast: ChanceToast | null;
  setMotherLead: (phone: string, inviteCode: string, leadId?: string) => void;
  setInviteCode: (inviteCode: string) => void;
  setStep: (step: CampaignStep) => void;
  setDay: (day: CampaignDay) => void;
  setField: (field: string) => void;
  addChances: (n: number) => void;
  markRiddleDone: () => void;
  markProfileDone: (data: {
    first_name: string;
    last_name: string;
    city: string;
    phone: string;
  }) => void;
  markLotteryEntered: () => void;
  setLotteryResult: (won: boolean) => void;
  startDay2: () => void;
  startDay3: () => void;
  climbTreasureStep: () => void;
  /** When someone opens THIS student's invite link */
  recordLinkOpenForMe: () => void;
  clearChanceToast: () => void;
  hydrateFromServer: (campaign: StudentCampaign) => void;
  resetCampaign: () => void;
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set) => ({
      campaign: emptyCampaign(),
      motherPhone: null,
      inviteCode: null,
      chanceToast: null,

      setMotherLead: (phone, inviteCode, leadId) =>
        set((s) => ({
          motherPhone: phone,
          inviteCode,
          campaign: {
            ...s.campaign,
            mother_lead_id: leadId ?? s.campaign.mother_lead_id,
            invite_code: inviteCode,
            mother_phone: phone,
            step: "mother_success",
            updated_at: new Date().toISOString(),
          },
        })),

      setInviteCode: (inviteCode) =>
        set((s) => ({
          inviteCode,
          campaign: {
            ...s.campaign,
            invite_code: inviteCode,
            updated_at: new Date().toISOString(),
          },
        })),

      setStep: (step) =>
        set((s) => ({
          campaign: { ...s.campaign, step, updated_at: new Date().toISOString() },
        })),

      setDay: (day) =>
        set((s) => ({
          campaign: { ...s.campaign, day, updated_at: new Date().toISOString() },
        })),

      setField: (field) =>
        set((s) => ({
          campaign: { ...s.campaign, field, step: "quiz", updated_at: new Date().toISOString() },
        })),

      addChances: (n) =>
        set((s) => ({
          campaign: {
            ...s.campaign,
            golden_chances: s.campaign.golden_chances + n,
            chance_chest: s.campaign.chance_chest + n,
            updated_at: new Date().toISOString(),
          },
        })),

      markRiddleDone: () =>
        set((s) => ({
          campaign: {
            ...s.campaign,
            riddle_answered: true,
            golden_chances: Math.max(1, s.campaign.golden_chances),
            chance_chest: Math.max(1, s.campaign.chance_chest),
            step: "riddle_success",
            updated_at: new Date().toISOString(),
          },
        })),

      markProfileDone: (data) =>
        set((s) => ({
          campaign: {
            ...s.campaign,
            ...data,
            profile_completed: true,
            lottery_entered: true,
            step: "reward",
            updated_at: new Date().toISOString(),
          },
        })),

      markLotteryEntered: () =>
        set((s) => ({
          campaign: {
            ...s.campaign,
            lottery_entered: true,
            updated_at: new Date().toISOString(),
          },
        })),

      setLotteryResult: (won) =>
        set((s) => ({
          campaign: {
            ...s.campaign,
            lottery_won: won,
            step: "lottery_result",
            updated_at: new Date().toISOString(),
          },
        })),

      startDay2: () =>
        set((s) => {
          if (s.campaign.day === 2 && s.campaign.step === "day2_intro") return s;
          return {
            campaign: {
              ...s.campaign,
              day: 2,
              step: "day2_intro",
              link_opens: s.campaign.link_opens ?? 0,
              chance_chest: s.campaign.chance_chest ?? s.campaign.golden_chances ?? 0,
              updated_at: new Date().toISOString(),
            },
          };
        }),

      startDay3: () =>
        set((s) => {
          if (s.campaign.day === 3 && s.campaign.step === "treasure") return s;
          return {
            campaign: {
              ...s.campaign,
              day: 3,
              step: "treasure",
              treasure_step: s.campaign.treasure_step ?? 0,
              updated_at: new Date().toISOString(),
            },
          };
        }),

      climbTreasureStep: () =>
        set((s) => {
          const nextStep = Math.min(TREASURE_MAX_STEPS, (s.campaign.treasure_step ?? 0) + 1);
          if (nextStep === (s.campaign.treasure_step ?? 0)) return s;
          return {
            campaign: {
              ...s.campaign,
              treasure_step: nextStep,
              golden_chances: (s.campaign.golden_chances ?? 0) + 1,
              chance_chest: (s.campaign.chance_chest ?? 0) + 1,
              last_test_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          };
        }),

      recordLinkOpenForMe: () =>
        set((s) => {
          const opens = (s.campaign.link_opens ?? 0) + 1;
          const golden = (s.campaign.golden_chances ?? 0) + CHANCES_PER_LINK_OPEN;
          const chest = (s.campaign.chance_chest ?? 0) + CHANCES_PER_LINK_OPEN;
          return {
            campaign: {
              ...s.campaign,
              link_opens: opens,
              golden_chances: golden,
              chance_chest: chest,
              updated_at: new Date().toISOString(),
            },
            chanceToast: {
              added: CHANCES_PER_LINK_OPEN,
              total: chest,
              at: Date.now(),
            },
          };
        }),

      clearChanceToast: () => set({ chanceToast: null }),

      hydrateFromServer: (campaign) => set({ campaign }),

      resetCampaign: () =>
        set({
          campaign: emptyCampaign(),
          motherPhone: null,
          inviteCode: null,
          chanceToast: null,
        }),
    }),
    { name: CAMPAIGN_STORAGE_KEY }
  )
);
