export const siteConfig = {
  name: "Sofía Chernikova",
  email: "chernisv@gmail.com",
  linkedin: "https://www.linkedin.com/in/sofia-chernikova",
  hasCv: false,
  cvPath: "/cv/sofia-chernikova.pdf",
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

export const tools = [
  "Premiere Pro",
  "DaVinci Resolve",
  "Photoshop",
  "Lightroom",
  "Canva",
  "CapCut",
  "Khoros",
  "CMS",
  "Jira",
  "SEO",
];
