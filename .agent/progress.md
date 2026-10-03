## [2026-10-03] Silo Interactive Experience & ActAI Case Study Commit + Labs Restructure State

- **Branch**: `feat/tactile-field-and-lab`
- **Committed in Git**: Commit `140d84c` (`feat(labs): add Silo interactive experience and de-slop ActAI case study`)
- **Strict Scope Honored**: Per user instruction, ONLY files relating to the **Silo project** and **ActAI project** were committed. All other architectural redesign files (`Header.tsx`, `HeroParticleCanvas.tsx`, `Index.tsx`, `LabsPage.tsx`, `DesignEngineeringPage.tsx`, `App.tsx`, `index.html`) were intentionally kept uncommitted in the working tree for future review.

### 1. What was Committed (`140d84c` - 84 files)
#### A. Silo Interactive Experience (144-Level Vertical Architectural Exploration)
- **Interactive Component Architecture**:
  - `src/components/Spiral/`: Full modular implementation (`Experience.tsx`, `Stage/`, `LeftColumn/`, `OutroFooter.tsx`, CSS modules).
  - **Mode A (World Landing)**: High-resolution architectural line drawing hero with interactive level markers (L1, L48, L96, L144), background vignette edge blending, spotlight removal, and idle hint cues.
  - **Mode B (Level Deep Dive)**: Continuous vertical scroll ribbon through 144 levels with dual-plate cross-fading, dynamic camera zoom dip, and animated level rail.
  - **VisionOS Glass HUD**: Expanded 70vw center dialog appearing after level transition, featuring frosted background blur (`backdrop-filter: blur(28px)`), radial amber glow, Apple TV+ links (`https://tv.apple.com/us/show/silo/umc.cmc.3yksgc857px0k0rqe5zd4jice`), and clean typography without double arrow buttons.
- **Timeline & Camera Engine**:
  - `src/lib/timeline.ts`: Pure mathematical functions for dwell progression (`DWELL = 0.12`, `TRAVEL = 0.1733`), plate opacities, and panel styles.
  - `src/lib/camera.ts`: Perspective/orthographic viewport transforms with left-column offset compensation.
  - `src/lib/store.ts`: Reactive Zustand store tracking active level, scroll progress, transition modes (`A` <-> `B`), and reduced motion.
  - `src/lib/input.ts`: Scroll wheel/touch momentum intent detection and overscroll navigation.
  - `tests/timeline.test.ts`: Vitest test suite with 39/39 passing unit tests (`npx vitest run tests/timeline.test.ts`).
- **Data, Content & Assets**:
  - `src/content/labs/silo/index.mdx`: Complete craft documentation and case study copy.
  - `src/data/assets.generated.ts`, `src/data/content.ts`, `src/data/manifest.json`.
  - `public/assets/` & `assets/`: Multi-resolution responsive plates (1080px, 1536px in AVIF, WebP, JPG).
  - `src/pages/labs/SiloPage.tsx`: Full-screen standalone route with `"← Back to Labs"` navigation.

#### B. ActAI Case Study De-Slopping
- `src/content/projects/actai/index.mdx`:
  - Eliminated robotic AI-slop headings (`## 01 // WHY`, `## 02 // HOW`, `## 03 // WHAT`).
  - Rewritten with grounded, high-signal design engineering narrative:
    - *"The Delegation Trust Bottleneck"*
    - *"Progressive Disclosure: Triage, Context, and Bounded Action"*
    - *"Interface Architecture & Design Tokens"*
    - *"Prototype & Codebase"*
    - *"Evaluated Outcomes"*
  - Updated title: *"ActAI: Autonomous Email Delegation Client"*.
  - Configured static cover image for immediate stability.

---

### 2. Current Uncommitted Work in Working Tree (Pending User Direction)
The following modifications are fully implemented and functional in the local working tree, but intentionally left uncommitted:
1. **Single-Level Navigation Bar** (`src/components/Header.tsx`):
   - Flattened from two-level hierarchy to single-level header.
   - Renamed `"Design"` -> `"Design Engineering"` (`/design-engineering`).
   - Renamed `"Design Engineering"` -> `"Labs"` (`/labs`).
   - Retained `"Writings"` (`/writings/publication`) and `"Sumit Nayyar"` (`/`).
2. **Hero 3D Object Mapping & Smoothing** (`src/components/HeroParticleCanvas.tsx`):
   - Mapped 3D TV object to `"Labs"`.
   - Fixed 3D "me" model roughness: eliminated jagged facet shading by merging Three.js `TextGeometry` vertices with `mergeVertices(textGeometry, 1e-4)`, increasing `curveSegments: 48`, `bevelSegments: 8`, and bevel thickness `height: 0.12`.
3. **Restored Root Page** (`src/pages/Index.tsx`):
   - Restored original portfolio landing experience with Hero, Selected Projects, and Experience timeline.
4. **Dedicated Showcase Pages**:
   - `src/pages/LabsPage.tsx`: Labs showcase featuring Silo and ActAI.
   - `src/pages/DesignEngineeringPage.tsx`: Curated engineering project index.
   - `src/App.tsx`: Registered routes for `/labs`, `/labs/silo`, and `/design-engineering`.

---

### 3. Handoff Notes for Next AI Agent
- **Dev Server**: Vite running on `http://localhost:8080/`.
- **Testing**: Run `npx vitest run tests/timeline.test.ts` to verify Silo timeline mathematics. Run `npx tsc --noEmit` to verify TypeScript integrity (currently 0 errors).
- **Next Potential Tasks**:
  - Ask user if they wish to commit the single-level navbar, hero 3D TV mapping, and restored home page.
  - Explore animated GIF covers for Labs projects (ActAI and Silo) as outlined in `labs_migration_plan.md`.

---

### 2026-07-30 - tasks/task_add_product_hunt_badge.md

- Status: Completed
- Summary: Added a Product Hunt launch badge for 'Preflight' to the portfolio. The badge is integrated into the Home page after the Achievements section and in the Data Engineering page within the 'AI & Data Engineering' section.
- Files changed:
  - `src/components/ProductHuntBadge.tsx` (New file)
  - `src/pages/Index.tsx`
  - `src/pages/DataEngineeringPage.tsx`
- Tests run: `npm run build` (Passed cleanly)
- Acceptance criteria:
  - Product Hunt badge is rendered in `src/pages/Index.tsx` after `AchievementsSection`. (Verified)
  - Product Hunt badge is rendered in `src/pages/DataEngineeringPage.tsx` in `AiAndDataSection` before `ProjectIndexList`. (Verified)
  - Clicking the badge opens the Product Hunt launch page in a new tab securely. (Verified by inspecting the code)
  - The section aligns with the existing Slate Paper design system and typography. (Verified by inspecting the code and styling)
  - Layout is fully responsive across mobile, tablet, and desktop. (Verified by inspecting the code and styling)
  - Project builds cleanly via `npm run build` with zero TypeScript or JSX compilation errors. (Verified)
- Follow-ups / risks: None.

## [2026-08-18] Automated Task: task_add_product_hunt_badge.md

- **Agent**: Task Runner Agent (Dynamic TODO Loop)
- **Status**: Completed
- **TODO Items**: 6
- **Turns Used**: 7/9
- **Task File**: tasks/task_add_product_hunt_badge.md

## [2026-08-17] Automated Task: task_add_product_hunt_badge.md

- **Agent**: Task Runner Agent
- **Status**: Completed
- **Task File**: tasks/task_add_product_hunt_badge.md
