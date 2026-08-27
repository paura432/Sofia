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

/** Porcentajes 0-100 que se traducen a `object-position: x% y%`. */
export type MediaFocalPoint = {
  x: number;
  y: number;
};

export type VideoTrack = {
  src: string;
  srcLang: "es" | "en";
  labelKey: string;
  kind: "captions" | "subtitles";
  default?: boolean;
};

/** Textos visibles de un asset. Viven en `messages` bajo `Projects.items.*.media`. */
export type MediaCopy = {
  alt?: string;
  caption?: string;
  title?: string;
  location?: string;
  date?: string;
  credit?: string;
  transcript?: string;
};

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
  /** Base64 diminuto para `placeholder="blur"`. Sin él se usa `empty`. */
  blurDataURL?: string;
  /** Evita recortar caras cuando el encuadre no está centrado. */
  focalPoint?: MediaFocalPoint;
  /** Solo cuando el recorte móvil exige un asset distinto, no por defecto. */
  mobileSrc?: string;
  mobilePoster?: string;
  creditKey?: string;
  tracks?: VideoTrack[];
  transcriptKey?: string;
};

export type ProjectCredit = {
  roleKey: string;
  name: string;
};

/** Control interno. No se pinta en la web pública. */
export type ProjectRights = {
  verified: boolean;
  note?: string;
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
  /**
   * Orden editorial. Menor = más arriba. Independiente del año y de la
   * posición en este array. Sin `order`, se conserva el orden de declaración.
   */
  order?: number;
  rights?: ProjectRights;
};

export type PublishedPortfolioProject = PortfolioProject & {
  published: true;
};

export const projects: PortfolioProject[] = [
  {
    id: "reporter-reel",
    slug: "reporter-reel",
    year: "2024 — Actualidad",
    locationKey: "madrid",
    discipline: ["reporting", "interview", "video"],
    experienceId: "grupo-cadena-media",
    reporterReel: true,
    order: 0,
    published: false,
    translationKey: "reporter-reel",
    rights: {
      verified: false,
      note: "Pendiente el archivo definitivo del reel y los créditos de cada pieza.",
    },
    // media: pegar tras ingest de poster/vídeo — ver docs/first-project-publish.md
  },
  {
    id: "grupo-cadena-media",
    slug: "grupo-cadena-media",
    year: "2024 — Actualidad",
    organisation: "Grupo Cadena Media",
    locationKey: "madrid",
    discipline: ["reporting", "interview", "video"],
    experienceId: "grupo-cadena-media",
    order: 1,
    featured: true,
    published: false,
    translationKey: "grupo-cadena-media",
    rights: {
      verified: false,
      note: "Pendiente confirmación editorial del medio antes de publicar.",
    },
    // cover: pegar tras `pnpm media:image` — ver docs/first-project-publish.md
  },
  {
    id: "urjcmun",
    slug: "urjcmun",
    year: "2026",
    organisation: "URJCmun",
    locationKey: "madrid",
    discipline: ["communication", "photography", "video"],
    experienceId: "urjcmun",
    order: 2,
    published: false,
    translationKey: "urjcmun",
    rights: {
      verified: false,
      note: "Confirmar derechos de imagen URJCmun antes de publicar.",
    },
  },
  {
    id: "annie-bonnie",
    slug: "annie-bonnie",
    year: "2025 — 2026",
    organisation: "Annie Bonnie",
    discipline: ["communication", "video"],
    experienceId: "annie-bonnie",
    order: 3,
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
    order: 4,
    published: false,
    translationKey: "isocero",
  },
];

/**
 * `sizes` por layout. Los cortes siguen el grid editorial: una columna en
 * móvil, media columna en tablet y la fracción real del container en desktop
 * (`--container-max: 1440px` menos `--page-gutter`).
 */
const mediaSizes: Record<MediaLayout, string> = {
  full: "(max-width: 699px) 100vw, (max-width: 1600px) 92vw, 1440px",
  wide: "(max-width: 699px) 100vw, (max-width: 1300px) 92vw, 1180px",
  half: "(max-width: 699px) 100vw, (max-width: 1600px) 46vw, 710px",
  portrait:
    "(max-width: 699px) 100vw, (max-width: 1023px) 46vw, (max-width: 1600px) 31vw, 470px",
  pair: "(max-width: 699px) 100vw, (max-width: 1600px) 46vw, 710px",
  triptych:
    "(max-width: 699px) 100vw, (max-width: 1023px) 46vw, (max-width: 1600px) 31vw, 470px",
};

export function getMediaSizes(layout: MediaLayout = "wide") {
  return mediaSizes[layout];
}

export function focalPointStyle(media: Pick<ProjectMedia, "focalPoint">) {
  const x = media.focalPoint?.x ?? 50;
  const y = media.focalPoint?.y ?? 50;
  return `${x}% ${y}%`;
}

function mediaTranslationBlock(
  translations: Record<string, MediaCopy> | undefined,
  key: string | undefined,
) {
  if (!key || !translations) return undefined;
  return translations[key];
}

/**
 * Une `id` y claves opcionales (`altKey`, `captionKey`, `creditKey`, …) con la
 * copy de `messages`. Los campos del bloque `id` tienen prioridad; las claves
 * apuntan al mismo objeto o a bloques distintos según curación.
 */
export function resolveMediaItemCopy(
  media: ProjectMedia,
  translations: Record<string, MediaCopy> | undefined,
  defaults?: Pick<MediaCopy, "location" | "date">,
): MediaCopy {
  const primary = mediaTranslationBlock(translations, media.id) ?? {};

  return {
    alt:
      primary.alt ??
      mediaTranslationBlock(translations, media.altKey)?.alt ??
      mediaTranslationBlock(translations, media.titleKey)?.title,
    caption:
      primary.caption ??
      mediaTranslationBlock(translations, media.captionKey)?.caption,
    title:
      primary.title ?? mediaTranslationBlock(translations, media.titleKey)?.title,
    credit:
      primary.credit ??
      mediaTranslationBlock(translations, media.creditKey)?.credit,
    transcript:
      primary.transcript ??
      (media.transcriptKey
        ? mediaTranslationBlock(translations, media.transcriptKey)?.transcript
        : undefined),
    location: primary.location ?? defaults?.location,
    date: primary.date ?? defaults?.date,
  };
}

/** Mapa `media.id` → copy resuelta para ProjectMediaLayout. */
export function buildProjectMediaCopy(
  project: PortfolioProject,
  translations: Record<string, MediaCopy> | undefined,
  defaults?: Pick<MediaCopy, "location" | "date">,
) {
  const items = [project.cover, ...(project.media ?? [])].filter(
    Boolean,
  ) as ProjectMedia[];
  const baseDefaults = {
    location: defaults?.location,
    date: defaults?.date ?? project.year,
  };
  const resolved: Record<string, MediaCopy> = {};

  for (const media of items) {
    resolved[media.id] = resolveMediaItemCopy(
      media,
      translations,
      baseDefaults,
    );
  }

  return resolved;
}

function isValidFocalPoint(point: MediaFocalPoint) {
  return (
    Number.isFinite(point.x) &&
    Number.isFinite(point.y) &&
    point.x >= 0 &&
    point.x <= 100 &&
    point.y >= 0 &&
    point.y <= 100
  );
}

export function hasMediaAsset(media: ProjectMedia) {
  if (media.type === "image") {
    const hasIdentity = Boolean(media.src && (media.decorative || media.altKey));
    const hasGeometry = Boolean(
      media.aspectRatio || (media.width && media.height),
    );

    return hasIdentity && hasGeometry;
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

function byEditorialOrder<T extends PortfolioProject>(list: T[]) {
  return list
    .map((project, index) => ({ project, index }))
    .sort((a, b) => {
      const orderA = a.project.order ?? a.index;
      const orderB = b.project.order ?? b.index;
      return orderA - orderB;
    })
    .map(({ project }) => project);
}

export function getPublishedProjects() {
  return byEditorialOrder(projects.filter(isRenderableProject));
}

export function getReporterReel() {
  return getPublishedProjects().find((project) => project.reporterReel);
}

export function getFeaturedProject() {
  const reel = getReporterReel();
  const pool = getPublishedProjects().filter(
    (project) => project.id !== reel?.id,
  );

  return pool.find((project) => project.featured) ?? pool[0];
}

export function getSelectedProjects(limit = 3) {
  const featured = getFeaturedProject();
  const reel = getReporterReel();
  const skip = new Set(
    [featured?.id, reel?.id].filter((id): id is string => Boolean(id)),
  );

  return getPublishedProjects()
    .filter((project) => !skip.has(project.id))
    .slice(0, limit);
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

/**
 * Avisos de ingesta: solo en desarrollo, para detectar metadatos incompletos
 * antes de publicar. En producción no se ejecuta ni una línea.
 */
function warnIncompleteMedia() {
  const warn = (message: string) => console.warn(`[projects] ${message}`);

  for (const project of projects) {
    const allMedia = [project.cover, ...(project.media ?? [])].filter(
      Boolean,
    ) as ProjectMedia[];

    if (project.published && !project.cover) {
      warn(`${project.slug}: published sin cover`);
    }

    if (project.published && project.rights?.verified !== true) {
      warn(`${project.slug}: published sin rights.verified`);
    }

    if (project.published && !hasRenderableProjectContent(project)) {
      warn(`${project.slug}: published pero incompleto (sin media renderizable)`);
    }

    const seenIds = new Set<string>();
    const seenPositions = new Set<number>();

    for (const media of allMedia) {
      const label = `${project.slug}/${media.id}`;

      if (seenIds.has(media.id)) {
        warn(`${label}: id duplicado`);
      }
      seenIds.add(media.id);

      if (media.position !== undefined) {
        if (seenPositions.has(media.position)) {
          warn(`${label}: position ${media.position} duplicada`);
        }
        seenPositions.add(media.position);
      }

      if (media.focalPoint && !isValidFocalPoint(media.focalPoint)) {
        warn(`${label}: focalPoint fuera de 0–100`);
      }

      if (media.type === "image") {
        if (!media.decorative && !media.altKey) {
          warn(`${label}: imagen sin altKey y sin decorative`);
        }
        if (!media.aspectRatio && !(media.width && media.height)) {
          warn(`${label}: imagen sin aspectRatio ni width/height (riesgo CLS)`);
        }
      }

      if (media.type === "video") {
        if (!media.poster) {
          warn(`${label}: vídeo sin poster`);
        }
        if (!media.titleKey) {
          warn(`${label}: vídeo sin titleKey`);
        }
        const hasPlayableSource =
          media.provider === "native"
            ? Boolean(media.src)
            : Boolean(media.provider && media.videoId);
        if (!hasPlayableSource) {
          warn(`${label}: vídeo sin fuente reproducible`);
        }
      }
    }
  }
}

if (process.env.NODE_ENV === "development") {
  warnIncompleteMedia();
}
