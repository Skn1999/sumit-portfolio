# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Founders, product leaders, hiring managers, design directors, engineering leaders, and collaborators evaluating Sumit Nayyar for product design, 0-to-1 building, advisory consulting, or technical design leadership.

## Product Purpose

A high-craft personal portfolio and interactive digital canvas showcasing Sumit Nayyar's work as a **Product Designer and Builder**—operating fluidly across product thinking, UI/UX craft, systems engineering, and creative technology. It serves as both a proof-of-competence artifact (featuring high-signal case studies) and an interactive playground (featuring live WebGL and creative coding labs).

## Positioning

**Product Designer and Builder**: Bridging the gap between pure product design and production-grade engineering. The portfolio embodies this dual-mindset directly through its architecture: seamlessly toggling between "Engineer Mode" (systems thinking, technical precision, monospaced cool accents) and "Designer Mode" (expressive neubrutalism, tactile motion, editorial aesthetics). The product itself is living proof of end-to-end craft—from concept to shipped code.

## Operating Context

- Evaluated in fast desktop review passes (60-90 second hiring sweeps) as well as deep-dive case study readings (5-10 minutes).
- Seamless responsive behavior across high-DPI desktop screens, laptops, tablets, and mobile devices.
- High-performance 60fps animations, smooth scrolling (Lenis), Radix UI primitives, and dynamic MDX case study rendering.

## Capabilities and Constraints

- **Monorepo Architecture**: Turborepo containing `@portfolio/web` (`apps/portfolio`), creative labs (`apps/labs/*`), and shared UI packages (`packages/ui`, `packages/tailwind-config`).
- **Interactive Labs Integration**: Embedded iframe/micro-app prototypes (e.g. Silo, Flow) running alongside editorial case studies.
- **Dual Visual Modes**: Global `data-mode` state ('engineer' vs 'designer') dynamically altering color palettes, typography stacks (`Space Mono` vs `Space Grotesk`), shadow elevation, and component treatments.
- **Zero-Tolerance for AI-Slop**: Purposeful motion design (Emil Kowalski / Jakub Krehel / Jhey Tompkins principles) avoiding generic fade-in spam, unmotivated particle blobs, or superficial gloss.

## Brand Commitments

- **Name**: Sumit Nayyar
- **Role Identity**: Product Designer and Builder
- **Aesthetic Pillars**: Extreme craft, typography hierarchy (Inter, Space Mono, Space Grotesk), tactile micro-interactions, dark/light coherence, and responsive excellence.

## Evidence on Hand

- Production case studies in `src/content/projects/` (MDX + high-res assets).
- Live interactive labs under `apps/labs/` (e.g., Silo, Flow).
- Design system documentation in `DESIGN.md`.
- Resume and career milestones at `/resume`.

## Product Principles

1. **Craft Over Novelty**: Every animation, transition, and micro-interaction must serve a semantic purpose or reinforce tactile feedback.
2. **Dual-Mindset Transparency**: Unapologetically celebrate both rigorous systems engineering and expressive creative design without diluting either.
3. **Artifact-Led First Impression**: Let the work and live interactions lead; UI chrome recedes to let typography, case studies, and lab prototypes shine.
4. **Performance as a Core Aesthetic**: Instant route transitions, optimized WebP/SVG media, 60fps gesture handling, and zero layout shifts.

## Accessibility & Inclusion

- WCAG AA color contrast ratios in both Engineer and Designer modes.
- Full keyboard navigability with Radix UI focus rings.
- Respect for `prefers-reduced-motion` across all GSAP and Framer Motion animation loops.
