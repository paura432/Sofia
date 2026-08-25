import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main id="main">
      <section className="page-hero section section-first">
        <div className="container page-hero-inner">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="display-page">{t("title")}</h1>
          <p>{t("body")}</p>
          <Link className="text-link arrow-link" href="/">
            {t("home")} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
