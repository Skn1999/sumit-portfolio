import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { HERO_LINE, HERO_PHOTO } from '../../data/assets.generated';
import manifest from '../../data/manifest.json';
import { useSpiralStore } from '../../lib/store';
import styles from '../styles/stage.module.css';

export interface WorldLayersHandle {
  containerEl: HTMLDivElement | null;
  lineEl: HTMLDivElement | null;
  photoEl: HTMLElement | null;
  setLineOpacity: (opacity: number, blurPx?: number) => void;
  setPhotoOpacity: (opacity: number) => void;
}

export interface WorldLayersProps {
  className?: string;
}

export const WorldLayers = forwardRef<WorldLayersHandle, WorldLayersProps>(
  ({ className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLElement>(null);

    const mode = useSpiralStore((s) => s.mode);
    const hoverLevel = useSpiralStore((s) => s.hoverLevel);
    const setAssetsReady = useSpiralStore((s) => s.setAssetsReady);

    // Decode and mark line asset ready
    useEffect(() => {
      const lineImg = lineRef.current?.querySelector('img');
      const photoImg = photoRef.current?.querySelector('img');

      let readyCount = 0;
      const checkDone = () => {
        readyCount++;
        if (readyCount >= 2) {
          setAssetsReady({ line: true, photo: true });
        }
      };

      if (lineImg) {
        if (lineImg.complete) {
          checkDone();
        } else {
          lineImg.onload = () => {
            lineImg.decode?.().catch(() => {});
            checkDone();
          };
        }
      }

      if (photoImg) {
        if (photoImg.complete) {
          checkDone();
        } else {
          photoImg.onload = () => {
            photoImg.decode?.().catch(() => {});
            checkDone();
          };
        }
      }
    }, [setAssetsReady]);

    useImperativeHandle(ref, () => ({
      containerEl: containerRef.current,
      lineEl: lineRef.current,
      photoEl: photoRef.current,
      setLineOpacity: (opacity: number, blurPx = 0) => {
        if (lineRef.current) {
          lineRef.current.style.opacity = String(opacity);
          lineRef.current.style.visibility = opacity > 0.001 ? 'visible' : 'hidden';
          lineRef.current.style.filter = blurPx > 0 ? `blur(${blurPx}px)` : 'none';
        }
      },
      setPhotoOpacity: (opacity: number) => {
        if (photoRef.current) {
          photoRef.current.style.opacity = String(opacity);
          photoRef.current.style.visibility = opacity > 0.001 ? 'visible' : 'hidden';
        }
      },
    }));

    // Hover state computation for Mode A
    const hoverClipStyle = useMemo(() => {
      if (!hoverLevel || mode !== 'A') {
        return {
          clipPath: 'inset(50% 0 50% 0)',
          opacity: 0,
        };
      }
      const lvl = manifest.levels.find((l) => l.id === hoverLevel);
      if (!lvl) {
        return {
          clipPath: 'inset(50% 0 50% 0)',
          opacity: 0,
        };
      }

      const topFrac = Math.max(0, lvl.cy - 0.04);
      const bottomFrac = Math.max(0, 1 - (lvl.cy + 0.04));
      return {
        clipPath: `inset(${topFrac * 100}% 0 ${bottomFrac * 100}% 0)`,
        opacity: 0.5,
      };
    }, [hoverLevel, mode]);

    const isHoverActive = Boolean(hoverLevel && mode === 'A');

    return (
      <div
        ref={containerRef}
        className={`${styles.worldLayers} ${className || ''}`}
        aria-hidden="true"
      >
        {/* Photoreal full-height shaft photo (z=0) */}
        <picture
          ref={photoRef as React.RefObject<HTMLPictureElement>}
          className={styles.worldPhotoPicture}
          style={{
            opacity: 0,
            visibility: 'hidden',
          }}
        >
          <source type="image/avif" srcSet={HERO_PHOTO.avif} />
          <source type="image/webp" srcSet={HERO_PHOTO.webp} />
          <source type="image/jpeg" srcSet={HERO_PHOTO.jpeg} />
          <img
            src={HERO_PHOTO.fallback}
            alt="Photoreal cross-section of cylindrical underground shaft"
            className={styles.worldPhotoImg}
            loading="eager"
            decoding="async"
          />
        </picture>

        {/* Architectural Line Drawing (z=1) */}
        <div
          ref={lineRef}
          className={styles.worldLayers}
          style={{
            opacity: mode === 'A' ? 1 : 0,
            visibility: mode === 'A' ? 'visible' : 'hidden',
          }}
        >
          <picture className={styles.worldLinePicture}>
            <source type="image/avif" srcSet={HERO_LINE.avif} />
            <source type="image/webp" srcSet={HERO_LINE.webp} />
            <source type="image/jpeg" srcSet={HERO_LINE.jpeg} />
            <img
              src={HERO_LINE.fallback}
              alt="Architectural cross-section line drawing of a cylindrical underground shaft"
              className={styles.worldLineImg}
              loading="eager"
              decoding="sync"
            />
          </picture>

          {/* Mode A Hover: dimming overlay (12% black outside hover band) */}
          <div
            className={styles.lineDimOverlay}
            style={{
              opacity: isHoverActive ? 0.12 : 0,
            }}
          />

          {/* Mode A Hover: duplicate clipped hero-line brightened 1.5x */}
          <div
            className={styles.lineHoverHighlight}
            style={{
              clipPath: hoverClipStyle.clipPath,
              opacity: hoverClipStyle.opacity,
              filter: 'brightness(1.5)',
            }}
          >
            <picture className={styles.worldLinePicture}>
              <source type="image/avif" srcSet={HERO_LINE.avif} />
              <source type="image/webp" srcSet={HERO_LINE.webp} />
              <source type="image/jpeg" srcSet={HERO_LINE.jpeg} />
              <img
                src={HERO_LINE.fallback}
                alt=""
                className={styles.worldLineImg}
                aria-hidden="true"
              />
            </picture>
          </div>
        </div>
      </div>
    );
  }
);

WorldLayers.displayName = 'WorldLayers';
export default WorldLayers;
