import Link from "next/link";

import { profile, siteConfig } from "@/content/profile";

export function Hero() {
  return (
    <section className="hero section" aria-labelledby="hero-title">
      <div className="hero-meta">
        <p>{siteConfig.role}</p>
        <p>{siteConfig.location}</p>
      </div>
      <div className="hero-copy">
        <p className="dateline">{siteConfig.dateline}</p>
        <h1 id="hero-title">{siteConfig.name.toUpperCase()}</h1>
        <p className="hero-headline">{profile.headline}</p>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-actions" aria-label="Acciones principales">
          <Link className="button-link primary" href="/work">
            Ver trabajo
          </Link>
          <Link className="button-link secondary" href="/about">
            Sobre mí
          </Link>
        </div>
      </div>
    </section>
  );
}
