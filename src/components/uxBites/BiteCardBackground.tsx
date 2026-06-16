import { memo, useMemo } from "react";

interface BiteCardBackgroundProps {
  seed: string;
}

// Simple seeded hash → 32-bit unsigned int
function hash(seed: string, salt = 0): number {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rand(seed: string, salt: number): number {
  // Returns 0..1
  return (hash(seed, salt) % 10000) / 10000;
}

const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(#n)'/>
     </svg>`
  );

export const BiteCardBackground = memo(function BiteCardBackground({
  seed,
}: BiteCardBackgroundProps) {
  const cfg = useMemo(() => {
    const hueA = Math.floor(rand(seed, 1) * 360);
    // Vary the secondary/tertiary hues with seeded offsets so palettes feel distinct
    const hueB = (hueA + 30 + Math.floor(rand(seed, 2) * 80)) % 360;
    const hueC = (hueA + 160 + Math.floor(rand(seed, 3) * 80)) % 360;
    const angle = Math.floor(rand(seed, 4) * 360);
    // Blob positions (% within card)
    const b1x = Math.floor(rand(seed, 5) * 60) - 10;
    const b1y = Math.floor(rand(seed, 6) * 40) - 10;
    const b2x = 40 + Math.floor(rand(seed, 7) * 50);
    const b2y = 40 + Math.floor(rand(seed, 8) * 50);
    const b3x = Math.floor(rand(seed, 9) * 70);
    const b3y = 20 + Math.floor(rand(seed, 10) * 50);
    return { hueA, hueB, hueC, angle, b1x, b1y, b2x, b2y, b3x, b3y };
  }, [seed]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden rounded-3xl">
      {/* Base wash very light, low saturation to preserve contrast */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${cfg.angle}deg,
            hsl(${cfg.hueA} 28% 96%) 0%,
            hsl(${cfg.hueB} 22% 94%) 50%,
            hsl(${cfg.hueC} 18% 92%) 100%)`,
        }}
      />
      {/* Soft, low-opacity blobs subtle color hint only */}
      <div
        className="absolute w-[55%] h-[55%] rounded-full blur-2xl opacity-40"
        style={{
          left: `${cfg.b1x}%`,
          top: `${cfg.b1y}%`,
          background: `hsl(${cfg.hueA} 45% 86%)`,
        }}
      />
      <div
        className="absolute w-[50%] h-[50%] rounded-full blur-2xl opacity-35"
        style={{
          left: `${cfg.b2x}%`,
          top: `${cfg.b2y}%`,
          background: `hsl(${cfg.hueC} 40% 88%)`,
        }}
      />
      <div
        className="absolute w-[40%] h-[40%] rounded-full blur-2xl opacity-25"
        style={{
          left: `${cfg.b3x}%`,
          top: `${cfg.b3y}%`,
          background: `hsl(${cfg.hueB} 50% 90%)`,
        }}
      />
      {/* Light veil to guarantee text contrast over blobs */}
      <div className="absolute inset-0 bg-background/55 dark:bg-background/70" />
      {/* Fine grain very subtle */}
      <div
        className="absolute inset-0 mix-blend-multiply opacity-[0.12] dark:mix-blend-overlay dark:opacity-[0.18]"
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: "220px 220px",
        }}
      />
      {/* Inner hairline */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-foreground/5" />
    </div>
  );
});

export default BiteCardBackground;
