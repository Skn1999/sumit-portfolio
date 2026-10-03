import React, { useEffect, useRef } from 'react';
import { useSpiralStore } from '@/lib/store';
import { panelStyles, segmentAt, LEVEL_IDS, type LevelId } from '@/lib/timeline';
import styles from '../styles/left-column.module.css';

interface LevelPanelWrapperProps {
  levelId: LevelId;
  children: React.ReactNode;
  className?: string;
}

export const LevelPanelWrapper: React.FC<LevelPanelWrapperProps> = ({
  levelId,
  children,
  className,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applyStyles = (
      mode: string,
      activeLevel: LevelId,
      progress: number,
      isJumping: boolean
    ) => {
      const el = panelRef.current;
      if (!el) return;

      // In Mode A: panels are hidden
      if (mode === 'A') {
        el.style.opacity = '0';
        el.style.transform = 'translate3d(0, 16px, 0)';
        el.style.pointerEvents = 'none';
        el.setAttribute('inert', '');
        return;
      }

      // Transitioning from Mode A to B: target active panel fades in with staggered hierarchy
      if (mode === 'toB') {
        const isTarget = activeLevel === levelId;
        el.style.transition = 'opacity 420ms cubic-bezier(0.23, 1, 0.32, 1), transform 420ms cubic-bezier(0.32, 0.72, 0, 1)';
        if (isTarget) {
          el.style.opacity = '1';
          el.style.transform = 'translate3d(0, 0, 0)';
          el.style.pointerEvents = 'auto';
          el.removeAttribute('inert');

          const staggerItems = el.querySelectorAll<HTMLElement>('[data-stagger]');
          staggerItems.forEach((child) => {
            const k = parseInt(child.getAttribute('data-stagger') || '0', 10);
            child.style.transition = `opacity 340ms cubic-bezier(0.23, 1, 0.32, 1) ${k * 45}ms, transform 340ms cubic-bezier(0.32, 0.72, 0, 1) ${k * 45}ms`;
            child.style.opacity = '1';
            child.style.transform = 'translate3d(0, 0, 0)';
          });
        } else {
          el.style.opacity = '0';
          el.style.transform = 'translate3d(0, 16px, 0)';
          el.style.pointerEvents = 'none';
          el.setAttribute('inert', '');
        }
        return;
      }

      // Transitioning back to Mode A: fast responsive fade out (220ms ease-out)
      if (mode === 'toA') {
        el.style.transition = 'opacity 220ms cubic-bezier(0.23, 1, 0.32, 1), transform 220ms cubic-bezier(0.23, 1, 0.32, 1)';
        el.style.opacity = '0';
        el.style.transform = 'translate3d(0, 12px, 0)';
        el.style.pointerEvents = 'none';
        el.setAttribute('inert', '');
        return;
      }

      // Programmatic jump in Mode B (Section 11.1)
      if (isJumping) {
        const isTarget = activeLevel === levelId;
        el.style.transition = 'opacity 360ms cubic-bezier(0.23, 1, 0.32, 1), transform 360ms cubic-bezier(0.32, 0.72, 0, 1)';
        if (isTarget) {
          el.style.opacity = '1';
          el.style.transform = 'translate3d(0, 0, 0)';
          el.style.pointerEvents = 'auto';
          el.removeAttribute('inert');

          const staggerItems = el.querySelectorAll<HTMLElement>('[data-stagger]');
          staggerItems.forEach((child) => {
            const k = parseInt(child.getAttribute('data-stagger') || '0', 10);
            child.style.transition = `opacity 320ms cubic-bezier(0.23, 1, 0.32, 1) ${k * 40}ms, transform 320ms cubic-bezier(0.32, 0.72, 0, 1) ${k * 40}ms`;
            child.style.opacity = '1';
            child.style.transform = 'translate3d(0, 0, 0)';
          });
        } else {
          el.style.opacity = '0';
          el.style.transform = 'translate3d(0, 16px, 0)';
          el.style.pointerEvents = 'none';
          el.setAttribute('inert', '');
        }
        return;
      }

      // Normal scroll-scrubbed behavior in Mode B (Section 10.4)
      el.style.transition = 'none';
      const allStyles = panelStyles(progress);
      const style = allStyles[levelId];

      el.style.opacity = style.opacity.toString();
      el.style.transform = `translate3d(0, ${style.y.toFixed(2)}px, 0)`;

      // Interaction guard (Section 10.4): when opacity < 0.5, inert & pointer-events none
      if (style.inert) {
        el.style.pointerEvents = 'none';
        el.setAttribute('inert', '');
      } else {
        el.style.pointerEvents = 'auto';
        el.removeAttribute('inert');
      }

      // Child stagger on arrival (Section 10.4):
      // Eyebrow, title, intro, items, links each offset by 0.04 in local t over [0.65, 0.90]
      const seg = segmentAt(progress);
      const isArriving =
        seg.type === 'travel' &&
        seg.toLevel !== undefined &&
        LEVEL_IDS[seg.toLevel] === levelId;

      const staggerItems = el.querySelectorAll<HTMLElement>('[data-stagger]');

      if (isArriving && seg.localT >= 0.65 && seg.localT <= 0.90) {
        const t = seg.localT;
        staggerItems.forEach((child) => {
          const k = parseInt(child.getAttribute('data-stagger') || '0', 10);
          const childStart = 0.65 + k * 0.04;
          const childDuration = 0.08;
          const childProgress = Math.min(
            Math.max((t - childStart) / childDuration, 0),
            1
          );

          child.style.opacity = childProgress.toString();
          child.style.transform = `translate3d(0, ${(16 * (1 - childProgress)).toFixed(2)}px, 0)`;
        });
      } else {
        // In dwell or leaving: children follow parent panel
        staggerItems.forEach((child) => {
          child.style.opacity = '1';
          child.style.transform = 'translate3d(0, 0, 0)';
        });
      }
    };

    // Apply initial state
    const initialState = useSpiralStore.getState();
    applyStyles(
      initialState.mode,
      initialState.activeLevel,
      initialState.progress,
      initialState.isJumping
    );

    // Subscribe to store updates imperatively to achieve zero-React-rerender 60fps scrubbing
    const unsubscribe = useSpiralStore.subscribe((state) => {
      applyStyles(state.mode, state.activeLevel, state.progress, state.isJumping);
    });

    return () => {
      unsubscribe();
    };
  }, [levelId]);

  return (
    <div
      ref={panelRef}
      id={`panel-${levelId}`}
      className={`${styles.panelCell} ${className || ''}`}
      style={{
        opacity: 0,
        transform: 'translate3d(0, 16px, 0)',
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  );
};

export default LevelPanelWrapper;
