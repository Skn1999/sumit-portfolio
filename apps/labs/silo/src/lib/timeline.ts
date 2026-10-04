/**
 * Timeline motion math for "The Spiral" portfolio.
 * Pure functions with zero React or DOM dependencies.
 * Reference: research/silo.md sections 10.2, 10.3, 10.4, 11.1, 11.2
 */

export const DWELL = 0.12;
export const TRAVEL = (1 - 4 * DWELL) / 3; // ~0.17333333333333334

export type LevelId = 'L1' | 'L48' | 'L96' | 'L144';
export const LEVEL_IDS: readonly LevelId[] = ['L1', 'L48', 'L96', 'L144'] as const;

export interface SegmentInfo {
  type: 'dwell' | 'travel';
  levelIndex: number;
  fromLevel?: number;
  toLevel?: number;
  localT: number;
}

export interface CameraLevel {
  id: string;
  cx?: number;
  cy: number;
  zoom: number;
}

export interface CameraConfig {
  travelZoomDip?: number;
}

export interface PlateStyle {
  opacity: number;
  scale: number;
  yOffset: number;
}

export interface PanelStyle {
  opacity: number;
  y: number;
  inert: boolean;
  childStaggerOffset: number;
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

/**
 * Returns the length of each dwell segment in progress units (0.12).
 */
export function dwellLength(): number {
  return DWELL;
}

/**
 * Returns the starting progress (0..1) for a given level's dwell.
 */
export function dwellStart(levelId: LevelId): number {
  switch (levelId) {
    case 'L1':
      return 0;
    case 'L48':
      return DWELL + TRAVEL;
    case 'L96':
      return 2 * DWELL + 2 * TRAVEL;
    case 'L144':
      return 3 * DWELL + 3 * TRAVEL;
  }
}

/**
 * Determines whether progress p lands in a dwell or travel segment,
 * along with its local normalized progress [0..1].
 */
export function segmentAt(p: number): SegmentInfo {
  const dwell0End = DWELL; // 0.12
  const travel0End = dwell0End + TRAVEL; // ~0.293333
  const dwell1End = travel0End + DWELL; // ~0.413333
  const travel1End = dwell1End + TRAVEL; // ~0.586667
  const dwell2End = travel1End + DWELL; // ~0.706667
  const travel2End = dwell2End + TRAVEL; // 0.88

  if (p < dwell0End) {
    return {
      type: 'dwell',
      levelIndex: 0,
      fromLevel: 0,
      toLevel: 0,
      localT: clamp(p / DWELL, 0, 1),
    };
  } else if (p < travel0End) {
    return {
      type: 'travel',
      levelIndex: 0,
      fromLevel: 0,
      toLevel: 1,
      localT: clamp((p - dwell0End) / TRAVEL, 0, 1),
    };
  } else if (p < dwell1End) {
    return {
      type: 'dwell',
      levelIndex: 1,
      fromLevel: 1,
      toLevel: 1,
      localT: clamp((p - travel0End) / DWELL, 0, 1),
    };
  } else if (p < travel1End) {
    return {
      type: 'travel',
      levelIndex: 1,
      fromLevel: 1,
      toLevel: 2,
      localT: clamp((p - dwell1End) / TRAVEL, 0, 1),
    };
  } else if (p < dwell2End) {
    return {
      type: 'dwell',
      levelIndex: 2,
      fromLevel: 2,
      toLevel: 2,
      localT: clamp((p - travel1End) / DWELL, 0, 1),
    };
  } else if (p < travel2End) {
    return {
      type: 'travel',
      levelIndex: 2,
      fromLevel: 2,
      toLevel: 3,
      localT: clamp((p - dwell2End) / TRAVEL, 0, 1),
    };
  } else {
    return {
      type: 'dwell',
      levelIndex: 3,
      fromLevel: 3,
      toLevel: 3,
      localT: clamp((p - travel2End) / DWELL, 0, 1),
    };
  }
}

/**
 * Returns the currently active level ID for any progress p.
 * Transitions at the midpoint (localT = 0.5) of each travel segment.
 */
export function activeLevelAt(p: number): LevelId {
  const seg = segmentAt(p);
  if (seg.type === 'dwell') {
    return LEVEL_IDS[seg.levelIndex];
  }
  return seg.localT < 0.5 ? LEVEL_IDS[seg.fromLevel!] : LEVEL_IDS[seg.toLevel!];
}

/**
 * Quadratic ease-in-out matching GSAP's power2.inOut.
 */
function easePower2InOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * Computes the vertical track Y offset for the vertically aligned 4 levels.
 * Each level occupies 1 viewportHeight.
 * Level 1 is at 0, Level 48 is at 1 * H, Level 96 is at 2 * H, Level 144 is at 3 * H.
 * During dwells, y holds stationary at that level's index * H.
 * During travel, y eases smoothly between level indexes using easePower2InOut.
 */
export function trackYAt(p: number, viewportHeight: number): number {
  const seg = segmentAt(p);
  if (seg.type === 'dwell') {
    return seg.levelIndex * viewportHeight;
  }
  const fromY = seg.fromLevel! * viewportHeight;
  const toY = seg.toLevel! * viewportHeight;
  const easedT = easePower2InOut(seg.localT);
  return fromY + (toY - fromY) * easedT;
}

/**
 * Computes camera state { cx, cy, zoom } at progress p.
 * During travel, cy and zoom interpolate between levels using power2.inOut ease.
 * An optional travel zoom dip is applied via: zoom * (1 - dip * sin(pi * t)).
 */
export function cameraAt(
  p: number,
  levels: CameraLevel[],
  config?: CameraConfig
): { cx: number; cy: number; zoom: number } {
  const seg = segmentAt(p);
  const travelZoomDip = config?.travelZoomDip ?? 0.12;

  const findLevel = (idx: number): CameraLevel => {
    return (
      levels[idx] ??
      levels.find((l) => l.id === LEVEL_IDS[idx]) ?? {
        id: LEVEL_IDS[idx] ?? 'L1',
        cx: 0.5,
        cy: 0.5,
        zoom: 1,
      }
    );
  };

  if (seg.type === 'dwell') {
    const lvl = findLevel(seg.levelIndex);
    return {
      cx: lvl.cx ?? 0.5,
      cy: lvl.cy,
      zoom: lvl.zoom,
    };
  }

  const fromLvl = findLevel(seg.fromLevel!);
  const toLvl = findLevel(seg.toLevel!);
  const t = seg.localT;

  const easedT = easePower2InOut(t);
  const fromCx = fromLvl.cx ?? 0.5;
  const toCx = toLvl.cx ?? 0.5;
  const cx = fromCx + (toCx - fromCx) * easedT;
  const cy = fromLvl.cy + (toLvl.cy - fromLvl.cy) * easedT;
  const baseZoom = fromLvl.zoom + (toLvl.zoom - fromLvl.zoom) * easedT;

  const dip = 1 - travelZoomDip * Math.sin(Math.PI * t);
  const zoom = baseZoom * dip;

  return {
    cx,
    cy,
    zoom,
  };
}

/**
 * Computes plate styles (opacity, scale, yOffset) for each level at progress p.
 * Reference: Section 10.3
 * - Plate N opacity is 1 throughout its dwell.
 * - In the travel after N: plate N fades 1 to 0 over t in [0, 0.30].
 * - In the same travel: plate N+1 fades 0 to 1 over t in [0.70, 1.0].
 * - Between 0.30 and 0.70 only the world is visible (all plate opacities 0).
 * - Scale: arriving 1.06 -> 1.02, dwell 1.02 -> 1.05, leaving 1.05 -> 1.07.
 * - yOffset: subtle vertical drift of up to 8px opposite to scroll direction during dwell.
 */
export function plateOpacities(p: number): Record<LevelId, PlateStyle> {
  const seg = segmentAt(p);

  const result: Record<LevelId, PlateStyle> = {
    L1: { opacity: 0, scale: 1.0, yOffset: 0 },
    L48: { opacity: 0, scale: 1.0, yOffset: 0 },
    L96: { opacity: 0, scale: 1.0, yOffset: 0 },
    L144: { opacity: 0, scale: 1.0, yOffset: 0 },
  };

  if (seg.type === 'dwell') {
    const activeId = LEVEL_IDS[seg.levelIndex];
    const t = seg.localT;
    result[activeId] = {
      opacity: 1,
      scale: 1.02 + 0.03 * t,
      yOffset: -8 * t,
    };
    return result;
  }

  const fromId = LEVEL_IDS[seg.fromLevel!];
  const toId = LEVEL_IDS[seg.toLevel!];
  const t = seg.localT;

  // Leaving plate (fromId)
  if (t <= 0.30) {
    const leaveT = t / 0.30;
    result[fromId] = {
      opacity: 1 - leaveT,
      scale: 1.05 + 0.02 * leaveT,
      yOffset: -8,
    };
  } else {
    result[fromId] = {
      opacity: 0,
      scale: 1.07,
      yOffset: 0,
    };
  }

  // Arriving plate (toId)
  if (t >= 0.70) {
    const arriveT = (t - 0.70) / 0.30;
    result[toId] = {
      opacity: arriveT,
      scale: 1.06 - 0.04 * arriveT,
      yOffset: 0,
    };
  } else {
    result[toId] = {
      opacity: 0,
      scale: 1.06,
      yOffset: 0,
    };
  }

  return result;
}

/**
 * Computes left column panel styles (opacity, y, inert, childStaggerOffset) for each level at progress p.
 * Reference: Section 10.4
 * - Visible (opacity 1, y 0) during its dwell.
 * - Leaving: opacity 1 to 0 and y 0 to -16px over t in [0.10, 0.35].
 * - Arriving: opacity 0 to 1 and y +16px to 0 over t in [0.65, 0.90].
 * - Outside those ranges: opacity 0.
 * - When opacity is under 0.5, inert = true; when >= 0.5, inert = false.
 */
export function panelStyles(p: number): Record<LevelId, PanelStyle> {
  const seg = segmentAt(p);

  const result: Record<LevelId, PanelStyle> = {
    L1: { opacity: 0, y: 16, inert: true, childStaggerOffset: 0 },
    L48: { opacity: 0, y: 16, inert: true, childStaggerOffset: 0 },
    L96: { opacity: 0, y: 16, inert: true, childStaggerOffset: 0 },
    L144: { opacity: 0, y: 16, inert: true, childStaggerOffset: 0 },
  };

  if (seg.type === 'dwell') {
    for (let i = 0; i < LEVEL_IDS.length; i++) {
      const id = LEVEL_IDS[i];
      if (i === seg.levelIndex) {
        result[id] = {
          opacity: 1,
          y: 0,
          inert: false,
          childStaggerOffset: 1.0,
        };
      } else {
        result[id] = {
          opacity: 0,
          y: i < seg.levelIndex ? -16 : 16,
          inert: true,
          childStaggerOffset: 0,
        };
      }
    }
    return result;
  }

  const fromIndex = seg.fromLevel!;
  const toIndex = seg.toLevel!;
  const fromId = LEVEL_IDS[fromIndex];
  const toId = LEVEL_IDS[toIndex];
  const t = seg.localT;

  for (let i = 0; i < LEVEL_IDS.length; i++) {
    const id = LEVEL_IDS[i];
    if (i < fromIndex) {
      result[id] = { opacity: 0, y: -16, inert: true, childStaggerOffset: 0 };
    } else if (i > toIndex) {
      result[id] = { opacity: 0, y: 16, inert: true, childStaggerOffset: 0 };
    }
  }

  // Leaving panel (fromId)
  if (t < 0.10) {
    result[fromId] = {
      opacity: 1,
      y: 0,
      inert: false,
      childStaggerOffset: 1.0,
    };
  } else if (t <= 0.35) {
    const leaveT = (t - 0.10) / 0.25;
    const opacity = 1 - leaveT;
    result[fromId] = {
      opacity,
      y: -16 * leaveT,
      inert: opacity < 0.5 - 1e-5,
      childStaggerOffset: 0,
    };
  } else {
    result[fromId] = {
      opacity: 0,
      y: -16,
      inert: true,
      childStaggerOffset: 0,
    };
  }

  // Arriving panel (toId)
  if (t < 0.65) {
    result[toId] = {
      opacity: 0,
      y: 16,
      inert: true,
      childStaggerOffset: 0,
    };
  } else if (t <= 0.90) {
    const arriveT = (t - 0.65) / 0.25;
    const opacity = arriveT;
    result[toId] = {
      opacity,
      y: 16 * (1 - arriveT),
      inert: opacity < 0.5 - 1e-5,
      childStaggerOffset: t - 0.65,
    };
  } else {
    result[toId] = {
      opacity: 1,
      y: 0,
      inert: false,
      childStaggerOffset: 0.25,
    };
  }

  return result;
}

/**
 * Computes snap target progress and level ID after scrolling stops.
 * Reference: Section 11.2
 * - Inside a dwell: no snap (returns current progress).
 * - Inside a travel segment:
 *   - Direction down (1) and t > 0.25: snaps to next dwell start.
 *   - Direction up (-1) and t < 0.75: snaps to previous dwell end.
 *   - Otherwise: snaps to nearest dwell edge.
 */
export function nearestDwell(
  p: number,
  direction: 1 | -1
): { targetProgress: number; levelId: LevelId } {
  const seg = segmentAt(p);

  if (seg.type === 'dwell') {
    return {
      targetProgress: p,
      levelId: LEVEL_IDS[seg.levelIndex],
    };
  }

  const fromLevelId = LEVEL_IDS[seg.fromLevel!];
  const toLevelId = LEVEL_IDS[seg.toLevel!];
  const t = seg.localT;

  const fromDwellEnd = dwellStart(fromLevelId) + DWELL;
  const toDwellStart = dwellStart(toLevelId);

  if (direction === 1) {
    if (t > 0.25) {
      return {
        targetProgress: toDwellStart,
        levelId: toLevelId,
      };
    } else {
      return {
        targetProgress: fromDwellEnd,
        levelId: fromLevelId,
      };
    }
  } else {
    if (t < 0.75) {
      return {
        targetProgress: fromDwellEnd,
        levelId: fromLevelId,
      };
    } else {
      return {
        targetProgress: toDwellStart,
        levelId: toLevelId,
      };
    }
  }
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

/**
 * Sampled background edge colors for seamless blending.
 */
export const LEVEL_BG_COLORS: Record<'A' | LevelId, RGBColor> = {
  A: { r: 28, g: 31, b: 34 },     // #1c1f22 Mode A line drawing
  L1: { r: 13, g: 19, b: 21 },    // #0d1315 Level 01 Work
  L48: { r: 20, g: 22, b: 20 },   // #141614 Level 48 Process
  L96: { r: 17, g: 27, b: 29 },   // #111b1d Level 96 Hiking & food
  L144: { r: 28, g: 23, b: 19 },  // #1c1713 Level 144 Unsaid Moments
};

/**
 * Returns interpolated background color RGB at progress p [0..1]
 * with smooth easePower2InOut transitions during travel segments.
 */
export function bgRGBAt(p: number): RGBColor {
  const seg = segmentAt(p);
  if (seg.type === 'dwell') {
    const id = LEVEL_IDS[seg.levelIndex];
    return LEVEL_BG_COLORS[id];
  }

  const fromId = LEVEL_IDS[seg.fromLevel!];
  const toId = LEVEL_IDS[seg.toLevel!];
  const fromColor = LEVEL_BG_COLORS[fromId];
  const toColor = LEVEL_BG_COLORS[toId];

  const easedT = easePower2InOut(seg.localT);
  return {
    r: Math.round(fromColor.r + (toColor.r - fromColor.r) * easedT),
    g: Math.round(fromColor.g + (toColor.g - fromColor.g) * easedT),
    b: Math.round(fromColor.b + (toColor.b - fromColor.b) * easedT),
  };
}

/**
 * Returns formatted rgb() string for progress p [0..1].
 */
export function bgColorAt(p: number): string {
  const { r, g, b } = bgRGBAt(p);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Returns formatted hex color string for progress p [0..1].
 */
export function bgHexAt(p: number): string {
  const { r, g, b } = bgRGBAt(p);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Computes dark shadow opacity between levels during travel segments.
 * Peaks at localT = 0.5 with a smooth sine curve (up to 0.88 opacity).
 * Provides atmospheric darkness between level images to make transitions completely smooth.
 */
export function travelShadowOpacity(p: number): number {
  const seg = segmentAt(p);
  if (seg.type === 'dwell') {
    return 0;
  }
  return Math.sin(Math.PI * seg.localT) * 0.88;
}

