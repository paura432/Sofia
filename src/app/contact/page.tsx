import type { Metadata } from "next";

import { ContactBlock } from "@/components/contact-block";
import { siteConfig } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main id="main" className="page-shell contact-page">
      <section className="page-hero">
        <p className="eyebrow">CONTACT</p>
        <h1>Hablemos.</h1>
        <p>
          Disponible para oportunidades profesionales y proyectos relacionados
          con periodismo, producción audiovisual, fotografía y comunicación.
        </p>
        <a className="button-link primary" href={`mailto:${siteConfig.email}`}>
          Enviar email
        </a>
      </section>
      <ContactBlock compact />
    </main>
  );
}
