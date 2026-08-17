# Task: Add Product Hunt Launch Badge to Portfolio

## 1. Overview & Context

- **Task ID:** `task_add_product_hunt_badge`
- **Objective:** Add a Product Hunt launch badge for a recently launched AI Skill into the portfolio website.
- **Target Section:** `src/components/AchievementsSection.tsx` (Achievements / Credentials section) and `AI and Data` section under `Data Engineering` main route.

---

## 2. Product Hunt Details (User to Fill In)

- **Product / Skill Name:** `Preflight`
- **Product Hunt Launch Page URL:** `[[e.g., https://www.producthunt.com/posts/your-product-slug]](https://www.producthunt.com/products/preflight-7)`
- **Badge Image / Embed HTML Code:**
  ```html
  <div
    style='font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; border: 1px solid rgb(224, 224, 224); border-radius: 12px; padding: 20px; max-width: 500px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 8px;'
  >
    <div
      style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"
    >
      <img
        alt="Preflight"
        src="https://ph-files.imgix.net/c3939219-d8d7-47e7-9c60-82fe71644598.jpeg?auto=compress,format&amp;codec=mozjpeg&amp;cs=strip&amp;fit=crop&amp;h=80&amp;w=80"
        style="width: 64px; height: 64px; border-radius: 8px; object-fit: cover; flex-shrink: 0;"
      />
      <div style="flex: 1 1 0%; min-width: 0px;">
        <h3
          style="margin: 0px; font-size: 18px; font-weight: 600; color: rgb(26, 26, 26); line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
        >
          Preflight
        </h3>
        <p
          style="margin: 4px 0px 0px; font-size: 14px; color: rgb(102, 102, 102); line-height: 1.4; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
        >
          A preflight checklist for product decisions.
        </p>
      </div>
    </div>
    <a
      href="https://www.producthunt.com/products/preflight-7?embed=true&amp;utm_source=embed&amp;utm_medium=post_embed"
      target="_blank"
      rel="noopener"
      style="display: inline-flex; align-items: center; gap: 4px; margin-top: 12px; padding: 8px 16px; background: rgb(255, 97, 84); color: rgb(255, 255, 255); text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;"
      >Check it out on Product Hunt →</a
    >
  </div>
  ```
- **Tagline / Achievement Text (Optional):** `A preflight checklist for product decisions.`
- **Description**: `Preflight is an AI skill that helps product teams make better decisions before investing engineering time. Instead of jumping from problem → solution, Preflight helps teams validate whether they are solving the right problem, evaluate evidence behind decisions, compare solutions and understand risks before rollout. Built as a reusable AI skill for Claude Code and OpenAI Codex. Preflight does not replace product judgement. It helps teams ask better questions and make more informed decisions.`
- **Launch Date (Optional):** `[e.g., August 2026]`

---

## 3. Scope & Requirements

1. Create a separate reusable component that is easily embeddable on different sections on different pages.

2. **Component Placement:**
   - Integrate the Product Hunt badge cleanly into `Home (Main Route)` under `Achievements Section` and in `src/pages/DataEngineeringPage.tsx`.
3. **Guidelines for placement**
   - On `Home page`
     - Place it in a dedicated section after `Achievements` section and before `Contact` section.
   - On `Data Engineering` route
     - Place it in `AI Project Section` right before the projects list.

4. **Design & Styling Guidelines:**
   - Badge should render cleanly on desktop, tablet, and mobile devices without breaking alignment or causing horizontal scroll overflow.
   - Ensure the layout matches the existing Japanese Wabi-Sabi slate paper design system (`bg-paper-bg`, `text-ink-primary`, `font-mono` section labels).
   - Make sure the component has a responsive container css query set so that it can adpat to different page sizes.
   - Use proper link attributes (`target="_blank"`, `rel="noopener noreferrer"`).
   - Maintain dark/light mode compatibility (use neutral dark/light theme variant of Product Hunt widget or custom container styling).

5. **Files Involved:**
   - `src/pages/Index.tsx` (Primary)
   - `src/pages/DataEngineeringPage.tsx` (Primary)
   - `tasks/TODOS.md` (Update task log)
   - `.agent/progress.md` (Task runner log)
   - `.agent/learnings.md` (Task runner log)

6. **Out of Scope:**
   - Do not redesign the rest of `AchievementsSection.tsx` or alter existing experience/skills layout.
   - Do not add third-party analytics tracking scripts for Product Hunt.

---

## 4. Acceptance Criteria

- [ ] Product Hunt badge is rendered in `src/components/AchievementsSection.tsx`.
- [ ] Clicking the badge opens the Product Hunt launch page in a new tab securely.
- [ ] The section aligns with the existing Slate Paper design system and typography (`font-display`, `font-mono`, `font-body-narrative`).
- [ ] Layout is fully responsive across mobile (~375px), tablet (~768px), and desktop (~1280px+).
- [ ] Project builds cleanly via `npm run build` with zero TypeScript or JSX compilation errors.

---

## 5. Verification Commands

Run the following commands to verify implementation:

```bash
# Type check and build test
npm run build
```

---

## 6. Execution Instructions for Task Runner Agent

When ready, invoke the task runner agent with:

```text
Run .agent/task-runner-agent.md on tasks/task_add_product_hunt_badge.md
```
