## Dark Mode — Easy on the Eyes

### Design philosophy

Avoid the two common mistakes:
- Pure black (#000) on pure white text — too high contrast, causes eye strain and halation
- Saturated brand colors at full strength — vibrate against dark backgrounds

Instead, use a **soft warm-neutral dark theme** inspired by Notion/Linear/iA Writer:
- Background: deep warm charcoal (not black), slight warm tint to avoid clinical feel
- Foreground: soft off-white (around 90% lightness), never pure white
- Reduced saturation on accent colors (~15–20% less than light mode)
- Layered surfaces: card slightly lighter than background to create depth without borders

```text
Background  ──  hsl(220 10% 9%)    deep warm charcoal
Card        ──  hsl(220 10% 12%)   one step lighter
Muted       ──  hsl(220 8% 16%)    surfaces / hovers
Border      ──  hsl(220 8% 20%)    subtle separators
Foreground  ──  hsl(40 10% 92%)    soft warm off-white
Muted text  ──  hsl(220 8% 65%)    secondary text
Primary     ──  desaturated mode color (engineer/designer)
```

### Implementation steps

**1. Add dark color tokens in `src/index.css`**
- Add a `.dark` block mirroring `:root` with the eye-friendly values above
- Add dark variants for `--engineer-*` and `--designer-*` tokens (lower saturation, higher lightness for accents so they pop without burning)
- Adjust `--designer-border` to a softer light shade for neubrutalism shadows in dark mode
- Tweak `--shadow-elegant` and any custom shadows so they remain visible on dark surfaces

**2. Theme provider**
- Create `src/contexts/ThemeContext.tsx` with `theme: 'light' | 'dark' | 'system'`
- Persist to `localStorage` under key `theme`
- On mount: read storage → fall back to `prefers-color-scheme`
- Toggle adds/removes `dark` class on `document.documentElement`
- Listen to `matchMedia('(prefers-color-scheme: dark)')` changes when in `system` mode
- Wrap app in `App.tsx` (outside ModeProvider so engineer/designer accents respect theme)

**3. Theme toggle UI**
- New `src/components/ThemeToggle.tsx`: small icon button (Sun / Moon / Monitor) using shadcn `DropdownMenu`
- Three options: Light, Dark, System
- Place it in `Header.tsx` next to the hamburger / mode toggle area

**4. Component audit pass**
- Replace any hardcoded `bg-white`, `text-black`, `bg-stone-50`, etc. with semantic tokens
- Specifically check: `Header` mobile menu (`bg-white`), `MetadataStrip`, `ProjectFooter`, `HeroRibbons`, gallery cards, prose styles
- Update `prose` classes to include `dark:prose-invert` where missing

**5. Image and visual tweaks for dark mode**
- Slightly dim hero photo and gallery images via `dark:opacity-90` to reduce glare
- Add subtle `dark:` variants to neubrutalism shadows so they stay visible
- Ensure 3D shapes / gradients reduce intensity in dark mode

**6. Smooth transition**
- Add `transition-colors duration-300` on body so theme switch feels gentle, not flash
- Disable transition on initial load (no flash of wrong theme) by setting theme class before React hydrates — inline script in `index.html`

**7. Accessibility & polish**
- Verify contrast: body text ≥ 7:1, secondary ≥ 4.5:1 (WCAG AAA where possible)
- Respect `prefers-reduced-motion` (already handled globally)
- Test both engineer and designer modes in dark theme

### Files to create
- `src/contexts/ThemeContext.tsx`
- `src/components/ThemeToggle.tsx`

### Files to modify
- `src/index.css` (add `.dark` token block, transition)
- `index.html` (inline pre-hydration theme script)
- `src/App.tsx` (wrap in ThemeProvider)
- `src/components/Header.tsx` (add ThemeToggle)
- Component audit: `Header`, `MetadataStrip`, `ProjectFooter`, prose styles, any `bg-white` / `text-black` usages