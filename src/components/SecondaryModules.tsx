import React from "react";

export const ResearchLabs: React.FC = () => {
  const rows = [
    {
      arena: "Advanced Usability Engineering",
      methodology: "Heuristic Evaluation Protocols, Structural Cognitive Walkthroughs",
      artifact: "Formal UX Deficit Audits & System Architecture Map",
    },
    {
      arena: "Ubiquitous Computing Ecosystems",
      methodology: "Hardware-to-Interface Data Pipelines, Embedded Sensor Structuring",
      artifact: "Functional State Prototypes & Real-time Web Feeds",
    },
    {
      arena: "Experimental System Matrix",
      methodology: "Independent Variable Isolations, Quantitative Testing Frameworks",
      artifact: "Comprehensive Statistical Evaluation Protocol",
    },
  ];

  return (
    <div className="py-16 bg-background border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        <div className="mb-10">
          <span className="font-label text-xs tracking-widest text-slate-500 uppercase">ACADEMIC FOUNDATION</span>
          <h2 className="text-2xl md:text-4xl font-bold font-display text-foreground mt-2">
            Selected HCI & Systems Research Labs
          </h2>
        </div>

        <div className="overflow-x-auto w-full border border-border/40 rounded-xl bg-[hsl(var(--card))]">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-border/40">
                <th className="py-4 px-6 font-label text-xs font-semibold text-slate-500 uppercase">Lab Focus Arena</th>
                <th className="py-4 px-6 font-label text-xs font-semibold text-slate-500 uppercase">Foundational Methodology Evaluated</th>
                <th className="py-4 px-6 font-label text-xs font-semibold text-slate-500 uppercase">Applied Interface Artifact Built</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-b border-border/40 last:border-none hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                  <td className="py-5 px-6 font-display font-semibold text-sm md:text-base text-foreground leading-snug">{row.arena}</td>
                  <td className="py-5 px-6 font-body-narrative text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{row.methodology}</td>
                  <td className="py-5 px-6 font-engineer text-xs text-slate-600 dark:text-slate-400">{row.artifact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const ProductionSandbox: React.FC = () => {
  const sandboxes = [
    {
      title: "Rapid Frontend LLM Sandbox",
      description: "Structured interface testing optimized API request streams and real-time state synchronization models.",
    },
    {
      title: "Design System Component Tokens Engine",
      description: "An automated processing framework parsing design token layouts directly into hardcoded variable configurations.",
    },
  ];

  return (
    <div className="py-16 bg-background border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        <div className="mb-10">
          <span className="font-label text-xs tracking-widest text-slate-500 uppercase">EXPERIMENTS & PROTOTYPES</span>
          <h2 className="text-2xl md:text-4xl font-bold font-display text-foreground mt-2">
            The Production Sandbox
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sandboxes.map((sandbox, index) => (
            <div key={index} className="flex flex-col gap-3 p-6 rounded-xl border border-border/40 bg-[hsl(var(--card))]">
              <span className="font-label text-[10px] tracking-widest text-[hsl(var(--primary))] font-bold uppercase">Sandbox {index + 1}</span>
              <h3 className="text-lg md:text-xl font-bold font-display text-foreground">{sandbox.title}</h3>
              <p className="font-body-narrative text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{sandbox.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const LogisticsCleardown: React.FC = () => {
  return (
    <div className="py-16 bg-[hsl(var(--card))] border-t border-border/40">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="flex flex-col gap-4 border-b md:border-b-0 md:border-r border-border/40 pb-8 md:pb-0 md:pr-16">
            <span className="font-label text-xs tracking-widest text-slate-500 uppercase">CURRENT DEPLOYMENT STATUS</span>
            <p className="font-body-narrative text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Concluding Master's Thesis track at Aalto University. Ready for permanent on-site engineering team deployment in Helsinki.
            </p>
          </div>
          <div className="flex flex-col gap-4 pt-8 md:pt-0">
            <span className="font-label text-xs tracking-widest text-[hsl(var(--primary))] uppercase">WORK RIGHTS & LOGISTICS</span>
            <p className="font-body-narrative text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Possess immediate, valid Finnish work rights with post-study visa residency extension processing. Zero initial corporate visa sponsorship parameters required for onboarding loops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
