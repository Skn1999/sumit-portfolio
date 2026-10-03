import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useSpiralStore } from '@/lib/store';
import {
  type LevelId,
  LEVEL_IDS,
  dwellStart,
  dwellLength,
  activeLevelAt,
  nearestDwell,
  segmentAt,
} from '@/lib/timeline';
import {
  shouldTriggerEntry,
  shouldTriggerBackToDrawing,
  resetInputState,
  isModeACooldown,
  setModeACooldown,
} from '@/lib/input';
import manifest from '@/data/manifest.json';
import { HERO_PHOTO, LEVEL_PLATES } from '@/data/assets.generated';

import { Stage } from './Stage/Stage';
import { LeftColumn } from './LeftColumn/LeftColumn';
import { OutroFooter } from './OutroFooter';
import '@/styles/spiral-tokens.css';

gsap.registerPlugin(ScrollTrigger);

const LEVEL_NUMS: Record<LevelId, { num: string; label: string; hash: string }> = {
  L1: { num: '01', label: 'The Up Top', hash: '#level-1' },
  L48: { num: '48', label: 'IT & Judicial', hash: '#level-48' },
  L96: { num: '96', label: 'Hydroponics & Farms', hash: '#level-96' },
  L144: { num: '144', label: 'The Down Deep', hash: '#level-144' },
};

export const Experience: React.FC = () => {
  const journeyRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const scrollDirectionRef = useRef<1 | -1>(1);
  const scrollStopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hashUpdateTimerRef = useRef<NodeJS.Timeout | null>(null);

  const mode = useSpiralStore((s) => s.mode);
  const activeLevel = useSpiralStore((s) => s.activeLevel);
  const isJumping = useSpiralStore((s) => s.isJumping);
  const setMode = useSpiralStore((s) => s.setMode);
  const setActiveLevel = useSpiralStore((s) => s.setActiveLevel);
  const setProgress = useSpiralStore((s) => s.setProgress);
  const setIsJumping = useSpiralStore((s) => s.setIsJumping);
  const setReducedMotion = useSpiralStore((s) => s.setReducedMotion);
  const setAssetsReady = useSpiralStore((s) => s.setAssetsReady);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [setReducedMotion]);

  // Lazy-load & decode photoreal assets after first paint (Section 8.5)
  useEffect(() => {
    const loadPhotorealAssets = () => {
      const photoImg = new Image();
      photoImg.src = HERO_PHOTO.fallback;
      photoImg.decode?.().catch(() => {});

      const plateImgs = [
        LEVEL_PLATES.L1.fallback,
        LEVEL_PLATES.L48.fallback,
        LEVEL_PLATES.L96.fallback,
        LEVEL_PLATES.L144.fallback,
      ].map((src) => {
        const img = new Image();
        img.src = src;
        img.decode?.().catch(() => {});
        return img;
      });

      Promise.all([
        photoImg.decode ? photoImg.decode() : Promise.resolve(),
        ...plateImgs.map((img) => (img.decode ? img.decode() : Promise.resolve())),
      ])
        .then(() => {
          setAssetsReady({ photo: true, plates: true });
        })
        .catch(() => {
          setAssetsReady({ photo: true, plates: true });
        });
    };

    if ('requestIdleCallback' in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(
        loadPhotorealAssets
      );
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (h: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(loadPhotorealAssets, 800);
      return () => clearTimeout(timer);
    }
  }, [setAssetsReady]);

  // Jump to specific level (Section 11.1)
  const jumpToLevel = useCallback(
    (targetId: LevelId) => {
      const store = useSpiralStore.getState();
      store.setIsJumping(true);

      const pTarget = dwellStart(targetId) + 0.25 * dwellLength();
      const pCurrent = store.progress;
      const dp = pTarget - pCurrent;
      const duration = Math.min(1.6, Math.max(0.9, 0.5 * Math.abs(dp) * 8));

      const journey = journeyRef.current;
      if (!journey) {
        store.setIsJumping(false);
        return;
      }

      const scrollRange = journey.scrollHeight - window.innerHeight;
      const targetScrollY = pTarget * scrollRange;

      if (lenisRef.current && window.innerWidth >= 768) {
        lenisRef.current.scrollTo(targetScrollY, {
          duration,
          easing: (t) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, // power3.inOut
          onComplete: () => {
            useSpiralStore.getState().setIsJumping(false);
            useSpiralStore.getState().setActiveLevel(targetId);
          },
        });
      } else {
        // Native smooth scroll fallback
        const startY = window.scrollY;
        const diff = targetScrollY - startY;
        const startTime = performance.now();

        const step = (now: number) => {
          const elapsed = (now - startTime) / (duration * 1000);
          if (elapsed >= 1) {
            window.scrollTo(0, targetScrollY);
            useSpiralStore.getState().setIsJumping(false);
            useSpiralStore.getState().setActiveLevel(targetId);
          } else {
            const eased =
              elapsed < 0.5
                ? 4 * elapsed * elapsed * elapsed
                : 1 - Math.pow(-2 * elapsed + 2, 3) / 2;
            window.scrollTo(0, startY + diff * eased);
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      }
    },
    []
  );

  // Level selection handler
  const handleSelectLevel = useCallback(
    (levelId: LevelId) => {
      const currentMode = useSpiralStore.getState().mode;
      if (currentMode === 'A') {
        setMode('toB');
        setActiveLevel(levelId);
      } else if (currentMode === 'B') {
        jumpToLevel(levelId);
      }
    },
    [jumpToLevel, setActiveLevel, setMode]
  );

  // Return to line drawing (Section 11.4)
  const handleBackToDrawing = useCallback(() => {
    const currentMode = useSpiralStore.getState().mode;
    if (currentMode === 'B') {
      setModeACooldown(800);
      resetInputState();
      setMode('toA');
    }
  }, [setMode]);

  // Back to top from Outro footer (Section 10.6)
  const handleBackToTop = useCallback(() => {
    jumpToLevel('L1');
  }, [jumpToLevel]);

  // Scroll lock & unlock based on mode
  useEffect(() => {
    if (mode === 'A' || mode === 'toB') {
      document.documentElement.classList.add('scroll-locked');
      document.body.classList.add('scroll-locked');
      lenisRef.current?.stop();
    } else if (mode === 'B') {
      document.documentElement.classList.remove('scroll-locked');
      document.body.classList.remove('scroll-locked');
      lenisRef.current?.start();
      ScrollTrigger.refresh();
    } else if (mode === 'toA') {
      document.documentElement.classList.add('scroll-locked');
      document.body.classList.add('scroll-locked');
      lenisRef.current?.stop();
      window.scrollTo(0, 0);
    }
  }, [mode]);

  // Initialize Lenis & ScrollTrigger
  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;

    let lenis: Lenis | null = null;
    if (isDesktop) {
      lenis = new Lenis({
        lerp: 0.1,
        syncTouch: false,
      });
      lenisRef.current = lenis;

      const updateST = () => ScrollTrigger.update();
      lenis.on('scroll', updateST);

      const tickerCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      if (useSpiralStore.getState().mode === 'A') {
        lenis.stop();
      }
    }

    // ScrollTrigger on #journey (700vh)
    const journeyEl = journeyRef.current;
    if (journeyEl) {
      const st = ScrollTrigger.create({
        trigger: journeyEl,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const store = useSpiralStore.getState();
          if (store.mode !== 'B') return;

          const p = self.progress;
          store.setProgress(p);

          // Update activeLevel when crossed
          const currentLvl = activeLevelAt(p);
          if (store.activeLevel !== currentLvl) {
            store.setActiveLevel(currentLvl);
          }

          // Track direction
          scrollDirectionRef.current = self.direction === 1 ? 1 : -1;

          // Snap on scroll stop (150ms debounce, Section 11.2)
          if (scrollStopTimerRef.current) {
            clearTimeout(scrollStopTimerRef.current);
          }
          scrollStopTimerRef.current = setTimeout(() => {
            const state = useSpiralStore.getState();
            if (state.mode !== 'B' || state.isJumping) return;

            const curP = state.progress;
            const seg = segmentAt(curP);
            if (seg.type !== 'travel') return; // Dwell: free drift

            const { targetProgress } = nearestDwell(curP, scrollDirectionRef.current);
            const journey = journeyRef.current;
            if (!journey) return;

            const scrollRange = journey.scrollHeight - window.innerHeight;
            const targetY = targetProgress * scrollRange;

            if (lenisRef.current && window.innerWidth >= 768) {
              lenisRef.current.scrollTo(targetY, {
                duration: 0.75,
                easing: (t) =>
                  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, // cubic power3.inOut
              });
            }
          }, 150);
        },
      });
      scrollTriggerRef.current = st;
    }

    return () => {
      scrollTriggerRef.current?.kill();
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  // Update hash with replaceState when activeLevel has been stable for 300ms (Section 11.5)
  useEffect(() => {
    if (mode === 'B') {
      if (hashUpdateTimerRef.current) {
        clearTimeout(hashUpdateTimerRef.current);
      }
      hashUpdateTimerRef.current = setTimeout(() => {
        const hash = LEVEL_NUMS[activeLevel]?.hash;
        if (hash && window.location.hash !== hash) {
          window.history.replaceState(null, '', hash);
        }
      }, 300);
    }
    return () => {
      if (hashUpdateTimerRef.current) {
        clearTimeout(hashUpdateTimerRef.current);
      }
    };
  }, [mode, activeLevel]);

  // Deep-link initial check on mount & hashchange (Section 11.5)
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.toLowerCase();
      let targetLevel: LevelId | null = null;
      if (rawHash === '#level-1' || rawHash === '#level-01') targetLevel = 'L1';
      else if (rawHash === '#level-48') targetLevel = 'L48';
      else if (rawHash === '#level-96') targetLevel = 'L96';
      else if (rawHash === '#level-144') targetLevel = 'L144';

      if (targetLevel) {
        setMode('B');
        setActiveLevel(targetLevel);
        const p0 = dwellStart(targetLevel) + 0.25 * dwellLength();
        setProgress(p0);

        document.documentElement.classList.remove('scroll-locked');
        document.body.classList.remove('scroll-locked');

        setTimeout(() => {
          if (journeyRef.current) {
            const scrollRange = journeyRef.current.scrollHeight - window.innerHeight;
            const targetY = p0 * scrollRange;
            window.scrollTo(0, targetY);
            lenisRef.current?.scrollTo(targetY, { immediate: true });
          }
        }, 100);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [setMode, setActiveLevel, setProgress]);

  // Keyboard navigation (Sections 8.4, 11.3)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if focus is in an input, textarea, or editable element
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        document.activeElement?.getAttribute('contenteditable') === 'true'
      ) {
        return;
      }

      const store = useSpiralStore.getState();

      // Mode A Keyboard handlers
      if (store.mode === 'A') {
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault();
          handleSelectLevel('L1');
        } else if (e.key === '1') {
          e.preventDefault();
          handleSelectLevel('L1');
        } else if (e.key === '2') {
          e.preventDefault();
          handleSelectLevel('L48');
        } else if (e.key === '3') {
          e.preventDefault();
          handleSelectLevel('L96');
        } else if (e.key === '4') {
          e.preventDefault();
          handleSelectLevel('L144');
        }
        return;
      }

      // Mode B Keyboard handlers
      if (store.mode === 'B') {
        const currentIdx = LEVEL_IDS.indexOf(store.activeLevel);

        if (e.key === 'Escape') {
          e.preventDefault();
          handleBackToDrawing();
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          if (currentIdx > 0) {
            jumpToLevel(LEVEL_IDS[currentIdx - 1]);
          }
        } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
          e.preventDefault();
          if (currentIdx < LEVEL_IDS.length - 1) {
            jumpToLevel(LEVEL_IDS[currentIdx + 1]);
          }
        } else if (e.key === 'Home') {
          e.preventDefault();
          jumpToLevel('L1');
        } else if (e.key === 'End') {
          e.preventDefault();
          jumpToLevel('L144');
        } else if (e.key === '1') {
          e.preventDefault();
          jumpToLevel('L1');
        } else if (e.key === '2') {
          e.preventDefault();
          jumpToLevel('L48');
        } else if (e.key === '3') {
          e.preventDefault();
          jumpToLevel('L96');
        } else if (e.key === '4') {
          e.preventDefault();
          jumpToLevel('L144');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelectLevel, jumpToLevel, handleBackToDrawing]);

  // Wheel listener for entry intent (Mode A) and top overscroll (Mode B)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const store = useSpiralStore.getState();

      if (store.mode === 'A') {
        if (shouldTriggerEntry(e.deltaY)) {
          handleSelectLevel('L1');
        }
      } else if (store.mode === 'B') {
        // Desktop upward overscroll at progress = 0 (Section 11.4)
        const scrollY = window.scrollY;
        if (shouldTriggerBackToDrawing(scrollY, e.deltaY)) {
          handleBackToDrawing();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleSelectLevel, handleBackToDrawing]);

  // Touch listener for swipe-up entry in Mode A (Section 8.4)
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const store = useSpiralStore.getState();
      if (store.mode === 'A') {
        const touchEndY = e.changedTouches[0].clientY;
        const diffY = touchStartY - touchEndY;
        if (diffY > 60 && !isModeACooldown()) {
          handleSelectLevel('L1');
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleSelectLevel]);

  const levelInfo = LEVEL_NUMS[activeLevel] || LEVEL_NUMS.L1;

  return (
    <div className="spiral-root">
      {/* Screen-reader live region announcing level changes (Section 15) */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0',
        }}
      >
        {`Level ${levelInfo.num}, ${levelInfo.label}`}
      </div>

      {/* Left Column (fixed on desktop, responsive bottom sheet on mobile) */}
      <LeftColumn />

      {/* Mode B: 700vh Scroll Journey with sticky Stage */}
      <main
        id="journey"
        ref={journeyRef}
        style={{
          height: '700vh',
          position: 'relative',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Stage
            onSelectLevel={handleSelectLevel}
            onBackToDrawing={handleBackToDrawing}
          />
        </div>
      </main>

      {/* Outro Footer (un-sticks below Level 144) */}
      <OutroFooter onBackToTop={handleBackToTop} />
    </div>
  );
};

export default Experience;
