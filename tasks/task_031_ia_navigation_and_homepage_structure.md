# Task 031: Information Architecture (IA) & Navigation Restructuring

**Task Name:** Information Architecture (IA) & Navigation Restructuring

**Context for the Task:**
The objective of this task is to restructure the site's Information Architecture (IA), navigation dropdown hierarchy, routing system, and homepage section order based on [research/ai-interactive-portfolio-vision.md](file:///Users/SumitKumar/Desktop/consulting/portfolio/research/ai-interactive-portfolio-vision.md).

**CRITICAL SCOPE BOUNDARY:** This task is **strictly limited to Information Architecture (IA), routing, section ordering, and content mapping**. All 3D particle canvas animations, shader work, and visual theme overhauls are explicitly out of scope for this task and will be handled in a separate visual task.

---

## Current State

- [src/components/Header.tsx](file:///Users/SumitKumar/Desktop/consulting/portfolio/src/components/Header.tsx) renders single-level navigation items (`Projects`, `UX Bites`, `About`, `Contact`).
- [src/App.tsx](file:///Users/SumitKumar/Desktop/consulting/portfolio/src/App.tsx) defines routes for `/`, `/resume`, `/projects`, `/projects/:slug`, `/ux-bites`, `/ux-bites/:slug`.
- [src/pages/Index.tsx](file:///Users/SumitKumar/Desktop/consulting/portfolio/src/pages/Index.tsx) renders sections in the following order: `HeroSection`, `Projects`, `AcademicCohorts`, `ProfessionalCredentials`, `Contact`, `UnsaidMoments`, and `Footer`.

---

## Requirements and Acceptance Criteria

### 1. Navigation Hierarchy & Header Dropdowns (`src/components/Header.tsx`)

Update the fixed top navigation bar to render a multi-level / dropdown navigation hierarchy matching the new IA:

- **1. Sumit Nayyar** (Main Menu Trigger / Dropdown)
  - Sub-item: `About` -> (`/#about` or `/about`)
  - Sub-item: `Contact` -> (`/#contact` or `/contact`)
- **2. UX Design** (Main Menu Trigger / Dropdown)
  - Sub-item: `Projects` -> (`/projects` or `/ux-design/projects`)
- **3. Visual Design** (Main Menu Trigger / Dropdown)
  - Sub-item: `Projects` -> (`/visual-design/projects` or `/projects?category=visual-design`)
- **4. Writings** (Main Menu Trigger / Dropdown)
  - Sub-item: `Publication` -> (`/writings/publication`)
  - Sub-item: `UX Bites` -> (`/ux-bites`)

Ensure dropdown menus support accessible keyboard navigation, hover/click triggers, and responsive mobile drawers.

---

### 2. Homepage Section Order & Structure (`src/pages/Index.tsx`)

Re-order and structure the homepage sections in exact sequential order:

1. **Hero Section (`src/components/HeroSection.tsx`)**:
   - Fixed top navigation bar at the top.
   - Viewport bottom bar: Location on the left (`Helsinki, FI`), Availability status on the right (`Immediate Availability`).
2. **About & AI Philosophy Section (`src/components/AboutSection.tsx`)**:
   - Bio text highlighting background & AI engineering capabilities:
     > _"I am an User Experience and Behavioural Design graduate from Aalto University, Finland and University of Trento, Italy. Recently, I collaborated with EU Horizon Project to work on Indoor Air Quality monitoring project. I focus on design engineering products. Having knowledge of both the frontend and the backend, I am able to craft the experience exactly as desired. Due to my background in Design, I bring a fresh, user-focused perspective to interaction design."_
3. **Achievements Section (`src/components/AchievementsSection.tsx`)**:
   - Layout: 2-Column 40-60% `/projects/:slug`
     - **Left Side**: Heading `Achievements`, Subtext `An overview of my credentials and skills.`
     - **Right Side**: Content sourced from `public/Resume-Design-Engineer.pdf` / CV:
       - 1. Experience
       - 2. Skills
       - 3. Languages
4. **Contact Section (`src/components/Contact.tsx`)**:
   - Interactive contact card, social links (LinkedIn, Behance, GitHub), copyable email link.

---

### 3. Routing System Updates (`src/App.tsx`)

- Ensure React Router supports new navigation routes cleanly:
  - `/` -> Homepage (`Index.tsx`)
  - `/projects` -> Project List page
  - `/writings/publication` -> Routes to Substack `https://sumit6131.substack.com/?utm_campaign=portfolio`
  - `ux-bites` -> UX bites page
  - Each individual project links to `/projects/:slug`

---

### 4. Build Verification

- Verify that `npm run build` completes cleanly with zero TypeScript or lint errors.

---

## What to Avoid

- **DO NOT attempt 3D particle canvas or R3F shader work in this task:** Keep focus strictly on IA, routes, dropdowns, and section structures.
- **DO NOT delete or break existing case study routes** (`/projects/optmyzr-dashboard-migration`, `/projects/ediaqi-decision-support-system`, etc.).
