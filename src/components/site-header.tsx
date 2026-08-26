import { getTranslations } from "next-intl/server";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { NavLink } from "@/components/nav-link";
import { siteConfig } from "@/content/profile";
import { Link } from "@/i18n/navigation";
import type { Locale, StaticAppPathname } from "@/i18n/routing";

const navItems: Array<{ href: StaticAppPathname; key: string; index: string }> = [
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
      <div className="container nav-shell">
        <Link className="brand" href="/" aria-label={t("homeAria")}>
          {siteConfig.name}
        </Link>

        <nav className="desktop-nav" aria-label={t("sectionsAria")}>
          <div className="desktop-nav-links">
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
        </nav>

        <MobileNav
          brand={siteConfig.name}
          closeLabel={t("closeMenu")}
          linksAriaLabel={t("mobileAria")}
          links={navItems.map((item) => (
            <NavLink
              href={item.href}
              index={item.index}
              key={item.href}
              label={t(`items.${item.key}`)}
            />
          ))}
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
