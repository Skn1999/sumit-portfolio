import { describe, it, expect, beforeEach } from 'vitest';
import {
  DWELL,
  TRAVEL,
  LEVEL_IDS,
  dwellLength,
  dwellStart,
  segmentAt,
  activeLevelAt,
  cameraAt,
  plateOpacities,
  panelStyles,
  nearestDwell,
  trackYAt,
  LEVEL_BG_COLORS,
  bgColorAt,
  bgHexAt,
} from '../src/lib/timeline';
import { computeWorldTransform } from '../src/lib/camera';
import { useSpiralStore } from '../src/lib/store';
import {
  accumulateWheelDelta,
  shouldTriggerEntry,
  shouldTriggerBackToDrawing,
  resetInputState,
  setModeACooldown,
  isModeACooldown,
} from '../src/lib/input';

describe('Timeline Constants & Dwell Progression', () => {
  it('has correct DWELL and TRAVEL values', () => {
    expect(DWELL).toBe(0.12);
    // (1 - 4 * 0.12) / 3 = 0.52 / 3
    expect(TRAVEL).toBeCloseTo(0.17333333333333334, 10);
    // 4 dwells + 3 travels must sum to exactly 1.0
    expect(4 * DWELL + 3 * TRAVEL).toBeCloseTo(1.0, 10);
  });

  it('dwellLength returns DWELL', () => {
    expect(dwellLength()).toBe(DWELL);
  });

  it('dwellStart returns correct progression for all 4 levels', () => {
    expect(dwellStart('L1')).toBe(0);
    expect(dwellStart('L48')).toBeCloseTo(DWELL + TRAVEL, 10);
    expect(dwellStart('L96')).toBeCloseTo(2 * DWELL + 2 * TRAVEL, 10);
    expect(dwellStart('L144')).toBeCloseTo(3 * DWELL + 3 * TRAVEL, 10);

    // Explicit numeric checks matching spec
    expect(dwellStart('L1')).toBe(0);
    expect(dwellStart('L48')).toBeCloseTo(0.293333, 5);
    expect(dwellStart('L96')).toBeCloseTo(0.586667, 5);
    expect(dwellStart('L144')).toBeCloseTo(0.88, 5);
  });
});

describe('Boundaries of Dwells and Travels (segmentAt)', () => {
  it('correctly classifies Dwell L1 [0, 0.12]', () => {
    const start = segmentAt(0);
    expect(start.type).toBe('dwell');
    expect(start.levelIndex).toBe(0);
    expect(start.localT).toBe(0);

    const mid = segmentAt(0.06);
    expect(mid.type).toBe('dwell');
    expect(mid.levelIndex).toBe(0);
    expect(mid.localT).toBeCloseTo(0.5, 5);

    // Clamping for p < 0
    const belowZero = segmentAt(-0.05);
    expect(belowZero.type).toBe('dwell');
    expect(belowZero.levelIndex).toBe(0);
    expect(belowZero.localT).toBe(0);
  });

  it('correctly classifies Travel L1 -> L48 [0.12, 0.2933]', () => {
    const start = segmentAt(0.12);
    expect(start.type).toBe('travel');
    expect(start.levelIndex).toBe(0);
    expect(start.fromLevel).toBe(0);
    expect(start.toLevel).toBe(1);
    expect(start.localT).toBeCloseTo(0, 5);

    const mid = segmentAt(0.12 + TRAVEL * 0.5);
    expect(mid.type).toBe('travel');
    expect(mid.fromLevel).toBe(0);
    expect(mid.toLevel).toBe(1);
    expect(mid.localT).toBeCloseTo(0.5, 5);
  });

  it('correctly classifies Dwell L48 [0.2933, 0.4133]', () => {
    const l48Start = dwellStart('L48');
    const start = segmentAt(l48Start);
    expect(start.type).toBe('dwell');
    expect(start.levelIndex).toBe(1);
    expect(start.localT).toBeCloseTo(0, 5);

    const mid = segmentAt(l48Start + DWELL * 0.5);
    expect(mid.type).toBe('dwell');
    expect(mid.levelIndex).toBe(1);
    expect(mid.localT).toBeCloseTo(0.5, 5);
  });

  it('correctly classifies Travel L48 -> L96 [0.4133, 0.5867]', () => {
    const travelStart = dwellStart('L48') + DWELL;
    const start = segmentAt(travelStart);
    expect(start.type).toBe('travel');
    expect(start.fromLevel).toBe(1);
    expect(start.toLevel).toBe(2);
    expect(start.localT).toBeCloseTo(0, 5);

    const mid = segmentAt(travelStart + TRAVEL * 0.5);
    expect(mid.type).toBe('travel');
    expect(mid.fromLevel).toBe(1);
    expect(mid.toLevel).toBe(2);
    expect(mid.localT).toBeCloseTo(0.5, 5);
  });

  it('correctly classifies Dwell L96 [0.5867, 0.7067]', () => {
    const l96Start = dwellStart('L96');
    const start = segmentAt(l96Start);
    expect(start.type).toBe('dwell');
    expect(start.levelIndex).toBe(2);
    expect(start.localT).toBeCloseTo(0, 5);

    const mid = segmentAt(l96Start + DWELL * 0.5);
    expect(mid.type).toBe('dwell');
    expect(mid.levelIndex).toBe(2);
    expect(mid.localT).toBeCloseTo(0.5, 5);
  });

  it('correctly classifies Travel L96 -> L144 [0.7067, 0.88]', () => {
    const travelStart = dwellStart('L96') + DWELL;
    const start = segmentAt(travelStart);
    expect(start.type).toBe('travel');
    expect(start.fromLevel).toBe(2);
    expect(start.toLevel).toBe(3);
    expect(start.localT).toBeCloseTo(0, 5);

    const mid = segmentAt(travelStart + TRAVEL * 0.5);
    expect(mid.type).toBe('travel');
    expect(mid.fromLevel).toBe(2);
    expect(mid.toLevel).toBe(3);
    expect(mid.localT).toBeCloseTo(0.5, 5);
  });

  it('correctly classifies Dwell L144 [0.88, 1.0]', () => {
    const l144Start = dwellStart('L144');
    const start = segmentAt(l144Start);
    expect(start.type).toBe('dwell');
    expect(start.levelIndex).toBe(3);
    expect(start.localT).toBeCloseTo(0, 5);

    const end = segmentAt(1.0);
    expect(end.type).toBe('dwell');
    expect(end.levelIndex).toBe(3);
    expect(end.localT).toBeCloseTo(1, 5);

    // Clamping for p > 1.0
    const beyondOne = segmentAt(1.1);
    expect(beyondOne.type).toBe('dwell');
    expect(beyondOne.levelIndex).toBe(3);
    expect(beyondOne.localT).toBe(1);
  });
});

describe('activeLevelAt', () => {
  it('returns active level during dwells and transitions symmetrically across travel midpoints', () => {
    // Dwell L1
    expect(activeLevelAt(0)).toBe('L1');
    expect(activeLevelAt(0.06)).toBe('L1');
    expect(activeLevelAt(0.119)).toBe('L1');

    // Travel L1 -> L48: transitions at localT = 0.5
    const travel0Start = 0.12;
    expect(activeLevelAt(travel0Start + TRAVEL * 0.49)).toBe('L1');
    expect(activeLevelAt(travel0Start + TRAVEL * 0.50)).toBe('L48');
    expect(activeLevelAt(travel0Start + TRAVEL * 0.80)).toBe('L48');

    // Dwell L48
    expect(activeLevelAt(dwellStart('L48'))).toBe('L48');
    expect(activeLevelAt(dwellStart('L48') + 0.05)).toBe('L48');

    // Travel L48 -> L96
    const travel1Start = dwellStart('L48') + DWELL;
    expect(activeLevelAt(travel1Start + TRAVEL * 0.49)).toBe('L48');
    expect(activeLevelAt(travel1Start + TRAVEL * 0.50)).toBe('L96');

    // Dwell L96
    expect(activeLevelAt(dwellStart('L96'))).toBe('L96');

    // Travel L96 -> L144
    const travel2Start = dwellStart('L96') + DWELL;
    expect(activeLevelAt(travel2Start + TRAVEL * 0.49)).toBe('L96');
    expect(activeLevelAt(travel2Start + TRAVEL * 0.50)).toBe('L144');

    // Dwell L144
    expect(activeLevelAt(dwellStart('L144'))).toBe('L144');
    expect(activeLevelAt(1.0)).toBe('L144');
  });
});

describe('plateOpacities (Section 10.3)', () => {
  it('is opacity 1 throughout dwell for active plate and 0 for others', () => {
    // Dwell L1
    const pL1 = plateOpacities(0.05);
    expect(pL1.L1.opacity).toBe(1);
    expect(pL1.L48.opacity).toBe(0);
    expect(pL1.L96.opacity).toBe(0);
    expect(pL1.L144.opacity).toBe(0);

    // Scale during dwell: 1.02 to 1.05
    expect(plateOpacities(0).L1.scale).toBeCloseTo(1.02, 5);
    expect(plateOpacities(0.06).L1.scale).toBeCloseTo(1.035, 5);
    expect(pL1.L1.yOffset).toBeLessThanOrEqual(0); // vertical drift opposite to scroll direction
  });

  it('fades out leaving plate over [0, 0.30] of travel', () => {
    const travelStart = 0.12;

    // t = 0: leaving plate is opacity 1, scale 1.05
    const at0 = plateOpacities(travelStart);
    expect(at0.L1.opacity).toBeCloseTo(1, 5);
    expect(at0.L1.scale).toBeCloseTo(1.05, 5);

    // t = 0.15: halfway through fade-out, opacity 0.5
    const at15 = plateOpacities(travelStart + TRAVEL * 0.15);
    expect(at15.L1.opacity).toBeCloseTo(0.5, 5);
    expect(at15.L1.scale).toBeCloseTo(1.06, 5);

    // t = 0.30: fully faded out, scale 1.07
    const at30 = plateOpacities(travelStart + TRAVEL * 0.30);
    expect(at30.L1.opacity).toBeCloseTo(0, 5);
    expect(at30.L1.scale).toBeCloseTo(1.07, 5);
  });

  it('ensures only world is visible between [0.30, 0.70] of travel', () => {
    const travelStart = 0.12;
    const midTravel = plateOpacities(travelStart + TRAVEL * 0.50);

    // All plates must be opacity 0
    expect(midTravel.L1.opacity).toBe(0);
    expect(midTravel.L48.opacity).toBe(0);
    expect(midTravel.L96.opacity).toBe(0);
    expect(midTravel.L144.opacity).toBe(0);
  });

  it('fades in arriving plate over [0.70, 1.0] of travel', () => {
    const travelStart = 0.12;

    // t = 0.70: arriving plate starts fade-in at scale 1.06
    const at70 = plateOpacities(travelStart + TRAVEL * 0.70);
    expect(at70.L48.opacity).toBeCloseTo(0, 5);
    expect(at70.L48.scale).toBeCloseTo(1.06, 5);

    // t = 0.85: halfway through arrival, opacity 0.5, scale 1.04
    const at85 = plateOpacities(travelStart + TRAVEL * 0.85);
    expect(at85.L48.opacity).toBeCloseTo(0.5, 5);
    expect(at85.L48.scale).toBeCloseTo(1.04, 5);

    // t = 1.0 (start of next dwell): fully arrived, scale 1.02
    const at100 = plateOpacities(dwellStart('L48'));
    expect(at100.L48.opacity).toBeCloseTo(1, 5);
    expect(at100.L48.scale).toBeCloseTo(1.02, 5);
  });
});

describe('panelStyles (Section 10.4)', () => {
  it('is visible (opacity 1, y 0, inert false) during dwell', () => {
    const styles = panelStyles(0.06);
    expect(styles.L1.opacity).toBe(1);
    expect(styles.L1.y).toBe(0);
    expect(styles.L1.inert).toBe(false);

    // Other panels hidden and inert
    expect(styles.L48.opacity).toBe(0);
    expect(styles.L48.inert).toBe(true);
    expect(styles.L96.opacity).toBe(0);
    expect(styles.L96.inert).toBe(true);
    expect(styles.L144.opacity).toBe(0);
    expect(styles.L144.inert).toBe(true);
  });

  it('leaves over t in [0.10, 0.35]: opacity 1 to 0 and y 0 to -16px', () => {
    const travelStart = 0.12;

    // t < 0.10: remains visible
    const beforeLeave = panelStyles(travelStart + TRAVEL * 0.05);
    expect(beforeLeave.L1.opacity).toBe(1);
    expect(beforeLeave.L1.y).toBe(0);
    expect(beforeLeave.L1.inert).toBe(false);

    // t = 0.225 (midpoint of [0.10, 0.35]): opacity 0.5, y -8px, inert false
    const midLeave = panelStyles(travelStart + TRAVEL * 0.225);
    expect(midLeave.L1.opacity).toBeCloseTo(0.5, 5);
    expect(midLeave.L1.y).toBeCloseTo(-8, 5);
    expect(midLeave.L1.inert).toBe(false);

    // t = 0.30: opacity 0.2, inert true (opacity < 0.5)
    const lateLeave = panelStyles(travelStart + TRAVEL * 0.30);
    expect(lateLeave.L1.opacity).toBeCloseTo(0.2, 5);
    expect(lateLeave.L1.y).toBeCloseTo(-12.8, 5);
    expect(lateLeave.L1.inert).toBe(true);

    // t = 0.35: fully left, opacity 0, y -16px, inert true
    const fullyLeft = panelStyles(travelStart + TRAVEL * 0.35);
    expect(fullyLeft.L1.opacity).toBeCloseTo(0, 5);
    expect(fullyLeft.L1.y).toBeCloseTo(-16, 5);
    expect(fullyLeft.L1.inert).toBe(true);
  });

  it('has zero panel overlap between [0.35, 0.65]', () => {
    const travelStart = 0.12;
    const midTravel = panelStyles(travelStart + TRAVEL * 0.50);

    for (const id of LEVEL_IDS) {
      expect(midTravel[id].opacity).toBe(0);
      expect(midTravel[id].inert).toBe(true);
    }
  });

  it('arrives over t in [0.65, 0.90]: opacity 0 to 1 and y +16px to 0', () => {
    const travelStart = 0.12;

    // t < 0.65: hidden
    const beforeArrive = panelStyles(travelStart + TRAVEL * 0.60);
    expect(beforeArrive.L48.opacity).toBe(0);
    expect(beforeArrive.L48.y).toBe(16);
    expect(beforeArrive.L48.inert).toBe(true);

    // t = 0.775 (midpoint): opacity 0.5, y +8px, inert false
    const midArrive = panelStyles(travelStart + TRAVEL * 0.775);
    expect(midArrive.L48.opacity).toBeCloseTo(0.5, 5);
    expect(midArrive.L48.y).toBeCloseTo(8, 5);
    expect(midArrive.L48.inert).toBe(false);

    // t = 0.90: fully arrived, opacity 1, y 0, inert false
    const arrived = panelStyles(travelStart + TRAVEL * 0.90);
    expect(arrived.L48.opacity).toBeCloseTo(1, 5);
    expect(arrived.L48.y).toBeCloseTo(0, 5);
    expect(arrived.L48.inert).toBe(false);

    // Stagger offset increases during arrival
    expect(midArrive.L48.childStaggerOffset).toBeCloseTo(0.775 - 0.65, 5);
  });
});

describe('nearestDwell Snapping Logic (Section 11.2)', () => {
  it('returns current progress and level when inside a dwell (no snap)', () => {
    const res1 = nearestDwell(0.05, 1);
    expect(res1.targetProgress).toBe(0.05);
    expect(res1.levelId).toBe('L1');

    const res2 = nearestDwell(0.05, -1);
    expect(res2.targetProgress).toBe(0.05);
    expect(res2.levelId).toBe('L1');
  });

  it('snaps with direction = 1 (down)', () => {
    const travelStart = 0.12;
    const l48DwellStart = dwellStart('L48');
    const l1DwellEnd = DWELL;

    // t = 0.30 (> 0.25): snaps to next dwell (L48)
    const forwardSnap = nearestDwell(travelStart + TRAVEL * 0.30, 1);
    expect(forwardSnap.levelId).toBe('L48');
    expect(forwardSnap.targetProgress).toBeCloseTo(l48DwellStart, 5);

    // t = 0.10 (<= 0.25): falls back to nearest dwell edge (L1 end)
    const fallbackSnap = nearestDwell(travelStart + TRAVEL * 0.10, 1);
    expect(fallbackSnap.levelId).toBe('L1');
    expect(fallbackSnap.targetProgress).toBeCloseTo(l1DwellEnd, 5);
  });

  it('snaps with direction = -1 (up)', () => {
    const travelStart = 0.12;
    const l48DwellStart = dwellStart('L48');
    const l1DwellEnd = DWELL;

    // t = 0.50 (< 0.75): snaps to previous dwell (L1 end)
    const backwardSnap = nearestDwell(travelStart + TRAVEL * 0.50, -1);
    expect(backwardSnap.levelId).toBe('L1');
    expect(backwardSnap.targetProgress).toBeCloseTo(l1DwellEnd, 5);

    // t = 0.85 (>= 0.75): falls back to nearest dwell edge (L48 start)
    const fallbackSnap = nearestDwell(travelStart + TRAVEL * 0.85, -1);
    expect(fallbackSnap.levelId).toBe('L48');
    expect(fallbackSnap.targetProgress).toBeCloseTo(l48DwellStart, 5);
  });
});

describe('cameraAt Interpolations (Section 10.3)', () => {
  const testLevels = [
    { id: 'L1', cy: 0.17, zoom: 3.2 },
    { id: 'L48', cy: 0.39, zoom: 3.2 },
    { id: 'L96', cy: 0.62, zoom: 3.2 },
    { id: 'L144', cy: 0.88, zoom: 3.0 },
  ];

  it('fixes camera at level values during dwell', () => {
    const camL1 = cameraAt(0.06, testLevels);
    expect(camL1.cx).toBe(0.5);
    expect(camL1.cy).toBe(0.17);
    expect(camL1.zoom).toBe(3.2);

    const camL48 = cameraAt(dwellStart('L48') + 0.05, testLevels);
    expect(camL48.cx).toBe(0.5);
    expect(camL48.cy).toBe(0.39);
    expect(camL48.zoom).toBe(3.2);
  });

  it('interpolates cy and zoom with dip during travel', () => {
    const travelStart = 0.12;

    // At t = 0: exactly matches L1
    const at0 = cameraAt(travelStart, testLevels);
    expect(at0.cy).toBeCloseTo(0.17, 5);
    expect(at0.zoom).toBeCloseTo(3.2, 5);

    // At t = 0.5: cy is halfway between 0.17 and 0.39 = 0.28
    // zoom has dip applied: 3.2 * (1 - 0.12 * sin(pi * 0.5)) = 3.2 * (1 - 0.12) = 3.2 * 0.88 = 2.816
    const atHalf = cameraAt(travelStart + TRAVEL * 0.5, testLevels);
    expect(atHalf.cy).toBeCloseTo(0.28, 5);
    expect(atHalf.zoom).toBeCloseTo(3.2 * 0.88, 5);

    // At t = 1.0 (start of L48): matches L48 exactly
    const at1 = cameraAt(dwellStart('L48'), testLevels);
    expect(at1.cy).toBeCloseTo(0.39, 5);
    expect(at1.zoom).toBeCloseTo(3.2, 5);
  });

  it('respects custom travelZoomDip configuration', () => {
    const travelStart = 0.12;
    const atHalfCustom = cameraAt(travelStart + TRAVEL * 0.5, testLevels, {
      travelZoomDip: 0.2,
    });
    // zoom: 3.2 * (1 - 0.2) = 2.56
    expect(atHalfCustom.zoom).toBeCloseTo(3.2 * 0.8, 5);
  });

  it('interpolates custom cx between levels during travel', () => {
    const levelsWithCx = [
      { id: 'L1', cx: 0.48, cy: 0.17, zoom: 2.8 },
      { id: 'L48', cx: 0.52, cy: 0.39, zoom: 2.8 },
      { id: 'L96', cx: 0.50, cy: 0.62, zoom: 2.8 },
      { id: 'L144', cx: 0.50, cy: 0.88, zoom: 2.8 },
    ];

    // During dwell L1: cx is exactly 0.48
    expect(cameraAt(0.05, levelsWithCx).cx).toBeCloseTo(0.48, 5);

    // During travel L1 -> L48: at t = 0.5, cx is halfway between 0.48 and 0.52 = 0.50
    const travelStart = 0.12;
    const atHalf = cameraAt(travelStart + TRAVEL * 0.5, levelsWithCx);
    expect(atHalf.cx).toBeCloseTo(0.50, 5);

    // During dwell L48: cx is exactly 0.52
    expect(cameraAt(dwellStart('L48') + 0.05, levelsWithCx).cx).toBeCloseTo(0.52, 5);
  });
});

describe('Camera World Transform (src/lib/camera.ts)', () => {
  it('computes desktop world transform correctly matching section 7.2', () => {
    const viewport = { width: 1440, height: 900 };
    const leftColWidth = 450;
    const camera = { cx: 0.5, cy: 0.5, zoom: 1 };

    const res = computeWorldTransform(camera, viewport, leftColWidth, false);

    // Desktop anchorX = leftColWidth + (viewport.width - leftColWidth) / 2
    // 450 + (1440 - 450) / 2 = 450 + 495 = 945
    expect(res.anchorX).toBe(945);
    expect(res.anchorY).toBe(450);

    // W0 = 900 * 0.5581395 = 502.32555
    const W0 = 900 * 0.5581395;
    const expectedX = 945 - 0.5 * W0 * 1;
    const expectedY = 450 - 0.5 * 900 * 1; // 450 - 450 = 0

    expect(res.translateX).toBeCloseTo(expectedX, 4);
    expect(res.translateY).toBeCloseTo(expectedY, 4);
    expect(res.transform).toBe(
      `translate3d(${expectedX}px, ${expectedY}px, 0px) scale(1)`
    );
  });

  it('computes mobile world transform correctly centering shaft', () => {
    const viewport = { width: 390, height: 844 };
    const leftColWidth = 0;
    const camera = { cx: 0.5, cy: 0.17, zoom: 3.2 };

    const res = computeWorldTransform(camera, viewport, leftColWidth, true);

    // Mobile anchorX = viewport.width / 2 = 195
    expect(res.anchorX).toBe(195);
    expect(res.anchorY).toBe(422);
    expect(res.scale).toBe(3.2);
  });

  it('computes inside-stage world transform correctly centering shaft in right stage (inStage = true)', () => {
    const viewport = { width: 1440, height: 900 };
    const leftColWidth = 1440 * 0.40; // 576px
    const camera = { cx: 0.5, cy: 0.5, zoom: 0.88 };

    const res = computeWorldTransform(camera, viewport, leftColWidth, false, undefined, true);

    // stageWidth = 1440 - 576 = 864px
    // anchorX in stage = 864 / 2 = 432px
    expect(res.anchorX).toBe(432);
    expect(res.anchorY).toBe(450);
    expect(res.scale).toBe(0.88);
  });
});

describe('Zustand Store (src/lib/store.ts)', () => {
  it('initializes with default spiral state and updates correctly', () => {
    const state = useSpiralStore.getState();
    expect(state.mode).toBe('A');
    expect(state.activeLevel).toBe('L1');
    expect(state.hoverLevel).toBe(null);
    expect(state.progress).toBe(0);
    expect(state.isJumping).toBe(false);
    expect(state.reducedMotion).toBe(false);
    expect(state.assetsReady).toEqual({ line: false, photo: false, plates: false });

    // Test actions
    state.setMode('toB');
    expect(useSpiralStore.getState().mode).toBe('toB');

    state.setActiveLevel('L48');
    expect(useSpiralStore.getState().activeLevel).toBe('L48');

    state.setHoverLevel('L96');
    expect(useSpiralStore.getState().hoverLevel).toBe('L96');

    state.setProgress(0.45);
    expect(useSpiralStore.getState().progress).toBe(0.45);

    state.setIsJumping(true);
    expect(useSpiralStore.getState().isJumping).toBe(true);

    state.setReducedMotion(true);
    expect(useSpiralStore.getState().reducedMotion).toBe(true);

    state.setAssetsReady({ line: true, photo: true });
    expect(useSpiralStore.getState().assetsReady).toEqual({
      line: true,
      photo: true,
      plates: false,
    });

    state.reset();
    expect(useSpiralStore.getState().mode).toBe('A');
    expect(useSpiralStore.getState().assetsReady.line).toBe(false);
  });
});

describe('trackYAt Vertical Ribbon Translation (src/lib/timeline.ts)', () => {
  const H = 900;

  it('keeps track stationary at levelIndex * H during dwells', () => {
    // Dwell L1: y = 0
    expect(trackYAt(0, H)).toBe(0);
    expect(trackYAt(0.06, H)).toBe(0);
    expect(trackYAt(DWELL - 0.001, H)).toBe(0);

    // Dwell L48: y = 1 * H = 900
    const l48Start = dwellStart('L48');
    expect(trackYAt(l48Start, H)).toBe(H);
    expect(trackYAt(l48Start + 0.05, H)).toBe(H);

    // Dwell L96: y = 2 * H = 1800
    const l96Start = dwellStart('L96');
    expect(trackYAt(l96Start, H)).toBe(2 * H);
    expect(trackYAt(l96Start + 0.05, H)).toBe(2 * H);

    // Dwell L144: y = 3 * H = 2700
    const l144Start = dwellStart('L144');
    expect(trackYAt(l144Start, H)).toBe(3 * H);
    expect(trackYAt(1.0, H)).toBe(3 * H);
  });

  it('interpolates smoothly between levels during travel segments', () => {
    const travelStart = DWELL;

    // t = 0 of travel: exactly 0
    expect(trackYAt(travelStart, H)).toBe(0);

    // t = 0.5 of travel: halfway between 0 and H = 450
    expect(trackYAt(travelStart + TRAVEL * 0.5, H)).toBeCloseTo(H * 0.5, 3);

    // t = 1.0 of travel: exactly H
    expect(trackYAt(dwellStart('L48'), H)).toBe(H);
  });
});

describe('Input Intent Detection (src/lib/input.ts)', () => {
  beforeEach(() => {
    resetInputState();
  });

  it('accumulates wheel delta and detects entry intent with safeguard threshold 80', () => {
    const t0 = 1000;

    // Small scrolls do not trigger entry
    expect(shouldTriggerEntry(25, t0)).toBe(false);
    expect(shouldTriggerEntry(25, t0 + 100)).toBe(false); // sum = 50 <= 80

    // Third scroll pushes sum to 85 > 80 within 400ms -> triggers entry!
    expect(shouldTriggerEntry(35, t0 + 200)).toBe(true);

    // Buffer clears after trigger
    expect(shouldTriggerEntry(20, t0 + 250)).toBe(false);

    // Old samples past 400ms window are pruned
    resetInputState();
    expect(shouldTriggerEntry(50, t0)).toBe(false);
    expect(shouldTriggerEntry(40, t0 + 450)).toBe(false); // first sample expired, 40 <= 80
  });

  it('respects Mode A cooldown after returning to drawing', () => {
    const t0 = 3000;
    setModeACooldown(800, t0);

    expect(isModeACooldown(t0 + 200)).toBe(true);
    // Should NOT trigger during cooldown even with large scroll
    expect(shouldTriggerEntry(200, t0 + 200)).toBe(false);

    // After cooldown expires
    expect(isModeACooldown(t0 + 900)).toBe(false);
    expect(shouldTriggerEntry(90, t0 + 900)).toBe(true);
  });

  it('detects back to drawing overscroll intent (section 11.4)', () => {
    const t0 = 2000;

    // When scrollY > 0, does not trigger and clears buffer
    expect(shouldTriggerBackToDrawing(100, -100, t0)).toBe(false);

    // When scrollY = 0, accumulates upward wheel (negative deltaY)
    expect(shouldTriggerBackToDrawing(0, -100, t0 + 50)).toBe(false); // total = -100
    expect(shouldTriggerBackToDrawing(0, -100, t0 + 100)).toBe(false); // total = -200

    // Exceeds -240 within 600ms -> triggers!
    expect(shouldTriggerBackToDrawing(0, -50, t0 + 200)).toBe(true); // total = -250 <= -240
  });

  it('accumulateWheelDelta generic helper works with custom thresholds', () => {
    const t0 = 5000;
    expect(accumulateWheelDelta(20, 200, 50, t0)).toBe(false);
    expect(accumulateWheelDelta(35, 200, 50, t0 + 50)).toBe(true); // total = 55 > 50
  });
});

describe('Background Color Sampling & Interpolation (src/lib/timeline.ts)', () => {
  it('has sampled background colors matching images', () => {
    expect(LEVEL_BG_COLORS.A).toEqual({ r: 28, g: 31, b: 34 });
    expect(LEVEL_BG_COLORS.L1).toEqual({ r: 13, g: 19, b: 21 });
    expect(LEVEL_BG_COLORS.L48).toEqual({ r: 20, g: 22, b: 20 });
    expect(LEVEL_BG_COLORS.L96).toEqual({ r: 17, g: 27, b: 29 });
    expect(LEVEL_BG_COLORS.L144).toEqual({ r: 28, g: 23, b: 19 });
  });

  it('returns solid level color during dwells', () => {
    // Dwell L1
    expect(bgColorAt(0)).toBe('rgb(13, 19, 21)');
    expect(bgHexAt(0)).toBe('#0d1315');
    expect(bgColorAt(0.06)).toBe('rgb(13, 19, 21)');

    // Dwell L48
    const l48P = dwellStart('L48') + 0.05;
    expect(bgColorAt(l48P)).toBe('rgb(20, 22, 20)');
    expect(bgHexAt(l48P)).toBe('#141614');

    // Dwell L96
    const l96P = dwellStart('L96') + 0.05;
    expect(bgColorAt(l96P)).toBe('rgb(17, 27, 29)');
    expect(bgHexAt(l96P)).toBe('#111b1d');

    // Dwell L144
    const l144P = dwellStart('L144') + 0.05;
    expect(bgColorAt(l144P)).toBe('rgb(28, 23, 19)');
    expect(bgHexAt(l144P)).toBe('#1c1713');
  });

  it('interpolates smoothly during travel segments', () => {
    const travelStart = DWELL;
    // At travel midpoint between L1 and L48:
    // L1: [13, 19, 21], L48: [20, 22, 20]
    // r: (13 + 20) / 2 = 16.5 -> 17
    // g: (19 + 22) / 2 = 20.5 -> 21
    // b: (21 + 20) / 2 = 20.5 -> 21
    const midTravel = bgColorAt(travelStart + TRAVEL * 0.5);
    expect(midTravel).toBe('rgb(17, 21, 21)');
  });
});

