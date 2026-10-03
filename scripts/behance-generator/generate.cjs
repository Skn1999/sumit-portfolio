const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ASSETS_DIR = path.resolve(__dirname, '../../src/content/projects/actai');
const OUTPUT_DIR = path.resolve(__dirname, '../../dist/behance-actai');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function getBase64Image(filename) {
  const filePath = path.join(ASSETS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`Asset not found: ${filePath}`);
    return '';
  }
  const ext = path.extname(filename).replace('.', '');
  const mime = ext === 'svg' ? 'image/svg+xml' : `image/${ext}`;
  const data = fs.readFileSync(filePath).toString('base64');
  return `data:${mime};base64,${data}`;
}

const COMMON_HEAD = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Behance Case Study - ActAI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    body {
      width: 1920px;
      margin: 0;
      padding: 0;
      font-family: 'Geist', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #FBFBFA;
      color: #171717;
      overflow: hidden;
    }
    .plate {
      width: 1920px;
      position: relative;
      background-color: #FBFBFA;
      padding: 100px 140px;
      display: flex;
      flex-direction: column;
    }
    .tagline-pill {
      font-family: 'Geist Mono', monospace;
      font-size: 13px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #737373;
      margin-bottom: 24px;
      display: inline-block;
    }
    .display-title {
      font-size: 80px;
      font-weight: 600;
      letter-spacing: -0.04em;
      line-height: 1.05;
      color: #111111;
      margin-bottom: 24px;
    }
    .display-sub {
      font-size: 26px;
      font-weight: 400;
      letter-spacing: -0.01em;
      line-height: 1.4;
      color: #525252;
      max-width: 980px;
    }
    .editorial-quote {
      font-size: 20px;
      font-weight: 500;
      line-height: 1.5;
      color: #1f2937;
      border-left: 2px solid #111111;
      padding-left: 24px;
      margin-top: 36px;
      max-width: 820px;
    }
    .section-title {
      font-size: 46px;
      font-weight: 600;
      letter-spacing: -0.03em;
      line-height: 1.15;
      color: #111111;
      margin-bottom: 18px;
    }
    .section-sub {
      font-size: 20px;
      font-weight: 400;
      line-height: 1.5;
      color: #555555;
      max-width: 800px;
      margin-bottom: 48px;
    }
    .image-frame {
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 20px 50px -15px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04);
      background: #FFFFFF;
    }
    .image-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .card {
      background: #FFFFFF;
      border: 1px solid #EAEAEA;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.02);
    }
    .card-title {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: #111111;
      margin-bottom: 12px;
    }
    .card-body {
      font-size: 15px;
      line-height: 1.55;
      color: #666666;
    }
  </style>
</head>
<body>
`;

const plates = [
  // PLATE 01: Hero Cover & Premise
  {
    name: '01_hero_cover',
    height: 1180,
    render: () => {
      const coverImg = getBase64Image('actai-steward-cover-static.png');
      return `
        <div class="plate" style="height: 1180px; justify-content: space-between;">
          <div>
            <span class="tagline-pill">ACTAI LABS // 2026 CASE STUDY</span>
            <h1 class="display-title">ActAI: Delegation with Agency</h1>
            <p class="display-sub">Autonomous email triage with source-grounded human oversight.</p>
            <div class="editorial-quote">
              "Users don't fear autonomous agents. They fear losing veto power over their own outbox."
            </div>
          </div>
          <div class="image-frame" style="width: 1640px; height: 580px; margin-top: 50px;">
            <img src="${coverImg}" alt="ActAI Hero Interface" style="object-position: top center;" />
          </div>
        </div>
      `;
    }
  },

  // PLATE 02: The Tension
  {
    name: '02_the_tension',
    height: 1040,
    render: () => {
      return `
        <div class="plate" style="height: 1040px; justify-content: center;">
          <span class="tagline-pill">01 // THE TENSION</span>
          <h2 class="section-title">The Automation Trust Paradox</h2>
          <p class="section-sub">Autonomous bots promise massive leverage, but knowledge workers refuse to let black boxes dispatch unreviewed correspondence. The friction is verifiability, not model capability.</p>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 20px;">
            <div class="card" style="padding: 40px 36px;">
              <div style="font-family: 'Geist Mono', monospace; font-size: 14px; color: #DC2626; margin-bottom: 16px; font-weight: 600;">01 / HALLUCINATION RISK</div>
              <h3 class="card-title">Silent Brand Mistake</h3>
              <p class="card-body">A single hallucinated date, price quote, or awkward promise irreversibly destroys executive credibility and client trust.</p>
            </div>
            <div class="card" style="padding: 40px 36px;">
              <div style="font-family: 'Geist Mono', monospace; font-size: 14px; color: #F59E0B; margin-bottom: 16px; font-weight: 600;">02 / SOURCE OPACITY</div>
              <h3 class="card-title">Hidden Decision Basis</h3>
              <p class="card-body">Users cannot discern which underlying brief constraints or customer emails informed the generated response draft.</p>
            </div>
            <div class="card" style="padding: 40px 36px;">
              <div style="font-family: 'Geist Mono', monospace; font-size: 14px; color: #2563EB; margin-bottom: 16px; font-weight: 600;">03 / COGNITIVE TAX</div>
              <h3 class="card-title">Anxious Second-Guessing</h3>
              <p class="card-body">Policing autonomous drafts creates more cognitive load and friction than writing the original correspondence from scratch.</p>
            </div>
          </div>
        </div>
      `;
    }
  },

  // PLATE 03: The Mental Model
  {
    name: '03_mental_model',
    height: 980,
    render: () => {
      return `
        <div class="plate" style="height: 980px; justify-content: center;">
          <span class="tagline-pill">02 // INTERACTION THESIS</span>
          <h2 class="section-title">Bounded Delegation &gt; Black-Box Autonomy</h2>
          <p class="section-sub">The system does the heavy lifting—ingesting threads, detecting conflicts, and synthesizing drafts. The human operator retains decisive trigger control.</p>

          <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; border: 1px solid #EAEAEA; border-radius: 16px; padding: 48px; margin-top: 24px;">
            <div style="flex: 1; text-align: left;">
              <div style="font-family: 'Geist Mono'; font-size: 12px; color: #888; margin-bottom: 8px;">STEP 01</div>
              <div style="font-size: 20px; font-weight: 600; color: #111;">Vendor Contradiction Ingested</div>
              <div style="font-size: 14px; color: #666; margin-top: 6px;">Inbound request conflicts with budget baseline</div>
            </div>

            <div style="font-size: 24px; color: #CCC; padding: 0 24px;">→</div>

            <div style="flex: 1; text-align: left;">
              <div style="font-family: 'Geist Mono'; font-size: 12px; color: #888; margin-bottom: 8px;">STEP 02</div>
              <div style="font-size: 20px; font-weight: 600; color: #111;">Cross-Brief Validation</div>
              <div style="font-size: 14px; color: #666; margin-top: 6px;">Agent evaluates policy, rate cards & historical threads</div>
            </div>

            <div style="font-size: 24px; color: #CCC; padding: 0 24px;">→</div>

            <div style="flex: 1.2; text-align: left; background: #F4F6F4; border: 1px solid #2A9D8F; border-radius: 12px; padding: 24px;">
              <div style="font-family: 'Geist Mono'; font-size: 12px; color: #2A9D8F; font-weight: 600; margin-bottom: 8px;">STEP 03 // THE BOUNDED GATE</div>
              <div style="font-size: 20px; font-weight: 600; color: #1B4D3E;">Human Oversight & Veto</div>
              <div style="font-size: 14px; color: #2D6A4F; margin-top: 6px;">1-Click evidence review + 3 consequence levers</div>
            </div>

            <div style="font-size: 24px; color: #CCC; padding: 0 24px;">→</div>

            <div style="flex: 1; text-align: left;">
              <div style="font-family: 'Geist Mono'; font-size: 12px; color: #888; margin-bottom: 8px;">STEP 04</div>
              <div style="font-size: 20px; font-weight: 600; color: #111;">Deterministic Dispatch</div>
              <div style="font-size: 14px; color: #666; margin-top: 6px;">Verified email dispatches to outbox cleanly</div>
            </div>
          </div>
        </div>
      `;
    }
  },

  // PLATE 04: Progressive Disclosure
  {
    name: '04_progressive_disclosure',
    height: 1260,
    render: () => {
      const scrA = getBase64Image('how-screen-a-today-light.png');
      const scrB = getBase64Image('how-screen-b-delegation-light.png');
      const scrC = getBase64Image('how-screen-c-decision-sheet-light.png');
      return `
        <div class="plate" style="height: 1260px; justify-content: space-between;">
          <div>
            <span class="tagline-pill">03 // PROGRESSIVE DISCLOSURE</span>
            <h2 class="section-title">The 3-Screen Oversight Model</h2>
            <p class="section-sub">Information density tailored to operator focus: from high-level situational awareness down to focused consequence levers.</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 10px;">
            <div>
              <div class="image-frame" style="height: 680px;">
                <img src="${scrA}" alt="Screen A" />
              </div>
              <div style="margin-top: 24px;">
                <div style="font-family: 'Geist Mono'; font-size: 13px; color: #888; margin-bottom: 6px;">SCREEN 01</div>
                <div style="font-size: 18px; font-weight: 600; color: #111; margin-bottom: 6px;">Sub-5s Situational Triage</div>
                <div style="font-size: 14px; color: #666; line-height: 1.5;">Separates quiet background telemetry from items needing immediate human intervention.</div>
              </div>
            </div>

            <div>
              <div class="image-frame" style="height: 680px;">
                <img src="${scrB}" alt="Screen B" />
              </div>
              <div style="margin-top: 24px;">
                <div style="font-family: 'Geist Mono'; font-size: 13px; color: #888; margin-bottom: 6px;">SCREEN 02</div>
                <div style="font-size: 18px; font-weight: 600; color: #111; margin-bottom: 6px;">3-Column Oversight Workspace</div>
                <div style="font-size: 14px; color: #666; line-height: 1.5;">Juxtaposes client brief rules and agent execution traces against the flagged vendor contradiction.</div>
              </div>
            </div>

            <div>
              <div class="image-frame" style="height: 680px;">
                <img src="${scrC}" alt="Screen C" />
              </div>
              <div style="margin-top: 24px;">
                <div style="font-family: 'Geist Mono'; font-size: 13px; color: #888; margin-bottom: 6px;">SCREEN 03</div>
                <div style="font-size: 18px; font-weight: 600; color: #111; margin-bottom: 6px;">Bounded Decision Sheet</div>
                <div style="font-size: 14px; color: #666; line-height: 1.5;">Collapses open ambiguity into 3 bounded consequence paths with an editable draft response.</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },

  // PLATE 05: Verifiability & Evidence
  {
    name: '05_evidence_inspector',
    height: 1140,
    render: () => {
      const srcInspector = getBase64Image('how-source-inspector-light.png');
      const stateMonitor = getBase64Image('how-state-monitoring-light.png');
      return `
        <div class="plate" style="height: 1140px; justify-content: space-between;">
          <div>
            <span class="tagline-pill">04 // VERIFIABILITY</span>
            <h2 class="section-title">1-Click Source Grounding & Feedback</h2>
            <p class="section-sub">Eliminating guesswork. Every drafted phrase maps directly to verifiable source correspondence and triggers deterministic state transitions.</p>
          </div>

          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; margin-top: 10px; align-items: start;">
            <div>
              <div class="image-frame" style="height: 640px;">
                <img src="${srcInspector}" alt="Source Inspector Drawer" />
              </div>
              <div style="margin-top: 20px;">
                <div style="font-size: 18px; font-weight: 600; color: #111; margin-bottom: 6px;">Source-Grounded Evidence Inspector</div>
                <div style="font-size: 14px; color: #666; line-height: 1.5;">Clicking "View source" opens an instant drawer displaying exact original quotes, customer constraints, and timestamped context.</div>
              </div>
            </div>

            <div>
              <div class="image-frame" style="height: 640px;">
                <img src="${stateMonitor}" alt="Deterministic State Monitoring" />
              </div>
              <div style="margin-top: 20px;">
                <div style="font-size: 18px; font-weight: 600; color: #111; margin-bottom: 6px;">Deterministic State Engine</div>
                <div style="font-size: 14px; color: #666; line-height: 1.5;">Dispatches transition from NEEDS_DECISION to MONITORING in real time, logging audit trails for compliance.</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },

  // PLATE 06: Messy Process & Trade-offs
  {
    name: '06_design_tradeoffs',
    height: 1080,
    render: () => {
      return `
        <div class="plate" style="height: 1080px; justify-content: center;">
          <span class="tagline-pill">05 // MESSY REALITY &amp; TRADE-OFFS</span>
          <h2 class="section-title">Design Trade-offs</h2>
          <p class="section-sub">Rejecting AI industry orthodoxies in favor of high-certainty human ergonomics.</p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 20px;">
            <div class="card" style="padding: 48px 40px;">
              <div style="font-family: 'Geist Mono'; font-size: 13px; color: #737373; margin-bottom: 20px; font-weight: 500;">TRADE-OFF 01</div>
              <h3 style="font-size: 24px; font-weight: 600; color: #111; margin-bottom: 24px;">Chat Prompting vs. Bounded Buttons</h3>
              
              <div style="margin-bottom: 20px; padding: 18px; background: #FFF5F5; border-radius: 8px; border-left: 3px solid #EF4444;">
                <div style="font-size: 12px; font-family: 'Geist Mono'; color: #B91C1C; font-weight: 600; margin-bottom: 4px;">DISCARDED: OPEN CHAT INPUT</div>
                <div style="font-size: 14px; color: #7F1D1D; line-height: 1.5;">Users spent unnecessary time typing instructions to re-steer the agent, introducing prompt engineering anxiety.</div>
              </div>

              <div style="padding: 18px; background: #F0FDF4; border-radius: 8px; border-left: 3px solid #10B981;">
                <div style="font-size: 12px; font-family: 'Geist Mono'; color: #047857; font-weight: 600; margin-bottom: 4px;">CHOSEN: 3 BOUNDED DECISION LEVERS</div>
                <div style="font-size: 14px; color: #064E3B; line-height: 1.5;">Pre-computed actions with visible consequence modeling allow 1-click approvals with zero prompting fatigue.</div>
              </div>
            </div>

            <div class="card" style="padding: 48px 40px;">
              <div style="font-family: 'Geist Mono'; font-size: 13px; color: #737373; margin-bottom: 20px; font-weight: 500;">TRADE-OFF 02</div>
              <h3 style="font-size: 24px; font-weight: 600; color: #111; margin-bottom: 24px;">Full LLM Telemetry vs. Progressive Disclosure</h3>
              
              <div style="margin-bottom: 20px; padding: 18px; background: #FFF5F5; border-radius: 8px; border-left: 3px solid #EF4444;">
                <div style="font-size: 12px; font-family: 'Geist Mono'; color: #B91C1C; font-weight: 600; margin-bottom: 4px;">DISCARDED: RAW PROMPT &amp; TOKEN DUMPS</div>
                <div style="font-size: 14px; color: #7F1D1D; line-height: 1.5;">Flooding the main canvas with raw LLM execution logs triggered cognitive overload and made reviewers feel like debuggers.</div>
              </div>

              <div style="padding: 18px; background: #F0FDF4; border-radius: 8px; border-left: 3px solid #10B981;">
                <div style="font-size: 12px; font-family: 'Geist Mono'; color: #047857; font-weight: 600; margin-bottom: 4px;">CHOSEN: PROGRESSIVE AUDIT TRAIL</div>
                <div style="font-size: 14px; color: #064E3B; line-height: 1.5;">Clean 3-step timeline overview upfront. Deep reasoning logs remain fully accessible inside the inspect drawer on demand.</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },

  // PLATE 07: Design System Foundation
  {
    name: '07_design_system',
    height: 1220,
    render: () => {
      const tokens = getBase64Image('what-design-tokens-and-surfaces.png');
      const typography = getBase64Image('what-typography-and-layout-grid.png');
      const primitives = getBase64Image('what-primitives-and-state-engine.png');
      return `
        <div class="plate" style="height: 1220px; justify-content: space-between;">
          <div>
            <span class="tagline-pill">06 // FOUNDATIONS</span>
            <h2 class="section-title">Design Tokens &amp; State Engine</h2>
            <p class="section-sub">Built with Swiss typographic discipline, semantic surface tokens, and modular React state primitives.</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 10px;">
            <div class="image-frame" style="height: 380px;">
              <img src="${tokens}" alt="Design Tokens" />
            </div>
            <div class="image-frame" style="height: 380px;">
              <img src="${typography}" alt="Typography Scale" />
            </div>
          </div>

          <div class="image-frame" style="height: 380px; margin-top: 10px;">
            <img src="${primitives}" alt="Primitives and State Engine" />
          </div>
        </div>
      `;
    }
  },

  // PLATE 08: Outcome & Links
  {
    name: '08_outcome_and_links',
    height: 880,
    render: () => {
      return `
        <div class="plate" style="height: 880px; justify-content: space-between;">
          <div>
            <span class="tagline-pill">07 // OUTCOME &amp; IMPACT</span>
            <h2 class="section-title">Delegation Without Anxiety</h2>
            <p class="section-sub">A production-ready prototype demonstrating that agency and automation can coexist seamlessly.</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 20px;">
            <div class="card" style="padding: 48px; border-left: 4px solid #111111;">
              <div style="font-size: 72px; font-weight: 700; letter-spacing: -0.04em; color: #111111; line-height: 1;">&lt; 30s</div>
              <div style="font-size: 18px; font-weight: 600; color: #333; margin-top: 12px;">Full Review Cycle</div>
              <div style="font-size: 14px; color: #666; margin-top: 4px;">Users review, inspect contradictions, and approve revisions in under thirty seconds.</div>
            </div>

            <div class="card" style="padding: 48px; border-left: 4px solid #2A9D8F;">
              <div style="font-size: 72px; font-weight: 700; letter-spacing: -0.04em; color: #2A9D8F; line-height: 1;">100%</div>
              <div style="font-size: 18px; font-weight: 600; color: #333; margin-top: 12px;">Source Verifiability</div>
              <div style="font-size: 14px; color: #666; margin-top: 4px;">Every drafted recommendation is grounded in verifiable customer citations.</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #E5E5E5; padding-top: 36px; margin-top: 40px;">
            <div style="font-family: 'Geist Mono', monospace; font-size: 13px; color: #555;">
              PROTOTYPE: temporary-brisk-agate-zgvse9l.vercel.app · CODE: github.com/Skn1999/ACTAI-SMART-EMAIL
            </div>
            <div style="font-family: 'Geist', sans-serif; font-size: 14px; font-weight: 500; color: #111;">
              Designed &amp; Engineered by Sumit Kumar
            </div>
          </div>
        </div>
      `;
    }
  }
];

function generateHTML() {
  const htmlDir = path.join(OUTPUT_DIR, 'html');
  if (!fs.existsSync(htmlDir)) fs.mkdirSync(htmlDir, { recursive: true });

  const files = [];
  for (const plate of plates) {
    const fullHtml = COMMON_HEAD + plate.render() + `</body></html>`;
    const filePath = path.join(htmlDir, `${plate.name}.html`);
    fs.writeFileSync(filePath, fullHtml);
    files.push({ name: plate.name, path: filePath, height: plate.height });
  }
  return files;
}

const generatedPlates = generateHTML();
console.log(`Generated ${generatedPlates.length} HTML templates in ${path.join(OUTPUT_DIR, 'html')}`);
