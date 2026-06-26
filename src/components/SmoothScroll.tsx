import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export const SmoothScroll = () => {
  const { pathname } = useLocation();
  const filterRef = useRef<SVGFEGaussianBlurElement>(null);

  useEffect(() => {
    // 1. Accessibility check: check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // 2. Initialize Lenis smooth scroller
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // fluid, springy ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Save instance globally to make it accessible to components or external triggers
    window.lenis = lenis;

    let rafId: number;
    let targetBlur = 0;
    let currentBlur = 0;
    const EASING = 0.15; // Smooth blur transition speed
    const MAX_BLUR = 4.5; // Cap the maximum blur to prevent legibility issues
    const VELOCITY_SCALE = 0.08; // Scale velocity to pixel blur range

    // 3. Animation frame loop
    const tick = (time: number) => {
      lenis.raf(time);

      // Read current scroll velocity from Lenis
      const velocity = Math.abs(lenis.velocity);

      // Calculate target blur based on velocity
      targetBlur = Math.min(velocity * VELOCITY_SCALE, MAX_BLUR);

      // Ease the current blur to prevent flickering or sudden jumps
      currentBlur += (targetBlur - currentBlur) * EASING;

      // Threshold cleanup to avoid sub-pixel rendering calculations
      if (Math.abs(targetBlur - currentBlur) < 0.01) {
        currentBlur = targetBlur;
      }

      // Update the Y-axis blur on the SVG element directly for performance
      if (filterRef.current) {
        filterRef.current.setAttribute("stdDeviation", `0 ${currentBlur.toFixed(2)}`);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // 4. Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  // Reset scroll to top instantly on route change
  useEffect(() => {
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <svg
      width="0"
      height="0"
      className="absolute pointer-events-none"
      style={{ visibility: "hidden", position: "absolute", top: -100, left: -100 }}
      aria-hidden="true"
    >
      <defs>
        <filter id="scroll-blur">
          <feGaussianBlur
            ref={filterRef}
            stdDeviation="0 0"
            edgeMode="duplicate"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SmoothScroll;
