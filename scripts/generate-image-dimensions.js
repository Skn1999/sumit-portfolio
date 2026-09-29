#!/usr/bin/env node
/**
 * Image Dimensions Manifest Generator
 *
 * Scans all images in the project and generates a JSON lookup table
 * containing intrinsic width and height to prevent Cumulative Layout Shift (CLS).
 *
 * Usage:
 *   node scripts/generate-image-dimensions.js
 */

import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_FILE = path.join(ROOT, "src", "lib", "image-dimensions.json");

const SEARCH_DIRS = ["src/content/projects", "public/images"];
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "avif"];

export async function generateImageDimensions() {
  const patterns = SEARCH_DIRS.map(
    (dir) => `${dir}/**/*.{${IMAGE_EXTENSIONS.join(",")}}`
  );

  let allFiles = [];
  for (const pattern of patterns) {
    const files = await glob(pattern, { cwd: ROOT, absolute: true });
    allFiles.push(...files);
  }

  allFiles = [...new Set(allFiles)].sort();

  const manifest = {};

  for (const filePath of allFiles) {
    try {
      const metadata = await sharp(filePath).metadata();
      if (!metadata.width || !metadata.height) continue;

      const dim = {
        width: metadata.width,
        height: metadata.height,
        aspectRatio: `${metadata.width}/${metadata.height}`,
      };

      // 1. Path relative to src/content/projects (e.g. "ediaqi-decision-support-system/mockup.jpg")
      const projectsRel = path.relative(path.join(ROOT, "src", "content", "projects"), filePath);
      if (!projectsRel.startsWith("..")) {
        manifest[projectsRel] = dim;
      }

      // 2. Path relative to public (e.g. "images/cover.jpg")
      const publicRel = path.relative(path.join(ROOT, "public"), filePath);
      if (!publicRel.startsWith("..")) {
        manifest[publicRel] = dim;
      }

      // 3. Basename as fallback (e.g. "mockup.jpg")
      const basename = path.basename(filePath);
      if (!manifest[basename]) {
        manifest[basename] = dim;
      }
    } catch (err) {
      // Ignore unparseable image
    }
  }

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`📐 Image dimensions manifest generated: ${Object.keys(manifest).length} entries recorded in src/lib/image-dimensions.json`);
}

// Run directly when called from CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateImageDimensions().catch((err) => {
    console.error("Error generating image dimensions:", err);
    process.exit(1);
  });
}
