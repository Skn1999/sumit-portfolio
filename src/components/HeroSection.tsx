import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const inkFadeVariant = {
    hidden: { opacity: 0, filter: "blur(8px)", y: 0 },
    visible: (customDelay: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay: customDelay,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      id="about"
      aria-label="Hero"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[60svh] md:min-h-[65svh] flex flex-col justify-center py-24 md:py-36 bg-paper-bg overflow-hidden"
    >
      {/* Dynamic Cursor Ambient Radial Aura */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 380px at ${mousePos.x}px ${mousePos.y}px, hsl(var(--paper-border)), transparent 70%)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-8 flex flex-col text-left">
            {/* Monospace tracking tag */}
            <motion.div
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="font-mono uppercase tracking-widest text-xs font-semibold text-ink-muted mb-6 flex items-center gap-2 flex-wrap"
            >
              <span>LOCATION: HELSINKI, FI // FOCUS:</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>HCI &amp; FRONTEND SYSTEMS</span>
            </motion.div>

            {/* Primary Display Title */}
            <motion.h1
              custom={0.25}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="font-display tracking-tighter font-bold text-4xl md:text-6xl text-ink-primary leading-[1.1] mb-8"
            >
              AI builds fast. <br /> I make sure it builds right.
            </motion.h1>

            {/* Primary Description Narrative */}
            <motion.p
              custom={0.4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="font-body-narrative leading-[1.8] text-base md:text-lg text-ink-muted max-w-2xl"
            >
              Hi, I'm Sumit. <br /> AI is the big boom, but costly when it
              fails. I oversee the design and dev process so your product keeps
              its human touch.
            </motion.p>

            {/* Action Button */}
            <motion.div
              custom={0.55}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="mt-8"
            >
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-paper-border bg-paper-card text-ink-primary font-mono text-xs tracking-wider uppercase font-semibold hover:border-ink-primary transition-all"
              >
                <FileText className="w-4 h-4" />
                View Resume
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Profile Image */}
          <motion.div
            custom={0.35}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={inkFadeVariant}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative overflow-hidden rounded-xl border border-paper-border bg-paper-card aspect-[3/4] w-full max-w-[280px] sm:max-w-[320px] lg:max-w-full">
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
