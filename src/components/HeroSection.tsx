import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { Link } from "react-router-dom";
import MagneticButton from "./MagneticButton";
import { Button } from "./ui/button";
import HeroPhoto from "./HeroPhoto";
// SwirlText removed for now per Phase 2 tweaks

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { mode } = useMode();
  const isDesigner = mode === "designer";

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for content sections
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const photoY = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const photoOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  // Swirl text removed: keeping parallax only

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className="relative min-h-[100svh] overflow-hidden flex items-center justify-center py-20 md:py-0"
    >
      {/* Background decorative swirls removed for now */}

      {/* Two-column layout */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Content */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-20 order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4"
            >
              Product Designer × Software Engineer
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            >
              <span className={isDesigner ? "font-designer" : "font-engineer"}>
                Hi, I'm{" "}
                <span
                  className={
                    isDesigner
                      ? "text-gradient-designer"
                      : "text-gradient-engineer"
                  }
                >
                  Sumit
                </span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed"
            >
              I craft delightful digital experiences at the intersection of
              design and engineering. Building products that users love and
              systems that scale.
            </motion.p>

            {/* CTA with magnetic effect (single primary button) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton
                magneticStrength={0.35}
                magneticRadius={120}
                asChild
                size="lg"
                variant="default"
                className={`text-base px-8 rounded-xl ${
                  isDesigner ? "neubrutalism-button" : ""
                }`}
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
                  isDesigner
                    ? "neubrutalism-button"
                    : "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
                }`}
              >
                <a
                  href={`${import.meta.env.BASE_URL}portfolio/file.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Portfolio
                </a>
              </MagneticButton>
            </motion.div>

            {/* Stats or quick facts */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-border"
            >
              <div>
                <div className="text-3xl font-bold mb-1">5+</div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">20+</div>
                <div className="text-sm text-muted-foreground">
                  Projects Delivered
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">∞</div>
                <div className="text-sm text-muted-foreground">
                  Problems Solved
                </div>
              </div>
            </motion.div> */}
          </motion.div>

          {/* Right column - Photo with 3D effects */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] order-1 lg:order-2">
            <motion.div
              style={{ y: photoY, scale: photoScale, opacity: photoOpacity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <HeroPhoto />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
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
