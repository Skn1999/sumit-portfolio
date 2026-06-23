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

- Lessons learned: The CaseStudyLayout components provide a clean, responsive pattern for splitting content and media, and the ImpactMetricBanner creates an excellent way to surface key metrics prominently. The split layout works well for technical content where code examples need visual pairing with explanatory text.
- Errors or surprises: None encountered. The MDX compilation and build process handled the new component imports smoothly.
- Resolution: Successfully imported all required CaseStudyLayout components and structured the MDX content to use them effectively, maintaining the technical accuracy while improving scannability.
- Future instruction: Use CaseStudySplit for technical explanations that benefit from text/media pairing, and ImpactMetricBanner for key metrics that should stand out from the main content flow.
