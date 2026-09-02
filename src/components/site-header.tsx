import { getTranslations } from "next-intl/server";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { NavLink } from "@/components/nav-link";
import { siteConfig } from "@/content/profile";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function SiteHeader() {
  const t = await getTranslations("Navigation");
  const localeLabels: Record<Locale, string> = {
    es: t("localeNames.es"),
    en: t("localeNames.en"),
    ru: t("localeNames.ru"),
  };

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        {t("skip")}
      </a>
      <div className="container nav-shell">
        <Link className="brand" href="/" aria-label={t("homeAria")}>
          {siteConfig.name}
        </Link>

        <nav className="desktop-nav" aria-label={t("sectionsAria")}>
          <div className="desktop-nav-links">
            <NavLink href="/work" label={t("items.work")} />
            <NavLink href="/about" label={t("items.about")} />
            <NavLink href="/experience" label={t("items.experience")} />
            <NavLink href="/contact" label={t("items.contact")} />
          </div>
          <LocaleSwitcher
            ariaLabel={t("localeAria")}
            labels={localeLabels}
          />
        </nav>

        <MobileNav
          brand={siteConfig.name}
          closeLabel={t("closeMenu")}
          linksAriaLabel={t("mobileAria")}
          links={
            <>
              <NavLink href="/work" index="01" label={t("items.work")} />
              <NavLink href="/about" index="02" label={t("items.about")} />
              <NavLink href="/experience" index="03" label={t("items.experience")} />
              <NavLink href="/contact" index="04" label={t("items.contact")} />
            </>
          }
          localeSwitcher={
            <LocaleSwitcher ariaLabel={t("localeAria")} labels={localeLabels} />
          }
          menuLabel={t("menu")}
          summaryLabel={t("mobileSummary")}
        />
      </div>
    </header>
  );
}
