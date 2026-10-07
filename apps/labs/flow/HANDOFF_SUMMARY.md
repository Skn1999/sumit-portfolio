# Flow — Complete Project Handoff Summary

**Project Location:** `apps/labs/flow` (within the monorepo `/Users/SumitKumar/Desktop/consulting/portfolio`)  
**Dev Server:** `http://localhost:8090`  
**Build Status:** Clean (`npm run build` exits with code 0 across all 3 monorepo packages)  
**Date:** October 2026  

---

## 1. Core Architecture & Stack
- **Framework:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide icons, Three.js.
- **Design System:** Craft Docs tactile scrapbook collage aesthetic (`docs/flow-design.md`) and Arc UI motion primitives (`docs/flow-agent-guardrails.md`).
- **Data Layer:** LocalStorage persistence with read-only Gmail OAuth synchronization. Zero external backend server required (100% client-side).

---

## 2. Completed Features & Recent Milestones

### A. Corkboard Physics, Gesture Reliability & Unified 3D Aerodynamics
- **Motion Value Drag Fix:** Eliminated the Framer Motion "snap to top-left (0, 0)" bug on initial drag. `PostItNote.tsx`, `EmailCard.tsx`, and `ScratchNoteCard.tsx` bind directly to `useMotionValue(posX)` and `useMotionValue(posY)` in `style={{ x, y }}` with external spring synchronization for auto-arrangements.
- **Unified 3D Paper Drag Physics:** Existing post-it notes on the corkboard (`PostItNote.tsx`) now mirror the exact aerodynamic paper physics principles from the 3D drag overlay (`ThreeDPaperDragOverlay.tsx`):
  - **Velocity Smoothing:** Bound `useVelocity(x)` and `useVelocity(y)` to snappy springs (`useSpring`, stiffness 450, damping 32).
  - **Aerodynamic Roll (`rotateZ`):** As the user drags horizontally, the card banks into turns (`-vx * 0.012°` clamped between -22° and +22°), blending smoothly with resting corkboard rotation.
  - **Pitch & Perspective (`rotateX`):** The note lifts 5.5° forward towards the viewer with air resistance pitch (`vy * 0.012°`) in 3D perspective (`transformPerspective: 1200`).
  - **Yaw (`rotateY`):** Adds subtle lateral banking (`vx * 0.008°`) into the direction of drag.
  - **Adhesive Pivot Anchor:** Anchored at `transformOrigin: '50% 15%'` so the card flexes and swings from its top adhesive band like physical sticky paper.
  - **Trailing Desk Shadow:** Multi-layer shadow lags behind cursor motion in the reverse direction of velocity (`-vx * 0.016`, `-vy * 0.016`), with blur and spread expanding dynamically with speed.
  - **Spring Return:** Upon drop, `dragProgress` springs back to 0, returning the card flat onto the corkboard at its pinned resting rotation with the pushpin impact animation.
- **Pushpins:** Authentic pushpin rendering with lift and push-in microinteraction upon drop.
- **3D Drag Paper:** `ThreeDPaperDragOverlay.tsx` features an authentic canvas texture with pushpin, adhesive band, subtle grid lines, and physical 3D vertex curling.

### B. Natural Handwritten Typography & Default Heading Removal
- **No Forced Titles:** Removed `"New Priority Task"` and `"Untitled Note"` placeholders. Post-its rarely need formal titles in everyday use.
- **Conditional Title Rendering:** In `PostItNote.tsx`, the `<h3>` heading is only rendered when `todo.title?.trim()` contains actual text.
- **Expanded Handwritten Body:** When a note has no title, the body description expands to fill the card (`text-xl line-clamp-6 text-[#1f1f1f]`) in handwriting font, or displays an authentic `"Write notes here..."` placeholder matching `ThreeDPaperDragOverlay.tsx`.
- **Creation Defaults:** `Experience.tsx` (`handleAddTodoAtPosition` and `handleQuickNewTodo`) defaults to `title: ''`. `CardInspectorModal.tsx` saves trimmed titles without forcing fallbacks.

### C. AI Dossiers & Completion Visibility
- **Agent Drawer Redesign:** `AgentDrawer.tsx` was overhauled with a 3-tab segmented control:
  - **Dossiers:** Instant feed of all completed deliverables with 1-click **"Copy Dossier"**, **"Pin as Note"** (creates a permanent corkboard scratchpad note), and **"Open Details"**.
  - **Approvals:** Tier 2 high-stakes email sign-offs.
  - **In Progress:** Live active agent tasks with animated progress indicators.
- **Card-Face Executive Briefing:** Completed agent post-it notes display an inline **Executive Briefing** card face preview with a brass paperclip and **"Inspect ↗"** shortcut.
- **Interactive Notification Toast:** `NotificationToast.tsx` features a 1-click `[ 📎 View Dossier → ]` action button that opens the dossier modal directly when an agent finishes.

### D. Bottom Toolbar & Wire Basket Interaction
- **Toolbar:** Figma-style bottom pill toolbar (`FigmaBottomToolbar.tsx`) with sticky note color pickers. Pointer tool was removed.
- **Wire Basket:** Realistic wire mesh basket peeking out of the bottom toolbar with calm, static hover.
- **Physics Crumple Sequence:** Dragging any card near the toolbar basket crumples the paper into an animated 3D ball that drops into the basket.
- **Interior Bin Inspection:** Clicking the basket opens `BinInspectionModal.tsx` showing the 3D wire mesh interior and crumpled discarded notes, with a custom crumpled paper unwrap modal (`CrumpledNoteShaderModal.tsx`).

### E. Cleanups & Consolidation (Gmail Only)
- **Top-Right Header:** Removed the `"Sandbox Mode: flow"` pill from `App.tsx`.
- **Integrations Consolidated:** Completely purged all references and dead code for Telegram and Signal across `types.ts`, `Sidebar.tsx`, `AgentDrawer.tsx`, and `docs/flow-agent-guardrails.md`. Flow is strictly focused on Gmail.
- **Gmail Ingestion:** Secure OAuth 2.0 integration via Google Identity Services (`gmailService.ts` and `GmailConnectModal.tsx`) with read-only scope (`https://www.googleapis.com/auth/gmail.readonly`).

### F. Tactile Assistant Manila Folder
- **Component:** `AssistantFolder.tsx` pinned to the right side of the corkboard.
- **Visuals:** Warm kraft cardstock (`#eed8ae`), brass pushpin, index tab labeled `📁 Assistant`, and peeking document sheets (`"Brief #04"`).
- **Interactive States:** Lifts (`y: -6px`) on drag-over with a periwinkle drop slot (`"Release to delegate to Assistant"`). Displays real-time task counts and an animated working pulse when active.

### G. Spatial Delegation & Reclamation
- **Drop to Delegate:** Dropping any note or email card into the Assistant Folder bounds automatically sets `assignedTo: 'agent'`, `agentStatus: 'in_progress'` and launches the autonomous research engine.
- **Drag to Reclaim:** Dragging the note from the Assistant Folder back to the main board reclaims it to manual mode (`assignedTo: 'user'`, `agentStatus: 'idle'`) and removes pending approvals.

### H. Autonomous Agent Engine & Gemini Model Setup
- **Service:** `apps/labs/flow/src/lib/agentService.ts`.
- **Primary Endpoint:** Standardized exclusively on `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent` (version: `gemini-3.5-flash-lite`). All other deprecated/overloaded models were removed.
- **Sample Fixture Mode:** Verified sample API response saved in `apps/labs/flow/src/data/sampleAgentResponse.ts` (executive research briefing on Rive).
- **Dev Toggle:** `DEV_USE_SAMPLE_FIXTURE = true` in `agentService.ts` allows instant, zero-quota frontend testing. Flipping to `false` enables live API requests.
- **Tier 1 vs Tier 2 Guardrails:**
  - **Tier 1 (Safe Research):** Completes autonomously and attaches an executive briefing dossier.
  - **Tier 2 (Outbound Email):** Prepares an authentic draft reply and pauses in `awaiting_approval` for human sign-off via `AgentDrawer.tsx`.

---

## 3. Key Files & Locations
| File | Role |
|---|---|
| `apps/labs/flow/src/App.tsx` | Main app entry point (clean viewport). |
| `apps/labs/flow/src/Experience.tsx` | State container for threads, todos, approvals, agent dispatch, and note pinning. |
| `apps/labs/flow/src/components/corkboard/CorkboardCanvas.tsx` | Interactive corkboard surface, spatial hit-testing, and card placement. |
| `apps/labs/flow/src/components/corkboard/AssistantFolder.tsx` | Tactile Manila folder for delegating tasks to the AI assistant. |
| `apps/labs/flow/src/components/corkboard/PostItNote.tsx` | Sticky note with velocity-driven aerodynamic 3D physics, trailing shadow, pushpin lift, paperclip dossier, and conditional heading. |
| `apps/labs/flow/src/components/corkboard/ThreeDPaperDragOverlay.tsx` | 3D Three.js paper overlay for dragging new post-it notes from the toolbar with vertex bending and desk shadow. |
| `apps/labs/flow/src/components/corkboard/CardInspectorModal.tsx` | Modal for editing cards and viewing formatted executive research dossiers with 1-click copy. |
| `apps/labs/flow/src/components/AgentDrawer.tsx` | 3-tab assistant drawer (Dossiers, Approvals, In Progress) with 1-click Pin and Copy actions. |
| `apps/labs/flow/src/components/NotificationToast.tsx` | Toast notification stack with direct 1-click `[ 📎 View Dossier → ]` navigation. |
| `apps/labs/flow/src/lib/agentService.ts` | Intent classification, Gemini API call, and deliverable synthesis. |
| `apps/labs/flow/src/data/sampleAgentResponse.ts` | Permanent sample fixture of the Gemini flash lite response. |
| `apps/labs/flow/.env` | Environment configuration (`VITE_GOOGLE_CLIENT_ID`, `VITE_GEMINI_API_KEY`). |

---

## 4. Current State & Handoff Recommendations for Next Agent
- **Build & Dev:** Run `npm run build` or `npm run dev` in `apps/labs/flow` (port `8090`). Verified clean compilation (`tsc && vite build`).
- **Next Topic to Explore:**
  - **Post-Completion Interaction Ideas:** Generate and evaluate interaction ideas for how finished dossiers can interact spatially with the board (e.g. physical paperclip peeling, drag-splitting takeaways onto separate mini post-its, or drawer-to-board stamp microinteractions).
