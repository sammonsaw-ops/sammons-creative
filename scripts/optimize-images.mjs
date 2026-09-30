#!/usr/bin/env node
import { readdir, mkdir, readFile } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const [, , sourceDir, destDir, maxEdgeArg] = process.argv;
if (!sourceDir || !destDir) {
  console.error(
    "Usage: node scripts/optimize-images.mjs <source-dir> <dest-dir> [max-edge=2560]",
  );
  process.exit(1);
}
const maxEdge = Number(maxEdgeArg ?? 2560);

function slug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const entries = await readdir(sourceDir);
const images = entries.filter((f) => /\.(jpe?g|png)$/i.test(f));
await mkdir(destDir, { recursive: true });

let saved = 0;
for (const file of images) {
  const src = join(sourceDir, file);
  const stem = slug(basename(file, extname(file)));
  const ext = extname(file).toLowerCase() === ".png" ? ".png" : ".jpg";
  const dest = join(destDir, `${stem}${ext}`);
  const buf = await readFile(src);
  const meta = await sharp(buf).metadata();
  const pipeline = sharp(buf)
    .rotate()
    .resize({
      width: maxEdge,
      height: maxEdge,
      fit: "inside",
      withoutEnlargement: true,
    });
  const out =
    ext === ".png"
      ? await pipeline.png({ compressionLevel: 9 }).toBuffer()
      : await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  await sharp(out).toFile(dest);
  saved++;
  const before = (buf.length / 1024).toFixed(0);
  const after = (out.length / 1024).toFixed(0);
  console.log(
    `  ${file}  ${meta.width}x${meta.height} ${before}KB  →  ${stem}${ext}  ${after}KB`,
  );
}
console.log(`\nOptimized ${saved} image${saved === 1 ? "" : "s"} → ${destDir}`);
