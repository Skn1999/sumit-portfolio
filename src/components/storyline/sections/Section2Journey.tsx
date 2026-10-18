import React from "react";
import { InViewTextReveal } from "@/components/arc/text-reveal/in-view-text-reveal";
import { Stage2BoardingPass } from "../stages/Stage2BoardingPass";

const PARAGRAPH_CLASS =
  "leading-[1.5] sm:leading-[1.55] md:leading-[1.5] tracking-tight text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] xl:text-[1.75rem] font-normal text-ink-primary max-w-none";

export const Section2Journey: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center py-20 lg:py-0 border-b border-paper-border/20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
        {/* Left Column: Pushed to the left */}
        <div className="lg:col-span-5 xl:col-span-4 pl-6 sm:px-10 lg:pl-14 xl:pl-20 pr-4 sm:pr-6">
          <div className="max-w-lg xl:max-w-xl">
            {/* Eyebrow index tag */}
            <div className="mb-6">
              <span className="font-mono text-xs tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
                // 02 THE JOURNEY
              </span>
            </div>

            {/* Paragraph 2 */}
            <InViewTextReveal
              as="p"
              text={
                "After completing a Computer Science degree in India, I became obsessed with understanding the human mind behind the interface — why so much software feels frustrating or draining. That curiosity [[journey:brought me to Europe]] for a double Master's in HCI and Cognitive Science between [[aalto:Aalto University]] and the [[unitn:University of Trento]] — studying mental models and user-centric design."
              }
              delay={0.05}
              className={PARAGRAPH_CLASS}
            />
          </div>
        </div>

        {/* Right Column: Full Viewport Height Stage Artifact */}
        <div className="lg:col-span-7 xl:col-span-8 min-h-[500px] lg:min-h-screen flex items-center justify-center p-6 lg:p-10 xl:p-16">
          <Stage2BoardingPass isActive={true} />
        </div>
      </div>
    </section>
  );
};
