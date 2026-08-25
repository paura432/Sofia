import Link from "next/link";

import { siteConfig } from "@/content/profile";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
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
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <details className="mobile-nav">
          <summary>Menú</summary>
          <div className="mobile-nav-panel">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </nav>
    </header>
  );
}
