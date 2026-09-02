/**
 * One-shot: selected web masters + archive thumbs.
 * Never touches originals. Skip existing outputs.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import sharp from "sharp";
import { BLUR_MAX_EDGE, PROJECTS_MEDIA_ROOT, REPO_ROOT } from "./config.mjs";

const ORIGINALS = path.join(REPO_ROOT, "incoming-media/originals");

const SELECTED = {
  "musica-en-directo": [
    "IMG_6313.jpeg",
    "IMG_6385.jpeg",
    "IMG_4768.jpeg",
    "IMG_4937.jpeg",
    "IMG_4959.jpeg",
    "IMG_4965.jpeg",
    "IMG_4974.jpeg",
    "IMG_6294.jpeg",
    "IMG_6299.jpeg",
    "IMG_4989.jpeg",
    "IMG_6377.jpeg",
    "IMG_4662.jpeg",
    "IMG_4776.jpeg",
    "IMG_5179.jpeg",
  ],
  "estudio-editorial": [
    "6CF759E9-54B6-4C69-B082-B80F6E4FAD92.jpeg",
    "DSC_1345.jpeg",
    "DSC_1046.jpeg",
    "DSC_1233.jpeg",
    "DSC_1247.jpeg",
    "DSC_1276.jpeg",
    "DSC_1251.jpeg",
    "DSC_1321.jpeg",
    "DSC_1378.jpeg",
    "DSC_1386.jpeg",
  ],
  "retrato-editorial": [
    "IMG_6676.jpeg",
    "IMG_6636.jpeg",
    "IMG_6643.jpeg",
    "IMG_6667.jpeg",
    "IMG_6668.jpeg",
    "IMG_5541.jpeg",
    "IMG_5551.jpeg",
    "IMG_5800.jpeg",
    "IMG_5805.jpeg",
    "IMG_5319.jpeg",
    "IMG_5323.jpeg",
    "IMG_5436.jpeg",
    "IMG_5490.jpeg",
    "IMG_2403.jpeg",
  ],
  "calle-documental": [
    "IMG_3352.jpeg",
    "IMG_3363.jpeg",
    "IMG_3371.jpeg",
    "IMG_4741.jpeg",
    "IMG_4756.jpeg",
    "IMG_4458.jpeg",
    "IMG_4705.jpeg",
    "IMG_4725.jpeg",
  ],
};

const ARCHIVE = {
  musica: [
    ...SELECTED["musica-en-directo"],
    "IMG_6154.jpeg",
    "IMG_6317.jpeg",
    "IMG_4929.jpeg",
    "IMG_4954.jpeg",
    "IMG_5004.jpeg",
    "IMG_5038.jpeg",
    "IMG_5174.jpeg",
    "IMG_4596.jpeg",
  ],
  retrato: [
    ...SELECTED["retrato-editorial"],
    "IMG_5522.jpeg",
    "IMG_5597.jpeg",
    "IMG_5795.jpeg",
    "IMG_5808.jpeg",
    "IMG_5851.jpeg",
    "IMG_5860.jpeg",
    "IMG_6648.jpeg",
    "IMG_5328.jpeg",
    "IMG_5400.jpeg",
    "IMG_5425.jpeg",
    "IMG_5450.jpeg",
    "IMG_5454.jpeg",
    "IMG_5476.jpeg",
    "IMG_5487.jpeg",
    "IMG_2364.jpeg",
  ],
  estudio: [
    ...SELECTED["estudio-editorial"],
    "80c82615-228f-40a7-99de-ac4c0d672e38.jpeg",
    "DSC_1255.jpeg",
    "DSC_1293.jpeg",
  ],
  calle: [
    ...SELECTED["calle-documental"],
    "IMG_4744.jpeg",
    "IMG_4748.jpeg",
  ],
};

const REUSE = {
  "IMG_6313.jpeg": "musica-en-directo/musica-en-directo-01.webp",
  "IMG_6385.jpeg": "musica-en-directo/musica-en-directo-02.webp",
  "IMG_4768.jpeg": "musica-en-directo/musica-en-directo-03.webp",
  "IMG_4937.jpeg": "musica-en-directo/musica-en-directo-04.webp",
  "IMG_4959.jpeg": "musica-en-directo/musica-en-directo-05.webp",
  "IMG_5179.jpeg": "musica-en-directo/musica-en-directo-06.webp",
  "IMG_6676.jpeg": "retrato-editorial/retrato-editorial-01.webp",
  "IMG_5541.jpeg": "retrato-editorial/retrato-editorial-02.webp",
  "IMG_5490.jpeg": "retrato-editorial/retrato-editorial-03.webp",
  "IMG_5800.jpeg": "retrato-editorial/retrato-editorial-04.webp",
  "IMG_5805.jpeg": "retrato-editorial/retrato-editorial-05.webp",
  "IMG_6643.jpeg": "retrato-editorial/retrato-editorial-06.webp",
  "IMG_5551.jpeg": "retrato-editorial/retrato-editorial-07.webp",
  "IMG_5323.jpeg": "retrato-editorial/retrato-editorial-08.webp",
  "IMG_5436.jpeg": "retrato-editorial/retrato-editorial-09.webp",
  "IMG_2403.jpeg": "retrato-editorial/retrato-editorial-10.webp",
  "DSC_1046.jpeg": "retrato-editorial/retrato-editorial-11.webp",
  "6CF759E9-54B6-4C69-B082-B80F6E4FAD92.jpeg":
    "retrato-editorial/retrato-editorial-12.webp",
  "DSC_1345.jpeg": "retrato-editorial/retrato-editorial-13.webp",
  "DSC_1276.jpeg": "retrato-editorial/retrato-editorial-14.webp",
  "IMG_3352.jpeg": "calle-documental/calle-documental-01.webp",
  "IMG_3371.jpeg": "calle-documental/calle-documental-02.webp",
  "IMG_4458.jpeg": "calle-documental/calle-documental-03.webp",
  "IMG_4725.jpeg": "calle-documental/calle-documental-04.webp",
};

async function findOriginal(name) {
  const hits = [];
  async function walk(dir) {
    for (const ent of await fs.readdir(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) await walk(p);
      else if (ent.name === name) hits.push(p);
    }
  }
  await walk(ORIGINALS);
  if (hits.length !== 1) throw new Error(`original ${name}: ${hits.length} hits`);
  return hits[0];
}

async function blurOf(file) {
  const buf = await sharp(file)
    .rotate()
    .resize({ width: BLUR_MAX_EDGE, height: BLUR_MAX_EDGE, fit: "inside" })
    .webp({ quality: 20 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

async function metaOf(file) {
  const { info } = await sharp(file, { failOn: "error" })
    .rotate()
    .toBuffer({ resolveWithObject: true });
  const width = info.width;
  const height = info.height;
  const ratio = width / height;
  const aspect =
    Math.abs(ratio - 3 / 2) < 0.02
      ? "3:2"
      : Math.abs(ratio - 2 / 3) < 0.02
        ? "2:3"
        : undefined;
  return { width, height, aspectRatio: aspect, blurDataURL: await blurOf(file) };
}

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("node", [path.join(REPO_ROOT, "scripts/media/cli.mjs"), ...args], {
      stdio: "inherit",
    });
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(args.join(" "))),
    );
  });
}

async function snapshotReuse() {
  const buffers = new Map();
  for (const [original, rel] of Object.entries(REUSE)) {
    try {
      buffers.set(original, await fs.readFile(path.join(PROJECTS_MEDIA_ROOT, rel)));
    } catch {
      /* convert later */
    }
  }
  return buffers;
}

async function ensureSelected() {
  const reuseBuf = await snapshotReuse();
  const blocks = {};
  for (const [project, files] of Object.entries(SELECTED)) {
    blocks[project] = [];
    await fs.mkdir(path.join(PROJECTS_MEDIA_ROOT, project), { recursive: true });
    for (let i = 0; i < files.length; i++) {
      const original = files[i];
      const name = `${project}-${String(i + 1).padStart(2, "0")}`;
      const dest = path.join(PROJECTS_MEDIA_ROOT, project, `${name}.webp`);
      const buf = reuseBuf.get(original);
      if (buf) {
        await fs.writeFile(dest, buf);
      } else {
        await fs.rm(dest, { force: true });
        const input = await findOriginal(original);
        await run([
          "image",
          "--input",
          input,
          "--project",
          project,
          "--name",
          name,
          "--profile",
          "photo",
        ]);
      }
      const m = await metaOf(dest);
      blocks[project].push({
        id: name,
        original,
        src: `/media/projects/${project}/${name}.webp`,
        ...m,
      });
    }
  }
  return blocks;
}

function thumbName(group, file) {
  return `${group}-${file.replace(/\.[^.]+$/, "").toLowerCase()}`.replace(
    /[^a-z0-9-]+/g,
    "-",
  );
}

async function ensureArchive() {
  const groups = {};
  await fs.mkdir(path.join(PROJECTS_MEDIA_ROOT, "photo-archive"), {
    recursive: true,
  });
  for (const [group, files] of Object.entries(ARCHIVE)) {
    groups[group] = [];
    for (const file of files) {
      const name = thumbName(group, file);
      const dest = path.join(
        PROJECTS_MEDIA_ROOT,
        "photo-archive",
        `${name}.webp`,
      );
      const exists = await fs
        .access(dest)
        .then(() => true)
        .catch(() => false);
      if (!exists) {
        const input = await findOriginal(file);
        await run([
          "image",
          "--input",
          input,
          "--project",
          "photo-archive",
          "--name",
          name,
          "--profile",
          "photo",
          "--max-edge",
          "960",
          "--quality",
          "80",
        ]);
      }
      const m = await metaOf(dest);
      groups[group].push({
        id: name,
        original: file,
        src: `/media/projects/photo-archive/${name}.webp`,
        ...m,
      });
    }
  }
  return groups;
}

const selected = await ensureSelected();
const archive = await ensureArchive();
const out = path.join(REPO_ROOT, "incoming-media/curation-build.json");
await fs.writeFile(out, JSON.stringify({ selected, archive }, null, 2));
const nSel = Object.values(selected).reduce((a, b) => a + b.length, 0);
const nArch = Object.values(archive).reduce((a, b) => a + b.length, 0);
console.log(`selected ${nSel} archive ${nArch} → ${out}`);
