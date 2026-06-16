## Dark mode for UX Bites — plan

The infrastructure already exists: `ThemeContext` drives `.dark` on `<html>`, and `.ux-bites-skin` already declares a `.dark` token block. This is a tuning + coverage pass to make dark mode feel intentionally zine-like rather than auto-inverted.

### 1. Retune the "paper" tokens — Tea Ceremony

In `src/index.css`, under `.dark .ux-bites-skin`:

- `--bite-paper: 28 12% 9%` (deep warm charcoal, ~#191512)
- `--bite-paper-raised: 28 10% 13%` (~#241f1a, used for card surfaces / sticky chip)
- `--bite-ink: 36 28% 86%` (soft off-white #e2d6c2, never pure white)
- `--bite-ink-soft: 36 14% 64%`
- `--bite-rule: 30 10% 22%` (hairlines remain visible but quiet)
- `--bite-accent: 12 78% 56%` (lacquer vermilion #d94a26 — slightly brighter than light mode for contrast on dark)

Add a light-mode counterpart `--bite-paper-raised: 36 30% 99%` so components can use one token in both modes.

### 2. Dark-tuned cover gradients

`BiteCardBackground.tsx` currently uses one pastel palette set (L 78–86%). Add a parallel dark palette array:

- Same 8 duotone pairings, but shifted to L 22–34% and S +5–10% (e.g. plum/ochre → wine/amber, ink/sky → midnight/teal, moss/clay → forest/rust).
- Pick from light or dark array based on `useTheme().resolvedTheme`.
- Lower per-blob `opacity` from 0.7/0.65/0.55 → 0.55/0.5/0.4 in dark so blobs read as moody ambient glows.
- Veil: switch from `bg-background/70` to `bg-[hsl(var(--bite-paper)/0.55)]` in dark so the warm paper hue bleeds through instead of the global background.
- Grain in dark: keep `mix-blend-overlay` but drop opacity 0.22 → 0.18 to avoid muddiness on top of darker blobs.

Maintains WCAG AA: foreground ink #e2d6c2 over the veiled paper #191512 stays >7:1.

### 3. Zine-styled in-page toggle

New component `src/components/uxBites/BiteThemeToggle.tsx`:

- Two-segment pill, JetBrains Mono uppercase: `[ ☀ DAY ] [ ☾ NIGHT ]`.
- Active segment fills with `--bite-accent`, inactive is `--bite-ink-soft` on transparent.
- 1px `--bite-rule` border, no shadow, no rounded-full (use `rounded-sm` to keep editorial feel).
- Reads/writes via existing `useTheme()` — stays in sync with the global header toggle.
- Respects `prefers-reduced-motion` (no crossfade animation when reduced).

Placement:
- `UxBitesList`: in the centered header row, just under the issue marker line.
- `UxBitePage`: top of the article, opposite the `← UX Bites` back link (same row as the issue No. marker line, right side).

The existing global `ThemeToggle` in `Header` stays untouched.

### 4. Component-level polish for dark

- **`PrototypeChip`** (sticky variant): currently likely uses `bg-background/X`. Switch to `bg-[hsl(var(--bite-paper-raised)/0.85)] backdrop-blur` with `--bite-rule` border and `--bite-accent` arrow icon so it reads on dark.
- **`FindingHeader`**: oversized mono number uses `--bite-ink-soft` — verify it doesn't disappear; bump opacity slightly in dark via the token (already handled by token bump).
- **`BiteSection` / hairline rules**: confirm they use `bite-rule` token, not hardcoded `border-foreground/10`.
- **Tategaki marker**: already token-driven; verify opacity reads at the new ink-soft value.
- **MDX images**: add `dark:opacity-90` utility on `BiteImage` to take the edge off bright screenshots on dark paper (optional — only if a screenshot pass shows them glaring).

### 5. Verification

After the edits:
- `browser--view_preview` at `/ux-bites` and `/ux-bites/urakkamaailma-pricing-gap` in both themes.
- Screenshot at 1280 and 390 widths in dark mode; check: paper warmth, blob saturation, chip legibility, toggle alignment, tategaki visibility.
- Reduced-motion: confirm grain/blob/dot animations halt.

### Out of scope

- Changing global site dark tokens (only `.ux-bites-skin` scope).
- New bites, new MDX components, layout restructure.
- Storing a per-section theme override (toggle remains globally synced).

### Files touched

- `src/index.css` — retune `.dark .ux-bites-skin` tokens, add `--bite-paper-raised`, grain/veil tweaks.
- `src/components/uxBites/BiteCardBackground.tsx` — dark palette array + `useTheme` selection + dark veil.
- `src/components/uxBites/PrototypeChip.tsx` — token-based surface for dark.
- `src/components/uxBites/BiteThemeToggle.tsx` — new.
- `src/pages/UxBitesList.tsx`, `src/pages/UxBitePage.tsx` — mount toggle.
- (Conditional) `src/components/uxBites/BiteImage.tsx` — dark opacity tweak.
