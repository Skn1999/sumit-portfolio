import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { Link } from "react-router-dom";
import MagneticButton from "./MagneticButton";
import {
  Pen,
  Dumbbell,
  Mountain,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { mode } = useMode();
  const isDesigner = mode === "designer";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Hero card transforms: shrinks and slides left as user scrolls
  const heroScale = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 1, 0.55]);
  const heroX = useTransform(scrollYProgress, [0, 0.4, 0.6], ["0%", "0%", "-38%"]);
  const heroY = useTransform(scrollYProgress, [0, 0.4, 0.6], ["0%", "0%", "-20%"]);
  const heroRadius = useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 0, 24]);

  // Bento tiles: fade/slide in from different directions
  const tilesOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const tile1X = useTransform(scrollYProgress, [0.35, 0.6], [80, 0]);
  const tile1Y = useTransform(scrollYProgress, [0.35, 0.6], [-60, 0]);
  const tile2X = useTransform(scrollYProgress, [0.4, 0.65], [100, 0]);
  const tile2Y = useTransform(scrollYProgress, [0.4, 0.65], [40, 0]);
  const tile3X = useTransform(scrollYProgress, [0.38, 0.62], [60, 0]);
  const tile3Y = useTransform(scrollYProgress, [0.38, 0.62], [80, 0]);
  const tile4X = useTransform(scrollYProgress, [0.42, 0.66], [120, 0]);
  const tile4Y = useTransform(scrollYProgress, [0.42, 0.66], [20, 0]);
  const tile5X = useTransform(scrollYProgress, [0.44, 0.68], [40, 0]);
  const tile5Y = useTransform(scrollYProgress, [0.44, 0.68], [100, 0]);

  // Scroll indicator fades out
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="Hero"
      className="relative"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
          {/* ─── Hero Card ─── */}
          <motion.div
            style={{
              scale: heroScale,
              x: heroX,
              y: heroY,
              borderRadius: heroRadius,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <div className="text-center max-w-3xl mx-auto px-6">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-6 font-body"
              >
                Product Designer × Software Engineer
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.95] tracking-tight mb-6 ${
                  isDesigner ? "font-designer" : "font-engineer"
                }`}
              >
                <span className={isDesigner ? "text-gradient-designer" : "text-gradient-engineer"}>
                  Sumit
                </span>{" "}
                <span className="text-foreground">Knayyar</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8 font-body"
              >
                Crafting delightful digital experiences at the intersection of
                design and engineering.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <MagneticButton
                  magneticStrength={0.35}
                  magneticRadius={120}
                  asChild
                  size="lg"
                  variant="default"
                  className={`text-base px-8 rounded-xl ${isDesigner ? "neubrutalism-button" : ""}`}
                >
                  <Link to="/#projects">See Projects</Link>
                </MagneticButton>

                <MagneticButton
                  magneticStrength={0.3}
                  magneticRadius={100}
                  asChild
                  size="lg"
                  variant="secondary"
                  className={`text-base px-8 rounded-xl ${isDesigner ? "neubrutalism-button" : ""}`}
                >
                  <Link to="/resume">View Resume</Link>
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>

          {/* ─── Bento Tiles (appear on scroll) ─── */}

          {/* Intro / Bio tile — top-right */}
          <motion.div
            style={{ opacity: tilesOpacity, x: tile1X, y: tile1Y }}
            className="absolute top-[8%] right-[4%] w-[40%] max-w-md neubrutalism-card bg-[hsl(var(--designer-primary))]/10 p-6 md:p-8 rounded-2xl hidden lg:flex flex-col justify-between z-10"
          >
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[hsl(var(--designer-primary))] text-white rounded-full mb-3 font-body">
                About
              </span>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground leading-snug mb-3">
                A designer who sketches, writes, and moves.
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                I believe the best design work comes from a life lived with
                curiosity. Each practice sharpens how I see and solve problems.
              </p>
            </div>
          </motion.div>

          {/* Ink Sketching tile — right-center */}
          <motion.div
            style={{ opacity: tilesOpacity, x: tile2X, y: tile2Y }}
            className="absolute top-[52%] right-[4%] w-[22%] max-w-xs neubrutalism-card bg-[hsl(var(--designer-surface))] p-5 rounded-2xl hidden lg:flex flex-col overflow-hidden relative z-10"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center">
                <Pen className="w-4 h-4 text-foreground" />
              </div>
              <h3 className="font-heading font-bold text-base text-foreground">
                Ink &amp; Paper
              </h3>
            </div>
            <p className="text-xs text-muted-foreground font-body leading-relaxed">
              No undo — each stroke is a commitment. Embracing imperfection in
              every mark.
            </p>
            <div className="absolute bottom-0 right-0 w-20 h-20 opacity-[0.07] pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M10,80 Q30,10 50,50 T90,20" stroke="currentColor" fill="none" strokeWidth="2" />
                <circle cx="50" cy="50" r="3" fill="currentColor" />
              </svg>
            </div>
          </motion.div>

          {/* Calisthenics tile — bottom-right */}
          <motion.div
            style={{ opacity: tilesOpacity, x: tile3X, y: tile3Y }}
            className="absolute bottom-[6%] right-[28%] w-[18%] max-w-xs neubrutalism-card bg-[hsl(var(--designer-accent))]/10 p-5 rounded-2xl hidden lg:flex flex-col z-10"
          >
            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--designer-accent))]/20 flex items-center justify-center mb-2">
              <Dumbbell className="w-5 h-5 text-[hsl(var(--designer-accent))]" />
            </div>
            <h3 className="font-heading font-bold text-base text-foreground mb-1">
              Calisthenics
            </h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {["Handstands", "Rings", "L-sits"].map((s) => (
                <span key={s} className="px-2 py-0.5 text-[10px] font-medium bg-[hsl(var(--designer-accent))]/10 text-[hsl(var(--designer-accent))] rounded-full font-body">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Substack / Writing tile — bottom-left-ish */}
          <motion.div
            style={{ opacity: tilesOpacity, x: tile4X, y: tile4Y }}
            className="absolute bottom-[6%] right-[4%] w-[22%] max-w-xs neubrutalism-card bg-[hsl(var(--designer-primary))]/5 p-5 rounded-2xl hidden lg:flex flex-col z-10"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-[hsl(var(--designer-primary))]/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[hsl(var(--designer-primary))]" />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground">
                  Writing
                </h3>
              </div>
              <a
                href="https://sumit6131.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-xs font-medium text-[hsl(var(--designer-primary))] hover:underline font-body group/link"
              >
                Read
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground font-body leading-relaxed">
              Where half-formed thoughts become frameworks — slow thinking in a
              fast world.
            </p>
          </motion.div>

          {/* Hiking tile — far bottom-right */}
          <motion.div
            style={{ opacity: tilesOpacity, x: tile5X, y: tile5Y }}
            className="absolute top-[52%] right-[28%] w-[18%] max-w-xs neubrutalism-card bg-emerald-500/10 p-5 rounded-2xl hidden lg:flex flex-col z-10"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center mb-2">
              <Mountain className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-heading font-bold text-base text-foreground mb-1">
              Trails &amp; Peaks
            </h3>
            <p className="text-xs text-muted-foreground font-body leading-relaxed">
              Best design ideas arrive on the trail, not at the desk.
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
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
      </div>
    </section>
  );
};

export default HeroSection;
