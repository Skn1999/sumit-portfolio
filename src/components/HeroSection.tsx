import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import DotGridBackground from "./DotGridBackground";
import MagneticButton from "./MagneticButton";

const HeroSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <section
      id="about"
      aria-label="Hero"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[60svh] md:min-h-[65svh] flex flex-col justify-center py-16 md:py-24 mt-6 md:mt-10 lg:mt-12 rounded-[24px] bg-primary/[0.02] dark:bg-primary/[0.03] border border-primary/[0.05] dark:border-primary/[0.08] overflow-hidden"
    >
      {/* Interactive Dot Grid Background */}
      <DotGridBackground />

      {/* Dynamic Cursor Aura / Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.08), transparent 70%)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Monospace tracking tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-label uppercase tracking-widest text-[10px] md:text-xs font-semibold text-slate-500 mb-6 flex items-center gap-2 flex-wrap"
            >
              <span>LOCATION: HELSINKI, FI // FOCUS:</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>HUMAN-IN-THE-LOOP AI & SYSTEM OVERSIGHT</span>
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
              className="font-display tracking-tighter font-bold text-4xl md:text-6xl text-foreground leading-[1.1] mb-8"
            >
              AI builds fast. <br /> I make sure it builds right.
            </motion.h1>

            {/* Primary Description Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-body-narrative leading-[1.8] text-base md:text-lg text-slate-500 dark:text-slate-400"
            >
              Hi, I'm Sumit. AI is the big boom, but costly when it fails. I
              oversee the design and dev process so your product keeps its human
              touch.
            </motion.p>

            {/* View Resume Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8"
            >
              <MagneticButton
                size="lg"
                variant="outline"
                className="font-label text-xs tracking-wider uppercase font-semibold border-border/80 hover:border-primary/50"
                asChild
              >
                <Link to="/resume" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  View Resume
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative overflow-hidden rounded-xl border border-border/85 bg-[hsl(var(--card))] aspect-[3/4] w-full max-w-[280px] sm:max-w-[320px] lg:max-w-full shadow-md">
              <img
                src={`${import.meta.env.BASE_URL}images/about/hero.jpg`}
                alt="Sumit profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
