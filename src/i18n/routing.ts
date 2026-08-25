import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/work": {
      es: "/trabajo",
      en: "/work",
    },
    "/work/[slug]": {
      es: "/trabajo/[slug]",
      en: "/work/[slug]",
    },
    "/about": {
      es: "/sobre-mi",
      en: "/about",
    },
    "/experience": {
      es: "/experiencia",
      en: "/experience",
    },
    "/contact": {
      es: "/contacto",
      en: "/contact",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
export type StaticAppPathname = Exclude<AppPathname, "/work/[slug]">;

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;

export function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
