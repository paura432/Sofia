"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

import { Link, usePathname } from "@/i18n/navigation";
import {
  locales,
  type AppPathname,
  type Locale,
  type StaticAppPathname,
} from "@/i18n/routing";

type LocaleSwitcherProps = {
  ariaLabel: string;
  labels: Record<Locale, string>;
};

const shortLabels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  ru: "RU",
};

export function LocaleSwitcher({ ariaLabel, labels }: LocaleSwitcherProps) {
  const activeLocale = useLocale() as Locale;
  const pathname = usePathname() as AppPathname;
  const params = useParams<{ slug?: string }>();
  const href =
    pathname === "/work/[slug]" && params.slug
      ? ({
          pathname: "/work/[slug]",
          params: { slug: params.slug },
        } as const)
      : (pathname as StaticAppPathname);

  return (
    <div className="locale-switcher" aria-label={ariaLabel}>
      {locales.map((locale) => (
        <Link
          aria-current={activeLocale === locale ? "true" : undefined}
          aria-label={labels[locale]}
          href={href}
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
