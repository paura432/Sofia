import { ImageResponse } from "next/og";

export const alt = "Sofía Chernikova — Periodista · Comunicadora Audiovisual";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f1e8",
          color: "#11110f",
          padding: 72,
          borderTop: "14px solid #a52522",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            letterSpacing: 0,
            fontFamily: "Arial, sans-serif",
          }}
        >
          <span>MADRID — 2026</span>
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
            Periodista · Comunicadora Audiovisual · Madrid
          </div>
        </div>
      </div>
    ),
    size,
  );
}
