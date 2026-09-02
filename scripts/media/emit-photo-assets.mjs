import fs from "node:fs";
import path from "node:path";

const build = JSON.parse(
  fs.readFileSync("incoming-media/curation-build.json", "utf8"),
);

const layouts = {
  "musica-en-directo": [
    "full",
    "portrait",
    "wide",
    "pair",
    "pair",
    "portrait",
    "wide",
    "pair",
    "pair",
    "portrait",
    "portrait",
    "wide",
    "wide",
    "full",
  ],
  "retrato-editorial": [
    "full",
    "pair",
    "pair",
    "pair",
    "pair",
    "pair",
    "pair",
    "pair",
    "pair",
    "pair",
    "pair",
    "wide",
    "wide",
    "portrait",
  ],
  "estudio-editorial": [
    "full",
    "wide",
    "wide",
    "pair",
    "pair",
    "wide",
    "portrait",
    "wide",
    "pair",
    "pair",
  ],
  "calle-documental": [
    "full",
    "wide",
    "wide",
    "portrait",
    "wide",
    "portrait",
    "wide",
    "full",
  ],
};

const focals = {
  "musica-en-directo-01": { x: 50, y: 65 },
  "musica-en-directo-02": { x: 50, y: 40 },
  "musica-en-directo-14": { x: 55, y: 38 },
  "retrato-editorial-03": { x: 45, y: 30 },
  "retrato-editorial-08": { x: 50, y: 30 },
  "retrato-editorial-14": { x: 50, y: 20 },
  "calle-documental-01": { x: 60, y: 50 },
};

function block(item, layout, position) {
  const focal = focals[item.id];
  const lines = [
    "    {",
    `      id: ${JSON.stringify(item.id)},`,
    `      type: "image",`,
    `      src: ${JSON.stringify(item.src)},`,
    `      width: ${item.width},`,
    `      height: ${item.height},`,
  ];
  if (item.aspectRatio) {
    lines.push(`      aspectRatio: ${JSON.stringify(item.aspectRatio)},`);
  }
  lines.push(`      blurDataURL: ${JSON.stringify(item.blurDataURL)},`);
  lines.push(`      layout: ${JSON.stringify(layout)},`);
  lines.push(`      position: ${position},`);
  lines.push(`      altKey: ${JSON.stringify(item.id)},`);
  if (focal) {
    lines.push(`      focalPoint: { x: ${focal.x}, y: ${focal.y} },`);
  }
  lines.push("    }");
  return lines.join("\n");
}

const parts = ["import type { ProjectMedia } from \"@/content/projects\";", ""];

for (const [slug, items] of Object.entries(build.selected)) {
  const cover = items[0];
  const rest = items.slice(1);
  const lays = layouts[slug];
  parts.push(`export const ${slug.replace(/-/g, "_")}_cover: ProjectMedia =`);
  parts.push(block(cover, lays[0], 1).replace(/^    /, "") + ";");
  parts.push("");
  parts.push(
    `export const ${slug.replace(/-/g, "_")}_media: ProjectMedia[] = [`,
  );
  rest.forEach((item, i) => {
    parts.push(block(item, lays[i + 1], i + 2) + (i < rest.length - 1 ? "," : ""));
  });
  parts.push("];");
  parts.push("");
}

parts.push("export const photoArchiveGroups = {");
for (const [group, items] of Object.entries(build.archive)) {
  parts.push(`  ${group}: [`);
  items.forEach((item, i) => {
    parts.push(
      `    { id: ${JSON.stringify(item.id)}, original: ${JSON.stringify(item.original)}, src: ${JSON.stringify(item.src)}, width: ${item.width}, height: ${item.height}, ${item.aspectRatio ? `aspectRatio: ${JSON.stringify(item.aspectRatio)}, ` : ""}blurDataURL: ${JSON.stringify(item.blurDataURL)} }${i < items.length - 1 ? "," : ""}`,
    );
  });
  parts.push(`  ]${group === "calle" ? "" : ","}`);
}
parts.push("} as const;");
parts.push("");
parts.push(
  "export const PHOTO_ARCHIVE_COUNT = Object.values(photoArchiveGroups).reduce((n, g) => n + g.length, 0);",
);
parts.push("if (PHOTO_ARCHIVE_COUNT !== 74) {");
parts.push("  throw new Error(`photo archive ${PHOTO_ARCHIVE_COUNT} !== 74`);");
parts.push("}");
parts.push("");

fs.writeFileSync("src/content/photo-assets.ts", parts.join("\n"));
console.log("wrote src/content/photo-assets.ts");
