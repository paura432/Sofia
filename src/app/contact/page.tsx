import type { Metadata } from "next";

import { ContactBlock } from "@/components/contact-block";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contacto",
  description:
    "Contacto profesional de Sofía Chernikova para oportunidades en periodismo, audiovisual, fotografía y comunicación.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main" className="contact-page">
      <ContactBlock page />
    </main>
  );
}
