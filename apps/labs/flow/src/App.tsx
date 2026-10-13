import React from "react";
import { FlowExperience } from "./Experience";

export const App: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen">
      {/* Standalone Subdomain Header Pill */}
      <header className="fixed top-3 left-4 z-[70] pointer-events-auto flex items-center gap-2">
        <a
          href="https://skn1999.github.io/sumit-portfolio/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wide text-[#41413f] hover:text-[#030302] bg-[#ffffff]/85 hover:bg-[#ffffff] backdrop-blur-md shadow-xs transition-all group"
          title="Return to portfolio"
        >
          <span className="text-[#888886] group-hover:-translate-x-0.5 transition-transform">←</span>
          <span className="font-medium text-[#030302]">Check out my portfolio</span>
          <span className="text-[#888886]">/</span>
          <span>Tack</span>
        </a>
      </header>

      <FlowExperience />
    </main>
  );
};

export default App;
