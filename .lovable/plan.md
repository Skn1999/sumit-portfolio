## Goal
Add an optional `maxWidth` prop to `ProjectImageAsset` that caps how wide images render on large screens, then apply it only to the two `<ProjectImageAsset>` usages in the Optmyzr MDX.

## Changes

### 1. `src/components/ui/project-image-asset.tsx`
- Add prop `maxWidth?: number | string` (number → px, string → passed through, e.g. `"720px"`, `"48rem"`).
- Apply via inline `style={{ maxWidth, width: '100%' }}` plus `mx-auto` so the image stays centered within its container when capped. Block-level display ensures centering works.
- Also apply the same `maxWidth` to the empty fallback `<div>` so layout stays consistent.
- Default behavior unchanged when `maxWidth` is omitted (no inline style, no centering wrapper).

### 2. `src/content/projects/optmyzr-dashboard-migration/index.mdx`
- Add `maxWidth={720}` (sensible default for a single-column reading width) to both `<ProjectImageAsset>` instances:
  - `legacy-dashboard.svg`
  - `migrated-dashboard.jpg`

No other project MDX files touched — they keep current behavior.

## Out of scope
- Changing default image sizing for other projects.
- Lightbox / gallery components (`ProjectImage`, `ProjectGallery`) — request is specifically about `ProjectImageAsset` in MDX.
- Responsive `srcset` work.

## Verification
- Visit `/projects/optmyzr-dashboard-migration` on a wide viewport: both images cap at 720px and center within the column.
- Visit another project (e.g. ediaqi) and confirm images render unchanged.
