import { iranProvinces, provinceAdmissionIntensity } from "@/lib/data/iran-provinces";

/** حداکثر رتبه قبولی (سهمیه منطقه) برای هر استان — عدد بالاتر = قبولی آسان‌تر */
const provinceMaxRankOverrides: Record<string, number> = {
  Teh: 1083,
  RKh: 1420,
  Esf: 1680,
  Far: 1890,
  Ham: 2450,
  Maz: 2510,
  Gil: 2740,
  Khz: 2960,
  Alb: 3120,
  Qom: 3280,
  Sem: 3510,
  Zan: 3740,
  Qaz: 3980,
  Lor: 4210,
  CMB: 4450,
  Yzd: 4680,
  Krm: 4920,
  Bsh: 5160,
  Mar: 5380,
  Gol: 5610,
  Krd: 5840,
  Ard: 6070,
  WAz: 2387,
  EAz: 2650,
  Krn: 2890,
  KBA: 3120,
  Ilm: 3350,
  Hor: 3580,
  SKh: 4120,
  NKh: 4360,
  SnB: 6483,
};

export function getProvinceMaxAcceptanceRank(code: string): number {
  if (provinceMaxRankOverrides[code]) return provinceMaxRankOverrides[code];
  const intensity = provinceAdmissionIntensity[code] ?? 0.4;
  return Math.round(900 + (1 - intensity) * 5800);
}

export const provinceMaxRankRows = iranProvinces
  .map((province) => ({
    code: province.code,
    name: province.name_fa,
    maxRank: getProvinceMaxAcceptanceRank(province.code),
  }))
  .sort((a, b) => a.maxRank - b.maxRank);
