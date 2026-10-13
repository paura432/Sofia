export const siteConfig = {
  name: "Sofía Chernikova",
  email: "chernisv@gmail.com",
  linkedin: "https://www.linkedin.com/in/sofia-chernikova",
  /** Currículum en PDF por idioma, servido desde `public/cv/`. */
  cv: {
    es: "/cv/sofia-chernikova-cv-es.pdf",
    en: "/cv/sofia-chernikova-cv-en.pdf",
  },
};

/** Retrato editorial. Sin `src` no se renderiza nada en About. */
export type ProfilePortrait = {
  src: string;
  width: number;
  height: number;
  altKey: "portraitAlt";
  focalPoint?: { x: number; y: number };
};

export const portrait: ProfilePortrait | undefined = {
  src: "/media/profile/portrait.webp",
  width: 1066,
  height: 1600,
  altKey: "portraitAlt",
  focalPoint: { x: 50, y: 28 },
};

export type ToolGroupKey = "video" | "photo" | "social" | "knowledge";

/** Herramientas agrupadas (Fase 6): las etiquetas de grupo viven en messages/*.json (Profile.toolGroups). */
export const toolGroups: { key: ToolGroupKey; items: string[] }[] = [
  { key: "video", items: ["Premiere Pro", "DaVinci Resolve", "CapCut"] },
  { key: "photo", items: ["Lightroom", "Photoshop"] },
  { key: "social", items: ["Canva", "Khoros", "Jira"] },
  { key: "knowledge", items: ["SEO", "CMS"] },
];
