# Task 033: Update Header Menu Hierarchy & Related Main Route Pages

**Task Name:** Update Header Menu Hierarchy & Related Main Route Pages

**Context for the Task:**
The navigation structure in `research/ai-interactive-portfolio-vision.md` has been updated with a refined 4-column hierarchy. This task updates `src/components/Header.tsx`, creates/updates the related main route pages (including a new `DataEngineeringPage`), maps sub-item section anchors, and updates 3D particle canvas intent matching.

---

## 1. Updated Menu Hierarchy Specification

The top desktop navigation bar will feature 4 equal viewport columns corresponding to the 4 main categories and their sub-items:

| Column Header        | Main Route              | Sub-Item Label        | Sub-Item Route / Anchor                  |
| -------------------- | ----------------------- | --------------------- | ---------------------------------------- |
| **Sumit Nayyar**     | `/`                     | About                 | `/#about`                                |
|                      |                         | Contact               | `/#contact`                              |
| **Design**           | `/ux-design`            | User Experience       | `/ux-design`                             |
|                      |                         | Visual Design         | `/visual-design`                         |
| **Data Engineering** | `/data-engineering`     | AI and Data           | `/data-engineering#ai-data`              |
|                      |                         | Front-end Engineering | `/data-engineering#frontend-engineering` |
| **Writings**         | `/writings/publication` | Publication           | `/writings/publication`                  |
|                      |                         | UX Bites              | `/writings/research`                     |

---

## 2. Implementation Action Items

### A. Header Component Update (`src/components/Header.tsx`)

- Update `NAV_HIERARCHY` array to reflect the new structure:
  - `Sumit Nayyar` -> Main: `/`, Sub-items: `About` (`/#about`), `Contact` (`/#contact`)
  - `Design` -> Main: `/ux-design`, Sub-items: `User Experience` (`/ux-design`), `Visual Design` (`/visual-design`)
  - `Data Engineering` -> Main: `/data-engineering`, Sub-items: `AI and Data` (`/data-engineering#ai-data`), `Front-end Engineering` (`/data-engineering#frontend-engineering`)
  - `Writings` -> Main: `/publication`, Sub-items: `Publication` (`/publication#publication`), `UX Bites` (`/publication#ux-bites`)
- Ensure mobile navigation menu renders all 4 main categories and sub-items cleanly.

### B. Routing Configuration (`src/App.tsx`)

- Register `/data-engineering` route pointing to `DataEngineeringPage`.
- Register `/design` route (redirect or direct route to `UxDesignPage`).
- Verify existing routes (`/ux-design`, `/visual-design`, `/writings/publication`, `/writings/research`) operate smoothly under the new structure.

### C. Create `DataEngineeringPage.tsx` (`src/pages/DataEngineeringPage.tsx`)

- Create a dedicated route page for Data & Front-end Engineering:
  - Hero section at top (`HeroSection`).
  - Section `#ai-data`: Focus on AI LLM Workflows, Prompt Engineering, Agent Systems, Data Pipelines.
  - Section `#frontend-engineering`: Focus on Front-end Architecture, WebGL / R3F engineering, Design System & UI performance.

### D. Update `WritingsPage.tsx` (`src/pages/WritingsPage.tsx`)

- Ensure distinct section IDs `#publication` and `#research` (or active tab switching based on hash / path `/writings/publication` vs `/writings/research`) are supported for smooth scrolling and deep-linking.

### E. 3D Canvas Intent Category Mapping (`src/components/HeroParticleCanvas.tsx`)

- Update `CategoryKey` union type and `getCategoryKey()` helper to recognize `/data-engineering` routes.

---

## 3. Acceptance Criteria

1. **Header Layout & Navigation:**
   - Desktop header displays 4 left-aligned columns: `Sumit Nayyar`, `Design`, `Data Engineering`, `Writings`.
   - Hovering over category titles updates intent state for route transition and 3D particle morphing.
   - Clicking sub-items navigates cleanly and scrolls to targeted section anchors.

2. **Page Content & Anchor Alignment:**
   - Navigating to `/data-engineering` displays the Data Engineering page with `#ai-data` and `#frontend-engineering` sections.
   - Navigating to `/writings/research` and `/writings/publication` loads the Writings page with the respective target section highlighted or scrolled into view.

3. **Build & Quality:**
   - `npm run build` compiles with 0 TypeScript or React errors.

---

## 4. What to Avoid

- **DO NOT** break existing project slug routes (`/projects/:slug`).
- **DO NOT** cause page reloads during hover-out navigation or sub-item anchor jumps.
