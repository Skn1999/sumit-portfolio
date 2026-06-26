import { useEffect } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export const SmoothScroll = () => {
  const { pathname } = useLocation();

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

    // 3. Animation frame loop
    const tick = (time: number) => {
      lenis.raf(time);
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

  return null;
};

export default SmoothScroll;
