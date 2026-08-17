import fs from 'fs';
import path from 'path';

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

  // Base agent and context files
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

  // Determine if task requires delegating to Case Study Rewriter Agent
  const isCaseStudyTask = 
    taskFilePath.includes('case-study') || 
    taskFilePath.includes('case-studies') ||
    taskContent.toLowerCase().includes('case-study-rewriter-agent') ||
    taskContent.toLowerCase().includes('benchmark-framework') ||
    taskContent.toLowerCase().includes('case study rewrite');

  if (isCaseStudyTask) {
    console.log("🤖 Task Runner Agent Decision: Delegating to .agent/case-study-rewriter-agent.md...");
    await executeCaseStudyRewrite(taskFilePath, taskContent, { taskRunnerSpec, architecture, techStack, progress, learnings, apiKey });
  } else {
    console.log("🤖 Task Runner Agent Decision: Executing task directly...");
    await executeGeneralTask(taskFilePath, taskContent, { taskRunnerSpec, architecture, techStack, progress, learnings, apiKey });
  }
}

async function executeCaseStudyRewrite(taskFilePath, taskContent, context) {
  const { apiKey } = context;

  const agentSpec = fs.readFileSync('.agent/case-study-rewriter-agent.md', 'utf8');
  const framework = fs.readFileSync('.agent/benchmark-framework.md', 'utf8');
  const uiInstructions = fs.readFileSync('.agent/ui-building-instructions.md', 'utf8');

  // Detect project slug from task content or path
  let targetMdxPath = 'src/content/projects/ediaqi-decision-support-system/index.mdx';
  let restructurePath = 'src/content/projects/ediaqi-decision-support-system/restructure.md';

  const projectMatch = taskContent.match(/src\/content\/projects\/([^\/\s]+)/);
  if (projectMatch && projectMatch[1]) {
    const slug = projectMatch[1];
    targetMdxPath = `src/content/projects/${slug}/index.mdx`;
    restructurePath = `src/content/projects/${slug}/restructure.md`;
  }

  let restructureContent = '';
  if (fs.existsSync(restructurePath)) {
    restructureContent = fs.readFileSync(restructurePath, 'utf8');
  }

  let currentMdx = '';
  if (fs.existsSync(targetMdxPath)) {
    currentMdx = fs.readFileSync(targetMdxPath, 'utf8');
  }

  const prompt = `
You are the Task Runner Agent delegating execution to the Case Study Rewriter Agent.

=== TASK RUNNER AGENT SPEC ===
${context.taskRunnerSpec}

=== CASE STUDY REWRITER AGENT ROLE & MISSION ===
${agentSpec}

=== STORYTELLING FRAMEWORK ===
${framework}

=== PORTFOLIO UI & DESIGN LANGUAGE INSTRUCTIONS ===
${uiInstructions}

=== SPECIFIC TASK REQUIREMENTS ===
${taskContent}

=== REFERENCE RESTRUCTURE MATERIAL (SOURCE OF TRUTH FOR TEXT) ===
${restructureContent}

=== EXISTING MDX FILE ===
${currentMdx}

=== EXECUTION INSTRUCTIONS ===
Generate the complete \`index.mdx\` file for this case study following all instructions.

CRITICAL RULES:
1. **TEXT FIDELITY**: PRESERVE exact narrative prose, metrics, quote wording, and bullet points from restructure.md if available.
2. **CLEAN TYPOGRAPHY & SPACING**: Keep standard markdown body text flow, lists, tables, and blockquotes.
3. **IMAGE ASSETS**: Map images to \`<ProjectImageAsset src="..." alt="..." />\` components with sentence-case captions (\`Fig 01 // ...\`).
4. **SECTION HEADERS**: Enforce universal section headers:
   \`## 01 // THE CHALLENGE\`
   \`## 02 // MY ROLE\`
   \`## 03 // WHAT WORKED vs. WHAT DIDN'T\`
   \`## 04 // THE SOLUTION\`
   \`## 05 // KEY INSIGHTS\`
   \`## 06 // IMPACT & LESSONS\`
5. **FRONTMATTER**: Preserve YAML frontmatter at top of file.

Return ONLY the exact raw MDX content with frontmatter. Do not wrap the output in markdown code blocks.
`;

  console.log("🤖 Requesting case study generation from Gemini API...");
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1 }
    })
  });

  const data = await response.json();
  if (data.error) {
    console.error("❌ Gemini API Error:", data.error);
    process.exit(1);
  }

  const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!generatedText) {
    console.error("❌ No text response generated by Gemini API.");
    process.exit(1);
  }

  let cleanedMdx = generatedText.trim();
  if (cleanedMdx.startsWith('```mdx')) {
    cleanedMdx = cleanedMdx.replace(/^```mdx\n/, '').replace(/\n```$/, '');
  } else if (cleanedMdx.startsWith('```markdown')) {
    cleanedMdx = cleanedMdx.replace(/^```markdown\n/, '').replace(/\n```$/, '');
  } else if (cleanedMdx.startsWith('```')) {
    cleanedMdx = cleanedMdx.replace(/^```\n/, '').replace(/\n```$/, '');
  }

  const targetDir = path.dirname(targetMdxPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(targetMdxPath, cleanedMdx, 'utf8');
  console.log(`✅ Successfully updated ${targetMdxPath}`);

  // Append progress log
  const dateStr = new Date().toISOString().split('T')[0];
  const progressEntry = `\n## [${dateStr}] Automated Task: ${path.basename(taskFilePath)}\n- **Agent**: Task Runner Agent (Delegated to Case Study Rewriter Agent)\n- **Status**: Completed\n- **Target File**: ${targetMdxPath}\n`;
  fs.appendFileSync('.agent/progress.md', progressEntry, 'utf8');
  console.log('✅ Appended progress entry to .agent/progress.md');
}

async function executeGeneralTask(taskFilePath, taskContent, context) {
  const { apiKey } = context;

  const prompt = `
You are the Task Runner Agent executing an automated portfolio task.

=== TASK RUNNER AGENT SPEC ===
${context.taskRunnerSpec}

=== ARCHITECTURE ===
${context.architecture}

=== TECH STACK ===
${context.techStack}

=== RECENT PROGRESS ===
${context.progress}

=== RECENT LEARNINGS ===
${context.learnings}

=== TASK SPECIFICATION ===
${taskContent}

=== EXECUTION INSTRUCTIONS ===
Analyze the task, implement the requested changes cleanly according to the project design system and typescript standards.
Return a summary of modifications made and status.
`;

  console.log("🤖 Processing general task with Gemini API...");
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1 }
    })
  });

  const data = await response.json();
  if (data.error) {
    console.error("❌ Gemini API Error:", data.error);
    process.exit(1);
  }

  const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log("🤖 Agent Execution Result:\n", generatedText);

  // Append progress log
  const dateStr = new Date().toISOString().split('T')[0];
  const progressEntry = `\n## [${dateStr}] Automated Task: ${path.basename(taskFilePath)}\n- **Agent**: Task Runner Agent\n- **Status**: Completed\n- **Task File**: ${taskFilePath}\n`;
  fs.appendFileSync('.agent/progress.md', progressEntry, 'utf8');
  console.log('✅ Appended progress entry to .agent/progress.md');
}

run().catch((err) => {
  console.error("❌ Fatal Error running Task Runner Agent:", err);
  process.exit(1);
});
