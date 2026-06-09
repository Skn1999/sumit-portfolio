# Design System Documentation

This document describes the design system for the portfolio application. It is structured to be compatible with Google Stitch and other design-to-code tools.

**Last Updated:** May 2026  
**Project:** React + TypeScript + Vite Portfolio  
**Status:** Active

---

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Components](#components)
5. [Mode System](#mode-system)
6. [Animations & Transitions](#animations--transitions)
7. [Pages & Routes](#pages--routes)

---

## Design Tokens

### Color System

The design system uses HSL-based semantic color tokens that support both engineer and designer modes.

#### Base Colors (Light Mode - Default)

| Token                      | HSL Value   | Usage                      |
| -------------------------- | ----------- | -------------------------- |
| `--background`             | 0 0% 100%   | Primary background surface |
| `--foreground`             | 220 15% 15% | Primary text color         |
| `--card`                   | 0 0% 100%   | Card/component background  |
| `--card-foreground`        | 220 15% 15% | Card text                  |
| `--popover`                | 0 0% 100%   | Popover/tooltip background |
| `--popover-foreground`     | 220 15% 15% | Popover text               |
| `--border`                 | 220 15% 92% | Border/stroke color        |
| `--input`                  | 220 15% 94% | Input field background     |
| `--muted`                  | 210 15% 98% | Muted/secondary surface    |
| `--muted-foreground`       | 220 10% 45% | Muted text                 |
| `--destructive`            | 0 85% 60%   | Error/destructive actions  |
| `--destructive-foreground` | 0 0% 100%   | Destructive text           |

#### Engineer Mode Colors

Engineer mode uses cool, technical blue/cyan accents with minimal visual flourishes.

| Token                | HSL Value   | Context                       |
| -------------------- | ----------- | ----------------------------- |
| `--engineer-primary` | 215 85% 55% | Primary actions, focus states |
| `--engineer-accent`  | 200 95% 60% | Accent highlights, badges     |
| `--engineer-surface` | 0 0% 100%   | Surface backgrounds           |
| `--engineer-glow`    | 215 85% 60% | Focus rings, emphasis         |

**Mode Mapping:** When `data-mode="engineer"` is active:

- `--primary` → `--engineer-primary` (215 85% 55%)
- `--accent` → `--engineer-accent` (200 95% 60%)
- `--ring` → `--engineer-glow` (215 85% 60%)

#### Designer Mode Colors

Designer mode uses purple/pink neubrutalism with expressive, tactile visual language.

| Token                | HSL Value   | Context                       |
| -------------------- | ----------- | ----------------------------- |
| `--designer-primary` | 260 75% 60% | Primary actions, focus states |
| `--designer-accent`  | 340 85% 65% | Accent highlights, warmth     |
| `--designer-surface` | 0 0% 100%   | Surface backgrounds           |
| `--designer-glow`    | 260 75% 70% | Focus rings, emphasis         |
| `--designer-border`  | 0 0% 15%    | Bold borders, shadows         |
| `--designer-shadow`  | 0 0% 15%    | Shadow color for neubrutalism |

**Mode Mapping:** When `data-mode="designer"` is active:

- `--primary` → `--designer-primary` (260 75% 60%)
- `--accent` → `--designer-accent` (340 85% 65%)
- `--ring` → `--designer-glow` (260 75% 70%)

#### Sidebar Colors

| Token                          | HSL Value         | Usage                  |
| ------------------------------ | ----------------- | ---------------------- |
| `--sidebar-background`         | 0 0% 98%          | Sidebar background     |
| `--sidebar-foreground`         | 240 5.3% 26.1%    | Sidebar text           |
| `--sidebar-primary`            | 240 5.9% 10%      | Sidebar primary action |
| `--sidebar-primary-foreground` | 0 0% 98%          | Sidebar primary text   |
| `--sidebar-accent`             | 240 4.8% 95.9%    | Sidebar accent surface |
| `--sidebar-accent-foreground`  | 240 5.9% 10%      | Sidebar accent text    |
| `--sidebar-border`             | 220 13% 91%       | Sidebar border         |
| `--sidebar-ring`               | 217.2 91.2% 59.8% | Sidebar focus ring     |

### Radius Tokens

| Token         | Value                     | Usage                    |
| ------------- | ------------------------- | ------------------------ |
| `--radius`    | 0.75rem (12px)            | Base border-radius       |
| `--radius-lg` | 0.75rem (12px)            | Large components         |
| `--radius-md` | calc(var(--radius) - 2px) | Medium components (10px) |
| `--radius-sm` | calc(var(--radius) - 4px) | Small components (8px)   |

---

## Typography

### Font Families

The design system defines three semantic font families:

| Family     | Font Stack                | Usage                             | Mode          |
| ---------- | ------------------------- | --------------------------------- | ------------- |
| `body`     | Inter, sans-serif         | Body text, general content        | All           |
| `engineer` | Space Mono, monospace     | Headings, code, technical content | Engineer mode |
| `designer` | Space Grotesk, sans-serif | Headings, expressive content      | Designer mode |

### Heading Styles

Headings are mode-aware and switch typography family based on active mode.

#### Engineer Mode Headings

- Font Family: `Space Mono`
- Style: Technical, monospaced
- Class: `heading-primary`
- Used in: Headers, section titles, project names
- Letter Spacing: Tight, precise

#### Designer Mode Headings

- Font Family: `Space Grotesk`
- Style: Modern sans-serif, geometric
- Class: `heading-primary`
- Used in: Headers, section titles, project names
- Letter Spacing: Natural geometric spacing

### Text Variants

| Variant                  | Font          | Usage                         |
| ------------------------ | ------------- | ----------------------------- |
| `body`                   | Inter         | Default paragraph text        |
| `muted-foreground`       | Inter         | Secondary/metadata text       |
| `text-gradient-engineer` | Space Mono    | Gradient text (engineer mode) |
| `text-gradient-designer` | Space Grotesk | Gradient text (designer mode) |

---

## Spacing & Layout

### Container & Margins

| Property            | Value         | Usage                        |
| ------------------- | ------------- | ---------------------------- |
| Container Max Width | 1400px (2xl)  | Page max-width               |
| Container Padding   | 2rem (32px)   | Horizontal container padding |
| Base Unit           | 0.25rem (4px) | Tailwind spacing scale       |

### Padding Utilities

Uses standard Tailwind spacing scale (p-0, p-1, p-2... p-12):

- `p-2` = 8px
- `p-4` = 16px
- `p-6` = 24px
- `p-8` = 32px
- `p-12` = 48px

### Section Spacing

Page sections follow a consistent vertical rhythm:

- Hero section: Full viewport height or 80vh minimum
- Content sections: 80px - 120px vertical gap
- Component sections: 40px - 60px vertical gap
- Inline elements: 16px - 24px horizontal gap

---

## Components

### Core Component Library

The design system includes shadcn/ui-based components with Tailwind styling:

#### Layout Components

**Container**

- Centered, max-width: 1400px
- Horizontal padding: 2rem
- Used for: Page content wrapping, section containers

**Layout**

- Sticky header at top
- Flex column layout
- Main content area with auto-height
- Footer area

**Header**

- Sticky positioning
- Mode-aware background/text
- Contains: Logo, navigation, mode toggle
- Height: 64px
- Background: Blurred with transparency

#### Interactive Components

| Component | Location                           | Description                              |
| --------- | ---------------------------------- | ---------------------------------------- |
| Button    | `src/components/ui/button.tsx`     | Primary CTA, secondary, outline variants |
| Badge     | `src/components/ui/badge.tsx`      | Status/tag display, mode-aware styling   |
| Card      | `src/components/ui/card.tsx`       | Content container, elevation via shadows |
| Dialog    | `src/components/ui/dialog.tsx`     | Modal overlay, Radix-based               |
| Tooltip   | `src/components/ui/hover-card.tsx` | Information popover                      |
| Input     | `src/components/ui/input.tsx`      | Text input fields                        |
| Select    | `src/components/ui/select.tsx`     | Dropdown selection                       |
| Tabs      | `src/components/ui/tabs.tsx`       | Tabbed content switching                 |
| Accordion | `src/components/ui/accordion.tsx`  | Collapsible sections                     |

#### Feature Components

| Component   | Location                         | Purpose                                 |
| ----------- | -------------------------------- | --------------------------------------- |
| HeroSection | `src/components/HeroSection.tsx` | Homepage hero with gradient, mode-aware |
| Projects    | `src/components/Projects.tsx`    | Project grid/list view                  |
| ProjectCard | Part of Projects                 | Individual project entry                |
| FilterBar   | `src/components/FilterBar.tsx`   | Project filtering (engineer/designer)   |
| Skills      | `src/components/Skills.tsx`      | Skills display section                  |
| Contact     | `src/components/Contact.tsx`     | Contact information section             |
| Header      | `src/components/Header.tsx`      | Site navigation header                  |
| ModeToggle  | `src/components/ModeToggle.tsx`  | Engineer/Designer mode switcher         |

#### Project Page Components

| Component         | Location                                      | Purpose                        |
| ----------------- | --------------------------------------------- | ------------------------------ |
| ProjectHero       | `src/components/projects/ProjectHero.tsx`     | Project title/header section   |
| TableOfContents   | `src/components/projects/TableOfContents.tsx` | Sticky navigation for sections |
| MetadataStrip     | `src/components/projects/MetadataStrip.tsx`   | Project meta info (date, tags) |
| ProjectImage      | `src/components/ProjectImage.tsx`             | Image gallery component        |
| ProjectImageAsset | `src/components/ui/project-image-asset.tsx`   | Single image asset             |
| ProjectFooter     | `src/components/projects/ProjectFooter.tsx`   | Next/prev project navigation   |

### Component Styling Patterns

#### Neubrutalism Components (Designer Mode)

**Card Styling:**

- Class: `card-styled`
- Border: 2-4px solid in designer-border color
- Shadow: Strong, offset drop shadow
- Background: Solid color or subtle gradient
- Transition: Smooth on hover

**Button Styling:**

- Class: `neubrutalism-button`
- Border: 2-3px solid
- Shadow: Lifted effect on hover
- Transform: Slight scale/elevation change
- Typography: Bold, geometric

**Badge Styling:**

- Class: `badge-styled`
- Border-radius: Varies (square, pill, rounded)
- Padding: 6px 12px
- Font: Space Grotesk
- Colors: Mode-dependent primary/accent

#### Technical Components (Engineer Mode)

**Card Styling:**

- Border: Thin 1px
- Shadow: Minimal or none
- Background: Flat white or subtle gray
- Typography: Space Mono for emphasis
- Spacing: Tight, compact

**Button Styling:**

- Border: Thin outline or subtle fill
- Shadow: None or minimal
- Transform: Minimal on hover
- Typography: Monospace, clean

#### Shared Patterns

**Focus State:**

- Ring width: 2px
- Ring color: Primary accent (mode-dependent)
- Class: `focus:ring-2 focus:ring-offset-2`

**Disabled State:**

- Opacity: 0.5-0.6
- Cursor: Not allowed
- Class: `disabled:opacity-50 disabled:cursor-not-allowed`

**Hover State:**

- Transition: Use `--transition-smooth` (0.3s ease)
- Color shift: Lighten or add gradient
- Shadow: Increase elevation

---

## Mode System

### Overview

The design system supports two distinct visual modes: **Engineer** and **Designer**. These modes change the entire visual language while keeping content structure identical.

### Mode Context

**Location:** `src/contexts/ModeContext.tsx`

**State Management:**

```
useMode() → { mode, setMode }
```

**Default Mode:** Designer  
**Active Mode Indicator:** `data-mode` attribute on `<html>` element

### Mode Switching

**Trigger:** ModeToggle component in header  
**Animation:** Full-screen mode-transition overlay  
**Duration:** 0.6s with cubic-bezier easing  
**Context:** TransitionContext coordinates the transition

### Engineer Mode Characteristics

| Aspect           | Description                                          |
| ---------------- | ---------------------------------------------------- |
| **Typography**   | Space Mono (monospace), tight letter-spacing         |
| **Colors**       | Cool blues (215 85% 55%), cyan accents (200 95% 60%) |
| **Aesthetics**   | Minimal, technical, grid-aligned                     |
| **Spacing**      | Compact, precise                                     |
| **Shadows**      | Minimal or none                                      |
| **Borders**      | Thin (1px), subtle                                   |
| **Interactions** | Quick, minimal animation                             |
| **Use Cases**    | Software engineering projects, technical content     |

### Designer Mode Characteristics

| Aspect           | Description                                           |
| ---------------- | ----------------------------------------------------- |
| **Typography**   | Space Grotesk (geometric sans-serif), natural spacing |
| **Colors**       | Purple (260 75% 60%), pink accents (340 85% 65%)      |
| **Aesthetics**   | Neubrutalism, bold, expressive                        |
| **Spacing**      | Generous, breathing room                              |
| **Shadows**      | Strong, offset drop shadows                           |
| **Borders**      | Bold 2-4px, prominent                                 |
| **Interactions** | Smooth, elevated animations                           |
| **Use Cases**    | Design projects, creative work                        |

### CSS Selectors

#### Mode-Specific Styling

```css
/* Engineer mode active */
[data-mode="engineer"] {
  --primary: 215 85% 55%;
  --accent: 200 95% 60%;
  --ring: 215 85% 60%;
}

/* Designer mode active */
[data-mode="designer"] {
  --primary: 260 75% 60%;
  --accent: 340 85% 65%;
  --ring: 260 75% 70%;
}
```

#### Component Variants

Components may have mode-specific classes:

- `.engineer-only` - Visible only in engineer mode
- `.designer-only` - Visible only in designer mode
- `heading-primary` - Typography changes by mode
- `card-styled` - Styling changes by mode
- `badge-styled` - Border/shadow changes by mode

### Components Using Mode

The following components read and respond to mode changes:

| Component       | Mode Usage                          |
| --------------- | ----------------------------------- |
| Header          | Logo, typography, color             |
| HeroSection     | Background, gradient, typography    |
| Projects        | Card styling, grid layout           |
| FilterBar       | Badge colors, button styling        |
| Skills          | Card design, animations             |
| ProjectHero     | Title styling, hero image treatment |
| ProjectPage     | Typography, card styling            |
| Contact         | Button styling, form appearance     |
| ReadingProgress | Indicator color                     |

---

## Animations & Transitions

### Transition Variables

| Variable              | Value                                         | Usage                        |
| --------------------- | --------------------------------------------- | ---------------------------- |
| `--transition-mode`   | all 0.6s cubic-bezier(0.4, 0, 0.2, 1)         | Mode switching               |
| `--transition-smooth` | all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) | Hover states, subtle changes |
| `--transition-spring` | all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)    | Bounce/spring effects        |

### Animation Keyframes

#### Accordion Animation

**accordion-down:** Expands accordion item

- Duration: 0.2s ease-out
- Height: 0 → `--radix-accordion-content-height`

**accordion-up:** Collapses accordion item

- Duration: 0.2s ease-out
- Height: `--radix-accordion-content-height` → 0

### Motion Classes

| Class                 | Effect                         | Duration   |
| --------------------- | ------------------------------ | ---------- |
| `mode-transition`     | Fade/transition on mode change | 0.3s       |
| `glow-engineer`       | Glow effect (engineer mode)    | Continuous |
| `glow-designer`       | Glow effect (designer mode)    | Continuous |
| `neubrutalism-card`   | Hover elevation + shadow       | 0.3s       |
| `neubrutalism-button` | Press/hover scale effect       | 0.2s       |

### Framer Motion Usage

- Used for page transitions (PageTransition component)
- Hero animations (HeroSection, HeroWithSwirls)
- Skill constellation animations (SkillConstellation)
- Magnetic button effects (MagneticButton)

**Animation Patterns:**

- Fade in/out with opacity
- Slide from edges
- Scale transformations
- Stagger effects for lists
- Reduced motion respect via `use-reduced-motion` hook

---

## Pages & Routes

### Page Routes

| Route             | Component                   | Purpose                              |
| ----------------- | --------------------------- | ------------------------------------ |
| `/`               | `src/pages/Index.tsx`       | Homepage (Hero + Projects + Contact) |
| `/resume`         | `src/pages/ResumePage.tsx`  | Resume page with PDF viewer          |
| `/projects`       | Part of Index               | Project listing/filtering            |
| `/projects/:slug` | `src/pages/ProjectPage.tsx` | Individual project detail            |
| `*`               | `src/pages/NotFound.tsx`    | 404 catch-all                        |

### Homepage (Index)

**Sections:**

1. ScrollProgress indicator (top)
2. Header (sticky)
3. HeroSection (full viewport or 80vh)
4. Projects section (filtered grid)
5. Contact section
6. Footer

**Components Used:**

- `src/components/HeroSection.tsx`
- `src/components/Projects.tsx`
- `src/components/Contact.tsx`
- `src/components/ReadingProgress.tsx`

### Project Detail Page

**Layout:**

- Magazine-style article layout
- Two-column rhythm on desktop
- Single column on mobile
- Sticky section navigation

**Sections:**

1. ProjectHero (title, hero image)
2. MetadataStrip (date, tags, tech)
3. MDX Content (prose body with Tailwind Typography)
4. ProjectImage galleries (optional)
5. ProjectFooter (prev/next navigation)

**Components Used:**

- `src/components/projects/ProjectHero.tsx`
- `src/components/projects/TableOfContents.tsx`
- `src/components/projects/MetadataStrip.tsx`
- MDX content from `src/content/projects/{slug}/index.mdx`
- `src/components/ProjectImage.tsx`
- `src/components/projects/ProjectFooter.tsx`

### Project Content Structure

**Location:** `src/content/projects/{slug}/index.mdx`

**Frontmatter:**

```yaml
---
title: Project Title
description: Short description
type: engineering | design
featured: boolean
order: number
draft: boolean
date: YYYY-MM-DD
thumbnail: image.jpg
---
```

**Content:**

- MDX body with Markdown + React components
- Images referenced as `{slug}/{filename}`
- Handled by `src/components/ui/project-image-asset.tsx`

### Resume Page

**Layout:**

- Mobile: Card-based layout with CTA
- Desktop: PDF viewer + download button
- Responsive breakpoints at `md` (768px)

**Components:**

- Resume data from `src/pages/ResumePage.tsx`
- React PDF for rendering

---

## Configuration Files

### Tailwind Configuration

**File:** `tailwind.config.ts`

**Key Settings:**

- Dark mode: class-based
- Content paths: src/\*_/_.{ts,tsx}
- Container: centered, 2rem padding, 1400px max-width
- Plugins: `tailwindcss-animate`, `@tailwindcss/typography`
- Custom fonts: body (Inter), engineer (Space Mono), designer (Space Grotesk)
- Custom colors: All semantic tokens via CSS variables

### TypeScript Configuration

**File:** `tsconfig.json`

**Path Aliases:**

- `@/*` → `src/*`

### Vite Configuration

**File:** `vite.config.ts`

**Plugins:**

- React with Fast Refresh
- MDX support for content loading

### Components Configuration

**File:** `components.json`

**Framework:** shadcn/ui  
**Component Aliases:**

- `@/components`
- `@/components/ui`
- `@/lib`
- `@/hooks`

---

## Design System Usage Examples

### Using Mode Context

```tsx
import { useMode } from "@/contexts/ModeContext";

export function MyComponent() {
  const { mode, setMode } = useMode();

  return (
    <div data-mode={mode}>{mode === "engineer" ? "Technical" : "Creative"}</div>
  );
}
```

### Semantic Color Usage

```tsx
// Use Tailwind color utilities with semantic tokens
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Action
</button>

<div className="border border-border bg-card text-card-foreground">
  Content
</div>
```

### Typography Variants

```tsx
// Engineer mode
<h1 className="font-engineer text-2xl font-bold">Engineering Project</h1>

// Designer mode
<h1 className="font-designer text-2xl font-bold">Design Project</h1>

// Always safe
<p className="font-body text-base">Body text always uses Inter</p>
```

### Animation Usage

```tsx
// Mode transition animations
<div className="mode-transition">Content that animates on mode change</div>

// Hover effects
<div className="transition-smooth hover:shadow-md">Hover state</div>

// Spring animations (Framer Motion)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: 'spring', damping: 15 }}
>
  Animated content
</motion.div>
```

---

## Implementation Notes for Stitch

### Token Mapping

All design tokens are defined as CSS custom properties in `src/index.css` and exposed through Tailwind configuration:

- **Colors:** HSL format via `hsl(var(--token-name))`
- **Typography:** Font families via extended theme in `tailwind.config.ts`
- **Spacing:** Tailwind default scale (4px base unit)
- **Radius:** 0.75rem base with modifier scale
- **Transitions:** CSS custom properties for easing/duration

### Component Discovery

Components follow shadcn/ui patterns:

- Located in `src/components/ui/`
- Radix UI-based primitives
- CVA for variant management
- Tailwind for styling

### Mode Implementation

The `data-mode` attribute on the root `<html>` element controls all visual changes:

- Single CSS rule set reaps all benefits
- No separate theme files or duplicate components
- Context-driven state management

### Asset Handling

- Project images: `src/content/projects/{slug}/*.{jpg,png,svg}`
- Static assets: `public/images/`
- Images loaded via `ProjectImageAsset` component with relative paths

---

## Accessibility

### Color Contrast

- Text on background: WCAG AA minimum (4.5:1)
- Interactive elements: Distinct focus rings (2px ring, primary accent color)
- Mode switching: Sufficient contrast in both modes

### Keyboard Navigation

- All interactive components support keyboard access
- Focus management via Radix UI
- Tab order follows visual flow

### Reduced Motion

- Respects `prefers-reduced-motion` media query
- Animations optional via `use-reduced-motion` hook
- Critical transitions remain available

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Related Documentation

- **README.md** - Project overview and scripts
- **package.json** - Dependencies and npm scripts
- **src/lib/projects.ts** - Project loading and filtering logic
- **src/contexts/ModeContext.tsx** - Mode state management
- **src/index.css** - CSS custom properties and global styles

---

## Version History

| Date     | Version | Changes                             |
| -------- | ------- | ----------------------------------- |
| May 2026 | 1.0.0   | Initial design system documentation |
