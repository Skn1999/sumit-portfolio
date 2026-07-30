# Task 034: Groundwork Case Study Integration

**Task Name:** Groundwork Case Study Integration

**Context for the Task:**
Integrate a new case study for **Groundwork** under `src/content/projects/groundwork/index.mdx`. The production-ready markdown copy is available at `research/groundwork-case-study.md`. The project assets (cover image, metrics graphic, methodology diagram) are stored in `src/content/projects/groundwork/`.

---

## 1. File Structure & Assets

Target MDX File: `src/content/projects/groundwork/index.mdx`

Asset Files in `src/content/projects/groundwork/`:

- `cover.jpg` — Project cover image
- `metrics.avif` — Metrics graphic (to be placed right under the **Problem** section)
- `methodology.avif` — Methodology diagram (to be placed in the **Approach / Solution & Key Work** section)

---

## 2. Frontmatter Specification

```yaml
---
slug: "groundwork"
title: "Groundwork: Inclusive Design & Digital Accessibility Framework"
tagline: "An open-source delivery framework and facilitation model to embed accessibility into everyday product workflows."
date: "2025-11-30"
type: "design"
featured: false
cover:
  filename: "cover.jpg"
  alt: "Groundwork Inclusive Design and Digital Accessibility cover"
tech:
  - "Inclusive Design"
  - "Digital Accessibility"
  - "WCAG / EAA"
  - "Product Frameworks"
  - "Co-Design"
metric: "2nd Place Grand Finalist in EIT Jumpstarter 2025 out of 900+ European applicants"
summary: "An open-source delivery framework and co-design workshop model developed to help product teams turn complex accessibility guidelines (WCAG / EAA) into practical sprint tasks from day one."
roles:
  - "Co-founder"
  - "Framework & Facilitation"
  - "Research & Development"
order: 3
draft: false
---
```

---

## 3. Visual Layout & Section Structure

**Layout Requirement:** Keep the layout simple, clean, and single-column (wide editorial reading style following the portfolio's typography and spacing design language). Avoid complex multi-column grids or side-by-side splits.

### Section Blueprint for `index.mdx`:

1. **Imports:**

   ```tsx
   import { ProjectImageAsset } from "@/components/ui/project-image-asset";
   ```

2. **Header / Tagline Quote Callout:**

   > _"Better futures are built on strong foundations. Let’s lay the Groundwork together."_

3. **Problem Section:**
   - Text from `research/groundwork-case-study.md` Section 1 (Problem).
   - Directly beneath the text, render the metrics image:
     ```tsx
     <ProjectImageAsset
       src="groundwork/metrics.avif"
       alt="Groundwork program metrics and EIT Jumpstarter 2nd place achievement out of 900+ applicants"
     />
     ```

4. **Challenge & Role Section:**
   - Text from Section 2 (Challenge) & Section 3 (My Role), highlighting co-founder scope across Framework & Facilitation, Research & Mapping, Brand Strategy, and Accelerator Operations.

5. **Approach / Solution & Key Work Section:**
   - Text from Section 4 (Solution & Key Work) covering:
     - `01 // Open-Source Delivery Framework`
     - `02 // Co-Design Workshop Model`
     - `03 // Pan-European Validation`
   - Render the methodology diagram in this section:
     ```tsx
     <ProjectImageAsset
       src="groundwork/methodology.avif"
       alt="Groundwork methodology and open-source delivery framework process"
     />
     ```

6. **Outcome & Recognition Section:**
   - Text from Section 5 (Outcome) detailing:
     - **2nd Place Grand Finalist (out of 900+ European applicants)** at EIT Grand Final 2025 (New European Bauhaus category).
     - Practical validation that digital accessibility can be built into product delivery without slowing down launch velocity.

---

## 4. Acceptance Criteria

1. **MDX Creation:**
   - `src/content/projects/groundwork/index.mdx` is created with complete frontmatter and markdown body content.

2. **Image Placement & Rendering:**
   - Cover image `cover.jpg` is properly registered in frontmatter.
   - `metrics.avif` is positioned directly under the **Problem** section.
   - `methodology.avif` is positioned in the **Approach / Solution & Key Work** section.

3. **Layout & Styling:**
   - Simple single-column editorial layout (wide readability, consistent typography and dark/light design tokens).

4. **Build Verification:**
   - `npm run build` completes cleanly with 0 errors.
   - The route `/projects/groundwork` loads smoothly and appears in project listings (`src/lib/projects.ts` dynamic glob picking up the new project).

---

## 5. What to Avoid

- **DO NOT** use multi-column splits or crowded cards that break the requested wide single-column editorial layout.
- **DO NOT** modify original source image files in `src/content/projects/groundwork/`.
