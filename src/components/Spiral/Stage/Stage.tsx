import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useSpiralStore } from '@/lib/store';
import {
  type LevelId,
  dwellStart,
  dwellLength,
  cameraAt,
  travelShadowOpacity,
  LEVEL_BG_COLORS,
  bgColorAt,
} from '@/lib/timeline';
import {
  computeWorldTransform,
  WORLD_ASPECT_RATIO,
  type CameraState,
} from '@/lib/camera';
import { setModeACooldown, resetInputState } from '@/lib/input';
import manifest from '@/data/manifest.json';

import { WorldLayers, type WorldLayersHandle } from './WorldLayers';
import { PlateLayers, type PlateLayersHandle } from './PlateLayers';
import { Atmosphere, type AtmosphereHandle } from './Atmosphere';
import { LevelMarkers } from './LevelMarkers';
import { LevelRail, type LevelRailHandle } from './LevelRail';
import { BackButton, type BackButtonHandle } from './BackButton';
import { CalibrationOverlay } from './CalibrationOverlay';
import styles from '../styles/stage.module.css';

export interface StageProps {
  onSelectLevel?: (levelId: LevelId) => void;
  onBackToDrawing?: () => void;
  className?: string;
}

export const Stage: React.FC<StageProps> = ({
  onSelectLevel,
  onBackToDrawing,
  className,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const shaftWorldRef = useRef<HTMLDivElement>(null);
  const darkShadowRef = useRef<HTMLDivElement>(null);
  const worldLayersRef = useRef<WorldLayersHandle>(null);
  const plateLayersRef = useRef<PlateLayersHandle>(null);
  const atmosphereRef = useRef<AtmosphereHandle>(null);
  const levelRailRef = useRef<LevelRailHandle>(null);
  const backButtonRef = useRef<BackButtonHandle>(null);

  // Zustand Store
  const mode = useSpiralStore((s) => s.mode);
  const activeLevel = useSpiralStore((s) => s.activeLevel);
  const reducedMotion = useSpiralStore((s) => s.reducedMotion);
  const setMode = useSpiralStore((s) => s.setMode);
  const setActiveLevel = useSpiralStore((s) => s.setActiveLevel);
  const setProgress = useSpiralStore((s) => s.setProgress);

  // Live configurable camera levels (allows interactive cx/cy/zoom calibration)
  const [levels, setLevels] = useState(manifest.levels);
  const levelsRef = useRef(levels);
  levelsRef.current = levels;

  // Viewport and layout measurement (40% content / 60% stage)
  const [viewport, setViewport] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  });

  const isMobile = viewport.width < 768;
  // Stage is full 100vw, Silo building centered dead-center at 50vw in middle of page
  const leftColWidth = 0;

  const viewportRef = useRef(viewport);
  viewportRef.current = viewport;

  // Active animation timeline ref
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const lastProgressRef = useRef<number>(0);

  // Helper to apply camera transform to shaftWorldRef (inside stage coordinates)
  const applyTransform = useCallback(
    (cam: CameraState) => {
      if (!shaftWorldRef.current) return;
      const { transform } = computeWorldTransform(
        cam,
        viewportRef.current,
        leftColWidth,
        isMobile,
        WORLD_ASPECT_RATIO,
        true
      );
      shaftWorldRef.current.style.transform = transform;
    },
    [leftColWidth, isMobile]
  );

  // Live calibration update from CalibrationOverlay
  const handleCameraChange = useCallback(
    (levelId: LevelId, cfg: { cx: number; cy: number; zoom: number }) => {
      setLevels((prev) => {
        const next = prev.map((l) => (l.id === levelId ? { ...l, ...cfg } : l));
        levelsRef.current = next;
        return next;
      });

      const storeState = useSpiralStore.getState();
      if (storeState.mode === 'B') {
        const cam = cameraAt(storeState.progress, levelsRef.current, {
          travelZoomDip: 0,
        });
        applyTransform(cam);
      }
    },
    [applyTransform]
  );

  // Helper to apply background color smoothly to root and body
  const applyBg = (col: string) => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--bg', col);
      document.body.style.backgroundColor = col;
    }
  };

  // ResizeObserver / window resize
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setViewport({ width: w, height: h });

      const storeState = useSpiralStore.getState();
      if (storeState.mode === 'A') {
        const camA: CameraState = {
          cx: 0.5,
          cy: 0.5,
          zoom: w < 768 ? 0.7 : 0.88,
        };
        applyTransform(camA);
      } else if (storeState.mode === 'B') {
        const camB = cameraAt(storeState.progress, levelsRef.current, {
          travelZoomDip: 0,
        });
        applyTransform(camB);
        plateLayersRef.current?.updatePlates(storeState.progress);
        atmosphereRef.current?.updateAtmosphere(storeState.progress, 0);
        levelRailRef.current?.updateRail(
          storeState.progress,
          storeState.activeLevel
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [applyTransform]);

  // Initial and Mode-based visibility setup
  useEffect(() => {
    if (mode === 'A') {
      const camA: CameraState = {
        cx: 0.5,
        cy: 0.5,
        zoom: isMobile ? 0.7 : 0.88,
      };
      applyTransform(camA);
      worldLayersRef.current?.setLineOpacity(1, 0);
      worldLayersRef.current?.setPhotoOpacity(0);
      plateLayersRef.current?.setOpacity(0);
      if (darkShadowRef.current) darkShadowRef.current.style.opacity = '0';
      atmosphereRef.current?.updateAtmosphere(0, 0);
      levelRailRef.current?.setOpacity(0);
      backButtonRef.current?.setOpacity(0);
      applyBg(
        `rgb(${LEVEL_BG_COLORS.A.r}, ${LEVEL_BG_COLORS.A.g}, ${LEVEL_BG_COLORS.A.b})`
      );
    } else if (mode === 'B') {
      const curP = useSpiralStore.getState().progress;
      const camB = cameraAt(curP, levelsRef.current, { travelZoomDip: 0 });
      applyTransform(camB);
      worldLayersRef.current?.setLineOpacity(0, 0);
      worldLayersRef.current?.setPhotoOpacity(1);
      plateLayersRef.current?.setOpacity(0);
      if (darkShadowRef.current) {
        darkShadowRef.current.style.opacity = travelShadowOpacity(curP).toFixed(3);
      }
      levelRailRef.current?.setOpacity(1);
      backButtonRef.current?.setOpacity(1);
      levelRailRef.current?.updateRail(curP, activeLevel);
      applyBg(bgColorAt(curP));
    }
  }, [mode, activeLevel, applyTransform, isMobile]);

  // Per-frame GSAP Ticker for Mode B scrolling (Zoom 2.8, constant width, moving cy, shadow, color)
  useEffect(() => {
    const onTick = () => {
      const storeState = useSpiralStore.getState();
      if (storeState.mode !== 'B') return;

      const p = storeState.progress;
      const scrollVel = (p - lastProgressRef.current) * 10;
      lastProgressRef.current = p;

      // 1. Camera Transform in Mode B (cx, cy, zoom driven by calibrated levels)
      const cam = cameraAt(p, levelsRef.current, { travelZoomDip: 0 });
      applyTransform(cam);

      // 2. Stacked plates opacity & drift
      plateLayersRef.current?.updatePlates(p);

      // 3. Dark Shadow Overlay between levels (peaks at travel midpoint)
      if (darkShadowRef.current) {
        darkShadowRef.current.style.opacity = travelShadowOpacity(p).toFixed(3);
      }

      // 4. Smooth 60fps Background Color Interpolation matching sampled image palettes
      applyBg(bgColorAt(p));

      // 5. Atmosphere layers
      atmosphereRef.current?.updateAtmosphere(p, scrollVel);

      // 6. Level Rail
      levelRailRef.current?.updateRail(p, storeState.activeLevel);
    };

    gsap.ticker.add(onTick);
    return () => gsap.ticker.remove(onTick);
  }, [applyTransform]);

  // Morph Transition A -> B (Zoom in, translate to calibrated cx/cy, crossfade to plates, smooth color shift)
  const transitionToLevel = useCallback(
    (targetId: LevelId) => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      setMode('toB');
      setActiveLevel(targetId);

      const targetLvl =
        levelsRef.current.find((l) => l.id === targetId) ?? levelsRef.current[0];
      const p0 = dwellStart(targetId) + 0.25 * dwellLength();
      const targetBg = LEVEL_BG_COLORS[targetId];
      const initialZoom = isMobile ? 0.7 : 0.88;

      // Reduced motion instant crossfade
      if (reducedMotion) {
        applyTransform({
          cx: targetLvl.cx ?? 0.5,
          cy: targetLvl.cy,
          zoom: targetLvl.zoom,
        });
        worldLayersRef.current?.setLineOpacity(0, 0);
        worldLayersRef.current?.setPhotoOpacity(1);
        plateLayersRef.current?.setOpacity(1);
        plateLayersRef.current?.updatePlates(p0);
        if (darkShadowRef.current) darkShadowRef.current.style.opacity = '0';
        atmosphereRef.current?.setGradeOpacity(1);
        atmosphereRef.current?.setLightShaftOpacity(0.35);
        atmosphereRef.current?.setDustOpacity(1);
        levelRailRef.current?.setOpacity(1);
        backButtonRef.current?.setOpacity(1);
        applyBg(`rgb(${targetBg.r}, ${targetBg.g}, ${targetBg.b})`);

        setMode('B');
        setProgress(p0);
        levelRailRef.current?.updateRail(p0, targetId);

        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', `#level-${targetLvl.n}`);
        }
        return;
      }

      // Smooth Morph Timeline (Jakub Krehel production polish)
      const tl = gsap.timeline({
        onComplete: () => {
          setMode('B');
          setProgress(p0);
          plateLayersRef.current?.updatePlates(p0);
          levelRailRef.current?.updateRail(p0, targetId);
          levelRailRef.current?.setOpacity(1);
          backButtonRef.current?.setOpacity(1);
          applyBg(`rgb(${targetBg.r}, ${targetBg.g}, ${targetBg.b})`);

          if (typeof window !== 'undefined') {
            window.history.replaceState(null, '', `#level-${targetLvl.n}`);
          }
        },
      });
      timelineRef.current = tl;

      // 1. Camera Zoom In & Pan Down: Eases cx, cy, and zoom into target level
      const camObj: CameraState = { cx: 0.5, cy: 0.5, zoom: initialZoom };
      tl.to(
        camObj,
        {
          cx: targetLvl.cx ?? 0.5,
          cy: targetLvl.cy,
          zoom: targetLvl.zoom,
          duration: 0.72,
          ease: 'cubic-bezier(0.77, 0, 0.175, 1)',
          onUpdate: () => {
            applyTransform(camObj);
          },
        },
        0
      );

      // 2. Crossfade: Line drawing fades out while photoreal hero-photo materializes
      const fadeObj = { lineOpacity: 1, photoOpacity: 0, plateOpacity: 0 };
      tl.to(
        fadeObj,
        {
          lineOpacity: 0,
          photoOpacity: 1,
          plateOpacity: 0,
          duration: 0.62,
          ease: 'cubic-bezier(0.77, 0, 0.175, 1)',
          onUpdate: () => {
            worldLayersRef.current?.setLineOpacity(fadeObj.lineOpacity, 0);
            worldLayersRef.current?.setPhotoOpacity(fadeObj.photoOpacity);
            plateLayersRef.current?.setOpacity(0);
          },
        },
        0
      );

      // 3. Smooth Background Color Shift from Mode A to Target Level
      const bgObj = { ...LEVEL_BG_COLORS.A };
      tl.to(
        bgObj,
        {
          r: targetBg.r,
          g: targetBg.g,
          b: targetBg.b,
          duration: 0.65,
          ease: 'cubic-bezier(0.77, 0, 0.175, 1)',
          onUpdate: () => {
            applyBg(
              `rgb(${Math.round(bgObj.r)}, ${Math.round(bgObj.g)}, ${Math.round(
                bgObj.b
              )})`
            );
          },
        },
        0
      );

      // 4. Atmosphere grade and light shaft fade in
      const atmObj = { grade: 0, shaft: 0, dust: 0 };
      tl.to(
        atmObj,
        {
          grade: 1,
          shaft: 0.35,
          dust: 1,
          duration: 0.5,
          ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
          onUpdate: () => {
            atmosphereRef.current?.setGradeOpacity(atmObj.grade);
            atmosphereRef.current?.setLightShaftOpacity(atmObj.shaft);
            atmosphereRef.current?.setDustOpacity(atmObj.dust);
          },
        },
        0.15
      );

      // 5. Rail and Back button fade in
      const navObj = { opacity: 0 };
      tl.to(
        navObj,
        {
          opacity: 1,
          duration: 0.3,
          ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
          onUpdate: () => {
            levelRailRef.current?.setOpacity(navObj.opacity);
            backButtonRef.current?.setOpacity(navObj.opacity);
          },
        },
        0.35
      );
    },
    [
      reducedMotion,
      setMode,
      setActiveLevel,
      setProgress,
      applyTransform,
      isMobile,
    ]
  );

  // Reverse Transition B -> A (Requirement 4: Persists in State A)
  const transitionToDrawing = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setMode('toA');
    setModeACooldown(800);
    resetInputState();

    const currentBg = LEVEL_BG_COLORS[activeLevel] || LEVEL_BG_COLORS.L1;
    const currentLvl =
      levelsRef.current.find((l) => l.id === activeLevel) ?? levelsRef.current[0];
    const targetZoom = isMobile ? 0.7 : 0.88;

    // Reduced motion instant return
    if (reducedMotion) {
      applyTransform({ cx: 0.5, cy: 0.5, zoom: targetZoom });
      plateLayersRef.current?.setOpacity(0);
      worldLayersRef.current?.setPhotoOpacity(0);
      worldLayersRef.current?.setLineOpacity(1, 0);
      if (darkShadowRef.current) darkShadowRef.current.style.opacity = '0';
      levelRailRef.current?.setOpacity(0);
      backButtonRef.current?.setOpacity(0);
      atmosphereRef.current?.setGradeOpacity(0);
      atmosphereRef.current?.setLightShaftOpacity(0);
      atmosphereRef.current?.setDustOpacity(0);
      applyBg(
        `rgb(${LEVEL_BG_COLORS.A.r}, ${LEVEL_BG_COLORS.A.g}, ${LEVEL_BG_COLORS.A.b})`
      );

      setMode('A');
      setProgress(0);
      setActiveLevel('L1');

      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', window.location.pathname);
      }
      return;
    }

    // Smooth return transition: Eases cx back to 0.5, zoom back to 0.88, cy to 0.5
    const tl = gsap.timeline({
      onComplete: () => {
        setMode('A');
        setProgress(0);
        setActiveLevel('L1');
        applyTransform({ cx: 0.5, cy: 0.5, zoom: targetZoom });
        worldLayersRef.current?.setLineOpacity(1, 0);
        worldLayersRef.current?.setPhotoOpacity(0);
        plateLayersRef.current?.setOpacity(0);
        if (darkShadowRef.current) darkShadowRef.current.style.opacity = '0';
        levelRailRef.current?.setOpacity(0);
        backButtonRef.current?.setOpacity(0);
        applyBg(
          `rgb(${LEVEL_BG_COLORS.A.r}, ${LEVEL_BG_COLORS.A.g}, ${LEVEL_BG_COLORS.A.b})`
        );

        // Cooldown and clear inputs so Mode A persists without re-triggering
        setModeACooldown(800);
        resetInputState();

        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', window.location.pathname);
        }
      },
    });
    timelineRef.current = tl;

    // 1. Camera Zoom Out: Eases cx to 0.5, cy to 0.5, zoom to targetZoom
    const camObj: CameraState = {
      cx: currentLvl.cx ?? 0.5,
      cy: currentLvl.cy,
      zoom: currentLvl.zoom,
    };
    tl.to(
      camObj,
      {
        cx: 0.5,
        cy: 0.5,
        zoom: targetZoom,
        duration: 0.65,
        ease: 'cubic-bezier(0.77, 0, 0.175, 1)',
        onUpdate: () => {
          applyTransform(camObj);
        },
      },
      0
    );

    // 2. Fade out rail & back button (ease-out for fast, responsive exit per Emil Kowalski)
    const navObj = { opacity: 1 };
    tl.to(
      navObj,
      {
        opacity: 0,
        duration: 0.22,
        ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
        onUpdate: () => {
          levelRailRef.current?.setOpacity(navObj.opacity);
          backButtonRef.current?.setOpacity(navObj.opacity);
        },
      },
      0
    );

    // 3. Fade out plates and photo, fade in line drawing
    const crossfadeObj = { plateOpacity: 1, photoOpacity: 1, lineOpacity: 0 };
    tl.to(
      crossfadeObj,
      {
        plateOpacity: 0,
        photoOpacity: 0,
        lineOpacity: 1,
        duration: 0.58,
        ease: 'cubic-bezier(0.77, 0, 0.175, 1)',
        onUpdate: () => {
          plateLayersRef.current?.setOpacity(crossfadeObj.plateOpacity);
          worldLayersRef.current?.setPhotoOpacity(crossfadeObj.photoOpacity);
          worldLayersRef.current?.setLineOpacity(crossfadeObj.lineOpacity, 0);
        },
      },
      0.05
    );

    // 4. Fade out shadow if active
    if (darkShadowRef.current) {
      const shadowObj = {
        opacity: parseFloat(darkShadowRef.current.style.opacity || '0'),
      };
      tl.to(
        shadowObj,
        {
          opacity: 0,
          duration: 0.25,
          ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
          onUpdate: () => {
            if (darkShadowRef.current) {
              darkShadowRef.current.style.opacity = shadowObj.opacity.toFixed(3);
            }
          },
        },
        0
      );
    }

    // 5. Smooth Background Color Shift back to Mode A
    const bgObj = { ...currentBg };
    tl.to(
      bgObj,
      {
        r: LEVEL_BG_COLORS.A.r,
        g: LEVEL_BG_COLORS.A.g,
        b: LEVEL_BG_COLORS.A.b,
        duration: 0.58,
        ease: 'cubic-bezier(0.77, 0, 0.175, 1)',
        onUpdate: () => {
          applyBg(
            `rgb(${Math.round(bgObj.r)}, ${Math.round(bgObj.g)}, ${Math.round(
              bgObj.b
            )})`
          );
        },
      },
      0
    );

    // 6. Atmosphere fades back to Mode A ambient
    const atmObj = { grade: 1, shaft: 0.35, dust: 1 };
    tl.to(
      atmObj,
      {
        grade: 0,
        shaft: 0,
        dust: 0,
        duration: 0.4,
        ease: 'power2.in',
        onUpdate: () => {
          atmosphereRef.current?.setGradeOpacity(atmObj.grade);
          atmosphereRef.current?.setLightShaftOpacity(atmObj.shaft);
          atmosphereRef.current?.setDustOpacity(atmObj.dust);
        },
      },
      0.1
    );
  }, [
    activeLevel,
    reducedMotion,
    setMode,
    setActiveLevel,
    setProgress,
    applyTransform,
    isMobile,
  ]);

  // Handle external mode changes to 'toB' and 'toA'
  useEffect(() => {
    if (mode === 'toB') {
      transitionToLevel(activeLevel);
    } else if (mode === 'toA') {
      transitionToDrawing();
    }
  }, [mode, activeLevel, transitionToLevel, transitionToDrawing]);

  // Click handlers
  const handleSelectLevel = (levelId: LevelId) => {
    if (onSelectLevel) {
      onSelectLevel(levelId);
    }
    if (mode === 'A') {
      transitionToLevel(levelId);
    } else if (mode === 'B') {
      setActiveLevel(levelId);
      const p = dwellStart(levelId) + 0.25 * dwellLength();
      setProgress(p);
      const cam = cameraAt(p, levelsRef.current, { travelZoomDip: 0 });
      applyTransform(cam);
      plateLayersRef.current?.updatePlates(p);
      levelRailRef.current?.updateRail(p, levelId);
      applyBg(bgColorAt(p));
    }
  };

  const handleBackToDrawing = () => {
    if (onBackToDrawing) {
      onBackToDrawing();
    }
    transitionToDrawing();
  };

  return (
    <div
      ref={stageRef}
      className={`${styles.stage} ${className || ''}`}
      id="stage"
      aria-label="Shaft Visual Experience"
    >
      {/* Shaft World (Shared transform coordinate system for Drawing and Plates) */}
      <div ref={shaftWorldRef} className={styles.shaftWorld}>
        <WorldLayers ref={worldLayersRef} />
        <PlateLayers ref={plateLayersRef} />
      </div>

      {/* Dark Shadow Overlay between levels (peaks at travel midpoint) */}
      <div
        ref={darkShadowRef}
        className={styles.darkShadowOverlay}
        aria-hidden="true"
      />

      {/* Mode B Atmosphere */}
      <Atmosphere ref={atmosphereRef} isMobile={isMobile} />

      {/* Mode A Level Markers */}
      <LevelMarkers
        viewport={viewport}
        leftColWidth={leftColWidth}
        isMobile={isMobile}
        onSelectLevel={handleSelectLevel}
      />

      {/* Mode B Level Rail */}
      <LevelRail ref={levelRailRef} onSelectLevel={handleSelectLevel} />

      {/* Mode B Back Button */}
      <BackButton ref={backButtonRef} onClick={handleBackToDrawing} />

      {/* Calibration Overlay (debug mode / press P) */}
      <CalibrationOverlay
        levels={levels}
        onCameraChange={handleCameraChange}
        onJumpLevel={handleSelectLevel}
      />
    </div>
  );
};

export default Stage;
