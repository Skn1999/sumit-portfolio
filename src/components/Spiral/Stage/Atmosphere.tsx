import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { useSpiralStore } from '@/lib/store';
import styles from '../styles/stage.module.css';

export interface AtmosphereHandle {
  updateAtmosphere: (progress: number, scrollVelocity?: number) => void;
  setGradeOpacity: (opacity: number) => void;
  setLightShaftOpacity: (opacity: number) => void;
  setDustOpacity: (opacity: number) => void;
}

export interface AtmosphereProps {
  isMobile: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
  seed: number;
}

// 256x256 inline SVG noise pattern for grain
const NOISE_SVG = `data:image/svg+xml;utf8,<svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)' opacity='0.75'/></svg>`;

export const Atmosphere = forwardRef<AtmosphereHandle, AtmosphereProps>(
  ({ isMobile, className }, ref) => {
    const gradeRef = useRef<HTMLDivElement>(null);
    const dustCanvasRef = useRef<HTMLCanvasElement>(null);
    const grainRef = useRef<HTMLDivElement>(null);

    const mode = useSpiralStore((s) => s.mode);
    const activeLevel = useSpiralStore((s) => s.activeLevel);
    const reducedMotion = useSpiralStore((s) => s.reducedMotion);

    // Particles state
    const particlesRef = useRef<Particle[]>([]);
    const animFrameRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(performance.now());
    const velocityRef = useRef<number>(0);
    const progressRef = useRef<number>(0);

    // 1. Grade Color interpolation calculation
    const applyGrade = useCallback((p: number) => {
      if (!gradeRef.current) return;
      // Interpolate cold (#9CC7D6, rgba(156, 199, 214, 0.12)) to amber (#E8A64A, rgba(232, 166, 74, 0.14))
      const r = Math.round(156 + (232 - 156) * p);
      const g = Math.round(199 + (166 - 199) * p);
      const b = Math.round(214 + (74 - 214) * p);
      const a = (0.12 + (0.14 - 0.12) * p).toFixed(3);
      gradeRef.current.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    }, []);

    useImperativeHandle(ref, () => ({
      updateAtmosphere: (p: number, scrollVel = 0) => {
        progressRef.current = p;
        velocityRef.current = scrollVel;
        applyGrade(p);
      },
      setGradeOpacity: (opacity: number) => {
        if (gradeRef.current) {
          gradeRef.current.style.opacity = String(opacity);
        }
      },
      setLightShaftOpacity: (_opacity: number) => {
        // Spotlight removed per design feedback
      },
      setDustOpacity: (opacity: number) => {
        if (dustCanvasRef.current) {
          dustCanvasRef.current.style.opacity = String(opacity);
        }
      },
    }));

    // Grain 8fps animation
    useEffect(() => {
      if (reducedMotion || !grainRef.current) return;

      const offsets = [
        [0, 0],
        [32, 64],
        [96, 32],
        [160, 128],
        [64, 192],
        [224, 96],
        [128, 160],
        [192, 224],
      ];
      let step = 0;

      const interval = setInterval(() => {
        if (document.hidden) return;
        step = (step + 1) % offsets.length;
        const [x, y] = offsets[step];
        if (grainRef.current) {
          grainRef.current.style.backgroundPosition = `${x}px ${y}px`;
        }
      }, 125); // 8fps = 125ms

      return () => clearInterval(interval);
    }, [reducedMotion]);

    // Dust canvas initialization and animation loop
    useEffect(() => {
      const canvas = dustCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const particleCount = isMobile ? 35 : 75;
      const initParticles = (width: number, height: number) => {
        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: 1.2 + Math.random() * 2.2,
            alpha: 0.15 + Math.random() * 0.5,
            vx: (Math.random() - 0.5) * 0.2,
            vy: -0.2 - Math.random() * 0.4,
            seed: Math.random(),
          });
        }
        particlesRef.current = particles;
      };

      const handleResize = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * (window.devicePixelRatio || 1);
        canvas.height = rect.height * (window.devicePixelRatio || 1);
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
        initParticles(rect.width, rect.height);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      const render = (now: number) => {
        const dt = Math.min(50, now - lastTimeRef.current);
        lastTimeRef.current = now;

        if (mode === 'B' && !reducedMotion && !document.hidden) {
          const rect = canvas.getBoundingClientRect();
          const w = rect.width;
          const h = rect.height;

          ctx.clearRect(0, 0, w, h);

          // Decay velocity gradually
          velocityRef.current *= 0.92;
          const upVelocityOffset = Math.max(-3.0, -velocityRef.current * 3.8);

          const curP = progressRef.current;
          const isL144 = curP >= 0.72; // The Down Deep: fiery burning embers
          const isL96 = curP >= 0.45 && curP < 0.72; // Hydroponics: green botanical spores & pollen
          const isL48 = curP >= 0.20 && curP < 0.45; // IT: data telemetry blinks

          const particles = particlesRef.current;
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            if (isL144) {
              // Level 144: Burning Embers & Fiery Sparks rising from generator furnace
              p.x += Math.sin(now * 0.003 + p.seed * 10) * 1.2;
              p.y += (-1.8 - p.seed * 1.5 + upVelocityOffset) * (dt / 16);

              if (p.y < 0) {
                p.y = h;
                p.x = Math.random() * w;
              } else if (p.y > h) {
                p.y = 0;
                p.x = Math.random() * w;
              }
              if (p.x < 0) p.x = w;
              else if (p.x > w) p.x = 0;

              const flicker = 0.65 + 0.35 * Math.sin(now * 0.012 + p.seed * 20);
              const emberAlpha = Math.min(1, p.alpha * flicker * 1.4);
              const greenVal = Math.round(110 + p.seed * 90);

              ctx.shadowBlur = 6;
              ctx.shadowColor = 'rgba(255, 107, 53, 0.9)';
              ctx.fillStyle = `rgba(255, ${greenVal}, 30, ${emberAlpha})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size * 1.25, 0, Math.PI * 2);
              ctx.fill();
            } else if (isL96) {
              // Level 96: Living Flora Spores & Golden Agricultural Pollen
              p.x += Math.sin(now * 0.002 + p.seed * 6) * 0.9;
              p.y += (-0.45 - p.seed * 0.5 + upVelocityOffset) * (dt / 16);

              if (p.y < 0) {
                p.y = h;
                p.x = Math.random() * w;
              } else if (p.y > h) {
                p.y = 0;
                p.x = Math.random() * w;
              }
              if (p.x < 0) p.x = w;
              else if (p.x > w) p.x = 0;

              const isPollen = p.seed > 0.45;
              ctx.shadowBlur = 4;
              ctx.shadowColor = isPollen ? 'rgba(253, 224, 71, 0.7)' : 'rgba(52, 211, 153, 0.8)';
              ctx.fillStyle = isPollen
                ? `rgba(253, 224, 71, ${p.alpha * 1.1})`
                : `rgba(110, 231, 183, ${p.alpha * 1.15})`;
              ctx.beginPath();
              ctx.ellipse(p.x, p.y, p.size * 1.3, p.size * 0.85, Math.sin(now * 0.003 + p.seed), 0, Math.PI * 2);
              ctx.fill();
            } else if (isL48) {
              // Level 48: IT Data Telemetry & Server Blinkers
              p.x += (Math.random() - 0.5) * 0.12;
              p.y += (-0.2 + upVelocityOffset) * (dt / 16);

              if (p.y < 0) p.y = h;
              else if (p.y > h) p.y = 0;
              if (p.x < 0) p.x = w;
              else if (p.x > w) p.x = 0;

              const blink = Math.sin(now * 0.007 + p.seed * 25);
              const dataAlpha = blink > 0.2 ? p.alpha * 1.4 : p.alpha * 0.25;

              ctx.shadowBlur = blink > 0.4 ? 4 : 0;
              ctx.shadowColor = p.seed > 0.5 ? 'rgba(245, 158, 11, 0.8)' : 'rgba(6, 182, 212, 0.8)';
              ctx.fillStyle = p.seed > 0.5
                ? `rgba(245, 158, 11, ${dataAlpha})`
                : `rgba(6, 182, 212, ${dataAlpha})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size * 0.95, 0, Math.PI * 2);
              ctx.fill();
            } else {
              // Level 01: Cold Exterior Mist & Airlock Dust
              p.x += Math.sin(now * 0.001 + p.seed) * 0.3;
              p.y += (0.25 + p.seed * 0.35 + upVelocityOffset) * (dt / 16);

              if (p.y < 0) p.y = h;
              else if (p.y > h) p.y = 0;
              if (p.x < 0) p.x = w;
              else if (p.x > w) p.x = 0;

              ctx.shadowBlur = 0;
              ctx.fillStyle = `rgba(186, 230, 253, ${p.alpha * 0.75})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.shadowBlur = 0; // Reset canvas shadow
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        animFrameRef.current = requestAnimationFrame(render);
      };

      animFrameRef.current = requestAnimationFrame(render);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
        }
      };
    }, [mode, isMobile, reducedMotion]);

    // Initial styles
    const isModeB = mode === 'B' || mode === 'toB';
    const initialGradeOpacity = mode === 'A' ? 0 : 1;
    const initialGrainOpacity = mode === 'A' ? 0.04 : 0.07;
    const initialDustOpacity = mode === 'A' ? 0 : 1;

    return (
      <div className={className} aria-hidden="true">
        {/* z = 3: Grade overlay */}
        <div
          ref={gradeRef}
          className={styles.gradeOverlay}
          style={{
            opacity: initialGradeOpacity,
            backgroundColor: 'rgba(156, 199, 214, 0.12)',
          }}
        />

        {/* z = 5: Dust Canvas */}
        <canvas
          ref={dustCanvasRef}
          className={styles.dustCanvas}
          style={{
            opacity: initialDustOpacity,
          }}
        />

        {/* z = 6: Grain overlay */}
        <div
          ref={grainRef}
          className={styles.grainOverlay}
          style={{
            backgroundImage: `url("${NOISE_SVG}")`,
            opacity: initialGrainOpacity,
          }}
        />

        {/* z = 7: Vignette + Linear Fades + Scrim */}
        <div
          className={styles.vignetteOverlay}
          style={{ opacity: 1 }}
        />
        <div
          className={styles.topFade}
          style={{ opacity: 1 }}
        />
        <div
          className={styles.bottomFade}
          style={{ opacity: 1 }}
        />
        <div
          className={styles.leftScrim}
          style={{ opacity: isModeB ? 1 : 0 }}
        />

        {/* Living Ambient Level Overlays (Mode B) */}
        {/* Level 144: Subterranean Furnace Heat Pulse */}
        <div
          className={styles.furnaceGlow}
          style={{ opacity: isModeB && activeLevel === 'L144' ? 1 : 0 }}
        />

        {/* Level 96: Living Flora & Hydroponics Canopy Glow */}
        <div
          className={styles.hydroponicsGlow}
          style={{ opacity: isModeB && activeLevel === 'L96' ? 1 : 0 }}
        />

        {/* Level 01: Viewscreen CRT Scanlines */}
        <div
          className={styles.viewscreenScanlines}
          style={{ opacity: isModeB && activeLevel === 'L1' ? 0.22 : 0 }}
        />
      </div>
    );
  }
);

Atmosphere.displayName = 'Atmosphere';
