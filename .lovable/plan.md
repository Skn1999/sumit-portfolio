## Redesign UX Bites cards

Replace the current landscape, image-led cards on `/ux-bites` with portrait, typography-only cards featuring grainy/blurry textured backgrounds.

### New card design

- **Orientation:** Portrait (~3:4), e.g. `w-[320px] md:w-[360px]` × `h-[440px] md:h-[500px]`. Stack remains centered and swipeable.
- **No imagery.** Cover images are not rendered on the list. (Files stay in content folders, still used on detail pages.)
- **Content, top-to-bottom:**
  1. Tiny meta row (date · reading time) — muted, uppercase, tracked
  2. Company in **small caps**, tracked (`uppercase tracking-[0.25em] text-xs`)
  3. Large title beneath (`text-3xl md:text-4xl font-semibold leading-tight`)
  4. Spacer
  5. Hook (2–3 lines, muted)
  6. Tag chips + "N findings" pinned to bottom
- **Background:** Grainy, blurry, textured — generated in CSS per card so no extra assets:
  - Base: per-bite warm/cool tinted gradient (derive a hue from slug hash, kept within the project's neutral palette: warm beige / pale blue / soft gray)
  - Soft blurred color blobs (2–3 absolutely-positioned `rounded-full blur-3xl opacity-40` divs)
  - SVG fractal-noise grain overlay (`<svg><filter><feTurbulence/></filter></svg>` as a data-URI background) at low opacity for the "film grain" feel
  - Subtle inner border + soft shadow to keep the gallery/minimal aesthetic

### Files touched

- `src/pages/UxBitesList.tsx` — swap card markup: remove `BiteImage`, restructure to portrait layout, adjust stack height (`h-[500px] md:h-[540px]`) and ghost-card sizing.
- `src/components/uxBites/BiteCardBackground.tsx` *(new)* — renders the gradient + blurred blobs + grain overlay. Takes the bite slug (for deterministic hue) and renders absolutely behind card content.

### Out of scope

- Detail page (`UxBitePage.tsx`) and its hero are unchanged.
- No changes to content MDX, routing, or nav.
- Cover images remain on disk for detail pages.
