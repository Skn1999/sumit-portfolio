import React from "react";
import Experience from "./components/Experience";

export const App: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen bg-[#0B0B0A] text-[#E9E4D8]">
      {/* Standalone Lab HUD / Banner */}
      <header className="fixed top-4 right-4 z-[70] pointer-events-auto">
        <div className="px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase bg-[#0B0B0A]/80 border border-[#E9E4D8]/20 text-[#E9E4D8]/70 backdrop-blur-md">
          Lab Sandbox: Silo
        </div>
      </header>

      {/* Interactive Experience */}
      <Experience />
    </main>
  );
};

export default App;
