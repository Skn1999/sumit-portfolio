import React from "react";
import { FlowExperience } from "./Experience";

export const App: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen">
      {/* Standalone Subdomain Header Pill */}
      <header className="fixed top-3 left-4 z-[70] pointer-events-auto flex items-center gap-2">
        <a
          href="https://sumitknayyar.com"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wide text-[#41413f] hover:text-[#030302] bg-[#ffffff]/85 hover:bg-[#ffffff] backdrop-blur-md border border-[#e1e1e1] shadow-xs transition-all group"
          title="Return to Sumit Nayyar Portfolio"
        >
          <span className="text-[#888886] group-hover:-translate-x-0.5 transition-transform">←</span>
          <span className="font-medium text-[#030302]">Sumit Nayyar</span>
          <span className="text-[#888886]">/</span>
          <span>Labs</span>
        </a>
      </header>

      <FlowExperience />
    </main>
  );
};

export default App;
