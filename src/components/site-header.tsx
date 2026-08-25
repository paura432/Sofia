import Link from "next/link";

import { NavLink } from "@/components/nav-link";
import { siteConfig } from "@/content/profile";

const navItems = [
  { href: "/work", label: "Work", index: "01" },
  { href: "/about", label: "About", index: "02" },
  { href: "/experience", label: "Experience", index: "03" },
  { href: "/contact", label: "Contact", index: "04" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <nav className="container nav-shell" aria-label="Navegación principal">
        <Link className="brand" href="/" aria-label="Inicio">
          {siteConfig.name}
        </Link>

        <div className="desktop-nav" aria-label="Secciones">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </div>

        <details className="mobile-nav">
          <summary>Menú</summary>
          <div className="mobile-nav-panel">
            <div className="mobile-nav-panel-header">
              <span>{siteConfig.name}</span>
              <span>Menú</span>
            </div>
            <div className="mobile-nav-links">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  index={item.index}
                />
              ))}
            </div>
            <p className="mobile-nav-footer">Madrid</p>
          </div>
        </details>
      </nav>
    </header>
  );
}
