import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const out = path.join(root, "tmp/photo-review");
const readJson = async (file) => JSON.parse(await fs.readFile(path.join(root, file), "utf8"));
const esc = (value) => String(value ?? "—").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const projectOrder = ["musica-en-directo", "calle-documental", "estudio-editorial", "retrato-editorial", "entre-tiendas-y-tambores"];
const titles = {
  "musica-en-directo": "Música en directo",
  "calle-documental": "Calle & Documental",
  "estudio-editorial": "Estudio & Editorial",
  "retrato-editorial": "Retrato & Editorial",
  "entre-tiendas-y-tambores": "Entre tiendas y tambores",
};
const proposedKeep = {
  "musica-en-directo": [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14],
  "calle-documental": [1, 2, 3, 4, 5, 6, 8],
  "estudio-editorial": [1, 3, 4, 5, 6, 7, 8, 9, 10],
  "retrato-editorial": [1, 3, 4, 6, 8, 9, 11, 12, 13, 14],
};
const maybeReasons = {
  "musica-en-directo-05": "Mismo artista y momento cercano a 04; mantener solo si aporta un gesto distinto en la secuencia.",
  "musica-en-directo-06": "Repite artista/actuación; el blanco y negro cambia el tratamiento, pero no tanto el momento.",
  "calle-documental-07": "El primer plano desenfocado del molino ocupa mucho encuadre y debilita la lectura del parque.",
  "estudio-editorial-02": "Pose y utilería muy próximas a la portada 01; conservar como variación solo si se desea díptico.",
  "retrato-editorial-02": "Variación de localización/pose de la misma sesión que 01 y 03.",
  "retrato-editorial-05": "Repite sujetos y espacio de 04, con menor separación visual.",
  "retrato-editorial-07": "Variación de la sesión de la retratada de 06; mantener si el cambio vertical añade ritmo.",
  "retrato-editorial-10": "Encuadre de cafetería muy próximo al 11; elegir una sola versión.",
};
const maybeIds = new Set(Object.keys(maybeReasons));
const mediaSource = await fs.readFile(path.join(root, "src/content/photo-assets.ts"), "utf8");
const archiveSource = await fs.readFile(path.join(root, "src/content/photo-archive-data.ts"), "utf8");
const mediaMeta = new Map();
for (const match of mediaSource.matchAll(/^\s{4}\{\s*\n([\s\S]*?)^\s{4}\},?$/gm)) {
  const block = match[1];
  const id = block.match(/^\s*id: "([^"]+)"/m)?.[1];
  if (id) mediaMeta.set(id, block);
}
for (const match of mediaSource.matchAll(/^export const [\w_]+_cover: ProjectMedia =\s*\n\{([\s\S]*?)^\s*\};/gm)) {
  const block = match[1];
  const id = block.match(/^\s*id: "([^"]+)"/m)?.[1];
  if (id) mediaMeta.set(id, block);
}
const value = (block, key) => block?.match(new RegExp(`^\\s*${key}: "([^"]+)"`, "m"))?.[1];
const number = (block, key) => Number(block?.match(new RegExp(`^\\s*${key}: (\\d+)`, "m"))?.[1]) || undefined;
const focal = (block) => {
  const m = block?.match(/focalPoint: \{ x: (\d+), y: (\d+) \}/);
  return m ? `${m[1]}%, ${m[2]}%` : "default 50%, 50%";
};
const aspectLabel = (width, height) => {
  const ratio = width / height;
  for (const [label, value] of [["1:1", 1], ["4:5", 0.8], ["2:3", 2 / 3], ["3:2", 1.5], ["16:9", 16 / 9], ["9:16", 9 / 16]]) {
    if (Math.abs(ratio - value) < 0.025) return label;
  }
  return "custom";
};
const inferredRole = (index, total) => total <= 1 || index === 0 ? "opening" : index === 1 ? "context" : index === total - 1 ? "closing" : index === Math.max(2, Math.floor(total * 0.65)) ? "peak" : "development";

const [selection, inventory, curation, messages, plazaDoc] = await Promise.all([
  readJson("incoming-media/photo-selection.json"),
  readJson("incoming-media/inventory.json"),
  readJson("incoming-media/curation-build.json"),
  readJson("messages/es.json"),
  fs.readFile(path.join(root, "docs/photo-project-entre-tiendas-y-tambores-curation.md"), "utf8"),
]);
if (selection.length !== 74 || inventory.length !== 74) {
  throw new Error(`Expected 74 existing photo sources; selection=${selection.length}, inventory=${inventory.length}`);
}
const sourceMeta = new Map(inventory.map((item) => [item.original, item]));
const archiveByOriginal = new Map(Object.values(curation.archive).flat().map((item) => [item.original, item]));
const selectedByOriginal = new Map(Object.entries(curation.selected).flatMap(([project, items]) => items.map((item) => [item.original, { ...item, project }])));
const collections = new Map(projectOrder.map((id) => [id, []]));

for (const item of selection) {
  const archiveItem = archiveByOriginal.get(item.original);
  const archiveGroup = archiveItem?.id.match(/^(musica|retrato|estudio|calle)-/)?.[1];
  const projectSlugs = { musica: "musica-en-directo", retrato: "retrato-editorial", estudio: "estudio-editorial", calle: "calle-documental" };
  const selectedItem = selectedByOriginal.get(item.original);
  const slug = selectedItem?.project ?? projectSlugs[archiveGroup];
  const isSelected = Boolean(selectedItem);
  const id = selectedItem?.id ?? archiveItem?.id;
  const block = mediaMeta.get(id);
  const relSource = path.relative(root, sourceMeta.get(item.original)?.filePath ?? item.filePath).split(path.sep).join("/");
  const servedRel = isSelected ? selectedItem.src.replace(/^\//, "public/") : archiveItem?.src?.replace(/^\//, "public/");
  const served = path.join(root, servedRel ?? relSource);
  const project = slug;
  const copy = project ? messages.Projects.items[project]?.media?.[id] : undefined;
  const meta = await sharp(served).metadata();
  const actualBytes = (await fs.stat(served)).size;
  const position = number(block, "position");
  const projectTotal = curation.selected[project]?.length ?? 0;
  collections.get(project).push({
    project, file: item.original, id: id ?? item.original, src: servedRel ?? relSource,
    originalDim: `${sourceMeta.get(item.original)?.orientedWidth ?? item.orientedWidth ?? item.width}×${sourceMeta.get(item.original)?.orientedHeight ?? item.orientedHeight ?? item.height}`,
    dim: `${meta.width}×${meta.height}`, orientation: (sourceMeta.get(item.original)?.orientedWidth ?? item.width) > (sourceMeta.get(item.original)?.orientedHeight ?? item.height) ? "landscape" : "portrait",
    ratio: item.aspectRatio, originalBytes: item.bytes, assetBytes: actualBytes,
    selected: isSelected, archiveOnly: !isSelected, cover: Boolean(block?.match(/^\s*position: 1,/m)),
    position, layout: value(block, "layout"),
    narrativeRole: isSelected ? value(block, "narrativeRole") ?? `renderer infers ${inferredRole((position ?? 1) - 1, projectTotal)}` : "not used in essay; archive image",
    focal: focal(block), blur: Boolean(block?.includes("blurDataURL:")),
    alt: copy?.alt, caption: copy?.caption, credit: copy?.credit,
    rights: "NOT VERIFIED",
    problems: [!copy?.alt && "alt missing", !copy?.caption && "caption missing", !copy?.credit && "credit missing", "rights not verified"].filter(Boolean),
  });
}

const decisions = new Map();
for (const line of plazaDoc.split("\n")) {
  const m = line.match(/^\|\s*(image\d+\.jpeg)\s*\|\s*(COVER|MAIN|FULL_SERIES_ONLY|REJECTED)\s*\|\s*([^|]*)\|\s*([^|]*)\|\s*([^|]*)\|\s*([^|]*)\|/);
  if (m) decisions.set(m[1], { status: m[2], reason: m[3].trim(), sequence: m[4].trim(), layout: m[5].trim(), narrativeRole: m[6].trim() });
}
if (decisions.size !== 77) throw new Error(`Expected 77 curation decisions; found ${decisions.size}`);
const seriesList = (await fs.readFile(path.join(root, "src/content/photo-archive-data.ts"), "utf8")).match(/const plazaSeriesOriginals = \[([\s\S]*?)\] as const/)?.[1];
if (!seriesList) throw new Error("Could not read current full-series selection");
const sourceSeriesOrder = [...seriesList.matchAll(/"(\d{5})"/g)].map((m) => m[1]);
const exclusionBlock = archiveSource.match(/const plazaSeriesExclusions = new Set\(\[([\s\S]*?)\]\)/)?.[1] ?? "";
const plazaSeriesExclusions = new Set([...exclusionBlock.matchAll(/"(\d{5})"/g)].map((m) => m[1]));
const mainEssayPositions = new Map([...mediaSource.matchAll(/plazaPhoto\("(entre-tiendas-y-tambores-\d{3})",\s*"[^"]+",\s*(\d+)/g)].map((m) => [m[1], Number(m[2])]));
mainEssayPositions.set("entre-tiendas-y-tambores-001", 1);
const seriesBySource = new Map();
for (const m of mediaSource.matchAll(/plazaPhoto\("(entre-tiendas-y-tambores-\d{3})",\s*"([^"]+)",\s*(\d+),\s*"([^"]+)"\)/g)) {
  seriesBySource.set(Number(m[1].slice(-3)), { id: m[1], layout: m[2], position: Number(m[3]), narrativeRole: m[4] });
}
const plazaFiles = (await fs.readdir(path.join(root, ".media-source/incoming/new-photo-project"))).filter((name) => /^image\d+\.jpeg$/i.test(name));
if (plazaFiles.length !== 77) throw new Error(`Expected 77 new-photo originals; found ${plazaFiles.length}`);
for (const file of plazaFiles) {
  const decision = decisions.get(file);
  const sourceNumber = file.match(/image(\d+)\.jpeg/i)?.[1];
  const seriesIndex = sourceSeriesOrder.indexOf(sourceNumber);
  const sequenceNo = seriesIndex >= 0 ? seriesIndex + 1 : undefined;
  const mainNo = Number(decision.sequence.match(/P(\d+)/)?.[1]);
  const selected = seriesIndex >= 0 && !plazaSeriesExclusions.has(sourceNumber);
  const fullOnly = selected && !mainNo;
  const seriesItem = selected && sequenceNo ? { id: `entre-tiendas-y-tambores-${String(sequenceNo).padStart(3, "0")}`, ...seriesBySource.get(sequenceNo) } : undefined;
  const decisionConflict = selected && decision.status === "REJECTED";
  const originalPath = path.join(root, ".media-source/incoming/new-photo-project", file);
  const servedRel = selected ? `public/media/projects/entre-tiendas-y-tambores/${seriesItem.id}.webp` : `.media-source/incoming/new-photo-project/${file}`;
  const served = path.join(root, servedRel);
  const originalMeta = await sharp(originalPath).metadata();
  const servedMeta = await sharp(served).metadata();
  const id = seriesItem?.id ?? file;
  const copy = messages.Projects.items["entre-tiendas-y-tambores"].media[id];
  const status = decisionConflict ? "INCLUDED IN CODE · DOC MARKS REJECTED" : decision.status === "COVER" ? "COVER · MAIN" : decision.status === "MAIN" ? "SELECTED · MAIN" : fullOnly ? "SELECTED · FULL SERIES ONLY" : "NOT SELECTED · REJECTED";
  collections.get("entre-tiendas-y-tambores").push({
    project: "entre-tiendas-y-tambores", file, id, src: servedRel,
    originalDim: `${originalMeta.width}×${originalMeta.height}`, dim: `${servedMeta.width}×${servedMeta.height}`,
    orientation: originalMeta.width > originalMeta.height ? "landscape" : "portrait",
    ratio: aspectLabel(originalMeta.width, originalMeta.height), originalBytes: (await fs.stat(originalPath)).size,
    assetBytes: (await fs.stat(served)).size, selected, mainEssay: mainEssayPositions.has(id), seriesPosition: sequenceNo, archiveOnly: false, cover: decision.status === "COVER",
    position: mainNo || (selected && sequenceNo ? `S${String(sequenceNo).padStart(2, "0")}` : undefined),
    layout: seriesItem?.layout ?? (fullOnly ? "full-series only" : undefined),
    narrativeRole: seriesItem?.narrativeRole ?? (fullOnly ? "not explicitly set" : undefined),
    focal: focal(mediaMeta.get(id)), blur: Boolean(mediaMeta.get(id)?.includes("blurDataURL:")),
    alt: copy?.alt, caption: copy?.caption, credit: copy?.credit, rights: "NOT VERIFIED",
    status, reason: decisionConflict ? `CONFLICT: current full-series data includes this photo; curation document marks it rejected. ${decision.reason}` : decision.reason,
    problems: [!copy?.alt && "alt missing", !copy?.caption && "caption missing", !copy?.credit && "credit missing", !seriesItem?.narrativeRole && "narrativeRole not set", "rights not verified"].filter(Boolean),
    source: originalPath,
  });
}

await fs.mkdir(out, { recursive: true });
const contactDir = path.join(out, "contact-sheets");
await fs.mkdir(contactDir, { recursive: true });
const fmtBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;
function editorialDecision(item) {
  if (item.project === "entre-tiendas-y-tambores") {
    if (item.selected) return { label: "KEEP", reason: item.mainEssay ? "Mantener en la secuencia del ensayo y la serie global." : "Mantener solo en la serie global; no forma parte del ensayo de 15 fotos." };
    return { label: "CUT", reason: item.file === "image00060.jpeg" ? "El documento de curación la marca REJECTED; toma nocturna redundante junto a la barrera. Excluir de la serie global." : item.reason ?? "No seleccionada en la serie global; mantener fuera del ensayo." };
  }
  if (maybeIds.has(item.id)) return { label: "MAYBE", reason: maybeReasons[item.id] };
  if (proposedKeep[item.project]?.includes(Number(item.id.match(/-(\d+)$/)?.[1]))) return { label: "KEEP", reason: "Incluida en la propuesta provisional indicada para esta colección." };
  return { label: "CUT", reason: "Fuera de la selección propuesta para el ensayo; permanece en Archivo si ya está allí." };
}
function proposedPosition(item) {
  if (editorialDecision(item).label !== "KEEP") return "—";
  if (item.project === "entre-tiendas-y-tambores") return item.mainEssay ? `P${String(mainEssayPositions.get(item.id)).padStart(2, "0")}` : `S${String(item.seriesPosition).padStart(2, "0")}`;
  const index = proposedKeep[item.project].indexOf(Number(item.id.match(/-(\d+)$/)?.[1]));
  return String(index + 1).padStart(2, "0");
}
function card(item, index) {
  const original = item.file;
  const decision = editorialDecision(item);
  const status = item.status ?? (item.selected ? "SELECTED · ESSAY" : "NOT SELECTED · ARCHIVE ONLY");
  const fields = [
    ["ID", item.id], ["Filename", original], ["Asset path", item.src], ["Dimensions (source → shown)", `${item.originalDim} → ${item.dim}`],
    ["Orientation · ratio", `${item.orientation} · ${item.ratio}`], ["File size (source → shown)", `${fmtBytes(item.originalBytes)} → ${fmtBytes(item.assetBytes)}`],
    ["Current selected", item.selected ? "yes" : "no"],
    ...(item.project === "entre-tiendas-y-tambores" ? [["Current status", status]] : []),
    ...(item.project === "entre-tiendas-y-tambores" ? [["Current main essay (15 photos)", item.mainEssay ? "yes" : "no"]] : []),
    ["Cover", item.cover ? "YES" : "no"], ["Current position", item.position ?? "—"], ["Proposed position", proposedPosition(item)], ["Current layout", item.layout ?? "—"],
    ["Narrative role", item.narrativeRole ?? "—"], ["Focal point", item.focal], ["blurDataURL", item.blur ? "yes" : "no"],
    ["Alt (ES)", item.alt ?? "PENDING"], ["Caption (ES)", item.caption ?? "PENDING"], ["Credit (ES)", item.credit ?? "PENDING"],
    ["Rights", item.rights], ["Recommendation", decision.label], ["Reason", decision.reason], ["Issues", item.problems.join("; ") || "none detected"],
    ...(item.reason ? [["Existing curation note", item.reason]] : []),
  ];
  const src = path.relative(out, path.join(root, item.src)).split(path.sep).join("/");
  const badges = `<div class="badges"><span class="badge current">CURRENT ${item.selected ? "SELECTED" : "NOT SELECTED"}</span>${item.project === "entre-tiendas-y-tambores" ? `<span class="badge essay">MAIN ESSAY ${item.mainEssay ? "YES" : "NO"}</span>` : ""}<span class="badge ${decision.label.toLowerCase()}">RECOMMENDED ${decision.label}</span></div>`;
  return `<article class="card"><img loading="lazy" src="${esc(src)}" alt="${esc(item.alt ?? "Review image: " + item.id)}"><div class="meta"><strong>${String(index + 1).padStart(2, "0")} · ${esc(item.id)}</strong>${badges}<dl>${fields.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl></div></article>`;
}
const stylesheet = `:root{color-scheme:light;font:14px/1.45 system-ui,sans-serif;color:#211f1d;background:#f3f0eb}body{margin:0;padding:24px;max-width:1800px;margin-inline:auto}h1{font-size:clamp(28px,4vw,48px);margin:0 0 8px}.intro{color:#625e58;margin:0 0 24px}.nav{display:flex;gap:10px;flex-wrap:wrap;margin:0 0 24px}.nav a,.back{color:#493a27}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:16px}.card{background:white;border:1px solid #ddd7ce;border-radius:8px;overflow:hidden;break-inside:avoid}.card img{display:block;width:100%;height:320px;object-fit:contain;background:#181715}.meta{padding:12px 14px}.meta strong{font-size:15px}.badges{display:flex;gap:6px;flex-wrap:wrap;margin-top:9px}.badge{border-radius:999px;padding:3px 8px;font-size:10px;font-weight:700;letter-spacing:.04em}.current{background:#e8e2d7}.essay{background:#e1e6ef;color:#2b3a54}.keep{background:#d9efde;color:#14532d}.maybe{background:#fff0c2;color:#714d00}.cut{background:#f5dddd;color:#7f1d1d}dl{display:grid;grid-template-columns:135px 1fr;gap:3px 9px;margin:10px 0 0;font-size:12px}dt{color:#6c665d}dd{margin:0;overflow-wrap:anywhere}.summary{border-collapse:collapse;background:white;width:100%;margin:16px 0 24px}.summary td,.summary th{border:1px solid #ddd7ce;padding:9px;text-align:left}@media(max-width:600px){body{padding:14px}.grid{grid-template-columns:1fr}.card img{height:300px}dl{grid-template-columns:115px 1fr}}`;
const base = (title, content) => `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} · Revisión fotográfica</title><style>${stylesheet}</style><body><p><a class="back" href="index.html">← Índice</a></p>${content}</body></html>`;
const summaries = [];
function proposedOrder(slug, items) {
  if (slug === "entre-tiendas-y-tambores") {
    const main = items.filter((item) => item.mainEssay).sort((a, b) => mainEssayPositions.get(a.id) - mainEssayPositions.get(b.id)).map((item) => item.id);
    const series = items.filter((item) => item.selected).sort((a, b) => a.seriesPosition - b.seriesPosition).map((item) => item.id);
    return { main, series };
  }
  return { main: proposedKeep[slug].map((n) => `${slug}-${String(n).padStart(2, "0")}`) };
}
for (const slug of projectOrder) {
  const items = collections.get(slug);
  const selected = items.filter((item) => item.selected).length;
  const excluded = items.length - selected;
  const proposal = proposedOrder(slug, items);
  const recommended = slug === "entre-tiendas-y-tambores" ? proposal.series.length : proposal.main.length;
  const removed = items.filter((item) => item.selected && editorialDecision(item).label !== "KEEP").length;
  const maybe = items.filter((item) => editorialDecision(item).label === "MAYBE").length;
  const mainSelected = items.filter((item) => item.mainEssay).length;
  const cover = items.find((item) => item.cover);
  const conflicts = items.filter((item) => item.reason?.startsWith("CONFLICT:")).length;
  summaries.push({ slug, title: titles[slug], total: items.length, selected, excluded, recommended, removed, maybe, mainSelected, conflicts, cover: cover?.id ?? "—", proposal });
  const sorted = [...items].sort((a, b) => {
    if (a.selected !== b.selected) return a.selected ? -1 : 1;
    const category = (item) => typeof item.position === "number" || String(item.position ?? "").startsWith("P") ? 0 : String(item.position ?? "").startsWith("S") ? 1 : 2;
    if (category(a) !== category(b)) return category(a) - category(b);
    const pa = typeof a.position === "number" ? a.position : Number(String(a.position ?? "").replace(/\D/g, "")) || 999;
    const pb = typeof b.position === "number" ? b.position : Number(String(b.position ?? "").replace(/\D/g, "")) || 999;
    return pa - pb || a.file.localeCompare(b.file);
  });
  const sheetLinks = [];
  for (let offset = 0; offset < sorted.length; offset += 12) {
    const batch = sorted.slice(offset, offset + 12);
    const tiles = await Promise.all(batch.map(async (item) => {
      const file = path.join(root, item.src);
      const status = item.status ?? (item.selected ? "SELECTED" : "ARCHIVE ONLY");
      const label = Buffer.from(`<svg width="340" height="40" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#fff"/><text x="8" y="15" font-family="sans-serif" font-size="12" fill="#211f1d">${esc(item.id)}</text><text x="8" y="32" font-family="sans-serif" font-size="10" fill="#625e58">${esc(status)}</text></svg>`);
      return sharp(file).rotate().resize({ width: 340, height: 260, fit: "contain", background: "#fff" }).extend({ bottom: 40, background: "#fff" }).composite([{ input: label, top: 260, left: 0 }]).jpeg({ quality: 82 }).toBuffer();
    }));
    const columns = 3;
    const rows = Math.ceil(tiles.length / columns);
    const filename = `${slug}-${String(sheetLinks.length + 1).padStart(2, "0")}.jpg`;
    await sharp({ create: { width: columns * 340, height: rows * 300, channels: 3, background: "#e8e4df" } })
      .composite(tiles.map((input, i) => ({ input, left: (i % columns) * 340, top: Math.floor(i / columns) * 300 })))
      .jpeg({ quality: 88 }).toFile(path.join(contactDir, filename));
    sheetLinks.push(filename);
  }
  const orderBlock = slug === "entre-tiendas-y-tambores"
    ? `<h2>PROPOSED FINAL ORDER</h2><p>Ensayo principal (${proposal.main.length}): ${proposal.main.map((id, i) => `${String(i + 1).padStart(2, "0")} ${esc(id)}`).join(" · ")}</p><p>Serie global (${proposal.series.length}): ${proposal.series.map((id) => esc(id)).join(" · ")}</p>`
    : `<h2>PROPOSED FINAL ORDER</h2><p>${proposal.main.map((id, i) => `${String(i + 1).padStart(2, "0")} ${esc(id)}`).join(" · ")}</p>`;
  const page = `<h1>${esc(titles[slug])}</h1><p class="intro">CURRENT: ${slug === "entre-tiendas-y-tambores" ? `${selected} global · ${mainSelected} ensayo` : selected} · RECOMMENDED: ${recommended} KEEP${slug === "entre-tiendas-y-tambores" ? ` global · ${mainSelected} ensayo` : ""} · MAYBE: ${maybe} · REMOVED: ${removed} · fuera de selección actual: ${excluded} · cover: ${esc(cover?.id ?? "—")}</p>${orderBlock}<nav class="nav"><a href="index.html">Índice</a>${projectOrder.map((id) => `<a href="${id}.html">${esc(titles[id])}</a>`).join("")}${sheetLinks.map((file, i) => `<a href="contact-sheets/${file}">Contact sheet ${i + 1}</a>`).join("")}</nav><div class="grid">${sorted.map(card).join("")}</div>`;
  await fs.writeFile(path.join(out, `${slug}.html`), base(titles[slug], page));
}
const totalSources = summaries.reduce((n, x) => n + x.total, 0);
const conflictCount = summaries.reduce((n, x) => n + x.conflicts, 0);
const index = `<h1>Revisión fotográfica local</h1><p class="intro">${totalSources} fotografías fuente: 74 de los cuatro proyectos previos y 77 de Entre tiendas y tambores. No modifica las propuestas de las cuatro colecciones ni publica assets.</p><table class="summary"><thead><tr><th>Colección</th><th>Total</th><th>Current</th><th>Recommended KEEP</th><th>MAYBE</th><th>Removed</th><th>Fuera actual</th><th>Cover</th></tr></thead><tbody>${summaries.map((x) => `<tr><td><a href="${x.slug}.html">${esc(x.title)}</a></td><td>${x.total}</td><td>${x.selected}${x.slug === "entre-tiendas-y-tambores" ? ` global / ${x.mainSelected} essay` : ""}</td><td>${x.recommended}</td><td>${x.maybe}</td><td>${x.removed}</td><td>${x.excluded}</td><td>${esc(x.cover)}</td></tr>`).join("")}</tbody></table><nav class="nav">${summaries.map((x) => `<a href="${x.slug}.html">${esc(x.title)}</a>`).join("")}</nav><p class="intro">Para Entre tiendas y tambores, la serie global selecciona ${summaries.at(-1).selected} y recomienda ${summaries.at(-1).recommended}; el ensayo principal mantiene ${summaries.at(-1).mainSelected}. ${conflictCount ? `ATENCIÓN: ${conflictCount} conflictos de curation.` : "La discrepancia image00060 queda resuelta según la tabla editorial fuente."} Ábrelo en navegador con <code>file://</code>.</p>`;
await fs.writeFile(path.join(out, "index.html"), base("Índice", index));
console.log(JSON.stringify({ out, summaries, totalSources }, null, 2));
