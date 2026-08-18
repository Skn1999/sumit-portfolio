import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Helper: Recursively build directory tree representation
function buildFileTree(dirPath, depth = 0, maxDepth = 3) {
  if (depth > maxDepth || !fs.existsSync(dirPath)) return '';
  let tree = '';
  const indent = '  '.repeat(depth);
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    if (item === 'node_modules' || item === 'dist' || item === '.git' || item === '.DS_Store') continue;
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      tree += `${indent}📁 ${item}/\n`;
      tree += buildFileTree(fullPath, depth + 1, maxDepth);
    } else {
      tree += `${indent}📄 ${item}\n`;
    }
  }
  return tree;
}

// Helper: Collect pre-packed codebase context (Option C)
function packCodebaseContext(taskContent) {
  let context = '=== REPOSITORY STRUCTURE (src/) ===\n';
  context += buildFileTree('src') + '\n';

  context += '=== PRIMARY ENTRY FILES ===\n';
  const primaryFiles = ['package.json', 'src/App.tsx', 'src/index.css'];
  for (const f of primaryFiles) {
    if (fs.existsSync(f)) {
      context += `--- FILE: ${f} ---\n${fs.readFileSync(f, 'utf8')}\n\n`;
    }
  }

  // Extract target files referenced in task content
  context += '=== TASK-REFERENCED TARGET FILES ===\n';
  const fileMatches = taskContent.match(/src\/[a-zA-Z0-9_\-\.\/]+/g) || [];
  const uniqueFiles = [...new Set(fileMatches)];
  for (const f of uniqueFiles) {
    if (fs.existsSync(f) && fs.statSync(f).isFile()) {
      context += `--- FILE: ${f} ---\n${fs.readFileSync(f, 'utf8')}\n\n`;
    }
  }

  return context;
}

// Generate dynamic TODO list & turn estimation using Gemini API
async function generateTaskList(taskContent, packedContext, apiKey) {
  console.log("📋 Generating task TODO list and estimating turn budget with Gemini API...");
  const prompt = `
You are an expert software architect. Analyze the task description and codebase context below.
Break down the task into a clear, step-by-step TODO list of implementation tasks (including file edits, new components, and build verification).

=== TASK SPECIFICATION ===
${taskContent}

=== CODEBASE SNAPSHOT ===
${packedContext}

Return ONLY a raw valid JSON object (with no code block formatting) matching this schema:
{
  "todo_list": [
    "1. Description of step 1",
    "2. Description of step 2"
  ],
  "estimated_turns": 6
}
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1 }
      })
    });

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.todo_list && Array.isArray(parsed.todo_list) && parsed.todo_list.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("⚠️ Could not parse TODO list JSON from Gemini API, using fallback estimation:", err.message);
  }

  return {
    todo_list: [
      "1. Inspect target files and imports",
      "2. Implement component and page modifications",
      "3. Execute npm run build verification"
    ],
    estimated_turns: 6
  };
}

// Local Tool Implementations
function executeTool(name, args) {
  console.log(`🛠️ Tool Call Invoked: ${name}`, args ? JSON.stringify(args) : '');

  try {
    if (name === 'read_file') {
      const p = args.filePath;
      if (!fs.existsSync(p)) return { error: `File not found: ${p}` };
      const content = fs.readFileSync(p, 'utf8');
      return { status: 'success', filePath: p, content };
    }

    if (name === 'write_file') {
      const p = args.filePath;
      const content = args.content;
      // Guardrails against critical system files
      if (p.startsWith('.git/') || p.startsWith('.github/workflows/')) {
        return { error: `Writing to ${p} is restricted by guardrails.` };
      }
      const dir = path.dirname(p);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(p, content, 'utf8');
      console.log(`✅ Updated file: ${p}`);
      return { status: 'success', filePath: p };
    }

    if (name === 'grep_search') {
      const query = args.query;
      const searchDirs = ['src', 'tasks'];
      const matches = [];

      function searchDir(dir) {
        if (!fs.existsSync(dir)) return;
        const items = fs.readdirSync(dir);
        for (const item of items) {
          if (item === 'node_modules' || item === 'dist' || item === '.git') continue;
          const full = path.join(dir, item);
          if (fs.statSync(full).isDirectory()) {
            searchDir(full);
          } else {
            const content = fs.readFileSync(full, 'utf8');
            if (content.includes(query)) {
              matches.push(full);
            }
          }
        }
      }

      searchDirs.forEach(searchDir);
      return { status: 'success', query, matchesCount: matches.length, matchingFiles: matches.slice(0, 20) };
    }

    if (name === 'list_dir') {
      const d = args.dirPath || '.';
      if (!fs.existsSync(d)) return { error: `Directory not found: ${d}` };
      const items = fs.readdirSync(d);
      return { status: 'success', dirPath: d, items };
    }

    if (name === 'run_build_verification') {
      console.log("🔨 Running agent build verification (`npm run build:agent`)...");
      try {
        const stdout = execSync('npm run build:agent', { encoding: 'utf8', stdio: 'pipe' });
        console.log("✅ Build verification succeeded!");
        return { success: true, buildOutput: stdout.slice(-2000) };
      } catch (err) {
        console.error("❌ Build verification failed.");
        const errorLog = (err.stdout || '') + '\n' + (err.stderr || '');
        return { success: false, errorLog: errorLog.slice(-4000) };
      }
    }

    return { error: `Unknown tool name: ${name}` };
  } catch (err) {
    return { error: `Tool execution failed: ${err.message}` };
  }
}

// Tool Declarations for Gemini API
const toolsDeclaration = [
  {
    functionDeclarations: [
      {
        name: "read_file",
        description: "Read file contents from disk at the specified path.",
        parameters: {
          type: "OBJECT",
          properties: {
            filePath: { type: "STRING", description: "Relative file path, e.g. src/components/Header.tsx" }
          },
          required: ["filePath"]
        }
      },
      {
        name: "write_file",
        description: "Write or update a file on disk with full content.",
        parameters: {
          type: "OBJECT",
          properties: {
            filePath: { type: "STRING", description: "Relative file path, e.g. src/components/Header.tsx" },
            content: { type: "STRING", description: "Complete file content to write" }
          },
          required: ["filePath", "content"]
        }
      },
      {
        name: "grep_search",
        description: "Search for a string or symbol across src/ and tasks/ files.",
        parameters: {
          type: "OBJECT",
          properties: {
            query: { type: "STRING", description: "Search query string" }
          },
          required: ["query"]
        }
      },
      {
        name: "list_dir",
        description: "List files and folders in a directory.",
        parameters: {
          type: "OBJECT",
          properties: {
            dirPath: { type: "STRING", description: "Relative directory path" }
          },
          required: ["dirPath"]
        }
      },
      {
        name: "run_build_verification",
        description: "Run npm run build to verify TypeScript and build health.",
        parameters: {
          type: "OBJECT",
          properties: {}
        }
      }
    ]
  }
];

async function run() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: GEMINI_API_KEY or ANTHROPIC_API_KEY environment variable is required.");
    process.exit(1);
  }

  const taskFilePath = process.argv[2];
  if (!taskFilePath || !fs.existsSync(taskFilePath)) {
    console.error(`❌ Error: Task file not found at path: ${taskFilePath}`);
    process.exit(1);
  }

  console.log(`📖 Task Runner Agent loading task file: ${taskFilePath}`);
  const taskContent = fs.readFileSync(taskFilePath, 'utf8');

  // Base agent specs and context
  const taskRunnerSpec = fs.existsSync('.agent/task-runner-agent.md') 
    ? fs.readFileSync('.agent/task-runner-agent.md', 'utf8') : '';
  const architecture = fs.existsSync('.agent/architecture.md') 
    ? fs.readFileSync('.agent/architecture.md', 'utf8') : '';
  const techStack = fs.existsSync('.agent/tech-stack.md') 
    ? fs.readFileSync('.agent/tech-stack.md', 'utf8') : '';
  const progress = fs.existsSync('.agent/progress.md') 
    ? fs.readFileSync('.agent/progress.md', 'utf8') : '';
  const learnings = fs.existsSync('.agent/learnings.md') 
    ? fs.readFileSync('.agent/learnings.md', 'utf8') : '';

  // Determine delegation to Case Study Rewriter
  const isCaseStudyTask = 
    taskFilePath.includes('case-study') || 
    taskFilePath.includes('case-studies') ||
    taskContent.toLowerCase().includes('case-study-rewriter-agent') ||
    taskContent.toLowerCase().includes('benchmark-framework') ||
    taskContent.toLowerCase().includes('case study rewrite');

  let additionalAgentContext = '';
  if (isCaseStudyTask) {
    console.log("🤖 Task Runner Agent Decision: Delegating to .agent/case-study-rewriter-agent.md");
    const rewriterSpec = fs.existsSync('.agent/case-study-rewriter-agent.md') ? fs.readFileSync('.agent/case-study-rewriter-agent.md', 'utf8') : '';
    const framework = fs.existsSync('.agent/benchmark-framework.md') ? fs.readFileSync('.agent/benchmark-framework.md', 'utf8') : '';
    const uiInstructions = fs.existsSync('.agent/ui-building-instructions.md') ? fs.readFileSync('.agent/ui-building-instructions.md', 'utf8') : '';
    additionalAgentContext = `
=== CASE STUDY REWRITER AGENT SPEC ===
${rewriterSpec}

=== BENCHMARK STORYTELLING FRAMEWORK ===
${framework}

=== PORTFOLIO UI & DESIGN LANGUAGE ===
${uiInstructions}
`;
  }

  // Pre-pack codebase context (Option C)
  console.log("📦 Packing codebase context snapshot...");
  const packedContext = packCodebaseContext(taskContent);

  // Generate dynamic TODO list & turn budget from Gemini API
  const todoData = await generateTaskList(taskContent, packedContext, apiKey);
  const todoList = todoData.todo_list;
  const estimatedTurns = todoData.estimated_turns || (todoList.length * 2);
  const maxTurns = Math.max(5, Math.min(30, estimatedTurns + 3));

  console.log(`\n📋 Task TODO List (${todoList.length} items):`);
  todoList.forEach(item => console.log(`   ${item}`));
  console.log(`⚙️ Dynamically allocated turn limit (maxTurns): ${maxTurns}\n`);

  const initialPrompt = `
You are the Task Runner Agent executing a task on the portfolio codebase.

=== TASK RUNNER SPEC ===
${taskRunnerSpec}

${additionalAgentContext}

=== ARCHITECTURE ===
${architecture}

=== TECH STACK ===
${techStack}

=== RECENT PROGRESS ===
${progress}

=== RECENT LEARNINGS ===
${learnings}

=== TASK SPECIFICATION ===
${taskContent}

=== PRE-PACKED CODEBASE CONTEXT SNAPSHOT ===
${packedContext}

=== TASK TODO LIST PLAN ===
The task has been broken down into the following TODO items:
${todoList.map(item => `- ${item}`).join('\n')}

=== HYBRID REACT WORKFLOW INSTRUCTIONS ===
1. Work through the TODO list sequentially using the tools.
2. Use \`write_file\` tool to update target files or create new components as required.
3. Use \`read_file\`, \`grep_search\`, or \`list_dir\` if you need additional files not present in the initial snapshot.
4. MUST call \`run_build_verification\` to test if the codebase compiles cleanly without TypeScript or MDX errors.
5. If \`run_build_verification\` fails, inspect the error log, use \`write_file\` to fix the error, and re-run build verification.
6. Once all TODO items are completed and the build succeeds cleanly, respond with a concise task completion summary.
`;

  const conversationHistory = [
    {
      role: 'user',
      parts: [{ text: initialPrompt }]
    }
  ];

  console.log("🚀 Starting ReAct execution loop with Gemini API...");

  for (let turn = 1; turn <= maxTurns; turn++) {
    console.log(`\n--- Turn ${turn}/${maxTurns} ---`);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: conversationHistory,
        tools: toolsDeclaration,
        generationConfig: { temperature: 0.1 }
      })
    });

    const data = await response.json();
    if (data.error) {
      console.error("❌ Gemini API Error:", data.error);
      process.exit(1);
    }

    const candidate = data.candidates?.[0];
    const content = candidate?.content;
    const parts = content?.parts || [];
    const finishReason = candidate?.finishReason;

    // Check for tool calls (functionCall)
    const functionCallPart = parts.find(p => p.functionCall);
    if (functionCallPart) {
      const call = functionCallPart.functionCall;
      const result = executeTool(call.name, call.args);

      // Append model call and function response turn to conversation history
      conversationHistory.push({ role: 'model', parts: parts });
      conversationHistory.push({
        role: 'function',
        parts: [
          {
            functionResponse: {
              name: call.name,
              response: result
            }
          }
        ]
      });

      continue; // Proceed to next turn in loop
    }

    // If no tool calls present, check for completion
    const textPart = parts.find(p => p.text);
    const isTaskComplete = finishReason === 'STOP' || textPart || parts.length === 0;

    if (isTaskComplete) {
      const completionSummary = textPart?.text || "Task execution finished cleanly with no remaining tool calls.";
      console.log("\n✅ Agent Task Execution Completed Cleanly:\n", completionSummary);

      // Append entry to .agent/progress.md
      const dateStr = new Date().toISOString().split('T')[0];
      const progressEntry = `\n## [${dateStr}] Automated Task: ${path.basename(taskFilePath)}\n- **Agent**: Task Runner Agent (Dynamic TODO Loop)\n- **Status**: Completed\n- **TODO Items**: ${todoList.length}\n- **Turns Used**: ${turn}/${maxTurns}\n- **Task File**: ${taskFilePath}\n`;
      fs.appendFileSync('.agent/progress.md', progressEntry, 'utf8');
      console.log('✅ Appended progress entry to .agent/progress.md');
      process.exit(0);
    }
  }

  console.log(`\n⚠️ Reached allocated limit of ${maxTurns} turns without explicit STOP.`);
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Fatal Error running Task Runner Agent:", err);
  process.exit(1);
});
