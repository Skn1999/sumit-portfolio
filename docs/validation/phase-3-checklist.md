# Phase 3 Checklist: Add Visual Design Credibility

**Phase Goal:** Create a new project that showcases pure visual/UI design craft and design systems thinking.

**Timeline:** Week 4–5  
**Validation Checkpoint:** 3–5 designers review the new project. Rating should be 7+/10 (credible, professional, clear visual craft).

---

## Choose Your Path

### Option A: Design System Showcase (Recommended)

**Create:** A new case study project: "Design System: Facility Operations Dashboard"

**Include:**

- Color palette with rationale (contrast ratios, safety-critical signaling)
- Typography scale and usage rules
- Component library: 6–10 key components (buttons, cards, tables, modals, alerts)
- Spacing grid
- Accessibility notes (WCAG compliance, alt text, keyboard nav)
- Figma link/embed showing the design system
- Application example: "Applied across 12+ screens in EDIAQI dashboard"

**Success Criteria:**

- [ ] Design system is clearly organized and documented
- [ ] Color choices have explicit rationale
- [ ] Typography hierarchy is intentional
- [ ] Components show multiple states (default, hover, active, disabled)
- [ ] Figma prototype/embed works
- [ ] Accessibility considerations are documented

### Option B: Visual Redesign

**Create:** A case study: "Redesign: [Public App Name]"

**Include:**

- Problem statement: "Current app has [specific UX issue]. I redesigned it to [solution]."
- Before/after comparison (3–5 key screens, side-by-side)
- Design rationale for each change (2–3 lines minimum)
- High-fidelity mockups of redesigned screens
- Interactive Figma prototype
- Design system applied (colors, typography, spacing, components)

**Success Criteria:**

- [ ] Problem is clearly stated
- [ ] Before/after screens clearly show improvement
- [ ] Design rationale is specific (not generic)
- [ ] Figma prototype is interactive and testable
- [ ] Visual craft is evident (not just wireframes)

---

## Implementation Steps

1. **Create the project**

   ```bash
   npm run new-project
   ```

   - Slug: `design-system-facilities` or `redesign-[app-name]`
   - Type: `design`
   - Title: "Design System: Facility Operations Dashboard" or "Redesign: [App]"

2. **Edit the MDX file**
   - Location: `src/content/projects/{slug}/index.mdx`
   - Add all content from your chosen path (Option A or B)

3. **Add images**
   - Store in: `src/content/projects/{slug}/`
   - Reference in MDX using `ProjectImageAsset` component
   - Filenames should be descriptive (e.g., `color-palette.png`, `button-states.png`)

4. **Embed Figma prototype**
   - Get your Figma URL
   - Embed using iframe or link (check existing projects for pattern)

5. **Build and test**
   ```bash
   npm run build
   npm run preview
   node docs/validation/check-links.js
   node docs/validation/check-accessibility.js
   ```

---

## Phase 3 Validation Checkpoint

### Automated Checks

```bash
npm run build
npm run preview
node docs/validation/check-links.js
node docs/validation/check-accessibility.js
node docs/validation/check-mobile-responsive.js
```

### Expert Review

**Share with 3–5 designers (ideally product designers or design systems specialists):**

**Prompts:**

1. "Rate this project 1–10 for visual craft and design systems thinking."
   - Target: 7+ across all reviewers
2. "Is the design intentional (rationale-driven) or aesthetic-driven?"
   - Target: "Intentional; I can see the thinking"
3. "Would you hire someone who created this?"
   - Target: "Yes, they clearly understand design systems / visual design"

### Success Criteria (Checkpoint)

- [ ] Average rating from 3+ designers: 7+/10
- [ ] Design rationale is clear to reviewers
- [ ] Figma prototype works and is interactive
- [ ] All links and images load correctly
- [ ] Mobile rendering is clean

---

## What's Next?

Once checkpoint passes:

- ✅ Move to **Phase 4: Figma Proficiency & Prototyping**
- Timing: Week 5–6
- Focus: Embed interactive prototypes in all case studies, document design tokens

If checkpoint doesn't pass:

- 🔄 Iterate based on designer feedback
- Clarify design rationale
- Enhance visual polish
- Re-rate before moving forward
