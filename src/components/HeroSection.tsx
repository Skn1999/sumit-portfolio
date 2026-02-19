import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { Link } from "react-router-dom";
import MagneticButton from "./MagneticButton";
import { Pen, Dumbbell, Mountain, BookOpen, ArrowUpRight } from "lucide-react";

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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]"
        >
          {/* ── Portrait tile (1col × 2rows) ── */}
          <motion.div
            custom={0}
            variants={tile}
            initial="hidden"
            animate="show"
            className="row-span-2 neubrutalism-card rounded-2xl overflow-hidden relative group"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/about/side-profile.jpg`}
              alt="Sumit Knayyar"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="relative z-10 p-6 flex flex-col justify-end h-full">
              <span className="inline-block w-fit px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[hsl(var(--designer-primary))] text-white rounded-full mb-3 font-body">
                Hello!
              </span>
              <h3 className="font-heading font-bold text-lg text-white leading-snug">
                That's me →
              </h3>
            </div>
          </motion.div>

          {/* ── Bio / Quote tile (2col × 1row) ── */}
          <motion.div
            custom={1}
            variants={tile}
            initial="hidden"
            animate="show"
            className="sm:col-span-2 neubrutalism-card bg-foreground/[0.03] p-8 rounded-2xl flex flex-col justify-center group"
          >
            <blockquote className="font-heading text-xl md:text-2xl text-foreground/90 italic leading-relaxed">
              "The real problem with the interface is that it is an interface."
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground font-body leading-relaxed">
              — Don Norman, <i>Our beloved design guru</i>
            </p>
          </motion.div>

          {/* ── Ink Sketching tile (1col × 1row) ── */}
          <motion.div
            custom={2}
            variants={tile}
            initial="hidden"
            animate="show"
            className="neubrutalism-card rounded-2xl overflow-hidden relative group"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/about/sketching.jpg`}
              alt="Ink pen sketch by Sumit"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 p-5 flex flex-col justify-end h-full">
              <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                <Pen className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-heading font-bold text-sm text-white">
                Ink &amp; Paper
              </h3>
            </div>
          </motion.div>

          {/* ── Writing / Substack tile (1col × 1row) ── */}
          <motion.div
            custom={3}
            variants={tile}
            initial="hidden"
            animate="show"
            className="neubrutalism-card bg-[hsl(var(--designer-primary))] p-5 rounded-2xl flex flex-col justify-between group overflow-hidden relative"
          >
            {/* Decorative Substack-style accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-[3rem]" />
            <div>
              <img
                src={`${import.meta.env.BASE_URL}images/about/unsaid-moments-banner.png`}
                alt="Unsaid Moments"
                className="h-8 w-auto object-contain mb-2 rounded overflow-hidden"
              />
              <p className="text-xs text-white/75 font-body leading-relaxed">
                Essays on friendships, family &amp; love when they're not
                Instagram-perfect.
              </p>
            </div>
            <a
              href="https://sumit6131.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white text-[hsl(var(--designer-primary))] rounded-lg hover:bg-white/90 transition-colors font-body group/link mt-auto w-fit"
            >
              Read on Substack
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* ── Calisthenics tile (1col × 1row) ── */}
          <motion.div
            custom={4}
            variants={tile}
            initial="hidden"
            animate="show"
            className="neubrutalism-card rounded-2xl overflow-hidden relative group"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/about/running.jpg`}
              alt="Sumit doing calisthenics"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 p-5 flex flex-col justify-end h-full">
              <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-heading font-bold text-sm text-white">
                Calisthenics
              </h3>
            </div>
          </motion.div>

          {/* ── Hiking tile (1col × 1row) ── */}
          <motion.div
            custom={5}
            variants={tile}
            initial="hidden"
            animate="show"
            className="neubrutalism-card rounded-2xl overflow-hidden relative group"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/about/hiking.jpg`}
              alt="Sumit hiking on a mountain trail"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 p-5 flex flex-col justify-end h-full">
              <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                <Mountain className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-heading font-bold text-sm text-white">
                Trails &amp; Peaks
              </h3>
            </div>
          </motion.div>

          {/* ── CTA tile (1col × 1row) ── */}
          {/* <motion.div
            custom={6}
            variants={tile}
            initial="hidden"
            animate="show"
            className="neubrutalism-card bg-[hsl(var(--designer-primary))] p-5 rounded-2xl flex flex-col items-center justify-center text-center group"
          >
            <h3 className="font-heading font-bold text-lg text-white mb-3">
              See my work
            </h3>
            <Link
              to="/#projects"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-white text-[hsl(var(--designer-primary))] rounded-xl hover:bg-white/90 transition-colors font-body"
            >
              Projects
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div> */}
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
