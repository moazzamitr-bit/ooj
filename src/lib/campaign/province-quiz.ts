/** Lightweight province quiz bank for Day-4 Iran tour */

export interface ProvinceQuiz {
  center: { q: string; options: string[]; correct: number };
  attraction: { q: string; options: string[]; correct: number };
  souvenir: { q: string; options: string[]; correct: number };
}

const defaults: ProvinceQuiz = {
  center: {
    q: "مرکز این استان کدام است؟",
    options: ["مرکز استان", "تهران", "اصفهان", "شیراز"],
    correct: 0,
  },
  attraction: {
    q: "کدام گزینه جاذبه معروف‌تری برای این استان است؟",
    options: ["جاذبه شاخص استان", "برج آزادی", "تخت جمشید", "پل خواجو"],
    correct: 0,
  },
  souvenir: {
    q: "سوغات یا غذای محلی معروف این استان کدام است؟",
    options: ["سوغات محلی", "گز", "پسته", "ماهی"],
    correct: 0,
  },
};

const byCode: Record<string, ProvinceQuiz> = {
  Teh: {
    center: { q: "مرکز استان تهران؟", options: ["تهران", "کرج", "ورامین", "ری"], correct: 0 },
    attraction: { q: "جاذبه معروف تهران؟", options: ["برج میلاد", "ارگ کریم‌خان", "نقش جهان", "گنج‌نامه"], correct: 0 },
    souvenir: { q: "سوغات تهران؟", options: ["ترشی‌ها و شیرینی‌های محلی", "گز", "پسته رفسنجان", "برنج"], correct: 0 },
  },
  Esf: {
    center: { q: "مرکز اصفهان؟", options: ["اصفهان", "کاشان", "نجف‌آباد", "خمینی‌شهر"], correct: 0 },
    attraction: { q: "میدان معروف اصفهان؟", options: ["نقش جهان", "آزادی", "تجریش", "شهدا"], correct: 0 },
    souvenir: { q: "سوغات اصفهان؟", options: ["گز و پولکی", "پسته", "زعفران", "ماهی"], correct: 0 },
  },
  Far: {
    center: { q: "مرکز فارس؟", options: ["شیراز", "مرودشت", "جهرم", "لار"], correct: 0 },
    attraction: { q: "بنای تاریخی معروف فارس؟", options: ["تخت جمشید", "تخت سلیمان", "گنبد سلطانیه", "ارگ بم"], correct: 0 },
    souvenir: { q: "سوغات شیراز؟", options: ["مسقطی و عرقیات", "گز", "پسته", "برنج"], correct: 0 },
  },
  Ham: {
    center: { q: "مرکز همدان؟", options: ["همدان", "ملایر", "نهاوند", "تویسرکان"], correct: 0 },
    attraction: { q: "جاذبه معروف همدان؟", options: ["گنج‌نامه و غار علیصدر", "پل خواجو", "برج آزادی", "میدان نقش جهان"], correct: 0 },
    souvenir: { q: "سوغات همدان؟", options: ["کماج و باسلوق", "گز", "پسته", "چای"], correct: 0 },
  },
};

export function getProvinceQuiz(code: string, nameFa: string): ProvinceQuiz {
  if (byCode[code]) return byCode[code];
  return {
    center: {
      q: `مرکز استان ${nameFa} کدام است؟`,
      options: [`مرکز ${nameFa}`, "تهران", "اصفهان", "شیراز"],
      correct: 0,
    },
    attraction: {
      q: `کدام جاذبه به ${nameFa} نزدیک‌تر است؟`,
      options: [`جاذبه شاخص ${nameFa}`, "برج میلاد", "تخت جمشید", "نقش جهان"],
      correct: 0,
    },
    souvenir: {
      q: `سوغات معروف ${nameFa}؟`,
      options: [`سوغات ${nameFa}`, "گز اصفهان", "پسته کرمان", "برنج گیلان"],
      correct: 0,
    },
  };
}
