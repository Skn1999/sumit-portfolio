#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import prompts from "prompts";
import chalk from "chalk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TASKS_DIR = path.join(__dirname, "..", "tasks");

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/^task[\s_\-]*/i, "") // Remove leading "task" if provided
    .replace(/\s+/g, "_") // Replace spaces with _
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

async function createTaskTemplate() {
  console.log(chalk.bold.cyan("\n📋 Portfolio Agent Task Generator\n"));

  // Check if task name was passed via CLI args
  const cliTaskName = process.argv.slice(2).join(" ");

  const response = await prompts([
    {
      type: cliTaskName ? null : "text",
      name: "taskName",
      message: "Task name / title:",
      initial: cliTaskName,
      validate: (value) => value.length > 0 || "Task name is required",
    },
    {
      type: "select",
      name: "taskType",
      message: "Task category / type:",
      choices: [
        { title: "Feature — New feature or component", value: "feat" },
        { title: "Refactor — Code or UI refactoring", value: "refactor" },
        { title: "Bug Fix — Fix existing issue", value: "fix" },
        { title: "Design / UX — Design system or styling update", value: "design" },
        { title: "Content — Copy or MDX content update", value: "content" },
      ],
      initial: 0,
    },
    {
      type: "text",
      name: "targetFiles",
      message: "Primary target files (optional, e.g. src/components/Header.tsx):",
    },
    {
      type: "text",
      name: "objective",
      message: "Brief objective / goal (optional):",
    },
  ]);

  const rawName = cliTaskName || response.taskName;
  if (!rawName) {
    console.log(chalk.yellow("Task creation cancelled"));
    return;
  }

  const slug = slugify(rawName);
  const taskFileName = `task_${slug}.md`;
  const taskFilePath = path.join(TASKS_DIR, taskFileName);
  const displayTitle = rawName.replace(/^task[\s_\-]*/i, "").trim();

  // Ensure tasks directory exists
  await fs.mkdir(TASKS_DIR, { recursive: true });

  // Generate complete task file contents
  const taskContent = `# Task: ${displayTitle}

## 1. Overview & Context
- **Task ID:** \`task_${slug}\`
- **Category:** \`${response.taskType || "feat"}\`
- **Objective:** ${response.objective || "[Describe the main goal of this task]"}
- **Target Files:** ${response.targetFiles ? `\`${response.targetFiles}\`` : "[Primary component or file paths]"}

---

## 2. Detailed Requirements & User Inputs

> **[USER INPUT NEEDED]**: Fill in any specific parameters, links, text, or details below before invoking \`.agent/task-runner-agent.md\`.

### Key Specifications:
- [ ] **Requirement 1:** [Detail feature/UI behavior]
- [ ] **Requirement 2:** [Detail styling, layout, or data rules]
- [ ] **Design System:** Maintain consistency with Japanese Slate Paper tokens (\`bg-paper-bg\`, \`text-ink-primary\`, \`font-mono\`, \`font-display\`).

### User Details / Assets (Fill in if applicable):
- **Item / URL / Data:** \`[Provide details here]\`
- **Content / Copy:** \`[Provide copy text here]\`

---

## 3. Scope & Files Involved

### Primary Files:
- ${response.targetFiles ? `\`${response.targetFiles}\`` : "`src/components/[Component].tsx`"}
- \`tasks/TODOS.md\` (Task log)

### Agent Memory Files:
- \`.agent/progress.md\` (Updated after completion)
- \`.agent/learnings.md\` (Updated after completion)

### Out of Scope:
- Do not modify unrelated components or breaking existing routing.
- Do not change dark/light mode token architecture unless specified.

---

## 4. Acceptance Criteria

- [ ] Core functionality and visual layout implemented as specified.
- [ ] Responsive design verified on mobile (~375px), tablet (~768px), and desktop (~1280px+).
- [ ] No regression in accessibility or performance.
- [ ] Project compiles cleanly with zero TypeScript or Vite build errors.

---

## 5. Verification Commands

Run the build test to verify type safety and MDX/component compilation:

\`\`\`bash
npm run build
\`\`\`

---

## 6. Execution Instructions for Task Runner Agent

When ready to implement this task, invoke the agent with:

\`\`\`text
Run .agent/task-runner-agent.md on tasks/${taskFileName}
\`\`\`
`;

  try {
    await fs.writeFile(taskFilePath, taskContent, "utf8");

    console.log(chalk.bold.green("\n✓ Task template file created successfully!\n"));
    console.log(chalk.blue("Task file path:"));
    console.log(chalk.bold(taskFilePath));
    console.log(chalk.blue("\nNext steps:"));
    console.log(`1. Open ${chalk.bold(`tasks/${taskFileName}`)} and fill in any specific requirements/inputs`);
    console.log(`2. Run: ${chalk.cyan(`Run .agent/task-runner-agent.md on tasks/${taskFileName}`)}\n`);
  } catch (error) {
    console.error(chalk.red("Error creating task file:"), error);
    process.exit(1);
  }
}

createTaskTemplate().catch(console.error);
