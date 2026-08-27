/**
 * Media ingest profiles and shared constants.
 * Numbers live here — not scattered across CLIs.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const REPO_ROOT = path.resolve(__dirname, "../..");
export const PUBLIC_MEDIA_ROOT = path.join(REPO_ROOT, "public", "media");
export const PROJECTS_MEDIA_ROOT = path.join(PUBLIC_MEDIA_ROOT, "projects");
export const PROFILE_MEDIA_ROOT = path.join(PUBLIC_MEDIA_ROOT, "profile");

/** Input extensions we accept (lowercase, with dot). */
export const SUPPORTED_INPUT_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".heif",
]);

/**
 * This Sharp build exposes HEIF for AVIF only (fileSuffix: .avif).
 * Apple HEIC is not supported — convert to JPG/PNG first.
 */
export const HEIC_SUPPORTED = false;

export const PROFILES = {
  photo: {
    id: "photo",
    label: "PHOTO",
    maxEdge: 2800,
    quality: 90,
    lowResEdge: 1400,
    outputWarnBytes: 1.5 * 1024 * 1024,
    webp: {
      quality: 90,
      smartSubsample: true,
      effort: 4,
    },
    preferPngWhenBetter: false,
  },
  portrait: {
    id: "portrait",
    label: "PORTRAIT",
    maxEdge: 2000,
    quality: 90,
    lowResEdge: 1200,
    outputWarnBytes: 1.2 * 1024 * 1024,
    webp: {
      quality: 90,
      smartSubsample: true,
      effort: 4,
    },
    preferPngWhenBetter: false,
  },
  poster: {
    id: "poster",
    label: "POSTER",
    maxEdge: 1920,
    quality: 86,
    lowResEdge: 1200,
    outputWarnBytes: 1 * 1024 * 1024,
    webp: {
      quality: 86,
      smartSubsample: true,
      effort: 4,
    },
    preferPngWhenBetter: false,
  },
  graphic: {
    id: "graphic",
    label: "GRAPHIC",
    maxEdge: 2400,
    quality: 92,
    lowResEdge: 1000,
    outputWarnBytes: 1.5 * 1024 * 1024,
    webp: {
      quality: 92,
      smartSubsample: false,
      effort: 6,
      nearLossless: true,
    },
    preferPngWhenBetter: true,
  },
};

export const QUALITY_MIN = 70;
export const QUALITY_MAX = 95;
export const MAX_EDGE_MIN = 320;
export const MAX_EDGE_MAX = 6000;

export const VERY_LARGE_EDGE = 8000;
export const VERY_LARGE_BYTES = 40 * 1024 * 1024;

export const DOCTOR_LARGE_BYTES = 8 * 1024 * 1024;
export const DOCTOR_LARGE_EDGE = 5000;

export const BLUR_MAX_EDGE = 24;

export const ASPECT_PRESETS = [
  { id: "1:1", value: 1 },
  { id: "3:2", value: 3 / 2 },
  { id: "2:3", value: 2 / 3 },
  { id: "4:3", value: 4 / 3 },
  { id: "4:5", value: 4 / 5 },
  { id: "16:9", value: 16 / 9 },
];

export const ASPECT_TOLERANCE = 0.02;

export const TEMP_SUFFIX = ".tmp-media-ingest";
