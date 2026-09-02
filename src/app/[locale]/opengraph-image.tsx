import { ImageResponse } from "next/og";

import { brandColors } from "@/lib/brand-colors";
import enMessages from "../../../messages/en.json";
import esMessages from "../../../messages/es.json";
import ruMessages from "../../../messages/ru.json";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type ImageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Image({ params }: ImageProps) {
  const { locale } = await params;
  const catalog: Record<string, typeof esMessages> = {
    es: esMessages,
    en: enMessages,
    ru: ruMessages,
  };
  const messages = catalog[locale] ?? esMessages;
  const hero = messages.Hero;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brandColors.background,
          color: brandColors.foreground,
          padding: 72,
          borderTop: `14px solid ${brandColors.accent}`,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 32,
            fontSize: 28,
            letterSpacing: 0,
            fontFamily: "Arial, sans-serif",
          }}
        >
          <span>{hero.dateline}</span>
          <span>REPORTING / VISUAL / COMMUNICATION</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 104,
              lineHeight: 0.92,
            }}
          >
            <span>SOFÍA</span>
            <span>CHERNIKOVA</span>
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 34,
              fontFamily: "Arial, sans-serif",
            }}
          >
            {hero.role} · {hero.location}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
