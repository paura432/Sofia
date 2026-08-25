export const siteConfig = {
  name: "Sofía Chernikova",
  email: "chernisv@gmail.com",
  linkedin: "https://www.linkedin.com/in/sofia-chernikova",
  hasCv: false,
  cvPath: "/cv/sofia-chernikova.pdf",
};

export const currentPositionIds = [
  "grupo-cadena-media",
  "urjcmun",
] as const;

/** Retrato editorial. Sin `src` no se renderiza nada en About. */
export type ProfilePortrait = {
  src: string;
  width: number;
  height: number;
  altKey: "portraitAlt";
  focalPoint?: { x: number; y: number };
};

export const portrait: ProfilePortrait | undefined = undefined;

export const tools = [
  "Adobe Premiere",
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
