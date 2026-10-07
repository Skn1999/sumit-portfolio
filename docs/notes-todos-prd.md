# PRD: Flow — Omnichannel Capture & Execution Workspace

**Project Name:** Flow  
**Target Workspace:** `apps/labs/flow` (`@labs/flow`)  
**Status:** Approved & Ready for Scaffolding  
**Owner:** Sumit (Product Designer & Engineer)  
**Last Updated:** October 2026  

---

## 1. Executive Summary & Vision

### 1.1 The Vision
**Flow** is a zen, minimalist, **AI-Native Personal Action & Capture Command Center** that bridges incoming communication streams directly with personal and autonomous execution.

Inboxes are de facto task managers, but they make terrible execution tools. When action items land in Gmail, Telegram, or Signal, they sit as unread badges or stars, creating cognitive friction, anxiety, and fragmented context. 

Flow solves this by decoupling **Ingestion**, **Triage**, and **Execution**—for both humans and AI agents:
1. **Ingest:** Streams incoming items from communication channels via a background sync proxy.
2. **Triage:** Enables sub-second human keyboard triage (`[T]` Turn to Todo, `[N]` Save to Note, `[E]` Archive locally, `[S]` Snooze).
3. **Agent Readability & Autonomous Execution:** Flow exposes a native **Model Context Protocol (MCP)** interface and Agent API. An AI agent (Antigravity, Claude, or local daemon) connects to Flow, scans pending items, executes tasks within its capability boundaries autonomously, and flags high-stakes decisions for human approval via real-time notifications.
4. **Execute:** Organizes action items in a distraction-free, local-first workspace with bidirectional deep links back to the original threads.

```
+-----------------------------------------------------------------------------------------+
|                                     FLOW PIPELINE                                       |
|                                                                                         |
|   [Gmail (Read-Only)]                                                                   |
|   [Telegram (V2)]        ---> [Serverless Sync Proxy] ---> [Local Cache / IndexedDB]    |
|   [Signal (V3)]                                                      │                  |
|                                                                      │                  |
|                                      ┌───────────────────────────────┴───────────────┐  |
|                                      │                                               │  |
|                                      ▼                                               ▼  |
|                        HUMAN TRIAGE & EXECUTION                        AI AGENT LOOP    |
|                        • Sub-100ms Keyboard [T][N][E]         (MCP Server / Agent API)  |
|                        • Markdown Scratchpad & Notes          • Understand pending work |
|                        • Today / Priority Todos               • Autonomous task worker  |
|                        • Bidirectional Gmail Links            • Request approvals       |
|                                      │                                       │          |
|                                      └───────────────────────┬───────────────┘          |
|                                                              ▼                          |
|                                                NOTIFICATION & APPROVAL GATEWAY          |
|                                                • Telegram Bot Instant Alert             |
|                                                • 1-Click Interactive [Approve]/[Reject] |
|                                                • Live Agent Audit & Activity Feed       |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Jobs-to-be-Done (JTBD) & Problem Statements

### 2.1 Core Problems
1. **The Unread-Badge Trap:** Emails requiring follow-up remain unread or starred, creating mental clutter with no schedule or priority order.
2. **Context Severance:** Moving a task to Apple Notes or Todoist loses the email thread, sender history, and one-click ability to jump back and reply.
3. **Multi-Channel Sprawl:** Tasks are scattered across Gmail, Telegram channels/chats, Signal, and sudden thoughts. Checking four disparate apps drains focus.
4. **AI Isolation (The Execution Gap):** Current task managers are black boxes for AI agents. Agents cannot see what is blocked, cannot work down a backlog autonomously, and lack safe, structured guardrails to request approval before taking irreversible actions.

### 2.2 Core Jobs-to-be-Done
- **JTBD 1 (Email to Action):**  
  *When* an email arrives requiring action,  
  *I want to* transform it into a prioritized todo with one keystroke while keeping a link to the original thread,  
  *So that* my inbox stays clean and I never drop a commitment.
- **JTBD 2 (Frictionless Note Capture):**  
  *When* I extract key insights, meeting notes, or specs from incoming communications,  
  *I want to* capture them into a clean markdown scratchpad linked to the thread,  
  *So that* I build up a compounding personal knowledge base.
- **JTBD 3 (Autonomous Agent Delegation):**  
  *When* tasks or incoming emails enter Flow,  
  *I want* my AI agent to inspect pending work, handle what it can autonomously (summarizing, drafting replies, doing research), and alert me for approval on high-stakes actions,  
  *So that* my backlog moves forward even when I'm away from my desk.
- **JTBD 4 (1-Click Decision Dispatch):**  
  *When* the agent completes a preparatory action requiring my sign-off,  
  *I want* a ping on Telegram with context and 1-click Approve/Reject buttons,  
  *So that* I can unblock the agent in under 5 seconds from my phone.

---

## 3. Product & Design Principles

1. **Sub-100ms Speed & Keyboard Navigation:**  
   Every single interaction is keyboard-operable (`j/k` list traversal, `e` archive locally, `t` convert to todo, `n` convert to note, `Cmd+K` command palette).
2. **Read-Only Non-Destructive Ingestion:**  
   Flow respects user data sovereignty. It uses `gmail.readonly`—it never deletes or alters emails on Google's servers. Archiving and triage statuses are managed within Flow's local state.
3. **First-Class AI Agent Interoperability (MCP Native):**  
   Every entity (Thread, Todo, Note, Approval) is exposed via standard schemas and MCP tools. AI agents are treated as first-class collaborators with explicit roles, permissions, and audit logs.
4. **Human-in-the-Loop (HITL) Guardrails:**  
   Clear separation between autonomous actions (safe, non-destructive, drafting, research) and high-stakes actions (sending, deleting, committing funds) which strictly require user approval.
5. **Local-First with Background Sync:**  
   UI interactions write directly to IndexedDB for instant UI responsiveness. A lightweight serverless proxy syncs with Gmail in the background so updates are waiting when you open the app.
6. **Craft & Tactile Scrapbook Aesthetic:**  
   Built on the "Craft Docs Digital Scrapbook" visual system detailed in [`research/flow-design.md`](file:///Users/SumitKumar/Desktop/consulting/portfolio/research/flow-design.md). Uses a warm, tactile Canvas background (`#fff3e7`), refined typographic pairing (literary serif headlines like `Lora` / `Merriweather` paired with functional sans-serif body `Inter` / `Figtree`), soft pastel brand blocks (`Mint`, `Marigold`, `Periwinkle`), floating multi-layered shadows, and 14px/24px rounded corners with pill buttons.
7. **Visitor Safe & Self-Hostable:**  
   Public portfolio visitors get a rich interactive playground with realistic mock data, while Sumit connects his authenticated Google account.

---

## 4. Phase 1 (MVP) Functional Specifications

### 4.1 Module A: The Core Action Workspace (Todos & Notes)

#### Todos Engine
- **Item Schema (Extended for Agent Collaboration):**
  - `id`: UUID
  - `title`: String (inline markdown support)
  - `description`: String (markdown notes & context)
  - `status`: `'inbox' | 'today' | 'upcoming' | 'completed' | 'archived'`
  - `priority`: `1 (Urgent)` | `2 (High)` | `3 (Normal)` | `4 (Low)`
  - `dueDate`: ISO Date String or null
  - `tags`: Array of strings
  - `source`: Reference object (`{ provider: 'gmail', threadId, subject, sender, permalink, snippet }`)
  - **Agent Fields:**
    - `assignedTo`: `'user' | 'agent' | 'collaborative'`
    - `agentStatus`: `'idle' | 'queued' | 'in_progress' | 'completed' | 'awaiting_approval' | 'failed'`
    - `agentNotes`: String (agent's reasoning, chain-of-thought, or execution summary)
    - `agentArtifacts`: Array of generated artifacts (draft replies, research summaries, code snippets)
    - `approvalId`: Optional foreign key to active Approval Request
  - `createdAt`, `updatedAt`, `completedAt`
- **Views:**
  - **Today:** Tasks scheduled for today or overdue.
  - **Upcoming:** Tasks grouped by date.
  - **Inbox / Triage:** Newly captured items pending scheduling.
  - **Agent Queue:** Tasks actively assigned to or completed by the AI agent.
  - **Approvals Pending:** Items requiring human review before completion.
  - **Done / Logbook:** Historical record of completed tasks.
- **Interactions:**
  - Quick-add bar (`Enter` to save, `!1` for priority, `@today` for dates, `@agent` to assign to AI).
  - Drag-and-drop or `Alt+Up/Down` reordering.
  - Quick completion toggle (`Space` or checkbox).

#### Notes & Scratchpad Engine
- **Item Schema:**
  - `id`: UUID
  - `title`: String
  - `content`: Markdown text
  - `tags`: Array of strings
  - `isPinned`: Boolean
  - `linkedSources`: Array of source references
  - `aiSummary`: Optional cached AI summary
  - `createdAt`, `updatedAt`
- **Editor Features:**
  - Distraction-free markdown editor (headings, code blocks, task lists, links).
  - Full-text instant search across titles and body.
  - 1-click "Create Todo from Note selection".
  - 1-click "Ask Agent to Expand / Structure".

---

### 4.2 Module B: Gmail Ingestion Engine (Read-Only)

#### Authentication & Scopes
- **Google OAuth 2.0:** Handled via lightweight backend proxy (securing client secrets & managing token refresh).
- **Scope:** `https://www.googleapis.com/auth/gmail.readonly` (read-only, non-destructive).
- **State Management:** Encrypted token storage on server session + local client synchronization.

#### Inbox Feed & Thread Viewer
- **Feed Features:**
  - **Initial Connect Window:** On first-time account connection, fetches threads from the **last 2 days** to establish an immediate, relevant triage queue without backlog noise.
  - **Incremental Sync:** Subsequent background polls fetch threads from the **last 1 day** (or delta since `lastSyncTimestamp`).
  - Batch size: 25–50 threads per page.
  - List displays: Sender, Subject, snippet preview, timestamp, thread message count.
- **Thread Viewer:**
  - Clean sanitized HTML/Markdown view of messages in the thread.
  - Header with sender details and a prominent **"Open in Gmail ↗"** deep-link button (`https://mail.google.com/mail/u/0/#inbox/<threadId>`).

#### Triage Actions
1. **`[T] Turn to Todo`:** Auto-creates Todo linked to email thread.
2. **`[N] Save to Note`:** Creates Note populated with email body/highlights.
3. **`[E] Archive / Mark Triaged`:** Local non-destructive archive.
4. **`[S] Snooze`:** Temporarily hides the thread until chosen date/time.
5. **`[A] Delegate to Agent`:** Directs the agent to read thread, synthesize deliverables, and draft necessary follow-ups.

---

### 4.3 Module C: AI Agent Readability & MCP Server Layer

Flow provides a built-in **Model Context Protocol (MCP)** server and REST Agent API:

#### 1. Agent Discovery & State Inspection
The AI agent can query Flow via MCP tools to understand pending work:
- `flow_get_pending_tasks(filter)`: Returns uncompleted tasks, priority, due dates, and context.
- `flow_get_inbox_stream(unreadOnly)`: Returns raw incoming Gmail/Telegram threads pending triage.
- `flow_get_item_details(id)`: Returns full thread/task context, history, and linked notes.
- `flow_search_notes(query)`: Retrieves relevant notes or user reference docs.

#### 2. Autonomous Action Boundaries (Tiers)
- **Tier 1 (Autonomous Execution — No human block):**
  - Drafting responses or email replies (saved to `agentArtifacts`).
  - Summarizing long email threads into bullet-point notes.
  - Extracting dates and action items into sub-todos.
  - Conducting background research and appending findings to a linked note.
- **Tier 2 (High-Stakes / Irreversible — Human Approval Gate):**
  - Sending an email or message.
  - Deleting or archiving high-priority tasks.
  - Making calendar commitments or external API calls.
  - Committing financial transactions or code releases.

#### 3. Agent Task Lifecycle & Notifications
```
[Pending Task] ──> Agent Picks Up ──> [In Progress]  ---> 🔔 Notification: "Agent picked up [Task]"
                                            │
               ┌────────────────────────────┴───────────────────────────┐
               ▼                                                        ▼
     [Autonomous Tier 1]                                      [High-Stakes Tier 2]
     Agent completes work                                     Agent generates draft &
     Attaches artifact/note                                   sets status: 'awaiting_approval'
     status: 'completed'                                      triggers Notification Gateway 🔔
     🔔 Notification: "Task completed"                                  │
                                               ┌─────────────────────────┴─────────────┐
                                               ▼                                       ▼
                                        User [Approve]                          User [Reject]
                                        Agent finalizes action                  Task reverted/edited
```

---

### 4.4 Module D: Notification & Approval Gateway

The gateway handles two categories of automated user notifications:
1. **Task Lifecycle Alerts (Informational):**
   - **Task Pickup Alert:** The moment an agent claims an item (transitions to `in_progress`), a real-time notification is dispatched: *"🤖 Agent picked up: [Task Title]"*.
   - **Task Completion Alert:** Sent when a Tier 1 autonomous job finishes with artifacts/notes attached.
2. **Action Approval Requests (Gated / Decision Required):**
   - Dispatched when high-stakes operations require human authorization.

#### Approval Request Schema
- `id`: UUID
- `taskId`: UUID
- `actionType`: `'send_email' | 'delete_item' | 'schedule_event' | 'external_call'`
- `summary`: Short human-readable explanation (e.g., *"Reply to Sarah regarding Design Tokens delivery date"*)
- `previewPayload`: Object (e.g. `{ to: 'sarah@design.co', subject: 'Re: Tokens', bodyDraft: '...' }`)
- `status`: `'pending' | 'approved' | 'rejected'`
- `createdAt`, `respondedAt`

#### Dispatch Channels
1. **Telegram Bot Dispatcher (`@FlowAlertBot`):**
   - Instant push notification to Sumit's phone.
   - Rich message layout with context preview.
   - Inline interactive buttons:
     - `[ ✅ Approve ]` — Triggers execution immediately.
     - `[ ❌ Reject ]` — Rejects the action and prompts for brief feedback.
     - `[ 📝 View in Flow ]` — Deep-links straight to the task in the Flow web app.
2. **In-App Flow Notification Drawer:**
   - Dedicated "Approvals Pending" header badge and tab in the 3-pane layout.
   - Diff viewer showing what the agent intends to do before you click confirm.

---

### 4.5 Module E: UI Layout & Information Architecture

A 3-column desktop layout with integrated Agent status indicators:

```
+-----------------------------------------------------------------------------------------------+
|  FLOW  │  [Cmd+K Command Bar]      [Search]        │  🤖 Agent: Active  │  ● Gmail Synced   |
+-------------------+------------------------------------+--------------------------------------+
| SIDEBAR           | STREAM / LIST VIEW                 | ACTIVE WORKSPACE                     |
|                   |                                    |                                      |
| 📥 INBOXES        | ✉️ Sarah Connor — Design Tokens    | ✉️ Thread: Design Tokens             |
| • Gmail (4 unread)|    "Uploaded the tokens for v2..." | From: Sarah Connor                   |
| • Telegram (V2)   |    [🤖 Draft Prepared]             | Date: Oct 4, 2026                    |
| • Signal (V3)     |                                    | ------------------------------------ |
|                   | ✉️ Linus Torvalds — Kernel Patch   | [T] Todo   [N] Note   [E] Triaged    |
| 📋 ACTIONS        |    "Take a look at this commit..." | ------------------------------------ |
| • Today (2)       |                                    | 🤖 AGENT PROPOSED ACTION (Needs Approval)
| • Upcoming (5)    | ✉️ Stripe — Monthly Statement      | Action: Send Reply to Sarah          |
| • Approvals (1) ⚠️|    "Your receipt for..."           | Draft: "Thanks Sarah, reviewing now."|
|                   |                                    | [ ✅ Approve & Send ]  [ ✏️ Edit ]   |
| 📝 NOTES          |                                    | ------------------------------------ |
| • Scratchpad      |                                    | Thread message body...               |
+-------------------+------------------------------------+--------------------------------------+
```

---

## 5. Technical Architecture & Protocols

### 5.1 Monorepo Placement
- **Frontend App:** `apps/labs/flow` (Vite + React + Tailwind + `@portfolio/ui`).
- **Portfolio Route:** `/labs/flow`.
- **Backend Sync & Agent Gateway:** `apps/portfolio/api/flow/*` (or standalone serverless microservice):
  - `/api/flow/auth/google/*` — OAuth PKCE & token refresh.
  - `/api/flow/gmail/*` — Read-only thread proxy.
  - `/api/flow/mcp` — Standardized Model Context Protocol SSE/stdio endpoint.
  - `/api/flow/agent/pending` — JSON endpoint for external agents.
  - `/api/flow/agent/action` — Endpoint for agents to post completed work or request approval.
  - `/api/flow/approvals/:id/respond` — Webhook endpoint for Telegram bot callback queries.

### 5.2 Client Data & State (IndexedDB via Dexie)
- `todos`: Tasks with agent fields, status, and deadlines.
- `notes`: Markdown scratchpad with AI summaries.
- `threadsCache`: Cached Gmail threads.
- `approvals`: Pending and resolved human-in-the-loop approvals.
- `agentAuditLog`: Immutable event log of all agent reads and actions.

### 5.3 UI Component Architecture & Motion (Arc UI)
- **Component Base:** Built on **Arc UI (`uiarc.dev`)** motion primitives (Breadcrumb, Action Button, Split Button, Dropdown Menu, Segmented Control, Tag Input, Confirm Morph, Chip Group).
- **Theming:** Custom-themed using the Craft Docs design system (`docs/flow-design.md`) with warm Canvas `#fff3e7`, Ink `#030302`, brand pastels, and layered shadows.
- **Agent Guardrails:** AI agents generating or modifying UI components must strictly adhere to [`docs/flow-agent-guardrails.md`](file:///Users/SumitKumar/Desktop/consulting/portfolio/docs/flow-agent-guardrails.md).

---

## 6. Multi-Channel Roadmap (V2 & V3)

### 6.1 Iteration 2: Telegram Channels & Direct Bot Ingestion
- Dual-purpose bot:
  1. Ingestion: Forward messages/voice notes to `@FlowCaptureBot` to enter triage queue.
  2. Approvals: Receives notification alerts with interactive `[Approve]` buttons.

### 6.2 Iteration 3: Signal Integration
- Local `signal-cli` gateway syncing with "Note to Self" with end-to-end encryption.

### 6.3 Iteration 4: Multi-Agent Specialization
- Autonomous research sub-agent + autonomous email drafting sub-agent working concurrently on pending tasks.

---

## 7. Success Metrics & Verification Criteria

1. **Sub-100ms Human Triage:** Zero lag when keyboard-navigating and triaging tasks.
2. **Machine-Readability:** 100% of tasks, notes, and pending emails accessible to AI agents via MCP tools in < 200ms.
3. **Approval Turnaround:** High-stakes actions cleanly held in suspense until approved via Telegram or UI.
4. **Safety & Non-Destructiveness:** Zero unauthorized external mutations; all write actions strictly audited.
5. **Visitor Experience:** Smooth fallback to simulated demo mode with interactive agent preview for portfolio visitors.
