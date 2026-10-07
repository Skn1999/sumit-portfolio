# Concept Exploration: The Physics Corkboard ("The Tactile Living Board")
**A Fusion of the Physical Office Corkboard & BumpTop Physics Piles for Flow**

**Status:** Design Proposal & Prototyping Blueprint  
**Authors:** Sumit & Antigravity  
**Visual Anchor:** Craft Docs Aesthetic (`docs/flow-design.md`) & Arc UI Motion (`uiarc.dev`)  
**Target:** `apps/labs/flow`  

---

## 1. The Core Metaphor: "The Studio War-Room Desk"

Traditional task apps force human thought into linear lists, table cells, and rigid columns. But when creative engineers and designers solve hard problems, they don't open spreadsheets—they stand in front of a **cork bulletin board** or clear off a **large wooden desk**.

This hybrid model fuses:
1. **The Infinite Brown Corkboard:** A warm, textured canvas where notes, emails, and ideas live as tactile post-its, index cards, and pinned clippings connected by pushpins and thread.
2. **Physics-Based Piles (BumpTop Model):** Physical properties (mass, inertia, toss velocity, elastic collisions) where items can be swept into organic piles, fanned out like playing cards, or flicked across the board into action baskets.

```
+─────────────────────────────────────────────────────────────────────────────────────────────+
|  [ 📌 MINIMAP ]       [ 🔍 ZOOM 100% ]          [ 🤖 AGENT: ACTIVE ]        [ ⚡ TODAY: 3 ] |
+─────────────────────────────────────────────────────────────────────────────────────────────+
|                                                                                             |
|        [ 📥 INBOX CORK ZONE ]                             [ 🎯 TODAY'S FOCUS BOARD ]         |
|                                                                                             |
|       ┌──────────────────────┐                             ┌──────────────────────┐         |
|       │ 📌 Pushpin (Red)     │                             │ 📌 Pushpin (Brass)   │         |
|       │ ✉️ Elena: Tokens PR  │                             │ 📝 Aalto Keynote Bio │         |
|       │ "Pushed pastel..."   │   ──(Yarn Thread Link)──►   │ 🤖 [DRAFT PREPARED]  │         |
|       └──────────────────────┘                             │ ⚠️ Needs Approval    │         |
|                   │                                        └──────────────────────┘         |
|                   ▼ (Sweep together)                                                        |
|             ╔═══════════════╗                                   ┌──────────────────────┐    |
|             ║ 📚 CLIENT PILE║  ──(Hover / Click)──►  FANS OUT:  │ Card 1 │ Card 2 │... │    |
|             ╚═══════════════╝                                   └────────┴────────┴────┘    |
|                                                                                             |
|                                                                                             |
|        [ 📝 SCRATCHPAD AREA ]                             [ 🗑️ ARCHIVE WIRE BASKET ]         |
|        Loose pastel post-its                              (Flick items here to archive)     |
|        (Mint, Marigold, Periwinkle)                                                         |
|                                                                                             |
+─────────────────────────────────────────────────────────────────────────────────────────────+
```

---

## 2. Visual Anatomy: Tactile Elements & Craft Tokens

Every object on the board is a physical artifact styled using our **Craft Docs tokens**:

### 2.1 The Board Surface (The Canvas)
- **Base Material:** Rich, warm cork/Kraft paper grain (`#d9b38a` / `#fff3e7`), textured with a subtle organic dot lattice (`#c79f75`) spaced at 24px intervals.
- **Zoning Borders:** Low-contrast wooden frame dividers or soft painted white chalk lines dividing the board into intuitive zones:
  - **`📥 In-Tray Zone`:** Where fresh Gmail threads, Telegrams, and Signal notes land.
  - **`🎯 Today Focus Board`:** Where immediate priorities are pinned.
  - **`📚 Project Piles Area`:** Where clustered tasks and reference materials rest.
  - **`📝 Quick Scratchpad`:** Freeform brain-dump area for loose post-its.

### 2.2 Sticky Notes (Todos & Scratchpad)
- **Paper Palette:**
  - **Marigold (`#fde99b`):** Active tasks and urgent triage items.
  - **Mint (`#9bd8a9`):** Completed tasks, healthy states, low-priority reference.
  - **Periwinkle (`#b8caf5`):** Agent-generated drafts, AI summaries, automated research.
  - **Papaya (`#ffb4a2`):** Urgent P1 deadlines, tasks requiring user approval.
- **Physical Details:**
  - Natural random rotation angle between `-2.5°` and `+2.5°` upon drop.
  - Subtle dog-eared / lifted bottom corner shadow using multi-layered box-shadow.
  - Top edge scotch tape or pushpin.

### 2.3 Email & Message Clippings
- Styled like printed index cards (`#ffffff`) or folded kraft envelopes.
- Displays sender avatar stamp, subject in bold sans, relative timestamp, and Gmail deep-link icon (`↗`).

### 2.4 Pushpins & Fasteners
- **Pushpin:** 3D-styled head with highlight and cast shadow onto the paper beneath.
- **Pinned State:** Clicking a pushpin anchors the card in place so it cannot be accidentally nudged by physics. Pulling the pin makes it a free-floating physical object.

---

## 3. Physics & Pile Mechanics (The BumpTop Model)

### 3.1 Fluid Drag, Glide & Toss
- **Inertia & Momentum:** Dragging a note and flicking it gives it velocity. It glides across the cork with realistic friction and comes to a natural rest.
- **Fling-to-Action Gestures:**
  - **Flick to Bottom-Right:** If tossed towards the **Archive Wire Basket**, it plays a light crumple/whoosh animation and archives the thread.
  - **Flick to Today Zone:** Automatically assigns `status: 'today'` and sets priority.

### 3.2 Dynamic Piles (Grouping & Stacking)
- **Sweeping into Piles:** Dragging two or more notes close together snaps them into a **Pile (Stack)**.
- **Visual Stacking:** A pile shows slightly offset card edges beneath the top card, indicating how many items are inside (e.g. 5 items).
- **Lasso to Stack:** Hold `Shift + Drag` to draw a lasso around any scattered group of notes. On release, they spring-morph into a neat, organized pile.
- **Fan-Out Peek (The Deck Interaction):**
  - Hovering or clicking a pile spreads the cards out horizontally or in an arc (like fanning out a hand of cards).
  - You can read snippets, drag an individual card out, or reorder the stack.

---

## 4. How the AI Agent Operates on the Board

Instead of a generic chatbot sidebar, the AI agent becomes a **living physical actor** in your workspace:

### 4.1 The Stamp & Ribbon Metaphor
1. **Agent Task Pickup (Requirement #2):**
   - When the agent claims a task, an animated **Periwinkle Ribbon** wraps across the top of the card with the text: `🤖 AGENT PICKED UP`.
   - An immediate notification toast & Telegram ping fires: `🤖 Agent picked up: [Task Title]`.
2. **Autonomous Tier 1 Completion:**
   - The agent slides a new **Periwinkle index card** (the drafted reply or research summary) directly underneath the task card, clipping them together with a brass paperclip.
3. **High-Stakes Tier 2 Approval:**
   - The agent stamps the note with a vibrant Papaya ink stamp: `⚠️ PENDING APPROVAL`.
   - The pushpin turns bright red and pulses softly.
   - Clicking the note expands an interactive decision card right on the board with `[ ✅ Approve & Send ]` and `[ ❌ Reject ]`.
   - When approved, a crisp green `APPROVED` stamp hits the card!

---

## 5. Navigation & Spatial Controls

- **Pan & Zoom (ZUI):**
  - **Pan:** Click & drag the canvas background, or hold `Space + Drag`, or 2-finger trackpad scroll.
  - **Zoom:** Pinch trackpad or `Cmd + Scroll` (zooms from 40% bird's-eye macro overview to 150% close-up reading mode).
- **Minimap HUD:** A floating, tactile postage-stamp-sized minimap in the corner showing current camera viewport and hot clusters of notes.
- **Focus Mode ("Zoom to Card"):** Double-clicking any email card or note smoothly zooms the camera into full-screen reading mode, dimming the surrounding board.

---

## 6. Implementation Architecture for Flow Lab

### Technical Stack
- **Viewport Canvas:** CSS transform matrix (`scale`, `translateX`, `translateY`) driven by Framer Motion or lightweight spring math.
- **Physics Engine:** Framer Motion drag physics (`drag`, `dragConstraints`, `dragElastic`, `dragTransition`) for high-performance 60fps gesture handling with inertia.
- **State Management:** Local-first IndexedDB / LocalStorage syncing coordinates `(x, y, rotation, isPinned, pileId)` for every item on the board.
- **Visitor Safety:** Includes pre-arranged seed layout for first-time visitors with demo mode.
