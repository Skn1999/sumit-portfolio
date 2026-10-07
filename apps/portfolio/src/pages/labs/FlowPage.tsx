import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { FlowExperience } from "@labs/flow";
import { ArrowLeft } from "lucide-react";

export const FlowPage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-background text-foreground">
      <SEO
        title="Tack: Spatial Corkboard & Autonomous Assistant — Labs | Sumit Nayyar"
        rawTitle
        description="For builders who think on paper, an interactive spatial canvas that lets you pin thoughts, even gather your things from Gmail, and then despatch tasks to an AI assistant"
        path="/labs/tack"
      />

      <div className="fixed top-5 left-5 z-[60] pointer-events-auto">
        <Link
          to="/labs"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-widest text-foreground/80 hover:text-foreground bg-background/60 hover:bg-background/90 backdrop-blur-md border border-border transition-all shadow-lg group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Labs</span>
        </Link>
      </div>

      <FlowExperience />
    </div>
  );
};

export default FlowPage;
