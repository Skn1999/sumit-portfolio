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
  ArrowDown,
} from "lucide-react";

const tile = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.6 + i * 0.08 },
  }),
};

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { mode } = useMode();
  const isDesigner = mode === "designer";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="Hero"
      className="relative min-h-[100svh] flex flex-col justify-center py-20 md:py-28 overflow-hidden"
    >
      {/* ─── Masthead ─── */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-6 font-body"
        >
          Product Designer × Software Engineer
        </motion.div>

        {/* Giant name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.95] tracking-tight mb-4 ${
            isDesigner ? "font-designer" : "font-engineer"
          }`}
        >
          <span className={isDesigner ? "text-gradient-designer" : "text-gradient-engineer"}>
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
          className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 font-body"
        >
          Crafting delightful digital experiences at the intersection of design
          and engineering. A designer who sketches, writes, and moves.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap gap-4 mb-16 md:mb-20"
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
            className={`text-base px-8 rounded-xl ${
              isDesigner ? "neubrutalism-button" : ""
            }`}
          >
            <Link to="/resume">View Resume</Link>
          </MagneticButton>
        </motion.div>

        {/* ─── Bento Grid ─── */}
        <motion.div
          style={{ y: gridY }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]"
        >
          {/* ── Photo / Intro tile ── */}
          <motion.div
            custom={0}
            variants={tile}
            initial="hidden"
            animate="show"
            className="sm:col-span-2 row-span-2 neubrutalism-card bg-[hsl(var(--designer-primary))]/10 p-8 rounded-2xl flex flex-col justify-between overflow-hidden relative group"
          >
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[hsl(var(--designer-primary))] text-white rounded-full mb-4 font-body">
                Hello!
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-snug">
                I'm a designer
                <br />
                who sketches, writes,
                <br />
                and moves.
              </h3>
            </div>
            <p className="text-muted-foreground font-body mt-6 text-base leading-relaxed max-w-md">
              I believe the best design work comes from a life lived with
              curiosity. Whether I'm inking a portrait, writing an essay, or
              hanging from a bar — each practice sharpens how I see and solve
              problems.
            </p>
          </motion.div>

          {/* ── Ink Sketching tile ── */}
          <motion.div
            custom={1}
            variants={tile}
            initial="hidden"
            animate="show"
            className="sm:col-span-2 lg:col-span-2 neubrutalism-card bg-[hsl(var(--designer-surface))] p-6 rounded-2xl flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <Pen className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  Ink &amp; Paper
                </h3>
              </div>
              <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs">
                Pen sketching is my meditation. There's no undo — each stroke is
                a commitment. It's taught me to embrace imperfection and find
                beauty in deliberate marks.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.07] pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M10,80 Q30,10 50,50 T90,20" stroke="currentColor" fill="none" strokeWidth="2" />
                <path d="M20,90 Q40,30 60,60 T95,40" stroke="currentColor" fill="none" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="3" fill="currentColor" />
              </svg>
            </div>
          </motion.div>

          {/* ── Calisthenics tile ── */}
          <motion.div
            custom={2}
            variants={tile}
            initial="hidden"
            animate="show"
            className="lg:col-span-1 row-span-2 neubrutalism-card bg-[hsl(var(--designer-accent))]/10 p-6 rounded-2xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--designer-accent))]/20 flex items-center justify-center mb-4">
                <Dumbbell className="w-6 h-6 text-[hsl(var(--designer-accent))]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                Calisthenics
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                Bodyweight training grounds me in patience and progressive
                overload. Every skill — from a handstand to a muscle-up — is a
                design problem: break it into components, iterate, and trust the
                process.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Handstands", "Rings", "L-sits", "Muscle-ups"].map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs font-medium bg-[hsl(var(--designer-accent))]/10 text-[hsl(var(--designer-accent))] rounded-full font-body"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Writing / Substack tile ── */}
          <motion.div
            custom={3}
            variants={tile}
            initial="hidden"
            animate="show"
            className="lg:col-span-2 neubrutalism-card bg-[hsl(var(--designer-primary))]/5 p-6 rounded-2xl flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[hsl(var(--designer-primary))]/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[hsl(var(--designer-primary))]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      Writing
                    </h3>
                    <span className="text-xs text-muted-foreground font-body">
                      on Substack
                    </span>
                  </div>
                </div>
                <a
                  href="https://sumit6131.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--designer-primary))] hover:underline font-body group/link"
                >
                  Read
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-md">
                I write about design, technology, and the human experience. My
                publication is where half-formed thoughts become frameworks — a
                space for slow thinking in a fast world.
              </p>
            </div>
          </motion.div>

          {/* ── Hiking tile ── */}
          <motion.div
            custom={4}
            variants={tile}
            initial="hidden"
            animate="show"
            className="lg:col-span-1 neubrutalism-card bg-emerald-500/10 p-6 rounded-2xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-3">
                <Mountain className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                Trails &amp; Peaks
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                Hiking resets my default mode network. Some of my best design
                ideas arrive on the trail, not at the desk.
              </p>
            </div>
          </motion.div>

          {/* ── Quote tile ── */}
          <motion.div
            custom={5}
            variants={tile}
            initial="hidden"
            animate="show"
            className="sm:col-span-2 lg:col-span-2 neubrutalism-card bg-foreground/[0.03] p-6 rounded-2xl flex items-center group"
          >
            <blockquote className="font-heading text-lg md:text-xl text-foreground/80 italic leading-relaxed">
              "The details are not the details. They make the design."
              <footer className="mt-2 text-sm text-muted-foreground not-italic font-body">
                — Charles Eames
              </footer>
            </blockquote>
          </motion.div>
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
