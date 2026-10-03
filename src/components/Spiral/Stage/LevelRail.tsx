import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  LEVEL_IDS,
  type LevelId,
  dwellStart,
  activeLevelAt,
} from '@/lib/timeline';
import manifest from '@/data/manifest.json';
import { useSpiralStore } from '@/lib/store';
import styles from '../styles/stage.module.css';

export interface LevelRailHandle {
  updateRail: (progress: number, activeLevel?: LevelId) => void;
  setOpacity: (opacity: number) => void;
}

export interface LevelRailProps {
  onSelectLevel: (levelId: LevelId) => void;
  className?: string;
}

export const LevelRail = forwardRef<LevelRailHandle, LevelRailProps>(
  ({ onSelectLevel, className }, ref) => {
    const navRef = useRef<HTMLElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const tickRefs = useRef<
      Record<
        LevelId,
        {
          label: HTMLSpanElement | null;
          mark: HTMLSpanElement | null;
        }
      >
    >({
      L1: { label: null, mark: null },
      L48: { label: null, mark: null },
      L96: { label: null, mark: null },
      L144: { label: null, mark: null },
    });

    const activeLevel = useSpiralStore((s) => s.activeLevel);
    const mode = useSpiralStore((s) => s.mode);

    useImperativeHandle(ref, () => ({
      updateRail: (p: number, currentActiveLevel?: LevelId) => {
        if (fillRef.current) {
          fillRef.current.style.height = `${Math.min(100, Math.max(0, p * 100))}%`;
        }

        const effectiveActive = currentActiveLevel || activeLevelAt(p);
        LEVEL_IDS.forEach((id) => {
          const refs = tickRefs.current[id];
          if (!refs) return;
          const isActive = effectiveActive === id;

          if (refs.label) {
            if (isActive) {
              refs.label.classList.add(styles.railTickLabelActive);
            } else {
              refs.label.classList.remove(styles.railTickLabelActive);
            }
          }

          if (refs.mark) {
            if (isActive) {
              refs.mark.classList.add(styles.railTickMarkActive);
            } else {
              refs.mark.classList.remove(styles.railTickMarkActive);
            }
          }
        });
      },
      setOpacity: (opacity: number) => {
        if (navRef.current) {
          navRef.current.style.opacity = String(opacity);
          navRef.current.style.pointerEvents = opacity > 0.01 ? 'auto' : 'none';
        }
      },
    }));

    if (mode === 'A') {
      return null;
    }

    return (
      <nav
        ref={navRef}
        className={`${styles.levelRailNav} ${className || ''}`}
        aria-label="Levels"
      >
        {/* Track and Progress Fill */}
        <div className={styles.railTrack}>
          <div ref={fillRef} className={styles.railFill} />
        </div>

        {/* Level Ticks */}
        {manifest.levels.map((lvl) => {
          const id = lvl.id as LevelId;
          const pStart = dwellStart(id);
          const topPercent = pStart * 100;
          const isActive = activeLevel === id;
          const formattedNum = String(lvl.n).padStart(2, '0');

          return (
            <button
              key={id}
              type="button"
              className={styles.railTickBtn}
              style={{ top: `${topPercent}%` }}
              onClick={() => onSelectLevel(id)}
              aria-label={`Jump to Level ${lvl.n}: ${lvl.label}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span
                ref={(el) => {
                  if (tickRefs.current[id]) {
                    tickRefs.current[id].label = el;
                  }
                }}
                className={`${styles.railTickLabel} ${
                  isActive ? styles.railTickLabelActive : ''
                }`}
              >
                {formattedNum}
              </span>
              <span
                ref={(el) => {
                  if (tickRefs.current[id]) {
                    tickRefs.current[id].mark = el;
                  }
                }}
                className={`${styles.railTickMark} ${
                  isActive ? styles.railTickMarkActive : ''
                }`}
              />
            </button>
          );
        })}
      </nav>
    );
  }
);

LevelRail.displayName = 'LevelRail';
