import { memo, useMemo } from "react";

interface BiteCardBackgroundProps {
  seed: string;
}

// Deterministic 0–360 hue from a string seed
function hueFromSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}

const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(#n)'/>
     </svg>`
  );

export const BiteCardBackground = memo(function BiteCardBackground({
  seed,
}: BiteCardBackgroundProps) {
  const { hue, hueB, hueC } = useMemo(() => {
    const h = hueFromSeed(seed);
    return { hue: h, hueB: (h + 40) % 360, hueC: (h + 200) % 360 };
  }, [seed]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden rounded-3xl">
      {/* Base warm wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(140deg,
            hsl(${hue} 35% 94%) 0%,
            hsl(${hueB} 25% 90%) 55%,
            hsl(${hueC} 20% 86%) 100%)`,
        }}
      />
      {/* Blurred color blobs */}
      <div
        className="absolute -top-24 -left-16 w-[70%] h-[60%] rounded-full blur-3xl opacity-60"
        style={{ background: `hsl(${hue} 60% 78%)` }}
      />
      <div
        className="absolute -bottom-24 -right-10 w-[75%] h-[65%] rounded-full blur-3xl opacity-55"
        style={{ background: `hsl(${hueC} 55% 80%)` }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[40%] h-[40%] rounded-full blur-3xl opacity-40"
        style={{ background: `hsl(${hueB} 70% 82%)` }}
      />
      {/* Film grain */}
      <div
        className="absolute inset-0 mix-blend-multiply opacity-[0.35] dark:opacity-25 dark:mix-blend-overlay"
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: "240px 240px",
        }}
      />
      {/* Dark-mode tint to keep contrast */}
      <div className="absolute inset-0 hidden dark:block bg-background/55" />
      {/* Inner hairline */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-foreground/5" />
    </div>
  );
});

export default BiteCardBackground;
