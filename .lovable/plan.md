## UX Bites refresh — three-part plan

### 1. Prototype link as a sticky chip

**Frontmatter (per bite)** — add optional fields in `src/lib/uxBites.ts` and the MDX files:
```
prototype:
  url: "https://urakka-hinturi-fi.lovable.app"
  label: "Live prototype"
```
Only bites with a prototype show the chip.

**New component** `src/components/uxBites/PrototypeChip.tsx`
- Pill-shaped chip rendered inside `UxBitePage` hero area, just under the eyebrow line.
- On scroll past hero, it detaches and becomes a small fixed chip in the top-right of the viewport (below the site header), with a subtle slide-in. Hidden on the list page.
- Magnetic hover (reuse existing magnetic primitive), arrow-up-right icon, mono label.
- `aria-label="Open live prototype in new tab"`, `target="_blank" rel="noreferrer"`.
- Inline anchor in MDX (`urakka-hinturi-fi.lovable.app` paragraph) gets removed in favor of the chip to avoid duplication.

Reduced-motion: skip slide animation, render chip statically.

---

### 2. Animated living cover gradients

Rewrite `src/components/uxBites/BiteCardBackground.tsx`:

- Replace static blobs with **3 seeded conic + radial gradient layers** that slowly drift using CSS keyframes (`@keyframes biteDrift` translating + rotating each layer 30–60s loop, different phases per layer).
- Bump saturation: base wash from `28% 96%` → richer `45% 88%` light / `55% 22%` dark. Pick palettes from a curated set of 8 duotone seeds (plum/ochre, ink/sand, moss/clay, indigo/peach, etc.) — seed picks a palette deterministically rather than random HSL, fixing the "dull" complaint.
- Grain stays but is animated via a slow `background-position` shift (subtle, ~20s loop).
- WCAG: keep the inner `bg-background/55` veil so foreground text contrast ratio stays ≥ 4.5:1 over the most saturated point. Verify with a contrast assertion comment in the file.
- Pause animations under `prefers-reduced-motion`.

Used on both list cards and (new) bite-page hero banner.

---

### 3. Distinct "Japanese zine" identity for UX Bites only

Scope: `/ux-bites` and `/ux-bites/:slug` only. Rest of portfolio untouched.

**Typography**
- Add Google Fonts: `JetBrains Mono` (headings + eyebrows) and `IBM Plex Mono` (body) — already partly used. Load only on UX Bites routes via a small `<UxBitesFontLoader />` mounted in `UxBitePage` and `UxBitesList`.
- New Tailwind families: `font-bite-display` (JetBrains Mono) and `font-bite-body` (IBM Plex Mono), added in `tailwind.config.ts`.

**Surface & color (scoped via a `.ux-bites-skin` class on `<Layout>` children)**
- Warm paper background: `--bite-bg: 38 28% 96%` light / `30 8% 10%` dark.
- Ink foreground: `30 14% 14%` light / `36 22% 90%` dark (no pure black/white — respects core memory).
- Single muted accent: `vermilion 8 70% 48%` (yen-stamp red) for the prototype chip, finding eyebrows, and link hover.
- Hairline rules (1px, `foreground/15`) replacing card borders within bite pages.

**Texture & motion (ambient, level 4/5)**
- Page-level grainy paper overlay (fixed, full-viewport, `pointer-events:none`, low opacity, animated `background-position` drift).
- Vertical right-edge tategaki marker (rotated mono text showing "UX BITE · 01" or product name), gently breathing opacity.
- "Breathing dot" next to the eyebrow row — small accent dot pulsing 3s.
- Finding numbers rendered as oversized mono "01 / 02" with hairline rule.
- All ambient motion respects `prefers-reduced-motion`.

**Layout tweaks**
- List page: keep card stack but swap typography to mono and apply new gradient backgrounds; add a small "Issue 01 · Summer 2026" zine label.
- Bite page: tighten hero (single-column, mono eyebrow, large display heading), add hairline meta strip (product · surface · reading time · date) instead of inline spans, sticky prototype chip as in §1, finding sections gain the mono numeral + hairline.

**No global token changes** — the skin is additive CSS scoped under `.ux-bites-skin`, so Designer/Engineer modes and the rest of the portfolio remain unaffected.

---

### Technical notes

- New/edited files (build phase):
  - `src/components/uxBites/BiteCardBackground.tsx` (rewrite)
  - `src/components/uxBites/PrototypeChip.tsx` (new)
  - `src/components/uxBites/UxBitesSkin.tsx` (new — wraps page, injects fonts + paper bg + tategaki marker)
  - `src/lib/uxBites.ts` (add `prototype` to `UxBiteMeta`)
  - `src/pages/UxBitePage.tsx` and `src/pages/UxBitesList.tsx` (apply skin, mount chip, restructure hero)
  - `src/content/ux-bites/*/index.mdx` (add `prototype:` frontmatter where applicable, remove duplicate inline link in urakkamaailma)
  - `src/index.css` (scoped `.ux-bites-skin` tokens + grain keyframes + paper texture)
  - `tailwind.config.ts` (mono font families)
- No business-logic changes. All edits are presentation-layer.
- Verification: build, then `browser--view_preview` on `/ux-bites` and both bite slugs; confirm chip behavior on scroll, contrast ≥ 4.5:1 over animated covers, reduced-motion fallback.

### Out of scope
- Adding new bites or imagery.
- Changing portfolio-wide typography or tokens.
- Backend / data work.
