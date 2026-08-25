export type Project = {
  slug: string;
  title: string;
  year: string;
  discipline: "reporting" | "photo" | "video" | "communication";
  client?: string;
  role?: string[];
  description?: string;
  cover?: string;
  videoUrl?: string;
  featured?: boolean;
  published?: boolean;
};

export const projects: Project[] = [];

export const projectFilters = [
  "ALL",
  "REPORTING",
  "PHOTO",
  "VIDEO",
  "COMMUNICATION",
] as const;
