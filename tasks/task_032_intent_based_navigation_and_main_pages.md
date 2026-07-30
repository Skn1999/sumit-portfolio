# Task 032: Intent-Based Header Navigation & Main Route Page Systems

**Task Name:** Intent-Based Header Navigation & Main Route Page Systems

**Context for the Task:**
Following the Information Architecture (IA) restructuring in Task 031, this task implements intent-driven navigation routing in [src/components/Header.tsx](file:///Users/SumitKumar/Desktop/consulting/portfolio/src/components/Header.tsx), connects all main page routes (`/`, `/projects`, `/projects?category=visual-design`, `/writings/publication`), and handles seamless anchor scrolling when sub-nav items are clicked.

---

## Requirements and Acceptance Criteria

### 1. Main Pages Creation & Route Mapping

Ensure all main routes defined by `mainRoute` in [src/components/Header.tsx](file:///Users/SumitKumar/Desktop/consulting/portfolio/src/components/Header.tsx) and [src/App.tsx](file:///Users/SumitKumar/Desktop/consulting/portfolio/src/App.tsx) are fully functional:

- **Route 1: `/` (Homepage)**
  - Page Component: `Index.tsx`
  - Sections: Hero, About & AI Philosophy (`#about`), Achievements (`#achievements`), Contact (`#contact`).
- **Route 2: `/ux-design` (UX Design Projects)**
  - Page Component: `ProjectList.tsx`
  - Renders UX design project showcase index.
- **Route 3: `/visual-design` (Visual Design Projects)**
  - Page Component: `ProjectList.tsx`
  - Renders list of behance projects.
- **Route 4: `/writings/publication` & `/ux-bites` (Writings)**
  - Page Component: `WritingsPage.tsx`
  - Renders Unsaid Moments publication newsletter embedding and UX bites content as a section. Refer to `UXBitesList.tsx` to get the content list

---

### 2. Intent-Based Hover-Out Route Transition in Header (`src/components/Header.tsx`)

Implement intention-driven navigation transitions inside the header:

- **State Tracking:** When the user hovers over any main navigation item (`Sumit Nayyar`, `UX Design`, `Visual Design`, `Writings`), store that item's `mainRoute` in header state (`intendedRoute`).
- **Hover-Out Transition:** When the user's cursor leaves the `<header>` / navbar container (`onMouseLeave`), check if `intendedRoute` is set and different from current route (`location.pathname + location.search`). If so, trigger a programmatic client-side navigation (`navigate(intendedRoute)`) using React Router **without a full page reload**. Then update the address in the browser address bar programatically.
- **State Reset:** Clear `intendedRoute` state upon navigation or when hover intention is cancelled.

---

### 3. Explicit Sub-Item Click & Smooth Section Scrolling

- When a user explicitly clicks a sub-nav item (e.g. `About`, `Contact`, `Publication`, `Research`):
  1. Prevent conflict with hover-out navigation by clearing `intendedRoute`.
  2. Navigate directly to the sub-item target route (`mainRoute` + section anchor e.g. `/#about`, `/#contact`, `/writings/publication`).
  3. Ensure the page smoothly scrolls to that targeted element ID upon page load / route change.

---

### 4. Visual Hierarchy & Header Formatting

- Make sure the `HeroSection.tsx` is always the first section in all of the main routes.
- Retain left-aligned column structure with comfortable padding (`px-6 py-3.5`).
- Main category items: bold uppercase monospace (`font-mono text-xs font-bold text-ink-primary uppercase`).
- Sub-nav items: small muted monospace links directly underneath (`font-mono text-[11px] text-ink-muted hover:text-ink-primary transition-colors`).

---

### 5. Verification

- Test hover-out intent navigation across all 4 main categories.
- Test explicit sub-item clicks for scroll positioning.
- Run `npm run build` to verify clean compilation without TypeScript or lint errors.

---

## What to Avoid

- **DO NOT trigger full page reloads:** All navigation must be client-side using React Router's `useNavigate()` hook.
- **DO NOT break existing project detail pages:** Ensure `/projects/:slug` case studies remain accessible.
