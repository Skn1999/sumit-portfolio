# Task Runner Agent

Use this agent when the user provides a task file from `tasks/` and asks for that task to be implemented.

## Invocation Pattern

The user should invoke this agent with a task file path, for example:

```text
Run .agent/task-runner-agent.md on tasks/task_001_refactor_project_header.md
```

If no task file is provided, ask for the specific task file path before changing code.

## Mission

Implement tasks from the provided task file in `tasks/`, verify them, and update agent memory files (`.agent/progress.md` and `.agent/learnings.md`).

### Agent Selection & Delegation Logic

The **Task Runner Agent** is the primary entry point for all task execution. Upon receiving a task file:

1. **Evaluate Task Type**:
   - **Case Study Rewrite / Upgrade Tasks**: If the task involves restructuring portfolio case studies, applying the Recruiter Benchmark Framework, or resides in `tasks/case-studies/`:
     - **Delegate / Invoke**: Internally invoke `.agent/case-study-rewriter-agent.md`.
     - **Context Required**: Load `.agent/benchmark-framework.md` and `.agent/ui-building-instructions.md` alongside standard context.
   - **General Tasks** (Features, Refactoring, Bug Fixes, Design/UX, Content):
     - **Execute Directly**: Follow standard Task Runner workflow.

## Required Context Files

Before implementing, read these files:

- The provided task file from `tasks/`
- `.agent/architecture.md`
- `.agent/tech-stack.md`
- `.agent/progress.md`
- `.agent/learnings.md`
- **If delegating to Case Study Rewriter**: `.agent/case-study-rewriter-agent.md`, `.agent/benchmark-framework.md`, `.agent/ui-building-instructions.md`

Use `architecture.md` to understand how the app is wired, `tech-stack.md` to choose commands and packages, `progress.md` to avoid duplicating completed work, and `learnings.md` to avoid repeating prior mistakes.

## Workflow

1. Read the task file completely.
2. Read the required context files.
3. Before modifying any files, check the current git status.
4. If the working tree is not clean, ask the user what to do before you proceed with the task and wait for the prompt from user.
5. If working tree is clean, ALWAYS switch to the `staging` branch first (`git checkout staging && git pull origin staging`). NEVER create feature branches directly from `main` or make changes on `main`. Then create a new task branch off `staging` with name convention as `<impr/feature/bug-fix>-<current-task-name>`.
6. Inspect the relevant source files mentioned or implied by the task.
7. Restate the implementation target internally as:
   - what behavior/UI/content must change
   - what files are likely involved
   - what is explicitly out of scope
8. Implement the task with small, focused edits.
9. Run the tests listed in the task file whenever feasible. For small fixes, skip running the tests in local environment to save tokens.
10. If a listed test cannot be run, record why in the final response and in `.agent/progress.md`.
11. Manually inspect or reason through each acceptance criterion.
12. Update `.agent/progress.md`.
13. Update `.agent/learnings.md`.
14. Do a sensible git commit of all the files changed in this specific task and adding a brief commit message about what changes were about and which files were changed.
15. Reply with a concise completion summary, changed files, tests run, and any remaining risk.

## Implementation Rules

- Do not implement work from other task files unless it is required to complete the current task.
- Do not skip reading `.agent/learnings.md`, even if it is short.
- Do not overwrite unrelated user edits.
- Do not use destructive git commands.
- Use `rg` for searching.
- Use `apply_patch` for manual code edits.
- Prefer existing project patterns over new abstractions.
- Keep changes scoped to the task acceptance criteria.
- Preserve MDX routing, frontmatter loading, image path behavior, and Vite base-path behavior.
- For visual work, maintain responsive behavior and inspect mobile/desktop implications.
- If the task changes project MDX headings, preserve real `h2`/`h3` elements when they should remain in the table of contents.

## Progress Update Requirements

After completing the task, append a new dated entry to `.agent/progress.md` with:

- Task file path
- Status: `Completed`, `Partially Completed`, or `Blocked`
- Summary of what changed
- Files changed
- Tests run and results
- Acceptance criteria status
- Follow-ups or known risks

If the task is blocked, include the blocker and the next action needed.

## Learnings Update Requirements

After completing or attempting the task, append a new dated entry to `.agent/learnings.md` with:

- Task file path
- Lessons learned about this codebase
- Errors or surprises encountered
- How each issue was resolved
- A future instruction to avoid repeating the issue

Keep learnings concrete. Do not add generic advice.

## Final Response Format

Use this structure:

```text
Completed <task filename>.

Changed:
- <file>: <short description>

Verified:
- <command or manual check>: <result>

Notes:
- <only include if needed>
```

If blocked, start with:

```text
Blocked on <task filename>.
```

Then explain the blocker and the safest next step.
