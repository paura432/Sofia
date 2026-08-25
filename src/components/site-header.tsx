import { getTranslations } from "next-intl/server";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { NavLink } from "@/components/nav-link";
import { siteConfig } from "@/content/profile";
import { Link } from "@/i18n/navigation";
import type { AppPathname, Locale } from "@/i18n/routing";

const navItems: Array<{ href: AppPathname; key: string; index: string }> = [
  { href: "/work", key: "work", index: "01" },
  { href: "/about", key: "about", index: "02" },
  { href: "/experience", key: "experience", index: "03" },
  { href: "/contact", key: "contact", index: "04" },
];

export async function SiteHeader() {
  const t = await getTranslations("Navigation");
  const localeLabels: Record<Locale, string> = {
    es: t("localeNames.es"),
    en: t("localeNames.en"),
  };

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        {t("skip")}
      </a>
      <nav className="container nav-shell" aria-label={t("sectionsAria")}>
        <Link className="brand" href="/" aria-label={t("homeAria")}>
          {siteConfig.name}
        </Link>

        <div className="desktop-nav">
          <div className="desktop-nav-links" aria-label={t("sectionsAria")}>
            {navItems.map((item) => (
              <NavLink
                href={item.href}
                key={item.href}
                label={t(`items.${item.key}`)}
              />
            ))}
          </div>
          <LocaleSwitcher
            ariaLabel={t("localeAria")}
            labels={localeLabels}
          />
        </div>

        <details className="mobile-nav">
          <summary>{t("mobileSummary")}</summary>
          <div className="mobile-nav-panel">
            <div className="mobile-nav-panel-header">
              <span>{siteConfig.name}</span>
              <span>{t("menu")}</span>
            </div>
            <div className="mobile-nav-links" aria-label={t("mobileAria")}>
              {navItems.map((item) => (
                <NavLink
                  href={item.href}
                  index={item.index}
                  key={item.href}
                  label={t(`items.${item.key}`)}
                />
              ))}
            </div>
            <LocaleSwitcher
              ariaLabel={t("localeAria")}
              labels={localeLabels}
            />
          </div>
        </details>
      </nav>
    </header>
  );
}
