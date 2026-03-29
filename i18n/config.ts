export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  id: "Indonesia",
};

export const localeFlags: Record<Locale, string> = {
  en: "/images/flags/en.png",
  id: "/images/flags/id.png",
};
