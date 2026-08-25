"use client";

import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import {
  locales,
  type AppPathname,
  type Locale,
} from "@/i18n/routing";

type LocaleSwitcherProps = {
  ariaLabel: string;
  labels: Record<Locale, string>;
};

const shortLabels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

export function LocaleSwitcher({ ariaLabel, labels }: LocaleSwitcherProps) {
  const activeLocale = useLocale() as Locale;
  const pathname = usePathname() as AppPathname;

  return (
    <div className="locale-switcher" aria-label={ariaLabel}>
      {locales.map((locale) => (
        <Link
          aria-current={activeLocale === locale ? "true" : undefined}
          aria-label={labels[locale]}
          href={pathname}
          hrefLang={locale}
          key={locale}
          lang={locale}
          locale={locale}
        >
          {shortLabels[locale]}
        </Link>
      ))}
    </div>
  );
}
