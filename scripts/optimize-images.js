#!/usr/bin/env node
/**
 * Image Optimization Script
 *
 * Uses sharp to optimize all images in the project:
 * - Resizes images wider than MAX_WIDTH (default 1920px)
 * - Compresses JPEGs to target quality (default 80)
 * - Compresses PNGs with high compression
 * - Generates WebP versions alongside originals for modern browsers
 * - Skips already-optimized images (tracks via .optimized-images.json)
 *
 * Usage:
 *   node scripts/optimize-images.js           # Optimize all images
 *   node scripts/optimize-images.js --force   # Re-optimize everything
 *   node scripts/optimize-images.js --dry-run # Preview without changes
 *   node scripts/optimize-images.js --webp    # Also generate .webp copies
 */

import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// ── Configuration ──────────────────────────────────────────────────────
const MAX_WIDTH = 1920; // Max image width in pixels
const JPEG_QUALITY = 80; // JPEG quality (1-100)
const PNG_COMPRESSION = 9; // PNG compression level (0-9)
const PNG_QUALITY = 80; // PNG quality for palette-based compression
const WEBP_QUALITY = 80; // WebP quality (1-100)
const MANIFEST_FILE = path.join(ROOT, ".optimized-images.json");

// Directories containing images to optimize
const IMAGE_DIRS = ["src/content/projects", "public/images"];

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];

// ── Helpers ────────────────────────────────────────────────────────────

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

function pctSaved(before, after) {
  if (before === 0) return "0%";
  return `${(((before - after) / before) * 100).toFixed(1)}%`;
}

async function loadManifest() {
  try {
    const data = await fs.readFile(MANIFEST_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function saveManifest(manifest) {
  await fs.writeFile(MANIFEST_FILE, JSON.stringify(manifest, null, 2) + "\n");
}

async function getFileHash(filePath) {
  const stat = await fs.stat(filePath);
  // Use mtime + size as a quick fingerprint (avoids reading entire file)
  return `${stat.mtimeMs}-${stat.size}`;
}

// ── Core optimization ──────────────────────────────────────────────────

async function optimizeImage(
  filePath,
  { dryRun = false, generateWebp = false },
) {
  const ext = path.extname(filePath).toLowerCase().slice(1);
  const originalBuffer = await fs.readFile(filePath);
  const originalSize = originalBuffer.length;

  let pipeline = sharp(originalBuffer);
  const metadata = await pipeline.metadata();

  // Resize if wider than MAX_WIDTH, preserving aspect ratio
  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH, null, {
      withoutEnlargement: true,
      fit: "inside",
    });
  }

  let optimizedBuffer;

  if (ext === "jpg" || ext === "jpeg") {
    optimizedBuffer = await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();
  } else if (ext === "png") {
    optimizedBuffer = await pipeline
      .png({ compressionLevel: PNG_COMPRESSION, quality: PNG_QUALITY })
      .toBuffer();
  } else if (ext === "gif") {
    // Sharp has limited GIF support; just pass through with resize if needed
    optimizedBuffer = await pipeline.toBuffer();
  } else if (ext === "webp") {
    optimizedBuffer = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
  } else {
    return null; // Unknown format, skip
  }

  const newSize = optimizedBuffer.length;

  // Only write if we actually saved space
  const saved = originalSize - newSize;
  const result = {
    file: path.relative(ROOT, filePath),
    originalSize,
    newSize,
    saved,
    resized: metadata.width > MAX_WIDTH,
    originalWidth: metadata.width,
  };

  if (saved > 0 && !dryRun) {
    await fs.writeFile(filePath, optimizedBuffer);
  }

  // Optionally generate WebP version
  let webpResult = null;
  if (generateWebp && ext !== "webp" && ext !== "gif") {
    const webpPath = filePath.replace(/\.[^.]+$/, ".webp");
    const webpBuffer = await sharp(dryRun ? originalBuffer : optimizedBuffer)
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();

    webpResult = {
      file: path.relative(ROOT, webpPath),
      size: webpBuffer.length,
      savedVsOriginal: originalSize - webpBuffer.length,
    };

    if (!dryRun) {
      await fs.writeFile(webpPath, webpBuffer);
    }
  }

  return { ...result, webp: webpResult };
}

// ── Main ───────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const dryRun = args.includes("--dry-run");
  const generateWebp = args.includes("--webp");

  console.log("\n🖼️  Image Optimization\n");
  if (dryRun) console.log("  ⚡ DRY RUN — no files will be modified\n");
  if (generateWebp) console.log("  🌐 WebP generation enabled\n");

  // Gather all image files
  const patterns = IMAGE_DIRS.map(
    (dir) => `${dir}/**/*.{${IMAGE_EXTENSIONS.join(",")}}`,
  );

  let allFiles = [];
  for (const pattern of patterns) {
    const files = await glob(pattern, { cwd: ROOT, absolute: true });
    allFiles.push(...files);
  }

  // Deduplicate and sort
  allFiles = [...new Set(allFiles)].sort();

  if (allFiles.length === 0) {
    console.log("  No images found.\n");
    return;
  }

  console.log(`  Found ${allFiles.length} images to process\n`);

  // Load optimization manifest to skip already-optimized files
  const manifest = force ? {} : await loadManifest();
  const newManifest = {};

  let totalOriginal = 0;
  let totalNew = 0;
  let skipped = 0;
  let optimized = 0;
  let errors = 0;
  const results = [];

  for (const filePath of allFiles) {
    const relPath = path.relative(ROOT, filePath);

    try {
      const hash = await getFileHash(filePath);

      // Skip if already optimized (same file hash)
      if (!force && manifest[relPath] === hash) {
        const stat = await fs.stat(filePath);
        totalOriginal += stat.size;
        totalNew += stat.size;
        skipped++;
        continue;
      }

      const result = await optimizeImage(filePath, { dryRun, generateWebp });

      if (result) {
        totalOriginal += result.originalSize;
        totalNew += result.newSize;

        if (result.saved > 0) {
          optimized++;
          const resizeTag = result.resized
            ? ` (resized ${result.originalWidth}→${MAX_WIDTH}px)`
            : "";
          console.log(
            `  ✅ ${relPath}: ${formatBytes(result.originalSize)} → ${formatBytes(
              result.newSize,
            )} (saved ${pctSaved(result.originalSize, result.newSize)})${resizeTag}`,
          );

          if (result.webp) {
            console.log(
              `     🌐 WebP: ${formatBytes(result.webp.size)} (saved ${pctSaved(
                result.originalSize,
                result.webp.size,
              )} vs original)`,
            );
          }
        } else {
          skipped++;
          console.log(`  ⏭️  ${relPath}: already optimal`);
        }

        results.push(result);

        // Update manifest with new hash (post-optimization)
        if (!dryRun && result.saved > 0) {
          const newHash = await getFileHash(filePath);
          newManifest[relPath] = newHash;
        } else {
          newManifest[relPath] = hash;
        }
      }
    } catch (err) {
      errors++;
      console.log(`  ❌ ${relPath}: ${err.message}`);
    }
  }

  // Save manifest
  if (!dryRun) {
    await saveManifest(newManifest);
  }

  // Summary
  const totalSaved = totalOriginal - totalNew;
  console.log("\n" + "─".repeat(60));
  console.log(`  📊 Summary`);
  console.log(`     Images processed : ${allFiles.length}`);
  console.log(`     Optimized        : ${optimized}`);
  console.log(`     Skipped          : ${skipped}`);
  if (errors > 0) console.log(`     Errors           : ${errors}`);
  console.log(`     Total before     : ${formatBytes(totalOriginal)}`);
  console.log(`     Total after      : ${formatBytes(totalNew)}`);
  console.log(
    `     Space saved      : ${formatBytes(totalSaved)} (${pctSaved(
      totalOriginal,
      totalNew,
    )})`,
  );
  console.log("─".repeat(60) + "\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
