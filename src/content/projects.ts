import type { ExperienceId } from "@/content/experience";
import { getMuxThumbnailUrl } from "@/lib/mux";
import {
  calle_documental_cover,
  calle_documental_media,
  entre_tiendas_y_tambores_cover,
  entre_tiendas_y_tambores_media,
  estudio_editorial_cover,
  estudio_editorial_media,
  musica_en_directo_cover,
  musica_en_directo_media,
  retrato_editorial_cover,
  retrato_editorial_media,
} from "@/content/photo-assets";

export type ProjectDiscipline =
  | "reporting"
  | "interview"
  | "video"
  | "audiovisual"
  | "photography"
  | "communication";

export type ReportingFormat = "coverage" | "short-form";
export type ProjectSection = "reporting" | "audiovisual" | "photography";

export type MediaType = "image" | "video" | "embed";

export type VideoProvider = "youtube" | "vimeo" | "native" | "mux";

export type MediaLayout =
  | "full"
  | "wide"
  | "half"
  | "portrait"
  | "pair"
  | "triptych";

export type NarrativeRole =
  | "opening"
  | "context"
  | "development"
  | "peak"
  | "closing";

export type AspectRatio =
  | "3:2"
  | "4:3"
  | "16:9"
  | "9:16"
  | "4:5"
  | "2:3"
  | "1:1";

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
  /** Public Mux Playback ID. Never expose a Mux API secret. */
  muxPlaybackId?: string;
  posterTime?: number;
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
  /** Ritmo del photo essay. Si falta, ProjectMediaLayout lo infiere por posición. */
  narrativeRole?: NarrativeRole;
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
  /** Broad editorial feature flag; Short-form Reporting uses it as priority. */
  featured?: boolean;
  reporterReel?: boolean;
  /** Reporting presentation; reporterReel remains a separate editorial feature. */
  reportingFormat?: ReportingFormat;
  /** Explicit Work selection; independent from Home/audiovisual `featured`. */
  reportingFeatured?: boolean;
  /** Reporting stories default to Work-only; opt in when case-study context exists. */
  detailPage?: boolean;
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
    sourceUrl:
      "https://es.linkedin.com/posts/sofia-chernikova_hace-unos-a%C3%B1os-habr%C3%ADa-visto-muchas-de-estas-activity-7486385459078746112--ATZ",
    translationKey: "reporter-reel",
    rights: {
      verified: false,
      note: "Pendiente el archivo definitivo del reel y los créditos de cada pieza.",
    },
    // media: pegar tras ingest de poster/vídeo — ver docs/first-project-publish.md
  },
  // Ingest editorial candidates from videos_reels.zip; keep unpublished until
  // Mux, title, provenance, role and rights are verified (see manifest).
  {
    id: "short-form-001",
    slug: "short-form-001",
    year: "",
    discipline: ["reporting", "video"],
    reportingFormat: "short-form",
    featured: false,
    order: 3,
    published: false,
    translationKey: "short-form-001",
    rights: { verified: false, note: "Source, publication rights and credits pending." },
    cover: {
      id: "short-form-001-video",
      type: "video",
      layout: "portrait",
      aspectRatio: "9:16",
      provider: "mux",
      width: 720,
      height: 1280,
      duration: "03:48",
      titleKey: "short-form-001-video",
      posterTime: 45.8,
    },
  },
  {
    id: "short-form-002",
    slug: "short-form-002",
    year: "",
    discipline: ["reporting", "video"],
    reportingFormat: "short-form",
    featured: true,
    order: 1,
    published: false,
    translationKey: "short-form-002",
    rights: { verified: false, note: "Source, publication rights and credits pending." },
    cover: {
      id: "short-form-002-video",
      type: "video",
      layout: "portrait",
      aspectRatio: "9:16",
      provider: "mux",
      width: 576,
      height: 1024,
      duration: "02:44",
      titleKey: "short-form-002-video",
      posterTime: 55.3,
    },
  },
  {
    id: "short-form-003",
    slug: "short-form-003",
    year: "",
    discipline: ["reporting", "video"],
    reportingFormat: "short-form",
    featured: true,
    order: 1,
    published: false,
    translationKey: "short-form-003",
    rights: { verified: false, note: "Source, publication rights and credits pending." },
    cover: {
      id: "short-form-003-video",
      type: "video",
      layout: "portrait",
      aspectRatio: "9:16",
      provider: "mux",
      width: 720,
      height: 1280,
      duration: "00:58",
      titleKey: "short-form-003-video",
      posterTime: 59.5,
    },
  },
  {
    id: "short-form-004",
    slug: "short-form-004",
    year: "",
    discipline: ["reporting", "video"],
    reportingFormat: "short-form",
    featured: false,
    order: 4,
    published: false,
    translationKey: "short-form-004",
    rights: { verified: false, note: "Context, source, publication rights and credits pending." },
    cover: {
      id: "short-form-004-video",
      type: "video",
      layout: "portrait",
      aspectRatio: "9:16",
      provider: "mux",
      width: 576,
      height: 1024,
      duration: "02:43",
      titleKey: "short-form-004-video",
      posterTime: 57.3,
    },
  },
  {
    id: "silver-praxis-condicion-perfecta",
    slug: "silver-praxis-condicion-perfecta",
    year: "",
    discipline: ["audiovisual"],
    order: 4.5,
    published: false,
    translationKey: "silver-praxis-condicion-perfecta",
    roleKeys: ["shooting", "post-production"],
    rights: { verified: false, note: "Portfolio permission and music/artist rights pending." },
    cover: {
      id: "silver-praxis-condicion-perfecta-video",
      type: "video",
      layout: "full",
      aspectRatio: "16:9",
      provider: "mux",
      width: 1920,
      height: 1080,
      duration: "03:05",
      titleKey: "silver-praxis-condicion-perfecta-video",
      posterTime: 65.1,
    },
  },
  // Mux Image API and public HLS playback verified 2026-09-18.
  {
    id: "4-minutos",
    slug: "4-minutos",
    year: "",
    discipline: ["audiovisual"],
    featured: true,
    order: 4,
    published: true,
    translationKey: "4-minutos",
    cover: {
      id: "4-minutos-poster",
      type: "video",
      layout: "full",
      aspectRatio: "16:9",
      muxPlaybackId: "m2dxVaMBZKQ8wX7dNCs01ic6QwJB302OISItsFiOHbF200",
      posterTime: 202,
      poster: getMuxThumbnailUrl("m2dxVaMBZKQ8wX7dNCs01ic6QwJB302OISItsFiOHbF200", {
        time: 202,
        width: 1600,
      }),
      provider: "mux",
      titleKey: "4-minutos-poster",
      duration: "03:59",
    },
  },
  {
    id: "tras-el-sofa",
    slug: "tras-el-sofa",
    year: "",
    discipline: ["audiovisual"],
    order: 5,
    published: true,
    translationKey: "tras-el-sofa",
    cover: {
      id: "tras-el-sofa-poster",
      type: "video",
      layout: "full",
      aspectRatio: "16:9",
      muxPlaybackId: "6EyrkximJOV2KpOdeJLvf2miHudBAOp2EcNOu54sjPg",
      posterTime: 303,
      poster: getMuxThumbnailUrl("6EyrkximJOV2KpOdeJLvf2miHudBAOp2EcNOu54sjPg", {
        time: 303,
        width: 1600,
      }),
      provider: "mux",
      titleKey: "tras-el-sofa-poster",
      duration: "05:59",
    },
  },
  {
    id: "version-beta",
    slug: "version-beta",
    year: "",
    discipline: ["audiovisual"],
    order: 6,
    published: true,
    translationKey: "version-beta",
    cover: {
      id: "version-beta-poster",
      type: "video",
      layout: "full",
      aspectRatio: "16:9",
      muxPlaybackId: "pOfGCwjlQAJJN01F5rVSWVQIGL9aGKwhNLAeJWzEr02ag",
      posterTime: 50,
      poster: getMuxThumbnailUrl("pOfGCwjlQAJJN01F5rVSWVQIGL9aGKwhNLAeJWzEr02ag", {
        time: 50,
        width: 1600,
      }),
      provider: "mux",
      titleKey: "version-beta-poster",
      duration: "00:58",
    },
  },
  {
    id: "musica-en-directo",
    slug: "musica-en-directo",
    year: "Pendiente",
    discipline: ["photography"],
    order: 10,
    featured: true,
    published: true,
    translationKey: "musica-en-directo",
    rights: {
      verified: false,
      note: "Año, derechos y créditos pendientes de confirmación editorial antes de publicar.",
    },
    cover: musica_en_directo_cover,
    media: musica_en_directo_media,
  },
  {
    id: "calle-documental",
    slug: "calle-documental",
    year: "Pendiente",
    discipline: ["photography"],
    order: 11,
    published: true,
    translationKey: "calle-documental",
    rights: {
      verified: false,
      note: "Año, derechos y créditos pendientes de confirmación editorial antes de publicar.",
    },
    cover: calle_documental_cover,
    media: calle_documental_media,
  },
  {
    id: "estudio-editorial",
    slug: "estudio-editorial",
    year: "Pendiente",
    discipline: ["photography"],
    order: 12,
    published: true,
    translationKey: "estudio-editorial",
    rights: {
      verified: false,
      note: "Año, derechos y créditos pendientes de confirmación editorial antes de publicar.",
    },
    cover: estudio_editorial_cover,
    media: estudio_editorial_media,
  },
  {
    id: "retrato-editorial",
    slug: "retrato-editorial",
    year: "Pendiente",
    discipline: ["photography"],
    order: 13,
    published: true,
    translationKey: "retrato-editorial",
    rights: {
      verified: false,
      note: "Año, derechos y créditos pendientes de confirmación editorial antes de publicar.",
    },
    cover: retrato_editorial_cover,
    media: retrato_editorial_media,
  },
  {
    id: "entre-tiendas-y-tambores",
    slug: "entre-tiendas-y-tambores",
    year: "",
    discipline: ["photography"],
    order: 14,
    published: true,
    translationKey: "entre-tiendas-y-tambores",
    cover: entre_tiendas_y_tambores_cover,
    media: entre_tiendas_y_tambores_media,
    rights: {
      verified: false,
      note: "Permisos de imagen, titularidad, crédito y rol fotográfico pendientes de confirmación directa.",
    },
  },

];

/**
 * `sizes` por layout. Los cortes siguen el grid editorial: una columna en
 * móvil, media columna en tablet y la fracción real del container en desktop
 * (`--photo-canvas-max: 1920px` menos `--page-gutter` en detalle).
 */
const mediaSizes: Record<MediaLayout, string> = {
  full: "(max-width: 699px) 100vw, (max-width: 1920px) 92vw, 1920px",
  wide: "(max-width: 699px) 100vw, (max-width: 1300px) 92vw, 1280px",
  half: "(max-width: 699px) 100vw, (max-width: 1920px) 46vw, 930px",
  portrait:
    "(max-width: 699px) 92vw, (max-width: 1023px) 52vw, (max-width: 1920px) 42vw, 720px",
  pair: "(max-width: 699px) 100vw, (max-width: 1920px) 46vw, 930px",
  triptych:
    "(max-width: 699px) 100vw, (max-width: 1023px) 46vw, (max-width: 1920px) 31vw, 600px",
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

export function publishableYear(year?: string) {
  return year && year !== "Pendiente" ? year : undefined;
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
    date: publishableYear(defaults?.date ?? project.year),
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

function isPublicHttpUrl(value?: string) {
  try {
    const protocol = new URL(value ?? "").protocol;
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
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
    const hasPlayableSource = hasPlayableVideoSource(media);

    return Boolean(media.poster && media.titleKey && hasPlayableSource);
  }

  return Boolean(isPublicHttpUrl(media.externalUrl) && media.titleKey);
}

function hasPlayableVideoSource(media: ProjectMedia) {
  if (media.provider === "native") return Boolean(media.src);
  if (media.provider === "mux") return Boolean(media.muxPlaybackId);
  return Boolean(media.provider && media.videoId);
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
  if (!project.published || !hasRenderableProjectContent(project)) return false;
  if (
    project.id === "silver-praxis-condicion-perfecta" &&
    (!project.roleKeys?.some(Boolean) || project.rights?.verified !== true)
  ) {
    return false;
  }
  if (!project.discipline.includes("reporting")) return true;

  const media = [project.cover, ...(project.media ?? [])].filter(
    Boolean,
  ) as ProjectMedia[];
  const hasPoster = media.some(
    (item) => {
      if (item.type === "image") return hasMediaAsset(item);
      return Boolean(
        item.type === "video" &&
          item.poster &&
          hasMediaAsset(item) &&
          item.aspectRatio,
      );
    },
  );
  const hasReelVideo =
    !project.reporterReel ||
    media.some(
      (item) =>
        item.type === "video" &&
        item.poster &&
        hasMediaAsset(item) &&
        item.aspectRatio,
    );
  const hasOwnMuxShortForm =
    project.reportingFormat === "short-form" &&
    media.some(
      (item) =>
        item.type === "video" &&
        item.provider === "mux" &&
        item.muxPlaybackId &&
        item.poster &&
        item.aspectRatio,
    );
  return Boolean(
    (isPublicHttpUrl(project.sourceUrl) || hasOwnMuxShortForm) &&
      project.roleKeys?.some(Boolean) &&
      project.rights?.verified &&
      hasPoster &&
      hasReelVideo,
  );
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

export function sortShortFormProjects<
  T extends Pick<PortfolioProject, "id" | "featured" | "order">,
>(items: readonly T[]): T[] {
  const sourceOrder = new Map(projects.map((project, index) => [project.id, index]));

  return items
    .map((project, index) => ({ project, index }))
    .sort((a, b) =>
      Number(b.project.featured === true) - Number(a.project.featured === true) ||
      (a.project.order ?? sourceOrder.get(a.project.id) ?? a.index) -
        (b.project.order ?? sourceOrder.get(b.project.id) ?? b.index) ||
      a.index - b.index,
    )
    .map(({ project }) => project);
}

export function getPublishedProjects() {
  return byEditorialOrder(projects.filter(isRenderableProject));
}

export function getProjectSection(project: PortfolioProject): ProjectSection | undefined {
  if (project.discipline.includes("reporting") && !project.discipline.includes("audiovisual")) {
    return "reporting";
  }
  if (project.discipline.includes("audiovisual")) return "audiovisual";
  if (project.discipline.includes("photography")) return "photography";
}

export function getProjectsInSection(section: ProjectSection) {
  return getPublishedProjects().filter((project) => getProjectSection(project) === section);
}

export function hasPublishedReporting() {
  return getProjectsInSection("reporting").length > 0;
}

export function getHomeReportingSelection(limit = 4) {
  const reporting = getProjectsInSection("reporting").filter(
    (project) => !project.reporterReel,
  );
  const shortForm = sortShortFormProjects(
    reporting.filter((project) => project.reportingFormat === "short-form"),
  );
  const selected = reporting.filter((project) => project.reportingFeatured);

  return (shortForm.length ? shortForm : selected).slice(0, limit);
}

export function getHomeAudiovisualSelection(limit = 1) {
  const audiovisual = getProjectsInSection("audiovisual");
  return [
    ...audiovisual.filter((project) => project.featured),
    ...audiovisual.filter((project) => !project.featured),
  ].slice(0, limit);
}

export function getHomePhotographySelection(limit = 2) {
  const photography = getProjectsInSection("photography");
  return [
    ...photography.filter((project) => project.featured),
    ...photography.filter((project) => !project.featured),
  ].slice(0, limit);
}

export function hasProjectDetailPage(project: PortfolioProject) {
  return (
    project.detailPage ??
    (!project.discipline.includes("reporting") || project.reporterReel === true)
  );
}

export function getDetailedProjects() {
  return getPublishedProjects().filter(hasProjectDetailPage);
}

export function getDetailedProjectsInSection(project: PortfolioProject) {
  const section = getProjectSection(project);
  return getDetailedProjects().filter((item) => getProjectSection(item) === section);
}

export function getReporterReel() {
  return getPublishedProjects().find((project) => project.reporterReel);
}

export function getFeaturedProject() {
  const reel = getReporterReel();
  const pool = getPublishedProjects().filter(
    (project) =>
      project.id !== reel?.id &&
      !project.discipline.includes("audiovisual") &&
      !project.discipline.includes("reporting"),
  );

  return pool.find((project) => project.featured) ?? pool[0];
}

export function getSelectedProjects(limit = 3) {
  const reel = getReporterReel();

  return getPublishedProjects()
    .filter(
      (project) =>
        project.id !== reel?.id &&
        !project.discipline.includes("audiovisual") &&
        !project.discipline.includes("reporting"),
    )
    .slice(0, limit);
}

export function getProjectBySlug(slug: string) {
  return getDetailedProjects().find((project) => project.slug === slug);
}

export function getRelatedProjects(experienceId: ExperienceId) {
  return getPublishedProjects().filter(
    (project) => project.experienceId === experienceId,
  );
}

export function getNextProject(currentSlug: string) {
  const current = getProjectBySlug(currentSlug);
  if (!current) return undefined;
  const detailProjects = getDetailedProjectsInSection(current);
  const currentIndex = detailProjects.findIndex(
    (project) => project.slug === currentSlug,
  );

  if (currentIndex === -1 || detailProjects.length < 2) {
    return undefined;
  }

  return detailProjects[(currentIndex + 1) % detailProjects.length];
}

export function getPrevProject(currentSlug: string) {
  const current = getProjectBySlug(currentSlug);
  if (!current) return undefined;
  const detailProjects = getDetailedProjectsInSection(current);
  const currentIndex = detailProjects.findIndex(
    (project) => project.slug === currentSlug,
  );

  if (currentIndex === -1 || detailProjects.length < 2) {
    return undefined;
  }

  return detailProjects[
    (currentIndex - 1 + detailProjects.length) % detailProjects.length
  ];
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
        const hasPlayableSource = hasPlayableVideoSource(media);
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
