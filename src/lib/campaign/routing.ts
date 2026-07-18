import type { CampaignStep } from "@/types/campaign";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function childInviteUrl(code: string) {
  const encoded = encodeURIComponent(code);
  // Query-param form works with static GitHub Pages export (dynamic /invite/[code] does not).
  if (typeof window !== "undefined") {
    return `${window.location.origin}${basePath}/invite/?code=${encoded}`;
  }
  return `${basePath}/invite/?code=${encoded}`;
}

export function getNextCampaignHref(step: CampaignStep): string {
  switch (step) {
    case "mother_landing":
      return "/";
    case "mother_success":
      return "/parent/success";
    case "intro":
      return "/student/onboarding";
    case "riddle":
      return "/student/riddle";
    case "riddle_success":
      return "/student/riddle/success";
    case "lottery_intro":
      return "/student/lottery-intro";
    case "field_select":
      return "/student/field";
    case "quiz":
      return "/student/quiz";
    case "complete_profile":
      return "/student/complete-profile";
    case "reward":
      return "/student/reward";
    case "home":
      return "/student";
    case "referral":
      return "/student/referral";
    case "treasure":
      return "/student/games/treasure";
    case "iran_tour":
      return "/student/games/iran-tour";
    case "marathon":
      return "/student/games/marathon";
    case "membership":
      return "/student/membership";
    default:
      return "/student";
  }
}

export const DAY1_STEP_ORDER: CampaignStep[] = [
  "intro",
  "riddle",
  "riddle_success",
  "lottery_intro",
  "field_select",
  "quiz",
  "complete_profile",
  "reward",
  "home",
];
