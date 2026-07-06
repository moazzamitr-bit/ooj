const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => persianDigits[Number(digit)]);
}

export function formatPersianNumber(value: number): string {
  return toPersianDigits(value.toLocaleString("fa-IR"));
}

export function formatStudyTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0 && mins > 0) {
    return `${toPersianDigits(hours)} ساعت و ${toPersianDigits(mins)} دقیقه`;
  }
  if (hours > 0) {
    return `${toPersianDigits(hours)} ساعت`;
  }
  return `${toPersianDigits(mins)} دقیقه`;
}

export function formatPercent(value: number): string {
  return `${toPersianDigits(value)}٪`;
}

export function formatCurrencyToman(amount: number): string {
  return `${toPersianDigits(amount.toLocaleString("fa-IR"))} تومان`;
}
