import { getAdmissionRanks } from "@/lib/local-db";
import { getProvinceMaxAcceptanceRank } from "@/lib/data/province-max-ranks";
import {
  hamadanAdmissionRanksAzad,
  hamadanAdmissionRanksDolati,
} from "@/lib/data/profile-mock-data";
import type { UniversityType } from "@/types";

/** رشته‌های گروه پزشکی / پیراپزشکی برای نمایش جزئیات استان */
const medicalMajors = [
  "پزشکی",
  "دندانپزشکی",
  "داروسازی",
  "فیزیوتراپی",
  "پرستاری",
  "مامایی",
  "علوم آزمایشگاهی",
  "رادیولوژی",
  "اتاق عمل",
  "هوشبری",
  "تغذیه",
  "بینایی‌سنجی",
] as const;

/** ضریب رتبه نسبت به baseline استان (عدد بالاتر = رتبه آسان‌تر) */
const medicalRankFactors: Record<(typeof medicalMajors)[number], number> = {
  پزشکی: 0.9,
  دندانپزشکی: 1.15,
  داروسازی: 1.45,
  فیزیوتراپی: 2.1,
  پرستاری: 3.2,
  مامایی: 3.5,
  "علوم آزمایشگاهی": 3.8,
  رادیولوژی: 4.1,
  "اتاق عمل": 4.4,
  هوشبری: 4.7,
  تغذیه: 5.0,
  "بینایی‌سنجی": 5.3,
};

function buildMedicalRanksFromBaseline(baseline: number, universityType: UniversityType) {
  const typeFactor = universityType === "آزاد" ? 1.75 : 1;
  return medicalMajors.map((major) => ({
    major,
    rank: Math.round(baseline * medicalRankFactors[major] * typeFactor),
  }));
}

export function getProvinceAdmissionRanks(province: string, universityType: UniversityType) {
  const ranks = getAdmissionRanks(province, universityType);
  const medical = ranks.filter((r) =>
    medicalMajors.includes(r.major as (typeof medicalMajors)[number])
  );

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
  const byMajor = new Map(ranks.map((r) => [r.major, r.min_rank]));
  const baseline = getProvinceMaxAcceptanceRank(provinceCode);
  const generated = buildMedicalRanksFromBaseline(baseline, universityType);

  return generated.map((row) => ({
    major: row.major,
    rank: byMajor.get(row.major) ?? row.rank,
  }));
}
