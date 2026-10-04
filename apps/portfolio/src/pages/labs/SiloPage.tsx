import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { SiloExperience } from "@labs/silo";
import { ArrowLeft } from "lucide-react";

export const SiloPage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#0B0B0A] text-[#E9E4D8]">
      <SEO
        title="Silo: The Subterranean Spiral | Apple TV+ Interactive Experience — Labs | Sumit Nayyar"
        rawTitle
        description="An interactive architectural cross-section of the 144-level subterranean silo from the Apple TV+ series Silo. Built with 2D canvas particles, double-buffer line-to-photo crossfades, and VisionOS frosted glass HUD."
        path="/labs/silo"
      />

      {/* Floating Exit Pill: Back to Labs */}
      <div className="fixed top-5 left-5 z-[60] pointer-events-auto">
        <Link
          to="/labs"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-widest text-[#E9E4D8]/80 hover:text-[#E9E4D8] bg-[#0B0B0A]/60 hover:bg-[#0B0B0A]/90 backdrop-blur-md border border-[rgba(233,228,216,0.18)] hover:border-[#E8A64A] transition-all shadow-lg group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Labs</span>
        </Link>
      </div>

      {/* Full-Screen Interactive Silo Experience */}
      <SiloExperience />
    </div>
  );
};

export default SiloPage;
