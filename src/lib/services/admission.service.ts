import { getAdmissionRanks } from "@/lib/local-db";
import { getProvinceMaxAcceptanceRank } from "@/lib/data/province-max-ranks";
import {
  hamadanAdmissionRanksAzad,
  hamadanAdmissionRanksDolati,
} from "@/lib/data/profile-mock-data";
import type { UniversityType } from "@/types";

const medicalMajors = ["پزشکی", "دندانپزشکی", "داروسازی", "فیزیوتراپی", "پرستاری"] as const;

function buildMedicalRanksFromBaseline(baseline: number, universityType: UniversityType) {
  const factor = universityType === "آزاد" ? 1.75 : 1;
  return [
    { major: "پزشکی", rank: Math.round(baseline * 0.9 * factor) },
    { major: "دندانپزشکی", rank: Math.round(baseline * 1.15 * factor) },
    { major: "داروسازی", rank: Math.round(baseline * 1.45 * factor) },
    { major: "فیزیوتراپی", rank: Math.round(baseline * 2.1 * factor) },
    { major: "پرستاری", rank: Math.round(baseline * 3.2 * factor) },
  ];
}

export function getProvinceAdmissionRanks(province: string, universityType: UniversityType) {
  const ranks = getAdmissionRanks(province, universityType);
  const medical = ranks.filter((r) => medicalMajors.includes(r.major as (typeof medicalMajors)[number]));

  if (medical.length > 0) {
    return medical.map((r) => ({ major: r.major, rank: r.min_rank }));
  }

  if (ranks.length > 0) {
    return ranks.map((r) => ({ major: r.major, rank: r.min_rank }));
  }

  const fallback =
    universityType === "دولتی" ? hamadanAdmissionRanksDolati : hamadanAdmissionRanksAzad;
  return fallback;
}

export function getProvinceMedicalRanks(
  provinceName: string,
  provinceCode: string,
  universityType: UniversityType
) {
  const ranks = getAdmissionRanks(provinceName, universityType);
  const medical = ranks.filter((r) => medicalMajors.includes(r.major as (typeof medicalMajors)[number]));

  if (medical.length > 0) {
    return medical.map((r) => ({ major: r.major, rank: r.min_rank }));
  }

  const baseline = getProvinceMaxAcceptanceRank(provinceCode);
  return buildMedicalRanksFromBaseline(baseline, universityType);
}
