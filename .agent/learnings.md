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
