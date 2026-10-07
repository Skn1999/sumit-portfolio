/**
 * Sample Gemini API Response Fixture
 * Model: models/gemini-flash-lite-latest (version: gemini-3.5-flash-lite)
 * Preserved for offline development, frontend styling, and zero-quota UI iterations.
 */

export const SAMPLE_GEMINI_RESPONSE = {
  candidates: [
    {
      content: {
        parts: [
          {
            text: `# Executive Briefing Dossier: Rive

**Prepared for:** Sumit Nayyar  
**Topic:** Rive Animation & Interactive Graphics Ecosystem (\`https://rive.app\`)  
**Classification:** Internal Executive Research  

---

## 📋 Executive Summary
Rive is a next-generation design and runtime tool that enables teams to create, control, and ship interactive animations across platforms. Unlike traditional video or Lottie-based workflows, Rive animations are built with a state machine framework, allowing them to react instantly to user input, data changes, and application logic in real-time. For product, engineering, and design workflows, Rive significantly reduces file sizes, eliminates heavy code overhead, and bridges the gap between static design and dynamic UI engineering.

---

## 🔍 Key Findings & Market Context
* **State Machines & Interactivity:** Rive moves beyond linear timelines by introducing visual state machines. Designers and developers can link animation states directly to variables, triggers, and user inputs (hover, click, typing) without writing custom animation logic.
* **Ultra-Lightweight Runtimes:** Rive files (\`.riv\`) are remarkably small in file size compared to GIFs, videos, or even Lottie JSONs. Open-source runtimes for iOS, Android, Web, Flutter, React Native, and desktop render graphics natively on the GPU using vector paths.
* **Performance & Memory Efficiency:** By rendering vectors natively and avoiding bitmap sequences, Rive drastically reduces memory footprints and CPU usage, making it ideal for mobile apps, embedded systems, and high-performance web interfaces.
* **Collaborative Ecosystem:** The platform supports real-time collaborative editing in the browser, akin to Figma, allowing seamless cross-functional handoffs between designers and software engineers.

---

## 💡 Strategic Implications & Recommended Next Steps
1. **Audit Current UI Animation Tech Debt:** Evaluate current projects utilizing heavy GIFs, MP4s, or complex Lottie setups to identify candidates for migration to Rive to improve load times and runtime performance.
2. **Run a Cross-Functional Proof of Concept (PoC):** Task a design-engineering pairing to build a micro-interaction (e.g., a dynamic button state, onboarding illustration, or data-driven dashboard widget) using Rive's state machine to test integration complexity within the existing tech stack.

---

## 🔗 Sources & References
* **Official Website & Documentation:** [Rive App](https://rive.app/?utm_source=docs&utm_medium=header_nav)
* **Community & Examples:** [Rive Community Showcase](https://rive.app/community)
* **Developer Documentation:** [Rive Runtimes Hub](https://rive.app/docs)`,
            thoughtSignature:
              'EmAKXgFpFH0TNcbPsbHMe1cnR9vRbUACpi4LuWyb/0ljhgHZ7ePeYQW1TdP/VN55ye/X0eb5X1tcBHcBNPKRT3fR9ZNeacl1Ep3iEA7OHL+C6KavoIjIQ5QXGx5wPhnH338=',
          },
        ],
        role: 'model',
      },
      finishReason: 'STOP',
      index: 0,
    },
  ],
  usageMetadata: {
    promptTokenCount: 185,
    candidatesTokenCount: 568,
    totalTokenCount: 753,
    promptTokensDetails: [
      {
        modality: 'TEXT',
        tokenCount: 185,
      },
    ],
    serviceTier: 'standard',
  },
  modelVersion: 'gemini-3.5-flash-lite',
  responseId: '4lLFatXpC-KBvdIPrJHYwA0',
};

export const SAMPLE_DOSSIER_TEXT =
  SAMPLE_GEMINI_RESPONSE.candidates[0].content.parts[0].text;
