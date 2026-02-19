import { motion } from "framer-motion";
import { Pen, Dumbbell, Mountain, BookOpen, ArrowUpRight } from "lucide-react";

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
