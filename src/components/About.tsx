import { motion } from "framer-motion";
import {
  Pen,
  Dumbbell,
  Mountain,
  BookOpen,
  ArrowUpRight,
  FileText,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const tile = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const About = () => {
  return (
    <section id="about" className="py-24 md:px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Beyond the Screen
          </h2>
          <p className="mt-3 text-lg text-muted-foreground font-body max-w-xl">
            Design doesn't live in a vacuum — here's what fuels my perspective.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]"
        >
          {/* ── Intro tile ── */}
          <motion.div
            variants={tile}
            className="sm:col-span-2 row-span-2 neubrutalism-card bg-[hsl(var(--designer-primary))]/10 p-8 flex flex-col justify-between rounded-2xl group"
          >
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[hsl(var(--designer-primary))] text-white rounded-full mb-4 font-body">
                Hello!
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-snug">
                I'm Sumit — a designer
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
            variants={tile}
            className="sm:col-span-2 lg:col-span-2 row-span-1 neubrutalism-card bg-[hsl(var(--designer-surface))] p-6 rounded-2xl flex flex-col justify-between group overflow-hidden relative"
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
            {/* Decorative sketch lines */}
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.07] pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M10,80 Q30,10 50,50 T90,20"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                />
                <path
                  d="M20,90 Q40,30 60,60 T95,40"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.5"
                />
                <circle cx="50" cy="50" r="3" fill="currentColor" />
              </svg>
            </div>
          </motion.div>

          {/* ── Calisthenics tile ── */}
          <motion.div
            variants={tile}
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

          {/* ── Substack / Writing tile ── */}
          <motion.div
            variants={tile}
            className="lg:col-span-2 row-span-1 neubrutalism-card bg-[hsl(var(--designer-primary))]/5 p-6 rounded-2xl flex flex-col justify-between group"
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

          {/* ── Hiking / Outdoors tile ── */}
          <motion.div
            variants={tile}
            className="lg:col-span-1 row-span-1 neubrutalism-card bg-emerald-500/10 p-6 rounded-2xl flex flex-col justify-between group"
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

          {/* ── Design Portfolios tile ── */}
          <motion.div
            variants={tile}
            className="sm:col-span-2 lg:col-span-2 neubrutalism-card bg-[hsl(var(--designer-primary))]/5 p-6 rounded-2xl flex flex-col justify-between group"
          >
            <div className="mb-4">
              <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                Design Work
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                Selected UI &amp; visual design across platforms.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {/* Portfolio PDF */}
              <a
                href="/portfolio/file.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-foreground/[0.04] hover:bg-foreground/[0.08] transition-colors group/link"
              >
                <div className="w-10 h-10 rounded-xl bg-[hsl(var(--designer-primary))]/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[hsl(var(--designer-primary))]" />
                </div>
                <span className="text-xs font-medium text-foreground font-body flex items-center gap-1">
                  Portfolio
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </span>
              </a>
              {/* Behance */}
              <a
                href="https://www.behance.net/desman_designer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-foreground/[0.04] hover:bg-foreground/[0.08] transition-colors group/link"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1769ff]/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-[#1769ff]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-foreground font-body flex items-center gap-1">
                  Behance
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </span>
              </a>
              {/* Dribbble */}
              <a
                href="https://dribbble.com/desman_designer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-foreground/[0.04] hover:bg-foreground/[0.08] transition-colors group/link"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ea4c89]/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-[#ea4c89]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.81zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702C16.86 2.61 14.545 1.62 12 1.62c-.83 0-1.634.1-2.4.285v.146zm10.14 3.2c-.21.29-1.9 2.49-5.69 4.02.24.49.47.99.68 1.49.075.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.35-6.38z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-foreground font-body flex items-center gap-1">
                  Dribbble
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </span>
              </a>
            </div>
          </motion.div>

          {/* ── Philosophy / Quote tile ── */}
          <motion.div
            variants={tile}
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
    </section>
  );
};

export default About;
