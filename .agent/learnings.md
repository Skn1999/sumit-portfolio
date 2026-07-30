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

### 2026-07-29 - `tasks/task_024_v2_design_tokens_and_paper_canvas.md`

- **Lessons learned:** Defining semantic HSL custom properties (`--paper-bg`, `--paper-card`, `--ink-primary`, `--ink-muted`, `--paper-border`) at the root level and mapping them in `tailwind.config.ts` allows all existing Tailwind utility classes (like `bg-background`, `border-paper-border`, `text-ink-primary`) to seamlessly adapt to the Japanese tactile paper aesthetic.
- **Errors or surprises:** None. Build compiled cleanly.
- **Resolution:** Updated `src/index.css` and `tailwind.config.ts`.
- **Future instruction:** Use `bg-paper-bg`, `bg-paper-card`, `text-ink-primary`, `text-ink-muted`, and `border-paper-border` for v2 Japanese minimalist component styling.

### 2026-07-29 - `tasks/task_025_v2_asymmetric_header_and_footer.md`

- **Lessons learned:** Numbers embedded in monospace navigation strings (`01. WORK`, `02. LABS`, `03. ABOUT`, `04. CONTACT`) establish a calm architectural index framing that sets expectations for an editorial publication layout.
- **Errors or surprises:** None. Hash link targets (`/#projects`, `/#about`, `/#contact`) and route targets (`/ux-bites`) remain fully functional.
- **Resolution:** Rebuilt `Header.tsx` and updated `Contact.tsx` Footer to 2-column layout.
- **Future instruction:** Ensure mobile menu drawers use `bg-paper-bg` and `border-paper-border` so mobile overlay navigation matches desktop slate paper styling.

### 2026-07-29 - `tasks/task_026_v2_editorial_hero_section.md`

- **Lessons learned:** Utilizing generous vertical section padding (`py-24 md:py-36`) on a seamless slate paper canvas (`bg-paper-bg`) highlights the typographic contrast and provides spatial breathing room (*Ma*) without heavy shadows or neubrutalistic borders.
- **Errors or surprises:** None. Headline and narrative copy were preserved verbatim while tag text was updated to `LOCATION: HELSINKI, FI // FOCUS: HCI & FRONTEND SYSTEMS`.
- **Resolution:** Refactored `HeroSection.tsx`.
- **Future instruction:** Avoid magnetic button hover pulls in hero triggers to maintain a quiet, calm visual aesthetic.

### 2026-07-29 - `tasks/task_027_v2_editorial_index_project_showcase.md`

- **Lessons learned:** Re-engineering project displays from traditional card grids into text-first editorial index lists with cursor-following floating paper cards gives high density for scanning titles and outcomes while preserving visual preview impact.
- **Errors or surprises:** Mobile viewports require static inline thumbnails since hover cursor positioning is unavailable on touch devices.
- **Resolution:** Rebuilt `Projects.tsx` with responsive layout logic (floating card for desktop `lg:block`, static cover aspect frame for mobile `lg:hidden`).
- **Future instruction:** Use `pointer-events-none` on floating hover cards to ensure links under the cursor remain clickable.

### 2026-07-29 - `tasks/task_028_v2_secondary_academic_and_sandbox_modules.md`

- **Lessons learned:** Presenting academic HCI research competencies in a high-density 3-column table alongside technical experiments in a simple list maintains strong recruiter readability and clear evidence of research-to-code capabilities.
- **Errors or surprises:** On narrow mobile screens, 3-column tables need an `overflow-x-auto` wrapper with `min-w-[640px]` table width to prevent horizontal cell distortion.
- **Resolution:** Wrapped matrix table in an overflow container.
- **Future instruction:** Ensure all multi-column tabular data sections have mobile overflow wrappers.

### 2026-07-29 - `tasks/task_029_v2_living_motion_dynamics_and_verification.md`

- **Lessons learned:** Utilizing CSS blur-dissolve keyframes (`filter: blur(4px)` to `blur(0px)`) combined with subtle opacity fade transitions produces an organic ink-dissolve aesthetic consistent with Japanese Wabi-Sabi design principles.
- **Errors or surprises:** None.
- **Resolution:** Updated `src/index.css` and verified full site build.
- **Future instruction:** Keep motion keyframes quiet and organic, avoiding high-velocity bouncy spring physics.

### 2026-07-29 - `tasks/task_030_v2_service_offerings_section.md`

- **Lessons learned:** Converting generic academic descriptions into targeted roles and skill groups with individual portfolio link triggers allows recruiters to quickly match job requisitions with specific engineering & design capabilities.
- **Errors or surprises:** None.
- **Resolution:** Re-architected `SecondaryModules.tsx` with `ServiceOfferings` component and aliased `AcademicCohorts`.
- **Future instruction:** Keep `behanceUrl` property configurable per skill group so portfolio links can be updated modularly.

### 2026-07-29 - `tasks/task_031_ia_navigation_and_homepage_structure.md`

- **Lessons learned:** Multi-level navigation dropdowns in a fixed header require explicit mouse event handling (`onMouseEnter`, `onMouseLeave`, `onClick`) and clean Framer Motion `AnimatePresence` wrappers to ensure sub-menu items transition smoothly without layout shifting.
- **Errors or surprises:** None.
- **Resolution:** Updated `Header.tsx` to support the multi-level IA hierarchy (Sumit Nayyar, UX Design, Visual Design, Writings), created `AboutSection.tsx`, `AchievementsSection.tsx`, `WritingsPage.tsx`, and updated `Index.tsx` and `App.tsx`.
- **Future instruction:** Keep sub-navigation link paths aligned with both page routes (`/projects`, `/writings/publication`, `/writings/research`) and section hash targets (`/#about`, `/#contact`).

### 2026-07-29 - `tasks/task_032_intent_based_navigation_and_main_pages.md`

- **Lessons learned:** Implementing intent-based navigation via mouse hover state tracking (`intendedRoute`) and container mouse exit handling (`onMouseLeave`) creates a seamless, low-friction predictive browsing experience. Explicit click handlers must always clear hover state (`setIntendedRoute(null)`) to avoid conflicting navigation triggers when users explicitly select sub-items.
- **Errors or surprises:** None.
- **Resolution:** Managed `intendedRoute` state in `Header.tsx` with React Router `useNavigate()` client-side transitions and `ScrollToHash` for anchor scrolling.
- **Future instruction:** When implementing intent-driven route transitions, ensure explicit link `onClick` handlers reset intent state to prevent race conditions during direct anchor navigation.

### 2026-07-30 - `tasks/task_033_menu_hierarchy_and_route_pages_update.md`

- **Lessons learned:** When expanding multi-column header navigation and routing structures, keeping main route links (`/data-engineering`, `/ux-design`, `/writings/publication`) mapped consistently across 3D canvas `CategoryKey` helpers, React Router `App.tsx` declarations, and header `NAV_HIERARCHY` items ensures predictable 3D canvas morphing state and instant section scrolling without page refreshes.
- **Errors or surprises:** None.
- **Resolution:** Updated `Header.tsx`, created `DataEngineeringPage.tsx` with `#ai-data` and `#frontend-engineering` sections, registered `/data-engineering` and `/design` in `App.tsx`, added `#research` wrapper anchor in `WritingsPage.tsx`, and updated `HeroParticleCanvas.tsx`.
- **Future instruction:** Ensure all new primary route pages include `HeroSection` as section 1 at the top of the layout tree to maintain 3D canvas navigation continuity across all routes.

### 2026-07-30 - `tasks/task_037_gosta_labs_case_study_integration.md`

- **Lessons learned:** Importing PDF assets directly in MDX files (`import finalPresentationPdf from "./final-presentation.pdf"`) allows Vite static bundlers to hash and copy PDF artifacts into the `dist/assets` directory during production builds, enabling reliable external tab opening without hardcoded asset URLs.
- **Errors or surprises:** None.
- **Resolution:** Created `src/content/projects/gosta-labs/index.mdx` with PDF artifact button link and `subCategory: "ai-data"` frontmatter.
- **Future instruction:** When adding downloadable/viewable PDF strategy reports or slide decks to case studies, import the `.pdf` file inside the MDX component to leverage Vite's asset processing pipeline.
