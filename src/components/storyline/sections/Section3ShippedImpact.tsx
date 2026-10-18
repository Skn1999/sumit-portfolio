import React from "react";
import { InViewTextReveal } from "@/components/arc/text-reveal/in-view-text-reveal";
import { Stage3JitterSwirl } from "../stages/Stage3JitterSwirl";

const PARAGRAPH_CLASS =
  "leading-[1.5] sm:leading-[1.55] md:leading-[1.5] tracking-tight text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] xl:text-[1.75rem] font-normal text-ink-primary max-w-none";

export const Section3ShippedImpact: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center py-20 lg:py-0 border-b border-paper-border/20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
        {/* Left Column: Pushed to the left */}
        <div className="lg:col-span-5 xl:col-span-4 pl-6 sm:px-10 lg:pl-14 xl:pl-20 pr-4 sm:pr-6">
          <div className="max-w-lg xl:max-w-xl">
            {/* Eyebrow index tag */}
            <div className="mb-6">
              <span className="font-mono text-xs tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
                // 03 SHIPPED IMPACT
              </span>
            </div>

            {/* Paragraph 3 */}
            <InViewTextReveal
              as="p"
              text={
                "Over the past several years, I've brought that combination of human insight and frontend systems to high-impact products: spending 4+ years as a design engineer at [[optmyzr:Optmyzr]] scaling core analytics across 10,000+ accounts, researching semi-ambient sensor interfaces with 200+ users at [[dedanext:Dedanext]] in Italy, and co-founded [[groundwork:Groundwork]] in Finland to turn accessibility regulations into practical tools [[eit-jumpstarter:(awarded 2nd place at the EIT Jumpstarter Grand Final)]]."
              }
              delay={0.05}
              className={PARAGRAPH_CLASS}
            />
          </div>
        </div>

        {/* Right Column: Full Viewport Height Stage Artifact */}
        <div className="lg:col-span-7 xl:col-span-8 min-h-[500px] lg:min-h-screen flex items-center justify-center p-6 lg:p-10 xl:p-16">
          <Stage3JitterSwirl isActive={true} />
        </div>
      </div>
    </section>
  );
};
