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
  FileText,
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

          {/* ── Design Portfolios tile (2col × 1row) ── */}
          <motion.div
            custom={6}
            variants={tile}
            initial="hidden"
            animate="show"
            className="sm:col-span-2 sm:col-start-2 neubrutalism-card bg-[hsl(var(--designer-surface))] p-5 rounded-2xl flex flex-col justify-between group"
          >
            <h3 className="font-heading font-bold text-sm text-foreground">
              Design Work
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <a
                href="/portfolio/file.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-foreground/[0.04] hover:bg-foreground/[0.08] transition-colors group/link"
              >
                <div className="w-9 h-9 rounded-lg bg-[hsl(var(--designer-primary))]/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[hsl(var(--designer-primary))]" />
                </div>
                <span className="text-xs font-medium text-foreground font-body flex items-center gap-0.5">
                  Portfolio
                  <ArrowUpRight className="w-3 h-3  transition-opacity" />
                </span>
              </a>
              <a
                href="https://www.behance.net/desman_designer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-foreground/[0.04] hover:bg-foreground/[0.08] transition-colors group/link"
              >
                <div className="w-9 h-9 rounded-lg bg-[#1769ff]/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-[#1769ff]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-foreground font-body flex items-center gap-0.5">
                  Behance
                  <ArrowUpRight className="w-3 h-3 transition-opacity" />
                </span>
              </a>
              <a
                href="https://dribbble.com/desman_designer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-foreground/[0.04] hover:bg-foreground/[0.08] transition-colors group/link"
              >
                <div className="w-9 h-9 rounded-lg bg-[#ea4c89]/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-[#ea4c89]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.81zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702C16.86 2.61 14.545 1.62 12 1.62c-.83 0-1.634.1-2.4.285v.146zm10.14 3.2c-.21.29-1.9 2.49-5.69 4.02.24.49.47.99.68 1.49.075.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.35-6.38z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-foreground font-body flex items-center gap-0.5">
                  Dribbble
                  <ArrowUpRight className="w-3 h-3 transition-opacity" />
                </span>
              </a>
            </div>
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
