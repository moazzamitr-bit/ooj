"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CampaignDay, CampaignStep, StudentCampaign } from "@/types/campaign";
import { CAMPAIGN_STORAGE_KEY } from "@/types/campaign";

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
    last_test_at: null,
    riddle_answered: false,
    profile_completed: false,
    lottery_entered: false,
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
  hydrateFromServer: (campaign: StudentCampaign) => void;
  resetCampaign: () => void;
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set) => ({
      campaign: emptyCampaign(),
      motherPhone: null,
      inviteCode: null,

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

      hydrateFromServer: (campaign) => set({ campaign }),

      resetCampaign: () =>
        set({
          campaign: emptyCampaign(),
          motherPhone: null,
          inviteCode: null,
        }),
    }),
    { name: CAMPAIGN_STORAGE_KEY }
  )
);
