import { memo, useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface BiteCardBackgroundProps {
  seed: string;
}

function hash(seed: string, salt = 0): number {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: T[], seed: string, salt: number): T {
  return arr[hash(seed, salt) % arr.length];
}

type Palette = { a: string; b: string; c: string; angle: number };

/** Light pastels — pair indices align with dark palette below. */
const LIGHT_PALETTES: Palette[] = [
  { a: "350 70% 78%", b: "30 80% 80%", c: "20 60% 70%", angle: 215 }, // plum / ochre
  { a: "220 50% 78%", b: "200 55% 82%", c: "180 45% 78%", angle: 200 }, // ink / sky
  { a: "150 40% 78%", b: "90 45% 82%", c: "30 50% 84%", angle: 160 }, // moss / clay
  { a: "260 55% 80%", b: "320 60% 82%", c: "20 70% 84%", angle: 240 }, // indigo / peach
  { a: "40 80% 82%", b: "20 75% 80%", c: "0 60% 80%", angle: 190 }, // mustard / coral
  { a: "190 55% 80%", b: "260 50% 82%", c: "330 55% 84%", angle: 220 }, // teal / lilac
  { a: "10 70% 80%", b: "30 75% 82%", c: "50 70% 86%", angle: 175 }, // terracotta / sand
  { a: "210 60% 78%", b: "170 50% 80%", c: "120 45% 82%", angle: 250 }, // ocean / sage
];

/** Dark — deeper, moodier counterparts (L 22–34%, S +5–10%). */
const DARK_PALETTES: Palette[] = [
  { a: "350 65% 28%", b: "30 70% 30%", c: "18 60% 24%", angle: 215 }, // wine / amber
  { a: "220 55% 26%", b: "200 60% 28%", c: "180 50% 24%", angle: 200 }, // midnight / teal
  { a: "150 45% 24%", b: "90 50% 26%", c: "20 55% 28%", angle: 160 }, // forest / rust
  { a: "260 60% 30%", b: "320 65% 28%", c: "18 70% 30%", angle: 240 }, // amethyst / ember
  { a: "40 75% 30%", b: "18 70% 28%", c: "0 60% 26%", angle: 190 }, // brass / blood
  { a: "190 60% 26%", b: "260 55% 28%", c: "330 60% 30%", angle: 220 }, // deep teal / mauve
  { a: "10 70% 28%", b: "30 70% 30%", c: "50 65% 32%", angle: 175 }, // terracotta / bronze
  { a: "210 65% 26%", b: "170 55% 26%", c: "120 50% 28%", angle: 250 }, // navy / pine
];

const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.32 0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(#n)'/>
     </svg>`
  );

export const BiteCardBackground = memo(function BiteCardBackground({
  seed,
}: BiteCardBackgroundProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const cfg = useMemo(() => {
    const idx = hash(seed, 1);
    const lightPalette = LIGHT_PALETTES[idx % LIGHT_PALETTES.length];
    const darkPalette = DARK_PALETTES[idx % DARK_PALETTES.length];
    const b1x = (hash(seed, 5) % 50) - 10;
    const b1y = (hash(seed, 6) % 40) - 10;
    const b2x = 30 + (hash(seed, 7) % 50);
    const b2y = 30 + (hash(seed, 8) % 50);
    const b3x = hash(seed, 9) % 60;
    const b3y = 15 + (hash(seed, 10) % 50);
    return { lightPalette, darkPalette, b1x, b1y, b2x, b2y, b3x, b3y };
  }, [seed]);

  const p = isDark ? cfg.darkPalette : cfg.lightPalette;
  const { b1x, b1y, b2x, b2y, b3x, b3y } = cfg;

  // Blob opacity tuned per mode
  const o1 = isDark ? 0.55 : 0.7;
  const o2 = isDark ? 0.5 : 0.65;
  const o3 = isDark ? 0.4 : 0.55;

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden rounded-3xl">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${p.angle}deg,
            hsl(${p.a} / ${isDark ? 0.65 : 0.55}) 0%,
            hsl(${p.b} / ${isDark ? 0.55 : 0.45}) 50%,
            hsl(${p.c} / ${isDark ? 0.6 : 0.5}) 100%)`,
        }}
      />

      <div
        className="bite-blob-a absolute w-[65%] h-[65%] rounded-full blur-3xl"
        style={{
          left: `${b1x}%`,
          top: `${b1y}%`,
          background: `radial-gradient(circle, hsl(${p.a}) 0%, transparent 70%)`,
          opacity: o1,
          animation: "bite-blob-drift-a 32s ease-in-out infinite",
        }}
      />
      <div
        className="bite-blob-b absolute w-[55%] h-[55%] rounded-full blur-3xl"
        style={{
          left: `${b2x}%`,
          top: `${b2y}%`,
          background: `radial-gradient(circle, hsl(${p.c}) 0%, transparent 70%)`,
          opacity: o2,
          animation: "bite-blob-drift-b 41s ease-in-out infinite",
        }}
      />
      <div
        className="bite-blob-c absolute w-[45%] h-[45%] rounded-full blur-3xl"
        style={{
          left: `${b3x}%`,
          top: `${b3y}%`,
          background: `radial-gradient(circle, hsl(${p.b}) 0%, transparent 70%)`,
          opacity: o3,
          animation: "bite-blob-drift-c 55s ease-in-out infinite",
        }}
      />

      {/* Veil — uses paper token so the warm paper bleeds through in dark mode. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: isDark
            ? "hsl(var(--bite-paper) / 0.55)"
            : "hsl(var(--bite-paper) / 0.55)",
        }}
      />

      <div
        className="absolute inset-0 mix-blend-multiply opacity-[0.14] dark:mix-blend-overlay dark:opacity-[0.18]"
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: "220px 220px",
          animation: "bite-grain-drift 18s steps(6) infinite",
        }}
      />

      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-[hsl(var(--bite-rule))]" />
    </div>
  );
});

export default BiteCardBackground;
