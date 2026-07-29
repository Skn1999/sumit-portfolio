# Learnings

This file acts as a reference of concrete lessons, guidelines, and surprises encountered during development. Future agents should review this reference and append new entries using the template below.

## Entry Template

```md
### YYYY-MM-DD - <task file path>

- Lessons learned:
- Errors or surprises:
- Resolution:
- Future instruction:
```

---

## 💡 Developer Guidelines & Rules Reference

### 1. Workflow & Tooling

- **Required Context**: Read `.agent/architecture.md` and `.agent/tech-stack.md` before starting source file changes.
- **Progress Reporting**: Always update `.agent/progress.md` and `.agent/learnings.md` at the end of each task (or when blocked).
- **Git Check**: Running `npm run build` runs image optimization prebuild hooks, which may rewrite unrelated assets. Check `git status` post-build.
- **Targeted Linting**: If the workspace contains pre-existing lint issues in unrelated legacy/third-party files, test modifications specifically via targeted commands (e.g. `./node_modules/.bin/eslint <file_path>`).

### 2. React & TypeScript

- **Hook Rules**: Always declare React hooks at the top level of components, prior to any conditional returns. Put conditional logic inside hook callbacks.
- **Static Declarations**: Declare static configurations and data arrays _outside_ of component functions (module scope) to prevent `react-hooks/exhaustive-deps` loops and redundant re-renders.
- **Window Extensions**: Extend the global `Window` interface in TypeScript for dynamic libraries (e.g. `window.lenis`) instead of casting `window` to `any` (which triggers ESLint errors).
- **Layout Mounting**: Reading elements' `clientWidth`/`clientHeight` on mount can fail or return `0`/`NaN` before layout completes. Wrap initial dimension checks in a brief `setTimeout` (~150ms).

### 3. Styling & Layout (CSS & Tailwind CSS)

- **CSS Shorthand Restrictions**: Do not use Tailwind utility shorthands (like `max-w-full`, `h-auto`) as raw property names inside plain `.css` files. Use standard CSS property declarations (e.g., `max-width: 100%`, `height: auto`).
- **Responsive Grids**: Grid specifications in MDX/React tags (e.g., `grid-cols-3`) need viewport prefixes (e.g., `md:grid-cols-3`) to prevent horizontal layout crushing on mobile devices.
- **Scroll Snapping**: For long articles, use `scroll-snap-type: y proximity` (rather than `mandatory`) to avoid locking viewports on sections taller than the screen.
- **Header Calculations**: Constrain full-screen page routes using CSS calculations like `h-[calc(100vh-HeaderHeight)]` and `min-h-[calc(100vh-HeaderHeight)]` instead of `min-h-screen` to prevent global page overflows under navigation bars.
- **CSS Filters & Position Fixed**: Applying filters (like blur/blur-backdrop) to a container establishes a new containing block context. This breaks nested `position: fixed` relative coordinates. Place sticky/fixed elements outside filtered container trees.
- **Luminance & Contrast**: Adjust brand token HSL values for dark mode (e.g. shifting `hsl(270, 90%, 50%)` to `hsl(270, 90%, 65%)`) to satisfy the WCAG 4.5:1 relative contrast ratio requirement on dark backgrounds.

### 4. Interactive Canvases & Motion

- **Nested Animators**: When implementing Framer Motion `drag` alongside scroll-driven animations, nest the draggable element inside a scroll-animated parent to prevent coordinate override conflicts.
- **Scroll Pass-Through**: For interactive canvases, apply `pointer-events-none` to the canvas wrapper and `pointer-events-auto` to child cards. This lets users scroll the page naturally while retaining drag gestures on interactive cards.
- **Absolute Centering**: Center elements using `left-1/2 top-1/2` combined with negative margins (`-ml` / `-mt`) equivalent to half the item's width/height.
- **Dynamic Scale & Zoom**: Calculate pan zoom fits using element size vs container bounds: `Math.min(0.9, (container.clientWidth - 48) / frame.w)`.
- **Canvas Paths**: Render SVG lines/connectors directly within the transform-scaled stage so paths translate and scale organically alongside canvas objects.
- **Click Outside**: Implement click-outside handlers by placing click triggers on the canvas viewport wrapper, using `e.stopPropagation()` on individual interactive elements to prevent bubble triggers.

### 5. MDX Case Studies

- **Imports**: MDX articles can import layout components from `src/components/projects` using the `@` alias.
- **Prose Resetting**: MDX containers utilizing `not-prose` bypass standard Tailwind Typography styles. Ensure custom styles (like scroll or sizing limits) are added to child `<pre>` blocks to prevent code overflow on mobile. Nest `<div className="prose">` blocks inside layout nodes for text that needs normal typography.
- **Layout Choices**: Use `CaseStudySplit` selectively for sections that benefit from text/media layout. Avoid overusing it globally.
- **Metrics**: Utilize `ImpactMetricBanner` to highlight project outcomes. Collapsibles should wrap large code snippets to keep articles readable.
- **Syncing & Printing**: Create hidden semantic `print:block` print sheets to cleanly export interactive components as multi-page PDFs.

---

## 🗄️ Historical Log Summary (June 2026)

- **2026-06-22**: Initial agent setup, progress/learnings template conventions established.
- **2026-06-23**: MDX layouts integration (Tailwind Typography prose resets, `@` imports, split layout blocks, and metric banners).
- **2026-06-24**: Typography refinement, scroll snapping (proximity), and React Hook ordering resolution.
- **2026-06-25**: Layout responsiveness verification, grid adjustments, PostCSS build fix for Tailwind shorthands in CSS, and multi-mode token setup (Deep Purple/luminance contrast adjustments).
- **2026-06-25**: Hero section simplified into single typographic editorial block.
- **2026-06-26**: Smooth inertia scrolling (Lenis) and velocity-based motion blur SVG filter implemented.
- **2026-06-26**: Secondary modules redesigned (AcademicCohorts list, ProfessionalCredentials scroll-pinned draggable card gallery with spring physics, lightbox viewer).
- **2026-06-28**: Copy audits and interactive resume canvas refinement (zoom viewport scaling, SVG paths, click-outside, PDF printing stylesheet).

### 2026-07-10 - `tasks/task_016_project_rewrite_layout_system.md`

- **Lessons learned:** The v2 redesign spec (`project-layout-redesign-v2.md`) explicitly dropped the slide-deck metaphor (no scroll-snap, no corner numbers, no C-A-M pill labels). New components are `ProjectHeader`, `ContextStrip`, `WorkSection`, and `OutcomeFooter` — all conventional `<section>` elements styled as an editorial magazine spread.
- **Errors or surprises:** `ProjectImageAsset` takes a relative `src` string resolved from `src/content/projects/`. Passing absolute paths will break silently. The `priority` prop needs to be added to the existing interface to support eager loading for above-the-fold `ProjectHeader` cover images — it was already present on the component.
- **Resolution:** Imported `ProjectImageAsset` directly into `CaseStudyLayout.tsx` so that `WorkSection` and `ProjectHeader` handle their own image rendering without requiring MDX authors to import it separately.
- **Future instruction:** When implementing tasks 017–019 (case study MDX rewrites), import only `ProjectHeader`, `ContextStrip`, `WorkSection`, and `OutcomeFooter` from `@/components/projects/CaseStudyLayout`. Do not use scroll-snap, slide numbers, or C-A-M bullet prefixes. Enforce 2-sentence body discipline through content, not React runtime logic.

### 2026-07-11 - `tasks/task_017_project_rewrite_optmyzr_case_study.md`

- **Lessons learned:** MDX body content can directly use JSX components without any prose wrapper. The old file had `import { ProjectImageAsset }` — this is no longer needed because `WorkSection` and `ProjectHeader` handle images internally. Removing unused imports keeps the MDX clean and avoids confusion.
- **Errors or surprises:** The Optmyzr project had no live demo URL in the `links` frontmatter key. Used the GitHub repository URL as the CTA fallback. The `legacy-dashboard.svg` was used for the AI Workflow slide — it is the best available visual for showing the legacy architecture.
- **Resolution:** All four work sections and the outcome footer rendered cleanly. Build passed in 2.98s.
- **Future instruction:** When writing MDX body content, `body` props should be JSX fragments (`<>...</>`) not plain strings — this preserves em-dashes and special characters correctly. The `imagePosition` alternation pattern for the Optmyzr case is: right → full → left → full.

### 2026-07-29 - `tasks/task_022_homepage_copy_ai_human_oversight.md`

- **Lessons learned:** For hero landing copy targeting tech recruiters, hero body paragraphs must be ultra-concise (< 25 words / < 5-second scan time) while keeping a high-impact hook. Complex sentences dilute message retention.
- **Errors or surprises:** Escaping ampersands (`&amp;`) in JSX TSX text strings prevents HTML entity syntax issues.
- **Resolution:** Used Option 3 for Hero body copy ("AI is the big boom, but costly when it fails. I oversee the design and dev process so your product keeps its human touch.") and updated SEO, Projects, Secondary Modules, and Contact sections to maintain narrative alignment.
- **Future instruction:** Keep copy updates synchronized across SEO metadata (`src/pages/Index.tsx`) and UI components (`HeroSection.tsx`, `Projects.tsx`, `SecondaryModules.tsx`, `Contact.tsx`) so search engines and site visitors see consistent positioning.

