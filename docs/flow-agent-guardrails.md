# Flow — AI Agent Design & Component Guardrails

**Document Version:** 1.0  
**Target:** Flow (`apps/labs/flow`) & Portfolio Monorepo  
**Applies to:** Antigravity, Subagents, Autonomous Workers, and Human Collaborators  
**Last Updated:** October 2026  

---

## 1. Purpose & Core Philosophy

This document defines the strict operational and visual guardrails for AI agents working in or integrating with **Flow**. 

Agents interacting with Flow have three fundamental responsibilities:
1. **Preserve Visual Craft:** Flow follows the **Craft Docs Tactile Scrapbook** design system (`docs/flow-design.md`) and **Arc UI (`uiarc.dev`)** motion primitives. Agents must never introduce discordant "AI-slop" UI patterns.
2. **Choose Existing Components Before Inventing:** Agents must look up and adapt components from the established Arc UI and `@portfolio/ui` catalogs before creating custom primitives.
3. **Know the Boundary of Autonomy:** Agents must distinguish safe autonomous actions from high-stakes actions, and **strictly halt and request approval** when uncertain or crossing security boundaries.

---

## 2. Component & Token Catalog: What Exists

### 2.1 Color Tokens (Light Mode Default)
Always use CSS variables or Tailwind configured tokens. Never use arbitrary hex colors unless matching these exact values:

| Name | Hex / Value | Token | Role in Flow |
|---|---|---|---|
| **Canvas** | `#fff3e7` | `--color-canvas` | Main page background (warm paper texture). Never replace with `#ffffff`. |
| **Ink** | `#030302` | `--color-ink` | Primary text, titles, active icons, filled pill buttons. |
| **White** | `#ffffff` | `--color-white` | Card backgrounds, floating panes, dialog surfaces. |
| **Linen** | `#f7f7f7` | `--color-linen` | Secondary backgrounds, inactive tab bars. |
| **Cloud** | `#efefef` | `--color-cloud` | Subtle hover states, chip backgrounds. |
| **Ash** | `#e1e1e1` | `--color-ash` | Subtle dividers, card borders (`border-[1px] border-[#e1e1e1]`). |
| **Stone** | `#bebbba` | `--color-stone` | Secondary captions, timestamps, disabled items. |
| **Graphite** | `#41413f` | `--color-graphite` | Sub-headings, metadata labels. |
| **Mint** | `#9bd8a9` | `--color-mint` | Completed todos, healthy sync status, low-priority tags. |
| **Marigold** | `#fde99b` | `--color-marigold` | P2/P3 priority badges, active triage highlights, search pills. |
| **Periwinkle** | `#b8caf5` | `--color-periwinkle` | AI Agent badges, autonomous draft previews, linked source tags. |
| **Sky** | `#9ed4ef` | `--color-sky` | Hero accents, thread message count badges. |
| **Papaya** | `#ff4500` | `--color-papaya` | P1 urgent priority alerts, destructive prompts, pending approvals. |
| **Azure** | `#0087ff` | `--color-azure` | Interactive links (`Open in Gmail ↗`), email thread sender highlights. |

---

### 2.2 Typography Scale & Rules
- **Display & Section Titles (H1, H2 ≥ 24px):**
  - **Font:** Serif (`UntitledSerifFont`, with fallback to `Lora`, `Merriweather`, serif).
  - **Letter-spacing:** Tight negative tracking (e.g. `-2.64px` at 66px, `-1.38px` at 46px, `-0.72px` at 24px).
  - **Weight:** 400.
  - **Role:** Evokes literary, thoughtful craft.
- **UI Elements & Body (< 24px):**
  - **Font:** Sans-serif (`UntitledSansFont`, with fallback to `Inter`, `Figtree`, system-ui).
  - **Sizes:** 12px (caption), 14px (body-sm / controls), 16px (body / list items).
  - **Weight:** 400 (regular), 500 (medium), 600 (semi-bold).
  - **Strict Rule:** NEVER use serif fonts for body text, task list items, table data, buttons, or form controls.

---

### 2.3 Arc UI Motion Primitives Catalog (`uiarc.dev`)
Flow adapts components from **Arc UI** with built-in spring motion:

1. **Navigation & Wayfinding:**
   - `Breadcrumb` (`https://uiarc.dev/components/breadcrumb`): Smooth animated breadcrumbs with subtle chevron transitions.
   - `Global Command Menu` (`Cmd+K`): Instant fuzzy search across inboxes, todos, and notes.
2. **Buttons & Actions:**
   - `Primary Pill Button`: 9999px radius (`rounded-full`), Ink background (`#030302`), White text, subtle hover lift.
   - `Action Button`: Contextual action buttons with icon + label.
   - `Split Button`: Primary action (e.g. "Save as Todo") with a dropdown arrow for secondary options ("Save as P1", "Save & Open").
   - `Confirm Morph`: Interactive confirmation button that morphs into a confirmation state before executing.
3. **Inputs & Toggles:**
   - `Input` / `Textarea`: 14px rounded corners (`rounded-xl`), `#ffffff` background, 1px `#e1e1e1` border, subtle focus ring.
   - `Tag Input`: Interactive chip input for tagging tasks and notes.
   - `Segmented Control`: Sliding pill indicator for switching views (`Inboxes` | `Todos` | `Notes`).
   - `Switch` / `Checkbox`: Spring-animated check state for completing todos.
4. **Surfaces & Overlays:**
   - `Dropdown Menu` & `Context Menu`: Floating card with multi-layered shadow (`--shadow-md-2`), 14px radius.
   - `Dialog / Drawer`: Bottom/slide-over drawer with backdrop blur.

---

## 3. Decision Matrix: How to Choose Components

When adding or modifying UI in Flow, follow this decision tree:

```
                                  USER NEED
                                      │
            ┌─────────────────────────┼─────────────────────────┐
            ▼                         ▼                         ▼
       NAVIGATION                  ACTION                   INPUT / EDIT
            │                         │                         │
     Is it a path?              Is it single?             Is it quick text?
     • Arc Breadcrumb           • Pill Button (Primary)   • Arc Input (14px)
                                • Ghost Button (Subtle)
     Is it search/jump?                                   Is it rich/notes?
     • Command Palette          Is it high-stakes?        • Markdown Textarea
       (Cmd + K)                • Confirm Morph           
                                                          Is it selection?
                                Is it multiple choice?    • Arc Segmented Control
                                • Split Button            • Arc Combobox / Select
                                • Dropdown Menu
```

### Component Selection Rules:
1. **Primary Screen CTAs:** Always use a **Pill Button** (`rounded-full`, bg `#030302`, text `#ffffff`).
2. **In-Card Triage Actions:** Use compact **Pill Action Badges** (`[T] Todo`, `[N] Note`, `[E] Archive`) with keyboard shortcut indicator inside `<kbd>`.
3. **Card Surfaces:** Always use `rounded-2xl` (20–24px) or `rounded-xl` (14–16px), background `#ffffff`, border `1px solid #e1e1e1`, and layered floating shadow:
   ```css
   box-shadow: rgba(0,0,0,0.01) 0px 50px 40px 0px, 
               rgba(0,0,0,0.02) 0px 50px 40px 0px, 
               rgba(0,0,0,0.05) 0px 20px 40px 0px, 
               rgba(0,0,0,0.08) 0px 3px 10px 0px;
   ```
4. **Status & Priority Indicators:** Use soft pastel pills (`bg-[#9bd8a9]/20 text-[#225533]` for Mint, `bg-[#fde99b]/40 text-[#665511]` for Marigold, `bg-[#b8caf5]/30 text-[#1a2e66]` for Periwinkle/Agent).

---

## 4. Strict Anti-Patterns (The "Never Do" List)

Agents must **never** output or accept the following patterns:
1. ❌ **No 0px Sharp Corners:** Everything has a minimum radius of `8px` (`rounded-lg`), cards are `14px-24px`, and buttons/tags are `9999px` (`rounded-full`).
2. ❌ **No Pure White Page Canvas:** The root app background is **always** `#fff3e7` (`--color-canvas`). Pure `#ffffff` is strictly reserved for cards and floating modal surfaces.
3. ❌ **No Hard Drop Shadows:** Never use `box-shadow: 0 4px 6px black` or `shadow-2xl` with a dark single-point offset. Always use the diffuse multi-layered shadow stack.
4. ❌ **No Serif in Body/UI Text:** Serif fonts (`UntitledSerifFont`, `Lora`) are forbidden on buttons, inputs, task titles, dates, or body copy. Only use them on headlines (`H1`, `H2`).
5. ❌ **No High-Contrast Pure Black:** Never use `#000000`. Use the softer ink tone `#030302` or `#41413f` (graphite).
6. ❌ **No Invasive Alert Popups:** Never use native browser `alert()` or jarring full-screen takeovers. Use toast pills, inline confirmation morphs, or the approval drawer.

---

## 5. Autonomy vs. Approval Protocol: When to Ask for Approval

Agents must balance execution speed with human safety. Use this classification:

### 🟢 Tier 1: Fully Autonomous (Proceed without asking)
The agent should execute immediately, record in `agentAuditLog`, and complete the task:
- Summarizing email threads into bullet-point notes.
- Drafting an email response and saving it to `agentArtifacts` for human review.
- Structuring raw notes into markdown headings and checklists.
- Extracting deadlines or sub-tasks into Flow's todo list.
- Running research queries or codebase searches.
- **Notification Rule:** When the agent picks up a task, it emits a real-time notification (`"🤖 Agent picked up: [Task Title]"`). When finished, it emits `"Task completed"`.

### 🔴 Tier 2: Approval Required (Strictly Halt and Request Approval)
The agent must **NEVER** execute autonomously. It must create an `ApprovalRequest`, set `status: 'awaiting_approval'`, and notify the user via Flow's in-app notification system and Agent Drawer:
1. **External Mutations:** Actually sending an email or outbound communication.
2. **Destructive Data Operations:** Permanently deleting tasks, notes, or cache archives.
3. **External Commitments:** Modifying calendar events, scheduling meetings, or triggering external paid webhooks.
4. **Architectural / Design Deviations:**
   - Attempting to install a new third-party dependency not in the repository.
   - Introducing new color variables or modifying existing design tokens.
   - Creating completely novel UI layouts that do not follow the 3-pane structure.
5. **Confidence Boundary:** Any task where the agent's confidence in understanding the user's intent is `< 80%`.

### How to Ask for Approval
When an approval is required, format the request using the standard schema:
```json
{
  "actionType": "send_email | delete_item | schedule_event | design_override",
  "summary": "Clear, concise 1-sentence description of the proposed action",
  "previewPayload": {
    "target": "sarah@design.co",
    "diffOrContent": "...",
    "rationale": "Why the agent believes this is the right action"
  }
}
```
This automatically renders an interactive card in Flow with `[ ✅ Approve ]` and `[ ❌ Reject ]` buttons and dispatches a high-priority in-app alert.
