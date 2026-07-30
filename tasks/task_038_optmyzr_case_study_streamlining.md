# Task 038: Optmyzr Case Study Streamlining & Legacy Layout Cleanup

**Task Name:** Optmyzr Case Study Streamlining & Legacy Layout Cleanup

**Context for the Task:**
Streamline `src/content/projects/optmyzr-dashboard-migration/index.mdx` to follow the standardized 4-zone section layout (`01 // CONTEXT`, `02 // PROBLEM`, `03 // APPROACH`, `04 // IMPACT`) used across all other portfolio case studies. Retain all existing narrative copy, metrics, and figure images. Once converted, delete the legacy `src/components/projects/CaseStudyLayout.tsx` component.

---

## 1. Objectives

1. **Convert MDX Copy:** Rewrite `src/content/projects/optmyzr-dashboard-migration/index.mdx` into standard MDX prose with `ProjectImageAsset` components and sentence-case captions (`Fig 01 // ...`).
2. **Standardize Section Headers:** Enforce the 4-zone numbered section structure (`## 01 // CONTEXT`, `## 02 // PROBLEM`, `## 03 // APPROACH`, `## 04 // IMPACT`).
3. **Delete Legacy Layout File:** Remove `src/components/projects/CaseStudyLayout.tsx`.
4. **Update Task & Progress Tracking:** Update `tasks/TODOS.md`, `.agent/progress.md`, and `.agent/learnings.md`.
5. **Verify Build:** Confirm `npm run build` compiles with 0 errors and generates `/projects/optmyzr-dashboard-migration`.

---

## 2. Acceptance Criteria

- `optmyzr-dashboard-migration/index.mdx` uses standard markdown section headers and `ProjectImageAsset`.
- `src/components/projects/CaseStudyLayout.tsx` is deleted.
- `npm run build` succeeds cleanly in under 10 seconds.
