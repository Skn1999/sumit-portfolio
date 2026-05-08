## Dark mode shadow + background refinement

The neubrutalism cards and buttons currently use `--designer-border` / `--designer-shadow` set to a light warm tone (`40 10% 80%`) in dark mode. On the dark charcoal background this reads as a soft glow rather than a shadow, so the offset blocks lose their punchy 3D feel. We'll flip the shadows to a darker-than-background tone and lift the background a touch so cards still separate cleanly.

### Changes (all in `src/index.css`, `.dark` block only)

**1. Lift the background slightly**
- `--background`: `220 12% 9%` → `220 11% 12%` (a touch lighter, still warm charcoal)
- `--card`: `220 11% 12%` → `220 10% 15%` (one step above background so cards keep depth)
- `--popover`: match new card value
- `--secondary` / `--muted`: `220 10% 16%` → `220 9% 18%` (keep one step above card)
- `--border`: `220 8% 20%` → `220 8% 23%` (subtle bump so borders remain visible on the lighter bg)

**2. Switch neubrutalism shadows to a true dark tone**
- `--designer-border`: keep light (`40 10% 80%`) — this is used as the visible border stroke around cards/buttons and needs to contrast against the dark bg
- `--designer-shadow`: `40 10% 80%` → `220 30% 3%` (near-black warm shadow that reads as depth, not glow)

**3. Update neubrutalism utility classes to use `--designer-shadow` instead of `--designer-border` for the box-shadow**
The current rules in `src/index.css` hardcode `box-shadow: 8px 8px 0px hsl(var(--designer-border))`. We'll change these specific shadow declarations (not the borders) to reference `--designer-shadow`:
- `.neubrutalism-card`
- `.neubrutalism-button` (default, hover, active)
- `[data-mode="designer"] .card-styled` (default + hover)
- `[data-mode="designer"] .badge-styled`
- `.glow-designer`

In light mode `--designer-shadow` is already `0 0% 15%` (dark), so behavior there is unchanged. In dark mode it now becomes near-black, giving real shadow contrast against the lifted charcoal background.

### Why this works
- Lighter background (12% L) + near-black shadow (3% L) = ~9 points of lightness difference, enough for the offset blocks to read as solid shadows
- Border stays light so the card outline still pops
- Light mode is untouched

### Files to modify
- `src/index.css` — update `.dark` token values and swap `--designer-border` → `--designer-shadow` in the box-shadow declarations of the neubrutalism utilities