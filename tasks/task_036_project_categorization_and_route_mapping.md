# Task 036: Project Categorization, Frontmatter Updates, and Navigation Route Mapping

**Task Name:** Project Categorization, Frontmatter Updates, and Navigation Route Mapping

**Context for the Task:**
Categorize all 8 projects in the portfolio codebase to align with the new site header navigation hierarchy (**Design** -> UX Design / Visual Design, **Data Engineering** -> AI & Data / Front-End Engineering, **Writings**, and **Hidden**).

---

## Final Project Categorization Matrix

| # | Project Name | Category | Sub-Category | Route Target / Link Type | Frontmatter Status |
|---|---|---|---|---|---|
| 1 | **Groundwork** (`groundwork`) | Design | UX Design | `/projects/groundwork` | `draft: false` |
| 2 | **EDIAQI** (`ediaqi-decision-support-system`) | Design | UX Design | `/projects/ediaqi-decision-support-system` | `draft: false` |
| 3 | **Optmyzr Dashboard Migration** (`optmyzr-dashboard-migration`) | Data Engineering | Front-End Engineering | `/projects/optmyzr-dashboard-migration` | `draft: false` |
| 4 | **SuperEgo App (YOU)** (`super-ego-app`) | Design | Visual Design | `/projects/super-ego-app` | `draft: false` |
| 5 | **Social Integration & Participatory Design** (`social-integration-pd`) | Design | UX Design | `/projects/social-integration-pd` | `draft: false` |
| 6 | **Spatial Design & Ergonomic Dining** (`spatial-design-restaurant`) | Hidden | N/A | N/A | `draft: true` |
| 7 | **Music Store App** (`music-store-app`) | Design | Visual Design | Behance External Link | `draft: false` |
| 8 | **Rewards Convertor App** (`rewards-convertor-app`) | Design | Visual Design | Behance External Link | `draft: false` |

---

## Detailed Update Plan & Action Steps

### Step 1: Update Project Metadata Type & Helpers (`src/lib/projects.ts`)
- Extend `ProjectMeta` interface with optional `subCategory` and `externalUrl` properties:
  ```ts
  subCategory?: "ux-design" | "visual-design" | "ai-data" | "frontend-engineering";
  externalUrl?: string;
  ```
- Add helper functions to filter projects by sub-category:
  - `getProjectsBySubCategory(subCat)`
  - `getProjectsByCategory(type)`

---

### Step 2: Frontmatter Updates in MDX Files
Update `index.mdx` files across all 8 projects:

1. **`groundwork/index.mdx`**:
   - `type: "design"`
   - `subCategory: "ux-design"`
2. **`ediaqi-decision-support-system/index.mdx`**:
   - `type: "design"`
   - `subCategory: "ux-design"`
3. **`optmyzr-dashboard-migration/index.mdx`**:
   - `type: "engineering"`
   - `subCategory: "frontend-engineering"`
4. **`super-ego-app/index.mdx`**:
   - `type: "design"`
   - `subCategory: "visual-design"`
5. **`social-integration-pd/index.mdx`**:
   - `type: "design"`
   - `subCategory: "ux-design"`
6. **`spatial-design-restaurant/index.mdx`**:
   - `draft: true`
7. **`music-store-app/index.mdx`**:
   - `type: "design"`
   - `subCategory: "visual-design"`
   - `externalUrl: "https://www.behance.net/gallery/..."` (Behance link target)
8. **`rewards-convertor-app/index.mdx`**:
   - `type: "design"`
   - `subCategory: "visual-design"`
   - `externalUrl: "https://www.behance.net/gallery/..."` (Behance link target)

---

### Step 3: Page Route Listing Integrations
1. **Design Page (`src/pages/UxDesignPage.tsx` / `VisualDesignPage.tsx` / `DesignPage.tsx`)**:
   - Section 1 (`#ux-design`): Render UX Design projects (Groundwork, EDIAQI, Social Integration & PD).
   - Section 2 (`#visual-design`): Render Visual Design projects (SuperEgo App, Music Store App, Rewards Convertor App).
   - Render Behance external links cleanly with an external link indicator arrow (`↗`).

2. **Data Engineering Page (`src/pages/DataEngineeringPage.tsx`)**:
   - Section 1 (`#ai-data`): AI & Data engineering projects / research.
   - Section 2 (`#frontend-engineering`): Front-End Engineering projects (Optmyzr Dashboard Migration).

3. **Homepage Showcase (`src/components/Projects.tsx`)**:
   - Update showcase grid/list to display active non-draft projects, respecting external URLs for Behance projects.

---

### Step 4: Verification & Build Quality
- Run `npm run build` to ensure static page generation succeeds and TypeScript compiles cleanly.
- Verify sub-nav header intent clicks navigate directly to the proper section anchors (`/ux-design#ux-design`, `/ux-design#visual-design`, `/data-engineering#frontend-engineering`).
