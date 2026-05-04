import React from "react";
import { motion } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { Link } from "react-router-dom";
import MagneticButton from "./MagneticButton";

const HeroSection: React.FC = () => {
  const { mode } = useMode();

  const isDesigner = mode === "designer";

  return (
    <section
      id="about"
      aria-label="Hero"
      className="relative min-h-[100svh] flex flex-col justify-center py-12 md:py-20 overflow-hidden"
    >
      {/* ─── Masthead ─── */}
      <div className="container px-3 mx-auto relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-6 font-body text-center"
        >
          Product Designer × Software Engineer
        </motion.div>

        {/* Giant name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.95] tracking-tight mb-4 text-center ${
            isDesigner ? "font-designer" : "font-engineer"
          }`}
        >
          <span
            className={
              isDesigner ? "text-gradient-designer" : "text-gradient-engineer"
            }
          >
            Sumit
          </span>
          <br />
          <span className="text-foreground">Knayyar</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8 font-body"
        >
          Crafting delightful digital experiences at the intersection of design
          and engineering. A designer who sketches, writes, and moves.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-10 md:mb-20"
        >
          <MagneticButton
            magneticStrength={0.35}
            magneticRadius={120}
            asChild
            size="lg"
            variant="default"
            className={`text-base px-8 rounded-xl ${mode === "designer" ? "neubrutalism-button" : ""}`}
          >
            <Link to="/#projects">See Projects</Link>
          </MagneticButton>

          <MagneticButton
            magneticStrength={0.3}
            magneticRadius={100}
            asChild
            size="lg"
            variant="secondary"
            className={`text-base px-8 rounded-xl ${
              mode === "designer" ? "neubrutalism-button" : ""
            }`}
          >
            <Link to="/resume">View Resume</Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
