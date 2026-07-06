import { getAdmissionRanks } from "@/lib/local-db";
import {
  hamadanAdmissionRanksAzad,
  hamadanAdmissionRanksDolati,
} from "@/lib/data/profile-mock-data";
import type { UniversityType } from "@/types";

export function getProvinceAdmissionRanks(province: string, universityType: UniversityType) {
  const ranks = getAdmissionRanks(province, universityType);
  if (ranks.length === 0) {
    const fallback =
      universityType === "دولتی" ? hamadanAdmissionRanksDolati : hamadanAdmissionRanksAzad;
    return fallback;
  }
  return ranks.map((r) => ({ major: r.major, rank: r.min_rank }));
}
