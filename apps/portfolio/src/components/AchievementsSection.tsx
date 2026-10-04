import React from "react";
import { motion } from "framer-motion";
import { Figma, User } from "lucide-react";

const AchievementsSection: React.FC = () => {
  const inkFadeVariant = {
    hidden: { opacity: 0, filter: "blur(6px)", y: 20 },
    visible: (customDelay: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay: customDelay,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const experiences = [
    {
      what: "UX & Accessibility Designer",
      where: "Groundwork",
      when: "June 2025 — Present",
    },
    {
      what: "Product Design",
      where: "Dedanext S.p.a (Trento, Italy)",
      when: "Mar 2026 — May 2026",
    },
    {
      what: "Design Engineer",
      where: "Optmyzr Inc. (Hyderabad, India)",
      when: "May 2020 — July 2024",
    },
  ];

  const skillGroups = [
    {
      category: "Design",
      technologies: [
        "Product Design",
        "User Research",
        "Interaction Design",
        "Information Architecture",
        "Accessibility (WCAG)",
        "Prototyping",
      ],
    },
    {
      category: "Research & Strategy",
      technologies: [
        "Usability Testing",
        "Workshop Facilitation",
        "Design Thinking",
        "Systems Thinking",
        "Participatory Design",
      ],
    },
    {
      category: "Technical Stack",
      technologies: [
        "Figma",
        "React",
        "TypeScript",
        "Next.js",
        "Node.js",
        "Design Tokens",
        "Git",
        "AI-Augmented Workflows",
      ],
    },
  ];

  const languages = [
    { name: "English", level: "Full Professional / Fluent" },
    { name: "Hindi", level: "Native / Bilingual" },
    { name: "Finnish", level: "Basic / Learning" },
  ];

  const resumePdfUrl = `${import.meta.env.BASE_URL}Resume-Product-Designer.pdf`;

  return (
    <section id="achievements" className="py-20 md:py-32 bg-paper-bg">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Section Heading */}
          <motion.div
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={inkFadeVariant}
            className="lg:col-span-4 flex flex-col"
          >
            <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-3">
              03 // CREDENTIALS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter mb-4">
              Achievements
            </h2>
            <p className="font-body-narrative text-base md:text-lg text-ink-muted leading-[1.8] mb-6">
              An overview of my credentials, skills, and background formatted
              for quick scanning.
            </p>
          </motion.div>

          {/* Right Column: Tightened Scannable Sub-sections */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* 1. Experience (3-Column Layout: What, Where, When) */}
            <motion.div
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="flex flex-col gap-3"
            >
              <h3 className="font-display text-lg font-bold text-ink-primary pb-1.5 border-b border-paper-border">
                Experience
              </h3>

              <div className="flex flex-col gap-1">
                {/* 3 Column Grid Header */}
                <div className="hidden sm:grid grid-cols-12 gap-4 font-mono text-[11px] text-ink-muted uppercase tracking-wider font-semibold pb-0.5">
                  <div className="col-span-5">What</div>
                  <div className="col-span-4">Where</div>
                  <div className="col-span-3 text-right">When</div>
                </div>

                {/* Rows */}
                {experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 py-1.5 border-b border-paper-border/60 items-baseline"
                  >
                    <div className="sm:col-span-5 font-body-narrative font-semibold text-sm text-ink-primary">
                      {exp.what}
                    </div>
                    <div className="sm:col-span-4 font-body-narrative text-xs text-ink-muted">
                      {exp.where}
                    </div>
                    <div className="sm:col-span-3 font-mono text-xs text-ink-muted sm:text-right">
                      {exp.when}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 2. Skills (2-Column Layout: Category & Technologies) */}
            <motion.div
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="flex flex-col gap-3"
            >
              <h3 className="font-display text-lg font-bold text-ink-primary pb-1.5 border-b border-paper-border">
                Skills
              </h3>

              <div className="flex flex-col gap-1">
                <div className="hidden sm:grid grid-cols-12 gap-4 font-mono text-[11px] text-ink-muted uppercase tracking-wider font-semibold pb-0.5">
                  <div className="col-span-4">Category</div>
                  <div className="col-span-8">Technologies</div>
                </div>

                {skillGroups.map((group, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 py-1.5 border-b border-paper-border/60 items-baseline"
                  >
                    <div className="sm:col-span-4 font-body-narrative font-semibold text-sm text-ink-primary">
                      {group.category}
                    </div>
                    <div className="sm:col-span-8 font-body-narrative text-xs text-ink-muted leading-relaxed">
                      {group.technologies.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. Languages (2-Column Layout: Language & Proficiency) */}
            <motion.div
              custom={0.35}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="flex flex-col gap-3"
            >
              <h3 className="font-display text-lg font-bold text-ink-primary pb-1.5 border-b border-paper-border">
                Languages
              </h3>

              <div className="flex flex-col gap-1">
                <div className="hidden sm:grid grid-cols-12 gap-4 font-mono text-[11px] text-ink-muted uppercase tracking-wider font-semibold pb-0.5">
                  <div className="col-span-6">Language</div>
                  <div className="col-span-6">Proficiency</div>
                </div>

                {languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 py-1.5 border-b border-paper-border/60 items-baseline"
                  >
                    <div className="sm:col-span-6 font-body-narrative font-semibold text-sm text-ink-primary">
                      {lang.name}
                    </div>
                    <div className="sm:col-span-6 font-body-narrative text-xs text-ink-muted">
                      {lang.level}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Bar Action: Open Curriculum Vitae */}
            <div className="flex justify-end pb-1.5">
              <a
                href={resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-ink-primary hover:text-ink-primary/70 uppercase tracking-widest font-semibold underline decoration-paper-border hover:decoration-ink-primary transition-all"
              >
                open curriculum vitae →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
