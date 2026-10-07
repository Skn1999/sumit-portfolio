import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

/**
 * Background color sampled from hero-line.jpg near borders: rgb(30, 34, 36)
 */
export const BG_COLOR = '#1e2224';

/**
 * Fixed rectangles to mask out visual flaws in hero-line.jpg (research/silo.md Section 5):
 * 1. Garbled marks on the left edge:
 *    - Crescent / stray marks running to x=0 at y=900..1370
 *    - Arc mark at y=2010..2130
 *    - Marginal noise at y=2470..2752
 * 2. Pipe numbers:
 *    - Pipe number at y=975..1012 (x=45..65)
 *    - Pipe number "0807" at y=1738..1785 (x=46..80)
 * 3. Right edge stray marks / border bleed:
 *    - y=760..1120 (x=1485..1536)
 *    - y=1570..1650 (x=1485..1536)
 *    - y=1950..2130 (x=1490..1536)
 * 4. Title block / scale text block at bottom:
 *    - y=2640..2675 (x=1170..1310)
 */
export const MASK_RECTANGLES = [
  // Garbled marks on the left outer edge
  { left: 0, top: 900, width: 42, height: 470, desc: 'Left edge garbled mark (upper)' },
  { left: 0, top: 2010, width: 35, height: 125, desc: 'Left edge stray arc (lower)' },
  { left: 0, top: 2470, width: 30, height: 282, desc: 'Left bottom edge notches' },

  // Pipe numbers
  { left: 45, top: 975, width: 20, height: 40, desc: 'Pipe number near Level 48' },
  { left: 46, top: 1738, width: 35, height: 48, desc: 'Pipe number 0807' },

  // Right edge border anomalies
  { left: 1485, top: 760, width: 51, height: 360, desc: 'Right edge upper border mark' },
  { left: 1485, top: 1570, width: 51, height: 80, desc: 'Right edge mid border mark' },
  { left: 1490, top: 1950, width: 46, height: 180, desc: 'Right edge lower border mark' },

  // Bottom right title block / scale block
  { left: 1170, top: 2640, width: 140, height: 40, desc: 'Bottom right title block/scale text' },
];

/**
 * Cleans hero-line image by compositing background color rectangles over unwanted artifacts.
 *
 * @param {string|Buffer} input - Path to hero-line image or buffer
 * @param {Array<{left: number, top: number, width: number, height: number}>} [rects] - Mask rectangles
 * @param {string} [color] - Mask fill color
 * @returns {Promise<sharp.Sharp>} Sharp pipeline instance ready for further processing or saving
 */
export async function cleanHeroLine(input, rects = MASK_RECTANGLES, color = BG_COLOR) {
  const composites = rects.map((r) => ({
    input: Buffer.from(
      `<svg width="${r.width}" height="${r.height}"><rect width="${r.width}" height="${r.height}" fill="${color}"/></svg>`
    ),
    left: r.left,
    top: r.top,
  }));

  // Render composites onto image
  return sharp(input).composite(composites);
}

// Standalone self-test when executed directly
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  console.log('[clean-hero-line] Running self-test...');
  console.log(`[clean-hero-line] Defined ${MASK_RECTANGLES.length} mask rectangles.`);
  try {
    const pipeline = await cleanHeroLine('assets/incoming/hero-line.jpg');
    const { width, height } = await pipeline.metadata();
    console.log(`[clean-hero-line] Test succeeded on hero-line.jpg (${width}x${height}).`);
  } catch (err) {
    console.error('[clean-hero-line] Self-test failed:', err);
    process.exit(1);
  }
}
