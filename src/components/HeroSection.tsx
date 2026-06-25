import React from "react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="Hero"
      className="relative min-h-[70svh] flex flex-col justify-center pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 w-full">
        {/* Monospace tracking tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-label uppercase tracking-widest text-[10px] md:text-xs font-semibold text-slate-500 mb-8"
        >
          LOC: HELSINKI, FI // SYSTEM STATE: IMMEDIATE ACCESSIBILITY
        </motion.div>

        {/* Primary Display Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-display tracking-tighter font-bold text-4xl md:text-7xl text-foreground leading-[1.1] max-w-4xl mb-10"
        >
          Sumit builds rigid code translation layers for data-dense user interfaces.
        </motion.h1>

        {/* Primary Description Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-body-narrative leading-[1.8] text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-3xl"
        >
          Re-aligning 4 years of production-level React and TypeScript enterprise development at Optmyzr with advanced human-computer interaction frameworks from Aalto University. Specialized in optimizing interface architecture, isolating domain state systems, and closing the translation gap between design primitives and production-ready applications.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
