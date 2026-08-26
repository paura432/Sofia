#!/usr/bin/env node
/**
 * Sofía portfolio — local media ingest CLI.
 * Commands: image | folder | inspect | doctor
 *
 * Never modifies or deletes originals.
 * Never edits projects.ts.
 * Never runs during next build / Vercel.
 */

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { parseArgs as nodeParseArgs } from "node:util";
import sharp from "sharp";

import {
  ASPECT_PRESETS,
  ASPECT_TOLERANCE,
  BLUR_MAX_EDGE,
  DOCTOR_LARGE_BYTES,
  DOCTOR_LARGE_EDGE,
  HEIC_SUPPORTED,
  MAX_EDGE_MAX,
  MAX_EDGE_MIN,
  PROFILE_MEDIA_ROOT,
  PROFILES,
  PROJECTS_MEDIA_ROOT,
  PUBLIC_MEDIA_ROOT,
  QUALITY_MAX,
  QUALITY_MIN,
  REPO_ROOT,
  SUPPORTED_INPUT_EXTENSIONS,
  TEMP_SUFFIX,
  VERY_LARGE_BYTES,
  VERY_LARGE_EDGE,
} from "./config.mjs";

// ─── CLI parse ───────────────────────────────────────────────────────────────

function parseCli(argv) {
  const args = argv.slice(2);
  let command = args[0];
  let rest = args.slice(1);
  if (!command || command.startsWith("--")) {
    command = "image";
    rest = args;
  }
  rest = rest.filter((token) => token !== "--");
  const { values, positionals } = nodeParseArgs({
    args: rest,
    options: {
      input: { type: "string" },
      project: { type: "string" },
      name: { type: "string" },
      profile: { type: "string", default: "photo" },
      quality: { type: "string" },
      "max-edge": { type: "string" },
      destination: { type: "string", default: "project" },
      kind: { type: "string" },
      "dry-run": { type: "boolean", default: false },
      overwrite: { type: "boolean", default: false },
      "json-output": { type: "string" },
      help: { type: "boolean", default: false },
      h: { type: "boolean", default: false },
    },
    allowPositionals: true,
    strict: false,
  });
  if (values.kind === "profile") values.destination = "profile";
  return { command, flags: values, positionals };
}

function help(command) {
  const common = `
Options:
  --input <path>         Source file or folder (outside the repo is fine)
  --project <slug>       Project folder under public/media/projects/
  --name <slug>          Output basename (image only), e.g. urjcmun-stage
  --profile <name>       photo | portrait | poster | graphic  (default: photo)
  --destination <dest>   project (default) | profile
  --quality <70-95>      Override profile quality
  --max-edge <px>        Override longest-edge limit
  --dry-run              Plan only; write nothing
  --overwrite            Replace existing output (never touches the original)
  --json-output <path>   Optional JSON export (opt-in; not a source of truth)
  --help

Safety:
  • Originals are never modified or deleted.
  • EXIF/GPS stripped by default. Auto-orientation before resize.
  • No upscale. No destructive crop. Does not edit projects.ts.
  • Guide: docs/media-guide.md
`.trim();

  const map = {
    image: `pnpm media:image --input <path> --project <slug> --name <slug> [--profile photo]`,
    folder: `pnpm media:folder --input <dir> --project <slug> [--profile photo]`,
    inspect: `pnpm media:inspect --input <path>`,
    doctor: `pnpm media:doctor`,
  };
  console.log(`${map[command] || map.image}\n\n${common}`);
}

function fail(reason, inputPath) {
  console.error(`
MEDIA INGEST FAILED

Input:
${inputPath ?? "(none)"}

Reason:
${reason}

Original has not been modified.
No output was created.
`);
  process.exitCode = 1;
  throw new Error(reason);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const digits = value >= 100 ? 0 : value >= 10 ? 1 : 2;
  return `${value.toFixed(digits)} ${units[unit]}`;
}

function formatSaved(inputBytes, outputBytes) {
  if (!inputBytes || inputBytes <= 0) return "n/a";
  return `${(((inputBytes - outputBytes) / inputBytes) * 100).toFixed(1)}%`;
}

function rule(char = "━", width = 30) {
  return char.repeat(width);
}

function toWebSlug(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function extensionOf(filePath) {
  return path.extname(filePath).toLowerCase();
}

function detectAspectRatio(width, height) {
  if (!width || !height) return "custom";
  const ratio = width / height;
  let best = null;
  let bestDelta = Infinity;
  for (const preset of ASPECT_PRESETS) {
    const delta = Math.abs(ratio - preset.value) / preset.value;
    if (delta < bestDelta) {
      bestDelta = delta;
      best = preset.id;
    }
  }
  if (best && bestDelta <= ASPECT_TOLERANCE) return best;
  return "custom";
}

function scaleDim(w, h, maxEdge) {
  const long = Math.max(w, h);
  if (long <= maxEdge) return { w, h };
  const scale = maxEdge / long;
  return { w: Math.round(w * scale), h: Math.round(h * scale) };
}

function getProfile(name) {
  const key = String(name || "photo").toLowerCase();
  const profile = PROFILES[key];
  if (!profile) {
    fail(`Unknown profile "${name}". Use: ${Object.keys(PROFILES).join(", ")}`);
  }
  return profile;
}

function resolveQuality(profile, override) {
  if (override === undefined) return profile.quality;
  const q = Number(override);
  if (!Number.isInteger(q) || q < QUALITY_MIN || q > QUALITY_MAX) {
    fail(`--quality must be an integer between ${QUALITY_MIN} and ${QUALITY_MAX}. Got: ${override}`);
  }
  return q;
}

function resolveMaxEdge(profile, override) {
  if (override === undefined) return profile.maxEdge;
  const n = Number(override);
  if (!Number.isInteger(n) || n < MAX_EDGE_MIN || n > MAX_EDGE_MAX) {
    fail(`--max-edge must be an integer between ${MAX_EDGE_MIN} and ${MAX_EDGE_MAX}. Got: ${override}`);
  }
  return n;
}

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  const fh = await fs.open(filePath, "r");
  try {
    for await (const chunk of fh.createReadStream()) hash.update(chunk);
  } finally {
    await fh.close();
  }
  return hash.digest("hex");
}

async function writeAtomically(destPath, buffer) {
  const dir = path.dirname(destPath);
  await ensureDir(dir);
  const tmp = `${destPath}${TEMP_SUFFIX}-${process.pid}-${Date.now()}`;
  try {
    await fs.writeFile(tmp, buffer);
    try {
      await fs.unlink(destPath);
    } catch {
      /* dest may not exist */
    }
    await fs.rename(tmp, destPath);
  } catch (err) {
    try {
      await fs.unlink(tmp);
    } catch {
      /* ignore */
    }
    throw err;
  }
}

function publicSrcFromAbsolute(absolutePath) {
  const normalized = absolutePath.split(path.sep).join("/");
  const marker = "/public/";
  const idx = normalized.lastIndexOf(marker);
  if (idx === -1) return absolutePath;
  return normalized.slice(idx + "/public".length);
}

function resolveOutputDir({ project, destination }) {
  if (destination === "profile") return PROFILE_MEDIA_ROOT;
  const slug = toWebSlug(project);
  if (!slug) fail("Invalid --project slug.");
  return path.join(PROJECTS_MEDIA_ROOT, slug);
}

function batchOutputName(projectSlug, index1Based) {
  return `${toWebSlug(projectSlug)}-${String(index1Based).padStart(3, "0")}`;
}

async function assertDecodable(inputPath) {
  const ext = extensionOf(inputPath);
  if (!SUPPORTED_INPUT_EXTENSIONS.has(ext)) {
    fail(`Unsupported format: ${ext || "(none)"}. Use JPG, JPEG, PNG, or WebP.`, inputPath);
  }
  if ((ext === ".heic" || ext === ".heif") && !HEIC_SUPPORTED) {
    fail("HEIC/HEIF is not supported by this Sharp installation. Convert to JPG/PNG first.", inputPath);
  }
  try {
    await sharp(inputPath, { failOn: "error" }).metadata();
  } catch (err) {
    if (ext === ".heic" || ext === ".heif") {
      fail("HEIC/HEIF could not be decoded by this Sharp build. Convert to JPG/PNG first.", inputPath);
    }
    fail(`Image could not be decoded. ${err?.message || ""}`.trim(), inputPath);
  }
}

async function generateBlurDataURL(masterBuffer) {
  const { data } = await sharp(masterBuffer, { failOn: "error" })
    .resize({
      width: BLUR_MAX_EDGE,
      height: BLUR_MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 40, smartSubsample: true })
    .toBuffer({ resolveWithObject: true });

  let buf = data;
  let mime = "image/webp";
  if (buf.byteLength > 2048) {
    buf = await sharp(masterBuffer, { failOn: "error" })
      .resize({ width: 16, height: 16, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 40 })
      .toBuffer();
    mime = "image/jpeg";
  }
  return `data:${mime};base64,${buf.toString("base64")}`;
}

function formatPortfolioBlock(block) {
  const lines = ["{"];
  lines.push(`  id: ${JSON.stringify(block.id)},`);
  lines.push(`  type: ${JSON.stringify(block.type)},`);
  lines.push(`  src: ${JSON.stringify(block.src)},`);
  lines.push(`  width: ${block.width},`);
  lines.push(`  height: ${block.height},`);
  if (block.aspectRatio) lines.push(`  aspectRatio: ${JSON.stringify(block.aspectRatio)},`);
  lines.push(`  blurDataURL: ${JSON.stringify(block.blurDataURL)},`);
  lines.push("}");
  return lines.join("\n");
}

async function listImageFiles(dirPath) {
  const abs = path.resolve(dirPath);
  const entries = await fs.readdir(abs, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!SUPPORTED_INPUT_EXTENSIONS.has(extensionOf(entry.name))) continue;
    files.push(path.join(abs, entry.name));
  }
  files.sort((a, b) =>
    path.basename(a).localeCompare(path.basename(b), "en", {
      numeric: true,
      sensitivity: "base",
    }),
  );
  return files;
}

async function writeJsonOutput(filePath, data) {
  const abs = path.resolve(filePath);
  await ensureDir(path.dirname(abs));
  await fs.writeFile(abs, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return abs;
}

// ─── Inspect ─────────────────────────────────────────────────────────────────

async function inspectImage(inputPath) {
  const abs = path.resolve(inputPath);
  if (!(await pathExists(abs))) fail("Input file not found.", abs);
  const st = await fs.stat(abs);
  if (!st.isFile()) fail("Input is not a file.", abs);
  await assertDecodable(abs);

  const meta = await sharp(abs, { failOn: "error" }).metadata();
  const oriented = await sharp(abs, { failOn: "error" })
    .rotate()
    .toBuffer({ resolveWithObject: true });
  const ow = oriented.info.width;
  const oh = oriented.info.height;

  return {
    filename: path.basename(abs),
    format: (meta.format || extensionOf(abs).slice(1) || "unknown").toUpperCase(),
    width: meta.width,
    height: meta.height,
    orientedWidth: ow,
    orientedHeight: oh,
    megapixels: ow && oh ? Number(((ow * oh) / 1e6).toFixed(2)) : null,
    space: meta.space || "unknown",
    hasAlpha: Boolean(meta.hasAlpha),
    hasExifOrientation: meta.orientation !== undefined && meta.orientation !== 1,
    metadataDetected: Boolean(meta.exif || meta.icc || meta.xmp || meta.iptc || meta.tifftagPhotoshop),
    fileSize: st.size,
    aspectRatio: detectAspectRatio(ow, oh),
  };
}

// ─── Convert ─────────────────────────────────────────────────────────────────

async function convertImage(options) {
  const {
    input,
    project,
    name,
    profile: profileName = "photo",
    quality: qualityOverride,
    maxEdge: maxEdgeOverride,
    dryRun = false,
    overwrite = false,
    destination = "project",
  } = options;

  const warnings = [];
  const absInput = path.resolve(input);
  if (!(await pathExists(absInput))) fail("Input file not found.", absInput);
  const inputStat = await fs.stat(absInput);
  if (!inputStat.isFile()) fail("Input is not a file.", absInput);
  await assertDecodable(absInput);

  const profile = getProfile(profileName);
  const quality = resolveQuality(profile, qualityOverride);
  const maxEdge = resolveMaxEdge(profile, maxEdgeOverride);

  if (destination !== "profile" && !project) fail("Missing required flag: --project", absInput);

  const outDir = resolveOutputDir({ project, destination });
  const baseName = toWebSlug(name);
  if (!baseName) fail('Invalid --name. Use a web-safe slug like "urjcmun-stage".', absInput);

  const meta = await sharp(absInput, { failOn: "error" }).metadata();
  if (meta.hasAlpha) warnings.push("ALPHA_IMAGE");
  if (meta.space === "cmyk") warnings.push("CMYK_SOURCE");

  const orientedInfo = (
    await sharp(absInput, { failOn: "error" }).rotate().toBuffer({ resolveWithObject: true })
  ).info;
  const srcW = orientedInfo.width;
  const srcH = orientedInfo.height;
  const longEdge = Math.max(srcW, srcH);

  if (longEdge < profile.lowResEdge) warnings.push("LOW_RESOLUTION");
  if (longEdge >= VERY_LARGE_EDGE || inputStat.size >= VERY_LARGE_BYTES) {
    warnings.push("VERY_LARGE_SOURCE");
  }
  const lowResKept = longEdge < maxEdge;
  if (lowResKept) warnings.push("LOW_RESOLUTION_SOURCE");

  let outExt = ".webp";
  let outFormat = "webp";
  const plannedPath = path.join(outDir, `${baseName}${outExt}`);
  const expected = scaleDim(srcW, srcH, maxEdge);

  if ((await pathExists(plannedPath)) && !overwrite) {
    fail(
      `OUTPUT EXISTS: ${path.basename(plannedPath)}\nUse another --name or pass --overwrite.`,
      absInput,
    );
  }
  if (await pathExists(plannedPath)) warnings.push("DUPLICATE_OUTPUT");

  if (dryRun) {
    return {
      ok: true,
      dryRun: true,
      warnings: [...new Set(warnings)],
      plan: {
        input: absInput,
        inputName: path.basename(absInput),
        inputWidth: srcW,
        inputHeight: srcH,
        inputBytes: inputStat.size,
        inputFormat: (meta.format || "").toUpperCase(),
        colourspace: meta.space || "unknown",
        profile: profile.label,
        quality,
        maxEdge,
        outputPath: plannedPath,
        outputName: path.basename(plannedPath),
        publicSrc: publicSrcFromAbsolute(plannedPath),
        expectedWidth: expected.w,
        expectedHeight: expected.h,
      },
    };
  }

  // rotate → sRGB → resize (no enlarge, no crop) → encode. No withMetadata().
  const pipeline = sharp(absInput, { failOn: "error" })
    .rotate()
    .toColourspace("srgb")
    .resize({
      width: maxEdge,
      height: maxEdge,
      fit: "inside",
      withoutEnlargement: true,
    });

  const webpOpts = { ...profile.webp, quality };
  let outputBuffer;
  let outputInfo;

  if (profile.preferPngWhenBetter) {
    const [webpBuf, pngBuf] = await Promise.all([
      pipeline.clone().webp(webpOpts).toBuffer({ resolveWithObject: true }),
      pipeline.clone().png({ compressionLevel: 9, palette: false }).toBuffer({ resolveWithObject: true }),
    ]);
    if (pngBuf.data.byteLength + 1024 < webpBuf.data.byteLength) {
      outputBuffer = pngBuf.data;
      outputInfo = pngBuf.info;
      outExt = ".png";
      outFormat = "png";
    } else {
      outputBuffer = webpBuf.data;
      outputInfo = webpBuf.info;
    }
  } else {
    const encoded = await pipeline.webp(webpOpts).toBuffer({ resolveWithObject: true });
    outputBuffer = encoded.data;
    outputInfo = encoded.info;
  }

  const finalPath = path.join(outDir, `${baseName}${outExt}`);
  if (finalPath !== plannedPath && (await pathExists(finalPath)) && !overwrite) {
    fail(
      `OUTPUT EXISTS: ${path.basename(finalPath)}\nUse another --name or pass --overwrite.`,
      absInput,
    );
  }
  if (outputBuffer.byteLength > profile.outputWarnBytes) warnings.push("OUTPUT_LARGE");

  const blurDataURL = await generateBlurDataURL(outputBuffer);
  await writeAtomically(finalPath, outputBuffer);

  const outStat = await fs.stat(finalPath);
  const aspectRatio = detectAspectRatio(outputInfo.width, outputInfo.height);
  const finalSrc = publicSrcFromAbsolute(finalPath);
  const portfolioBlock = {
    id: baseName,
    type: "image",
    src: finalSrc,
    width: outputInfo.width,
    height: outputInfo.height,
    ...(aspectRatio !== "custom" ? { aspectRatio } : {}),
    blurDataURL,
  };

  return {
    ok: true,
    dryRun: false,
    warnings: [...new Set(warnings)],
    result: {
      input: absInput,
      inputName: path.basename(absInput),
      inputWidth: srcW,
      inputHeight: srcH,
      inputBytes: inputStat.size,
      inputFormat: (meta.format || "").toUpperCase(),
      colourspace: "srgb",
      hasAlpha: Boolean(meta.hasAlpha),
      profile: profile.label,
      quality,
      maxEdge,
      outputPath: finalPath,
      outputName: path.basename(finalPath),
      outputWidth: outputInfo.width,
      outputHeight: outputInfo.height,
      outputBytes: outStat.size,
      outputFormat: outFormat.toUpperCase(),
      publicSrc: finalSrc,
      aspectRatio,
      blurDataURL,
      savedPercent: formatSaved(inputStat.size, outStat.size),
      portfolioBlock,
      lowResKept,
    },
  };
}

function printConvertReport(payload) {
  if (payload.dryRun) {
    const p = payload.plan;
    console.log(rule());
    console.log("MEDIA INGEST — DRY RUN");
    console.log(rule());
    console.log("");
    console.log("INPUT");
    console.log(p.inputName);
    console.log(`${p.inputWidth} × ${p.inputHeight}`);
    console.log(formatBytes(p.inputBytes));
    console.log(p.inputFormat);
    console.log(p.colourspace);
    console.log("");
    console.log("PROFILE");
    console.log(p.profile);
    console.log(`quality ${p.quality}`);
    console.log(`max edge ${p.maxEdge}px`);
    console.log("");
    console.log("OUTPUT (planned)");
    console.log(p.outputName);
    console.log(`${p.expectedWidth} × ${p.expectedHeight}`);
    console.log(p.publicSrc);
    console.log("");
    console.log("No files written.");
    console.log(rule());
    if (payload.warnings?.length) {
      console.log("");
      console.log("WARNINGS");
      for (const w of payload.warnings) console.log(`- ${w}`);
    }
    return;
  }

  const r = payload.result;
  console.log(rule());
  console.log("MEDIA INGEST");
  console.log(rule());
  console.log("");
  console.log("INPUT");
  console.log(r.inputName);
  console.log(`${r.inputWidth} × ${r.inputHeight}`);
  console.log(formatBytes(r.inputBytes));
  console.log(r.inputFormat);
  console.log(r.colourspace);
  if (r.hasAlpha) console.log("ALPHA: YES");
  console.log("");
  console.log("PROFILE");
  console.log(r.profile);
  console.log(`quality ${r.quality}`);
  console.log(`max edge ${r.maxEdge}px`);
  console.log("");
  console.log("OUTPUT");
  console.log(r.outputName);
  console.log(`${r.outputWidth} × ${r.outputHeight}`);
  console.log(formatBytes(r.outputBytes));
  console.log(r.outputFormat);
  console.log("");
  console.log("SAVED");
  console.log(r.savedPercent);
  if (r.lowResKept) {
    console.log("");
    console.log("LOW RESOLUTION SOURCE");
    console.log("Output kept source dimensions (no upscale).");
  }
  console.log("");
  console.log("METADATA");
  console.log("EXIF stripped");
  console.log("orientation applied");
  console.log("sRGB");
  console.log(r.aspectRatio);
  console.log("");
  console.log("READY");
  console.log(r.outputPath);
  console.log("");
  console.log("COPY");
  console.log(formatPortfolioBlock(r.portfolioBlock));
  console.log("");
  console.log("TODO:");
  console.log("- alt ES");
  console.log("- alt EN");
  console.log("- caption");
  console.log("- credit");
  console.log("- focalPoint");
  console.log("- rights");
  console.log(rule());
  if (payload.warnings?.length) {
    console.log("");
    console.log("WARNINGS");
    for (const w of payload.warnings) console.log(`- ${w}`);
  }
}

// ─── Commands ────────────────────────────────────────────────────────────────

async function cmdImage(flags) {
  if (!flags.input) fail("Missing required flag: --input");
  const destination = flags.destination === "profile" ? "profile" : "project";
  if (!flags.name) fail("Missing required flag: --name", flags.input);
  if (destination !== "profile" && !flags.project) {
    fail("Missing required flag: --project", flags.input);
  }

  const payload = await convertImage({
    input: flags.input,
    project: flags.project,
    name: flags.name,
    profile: flags.profile || "photo",
    quality: flags.quality,
    maxEdge: flags["max-edge"],
    dryRun: flags["dry-run"],
    overwrite: flags.overwrite,
    destination,
  });
  printConvertReport(payload);

  if (flags["json-output"] && !payload.dryRun) {
    const out = await writeJsonOutput(flags["json-output"], {
      ...payload.result.portfolioBlock,
      warnings: payload.warnings,
      input: payload.result.input,
      outputPath: payload.result.outputPath,
      outputBytes: payload.result.outputBytes,
    });
    console.log("");
    console.log(`JSON written: ${out}`);
  }
}

async function cmdFolder(flags) {
  if (!flags.input) fail("Missing required flag: --input");
  if (!flags.project) fail("Missing required flag: --project", flags.input);

  const projectSlug = toWebSlug(flags.project);
  const dryRun = Boolean(flags["dry-run"]);
  const overwrite = Boolean(flags.overwrite);
  const absDir = path.resolve(flags.input);

  if (!(await pathExists(absDir))) fail(`Input folder not found: ${absDir}`, absDir);

  const files = await listImageFiles(absDir);
  if (files.length === 0) fail(`No supported images found in ${absDir}`, absDir);

  console.log(rule());
  console.log(dryRun ? "MEDIA INGEST BATCH — DRY RUN" : "MEDIA INGEST BATCH");
  console.log(rule());
  console.log("");
  console.log("INPUT FOLDER");
  console.log(absDir);
  console.log(`${files.length} image(s)`);
  console.log("");
  console.log("PROJECT");
  console.log(projectSlug);
  console.log("");
  console.log("PROFILE");
  console.log(flags.profile || "photo");
  console.log("");
  console.log("PLAN");
  files.forEach((f, i) => {
    const name = batchOutputName(projectSlug, i + 1);
    console.log(`${String(i + 1).padStart(3, " ")}. ${path.basename(f)} → ${name}.webp`);
  });
  console.log("");

  const seenHashes = new Map();
  const results = [];
  let converted = 0;
  let warningCount = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const name = batchOutputName(projectSlug, i + 1);
    console.log(rule("─"));
    console.log(`[${i + 1}/${files.length}] ${path.basename(file)}`);

    try {
      const hash = await sha256File(file);
      if (seenHashes.has(hash)) {
        console.log("WARNING: DUPLICATE SOURCE CONTENT");
        console.log(`Same bytes as ${seenHashes.get(hash)}`);
        console.log("Skipped (no second conversion).");
        warningCount += 1;
        skipped += 1;
        results.push({
          status: "skipped",
          reason: "DUPLICATE_SOURCE_CONTENT",
          input: file,
          duplicateOf: seenHashes.get(hash),
        });
        continue;
      }
      seenHashes.set(hash, path.basename(file));

      const payload = await convertImage({
        input: file,
        project: projectSlug,
        name,
        profile: flags.profile || "photo",
        quality: flags.quality,
        maxEdge: flags["max-edge"],
        dryRun,
        overwrite,
        destination: "project",
      });
      printConvertReport(payload);
      if (payload.warnings?.length) warningCount += payload.warnings.length;
      converted += 1;
      results.push({
        status: dryRun ? "planned" : "converted",
        warnings: payload.warnings,
        ...(payload.dryRun
          ? { plan: payload.plan }
          : {
              portfolioBlock: payload.result.portfolioBlock,
              outputPath: payload.result.outputPath,
              outputBytes: payload.result.outputBytes,
            }),
      });
    } catch (err) {
      failed += 1;
      if (!String(err?.message || "").includes("OUTPUT EXISTS") && process.exitCode !== 1) {
        console.error("FAILED");
        console.error(err?.message || String(err));
        console.error("Original has not been modified.");
      }
      results.push({ status: "failed", input: file, error: err?.message || String(err) });
      process.exitCode = 1;
    }
  }

  console.log("");
  console.log(rule());
  console.log("SUMMARY");
  console.log(rule());
  console.log("");
  console.log(`${files.length} INPUTS`);
  console.log("");
  console.log(`${converted} ${dryRun ? "planned" : "converted"}`);
  console.log(`${warningCount} warning(s)`);
  console.log(`${skipped} skipped (duplicates)`);
  console.log(`${failed} failed`);
  console.log("");

  if (flags["json-output"]) {
    const out = await writeJsonOutput(flags["json-output"], {
      project: projectSlug,
      input: absDir,
      dryRun,
      summary: { converted, warningCount, skipped, failed, total: files.length },
      results,
    });
    console.log(`JSON written: ${out}`);
    console.log("");
  }

  if (failed > 0) process.exitCode = 1;
}

async function cmdInspect(flags) {
  if (!flags.input) fail("Missing required flag: --input");
  const info = await inspectImage(flags.input);
  console.log(rule());
  console.log("MEDIA INSPECT");
  console.log(rule());
  console.log("");
  console.log("FILE");
  console.log(info.filename);
  console.log(formatBytes(info.fileSize));
  console.log("");
  console.log("FORMAT");
  console.log(info.format);
  console.log("");
  console.log("STORED SIZE");
  console.log(`${info.width} × ${info.height}`);
  console.log("");
  console.log("ORIENTED SIZE");
  console.log(`${info.orientedWidth} × ${info.orientedHeight}`);
  console.log("");
  console.log("MEGAPIXELS");
  console.log(info.megapixels ?? "n/a");
  console.log("");
  console.log("COLOURSPACE");
  console.log(info.space);
  console.log("");
  console.log("ALPHA");
  console.log(info.hasAlpha ? "yes" : "no");
  console.log("");
  console.log("EXIF ORIENTATION");
  console.log(info.hasExifOrientation ? "present" : "none / identity");
  console.log("");
  console.log("METADATA DETECTED");
  console.log(info.metadataDetected ? "yes" : "no");
  console.log("");
  console.log("LIKELY ASPECT RATIO");
  console.log(info.aspectRatio);
  console.log(rule());
}

async function walk(dir) {
  const out = [];
  if (!(await pathExists(dir))) return out;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

async function cmdDoctor() {
  const WEB_EXTS = new Set([".webp", ".png", ".jpg", ".jpeg", ".avif", ".gif"]);
  const ALLOWED_OTHER = new Set([".vtt", ".md", ".txt", ".svg"]);

  console.log(rule());
  console.log("MEDIA DOCTOR");
  console.log(rule());
  console.log("");
  console.log("SCAN");
  console.log(PUBLIC_MEDIA_ROOT);
  console.log("");

  if (!(await pathExists(PUBLIC_MEDIA_ROOT))) {
    console.log("public/media not found. Nothing to report.");
    return;
  }

  const files = await walk(PUBLIC_MEDIA_ROOT);
  const findings = [];
  const hashes = new Map();

  for (const file of files) {
    const base = path.basename(file);
    const ext = extensionOf(file);
    const rel = path.relative(PUBLIC_MEDIA_ROOT, file);
    const st = await fs.stat(file);

    if (base.includes(TEMP_SUFFIX)) {
      findings.push({ code: "TEMP_FILE", file: rel, detail: "Leftover temporary ingest file" });
    }
    if (ALLOWED_OTHER.has(ext)) continue;

    if (!WEB_EXTS.has(ext) && !SUPPORTED_INPUT_EXTENSIONS.has(ext)) {
      findings.push({ code: "UNEXPECTED_FORMAT", file: rel, detail: `Extension ${ext || "(none)"}` });
      continue;
    }

    if ((ext === ".jpg" || ext === ".jpeg") && st.size >= DOCTOR_LARGE_BYTES) {
      findings.push({
        code: "SUSPICIOUS_ORIGINAL",
        file: rel,
        detail: `JPEG ${formatBytes(st.size)} in public/media — likely unprocessed`,
      });
    }
    if (st.size >= DOCTOR_LARGE_BYTES) {
      findings.push({ code: "LARGE_ASSET", file: rel, detail: formatBytes(st.size) });
    }

    try {
      const meta = await sharp(file, { failOn: "none" }).metadata();
      const edge = Math.max(meta.width || 0, meta.height || 0);
      if (edge >= DOCTOR_LARGE_EDGE) {
        findings.push({
          code: "LARGE_DIMENSIONS",
          file: rel,
          detail: `${meta.width} × ${meta.height}`,
        });
      }
    } catch {
      findings.push({ code: "UNREADABLE", file: rel, detail: "Could not decode" });
    }

    try {
      const hash = await sha256File(file);
      if (hashes.has(hash)) {
        findings.push({
          code: "DUPLICATE_FILE",
          file: rel,
          detail: `Exact duplicate of ${hashes.get(hash)}`,
        });
      } else {
        hashes.set(hash, rel);
      }
    } catch {
      /* ignore */
    }
  }

  console.log(`Files scanned: ${files.length}`);
  console.log("");
  if (findings.length === 0) {
    console.log("No issues found.");
    console.log(rule());
    return;
  }
  console.log("FINDINGS");
  for (const f of findings) {
    console.log(`- [${f.code}] ${f.file}`);
    console.log(`  ${f.detail}`);
  }
  console.log("");
  console.log(`${findings.length} finding(s)`);
  console.log(rule());
  console.log("");
  console.log("Read-only. Nothing was modified.");
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const { command, flags } = parseCli(process.argv);

  if (flags.help || flags.h) {
    help(command);
    return;
  }

  try {
    if (command === "image") await cmdImage(flags);
    else if (command === "folder") await cmdFolder(flags);
    else if (command === "inspect") await cmdInspect(flags);
    else if (command === "doctor") await cmdDoctor();
    else {
      console.error(`Unknown command: ${command}`);
      help("image");
      process.exitCode = 1;
    }
  } catch (err) {
    if (process.exitCode !== 1) {
      console.error(`
MEDIA INGEST FAILED

Reason:
${err?.message || String(err)}

Original has not been modified.
No output was created.
`);
      process.exitCode = 1;
    }
  }
}

// Silence unused in tree analysis
void REPO_ROOT;

main();
