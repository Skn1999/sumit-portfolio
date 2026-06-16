# Site-wide Dark Mode (Tea Ceremony)

Bring the same warm, calm dark aesthetic from the UX Bites zine to the entire portfolio. Existing `.dark` plumbing (ThemeProvider, ThemeToggle, `.dark` class on `<html>`) stays — we retune tokens, sweep hardcoded colors, and adapt the decorative hero/project layers.

## 1. Retune dark tokens in `src/index.css`

Replace the current cool dark palette with warm tea-ceremony values (aligned with the UX Bites skin so the whole site feels of one piece):

- `--background: 28 12% 9%` (deep warm charcoal ~#191512)
- `--card / --popover: 28 10% 13%` (raised paper ~#241f1a)
- `--foreground: 36 28% 86%` (warm off-white ~#e2d6c2)
- `--muted: 28 10% 15%` / `--muted-foreground: 36 14% 64%`
- `--border / --input: 30 10% 22%` (warm hairline)
- `--secondary: 28 10% 16%`
- `--primary`: keep a cool accent (`215 70% 65%`) so brand identity reads in dark — this is the "theme overrides mode tints" decision: the same `--primary` applies regardless of any legacy mode attribute
- `--accent`: vermilion `12 78% 56%` for warmth on CTAs/highlights (optional, sparing)
- `--ring`: match `--primary`
- Sidebar tokens follow the same family.
- Add a smooth `transition: background-color .3s, color .3s, border-color .3s` to body for graceful theme switch (already partially present).

Light mode tokens untouched.

## 2. Sweep hardcoded colors

Found via audit. Replace with semantic tokens / dark-aware variants:


| File                                                                                                            | Issue                                                                                 | Fix                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ResumePage.tsx`                                                                                                | `bg-white` photo frame, `shadow-[…rgba(0,0,0,1)]`, `text-white` on buttons            | `bg-card`, shadow uses `hsl(var(--foreground))`, button uses `text-primary-foreground`                                                                        |
| `ProjectImage.tsx`                                                                                              | `bg-black/0→/10` hover, `bg-black/90` lightbox, `bg-white/10`, `text-white`           | Lightbox stays dark (intentional overlay) but use `bg-foreground/90`; hover dim uses `bg-foreground/10`                                                       |
| `About.tsx`                                                                                                     | `bg-[#1769ff]/10` (Behance), `fill-[#1769ff]`, Dribbble `#ea4c89`                     | Keep brand hex for social-brand icons (Behance/Dribbble); these are legit brand colors. Add `dark:bg-[#1769ff]/15` for visibility. Leave a memory note.       |
| `About.tsx`, `HeroSection.tsx`, `Contact.tsx`, `Projects.tsx`, `FilterBar.tsx`, `MetadataStrip.tsx`, `Hero.tsx` | `bg-[hsl(var(--designer-primary))] text-white`, neubrutalism `text-white`, `bg-white` | Replace `text-white` with `text-primary-foreground`; `bg-white` cards become `bg-card`; neubrutalism shadows use `hsl(var(--foreground))` not `rgba(0,0,0,1)` |
| `HeroSection.tsx`                                                                                               | hero side cards have `text-white`/`bg-white/20` inside colored gradient tiles         | These sit on saturated gradient backgrounds — keep `text-white` (it's correct against the gradient, not theme-dependent). Document as exception.              |
| `SwirlText.tsx`                                                                                                 | default `color="#111"`                                                                | Pass theme-aware color from caller; default to `currentColor`                                                                                                 |
| `HeroWithSwirls.tsx`                                                                                            | inline `color: "#111"` for designer mode                                              | Use `currentColor` + parent `text-foreground`                                                                                                                 |
| `FloatingShapes3D.tsx`                                                                                          | pastel material colors `#b794f4` etc.                                                 | Add dark-mode color set (deepened) chosen via `useTheme()`                                                                                                    |


We will not chase truly-decorative gradient fills (hero swirls when on dark gradient background) — only fix where a hardcoded color breaks legibility in dark.

## 3. Hero & decorative layers

- `**HeroPhoto` / `HeroRibbons` / `HeroWithSwirls**`: read `useTheme()`; in dark, swap ribbon stroke/fill from near-black to `hsl(var(--foreground)/0.85)`; reduce ribbon opacity to ~0.6 to keep them calm on warm charcoal.
- `**FloatingShapes3D**`: theme-aware palette — dark uses deeper jewel tones (amethyst `#5b3a8a`, amber `#a07520`, teal `#2d6a6a`) at ~70% opacity.
- `**ScrollProgress` / `ReadingProgress**`: already use tokens; verify track contrast in dark (bump from `bg-muted` to `bg-muted/60` if needed).
- `**Projects` filter pills, About badges**: re-verify against new dark background.

## 4. Project & Resume pages

- `ProjectHero`: ensure overlay gradient (likely `from-black/60`) becomes `from-background/80` for token-driven dim.
- `MetadataStrip`: replace hardcoded shadows; ensure dividers use `border-border`.
- `TableOfContents`: active state uses `text-primary`, inactive `text-muted-foreground` — verify.
- `ResumePage`: photo frame `bg-white` → `bg-card`; neubrutalism shadow uses `hsl(var(--foreground))`; download button `text-white` → `text-primary-foreground`.
- `ProjectFooter`, `BeforeAfter`, `PullQuote`: spot-check, expect minor token swaps.

## 5. Default & toggle

- Keep `ThemeProvider` default `"system"` (no change).
- `ThemeToggle` in header stays the canonical control for the rest of the site. UX Bites pages keep their own zine-styled mini toggle (already shipped) which writes the same `theme` value.

## 6. Verification

For each route — `/`, `/projects`, `/projects/:slug` (pick one), `/resume`, `/ux-bites`, `/ux-bites/:slug` — preview in both themes:

- Text contrast (WCAG AA on body, AAA on long-form)
- Hero decorative layers don't blow out
- Cards, borders, hover states have enough separation from background
- No stark white panels or pitch-black overlays
- Theme switch is smooth (no flash, no layout shift)

## 7.  Extra Instructions

1. Implement the same Day/Night toggle as done in the UX bites in the header and keep it same across the site. After that remove the toggle from the UX bites subheader
2. Make sure to commit everything in sensible commits so that it is easier for me to decide what to commit to main branch and what to wait on

## Out of scope

- New pages, copy, or layout changes
- Replacing third-party brand hex (Behance/Dribbble icons)
- UX Bites skin tokens (already tuned in prior pass)
- Light-mode token changes

## Files likely touched

`src/index.css`, `src/components/HeroSection.tsx`, `Hero.tsx`, `HeroWithSwirls.tsx`, `HeroPhoto.tsx`, `HeroRibbons.tsx`, `FloatingShapes3D.tsx`, `SwirlText.tsx`, `About.tsx`, `Contact.tsx`, `Projects.tsx`, `FilterBar.tsx`, `ProjectImage.tsx`, `ScrollProgress.tsx`, `ReadingProgress.tsx`, `projects/MetadataStrip.tsx`, `projects/ProjectHero.tsx`, `projects/ProjectFooter.tsx`, `pages/ResumePage.tsx`. Memory updated: Core notes site-wide warm dark palette aligned with UX Bites.