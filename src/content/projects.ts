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
  // ─── Proyectos fotográficos — drafts ────────────────────────────────────────
  // year: "Pendiente" — confirmar editorialmente cuando haya fecha definitiva.
  {
    id: "retrato-editorial",
    slug: "retrato-editorial",
    year: "Pendiente",
    discipline: ["photography"],
    order: 10,
    published: false,
    translationKey: "retrato-editorial",
    rights: {
      verified: false,
      note: "Año, derechos y créditos pendientes de confirmación editorial antes de publicar.",
    },
    cover: {
      id: "retrato-editorial-01",
      type: "image",
      src: "/media/projects/retrato-editorial/retrato-editorial-01.webp",
      width: 2800,
      height: 1867,
      aspectRatio: "3:2",
      blurDataURL: "data:image/webp;base64,UklGRqoAAABXRUJQVlA4IJ4AAABwAwCdASoYABAAPu1iqU2ppaOiMAgBMB2JYwAD4VEh/k3pPwAA+gaLCLzzT5KwfTJDyOCHeihtYYEFxlo7IBmV3P80EsRvA5d1iUpMkDqJPU19ovBfUAdPv9mWJwiIIsJ9ulJ/oxE9vNseqAGz9S6G63yOsEhrD/VQSPn5SE71Ttb9Lzu2xU/9bYhX2i1QHKdE26xSfhQXuZZBJj9AAA==",
      layout: "full",
      position: 1,
      altKey: "r01",
      captionKey: "r01",
    },
    media: [
      {
        id: "retrato-editorial-02",
        type: "image",
        src: "/media/projects/retrato-editorial/retrato-editorial-02.webp",
        width: 2800,
        height: 1867,
        aspectRatio: "3:2",
        blurDataURL: "data:image/webp;base64,UklGRrwAAABXRUJQVlA4ILAAAACQBACdASoYABAAPu1iqU2ppaOiMAgBMB2JbACdAywToAidx62onn7RIaB5e4AA/mtBsmuEgEZu1pysg1wIO/yrhEdNf+VUS41pueoHHUr5+7jPWNsrdRncrLxN8tqORjq1NUF7IXIIfo+o86uoNXpQJmtk9/FVoxqDn//+mLSrsmgR6lyHGlY3nSId3/yfMHMWL+1sEkt2JrWJGKDjussWXc2COCzBKHjiaM8SP+AAAA==",
        layout: "wide",
        position: 2,
        altKey: "r02",
        captionKey: "r02",
      },
      {
        id: "retrato-editorial-03",
        type: "image",
        src: "/media/projects/retrato-editorial/retrato-editorial-03.webp",
        width: 2800,
        height: 1867,
        aspectRatio: "3:2",
        blurDataURL: "data:image/webp;base64,UklGRsIAAABXRUJQVlA4ILYAAACQBACdASoYABAAPu1iqU2ppaOiMAgBMB2JbACdLwArgBhW8QZROXNnQU4FgtAA/t284EvpXK6U20m0Zh6sov0ZNUB+oMhuAbz+LVIIbx5+YaGAzstteRDR/VhaGFjNuzIwOFi9ENYfbPiJ30OeDZEZn9md6ahVzavIvlBe6ryIc88EzVXTHTX4+6s6QchIjQfBk9HPsHo4KgMKrFnYgIXcNOI1yA83ZP0T7+iiduWAYu3DsNQAAA==",
        layout: "wide",
        position: 3,
        altKey: "r03",
        captionKey: "r03",
        focalPoint: { x: 45, y: 30 },
      },
      {
        id: "retrato-editorial-04",
        type: "image",
        src: "/media/projects/retrato-editorial/retrato-editorial-04.webp",
        width: 2800,
        height: 2003,
        blurDataURL: "data:image/webp;base64,UklGRq4AAABXRUJQVlA4IKIAAAAwBQCdASoYABEAPu1sqlEppaOiqAqpMB2JbACsDXAAFlbsVXxbpeZybfVAxiXQ1ubLwAD+w5Esb6WyQPbdsGfyEzO/GG7B/Oj9bDgFZcr6+i9NOUkg9AqVyV1h6qjekt/ZkklOI2iifKzzPTDgvSx+y/PcFbJcHIHwlQgiX6zrMZqVQ3GoWwFMIfHbskck+t/BYtSOIsNC3zBRfj+DX8hwAAA=",
        layout: "half",
        position: 4,
        altKey: "r04",
        captionKey: "r04",
        focalPoint: { x: 50, y: 30 },
      },
      {
        id: "retrato-editorial-05",
        type: "image",
        src: "/media/projects/retrato-editorial/retrato-editorial-05.webp",
        width: 2800,
        height: 1867,
        aspectRatio: "3:2",
        blurDataURL: "data:image/webp;base64,UklGRuAAAABXRUJQVlA4INQAAACQBACdASoYABAAPu1iqU2ppaOiMAgBMB2JagCdMoFWADlRE5FbF2HOXOeSdFgA/omUl0kz6iRB14ABiPNM8iGW42BdLgyGZdmVc81F1QPS9oAHAt2mT/qRwyGHPnIpsIEHsOioUnlW2vGrOJCgveWLpxvyVZbOykMF5LYAWl8eSZlPHN145reiGFLq8PHyOfI6I38a2M7xF4WASq14v6fP2olsNvv1OYF0VStZV5t3RYtIRj2v3H7N1ilraAtWfQ8OBmBbcVFml5EYGdKF7PuJeAAAAA==",
        layout: "half",
        position: 5,
        altKey: "r05",
        captionKey: "r05",
      },
      {
        id: "retrato-editorial-06",
        type: "image",
        src: "/media/projects/retrato-editorial/retrato-editorial-06.webp",
        width: 2800,
        height: 1867,
        aspectRatio: "3:2",
        blurDataURL: "data:image/webp;base64,UklGRq4AAABXRUJQVlA4IKIAAACQBACdASoYABAAPu1iqU2ppaOiMAgBMB2JQBWEBswYgglmLsRJ7N7lZoqfEAAA+wPb2ylDT3smpW2s7InUoyxZfSmRSxb6nIMpaNyW33VKJR6T8q77+VZgeZnvO/A2uO0UXVsDnioAraItxNt7AK2JFPT8U3eWI+d86MU/TmoWk1hWyksD2CGDVPKR7NSk7FblWscw/LfAP+9tUQP+iJxeAAA=",
        layout: "wide",
        position: 6,
        altKey: "r06",
        captionKey: "r06",
      },
      {
        id: "retrato-editorial-07",
        type: "image",
        src: "/media/projects/retrato-editorial/retrato-editorial-07.webp",
        width: 1867,
        height: 2800,
        aspectRatio: "2:3",
        blurDataURL: "data:image/webp;base64,UklGRrYAAABXRUJQVlA4IKoAAABwBACdASoQABgAPu1iqk2ppaQiMAgBMB2JbACdMoAlsRWtmKLB8fqp6RlBwAD+4055Ob4nOp/CNhFUdK6bKxrJ9JpsB2sQ4SnsFNvWmwc1j6BQqNJjG9FI+wey8sg3mLgumuC7UhgqfEZdWWfQjpqv65MFjZEMDsYR++xhbQGvCC5weNvoSefxgMG+gLngcm0tXGfPhzXO6T+yQ1xwphaZgdDJ7YDFBCWAAA==",
        layout: "portrait",
        position: 7,
        altKey: "r07",
        captionKey: "r07",
      },
      {
        id: "retrato-editorial-08",
        type: "image",
        src: "/media/projects/retrato-editorial/retrato-editorial-08.webp",
        width: 2800,
        height: 1867,
        aspectRatio: "3:2",
        blurDataURL: "data:image/webp;base64,UklGRqYAAABXRUJQVlA4IJoAAAAQBACdASoYABAAPu1iqU2ppaOiMAgBMB2JaACsAYu4qnWS+l+8p4MwAAD+8MwD9CmK4zgkAmsSDgbNSXyoWwn5lWxy2VF0UwAiHc5vFUI/78ZoYMhGL4mJUqWBZJ3Ck1+X248JfvndDRm3t2rcxSdMO7cgskAnfQLDfYl+J7DGQiZw/C4ATHB3WPJeMXX3UFkZEN9PBrFkQAAA",
        layout: "wide",
        position: 8,
        altKey: "r08",
        captionKey: "r08",
        focalPoint: { x: 30, y: 50 },
      },
      {
        id: "retrato-editorial-09",
        type: "image",
        src: "/media/projects/retrato-editorial/retrato-editorial-09.webp",
        width: 2800,
        height: 1867,
        aspectRatio: "3:2",
        blurDataURL: "data:image/webp;base64,UklGRsoAAABXRUJQVlA4IL4AAACQBACdASoYABAAPu1iqU2ppaOiMAgBMB2JQBWGUDX/xbFicwahGAItJJ6gveAA+pE0kM7/T5GwqMf2cGW4SFtYwCv4a6s1o+FCig4HFO0M7SB1XD5h1UFiLA6I6sidzAZT+vQ1KHNeako0fxRv5UUO58M8lH4Xg/wa4AHzSalHo4Q4MUkcahEJ/7TVCa1kRqhCG+CjMww8p2HIAT+wbiZXSlTI3fpujfyRdCqioHixrcLYqcspOqzk2ahuDAAA",
        layout: "wide",
        position: 9,
        altKey: "r09",
        captionKey: "r09",
      },
      {
        id: "retrato-editorial-10",
        type: "image",
        src: "/media/projects/retrato-editorial/retrato-editorial-10.webp",
        width: 1867,
        height: 2800,
        aspectRatio: "2:3",
        blurDataURL: "data:image/webp;base64,UklGRqAAAABXRUJQVlA4IJQAAABwBACdASoQABgAPu1iqU2ppaQiMAgBMB2JYgCdAYx27YZ9IBSKrxgxjrB2UAD+mCv6RXyUH4soWc7KaNh/PX+G6jXJjj+6t+BsvX5MN6CflS/3/d4onZR8FTT0EX5GSjgR8sXKFhWn7i9ZBhbJW4/XiTHadxEwB6/Rq8J+blnk5jhA5xxpgPn1aZ0OJH8sgntdzYAA",
        layout: "portrait",
        position: 10,
        altKey: "r10",
        captionKey: "r10",
      },
      {
        id: "retrato-editorial-11",
        type: "image",
        src: "/media/projects/retrato-editorial/retrato-editorial-11.webp",
        width: 2800,
        height: 1867,
        aspectRatio: "3:2",
        blurDataURL: "data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAACwBACdASoYABAAPu1kq04ppaQiMAgBMB2JQBOmUASyiUgvF3W7i2DbkC5SVkKAAP76qn+Vi4EqmFvEFrXVMDkElP77J14oBCa3FxHyNj41wf0hjd1B1faLqb1aR7FYBYh/JB1pj6tjccbTas+3EcJUE3uQ+4XffPNDJJbRsSi+YrnkS92A2TrLA/qJAAAA",
        layout: "wide",
        position: 11,
        altKey: "r11",
        captionKey: "r11",
      },
      {
        id: "retrato-editorial-12",
        type: "image",
        src: "/media/projects/retrato-editorial/retrato-editorial-12.webp",
        width: 2800,
        height: 1947,
        blurDataURL: "data:image/webp;base64,UklGRqoAAABXRUJQVlA4IJ4AAABQBACdASoYABEAPuFcqU2opSQiMAwBEBwJZgC06CFU7IEK5EyX/O7N/QrAAP7x0BynYH7coNrKFKy6RpdKK4L2+j0dzsEJcBpnMuWGrqR3reswlqL5ujqTWWTqmgPe48Gi07atd+0pT4UK32SNovIa8AeufKSPe2QH2lKZ5ElJQJDOgnhLUs0CmvDdfr8heA35xYmMa+WaG105q5QAAA==",
        layout: "half",
        position: 12,
        altKey: "r12",
        captionKey: "r12",
      },
      {
        id: "retrato-editorial-13",
        type: "image",
        src: "/media/projects/retrato-editorial/retrato-editorial-13.webp",
        width: 2800,
        height: 1867,
        aspectRatio: "3:2",
        blurDataURL: "data:image/webp;base64,UklGRrIAAABXRUJQVlA4IKYAAAAwBQCdASoYABAAPu1iqU2ppaOiMAgBMB2JaAC7H8D2LSI7F+OaXkqDxZuQ+hXahz/KAAD+78p+uF1k47rMPkkuaJrfdrWQakzJBVB2m2CaVUWa9XUB7v+Bd23xR30Rp9ZWDm5QRNKnku/ufe4RIiwRerwMy4NLrY6NmfwJuNMqfWAxAS0CuAF1MSENZ5qV1VCtcuD3GCHvQFCXKipZnf4GcegANAAA",
        layout: "half",
        position: 13,
        altKey: "r13",
        captionKey: "r13",
      },
      {
        id: "retrato-editorial-14",
        type: "image",
        src: "/media/projects/retrato-editorial/retrato-editorial-14.webp",
        width: 1867,
        height: 2800,
        aspectRatio: "2:3",
        blurDataURL: "data:image/webp;base64,UklGRp4AAABXRUJQVlA4IJIAAABwBACdASoQABgAPu1iqU2ppaOiMAgBMB2JQBOgMYObzUGNQ4kDC0DyzgGMAAD+1w9IvBnWgOlUlNVwtMJ6U3D4BFec2uCAPMbjYOSjk9zJ/Uh8KwdH0YrlvsynW8ZCAFxDrSZtwIQK4ahfGxNOawA2TMJDOKyX7gPbM8shNU9vdfTa1DonVYvNSymJsRq4dwAAAA==",
        layout: "portrait",
        position: 14,
        altKey: "r14",
        captionKey: "r14",
        focalPoint: { x: 50, y: 20 },
      },
    ],
  },
  {
    id: "musica-en-directo",
    slug: "musica-en-directo",
    year: "Pendiente",
    discipline: ["photography"],
    order: 11,
    published: false,
    translationKey: "musica-en-directo",
    rights: {
      verified: false,
      note: "Año, derechos y créditos pendientes de confirmación editorial antes de publicar.",
    },
    cover: {
      id: "musica-en-directo-01",
      type: "image",
      src: "/media/projects/musica-en-directo/musica-en-directo-01.webp",
      width: 1867,
      height: 2800,
      aspectRatio: "2:3",
      blurDataURL: "data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAABwBACdASoQABgAPu1kqU2ppaQiMAgBMB2JaQAD4tIN/H4MUh6HQq+rfAhYAAD+9Bp5a7YVqimwcvUhkrGqL0MOgDQfEfl6hPlh0EhP0dq2h/pjcp1rjn6U6AS7YIFomZBhbasL8yOJOhe9WpGP2/0oX7zYmzy0z8ImaRFm/UXIdvmIjfqHjSxPGgAAAA==",
      layout: "full",
      position: 1,
      altKey: "m01",
      captionKey: "m01",
      focalPoint: { x: 50, y: 65 },
    },
    media: [
      {
        id: "musica-en-directo-02",
        type: "image",
        src: "/media/projects/musica-en-directo/musica-en-directo-02.webp",
        width: 1867,
        height: 2800,
        aspectRatio: "2:3",
        blurDataURL: "data:image/webp;base64,UklGRqgAAABXRUJQVlA4IJwAAAAQBACdASoQABgAPu1kqU2ppaQiMAgBMB2JbACdMoACWwNOk6ZWivh1UAD+zu4qt+P0QHuGGpgxDBUjGoxtbq+tNSlcSljFuuNGUwMip902n5qTtHQlkbOAHLuHqjW7pRv30j/QQPdq9YiTWgq39z2S4xcNqY1OTA/Eo375yJxJ0C7CXU/V88WkYcema0+Z72On1a5Aw9I0p6JsOAA=",
        layout: "portrait",
        position: 2,
        altKey: "m02",
        captionKey: "m02",
        focalPoint: { x: 50, y: 40 },
      },
      {
        id: "musica-en-directo-03",
        type: "image",
        src: "/media/projects/musica-en-directo/musica-en-directo-03.webp",
        width: 2800,
        height: 1867,
        aspectRatio: "3:2",
        blurDataURL: "data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAABQBACdASoYABAAPu1kqk4ppaQiMAgBMB2JZwAFEB7hDAGqq9yD/9aepAp4AP7ccKlD2bPyqz31gzTIXtSopf/OU10bRzn8tZi0xcPrvqWyZcqXmLJh++QUQVy/VoQZ9vL3uOHdbYmDiaOUrwF2li5pdm6/hNrg6RgjqoinYdOzItET+LBvYzv6zOiwAA==",
        layout: "wide",
        position: 3,
        altKey: "m03",
        captionKey: "m03",
      },
      {
        id: "musica-en-directo-04",
        type: "image",
        src: "/media/projects/musica-en-directo/musica-en-directo-04.webp",
        width: 2800,
        height: 1867,
        aspectRatio: "3:2",
        blurDataURL: "data:image/webp;base64,UklGRrwAAABXRUJQVlA4ILAAAACwBACdASoYABAAPu1iqU2ppaOiMAgBMB2JbACdL1AVeGyV0CNfVbFPEixqUbpAAP4z9u1UuzaBaUS4CL0CPOTxvA/EPKytvhBAQBKcowzt1ZkmJgd1aIvHKHuYrNsqK5vyddiNuuDsTLVwn4jnInBefo7tJhGUH1f1/x1nf+3EA6zEVZf5YDdSdcMU2QdtfmZnaAiqUn0uZYbf+EvCj4+rhND8Om1a+9qhbmrDVGawAA==",
        layout: "wide",
        position: 4,
        altKey: "m04",
        captionKey: "m04",
      },
      {
        id: "musica-en-directo-05",
        type: "image",
        src: "/media/projects/musica-en-directo/musica-en-directo-05.webp",
        width: 2800,
        height: 1867,
        aspectRatio: "3:2",
        blurDataURL: "data:image/webp;base64,UklGRrQAAABXRUJQVlA4IKgAAADwBACdASoYABAAPu1iqU2ppaOiMAgBMB2JbACdMoR3JoADst5xpNUy+OJ6vfk7SUAA/o+im3wiHLh3MEGfu/yV05iDnWLVSjoO7sgyjbgkUTpymIXneN8oVv7RReTl6xlu2KO79p5+q6DxOjFUyZY5ZihNyBv9ufbaW3HNZuHuZ96j4/T/DJkjyU5JGjyAlGYHAvROEcTn+IcD4OCfEKSLZipKFTVEAAA=",
        layout: "wide",
        position: 5,
        altKey: "m05",
        captionKey: "m05",
      },
      {
        id: "musica-en-directo-06",
        type: "image",
        src: "/media/projects/musica-en-directo/musica-en-directo-06.webp",
        width: 2800,
        height: 1980,
        blurDataURL: "data:image/webp;base64,UklGRsQAAABXRUJQVlA4ILgAAADQBACdASoYABEAPu1ur1IppiQiqAgBMB2JYwC7AA7lx0u/PTPbk3IUz+2kc8dGAAD+7MiXuYrQKzgocNSM5y54D+QsuJcF83lMdVXCGCCaP5SVzP20ttiLYKoOoHTDgNvDZdvCGv4QIFgNkNSbtOC3xsiH40IGT/4u9anqgutkICO5OH7uIWOi/HNUISBi3O7mnc3/eDczU9OQU+N1BaYVKH+AyigGJNDzoqHTE6qbRLhMmQ4aAAAA",
        layout: "full",
        position: 6,
        altKey: "m06",
        captionKey: "m06",
      },
    ],
  },
  {
    id: "calle-documental",
    slug: "calle-documental",
    year: "Pendiente",
    discipline: ["photography"],
    order: 12,
    published: false,
    translationKey: "calle-documental",
    rights: {
      verified: false,
      note: "Año, derechos y créditos pendientes de confirmación editorial antes de publicar.",
    },
    cover: {
      id: "calle-documental-01",
      type: "image",
      src: "/media/projects/calle-documental/calle-documental-01.webp",
      width: 2800,
      height: 1867,
      aspectRatio: "3:2",
      blurDataURL: "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAABQBACdASoYABAAPu1iqk2ppaQiMAgBMB2JQBOmUABp11DgCT/r0AIOQgAAAP7ynxhQNbFnfXnLj9FQb2T4nye2kHNI2gt0k7xwXojeA/PV8v7lVFc9XOrt3dqLQRTwAAA=",
      layout: "full",
      position: 1,
      altKey: "c01",
      captionKey: "c01",
      focalPoint: { x: 60, y: 50 },
    },
    media: [
      {
        id: "calle-documental-02",
        type: "image",
        src: "/media/projects/calle-documental/calle-documental-02.webp",
        width: 2800,
        height: 1867,
        aspectRatio: "3:2",
        blurDataURL: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAACwAwCdASoYABAAPu1iqU2ppaQiMAgBMB2JQBWABDw+4y+wMODnwAD+8rFLm9s3B/qkPJF6N2m1YROeJBADVNog/e1lkzzht+JppNNhHQGUclzNtOPhLZlThQ7BwAAA",
        layout: "wide",
        position: 2,
        altKey: "c02",
        captionKey: "c02",
      },
      {
        id: "calle-documental-03",
        type: "image",
        src: "/media/projects/calle-documental/calle-documental-03.webp",
        width: 1867,
        height: 2800,
        aspectRatio: "2:3",
        blurDataURL: "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAADwAwCdASoQABgAPu1iqU2ppaQiMAgBMB2JaQAASqMVzNdhxclK337AAP7cTMFQHieMDGverkiDVFnU1jRuDohcgstO2r38SPjw0t7VGIKHK4UtVJG+H6wkOfG/HQEx2m0zn7jaQGOP/UpOn17a7hMh1BcAMCQQAAA=",
        layout: "portrait",
        position: 3,
        altKey: "c03",
        captionKey: "c03",
      },
      {
        id: "calle-documental-04",
        type: "image",
        src: "/media/projects/calle-documental/calle-documental-04.webp",
        width: 2800,
        height: 1867,
        aspectRatio: "3:2",
        blurDataURL: "data:image/webp;base64,UklGRrwAAABXRUJQVlA4ILAAAAAwBACdASoYABAAPu1iqU2ppaOiMAgBMB2JYwCdAYw6o6qOck/y25F4+AAA/o2O1D3h96Rt+11Lw8epZF+eKi0wi2Bj8/sh9spusg+Dy2Po23HGwPXUnRHAGtuYEKTw2Dgke1/UcBrNMnQDNzbuttL4FM2PZH8whe+N/E8rdzo5b73lYia0uwWPkE4pZmZ+gfht+70CFmbHvmEaNXPTiWnCbTl+bspYct6qKG1vIkAAAA==",
        layout: "wide",
        position: 4,
        altKey: "c04",
        captionKey: "c04",
      },
    ],
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
