# Task 040: Design Engineering Showcase & ActAI Case Study Integration

- **Task ID:** `task_040_design_engineering_actai_showcase`
- **Category:** Feature / Information Architecture / Content Integration
- **Target Branch:** Create `feat/task-040-design-engineering-actai` from `staging`

---

## 1. What the Task is About

### Context & Positioning
Sumit Nayyar's core identity on this portfolio is **Product Designer & Design Engineer** ("AI builds fast. I make sure it builds right."). Currently, the third main navigation column and dedicated page are titled **"Data Engineering"** (`/data-engineering`), which represents an outdated naming convention that does not match his craft or his work bridging Human-Computer Interaction (HCI) research, autonomous AI agent workflows, and front-end architecture.

Recently, Sumit built **ActAI**, an intelligent email delegation and oversight solution prototype designed to address human trust deficits in autonomous AI workflows.

### Objective
1. **Rebrand & Evolve Information Architecture:** Transition the third navigation pillar from "Data Engineering" to **"Design Engineering"** across the site navigation, routes, and page templates.
2. **Showcase AI Side Projects via Simon Sinek's Golden Circle (Why + How + What):** Introduce a dedicated **AI & Side Projects** section spotlighting **ActAI** as the flagship project, applying the Golden Circle framework:
   - **WHY:** Why email delegation needs rethinking (the delegation trust paradox, cognitive triage fatigue, black-box fear vs. human oversight).
   - **HOW:** How design engineering and HCI solve this (bounded agency, progressive disclosure, 1-click source-grounded evidence inspector, state machine with ambient feedback).
   - **WHAT:** What was built (the responsive React 18 + TypeScript + Vite + Tailwind CSS delegation review application, live Vercel deployment, and GitHub open-source repository).
3. **Multi-Touchpoint Visibility:** Showcase ActAI both on the **Homepage** (`/`) and on the dedicated **Design Engineering** page (`/design-engineering`), as well as through a dedicated in-depth case study MDX at `/projects/actai`.

### Project Links & Assets
- **Live Vercel Application:** [https://temporary-brisk-agate-zgvse9l.vercel.app/](https://temporary-brisk-agate-zgvse9l.vercel.app/)
- **GitHub Repository:** [https://github.com/Skn1999/ACTAI-SMART-EMAIL](https://github.com/Skn1999/ACTAI-SMART-EMAIL)
- **Primary Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Archivo typography, state machine architecture.

---

## 2. What Needs to be Done

### A. Navigation & Information Architecture
1. **Header Navigation (`src/components/Header.tsx`):**
   - Update the 3rd navigation column label from `Data Engineering` to `Design Engineering`.
   - Update `mainRoute` to `/design-engineering`.
   - Update sub-items:
     - `{ to: "/design-engineering#ai-side-projects", label: "AI & Side Projects" }`
     - `{ to: "/design-engineering#frontend-engineering", label: "Front-end Systems" }`
   - Ensure mobile navigation reflects the updated hierarchy.

2. **Router & Aliases (`src/App.tsx`):**
   - Add route `/design-engineering` pointing to the renamed/updated `DesignEngineeringPage`.
   - Retain `/data-engineering` as a backwards-compatible alias rendering `DesignEngineeringPage`.

### B. Project Library & Subcategories (`src/lib/projects.ts`)
1. Update `ProjectSubCategory` type to support:
   ```ts
   export type ProjectSubCategory =
     | "ux-design"
     | "visual-design"
     | "ai-data"
     | "ai-side-projects"
     | "frontend-engineering";
   ```
2. Ensure `getProjectsBySubCategory` seamlessly retrieves projects under `ai-side-projects` (or falls back appropriately).

### C. Homepage Integration (`src/pages/Index.tsx`)
1. Replace the existing standalone `Recent Launches` section (`#product-hunt-launch`) with a prominent, rich editorial section:
   - Anchor: `id="design-engineering-lab"` (or `#side-projects`)
   - Section tag: `// 04 DESIGN ENGINEERING & AI SIDE PROJECTS`
   - Heading: `Design Engineering Lab`
   - Subtitle: `Side projects exploring the intersection of autonomous AI agents, human-in-the-loop oversight, and crisp interaction design.`
2. Feature an interactive/editorial card for **ActAI**:
   - Visual banner / mock preview with badges: `React 18`, `TypeScript`, `Autonomous Agents`, `HCI Oversight`.
   - The **Golden Circle** breakdown:
     - **WHY (The Problem & Belief):** Bounded delegation beats black-box automation.
     - **HOW (The Design Principles):** 3-screen oversight model, source-grounded evidence inspector, bounded choices.
     - **WHAT (The Product):** Full interactive review application with live state machine.
   - Action buttons:
     - Open Live App (`https://temporary-brisk-agate-zgvse9l.vercel.app/` ↗)
     - GitHub Source (`https://github.com/Skn1999/ACTAI-SMART-EMAIL` ↗)
     - Read Full Case Study (`/projects/actai` →)
3. Maintain **Preflight** badge alongside ActAI as a secondary product decision tool showcase.

### D. Dedicated Page (`src/pages/DesignEngineeringPage.tsx`)
1. Rename / refactor `src/pages/DataEngineeringPage.tsx` into `src/pages/DesignEngineeringPage.tsx`:
   - SEO metadata updated to `Design Engineering & Systems | Sumit Nayyar`.
2. First Section: **`#ai-side-projects`** (`// AI & SIDE PROJECTS`):
   - Headline: `AI Side Projects & Prototypes`
   - Narrative: Designing high-agency interfaces, human-in-the-loop agent workflows, and autonomous system oversight.
   - Flagship Showcase: Detailed ActAI card/module with the Golden Circle (Why/How/What).
   - Product Hunt Badge for Preflight.
   - Any additional AI projects queried dynamically.
3. Second Section: **`#frontend-engineering`** (`// PRODUCTION SYSTEMS ARCHITECTURE`):
   - Retain existing Optmyzr Dashboard Migration, Optmyzr Onboarding Experience, and Gosta Labs.

### E. ActAI MDX Case Study (`src/content/projects/actai/index.mdx`)
1. Create `src/content/projects/actai/index.mdx` following the standard 4-zone layout system:
   - Frontmatter with `slug: "actai"`, `type: "engineering"`, `subCategory: "ai-side-projects"`, `featured: true`, links to Vercel and GitHub.
   - **`## 01 // WHY (The Core Belief & Problem)`**:
     - The delegation paradox: users fear black-box email automation, yet manual inbox triage causes executive burnout.
     - Cognitive load of inbox triage vs. the trust gap in LLM agents.
   - **`## 02 // HOW (Design Engineering & HCI Principles)`**:
     - *Progressive Disclosure*: Screen A (Today triage) → Screen B (Delegation review) → Screen C (Decision sheet).
     - *Source-Grounded Evidence*: The Evidence Drawer allowing users to verify LLM citations against raw emails/notes in 1 click.
     - *Bounded Agency*: 3 explicit consequence options instead of freeform prompts.
     - *State Machine & Ambient Feedback*: Predictable transitions and live indicators (`BotAvatar`, `ThinkingOrb`).
   - **`## 03 // WHAT (The Architecture & Execution)`**:
     - Breakdown of the 3 primary screens and the technical implementation (Vite, React 18, TypeScript, Tailwind, dark/light theme tokens).
     - Interactive CTAs linking to live Vercel app and GitHub repository.
   - **`## 04 // OUTCOME & EVALUATOR CONTROLS`**:
     - Built-in evaluator scenarios, instant reset, sub-second queue comprehension, and WCAG AA compliance.

---

## 3. Implementation Details

### Step 1: Update `src/lib/projects.ts`
Add `"ai-side-projects"` to `ProjectSubCategory`:
```ts
export type ProjectSubCategory =
  | "ux-design"
  | "visual-design"
  | "ai-data"
  | "ai-side-projects"
  | "frontend-engineering";
```

### Step 2: Create `src/content/projects/actai/index.mdx`
Create directory `src/content/projects/actai/` and add `index.mdx`:
```mdx
---
slug: "actai"
title: "ActAI: Intelligent Email Delegation & Oversight Review"
tagline: "Bridging autonomous email agents with human-in-the-loop oversight through progressive disclosure and source-grounded evidence."
date: "2026-09-24"
type: "engineering"
subCategory: "ai-side-projects"
featured: true
tech:
  - "React 18"
  - "TypeScript"
  - "Design Engineering"
  - "Autonomous Agents"
  - "HCI / Human Oversight"
  - "State Machines"
metric: "Full end-to-end delegation review cycle completed in < 30 seconds with 100% source-grounded verifiability"
links:
  live: "https://temporary-brisk-agate-zgvse9l.vercel.app/"
  github: "https://github.com/Skn1999/ACTAI-SMART-EMAIL"
summary: "An autonomous email delegation and oversight prototype built to solve the AI trust gap. Combines a 3-screen progressive disclosure model, an instant source-grounded evidence inspector, and bounded decision choices so users can safely delegate complex email triage without losing agency."
roles:
  - "Design Engineer"
  - "Full-Stack Prototyping"
  - "Interaction Architecture"
order: 1
draft: false
---

import { ExternalLink, Github, CheckCircle2, ShieldAlert, Cpu, Eye } from "lucide-react";

## 01 // WHY (The Core Belief)

### The Automation Trust Paradox
Autonomous AI email agents promise massive productivity gains, but in practice, executives and knowledge workers refuse to let autonomous bots send unreviewed correspondence. The friction is not technological capability—it is **trust**.

When an agent acts as a black box:
- Users worry about hallucinated details and awkward tone.
- Users cannot verify what source material the agent based its decisions on.
- The cognitive burden shifts from writing emails to anxiously second-guessing automated actions.

> **The Guiding Belief:** True agency does not come from black-box automation. It comes from **bounded delegation with human oversight**—empowering users to offload tedious triage while giving them 1-click evidence verification and decisive veto power before a message leaves their outbox.

---

## 02 // HOW (Design Engineering Principles)

To build trust between the human delegator and the autonomous agent, ActAI implements four core HCI and design engineering mechanisms:

### 1. Progressive Disclosure (3-Tier Mental Model)
Instead of confronting users with a dense, confusing timeline upfront, ActAI structures oversight into three intentional levels of detail:
1. **Screen A ("Today" Overview):** Instant situational awareness. Identifies tasks in under 5 seconds, separating items needing immediate decisions from quiet background monitoring.
2. **Screen B (Delegation Review & Timeline):** A 3-column workspace detailing the goal, active constraints, chronological agent actions, and exception alerts.
3. **Screen C (Decision Sheet):** A focused modal displaying explicit options, downstream consequence modeling, and an editable draft.

### 2. Source-Grounded Evidence Inspector
AI inferences must never be opaque. Whenever ActAI highlights an anomaly (such as a vendor changing a delivery date), users can click **"View source"** to open a side drawer showing:
- The exact customer or vendor email text.
- Internal Project Atlas constraints.
- Direct highlighting of quotes used to derive the suggested reply.

### 3. Bounded Decision Architecture
Open-ended text prompts increase user fatigue. ActAI translates complex situational choices into **3 bounded options** (e.g. *Keep 15 Oct delivery*, *Accept vendor date*, *Request callback*), each paired with an explicit consequence explanation before simulated sending.

### 4. Deterministic State Machine & Ambient Indicators
The entire workflow is driven by a strict finite-state machine (`IN_PROGRESS` → `AWAITING_DECISION` → `DRAFT_READY` → `SENT` / `MONITORING`), accompanied by `BotAvatar` agent identity states and animated `ThinkingOrb` feedback.

---

## 03 // WHAT (System Execution & Artifacts)

ActAI was engineered as a production-grade, highly responsive web application built with modern front-end standards:

- **Component Stack:** React 18, TypeScript, Vite, Tailwind CSS, Lucide icons, and custom CSS design tokens.
- **Typography & Accessibility:** Built using the Archivo geometric grotesque font family, full WCAG AA color contrast, and keyboard navigation (`Escape` drawers, focus trapping).
- **Light & Dark Theme Engine:** Zero-FOUC theme initialization script with persistent local storage.
- **Evaluator Controls:** An interactive toolbar allowing evaluators to reset state, simulate network latency, trigger edge cases, and inspect the state machine in real time.

<div className="my-10 p-6 md:p-8 rounded-2xl bg-paper-card border border-paper-border flex flex-col md:flex-row items-center justify-between gap-6">
  <div>
    <h3 className="text-xl font-bold font-display text-ink-primary mb-2">Explore the ActAI Live Experience</h3>
    <p className="font-body-narrative text-sm text-ink-muted max-w-xl">
      Test the live prototype directly on Vercel or review the open-source repository on GitHub.
    </p>
  </div>
  <div className="flex flex-wrap items-center gap-3">
    <a
      href="https://temporary-brisk-agate-zgvse9l.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink-primary text-paper-bg font-mono text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity"
    >
      <ExternalLink className="w-4 h-4" /> Live Prototype
    </a>
    <a
      href="https://github.com/Skn1999/ACTAI-SMART-EMAIL"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-paper-border bg-paper-bg text-ink-primary font-mono text-xs uppercase tracking-wider font-semibold hover:border-ink-primary transition-colors"
    >
      <Github className="w-4 h-4" /> View GitHub
    </a>
  </div>
</div>

---

## 04 // IMPACT & OUTCOME

- **Sub-30-Second Triage:** Evaluators are able to open the task, inspect the vendor contradiction, verify source evidence, and approve a revised dispatch in under 30 seconds.
- **Explainability Over Automation:** Proves that users are eager to delegate high-stakes communication when they feel in command of the final dispatch.
```

### Step 3: Update `src/components/Header.tsx`
Update `NAV_HIERARCHY`:
```ts
  {
    label: "Design Engineering",
    mainRoute: "/design-engineering",
    subItems: [
      {
        to: "/design-engineering#ai-side-projects",
        label: "AI & Side Projects",
      },
      {
        to: "/design-engineering#frontend-engineering",
        label: "Front-end Systems",
      },
    ],
  },
```

### Step 4: Update `src/App.tsx`
Add routes:
```tsx
import DesignEngineeringPage from "./pages/DesignEngineeringPage";

// Inside Routes:
<Route path="/design-engineering" element={<DesignEngineeringPage />} />
<Route path="/data-engineering" element={<DesignEngineeringPage />} />
```

### Step 5: Create / Refactor `src/pages/DesignEngineeringPage.tsx`
Structure the page with:
1. `HeroSection`
2. `AiSideProjectsSection` (`id="ai-side-projects"`):
   - Detailed feature card for ActAI with Golden Circle (Why, How, What).
   - Direct CTA links to Live Vercel app, GitHub, and `/projects/actai`.
   - Preflight Product Hunt badge.
3. `FrontendEngineeringSection` (`id="frontend-engineering"`):
   - Existing Optmyzr and Gosta Labs case studies queried via `getProjectsBySubCategory("frontend-engineering")`.

### Step 6: Update `src/pages/Index.tsx`
Upgrade Section 4 (`#product-hunt-launch`):
- Change section header to `// 04 DESIGN ENGINEERING & AI SIDE PROJECTS`.
- Title: `Design Engineering Lab`.
- Narrative: Showcasing side projects and tools built at the convergence of AI agents, human oversight, and modern interaction engineering.
- Include the ActAI showcase card alongside the Product Hunt badge.

---

## 4. Verification Checklist & Acceptance Criteria

### Automated Build & Type Checks
- [ ] `npm run build:agent` (or `npm run build`) completes with zero errors.
- [ ] No missing imports or TypeScript definition mismatches (`ProjectSubCategory`).
- [ ] `/projects/actai` compiles and renders MDX content correctly.

### Navigation & Routing
- [ ] Top navbar displays **"Design Engineering"** in desktop grid and mobile menu.
- [ ] Sub-nav links point to `/design-engineering#ai-side-projects` and `/design-engineering#frontend-engineering`.
- [ ] Visiting `/design-engineering` loads the new page cleanly.
- [ ] Visiting legacy `/data-engineering` redirects or renders the Design Engineering page seamlessly.

### Content & Visuals
- [ ] ActAI is featured with the **Simon Sinek Golden Circle (Why + How + What)** story format.
- [ ] Live Vercel link (`https://temporary-brisk-agate-zgvse9l.vercel.app/`) and GitHub link (`https://github.com/Skn1999/ACTAI-SMART-EMAIL`) open in new tabs securely.
- [ ] Preflight Product Hunt badge remains properly aligned and functional.
- [ ] Styling strictly adheres to the slate paper design system (`bg-paper-bg`, `text-ink-primary`, `font-display`, `font-mono`).

---

## 5. Execution Instructions for Task Runner Agent

When invoking the automated task runner agent, run:

```text
Run .agent/task-runner-agent.md on tasks/task_040_design_engineering_actai_showcase.md
```
