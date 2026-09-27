### 2026-07-30 - tasks/task_add_product_hunt_badge.md

- Lessons learned: When integrating external HTML embeds, it's crucial to convert inline styles to Tailwind CSS classes and use existing design tokens (`bg-card`, `border-border`, `text-ink-primary`, `text-ink-muted`) to maintain visual consistency with the site's design system. Ensuring responsiveness with `max-w-[500px]` and `mx-auto` for centering is also important.
- Errors or surprises: None. The provided HTML embed was straightforward to convert to JSX and style with Tailwind.
- Resolution: Created a new `ProductHuntBadge` component, converted the HTML embed to JSX, applied Tailwind CSS for styling, and integrated it into the specified pages with `motion.div` wrappers for animation consistency.
- Future instruction: For future external embeds, always prioritize converting to internal components with Tailwind styling and design tokens to ensure maintainability, responsiveness, and dark/light mode compatibility.

### 2026-09-27 - tasks/task_040_design_engineering_actai_showcase.md

- Lessons learned:
  1. **Route Synchronicity**: Any modification to navigation links in `Header.tsx` MUST be mirrored simultaneously by corresponding `<Route path="..." element={<...Page />} />` declarations in `App.tsx` and static route pre-render lists in `scripts/inject-meta.js`. If a route is renamed or upgraded (e.g. `/design-engineering`), always retain legacy routes (e.g. `/data-engineering`) as backwards-compatible aliases or redirects to prevent broken bookmarks, deep links, or 404s.
  2. **Automated Agent Loop Resilience**: The ReAct execution loop in `scripts/run-task-agent.js` must NEVER prematurely terminate on arbitrary conversational text (`parts.find(p => p.text)`). LLMs frequently output intermediate reasoning or thoughts between tool calls. The runner loop must require explicit verification (i.e. `run_build_verification` passing cleanly) before allowing a zero-tool-call turn to conclude the task, otherwise nudging the model to finish executing its plan.
- Errors or surprises:
  - The automated task agent modified `Header.tsx` on Turn 1 to point to `/design-engineering`, but then emitted an interim conversational response on Turn 2 without calling tools. The runner's premature exit check (`finishReason === 'STOP' || textPart`) caused an early `process.exit(0)`, stranding the task before `DesignEngineeringPage.tsx`, `App.tsx`, and `Index.tsx` were modified, leading to a 404 error when clicking navigation links in VS Code testing.
- Resolution:
  - Created `DesignEngineeringPage.tsx` with dedicated `#ai-side-projects` and `#frontend-engineering` sections.
  - Created reusable `ActAiShowcase.tsx` spotlight component adhering to Simon Sinek's Golden Circle with live links and design tokens.
  - Updated `App.tsx` with routes for `/design-engineering` and backwards-compatible `/data-engineering`.
  - Updated `DataEngineeringPage.tsx` as a re-export alias.
  - Updated `Index.tsx` Section 4 (`#design-engineering-lab` with `#product-hunt-launch` anchor alias).
  - Updated `scripts/inject-meta.js` static routes to pre-generate HTML for `/design-engineering` and `/data-engineering`.
  - Hardened `scripts/run-task-agent.js` to track `hasBuildSucceeded` and nudge the LLM if it emits conversational text before completing the task and passing build verification.
- Future instruction:
  - Whenever introducing or renaming a navigation item, audit `App.tsx`, `scripts/inject-meta.js`, and verify route transitions with a local dev or preview build. Ensure task runner agents never exit before running and passing `npm run build:agent`.
