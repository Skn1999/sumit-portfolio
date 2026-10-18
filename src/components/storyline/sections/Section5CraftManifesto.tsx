import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { InViewTextReveal } from "@/components/arc/text-reveal/in-view-text-reveal";
import { Stage5CraftManifesto } from "../stages/Stage5CraftManifesto";

const PARAGRAPH_CLASS =
  "leading-[1.5] sm:leading-[1.55] md:leading-[1.5] tracking-tight text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] xl:text-[1.75rem] font-normal text-ink-primary max-w-none";

export const Section5CraftManifesto: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center py-20 lg:py-0">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
        {/* Left Column: Pushed to the left */}
        <div className="lg:col-span-5 xl:col-span-4 pl-6 sm:px-10 lg:pl-14 xl:pl-20 pr-4 sm:pr-6">
          <div className="max-w-lg xl:max-w-xl">
            {/* Eyebrow index tag */}
            <div className="mb-6">
              <span className="font-mono text-xs tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
                // 05 CRAFT AS DIFFERENTIATOR
              </span>
            </div>

            {/* Paragraph 5 */}
            <InViewTextReveal
              as="p"
              text={
                "I care about working with fast-paced teams, who care about the craft as well as overall experience — [[craft:craft is the differentiator]]."
              }
              delay={0.05}
              className={PARAGRAPH_CLASS}
            />

            {/* Dual Pill Action Buttons */}
            <div className="pt-8 flex flex-wrap items-center gap-3 not-italic">
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-ink-primary text-paper-bg font-mono text-xs tracking-wider uppercase font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-160 ease-emil-out shadow-md"
              >
                <FileText className="w-3.5 h-3.5" />
                View Resume
              </Link>
              <a
                href="mailto:sknayyar.sk@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-paper-border bg-paper-card text-ink-primary font-mono text-xs tracking-wider lowercase font-semibold hover:border-ink-primary active:scale-[0.97] transition-all duration-160 ease-emil-out shadow-sm"
              >
                sknayyar.sk@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Full Viewport Height Stage Artifact */}
        <div className="lg:col-span-7 xl:col-span-8 min-h-[500px] lg:min-h-screen flex items-center justify-center p-6 lg:p-10 xl:p-16">
          <Stage5CraftManifesto isActive={true} />
        </div>
      </div>
    </section>
  );
};
