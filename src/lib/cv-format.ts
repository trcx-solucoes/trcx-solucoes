import type { DateRange, MonthYear } from "@/content/cv/types";
import type { Locale } from "@/app/[lang]/dictionaries";

const MONTHS: Record<Locale, string[]> = {
  pt: [
    "jan", "fev", "mar", "abr", "mai", "jun",
    "jul", "ago", "set", "out", "nov", "dez",
  ],
  en: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ],
};

export function formatMonthYear(my: MonthYear, locale: Locale): string {
  if (!my.month) return String(my.year);
  return `${MONTHS[locale][my.month - 1]}/${my.year}`;
}

export function formatRange(
  r: DateRange,
  locale: Locale,
  presentLabel: string,
): string {
  const start = formatMonthYear(r.start, locale);
  const end = r.end ? formatMonthYear(r.end, locale) : presentLabel;
  return `${start} — ${end}`;
}
