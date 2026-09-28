---
name: portfolio-asset-generator
description: >-
  Utility skill for capturing high-resolution prototype screenshots and generating
  studio-grade design system plates (tokens, typography, state machines) for portfolio case studies.
  Invoked on-demand when assets are missing, low-resolution, or need light/dark editorial captures.
---

# Portfolio Asset Generator

This sub-skill handles high-grade media asset production for portfolio case studies. It is decoupled from the narrative storytelling skill and should only be invoked when media assets are needed.

---

## Capabilities

1. **Headless High-DPI Prototype Capture (`capture-prototype.mjs`)**:
   - Launches headless Chrome via `playwright-core`.
   - Captures pages at 2x Retina scale with crisp font rendering.
   - Automatically toggles and captures both Light Mode and Dark Mode.
   - Navigates interactive flows (clicking drawers, opening decision sheets, triggering modals).
   - Crops or frames elements at exact human-scale aspect ratios (16:10 or 16:9).

2. **Studio Design System Plate Generation (`render-design-system-plate.mjs`)**:
   - Generates production-grade Figma/Studio aesthetic visual plates:
     - **Plate 01: Design Tokens & Surfaces** (Color ramps, elevation shadows, border tokens).
     - **Plate 02: Typography & Layout Grid** (Font family hierarchy, modular type scale, column breakpoints).
     - **Plate 03: Primitives & State Engine** (Deterministic state machines, component variants, badges).
   - Outputs clean, high-resolution PNGs matching the portfolio's paper-bg/paper-border aesthetic.

---

## Usage

### 1. Capturing a Live Web Prototype
Run the script passing the target URL, output directory, and target screens:
```bash
node .agent/skills/portfolio-asset-generator/scripts/capture-prototype.mjs \
  --url "https://my-live-prototype.vercel.app" \
  --outDir "src/content/projects/<project-slug>" \
  --theme "light"
```

### 2. Generating Design System Plates
Run the plate generator passing the project design tokens or metadata:
```bash
node .agent/skills/portfolio-asset-generator/scripts/render-design-system-plate.mjs \
  --project "actai" \
  --outDir "src/content/projects/<project-slug>" \
  --plates "tokens,typography,states"
```

---

## Standards for Portfolio Assets

- **Resolution**: Always capture at 2x device pixel ratio (DPR).
- **Default Viewport**: 1440x900 (Desktop) or 390x844 (Mobile).
- **Theme**: Light mode is the default showcase theme for case study flow breakdowns (high contrast, editorial legibility), with dark mode used selectively for contrast or system plates.
- **Framing**: Keep UI assets centered with subtle borders (`1px solid hsl(var(--paper-border))`) and rounded corners (`12px`). Never allow full-bleed images that dwarf the editorial prose.
