# Portfolio Copilot Instructions

## Project Architecture

This is a **dual-mode portfolio** (Engineer/Designer) built with React + TypeScript + Vite. The app dynamically switches content and styling based on a global mode context, allowing a single codebase to serve two professional identities.

### Key Architecture Patterns

- **Mode System**: Global `ModeContext` (`engineer` | `designer`) controls content visibility, styling, and component behavior via `data-mode` attribute and `mode-transition` CSS class
- **MDX-based Projects**: Projects live in `src/content/projects/{slug}/index.mdx` with frontmatter metadata. MDX components are dynamically imported and rendered via `lib/projects.ts`
- **Image Handling**: Project images use Vite's URL constructor pattern (see `ui/project-image-asset.tsx`) for dynamic imports from `content/projects/{slug}/*.{jpg,png}`
- **Page Transitions**: Framer Motion `AnimatePresence` with `mode="wait"` + custom `TransitionContext` for smooth page-to-page navigation

## Development Commands

```bash
npm run dev              # Start dev server (port 8080)
npm run build            # Production build
npm run build:dev        # Development build (includes drafts)
npm run new-project      # Interactive CLI to scaffold new project
```

## Critical Conventions

### Mode-Dependent Styling

Use `mode-transition` class for smooth transitions when mode changes. Reference mode via `useMode()` hook or CSS `data-mode` attribute:

```tsx
const { mode } = useMode();
return (
  <div
    className={`mode-transition ${
      mode === "engineer" ? "text-blue-500" : "text-purple-500"
    }`}
  />
);
```

### Project Creation Workflow

**DO NOT** manually create project folders. Always use:

```bash
npm run new-project
```

This enforces the structure: `src/content/projects/{slug}/index.mdx` + images, and generates proper frontmatter.

### Project Metadata Schema

See `lib/projects.ts` for `ProjectMeta` interface. Key fields:

- `slug`: URL identifier (auto-generated from folder name if omitted)
- `type`: `"engineering"` | `"design"` - controls mode filtering
- `featured`: Boolean for homepage highlighting
- `order`: Manual sort order (lower = higher priority)
- `draft`: Excluded in production builds
- `cover` / `gallery`: Use `ProjectImage` type with `{filename, alt, caption?}`

### Image Imports

Never use direct `<img src="...">` for project images. Use `ProjectImageAsset`:

```tsx
import { ProjectImageAsset } from "@/components/ui/project-image-asset";
<ProjectImageAsset src="project-slug/image.jpg" alt="..." />;
```

### Path Aliases

Use `@/` for all `src/` imports:

```tsx
import { ProjectMeta } from "@/lib/projects";
import { Button } from "@/components/ui/button";
```

## Component Structure

- **UI Components**: `src/components/ui/` - shadcn/ui primitives
- **Feature Components**: `src/components/` - Hero, Projects, About, etc.
- **Project Components**: `src/components/projects/` - ProjectHero, MetadataStrip, etc.
- **Pages**: `src/pages/` - Top-level route components (Index, ProjectPage, NotFound)
- **Contexts**: `src/contexts/` - ModeContext (engineer/designer), TransitionContext

## Data Flow

1. **Project Loading**: `lib/projects.ts` uses Vite's `import.meta.glob()` to eagerly load all MDX files, extracting frontmatter and components
2. **Filtering**: `visibleProjects` array excludes drafts in production, sorts by featured → order → date
3. **Type-based Filtering**: `getProjectsByType()` splits projects into engineering/design arrays based on `type` field
4. **Rendering**: `ProjectPage` component uses `getProjectBySlug()` to find project, then renders its `Component` (the MDX default export)

## TypeScript Configuration

- **Strict Mode**: Intentionally relaxed - `noImplicitAny: false`, `strictNullChecks: false` for rapid prototyping
- **Path Mapping**: `@/*` → `./src/*` configured in `tsconfig.json` and `vite.config.ts`
- **MDX Types**: See `src/types/mdx.d.ts` for MDX module declarations

## Common Pitfalls

- **Don't use `getProjectsByType()` in loops** - use pre-computed `engineeringProjects` / `designProjects` exports
- **Mode transitions need `mode-transition` class** - without it, CSS property changes won't animate
- **ProjectImageAsset paths are relative to `content/projects/`** - don't include full path, just `{slug}/{filename}`
- **MDX frontmatter must include `slug`** - or rely on auto-generation from folder name

## Testing & Debugging

- **Draft Projects**: Set `draft: true` in frontmatter, then run `npm run build:dev` to preview locally
- **Image Loading Issues**: Check browser console for "Failed to load image" warnings from `ProjectImageAsset`
- **Mode Context Errors**: Ensure components using `useMode()` are wrapped in `<ModeProvider>` (already done in `App.tsx`)
