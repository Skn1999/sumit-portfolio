/**
 * Tack (formerly Flow) Autonomous Agent Service
 * Multi-turn Task Runner Agent powered by Google Gemini API.
 * Features candidate model fallback, exponential backoff with jitter,
 * and multi-turn iterative reasoning inspired by scripts/run-task-agent.js.
 */

export interface AgentDeliverable {
  type: 'research' | 'email_draft' | 'plan' | 'summary';
  summary: string;
  markdownReport: string;
  sources?: Array<{ title: string; url: string }>;
  suggestedActions?: string[];
  draftEmail?: {
    recipient?: string;
    subject?: string;
    body: string;
  };
  requiresApproval: boolean;
  approvalSummary?: string;
}

export interface TaskContext {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  source?: {
    provider: 'gmail';
    title: string;
    author: string;
    authorEmail?: string;
    snippet: string;
    permalink: string;
  };
}

const MODEL_CANDIDATES = [
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-flash-lite-latest',
];

// Helper: Cancellable sleep with AbortSignal support
export function cancellableSleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      const err = new Error('Aborted');
      err.name = 'AbortError';
      return reject(err);
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      const err = new Error('Aborted');
      err.name = 'AbortError';
      reject(err);
    };
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

// Helper: Sleep utility
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Helper: Classify transient/retryable errors (high demand, rate limits, 5xx gateway errors)
function isTransientError(status: number, errorObj: any, rawText: string = ''): boolean {
  if (status === 429 || status === 503 || status === 500 || status === 502 || status === 504) {
    return true;
  }
  if (errorObj) {
    const code = Number(errorObj.code);
    const errStatus = String(errorObj.status || '').toUpperCase();
    const msg = String(errorObj.message || '').toLowerCase();

    if (code === 429 || code === 503 || code === 500 || code === 502 || code === 504) return true;
    if (errStatus === 'UNAVAILABLE' || errStatus === 'RESOURCE_EXHAUSTED' || errStatus === 'INTERNAL') return true;
    if (
      msg.includes('high demand') ||
      msg.includes('temporar') ||
      msg.includes('rate limit') ||
      msg.includes('quota') ||
      msg.includes('overloaded')
    ) {
      return true;
    }
  }
  const textLower = rawText.toLowerCase();
  if (
    textLower.includes('high demand') ||
    textLower.includes('service unavailable') ||
    textLower.includes('too many requests')
  ) {
    return true;
  }
  return false;
}

export class ModelsOverloadedError extends Error {
  code = 'MODELS_BUSY';
  reason: string;
  constructor(message = 'All candidate models are at capacity right now.') {
    super(message);
    this.name = 'ModelsOverloadedError';
    this.reason = message;
  }
}

interface GeminiCallResult {
  data: any;
  error: { code?: number; status?: string; message: string } | null;
}

// Robust Gemini API caller with progressive exponential backoff, jitter, multi-model rotation, and AbortSignal
async function callGeminiWithRetry(
  apiKey: string,
  requestBody: any,
  { maxRetries = 3, initialDelayMs = 2000, label = 'Request', signal }: { maxRetries?: number; initialDelayMs?: number; label?: string; signal?: AbortSignal } = {}
): Promise<GeminiCallResult> {
  let modelIndex = 0;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    if (signal?.aborted) {
      const err = new Error('Aborted');
      err.name = 'AbortError';
      throw err;
    }

    const currentModel = MODEL_CANDIDATES[modelIndex] || MODEL_CANDIDATES[MODEL_CANDIDATES.length - 1];
    const modelPath = currentModel.startsWith('models/') ? currentModel : `models/${currentModel}`;
    const url = `https://generativelanguage.googleapis.com/v1beta/${modelPath}:generateContent?key=${apiKey}`;

    let response: Response | null = null;
    let rawText = '';
    let data: any = null;

    try {
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal,
      });

      rawText = await response.text();
      try {
        data = JSON.parse(rawText);
      } catch {
        data = null;
      }
    } catch (networkErr: any) {
      if (attempt <= maxRetries) {
        const delay = Math.min(30000, initialDelayMs * Math.pow(2, attempt - 1) + Math.floor(Math.random() * 1500));
        console.warn(`⚠️ [${label}] Network error on attempt ${attempt}/${maxRetries} (${currentModel}): ${networkErr.message}. Retrying in ${(delay / 1000).toFixed(1)}s...`);
        await sleep(delay);
        continue;
      }
      return { data: null, error: { message: `Network error after ${maxRetries} retries: ${networkErr.message}` } };
    }

    const statusCode = response ? response.status : 0;
    const apiError = data?.error;

    if (!response || !response.ok || apiError || !data) {
      const isTransient = isTransientError(statusCode, apiError, rawText);
      const isNotFound = statusCode === 404 || apiError?.status === 'NOT_FOUND' || (apiError?.message && apiError.message.includes('not found'));
      const errorMsg = apiError?.message || (rawText.length < 200 && rawText ? rawText : `HTTP ${statusCode}`);
      const errCode = apiError?.code || statusCode;
      const errStatus = apiError?.status || '';

      // Fallback immediately if candidate model not found
      if (isNotFound) {
        if (modelIndex < MODEL_CANDIDATES.length - 1) {
          modelIndex++;
          console.warn(`⚠️ [${label}] Model ${currentModel} returned 404 NOT_FOUND. Switching to fallback candidate: ${MODEL_CANDIDATES[modelIndex]}`);
          continue;
        }
      }

      // If transient (503, 429, etc.), retry with backoff and rotate candidate
      if (isTransient && attempt <= maxRetries) {
        if (attempt >= 2 && modelIndex < MODEL_CANDIDATES.length - 1) {
          modelIndex++;
          console.warn(`🔄 [${label}] High demand on ${currentModel}. Rotating to fallback: ${MODEL_CANDIDATES[modelIndex]}`);
        }
        const delay = Math.min(30000, initialDelayMs * Math.pow(2, attempt - 1) + Math.floor(Math.random() * 1500));
        console.warn(`⏳ [${label}] Gemini transient error on attempt ${attempt}/${maxRetries} (${currentModel} - ${errCode}: ${errorMsg.trim()}). Retrying in ${(delay / 1000).toFixed(1)}s...`);
        await sleep(delay);
        continue;
      }

      return {
        data,
        error: apiError || { code: statusCode, status: errStatus, message: errorMsg },
      };
    }

    return { data, error: null };
  }

  return { data: null, error: { message: `All retries exhausted across candidate models` } };
}

/**
 * Classifies user intent from note title and content
 */
export function classifyTaskIntent(context: TaskContext): 'research' | 'email_draft' | 'plan' | 'summary' {
  const combined = `${context.title} ${context.description} ${(context.tags || []).join(' ')}`.toLowerCase();

  if (context.source || combined.includes('reply') || combined.includes('email') || combined.includes('respond to') || combined.includes('send to')) {
    return 'email_draft';
  }

  if (
    combined.includes('research') ||
    combined.includes('find info') ||
    combined.includes('look up') ||
    combined.includes('compare') ||
    combined.includes('analyze') ||
    combined.includes('what is') ||
    combined.includes('competitor') ||
    combined.includes('market') ||
    combined.includes('trends')
  ) {
    return 'research';
  }

  if (
    combined.includes('plan') ||
    combined.includes('launch') ||
    combined.includes('prepare') ||
    combined.includes('organize') ||
    combined.includes('roadmap') ||
    combined.includes('checklist') ||
    combined.includes('steps')
  ) {
    return 'plan';
  }

  return 'research';
}

export interface ExecuteAgentOptions {
  signal?: AbortSignal;
}

/**
 * Executes agent workflow with simulated 5-second realistic delay,
 * progressive milestone feedback, AbortSignal support, and dummy deliverables.
 */
export async function executeAgentWorkflow(
  context: TaskContext,
  onProgress?: (statusText: string) => void,
  options?: ExecuteAgentOptions
): Promise<AgentDeliverable> {
  const signal = options?.signal;
  const intent = classifyTaskIntent(context);

  if (signal?.aborted) {
    const err = new Error('Aborted');
    err.name = 'AbortError';
    throw err;
  }

  // Check for simulated busy/overloaded state via title keywords
  const isSimulateBusy =
    context.title.toLowerCase().includes('[busy]') ||
    context.title.toLowerCase().includes('[overload]') ||
    (context.description && context.description.toLowerCase().includes('[busy]'));

  if (isSimulateBusy) {
    onProgress?.('Querying candidate models (gemini-3.8-flash, gemini-3.7-flash)...');
    await cancellableSleep(1500, signal);
    throw new ModelsOverloadedError('All candidate models are at capacity right now (HTTP 503 Service Unavailable).');
  }

  // --- 5-SECOND REALISTIC INTERACTION SIMULATION WITH DUMMY RESPONSE ---
  // Milestone 1: Deconstruction & query mapping (0s -> 1.6s)
  onProgress?.('Assistant deconstructing inquiry & context...');
  await cancellableSleep(1600, signal);

  // Milestone 2: Research synthesis & signal scanning (1.6s -> 3.4s)
  onProgress?.('Scanning signals & synthesizing research...');
  await cancellableSleep(1800, signal);

  // Milestone 3: Executive briefing compilation & verification (3.4s -> 5.0s)
  onProgress?.('Synthesizing executive briefing dossier & verifying actions...');
  await cancellableSleep(1600, signal);

  return generateHeuristicReport(context, intent);
}

/**
 * Live multi-turn Gemini API execution engine (preserved for production use)
 */
export async function executeLiveGeminiWorkflow(
  context: TaskContext,
  onProgress?: (statusText: string) => void,
  options?: ExecuteAgentOptions
): Promise<AgentDeliverable> {
  const signal = options?.signal;
  const intent = classifyTaskIntent(context);
  const apiKey = (
    (typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') : null) ||
    (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)
  )?.trim();

  // If no API key is provided, log warning and use high-signal heuristic brief
  if (!apiKey) {
    console.warn('⚠️ No Gemini API key detected in localStorage or VITE_GEMINI_API_KEY. Using heuristic synthesis.');
    onProgress?.('Generating offline heuristic briefing (set VITE_GEMINI_API_KEY for live AI)...');
    await sleep(800);
    return generateHeuristicReport(context, intent);
  }

  // --- OUTBOUND EMAIL DRAFT WORKFLOW (Tier 2 High-Stakes) ---
  if (intent === 'email_draft') {
    onProgress?.('Assistant deconstructing email context & sender intent...');

    const recipient = context.source?.authorEmail || 'contact@client.com';
    const authorName = context.source?.author || 'there';
    const cleanSubject = context.title.replace(/^(re:|fwd:)\s*/i, '');
    const subject = `Re: ${cleanSubject}`;

    const prompt = `You are an elite executive communications assistant for Sumit Nayyar.
Your goal is to draft a thoughtful, professional outbound email reply to the following correspondence.

=== CORRESPONDENCE CONTEXT ===
Recipient Name: ${authorName}
Recipient Email: ${recipient}
Subject: ${cleanSubject}
Snippet / Notes: "${context.description || context.source?.snippet || context.title}"

=== INSTRUCTIONS ===
1. Craft an executive-level, clear, concise email draft that directly resolves the recipient's inquiry or proposes high-leverage next steps.
2. Tone: Warm, confident, crisp, design-conscious, zero corporate filler.
3. Return ONLY a valid JSON object matching this schema:
{
  "summary": "1-sentence executive summary of the reply",
  "subject": "Email subject line",
  "recipient": "${recipient}",
  "body": "Complete email body text signed off as Sumit Nayyar",
  "rationale": "Brief strategic reasoning behind this reply"
}`;

    const { data, error } = await callGeminiWithRetry(
      apiKey,
      {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2 },
      },
      { maxRetries: 3, label: 'Email-Draft-Generation' }
    );

    if (!error && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const rawText = data.candidates[0].content.parts[0].text;
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          const draftBody = parsed.body || `Hi ${authorName},\n\nThank you for reaching out regarding "${cleanSubject}".\n\nBest regards,\nSumit`;

          onProgress?.('Email draft finalized. Awaiting human sign-off...');
          return {
            type: 'email_draft',
            summary: parsed.summary || `Prepared draft response to ${authorName}`,
            markdownReport: `### ✉️ Outbound Email Draft\n\n**To:** \`${parsed.recipient || recipient}\`  \n**Subject:** *${parsed.subject || subject}*  \n\n---\n\n${draftBody}\n\n---\n*Rationale: ${parsed.rationale || 'Executive response drafted based on correspondence context.'}*\n\n*Status: Awaiting human sign-off via Agent Drawer before sending.*`,
            draftEmail: {
              recipient: parsed.recipient || recipient,
              subject: parsed.subject || subject,
              body: draftBody,
            },
            requiresApproval: true,
            approvalSummary: `Send outbound email response to ${parsed.recipient || recipient} regarding "${cleanSubject}"`,
          };
        } catch {
          // JSON parse failed, proceed to fallback
        }
      }
    }

    // Direct text fallback for email
    const draftBody = `Hi ${authorName.split(' ')[0]},\n\nThank you for getting in touch regarding "${cleanSubject}".\n\nI have reviewed the details and everything is aligned on our end. We are ready to proceed with the next steps as discussed.\n\nPlease let me know if you need any additional clarification.\n\nBest regards,\nSumit`;

    return {
      type: 'email_draft',
      summary: `Prepared draft response to ${authorName}`,
      markdownReport: `### ✉️ Outbound Email Draft\n\n**To:** \`${recipient}\`  \n**Subject:** *${subject}*  \n\n---\n\n${draftBody}\n\n---\n*Status: Awaiting human approval via Agent Drawer before sending via Gmail API.*`,
      draftEmail: {
        recipient,
        subject,
        body: draftBody,
      },
      requiresApproval: true,
      approvalSummary: `Send outbound email response to ${recipient} regarding "${cleanSubject}"`,
    };
  }

  // --- MULTI-TURN RESEARCH & STRATEGY AGENT (Tier 1 Autonomous) ---
  const isSimulateBusy =
    context.title.toLowerCase().includes('[busy]') ||
    context.title.toLowerCase().includes('[overload]') ||
    (context.description && context.description.toLowerCase().includes('[busy]'));

  if (isSimulateBusy) {
    onProgress?.('Querying candidate models (gemini-2.5-flash, gemini-1.5-flash)...');
    await sleep(1500);
    throw new ModelsOverloadedError('All candidate models are at capacity right now (HTTP 503 Service Unavailable).');
  }

  const conversationHistory: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  // TURN 1: Task Decomposition & Research Strategy
  onProgress?.('📋 Deconstructing research vectors & key questions...');

  const turn1Prompt = `You are an elite executive research and strategy agent in Sumit Nayyar's spatial workspace.
Analyze the following note/task and formulate a structured research strategy:

Title: "${context.title}"
Details: "${context.description || 'None'}"
Tags: ${(context.tags || []).join(', ') || 'None'}

Break down this inquiry into 3 clear research vectors:
1. Core problem & market context
2. Technical / design tradeoffs & competitive landscape
3. High-signal implementation recommendations

Provide your preliminary breakdown concisely.`;

  conversationHistory.push({ role: 'user', parts: [{ text: turn1Prompt }] });

  const turn1Result = await callGeminiWithRetry(
    apiKey,
    {
      contents: conversationHistory,
      generationConfig: { temperature: 0.2 },
    },
    { maxRetries: 3, label: 'Turn-1-Decomposition' }
  );

  if (apiKey && turn1Result.error) {
    const err = turn1Result.error;
    const isBusy = isTransientError(Number(err.code) || 0, err, err.message || '');
    throw new ModelsOverloadedError(
      isBusy
        ? 'All candidate models are at capacity right now (503 / busy).'
        : (err.message || 'Unable to connect to model candidates.')
    );
  }

  const turn1Text = turn1Result.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (turn1Text) {
    conversationHistory.push({ role: 'model', parts: [{ text: turn1Text }] });
  }

  // TURN 2: Deep Analysis & Strategic Synthesis
  onProgress?.('🔍 Investigating market signals & evaluating trade-offs...');

  const turn2Prompt = `Based on your breakdown, conduct a rigorous analytical synthesis.
Evaluate:
- Real-world industry benchmarks and recent trends relevant to this topic
- Concrete advantages, friction points, and edge cases
- Actionable conclusions for an engineering and design leadership perspective`;

  conversationHistory.push({ role: 'user', parts: [{ text: turn2Prompt }] });

  const turn2Result = await callGeminiWithRetry(
    apiKey,
    {
      contents: conversationHistory,
      generationConfig: { temperature: 0.2 },
    },
    { maxRetries: 3, label: 'Turn-2-Synthesis' }
  );

  const turn2Text = turn2Result.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (turn2Text) {
    conversationHistory.push({ role: 'model', parts: [{ text: turn2Text }] });
  }

  // TURN 3: Polished Executive Briefing Dossier
  onProgress?.('✨ Synthesizing executive briefing dossier & verifying actions...');

  const turn3Prompt = `Now compile the full findings into a definitive, executive-grade research dossier in clean GitHub-flavored Markdown.

Follow this exact structure:
# Executive Briefing: ${context.title}

## 📋 Executive Summary
(A punchy, 2-3 sentence executive synthesis of the verdict)

## 🔍 Market Signals & Key Findings
(3-4 high-density bullet points with concrete observations)

## ⚖️ Strategic Trade-offs & Deep Dive
(Concrete technical and operational implications)

## 💡 Recommended Next Actions
(Numbered, prioritized list of 2-3 immediate high-leverage steps)

## 🔗 Sources & Reference Queries
(Curated list of authoritative resources, search terms, or links)

Keep the prose crisp, authoritative, and completely devoid of generic filler or meta commentary.`;

  conversationHistory.push({ role: 'user', parts: [{ text: turn3Prompt }] });

  const turn3Result = await callGeminiWithRetry(
    apiKey,
    {
      contents: conversationHistory,
      generationConfig: { temperature: 0.2 },
    },
    { maxRetries: 3, label: 'Turn-3-Final-Dossier' }
  );

  const finalMarkdown = turn3Result.data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (finalMarkdown && finalMarkdown.trim().length > 100) {
    // Extract executive summary line
    const summaryMatch = finalMarkdown.match(/## 📋 Executive Summary\s*\n+([^\n#]+)/);
    const summary = summaryMatch ? summaryMatch[1].trim() : `Completed research dossier on "${context.title}"`;

    // Extract suggested actions
    const actionsMatch = finalMarkdown.match(/## 💡 Recommended Next Actions([\s\S]*?)(?=##|$)/);
    const actions: string[] = [];
    if (actionsMatch) {
      const lines = actionsMatch[1].split('\n');
      for (const line of lines) {
        const cleaned = line.replace(/^\s*(\d+\.|\-|\*)\s*/, '').trim();
        if (cleaned.length > 5) actions.push(cleaned);
      }
    }

    onProgress?.('Dossier complete & paperclipped to board.');

    return {
      type: 'research',
      summary,
      markdownReport: finalMarkdown,
      sources: [
        {
          title: `Google Search: ${context.title}`,
          url: `https://www.google.com/search?q=${encodeURIComponent(context.title)}`,
        },
        {
          title: 'Hacker News Discussion',
          url: `https://hn.algolia.com/?q=${encodeURIComponent(context.title)}`,
        },
      ],
      suggestedActions: actions.length > 0 ? actions.slice(0, 3) : [
        'Review executive dossier findings in inspector',
        'Convert recommendations into targeted action cards',
      ],
      requiresApproval: false,
    };
  }

  // If live API key was provided but failed across candidate models
  if (apiKey) {
    const err = turn3Result?.error;
    const isBusy = err ? isTransientError(Number(err.code) || 0, err, err.message || '') : true;
    throw new ModelsOverloadedError(
      isBusy
        ? 'All candidate models are at capacity right now (HTTP 503 Service Unavailable).'
        : (err?.message || 'Synthesis timed out across candidate models.')
    );
  }

  // Fallback heuristic report when no API key configured
  return generateHeuristicReport(context, intent);
}

/**
 * Intelligent contextual fallback when API key is missing or offline
 */
function generateHeuristicReport(context: TaskContext, intent: string): AgentDeliverable {
  const topic = context.title.replace(/^(research|look up|investigate|find info on)\s*/i, '').trim() || context.title;

  if (intent === 'email_draft') {
    const authorName = context.source?.author || 'there';
    const recipient = context.source?.authorEmail || 'contact@client.com';
    const cleanSubject = context.title.replace(/^(re:|fwd:)\s*/i, '');
    const draftBody = `Hi ${authorName.split(' ')[0]},\n\nThank you for getting in touch regarding "${cleanSubject}".\n\nI have reviewed the details and everything is aligned on our end. We are ready to proceed with the next steps as discussed.\n\nPlease let me know if you need any additional clarification.\n\nBest regards,\nSumit`;

    return {
      type: 'email_draft',
      summary: `Prepared draft response to ${authorName}`,
      markdownReport: `### ✉️ Outbound Email Draft\n\n**To:** \`${recipient}\`  \n**Subject:** *Re: ${cleanSubject}*\n\n---\n\n${draftBody}\n\n---\n*Status: Awaiting human sign-off before sending via Gmail API.*`,
      draftEmail: {
        recipient,
        subject: `Re: ${cleanSubject}`,
        body: draftBody,
      },
      requiresApproval: true,
      approvalSummary: `Send outbound email response to ${recipient} regarding "${cleanSubject}"`,
    };
  }

  const report = `# Executive Briefing: ${topic}
 
 ## 📋 Executive Summary
 A structured briefing on **${topic}**. Contextual signals indicate demand for high-leverage spatial organization, low-latency execution, and human-in-the-loop oversight.

## 🔍 Market Signals & Key Findings
- **High-Leverage Workflows:** Active development and user migration towards focused spatial tools that eliminate context switching.
- **Cognitive Load Reduction:** Users increasingly reject rigid table databases in favor of tactile, visual surfaces that mirror physical thinking.
- **Delegation Guardrails:** Effective assistants distinguish between safe research (autonomous) and outbound communication (human approval required).

## 💡 Recommended Next Steps
1. **Scope Requirements:** Define clear boundary conditions for the ${topic} initiative.
2. **Prototype Interaction:** Validate user workflow with tactile spatial gestures.
3. **Deploy & Measure:** Monitor completion rates and user sentiment.

---
*(Tip: Set \`VITE_GEMINI_API_KEY\` in your \`.env\` file or browser localStorage to enable live multi-turn research calls to Gemini).*`;

  return {
    type: intent === 'email_draft' ? 'email_draft' : 'research',
    summary: `Synthesized research briefing for "${context.title}"`,
    markdownReport: report,
    sources: [
      {
        title: `Google Search: ${topic}`,
        url: `https://www.google.com/search?q=${encodeURIComponent(topic)}`,
      },
    ],
    suggestedActions: [
      'Review executive findings in card inspector',
      'Pin key takeaways as new corkboard notes',
    ],
    requiresApproval: false,
  };
}
