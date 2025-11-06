import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";

const makeMarquee = (text: string, repeat: number) =>
  Array.from({ length: repeat })
    .map(() => text)
    .join("  •  ");

const HeroRibbons: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { mode } = useMode();

  // Scroll progress for the section only
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Opposing horizontal motion for the two ribbons
  const xFront = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
  const xBack = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  // Fade ribbons as section leaves viewport
  const ribbonsOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Text content (clean, balanced)
  const lineText = useMemo(
    () => makeMarquee("SUMIT KNAYYAR", 16),
    []
  );

  const isDesigner = mode === "designer";
  const ribbonFont = isDesigner ? "font-designer" : "font-engineer";

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className="relative h-[100svh] overflow-hidden flex items-center justify-center bg-background"
    >
      {/* Photo centered */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[min(90vw,420px)] h-[min(90vw,420px)] md:w-[420px] md:h-[420px]"
      >
        <div className={`${isDesigner ? "neubrutalism-card" : "shadow-xl"} w-full h-full rounded-2xl overflow-hidden bg-card`}>
          <img
            src="/images/hero.jpg"
            alt="Portrait of Sumit Knayyar"
            loading="eager"
            className="w-full h-full object-cover select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Ribbons group with global fade */}
      <motion.div style={{ opacity: ribbonsOpacity }} className="absolute inset-0">
        {/* Back ribbon (behind photo) */}
        <motion.div
          style={{ x: xBack }}
          className={`absolute left-0 right-0 top-[38%] -rotate-[8deg] z-10 will-change-transform`}
          aria-hidden
        >
          <div
            className={`whitespace-nowrap ${ribbonFont} text-foreground/60 tracking-wide uppercase font-semibold`}
          >
            <span className="inline-block px-4 text-4xl md:text-6xl lg:text-7xl">
              {lineText}
            </span>
          </div>
        </motion.div>

        {/* Front ribbon (in front of photo) */}
        <motion.div
          style={{ x: xFront }}
          className={`absolute left-0 right-0 top-[58%] rotate-[9deg] z-30 will-change-transform`}
          aria-hidden
        >
          <div
            className={`whitespace-nowrap ${ribbonFont} text-foreground/80 tracking-wide uppercase font-bold`}
          >
            <span className="inline-block px-4 text-4xl md:text-6xl lg:text-7xl">
              {lineText}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Visually hidden H1 for SEO */}
      <h1 className="sr-only">Sumit Knayyar — Engineer and Designer Portfolio</h1>
    </section>
  );
};

export default HeroRibbons;
