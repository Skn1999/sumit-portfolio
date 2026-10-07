# Content Inventory & Verification: "The Spiral"

This document records all copy, links, assets, and design data decisions for "The Spiral" portfolio (`research/silo.md`), serving as the definitive content specification.

---

## 1. Status Summary

| Section | Status | Source / Notes |
|---|---|---|
| **Mode A Intro** | Confirmed & Verified | Headline, value statement, 3 company timeline rows |
| **Level 01 (Work)** | Confirmed & Verified | 3 companies, verified outcomes, 4 internal sub-project routes |
| **Level 48 (Process)** | Confirmed & Verified | Title, intro, 3 methodology pillars, 2 live tool links |
| **Level 96 (Hiking & food)**| Confirmed & Verified | Title, 4 field notes (Dolomites, Nuuksio, India, Circular Kitchen) |
| **Level 144 (Unsaid Moments)** | Confirmed & Verified | Title, intro, excerpt, Substack external link, full contact block |

---

## 2. Mode A: Landing Intro

- **Headline**:
  > "I'm Sumit, a product designer who engineers."
- **Value statement**:
  > "I bridge user research, cognitive science, and production engineering to help businesses untangle complex workflows and ship high-craft products with confidence."
- **Company Timeline Rows**:
  1. `2025 — Now`: Groundwork — *UX & Accessibility Designer*
  2. `Mar – May '26`: Dedanext S.p.a — *Product Design Intern*
  3. `2020 — 2024`: Optmyzr Inc. — *Design Engineer*

---

## 3. Level 01: Work

- **Level ID**: `L1` (n=1, `cy=0.17`, `zoom=3.2`)
- **Eyebrow**: `LEVEL 01`
- **Label**: `Work`
- **Title**: `Selected work`
- **Items & Sub-projects**:
  1. **Groundwork** (`2025 — Now`)
     - Role: *UX & Accessibility Designer*
     - Outcome: *"Co-designed WCAG AA/AAA guidelines with disabled communities. 2nd place, EIT Jumpstarter."*
     - Sub-project link: `Groundwork Accessibility Kit` -> `/projects/groundwork`
  2. **Dedanext S.p.a** (`Mar – May '26`)
     - Role: *Product Design Intern*
     - Outcome: *"EU Horizon EDIAQI project: tested 6 ambient indoor air-quality display concepts with 200 users, +30% comprehension speed."*
     - Sub-project link: `EDIAQI Ambient Display & DSS` -> `/projects/ediaqi-decision-support-system`
  3. **Optmyzr Inc.** (`2020 — 2024`)
     - Role: *Design Engineer*
     - Outcome: *"Built 30+ React design-system components, migrated high-density analytics dashboards from 10s to under 1s, cut onboarding drop-off by 25%."*
     - Sub-project link 1: `Optmyzr Dashboard Migration` -> `/projects/optmyzr-dashboard-migration`
     - Sub-project link 2: `Optmyzr Onboarding Wizard` -> `/projects/optmyzr-onboarding-experience`

---

## 4. Level 48: Process

- **Level ID**: `L48` (n=48, `cy=0.39`, `zoom=3.2`)
- **Eyebrow**: `LEVEL 48`
- **Label**: `Process`
- **Title**: `How I work`
- **Intro**:
  > "Research with the people who use the thing, design with them, then build it properly."
- **3 Pillars**:
  1. **Cognitive & User Research**: Dual-process theory, mental models, contextual inquiry.
  2. **Participatory Design**: Co-design workshops, accessible prototypes, early friction testing.
  3. **Production Engineering**: Design token architecture, React/TypeScript performance, accessible UI systems.
- **Live Tools**:
  1. **AI Email Delegation Client** -> `/projects/actai`
  2. **Remonttihintojen tutkija: 132k Renovation Price Explorer** -> `/ux-bites/urakkamaailma-pricing-gap`

---

## 5. Level 96: Hiking & Food

- **Level ID**: `L96` (n=96, `cy=0.62`, `zoom=3.2`)
- **Eyebrow**: `LEVEL 96`
- **Label**: `Hiking & food`
- **Title**: `Off the screen`
- **4 Field Notes**:
  1. **Dolomites (Italy)**:
     > "High-altitude limestone switchbacks where physical constraint and thin air strip away noise and clarify decision-making."
  2. **Nuuksio (Finland)**:
     > "Boreal silence and ancient granite bedrock—the quiet Nordic reminder that simplicity is an active discipline."
  3. **India (Himalayas & Deccan)**:
     > "The layered intensity of Himalayan passes and Deccan trails, where every path has been walked for thousands of years."
  4. **Circular Kitchen & Fermentation**:
     > "Treating scraps not as waste but as flavor catalysts; fermentation as patient systems engineering in a cast-iron pot."

---

## 6. Level 144: Unsaid Moments

- **Level ID**: `L144` (n=144, `cy=0.88`, `zoom=3.0`)
- **Eyebrow**: `LEVEL 144`
- **Label**: `Unsaid Moments`
- **Title**: `Unsaid Moments`
- **Intro**:
  > "Essays about human connection: friends, family, and the quiet shifts that stay unsaid."
- **Excerpt**:
  > "It is often the pauses between sentences, the unsaid glances in crowded rooms, and the friction in mundane interactions that reveal what truly matters to us."
- **Essay Link**:
  - Label: `Read Unsaid Moments on Substack`
  - URL: `https://sumit6131.substack.com/` (External link, opens with arrow icon)
- **Contact & Socials (shared with footer)**:
  - Email: `sknayyar.sk@gmail.com` (`mailto:sknayyar.sk@gmail.com`)
  - LinkedIn: `https://www.linkedin.com/in/sumitnayyar-ux/`
  - GitHub: `https://github.com/Skn1999`
  - Behance: `https://www.behance.net/sumitnayyar`

---

## 7. Asset Pipeline Verification

- **Script**: `scripts/optimize-assets.mjs` (run via `pnpm assets` / `npm run assets` / `node scripts/optimize-assets.mjs`)
- **Cleaning filter**: `scripts/clean-hero-line.mjs` (masks out garbled left border marks, pipe numbers including 0807, right edge border anomalies, and bottom title block artifacts)
- **Output directory**: `public/assets/`
- **Formats & Widths**:
  - Widths: `1080px`, `1536px`
  - Formats: AVIF (quality 50), WebP (quality 72), JPEG (quality 80)
  - Total assets generated: 36 files across 6 source plates (`hero-photo`, `hero-line`, `plate-01`, `plate-48`, `plate-96`, `plate-144`)
  - `hero-line-1080.avif` payload: **197.1 KB** (strictly inside the 350 KB LCP budget)
- **Generated Module**: `src/data/assets.generated.ts` exporting `<picture>`-ready source sets and level mappings.
- **Manifest**: `src/data/manifest.json` with dimensions `1536x2752`, aspect `0.5581395349`, and initial camera calibration coordinates (`cy`, `zoom`) for all 4 levels.
