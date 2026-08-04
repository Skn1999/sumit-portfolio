# Portfolio UI & Design Language Instructions

> **Central Portfolio UI Repository**: This document captures the visual, structural, and component presentation rules for rendering case studies on the portfolio website.
>
> _All AI agents building or updating portfolio case study pages must strictly follow these UI guidelines to maintain design consistency._

---

## 1. Flowcharts & State Machine Visualizations

> **UI Rule**: Never present multi-state systems, sequential processes, or state transitions as plain ordered text lists.

- **Presentation Standard**: Render state machines **visual flowcharts or interactive state diagrams**.
- **Detail Truncation**: Truncate low-level inline text details; prioritize clear visual state nodes ($A \rightarrow B \rightarrow C$) with minimal glanceable labels.
- **Component Usage**: Use SVG/CSS diagram blocks, Mermaid diagrams, or custom visual step components.

---

## 2. Standout Quote & Qualitative Callout Cards

> **UI Rule**: Format qualitative research quotes and user feedback so they visually pull away from body copy and command attention.

- **Presentation Standard**: Wrap quotes in styled visual callout cards featuring:
  - Distinct background cards (`paper-card`, subtle borders, or ambient accent glows).
  - Prominent typography with sub-text explaining _why_ the quote validates a specific UX/design decision.

- **Example Pattern**:
  ```tsx
  <QuoteCard
    quote="I don't think it's enough to have a blinking light..."
    author="Research Participant"
    insight="Validates why raw alerts fail and explicit action protocols are mandatory."
  />
  ```

---

## 3. Color-Coded Status Tags for Retrospectives & Outcomes

> **UI Rule**: Avoid plain tables for retrospectives, tradeoffs, or project outcomes. Use card components with color-coded badge tags.

- **Presentation Standard**: Replace plain markdown tables with visual status cards. Each card must feature a distinct color-coded status badge:
  - 🟩 **Green (`bg-emerald-500/10 text-emerald-600`)**: `Major Success` / `Validated Pattern`
  - 🟨 **Amber (`bg-amber-500/10 text-amber-600`)**: `Scope Compromise` / `Tradeoff`
  - 🟥 **Rose (`bg-rose-500/10 text-rose-600`)**: `Failure / Bottleneck` / `Friction Point`
- **Layout**: Render as scannable flex/grid cards with the status badge placed top-left, followed by a bold data point headline and description.

---

## 4. Visual Roadmap Components ("Lego Block" Assembling Visual)

> **UI Rule**: Do not use standard bulleted lists for "Future Roadmap" or "+3 Months Strategy" sections.

- **Presentation Standard**: Render the roadmap as an additive visual assembly—conceptually like **Lego blocks** snapping onto the core project foundation.
- **Animation & Motion**: Utilize CSS animations or Motion libraries (e.g. Framer Motion) to create subtle, minimal entrance animations where roadmap blocks slide/snap into the project structure.
- **Structure**: Each roadmap item is a distinct, modular visual block representing a feature or study being attached to the base project block.

---

## 5. Prototypes & Resource Links

> **UI Rule**: Prototype links (Figma, live demos, Notion studies) must never be buried in inline markdown links.

- **Presentation Standard**: Present prototype links as prominent CTA buttons or text-buttons.
- **Styling**: subtle hover scale/border accents (`hover:border-ink-primary/40`), and mono-spaced uppercase labels.

---

_Central Store Log Updates:_

- `[2026-08-03]`: Extracted initial Portfolio UI presentation rules from `restructure.md` (State Flowcharts, Standout Quotes, Color-Coded Status Badges, Lego-Block Roadmaps, and CTA Prototype Buttons).
