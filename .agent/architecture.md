# Architecture

This is a Vite + React portfolio app built around two content systems: long-form project case studies and shorter UX Bites. Most pages are ordinary React routes, while portfolio content is authored as MDX with frontmatter and loaded eagerly at build time.

## Application Shell

- Entry point: `src/main.tsx`
- App root: `src/App.tsx`
- Global CSS: `src/index.css`
- Shared page shell: `src/components/Layout.tsx`

`App.tsx` composes the app providers in this order:

- `HelmetProvider` for SEO metadata.
- `QueryClientProvider` for TanStack Query.
- `TooltipProvider` and `Sonner` for UI infrastructure.
- `ThemeProvider` for light/dark mode.
- `TransitionProvider` for route transition state.
- `ModeProvider` for engineer/designer visual mode.
- `BrowserRouter` for routing.

Routes are animated with Framer Motion via `AnimatePresence` and `PageTransition`-style components. Hash navigation is handled by `ScrollToHash`, which waits briefly after route changes before scrolling to the target id.

## Routing

Primary routes live in `src/App.tsx`:

- `/` -> `src/pages/Index.tsx`
- `/resume` -> `src/pages/ResumePage.tsx`
- `/projects` -> `src/components/ProjectList.tsx`
- `/projects/:slug` -> `src/pages/ProjectPage.tsx`
- `/ux-bites` -> `src/pages/UxBitesList.tsx`
- `/ux-bites/:slug` -> `src/pages/UxBitePage.tsx`
- `*` -> `src/pages/NotFound.tsx`

The router basename comes from `import.meta.env.BASE_URL`, which is affected by `base` in `vite.config.ts`.

## Project Case Study Content Flow

Project case studies are stored as:

```text
src/content/projects/<project-slug>/index.mdx
```

Each MDX file exports frontmatter and a default React component. `src/lib/projects.ts` uses:

```ts
import.meta.glob("../content/projects/*/index.mdx", { eager: true });
```

to load every project at build time. The loader combines frontmatter with the generated MDX component and exposes:

- `projects`
- `visibleProjects`
- `getProjectBySlug`
- `getProjectsByType`
- `engineeringProjects`
- `designProjects`
- skill filter helpers

Production and staging hide projects where `draft: true`. Local development shows drafts.

`ProjectPage.tsx` gets the slug from React Router, resolves the project with `getProjectBySlug`, renders SEO metadata, reading progress, project hero, table of contents, the MDX body, optional gallery, and footer navigation.

Important project components:

- `src/components/projects/ProjectHero.tsx` renders the project title, tagline, and cover image.
- `src/components/projects/TableOfContents.tsx` scans `article h2, article h3`, assigns missing ids, and renders a fixed desktop-only table of contents.
- `src/components/projects/ProjectFooter.tsx` renders links and prev/next project navigation.
- `src/components/ProjectImage.tsx` renders project gallery images.
- `src/components/ui/project-image-asset.tsx` resolves project-local image assets from `src/content/projects`.

## Project MDX Frontmatter

Project metadata is typed by `ProjectMeta` in `src/lib/projects.ts`.

Common fields:

- `slug`
- `title`
- `tagline`
- `date`
- `type`: `"engineering"` or `"design"`
- `featured`
- `cover`
- `gallery`
- `tech`
- `metric`
- `links`
- `summary`
- `roles`
- `order`
- `draft`
- `tags`

When adding fields, update `ProjectMeta` first and then update all consumers deliberately.

## UX Bites Content Flow

UX Bites are stored as:

```text
src/content/ux-bites/<bite-slug>/index.mdx
```

`src/lib/uxBites.ts` uses eager `import.meta.glob` in the same pattern as projects. `UxBitePage.tsx` renders individual bites, while `UxBitesList.tsx` renders the list.

UX Bites have their own visual system and components under `src/components/uxBites`. Do not assume project-page styles apply to UX Bites.

## Images and Assets

For project content images, prefer `ProjectImageAsset`:

```tsx
<ProjectImageAsset
  src="project-slug/image-name.png"
  alt="Specific useful alt text"
/>
```

`src` is resolved relative to `src/content/projects`. Cover and gallery images usually use filenames from frontmatter and are joined with the project slug by React components.

Do not move MDX image assets outside the project content folder unless you also update the resolution logic.

## Styling Architecture

Tailwind is the main styling system. Design tokens are CSS variables in `src/index.css`, and Tailwind maps them in `tailwind.config.ts`.

The app has two visual modes:

- Engineer mode: cooler, precise, technical.
- Designer mode: more expressive, neubrutalist accents.

Mode is controlled by `ModeContext` and reflected through `data-mode` selectors in `src/index.css`. Theme is controlled separately by `ThemeContext` and `.dark` variables.

Reusable styling conventions:

- Use semantic token classes like `bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`, and `text-primary`.
- Use mode-aware helpers already defined in CSS, such as `heading-primary`, `card-styled`, `text-gradient-engineer`, and `text-gradient-designer`.
- For new shadcn-style primitives, use `cn` from `src/lib/utils.ts`.

## MDX Rendering Notes

MDX is configured in `vite.config.ts` with:

- `@mdx-js/rollup`
- `remark-frontmatter`
- `remark-mdx-frontmatter`
- `providerImportSource: "@mdx-js/react"`

Project MDX can import React components directly using the `@` alias. Keep MDX components small, explicit, and layout-oriented when they represent reusable content patterns.

The project table of contents depends on real `h2` and `h3` elements inside the `article`. If a heading is replaced by a custom component, ensure it still renders an actual heading when it should appear in the TOC.

## SEO and Metadata

`src/components/SEO.tsx` manages page metadata through `react-helmet-async`. Project pages derive SEO descriptions from `project.summary`, then `project.tagline`, then a fallback string.

When adding new page types, include SEO metadata near the page root.

## Implementation Rules for Future Agents

- Prefer local existing components before adding new abstractions.
- Preserve the MDX content loading pattern unless there is a strong reason to change it.
- Keep project and UX Bite content systems separate.
- Do not remove `draft` filtering behavior in `visibleProjects` or `visibleBites`.
- Do not break `ProjectImageAsset` path assumptions.
- Keep `article h2, article h3` compatibility if changing project MDX layout.
- Avoid broad global CSS changes when a scoped component class or Tailwind class is enough.
- Preserve route paths and Vite base-path behavior; GitHub Pages deployment depends on it.
- Everytime a task is run from the `tasks` folder, append changes to `.agents/progress.md` with all the updates that were done.
