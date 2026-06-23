# Progress

This file is updated by AI agents after each task is attempted or completed. It tracks what has been implemented, what was verified, and what still needs attention.

## Entry Template

```md
### YYYY-MM-DD - <task file path>

- Status: Completed | Partially Completed | Blocked
- Summary:
- Files changed:
- Tests run:
- Acceptance criteria:
- Follow-ups / risks:
```

## Log

### 2026-06-22 - Agent Setup

- Status: Completed
- Summary: Created the project architecture and tech-stack context files, plus the task runner agent instructions.
- Files changed: `.agent/architecture.md`, `.agent/tech-stack.md`, `.agent/task-runner-agent.md`, `.agent/progress.md`, `.agent/learnings.md`
- Tests run: Not applicable; documentation-only setup.
- Acceptance criteria: Agent support files exist and explain how future task execution should be tracked.
- Follow-ups / risks: Future agents must append task-specific entries below this log section.

### 2026-06-23 - tasks/task_002_create_case_study_mdx_layout_components.md

- Status: Completed
- Summary: Added a reusable case-study MDX layout component module with metric banners, individual metrics, responsive split layouts, text/media wrappers, and engineering callouts.
- Files changed: `src/components/projects/CaseStudyLayout.tsx`, `.agent/progress.md`, `.agent/learnings.md`
- Tests run: `./node_modules/.bin/eslint src/components/projects/CaseStudyLayout.tsx` passed; `npm run build` passed; `npm run lint` failed on existing repo-wide lint errors outside the new component file, including `.github/skills/figma-use/references/plugin-api-standalone.d.ts`, `src/components/ui/command.tsx`, `src/components/ui/textarea.tsx`, and `src/lib/projects.ts`.
- Acceptance criteria: Components are named exports that MDX can import through the existing `@` alias; they are React + TypeScript friendly; no `ProjectMeta` changes were made; split/media/metric/callout layouts are responsive by default and designed to render inside the existing prose article context.
- Follow-ups / risks: `npm run build` runs image optimization before Vite and can modify source image assets; those build side effects were restored after verification so this task stays scoped.
