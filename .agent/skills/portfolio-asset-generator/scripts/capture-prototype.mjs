#!/usr/bin/env node
/**
 * capture-prototype.mjs
 * High-DPI headless screenshot utility for portfolio case study assets.
 * 
 * Usage:
 *   node capture-prototype.mjs --url "https://..." --outDir "src/content/projects/my-slug" --theme "light"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve playwright-core from local node_modules or system
let chromium;
try {
  const pw = await import('playwright-core');
  chromium = pw.chromium;
} catch {
  console.error('Error: playwright-core not found. Run npm i -D playwright-core or use scratch environment.');
  process.exit(1);
}

// Parse args
const args = process.argv.slice(2);
function getArg(flag, defaultValue = null) {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultValue;
}

const targetUrl = getArg('--url');
const outDir = getArg('--outDir', './dist-captures');
const targetTheme = getArg('--theme', 'light');
const width = parseInt(getArg('--width', '1440'), 10);
const height = parseInt(getArg('--height', '900'), 10);

if (!targetUrl) {
  console.error('Usage: node capture-prototype.mjs --url <URL> --outDir <DIR> [--theme <light|dark>]');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const chromePaths = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser'
];
const executablePath = chromePaths.find(p => fs.existsSync(p));

async function run() {
  console.log(`[Asset Generator] Launching Chrome...`);
  const browser = await chromium.launch({
    executablePath,
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2, // 2x Retina DPI
  });

  const page = await context.newPage();
  console.log(`[Asset Generator] Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);

  // Attempt theme switch if needed
  await page.evaluate((theme) => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || document.documentElement.classList.contains('dark');
    if ((theme === 'dark' && !isDark) || (theme === 'light' && isDark)) {
      const toggleBtn = document.querySelector('button[aria-label*="theme" i], button[aria-label*="mode" i]');
      if (toggleBtn) toggleBtn.click();
    }
  }, targetTheme);
  await page.waitForTimeout(500);

  const outPath = path.join(outDir, `capture-${targetTheme}.png`);
  await page.screenshot({ path: outPath });
  console.log(`[Asset Generator] Saved capture: ${outPath}`);

  await browser.close();
}

run().catch((err) => {
  console.error('[Asset Generator] Capture failed:', err);
  process.exit(1);
});
