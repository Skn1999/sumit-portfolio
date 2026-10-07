import React, { useEffect, useState, useRef, useCallback } from 'react';
import manifest from '../../data/manifest.json';
import { type LevelId } from '../../lib/timeline';
import { useSpiralStore } from '../../lib/store';
import { WORLD_ASPECT_RATIO } from '../../lib/camera';
import styles from '../styles/stage.module.css';

export interface LevelMarkersProps {
  viewport: { width: number; height: number };
  leftColWidth: number;
  isMobile: boolean;
  onSelectLevel: (levelId: LevelId) => void;
}

export const LevelMarkers: React.FC<LevelMarkersProps> = ({
  viewport,
  isMobile,
  onSelectLevel,
}) => {
  const mode = useSpiralStore((s) => s.mode);
  const hoverLevel = useSpiralStore((s) => s.hoverLevel);
  const setHoverLevel = useSpiralStore((s) => s.setHoverLevel);

  // 3s Inactivity Hint state
  const [showHint, setShowHint] = useState(false);
  const hasInteractedRef = useRef(false);

  const handleInteraction = useCallback(() => {
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      setShowHint(false);
    }
  }, []);

  useEffect(() => {
    if (mode !== 'A') {
      setShowHint(false);
      return;
    }

    const timer = setTimeout(() => {
      if (!hasInteractedRef.current && mode === 'A') {
        setShowHint(true);
      }
    }, 3000);

    const events = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const;
    events.forEach((evt) =>
      window.addEventListener(evt, handleInteraction, { passive: true })
    );

    return () => {
      clearTimeout(timer);
      events.forEach((evt) =>
        window.removeEventListener(evt, handleInteraction)
      );
    };
  }, [mode, handleInteraction]);

  if (mode !== 'A') {
    return null;
  }

  // Exact contained drawing calculation inside full viewport (centered in middle of page)
  const stageW = viewport.width;
  const stageH = viewport.height;
  const zoomA = isMobile ? 0.70 : 0.88;
  const H_draw = stageH * zoomA;
  const W_draw = H_draw * WORLD_ASPECT_RATIO;
  const top_draw = (stageH - H_draw) / 2;
  const left_draw = (stageW - W_draw) / 2;
  const labelMargin = 16;

  return (
    <div className={styles.markersContainer} aria-label="Level Hotspots">
      {manifest.levels.map((lvl) => {
        const id = lvl.id as LevelId;
        const isHovered = hoverLevel === id;
        const topPx = top_draw + lvl.cy * H_draw;
        const formattedNum = String(lvl.n).padStart(2, '0');

        return (
          <button
            key={id}
            type="button"
            className={styles.markerBand}
            style={{
              top: `${topPx}px`,
              left: isMobile ? 0 : `${Math.max(0, left_draw)}px`,
              width: isMobile
                ? '100%'
                : `calc(100% - ${Math.max(0, left_draw)}px)`,
            }}
            onClick={() => {
              handleInteraction();
              onSelectLevel(id);
            }}
            onMouseEnter={() => {
              handleInteraction();
              if (!isMobile) setHoverLevel(id);
            }}
            onMouseLeave={() => {
              if (!isMobile) setHoverLevel(null);
            }}
            onFocus={() => {
              handleInteraction();
              setHoverLevel(id);
            }}
            onBlur={() => {
              setHoverLevel(null);
            }}
            aria-label={`Level ${lvl.n}: ${lvl.label}`}
          >
            {/* Horizontal hairline */}
            {!isMobile && (
              <span
                className={`${styles.markerHairline} ${
                  isHovered ? styles.markerHairlineHover : ''
                }`}
                style={{
                  left: isHovered ? '0px' : `${W_draw}px`,
                  width: isHovered
                    ? `${W_draw + labelMargin}px`
                    : `${labelMargin}px`,
                  transition: isHovered
                    ? 'all 220ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1))'
                    : 'all 160ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1))',
                }}
              />
            )}

            {/* Marker label */}
            <span
              className={styles.markerLabelWrapper}
              style={{
                left: isMobile ? 'auto' : `${W_draw + labelMargin + 6}px`,
                right: isMobile ? '20px' : 'auto',
              }}
            >
              <span
                className={`${styles.markerNumber} ${
                  isHovered ? styles.markerNumberHover : ''
                }`}
              >
                {formattedNum}
              </span>
              <span
                className={`${styles.markerText} ${
                  isHovered ? styles.markerTextHover : ''
                }`}
              >
                {lvl.label}
              </span>
            </span>
          </button>
        );
      })}

      {/* Mode A Hint */}
      <div
        className={styles.hintContainer}
        style={{
          opacity: showHint ? 1 : 0,
          pointerEvents: 'none',
          transition: showHint ? 'opacity 600ms ease' : 'opacity 300ms ease',
        }}
        aria-hidden={!showHint}
      >
        <span className={styles.hintText}>Scroll, or choose a level</span>
        <div className={styles.hintLine} />
      </div>
    </div>
  );
};

export default LevelMarkers;
