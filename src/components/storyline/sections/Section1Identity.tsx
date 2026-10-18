import React from "react";
import { HelsinkiSolarDial } from "@/components/HelsinkiSolarDial";
import { TextReveal } from "@/components/arc/text-reveal/text-reveal";
import { Stage1HybridIdentity } from "../stages/Stage1HybridIdentity";

const PARAGRAPH_CLASS =
  "leading-[1.5] sm:leading-[1.55] md:leading-[1.5] tracking-tight text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] xl:text-[1.75rem] font-normal text-ink-primary max-w-none";

export const Section1Identity: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center py-24 lg:py-0 border-b border-paper-border/20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
        {/* Left Column: Pushed to the left edge */}
        <div className="lg:col-span-5 xl:col-span-4 pl-6 sm:px-10 lg:pl-14 xl:pl-20 pr-4 sm:pr-6">
          <div className="max-w-lg xl:max-w-xl">
            {/* Header Title with Preston-style rotated sticker tag and UI Arc TextReveal */}
            <div className="relative mb-8 sm:mb-10 md:mb-12">
              <div className="relative inline-block">
                <TextReveal
                  as="h1"
                  text="Sumit Nayyar"
                  delay={0.1}
                  className="font-display tracking-tight font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] text-ink-primary leading-[0.95]"
                />
                {/* Rotated pill badge like Preston Booth reference - perched over top-right of Nayyar */}
                <span className="hidden sm:inline-block absolute -top-4 -right-2 sm:-top-5 sm:-right-4 border-2 border-emerald-500 bg-paper-card/90 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] sm:text-xs font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider -rotate-12 shadow-sm select-none pointer-events-none">
                  Design Engineer
                </span>
              </div>

              {/* Mobile badge */}
              <div className="sm:hidden mt-3">
                <span className="inline-block border border-emerald-500 bg-paper-card/90 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider -rotate-6">
                  Design Engineer
                </span>
              </div>

              {/* Sub-header status tag */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-widest text-ink-muted uppercase mt-5">
                <HelsinkiSolarDial direction="bottom" />
                <span className="hidden sm:inline-block">//</span>
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>OPEN FOR ROLES</span>
                </span>
              </div>
            </div>

            {/* Paragraph 1 */}
            <TextReveal
              as="p"
              text={
                "I'm a **Design Engineer** working at the intersection of cognitive science, design craft, and production code. Sometimes I get [[trilemma:identity crises]] and I keep switching between the three."
              }
              delay={0.3}
              className={PARAGRAPH_CLASS}
            />
          </div>
        </div>

        {/* Right Column: Full Viewport Height Stage Artifact */}
        <div className="lg:col-span-7 xl:col-span-8 min-h-[500px] lg:min-h-screen flex items-center justify-center p-6 lg:p-10 xl:p-16">
          <Stage1HybridIdentity />
        </div>
      </div>
    </section>
  );
};
