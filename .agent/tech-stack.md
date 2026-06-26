# Tech Stack

This repo is a Vite + React + TypeScript portfolio site with MDX-authored content, Tailwind CSS styling, shadcn/Radix UI primitives, and Framer Motion animation.

## Core Stack

- React `18.3.1`
- TypeScript `5.8.3`
- Vite `5.4.19`
- React Router DOM `6.30.1`
- Tailwind CSS `3.4.17`
- Tailwind Typography `@tailwindcss/typography`
- MDX via `@mdx-js/rollup` and `@mdx-js/react`
- Framer Motion `12.23.24`
- React Helmet Async for SEO
- TanStack React Query for async/server state infrastructure
- Radix UI + shadcn-style components for accessible UI primitives

## Commands

Use these npm scripts:

```bash
npm run dev
```

Starts the Vite dev server. `vite.config.ts` sets host to `::` and port to `8080`.

```bash
npm run lint
```

Runs ESLint across the repo.

```bash
npm run build
```

Runs the production build and then `scripts/inject-meta.js`. This also triggers `prebuild`, which runs image optimization first.

```bash
npm run build:dev
```

Builds in development mode and injects metadata.

```bash
npm run build:preview
```

Builds with `VITE_BASE_PATH=/`, useful for previewing from root.

```bash
npm run preview
```

Runs `build:preview` and then `vite preview`.

```bash
npm run new-project
```

Runs the project scaffolding script.

```bash
npm run optimize-images
npm run optimize-images:webp
npm run optimize-images:dry
```

Runs image optimization helpers. Use dry-run before broad image changes.

## Installed Packages and When To Use Them

- `react`, `react-dom`: base UI framework.
- `react-router-dom`: page routing and route params.
- `@mdx-js/rollup`, `@mdx-js/react`: MDX content compilation and component provider support.
- `remark-frontmatter`, `remark-mdx-frontmatter`: frontmatter extraction from MDX.
- `tailwindcss`, `@tailwindcss/typography`, `tailwindcss-animate`: utility styling, prose styling, animations.
- `clsx`, `tailwind-merge`, `class-variance-authority`: class composition. Prefer the local `cn` helper from `src/lib/utils.ts`.
- `lucide-react`: icons. Prefer lucide icons for UI buttons and small controls.
- `framer-motion`: route/page/content animation.
- `react-helmet-async`: SEO metadata.
- `@tanstack/react-query`: async data/query infrastructure.
- `sonner`: toast notifications.
- `@radix-ui/*`: accessible UI primitives used by shadcn-style components.
- `react-hook-form`, `zod`, `@hookform/resolvers`: forms and validation.
- `recharts`: chart rendering.
- `embla-carousel-react`: carousel behavior.
- `react-pdf`: PDF rendering, used with copied pdf.js cmaps in Vite config.
- `three`, `@react-three/fiber`, `@react-three/drei`: 3D rendering when needed.
- `sharp`: image optimization scripts.
- `vite-plugin-static-copy`: copies pdf.js cmap assets during Vite build.
- `lovable-tagger`: development-only component tagging plugin.

## Strict Rules

- Do not use destructive git commands such as `git reset --hard` or `git checkout --` unless explicitly requested.
- Do not revert unrelated user changes in the working tree.
- Use `rg` for searching.
- Use `apply_patch` for manual file edits.
- Do not edit generated build output unless the user explicitly asks.
- Keep route paths stable unless the task is specifically about routing.
- Preserve Vite `base` behavior in `vite.config.ts`; production builds default to `/sumit-portfolio/`.
- Preserve MDX frontmatter loading through `remark-mdx-frontmatter`.
- Keep content assets colocated with their MDX project or UX Bite unless updating the asset loader too.
- Use HSL values for design-system colors in `src/index.css`.
- Prefer Tailwind utilities and existing CSS tokens over ad hoc CSS.
- Keep components TypeScript-safe and avoid `any` unless matching existing content-loader constraints.
- Preserve accessibility basics: meaningful `alt`, semantic headings, keyboard-friendly links/buttons.

## Styling Rules

- `design.md` contains global level styling tokens. For visual changes, always consult this file to get exact values for tokens, if needed.
- Global design tokens live in `src/index.css`.
- Tailwind theme extension lives in `tailwind.config.ts`.
- Use semantic token classes such as:
  - `bg-background`
  - `text-foreground`
  - `text-muted-foreground`
  - `border-border`
  - `text-primary`
- Use `cn` from `src/lib/utils.ts` for conditional classes.
- Use existing visual helpers where appropriate:
  - `heading-primary`
  - `card-styled`
  - `badge-styled`
  - `text-gradient-engineer`
  - `text-gradient-designer`
- Avoid heavy decorative effects unless they match the existing mode-specific design language.
- For project pages, keep long-form content scannable and avoid nesting cards inside cards.

## MDX Rules

- Project MDX files live at `src/content/projects/<slug>/index.mdx`.
- UX Bite MDX files live at `src/content/ux-bites/<slug>/index.mdx`.
- Import local React components inside MDX using the `@` alias.
- Keep `h2` and `h3` headings as real heading elements when they should appear in project table of contents.
- Use `ProjectImageAsset` for project content images.
- Include useful alt text for every content image.

## Verification Expectations

For most code or layout changes, run:

```bash
npm run lint
npm run build
```

For visual work, also run:

```bash
npm run dev
```

Then manually inspect the affected route at mobile and desktop widths.

For project-page changes, inspect:

- `/projects/optmyzr-dashboard-migration`
- at least one other `/projects/:slug` route

For UX Bite changes, inspect:

- `/ux-bites`
- at least one `/ux-bites/:slug` route

## Common Pitfalls

- `npm run build` runs image optimization first through `prebuild`; image-related changes can affect build time and output.
- `ProjectPage.tsx` currently imports `MetadataStrip`, but the active metadata grid is inline. Check actual render paths before refactoring.
- `TableOfContents` scans the DOM only after mount. If MDX headings are hidden inside non-heading components, they may disappear from the TOC.
- `ProjectImageAsset` resolves with `new URL("../../content/projects/${src}", import.meta.url)`. Incorrect relative paths fail silently into a muted placeholder.
- Draft filtering differs by mode: production/staging hide drafts, local development shows them.
- The app has both dark/light theme and engineer/designer mode. These are separate systems. For now just ignore engineer/designer mode as it will be removed in the future.
