import React, { useRef, useEffect } from "react";

interface Stage1Props {
  isActive: boolean;
}

const SENSITIVITY = 2.2;
const DAMPING_FACTOR = 0.1;

export const Stage1HybridIdentity: React.FC<Partial<Stage1Props>> = ({
  isActive = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef<number>(2.0);
  const displayTimeRef = useRef<number>(2.0);
  const prevXRef = useRef<number | null>(null);
  const durationRef = useRef<number>(4.0);
  const rafIdRef = useRef<number | null>(null);

  // Initialize video metadata and set initial frame to center (2.0s)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      if (video.duration && !isNaN(video.duration)) {
        durationRef.current = video.duration;
        const midTime = video.duration * 0.5;
        targetTimeRef.current = midTime;
        displayTimeRef.current = midTime;
        video.currentTime = midTime;
      }
    };

    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1 && video.duration) {
      onMeta();
    }

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  // Butter-smooth RAF loop using Linear Interpolation (LERP) for mouse-driven puppet head turn
  useEffect(() => {
    if (!isActive) return;
    let isRunning = true;

    const updateScrub = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        const target = targetTimeRef.current;
        const current = displayTimeRef.current;
        const diff = target - current;

        if (Math.abs(diff) > 0.0005) {
          displayTimeRef.current += diff * DAMPING_FACTOR;
          if (!video.seeking) {
            const timeToSeek = displayTimeRef.current;
            if (Math.abs(video.currentTime - timeToSeek) > 0.01) {
              video.currentTime = timeToSeek;
            }
          }
        }
      }

      if (isRunning) {
        rafIdRef.current = requestAnimationFrame(updateScrub);
      }
    };

    rafIdRef.current = requestAnimationFrame(updateScrub);

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isActive]);

  // Horizontal mouse movement listener across window to turn the avatar
  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const duration = durationRef.current || 4.0;
      const timeOffset = -((delta / window.innerWidth) * SENSITIVITY * duration);
      targetTimeRef.current = Math.max(0, Math.min(duration, targetTimeRef.current + timeOffset));
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isActive]);

  return (
    <div className="relative w-full max-w-[640px] xl:max-w-[720px] h-[540px] xl:h-[600px] flex items-center justify-center select-none">
      {/* Frameless Avatar Video Container — Clean, unboxed, organic */}
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}hero-video.mp4`}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain object-center pointer-events-none select-none drop-shadow-sm"
        />
      </div>

      {/* Multiplayer Figma Cursors Framing the Avatar in Open Space */}
      {/* 1. Cognitive Science (Purple) */}
      <div
        className="absolute right-4 top-10 z-20 flex items-start gap-1 pointer-events-none transition-transform duration-700 ease-emil-out animate-cursor-float-1"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        <svg className="w-4 h-4 text-purple-500 fill-current drop-shadow-md" viewBox="0 0 24 24">
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" />
        </svg>
        <div className="px-2.5 py-1 rounded-md rounded-tl-none bg-purple-600 text-white font-mono text-[11px] font-semibold tracking-tight shadow-lg flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-200" />
          <span>Cognitive Science</span>
        </div>
      </div>

      {/* 2. Design Craft (Emerald) */}
      <div
        className="absolute -right-2 top-48 z-20 flex items-start gap-1 pointer-events-none transition-transform duration-700 ease-emil-out animate-cursor-float-2"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        <svg className="w-4 h-4 text-emerald-500 fill-current drop-shadow-md" viewBox="0 0 24 24">
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" />
        </svg>
        <div className="px-2.5 py-1 rounded-md rounded-tl-none bg-emerald-600 text-white font-mono text-[11px] font-semibold tracking-tight shadow-lg flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
          <span>Design Craft</span>
        </div>
      </div>

      {/* 3. Production Code (Sky Blue) */}
      <div
        className="absolute right-6 bottom-14 z-20 flex items-start gap-1 pointer-events-none transition-transform duration-700 ease-emil-out animate-cursor-float-3"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        <svg className="w-4 h-4 text-sky-500 fill-current drop-shadow-md" viewBox="0 0 24 24">
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" />
        </svg>
        <div className="px-2.5 py-1 rounded-md rounded-tl-none bg-sky-600 text-white font-mono text-[11px] font-semibold tracking-tight shadow-lg flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-200" />
          <span>Production Code</span>
        </div>
      </div>

      <style>{`
        @keyframes cursorFloat1 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-4px, -6px, 0); }
        }
        @keyframes cursorFloat2 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(5px, 4px, 0); }
        }
        @keyframes cursorFloat3 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-5px, 5px, 0); }
        }
        .animate-cursor-float-1 {
          animation: cursorFloat1 4.5s ease-in-out infinite;
        }
        .animate-cursor-float-2 {
          animation: cursorFloat2 5.2s ease-in-out infinite 0.6s;
        }
        .animate-cursor-float-3 {
          animation: cursorFloat3 4.8s ease-in-out infinite 1.2s;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-cursor-float-1,
          .animate-cursor-float-2,
          .animate-cursor-float-3 {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
