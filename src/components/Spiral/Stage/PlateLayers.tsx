import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react';
import { LEVEL_PLATES } from '@/data/assets.generated';
import { LEVEL_IDS, type LevelId, plateOpacities, segmentAt } from '@/lib/timeline';
import { useSpiralStore } from '@/lib/store';
import styles from '../styles/stage.module.css';

export interface PlateLayersHandle {
  updatePlates: (progress: number) => void;
  setOpacity: (opacity: number) => void;
  getContainerEl: () => HTMLDivElement | null;
}

export interface PlateLayersProps {
  className?: string;
}

const PLATE_ALTS: Record<LevelId, string> = {
  L1: 'Level 01 Work: Architectural view of upper shaft machinery and workstations',
  L48: 'Level 48 Process: View of engineering tiers, conduit racks and conduits',
  L96: 'Level 96 Hiking & food: View of alpine terraces and hydroponic vegetation',
  L144: 'Level 144 Unsaid Moments: Deep residential chambers and warm amber light',
};

export const PlateLayers = forwardRef<PlateLayersHandle, PlateLayersProps>(
  ({ className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const plateRefs = useRef<Record<LevelId, HTMLDivElement | null>>({
      L1: null,
      L48: null,
      L96: null,
      L144: null,
    });

    const setAssetsReady = useSpiralStore((s) => s.setAssetsReady);

    // Preload & decode plate images
    useEffect(() => {
      let loadedCount = 0;
      const total = LEVEL_IDS.length;

      LEVEL_IDS.forEach((id) => {
        const el = containerRef.current?.querySelector(`[data-level="${id}"] img`) as HTMLImageElement | null;
        if (!el) return;

        const checkComplete = () => {
          loadedCount++;
          if (loadedCount >= total) {
            setAssetsReady({ plates: true });
          }
        };

        if (el.complete) {
          checkComplete();
        } else {
          el.onload = () => {
            el.decode?.().catch(() => {});
            checkComplete();
          };
        }
      });
    }, [setAssetsReady]);

    useImperativeHandle(ref, () => ({
      updatePlates: (p: number) => {
        const opacities = plateOpacities(p);
        LEVEL_IDS.forEach((id) => {
          const el = plateRefs.current[id];
          if (!el) return;
          const { opacity, scale, yOffset } = opacities[id];
          el.style.opacity = opacity.toFixed(3);
          if (opacity > 0.001) {
            el.style.visibility = 'visible';
            el.style.transform = `translate3d(0px, ${yOffset.toFixed(1)}px, 0px) scale(${scale.toFixed(3)})`;
          } else {
            el.style.visibility = 'hidden';
          }
        });

        // Optical blur-masked crossfade (Emil Kowalski: mask crossfades with subtle blur to eliminate double-exposure)
        if (containerRef.current) {
          const seg = segmentAt(p);
          const blurPx =
            seg.type === 'travel'
              ? (Math.sin(Math.PI * seg.localT) * 2.2).toFixed(1)
              : '0';
          containerRef.current.style.filter =
            blurPx === '0' ? 'none' : `blur(${blurPx}px)`;
        }
      },
      setOpacity: (opacity: number) => {
        if (containerRef.current) {
          containerRef.current.style.opacity = String(opacity);
          containerRef.current.style.visibility = opacity > 0.001 ? 'visible' : 'hidden';
          if (opacity <= 0.001) {
            containerRef.current.style.filter = 'none';
          }
        }
      },
      getContainerEl: () => containerRef.current,
    }));

    return (
      <div
        ref={containerRef}
        className={`${styles.platesContainer} ${className || ''}`}
        aria-hidden="true"
        style={{
          opacity: 0,
          visibility: 'hidden',
        }}
      >
        {LEVEL_IDS.map((id) => {
          const asset = LEVEL_PLATES[id];
          return (
            <div
              key={id}
              ref={(el) => (plateRefs.current[id] = el)}
              className={styles.plateItem}
              data-level={id}
              style={{
                opacity: 0,
                visibility: 'hidden',
              }}
            >
              <picture className={styles.platePicture}>
                <source type="image/avif" srcSet={asset.avif} />
                <source type="image/webp" srcSet={asset.webp} />
                <source type="image/jpeg" srcSet={asset.jpeg} />
                <img
                  src={asset.fallback}
                  alt={PLATE_ALTS[id]}
                  className={styles.plateImg}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          );
        })}
      </div>
    );
  }
);

PlateLayers.displayName = 'PlateLayers';
export default PlateLayers;
