# Learnings

This file is updated by AI agents after each task is attempted or completed. It preserves concrete lessons about this codebase, especially errors, surprises, and resolutions that future agents should remember.

## Entry Template

```md
### YYYY-MM-DD - <task file path>

- Lessons learned:
- Errors or surprises:
- Resolution:
- Future instruction:
```

## Log

### 2026-06-22 - Agent Setup

- Lessons learned: The repo already has `.agent/architecture.md` and `.agent/tech-stack.md`, and future task-running agents should read both before editing source files.
- Errors or surprises: `.agent/learnings.md` was empty and `.agent/progress.md` only contained a short plain-language note.
- Resolution: Added structured templates so future agents can append consistent progress and learning entries.
- Future instruction: Always append to `.agent/progress.md` and `.agent/learnings.md` after attempting a task, even when the task is blocked.

### 2026-06-23 - tasks/task_002_create_case_study_mdx_layout_components.md

- Lessons learned: Project MDX can import named React components directly from `src/components/projects` with the `@` alias, and layout wrappers inside the article should use `not-prose` only for framed layout surfaces while reintroducing `prose` inside text wrappers when Markdown children need normal typography.
- Errors or surprises: The full lint script currently scans unrelated generated/reference and shadcn-style files with pre-existing rule violations, so a new clean component can still be hidden behind repo-wide lint failures.
- Resolution: Ran a targeted ESLint check against `src/components/projects/CaseStudyLayout.tsx` to confirm the new file is clean, then ran `npm run build` to verify TypeScript/Vite/MDX compilation.
- Future instruction: When a task requires `npm run build`, check `git status` afterward because `prebuild` runs image optimization and may rewrite source images unrelated to the task.

### 2026-06-23 - tasks/task_003_update_optmyzr_mdx_structure.md

- Lessons learned: The CaseStudyLayout components provide a clean, responsive pattern for splitting content and media, and the ImpactMetricBanner creates an excellent way to surface key metrics prominently. The split layout works well for technical content where code examples need visual pairing with explanatory text. It's important to be selective about when to use split layouts - not every section benefits from them. Code examples should be extracted into collapsible elements to keep the main flow clean and focused.
- Errors or surprises: None encountered. The MDX compilation and build process handled the new component imports smoothly.
- Resolution: Successfully imported all required CaseStudyLayout components and structured the MDX content to use them effectively, maintaining the technical accuracy while improving scannability. Applied split layouts selectively to Engineering & Architecture Decisions sections only. Extracted code block into collapsible "Sample Code Snippet" element and expanded CaseStudySplit width to accommodate 2-column layout.
- Future instruction: Use CaseStudySplit for technical explanations that benefit from text/media pairing, and ImpactMetricBanner for key metrics that should stand out from the main content flow. Don't apply split layouts to every section - use them selectively where they add value. Extract code examples into collapsible elements to keep the main flow clean and focused.

### 2026-06-24 - tasks/task_004_refine_project_article_typography.md

- Lessons learned: Native CSS scroll timelines (`animation-timeline: view()`) are highly performant and can be applied elegantly inside CSS without touching MDX templates, but an IntersectionObserver fallback is required for Firefox/older browsers. Additionally, setting up scroll-snapping on a long-form article page requires `scroll-snap-type: y proximity` (instead of `mandatory`) to prevent layout lockouts where sections are taller than the user's viewport.
- Errors or surprises: Encountered a react-hooks/rules-of-hooks error because the `useEffect` hook in `ProjectPage.tsx` was placed after an early `if (!project)` return.
- Resolution: Moved the `useEffect` hook above the early return and added a simple `if (!project) return;` guard check inside the hook callback.
- Future instruction: Always place React hooks at the very top level of a component before any early returns, adding conditional guards inside the hook bodies if necessary.

### 2026-06-25 - tasks/task_005_verify_project_layout_responsiveness.md

- Lessons learned: MDX details panels using `not-prose` bypass standard Tailwind Typography styling, which can cause internal `<pre>` blocks to overflow on mobile if generic responsive CSS rules aren't applied. Also, hardcoded column grids (e.g. `grid-cols-3` in HTML/JSX tags inside MDX) must have responsive viewport prefixes (like `md:grid-cols-3`) to prevent horizontal layout squishing on mobile.
- Errors or surprises: PostCSS build compilation failed when using Tailwind-specific utility class name `max-w-full` directly inside raw CSS (`src/index.css`) rather than standard CSS property `max-width: 100%`.
- Resolution: Corrected the invalid CSS rule in `src/index.css` to use `max-width: 100%`.
- Future instruction: Never use Tailwind-specific utility shorthand class names (like `max-w-full`, `h-auto`) as raw property names inside plain CSS files; always write standard CSS properties (e.g. `max-width: 100%`, `height: auto`).

### 2026-06-25 - tasks/task_006_homepage_visual_identity_and_tokens.md

- Lessons learned: Preserving backwards-compatibility for dual-mode layouts during styling refactoring is best achieved by mapping the mode-dependent CSS variables (e.g. `--engineer-*` and `--designer-*`) directly to the new unified brand tokens (Deep Purple). For dark mode contrast ratios, brand colors should have adjusted luminosity levels (e.g. shifting `hsl(270, 90%, 50%)` to `hsl(270, 90%, 65%)`) to satisfy the 4.5:1 WCAG requirement on dark backgrounds.
- Errors or surprises: None.
- Resolution: Implemented standard HSL color tokens and custom utility typography classes smoothly, verifying that the entire suite compiles correctly.
- Future instruction: Always design brand color variations for dark mode with explicit relative luminance checks, aiming for at least 4.5:1 contrast against the background canvas.

### 2026-06-25 - tasks/task_007_homepage_hero_block.md

- Lessons learned: Simplification of visual features (dropping complex grids, sliders, branching mode checks) yields a highly optimized and performant hero section that shifts structural focus cleanly onto editorial typography and messaging. Minimizing unnecessary hook state and assets makes rendering robust across all viewports.
- Errors or surprises: None.
- Resolution: Overwrote `src/components/HeroSection.tsx` with a single high-contrast typography design, completely cleaning up unused imports, hooks, and local variables.
- Future instruction: When refactoring highly interactive layouts into minimalist editorial blocks, proactively clean up unused hooks, imports, and variables to keep code clean and lint-free.

### 2026-06-26 - tasks/task_012_smooth_scrolling_and_motion_blur.md

- Lessons learned: Applying CSS filters to containers with fixed positioned children causes them to lose their viewport-relative positioning because filters establish a new containing block context. Moving fixed elements (like TableOfContents and headers) outside of the filtered DOM tree resolves this completely. Extending the global `Window` interface in TypeScript for dynamic external library instances (like `window.lenis`) prevents lint-time `any` violations while maintaining complete type safety.
- Errors or surprises: Encountered TypeScript compiler and linter errors when trying to cast the `window` object to `any` (due to `@typescript-eslint/no-explicit-any`).
- Resolution: Resolved by declaring global interface extensions for `window` and typing `lenis?: Lenis` directly in `SmoothScroll.tsx`.
- Future instruction: When applying CSS filters or transformations that might affect layout context, verify that sticky or fixed positioned descendants are rendered outside of the target DOM wrapper.

### 2026-06-26 - tasks/task_013_homepage_academic_cohorts_and_credentials.md

- Lessons learned:
  1. Integrating Framer Motion `drag` with scroll-driven entry animations is best achieved by nesting the draggable element inside a scroll-animated parent. This prevents the drag handler from conflicting with scroll-driven coordinate transforms.
  2. To allow natural page scrolling over an interactive canvas, set `pointer-events-none` on the canvas container and `pointer-events-auto` on the child cards. This keeps the drag gestures functional on cards while letting scroll wheels pass through to the page scrollbar.
  3. Absolute positioning of cards centering can be anchor-aligned across devices by setting `left-1/2 top-1/2` and applying responsive negative margins (`-ml` / `-mt`) representing half the card's dimensions.
  4. Coordinate layouts for fanned cards must scale dynamically with window width (e.g. using resize listeners and a `scaleFactor` or percentages) to prevent horizontal overflows on mobile devices.
  5. Declaring static constant arrays (like credentials lists) inside components causes react-hooks dependency warnings or infinite effect triggers on re-render. Declaring them outside the component as module-level constants completely avoids this.
  6. Smooth viewport threshold entrance triggers can be implemented via bounding client rect offset logic: `rect.top < window.innerHeight * percentage` to accurately track scroll visibility.
- Errors or surprises:
  1. Attempting to bind `x` and `y` coordinates to `scrollYProgress` transforms directly on a draggable element will cause drag inputs to get immediately overwritten on the next scroll frame.
  2. Local arrays inside component scopes trigger React exhaustive-deps rules, warning about mutating values outside the dependency array.
- Resolution: Refactored card structure into a scroll-translated parent wrapper and an inner `drag={true}` card container. Moved credentials array to module-level scope. Used negative margins for offset anchoring, scaled card positions dynamically for mobile, and mapped dynamic active state tracking to scroll-interval frames combined with hover/drag events. Triggered entry animation once based on section scroll visibility threshold.
- Future instruction: Declare static arrays outside of components and separate scroll-based triggers from manual drags by using nested wrapper elements.

### 2026-06-28 - tasks/task_014_homepage_final_copy_alignments.md

- Lessons learned:
  1. Copy-audit tasks require strict word-by-word match to technical blueprints or specifications, especially concerning metrics and location designations which may affect external presentation.
  2. Typos in text arrays or static lists can easily slip in during replacement, so verification and manual code proofreading are essential.
- Errors or surprises: None.
- Resolution: None.
- Future instruction: Always double-check exact copy alignments word-for-word against the redesign specifications.




### 2026-06-28 - tasks/task_015_interactive_resume_page.md

- Lessons learned:
  1. Responsive infinite canvas layouts are best panned and centered by calculating dynamic scaling values relative to the active element's width vs the container viewport's client width (`Math.min(0.9, (container.clientWidth - 48) / frame.w)`). This automatically scales elements to fit mobile devices cleanly.
  2. Pointer Events (`onPointerDown`, `onPointerMove`, `onPointerUp`) should be used instead of Mouse Events to provide built-in multi-input compatibility (capturing mouse and touch inputs simultaneously) on draggable layouts without writing separate touch listeners.
  3. Wrapping complex interactive layouts inside standard layout templates and `framer-motion` anim gates avoids page rendering collapsing or hanging during SPA route transitions.
  4. Adding a hidden semantic `print:block` layout is the most robust way to ensure interactive canvas graphics output as clean, multi-page PDFs when printed.
- Errors or surprises: First-tick centering on mount can fail or yield `NaN` offsets if container dimensions (`clientWidth`/`clientHeight`) are read before the DOM elements are fully bound and layout out.
- Resolution: Bound the initial centering invocation to a brief `setTimeout` (150ms) to allow layout bounds to compute successfully.
- Future instruction: Use Pointer Events for manual pan layouts, implement a distinct print-only document wrapper for canvas visualizers, and delay initial boundary centering calculations slightly to ensure DOM dimensions are computed.
