import React, { useEffect, useState, useRef } from 'react';
import GUI from 'lil-gui';
import manifest from '../../data/manifest.json';
import { useSpiralStore } from '../../lib/store';
import { cameraAt, DWELL, TRAVEL, type LevelId } from '../../lib/timeline';
import styles from '../styles/stage.module.css';

export interface CameraLevelConfig {
  id: string;
  n: number;
  label: string;
  cx: number;
  cy: number;
  zoom: number;
}

export interface CalibrationOverlayProps {
  levels: CameraLevelConfig[];
  onCameraChange?: (
    levelId: LevelId,
    config: { cx: number; cy: number; zoom: number }
  ) => void;
  onJumpLevel?: (levelId: LevelId) => void;
}

export const CalibrationOverlay: React.FC<CalibrationOverlayProps> = ({
  levels,
  onCameraChange,
  onJumpLevel,
}) => {
  const [enabled, setEnabled] = useState(false);
  const [fps, setFps] = useState(60);

  const mode = useSpiralStore((s) => s.mode);
  const progress = useSpiralStore((s) => s.progress);
  const activeLevel = useSpiralStore((s) => s.activeLevel);

  const guiRef = useRef<GUI | null>(null);

  // Check URL param ?debug=1 or toggle with 'P'
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isDebug =
      new URLSearchParams(window.location.search).get('debug') === '1';
    if (isDebug) {
      setEnabled(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't toggle if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 'p' || e.key === 'P') {
        setEnabled((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // FPS calculation
  useEffect(() => {
    if (!enabled) return;
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = (now: number) => {
      frameCount++;
      if (now >= lastTime + 500) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, [enabled]);

  // lil-gui setup with live sliders for cx, cy, zoom per level
  useEffect(() => {
    if (!enabled) {
      if (guiRef.current) {
        guiRef.current.destroy();
        guiRef.current = null;
      }
      return;
    }

    const gui = new GUI({ title: 'Silo Shaft Calibration' });
    guiRef.current = gui;

    const getLevel = (id: string) =>
      levels.find((l) => l.id === id) ??
      manifest.levels.find((l) => l.id === id) ?? {
        cx: 0.5,
        cy: 0.5,
        zoom: 2.8,
      };

    const l1 = getLevel('L1');
    const l48 = getLevel('L48');
    const l96 = getLevel('L96');
    const l144 = getLevel('L144');

    const config = {
      // Level 01
      L1_cx: l1.cx ?? 0.5,
      L1_cy: l1.cy,
      L1_zoom: l1.zoom,
      jumpL1: () => onJumpLevel?.('L1'),

      // Level 48
      L48_cx: l48.cx ?? 0.5,
      L48_cy: l48.cy,
      L48_zoom: l48.zoom,
      jumpL48: () => onJumpLevel?.('L48'),

      // Level 96
      L96_cx: l96.cx ?? 0.5,
      L96_cy: l96.cy,
      L96_zoom: l96.zoom,
      jumpL96: () => onJumpLevel?.('L96'),

      // Level 144
      L144_cx: l144.cx ?? 0.5,
      L144_cy: l144.cy,
      L144_zoom: l144.zoom,
      jumpL144: () => onJumpLevel?.('L144'),

      // Global settings
      DWELL,
      TRAVEL,
      travelZoomDip: 0.0,

      // Copy config
      copyConfig: () => {
        const exported = {
          world: manifest.world,
          levels: [
            {
              id: 'L1',
              n: 1,
              label: 'Work',
              cx: Number(config.L1_cx.toFixed(3)),
              cy: Number(config.L1_cy.toFixed(3)),
              zoom: Number(config.L1_zoom.toFixed(2)),
            },
            {
              id: 'L48',
              n: 48,
              label: 'Process',
              cx: Number(config.L48_cx.toFixed(3)),
              cy: Number(config.L48_cy.toFixed(3)),
              zoom: Number(config.L48_zoom.toFixed(2)),
            },
            {
              id: 'L96',
              n: 96,
              label: 'Hiking & food',
              cx: Number(config.L96_cx.toFixed(3)),
              cy: Number(config.L96_cy.toFixed(3)),
              zoom: Number(config.L96_zoom.toFixed(2)),
            },
            {
              id: 'L144',
              n: 144,
              label: 'Unsaid Moments',
              cx: Number(config.L144_cx.toFixed(3)),
              cy: Number(config.L144_cy.toFixed(3)),
              zoom: Number(config.L144_zoom.toFixed(2)),
            },
          ],
        };
        const jsonStr = JSON.stringify(exported, null, 2);
        navigator.clipboard?.writeText(jsonStr);
        alert('Config copied to clipboard! Ready to paste into src/data/manifest.json');
      },
    };

    // Level 01 Folder
    const fL1 = gui.addFolder('Level 01: Work');
    fL1.add(config, 'jumpL1').name('🎯 Jump to Level 01');
    fL1
      .add(config, 'L1_cx', 0.35, 0.65, 0.002)
      .name('cx (shaft X)')
      .onChange((v: number) => {
        onCameraChange?.('L1', { cx: v, cy: config.L1_cy, zoom: config.L1_zoom });
      });
    fL1
      .add(config, 'L1_cy', 0.05, 0.95, 0.005)
      .name('cy (shaft Y)')
      .onChange((v: number) => {
        onCameraChange?.('L1', { cx: config.L1_cx, cy: v, zoom: config.L1_zoom });
      });
    fL1
      .add(config, 'L1_zoom', 1.0, 5.0, 0.05)
      .name('zoom (width)')
      .onChange((v: number) => {
        onCameraChange?.('L1', { cx: config.L1_cx, cy: config.L1_cy, zoom: v });
      });

    // Level 48 Folder
    const fL48 = gui.addFolder('Level 48: Process');
    fL48.add(config, 'jumpL48').name('🎯 Jump to Level 48');
    fL48
      .add(config, 'L48_cx', 0.35, 0.65, 0.002)
      .name('cx (shaft X)')
      .onChange((v: number) => {
        onCameraChange?.('L48', { cx: v, cy: config.L48_cy, zoom: config.L48_zoom });
      });
    fL48
      .add(config, 'L48_cy', 0.05, 0.95, 0.005)
      .name('cy (shaft Y)')
      .onChange((v: number) => {
        onCameraChange?.('L48', { cx: config.L48_cx, cy: v, zoom: config.L48_zoom });
      });
    fL48
      .add(config, 'L48_zoom', 1.0, 5.0, 0.05)
      .name('zoom (width)')
      .onChange((v: number) => {
        onCameraChange?.('L48', { cx: config.L48_cx, cy: config.L48_cy, zoom: v });
      });

    // Level 96 Folder
    const fL96 = gui.addFolder('Level 96: Hiking & Food');
    fL96.add(config, 'jumpL96').name('🎯 Jump to Level 96');
    fL96
      .add(config, 'L96_cx', 0.35, 0.65, 0.002)
      .name('cx (shaft X)')
      .onChange((v: number) => {
        onCameraChange?.('L96', { cx: v, cy: config.L96_cy, zoom: config.L96_zoom });
      });
    fL96
      .add(config, 'L96_cy', 0.05, 0.95, 0.005)
      .name('cy (shaft Y)')
      .onChange((v: number) => {
        onCameraChange?.('L96', { cx: config.L96_cx, cy: v, zoom: config.L96_zoom });
      });
    fL96
      .add(config, 'L96_zoom', 1.0, 5.0, 0.05)
      .name('zoom (width)')
      .onChange((v: number) => {
        onCameraChange?.('L96', { cx: config.L96_cx, cy: config.L96_cy, zoom: v });
      });

    // Level 144 Folder
    const fL144 = gui.addFolder('Level 144: Unsaid Moments');
    fL144.add(config, 'jumpL144').name('🎯 Jump to Level 144');
    fL144
      .add(config, 'L144_cx', 0.35, 0.65, 0.002)
      .name('cx (shaft X)')
      .onChange((v: number) => {
        onCameraChange?.('L144', { cx: v, cy: config.L144_cy, zoom: config.L144_zoom });
      });
    fL144
      .add(config, 'L144_cy', 0.05, 0.95, 0.005)
      .name('cy (shaft Y)')
      .onChange((v: number) => {
        onCameraChange?.('L144', { cx: config.L144_cx, cy: v, zoom: config.L144_zoom });
      });
    fL144
      .add(config, 'L144_zoom', 1.0, 5.0, 0.05)
      .name('zoom (width)')
      .onChange((v: number) => {
        onCameraChange?.('L144', { cx: config.L144_cx, cy: config.L144_cy, zoom: v });
      });

    // Actions
    gui.add(config, 'copyConfig').name('📋 Copy Config JSON');

    return () => {
      gui.destroy();
      guiRef.current = null;
    };
  }, [enabled, levels, onCameraChange, onJumpLevel]);

  if (!enabled) return null;

  const currentCam = cameraAt(progress, levels);

  return (
    <div className={styles.calibrationOverlay}>
      <div>
        mode: <span className={styles.calibrationValue}>{mode}</span>
      </div>
      <div>
        progress:{' '}
        <span className={styles.calibrationValue}>{progress.toFixed(4)}</span>
      </div>
      <div>
        activeLevel:{' '}
        <span className={styles.calibrationValue}>{activeLevel}</span>
      </div>
      <div>
        camera: cx=
        <span className={styles.calibrationValue}>{currentCam.cx.toFixed(3)}</span>{' '}
        cy=
        <span className={styles.calibrationValue}>{currentCam.cy.toFixed(3)}</span>{' '}
        zoom=
        <span className={styles.calibrationValue}>{currentCam.zoom.toFixed(2)}</span>
      </div>
      <div>
        fps: <span className={styles.calibrationValue}>{fps}</span>
      </div>
      <div style={{ marginTop: '4px', opacity: 0.7, fontSize: '10px' }}>
        Press P to toggle GUI · Drag cx/zoom to align shaft
      </div>
    </div>
  );
};

export default CalibrationOverlay;
