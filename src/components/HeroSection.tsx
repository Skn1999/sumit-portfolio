import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import HeroParticleCanvas from "./HeroParticleCanvas";

// Module-level flag to ensure hero text only animates on initial site load
let heroTextHasAnimated = false;

const HeroSection: React.FC = () => {
  const location = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(!heroTextHasAnimated);

  useEffect(() => {
    heroTextHasAnimated = true;
  }, []);

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
        delay: isInitialRender ? customDelay : 0,
        duration: isInitialRender ? 0.8 : 0,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const textMotionProps = isInitialRender
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true },
      }
    : {
        initial: "visible",
        animate: "visible",
      };

  return (
    <section
      id="about"
      aria-label="Hero"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[60svh] md:min-h-[65svh] flex flex-col justify-between py-24 md:py-32 bg-paper-bg overflow-hidden pt-28"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content (Stays static across page transitions) */}
          <div className="lg:col-span-8 flex flex-col text-left">
            {/* Monospace tracking tag */}
            <motion.div
              custom={0.1}
              {...textMotionProps}
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
              {...textMotionProps}
              variants={inkFadeVariant}
              className="font-display tracking-tighter font-bold text-4xl md:text-6xl text-ink-primary leading-[1.1] mb-8"
            >
              AI builds fast. <br /> I make sure it builds right.
            </motion.h1>

            {/* Primary Description Narrative */}
            <motion.p
              custom={0.4}
              {...textMotionProps}
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
              {...textMotionProps}
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

          {/* Right Column: 3D Particle Canvas & Solidified Models (Re-triggers morph animation on route navigation) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-full aspect-[3/4]">
              <HeroParticleCanvas
                key={location.pathname + location.search}
                imagePath={`${import.meta.env.BASE_URL}images/about/hero.jpg`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Viewport Bottom Strip: Location Left / Availability Status Right */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 w-full relative z-10 pt-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[11px] tracking-widest text-ink-muted uppercase">
          <div className="flex items-center gap-2">
            <span>LOCATION: HELSINKI, FINLAND</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>STATUS: IMMEDIATE AVAILABILITY // OPEN FOR ROLES</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
