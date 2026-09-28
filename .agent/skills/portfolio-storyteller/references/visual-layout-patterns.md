# Visual Layout Patterns & Medium Selection Matrix

A case study must choose its layout and media framing based on the **project medium and problem domain**, rather than blindly copying a single layout pattern.

---

## 1. Domain-to-Layout Decision Matrix

| Project Domain / Medium | Best Primary Layout | Secondary Layout | Media Framing Style | Example Project |
| :--- | :--- | :--- | :--- | :--- |
| **AI Agents & Complex Logic** | `<EditorialSideBySide>` (Media 60% / Text 40%) | `<EditorialGrid2Up>` for Design System & State Machine plates | Bounded card containers with subtle borders (`editorial-media-container`) | *ActAI* |
| **B2B / Data Systems & Dashboards** | Comparative Markdown Tables (`What Didn't Work vs. What Worked`) | `<EditorialGrid2Up>` for paired multi-tenant or role-based views | Desktop browser chrome / wide aspect ratio plates | *EDIAQI*, *Optmyzr* |
| **Mobile Apps & Consumer UI** | 2-Up or 3-Up mobile device frame grids | Sequential step flow with micro-interaction cards | Mobile frame mockups with generous paper-card padding | *Super Ego*, *Rewards Convertor* |
| **Hardware / Spatial / Physical Systems** | Full-width environment hero + Side-by-side spec callouts | Ergonomic diagrams & physical prototype photos | Crisp photo borders with technical annotation badges | *Spatial Design Restaurant* |
| **Design Engineering Tooling / Libraries** | Interactive code snippets + Live React/Canvas preview widgets | Token matrix & state engine flowchart | Dark/light dual plates with monospaced code captions | *Groundwork* |

---

## 2. Available Portfolio Components & Layout Primitives

### Component 1: `EditorialSideBySide`
```tsx
import { EditorialSideBySide } from "@/components/editorial/EditorialLayout";

<EditorialSideBySide
  mediaSrc="project-slug/screen-a.png"
  mediaAlt="Screen descriptive alt text"
  title="Sub-5-second situational awareness"
  description="Identifies actionable triage items in under 5 seconds, separating immediate human veto power from quiet background telemetry."
/>
```
* **Use when**: A specific screen or key interaction moment requires focused narrative context. The media stays human-scale (max height 420px) and the text aligns naturally to the bottom of the card. Non-alternating: media always on the left, narrative always on the right.

### Component 2: `EditorialGrid2Up` & `EditorialCard`
```tsx
import {
  EditorialGrid2Up,
  EditorialCard,
} from "@/components/editorial/EditorialLayout";

<EditorialGrid2Up>
  <EditorialCard
    mediaSrc="project-slug/plate-1.png"
    mediaAlt="Plate 1 Description"
    title="Plate 01 // Tokens & Surfaces"
    description="Semantic color ramp, dark/light surface tokens, and elevation hierarchy."
  />
  <EditorialCard
    mediaSrc="project-slug/plate-2.png"
    mediaAlt="Plate 2 Description"
    title="Plate 02 // Component Primitives"
    description="State machine variations and accessible ARIA focus indicators."
  />
</EditorialGrid2Up>
```
* **Use when**: Comparing two related screens (e.g. Homepage vs. Detail Page, Light vs. Dark, or paired Design System plates). Expands up to 1200px on desktop (`editorial-breakout`) to provide generous canvas width.

### Component 3: Styled Markdown Comparative Tables
```markdown
| Category | ❌ What Didn't Work (Legacy Prototype) | ✅ What Worked (DSS Redesign) |
| :--- | :--- | :--- |
| **Touchpoint Strategy** | Single central desktop dashboard requiring manual checks. | **2-Touchpoint Architecture**: Ambient in-room tablet + Web dashboard. |
```
* **Use when**: Highlighting audit results, heuristic breakdowns, or legacy vs. redesign contrasts. Automatically rendered with paper-card borders and monospaced uppercase headers.

### Component 4: Standard Standalone Figures
```html
<figure className="not-prose my-8 md:my-12">
  <div className="editorial-media-container">
    <ProjectImageAsset src="project-slug/wide-diagram.png" alt="Architecture diagram" />
  </div>
  <figcaption className="font-mono text-[11px] text-ink-muted text-center mt-3">
    Fig 01 // End-to-end system architecture & telemetry pipeline
  </figcaption>
</figure>
```
* **Use when**: Displaying wide flowcharts, user journey maps, or broad system diagrams that need full width without side text.

---

## 3. How to Present the Visual Strategy Pitch to the User

During Phase 3.5 of the workflow, present the proposed layout strategy to the user using this exact structure:

1. **Medium & Domain Classification**: (e.g. *"This project is an AI Workflow prototype with complex asynchronous state transitions..."*)
2. **Recommended Layout Pattern**: (e.g. *"Recommend 3 non-alternating `<EditorialSideBySide>` rows for core moments + 1 `<EditorialGrid2Up>` for Design System tokens"*).
3. **Media Framing & Aspect Ratios**: (e.g. *"Desktop 16:10 aspect ratio in light mode with subtle paper-border containers"*).
4. **Section Structure Outline**: (Clear list of the planned 6–7 sections).
5. **Call for Approval**: Ask the user to confirm or adjust before creating any files.
