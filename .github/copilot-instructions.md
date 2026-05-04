# Portfolio Copilot Instructions

This workspace is a React + TypeScript + Vite portfolio with two user-facing modes: engineer and designer. The app switches content and styling through global mode context, MDX project content, and page transitions. For a broader overview, read [README.md](../README.md); for script names and package metadata, check [package.json](../package.json).

## What To Keep In Mind

- Treat the mode system as first-class. Use `useMode()` and the `data-mode` attribute; add `mode-transition` when style changes should animate.
- Projects live in `src/content/projects/{slug}/index.mdx` and are loaded through [src/lib/projects.ts](../src/lib/projects.ts). Do not hand-wire project imports.
- Project images must use [src/components/ui/project-image-asset.tsx](../src/components/ui/project-image-asset.tsx); paths are relative to `content/projects/` and should look like `{slug}/{filename}`.
- Prefer `@/` imports for `src/` code.
- The codebase is intentionally relaxed on TypeScript strictness; do not “fix” that unless asked.
- Use [src/contexts/ModeContext.tsx](../src/contexts/ModeContext.tsx) and [src/contexts/TransitionContext.tsx](../src/contexts/TransitionContext.tsx) as the main state/navigation anchors.

## Commands

Use these scripts instead of inventing ad hoc commands:

```bash
npm run dev
npm run build
npm run build:dev
npm run build:preview
npm run preview
npm run lint
npm run new-project
npm run optimize-images
```

There is no dedicated test suite configured in this repo, so validate changes with lint and a production build when needed.

## Project Conventions

- Never manually create project folders. Use `npm run new-project` so the folder structure and frontmatter stay consistent.
- `ProjectMeta` and related filtering helpers live in [src/lib/projects.ts](../src/lib/projects.ts). `engineeringProjects` and `designProjects` are precomputed exports; prefer them over calling `getProjectsByType()` repeatedly in render paths.
- Draft projects are excluded from production-style builds by the project loader. Use `draft: true` in frontmatter when content should stay out of the production site.
- Keep MDX frontmatter complete enough for the loader to infer slug, type, order, and image metadata.

## Useful Reference Files

- [README.md](../README.md) for the public-facing project summary
- [package.json](../package.json) for scripts and dependencies
- [src/lib/projects.ts](../src/lib/projects.ts) for project loading and filtering
- [src/contexts/ModeContext.tsx](../src/contexts/ModeContext.tsx) for mode behavior
- [src/components/ui/project-image-asset.tsx](../src/components/ui/project-image-asset.tsx) for image handling
- [vite.config.ts](../vite.config.ts) and [tsconfig.json](../tsconfig.json) for build and path alias setup
