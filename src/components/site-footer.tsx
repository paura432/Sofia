import Link from "next/link";

import { siteConfig } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-name">{siteConfig.name}</p>
        <p>{siteConfig.dateline}</p>
      </div>
      <div className="footer-links">
        <a href={`mailto:${siteConfig.email}`}>Email</a>
        <a href={siteConfig.linkedin} rel="noreferrer" target="_blank">
          LinkedIn
        </a>
      </div>
      <p>Periodismo / Visual / Comunicación</p>
    </footer>
  );
}
