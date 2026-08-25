import type { ExperienceId } from "@/content/experience";

export type ProjectDiscipline =
  | "reporting"
  | "interview"
  | "video"
  | "photography"
  | "communication";

export type MediaType = "image" | "video" | "embed";

export type VideoProvider = "youtube" | "vimeo" | "native";

export type MediaLayout =
  | "full"
  | "wide"
  | "half"
  | "portrait"
  | "pair"
  | "triptych";

export type AspectRatio = "3:2" | "4:3" | "16:9" | "4:5" | "2:3" | "1:1";

export type ProjectMedia = {
  id: string;
  type: MediaType;
  layout?: MediaLayout;
  aspectRatio?: AspectRatio;
  src?: string;
  poster?: string;
  provider?: VideoProvider;
  videoId?: string;
  externalUrl?: string;
  width?: number;
  height?: number;
  altKey?: string;
  captionKey?: string;
  titleKey?: string;
  featured?: boolean;
  position?: number;
  duration?: string;
  decorative?: boolean;
};

export type ProjectCredit = {
  roleKey: string;
  name: string;
};

export type PortfolioProject = {
  id: string;
  slug: string;
  year: string;
  organisation?: string;
  locationKey?: string;
  discipline: ProjectDiscipline[];
  experienceId?: ExperienceId;
  featured?: boolean;
  reporterReel?: boolean;
  published: boolean;
  translationKey: string;
  cover?: ProjectMedia;
  media?: ProjectMedia[];
  roleKeys?: string[];
  credits?: ProjectCredit[];
  sourceUrl?: string;
};

export type PublishedPortfolioProject = PortfolioProject & {
  published: true;
};

export const projects: PortfolioProject[] = [
  {
    id: "grupo-cadena-media",
    slug: "grupo-cadena-media",
    year: "2024 — Actualidad",
    organisation: "Grupo Cadena Media",
    discipline: ["reporting", "interview", "video"],
    experienceId: "grupo-cadena-media",
    published: false,
    translationKey: "grupo-cadena-media",
  },
  {
    id: "urjcmun",
    slug: "urjcmun",
    year: "2026",
    organisation: "URJCmun",
    discipline: ["communication", "photography", "video"],
    experienceId: "urjcmun",
    published: false,
    translationKey: "urjcmun",
  },
  {
    id: "annie-bonnie",
    slug: "annie-bonnie",
    year: "2025 — 2026",
    organisation: "Annie Bonnie",
    discipline: ["communication", "video"],
    experienceId: "annie-bonnie",
    published: false,
    translationKey: "annie-bonnie",
  },
  {
    id: "isocero",
    slug: "isocero",
    year: "2023",
    organisation: "Isocero",
    discipline: ["photography"],
    experienceId: "isocero",
    published: false,
    translationKey: "isocero",
  },
];

export function hasMediaAsset(media: ProjectMedia) {
  if (media.type === "image") {
    return Boolean(media.src && (media.decorative || media.altKey));
  }

  if (media.type === "video") {
    const hasPlayableSource =
      media.provider === "native"
        ? Boolean(media.src)
        : Boolean(media.provider && media.videoId);

    return Boolean(media.poster && media.titleKey && hasPlayableSource);
  }

  return Boolean(media.externalUrl && media.titleKey);
}

export function hasRenderableProjectContent(project: PortfolioProject) {
  const media = [project.cover, ...(project.media ?? [])].filter(
    Boolean,
  ) as ProjectMedia[];

  return media.some(hasMediaAsset);
}

export function isRenderableProject(
  project: PortfolioProject,
): project is PublishedPortfolioProject {
  return project.published === true && hasRenderableProjectContent(project);
}

export function getPublishedProjects() {
  return projects.filter(isRenderableProject);
}

export function getFeaturedProject() {
  return (
    getPublishedProjects().find((project) => project.featured) ??
    getPublishedProjects()[0]
  );
}

export function getSelectedProjects(limit = 3) {
  return getPublishedProjects().slice(0, limit);
}

export function getProjectBySlug(slug: string) {
  return getPublishedProjects().find((project) => project.slug === slug);
}

export function getRelatedProjects(experienceId: ExperienceId) {
  return getPublishedProjects().filter(
    (project) => project.experienceId === experienceId,
  );
}

export function getNextProject(currentSlug: string) {
  const publishedProjects = getPublishedProjects();
  const currentIndex = publishedProjects.findIndex(
    (project) => project.slug === currentSlug,
  );

  if (currentIndex === -1 || publishedProjects.length < 2) {
    return undefined;
  }

  return publishedProjects[(currentIndex + 1) % publishedProjects.length];
}
