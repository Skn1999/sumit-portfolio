# Lab Projects Guidelines & Monorepo Architecture

This document defines the development patterns, conventions, and guidelines for building lab experiments and creative coding prototypes in this repository.

---

## 1. Monorepo Topology

```text
portfolio/
├── apps/
│   ├── portfolio/               # Core portfolio SPA (@portfolio/web)
│   └── labs/
│       ├── silo/                # Apple TV+ Silo Subterranean Spiral (@labs/silo)
│       └── <slug>/              # Future creative coding labs (@labs/<slug>)
│
├── packages/
│   ├── ui/                      # Shared primitives, shadcn, icons, hooks (@portfolio/ui)
│   ├── tailwind-config/         # Shared Tailwind preset & design tokens (@portfolio/tailwind-config)
│   └── tsconfig/                # Base & React compiler presets (@portfolio/tsconfig)
│
├── scripts/
│   ├── create-lab.js            # CLI generator: `npm run new-lab <slug>`
│   └── ...
└── .agent/                      # Central AI brain, skills, guidelines
```

---

## 2. Core Principles for Lab Projects

1. **Isolation First**:
   - Each lab lives inside `apps/labs/<slug>`.
   - Complex state (e.g. Zustand stores, Three.js scenes, 2D particle simulations, animation timelines) belongs exclusively inside the lab's directory, NOT in the portfolio root.

2. **Reusability via Shared Packages**:
   - Import UI components, Radix wrappers, and utilities directly from `@portfolio/ui`:
     ```tsx
     import { Button, Card, Dialog, cn } from "@portfolio/ui";
     ```
   - Import design tokens and typography presets from `@portfolio/tailwind-config`.
   - Never copy-paste shadcn boilerplate into a lab.

3. **Hybrid Consumption**:
   - **Standalone Prototyping**: Every lab has an `index.html`, `src/App.tsx`, and `vite.config.ts`. Run `npm run dev --workspace=@labs/<slug>` to develop the lab in pure isolation with zero portfolio overhead.
   - **Portfolio Integration**: Every lab exports an experience component from `src/index.ts` (e.g. `<SiloExperience />`). The main portfolio imports this component and renders it inside `apps/portfolio/src/pages/labs/<Name>Page.tsx`.

4. **Testing Timeline & Math**:
   - Complex animation or canvas math should have unit tests in `apps/labs/<slug>/tests/` run by Vitest (`npm run test`).

---

## 3. Creating a New Lab Experiment

To create a new lab, run:

```bash
npm run new-lab <slug> -- --title="Your Experiment Title" --description="Your description"
```

This automates:
- Workspace folder `apps/labs/<slug>` with Vite, React, and TypeScript.
- Pre-wiring to `@portfolio/ui` and `@portfolio/tailwind-config`.
- Scaffolding `Experience.tsx` and standalone `App.tsx`.
- Scaffolding MDX case study in `apps/portfolio/src/content/labs/<slug>/index.mdx`.
- Scaffolding portfolio page in `apps/portfolio/src/pages/labs/<PascalName>Page.tsx`.
- Registering workspace dependency in `apps/portfolio/package.json`.

After scaffolding:
1. Run `npm install` to link the new workspace.
2. Run `npm run dev --workspace=@labs/<slug>` to start building.
3. When ready, mount the route in `apps/portfolio/src/App.tsx`:
   ```tsx
   import MyLabPage from "./pages/labs/MyLabPage";
   // ...
   <Route path="/labs/my-lab" element={<MyLabPage />} />
   ```
