---
name: lab-scaffolder
description: Scaffolds, configures, and integrates new interactive lab experiments and creative coding prototypes in the monorepo without boilerplate.
---

# Lab Scaffolder Skill

Use this skill whenever creating or integrating a new interactive experiment, 3D/canvas prototype, or creative engineering project into the portfolio monorepo.

## Workflow

1. **Scaffold the Lab Workspace**:
   Run the CLI scaffolder to generate the workspace files:
   ```bash
   node scripts/create-lab.js <slug> --title="<Title>" --description="<Description>"
   ```

2. **Link Dependencies**:
   Run:
   ```bash
   npm install
   ```
   to update the monorepo workspace graph.

3. **Develop the Interactive Experience**:
   Implement the creative code in `apps/labs/<slug>/src/Experience.tsx`.
   - Use `@portfolio/ui` for UI components (buttons, sliders, toggles, dialogs).
   - Use Tailwind utilities configured via `@portfolio/tailwind-config`.
   - If using 3D or physics libraries (`three`, `@react-three/fiber`, `cannon-es`, `gsap`), add them to `apps/labs/<slug>/package.json`.

4. **Verify Standalone & Integrated**:
   - Verify isolated dev build: `npm run dev --workspace=@labs/<slug>`.
   - Verify portfolio route `/labs/<slug>` renders smoothly.
   - Run vitest if mathematics tests are included: `npm run test --workspace=@labs/<slug>`.
