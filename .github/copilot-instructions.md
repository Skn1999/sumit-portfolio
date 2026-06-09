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

## Figma and Design System Rules

Use these rules whenever implementing or updating UI from Figma in this repo.

### Core layout and component rules

- IMPORTANT: Treat the engineer/designer mode split as a first-class design axis. Read mode from [src/contexts/ModeContext.tsx](../src/contexts/ModeContext.tsx) and apply `data-mode`-aware styling whenever a UI changes appearance between modes.
- IMPORTANT: Reuse existing components from [src/components/](../src/components/) and [src/components/ui/](../src/components/ui/) before creating new primitives.
- Keep project content wired through [src/lib/projects.ts](../src/lib/projects.ts) and the MDX files in [src/content/projects/](../src/content/projects/); do not hand-wire project data in pages.
- Use [src/components/ui/project-image-asset.tsx](../src/components/ui/project-image-asset.tsx) for project images. Paths are relative to [src/content/projects/](../src/content/projects/) and should be passed as `slug/filename`.
- Prefer `@/` imports for all code under [src/](../src/).

### Styling and token rules

- Tailwind is the primary styling system. Global design tokens are mapped in [tailwind.config.ts](../tailwind.config.ts) and resolved from CSS custom properties.
- IMPORTANT: Do not hardcode colors, radii, or semantic surface values when a Tailwind token or CSS variable already exists.
- The primary token surface is the CSS variable set consumed by Tailwind color utilities such as `bg-background`, `text-foreground`, `border-border`, `bg-card`, and `text-muted-foreground`.
- Mode-specific font usage is intentional: `Space Mono` for engineer mode, `Space Grotesk` for designer mode, and `Inter` for body text.
- Use `mode-transition` for UI that should animate between mode states. Keep transitions subtle and avoid introducing conflicting animation systems.
- `src/styles/global.css` is the home for global mode-transition helpers and any site-wide CSS additions that cannot be expressed in Tailwind.

### Figma MCP workflow rules

When a task starts from Figma, follow this flow:

1. Call `get_design_context` for the exact node being implemented.
2. If the response is incomplete, call `get_metadata` for the parent page or section, then re-fetch the specific node.
3. Call `get_screenshot` for visual confirmation before implementing.
4. Map Figma styles to the repo's existing Tailwind tokens and mode classes instead of recreating the design with raw values.
5. Reuse existing components and section patterns from the codebase first; only create new components when there is no reasonable match.
6. Validate the finished UI against the Figma screenshot and the repo's mode behavior before considering the change complete.

### Asset handling rules

- IMPORTANT: If the Figma payload provides a localhost asset URL, use that source directly.
- IMPORTANT: Do not add new icon packages unless the existing codebase cannot represent the asset another way.
- Store static assets in [public/](../public/) only when they are meant to be served directly; project-specific images should stay under [src/content/projects/](../src/content/projects/).
- Prefer assets already in the Figma payload or existing repo assets over creating placeholders.

### Project-specific conventions for Figma work

- Preserve the portfolio's two-mode visual language. Engineer mode should stay technical, compact, and monochrome-forward; designer mode should stay expressive and gradient-friendly.
- Keep the existing routing and page structure intact. Pages are routed from [src/pages/](../src/pages/) and should not be reorganized just to satisfy a design import.
- Maintain the existing project loader and MDX content flow when adding or updating portfolio entries.
- There is no dedicated test suite; validate touched UI with `npm run lint` and `npm run build` when the change affects runtime behavior.
