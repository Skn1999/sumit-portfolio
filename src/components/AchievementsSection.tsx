import React from "react";
import { motion } from "framer-motion";

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
      what: "Design Engineer",
      where: "Groundwork (Remote)",
      when: "2025 — Present",
    },
    {
      what: "Service Design Intern",
      where: "Dedanext S.p.a (Trento, Italy)",
      when: "Mar 2024 — May 2024",
    },
    {
      what: "Frontend Engineer (Core Systems)",
      where: "Optmyzr Inc. (Hyderabad, India)",
      when: "May 2020 — July 2023",
    },
  ];

  const education = [
    {
      what: "Double-degree M.Sc. Human-Computer Interaction & Design",
      where: "Aalto University (FI) & University of Trento (IT)",
      when: "2023 — 2025",
    },
  ];

  const skillGroups = [
    {
      category: "Core Methodologies",
      technologies: [
        "Data Schema Design",
        "Information Architecture",
        "React",
        "TypeScript",
        "Interaction Testing",
        "Usability Evaluation",
      ],
    },
    {
      category: "Design Skills",
      technologies: [
        "Figma",
        "Design Systems",
        "Component Architecture",
        "Prototyping",
        "WCAG",
        "Interaction Design",
      ],
    },
    {
      category: "Technical Stack",
      technologies: [
        "React",
        "TypeScript",
        "JavaScript",
        "Next.js",
        "Node.js",
        "Design Tokens",
        "Git",
        "Claude AI",
      ],
    },
  ];

  const languages = [
    { name: "English", level: "Full Professional / Fluent" },
    { name: "Hindi", level: "Native / Bilingual" },
    { name: "Finnish", level: "Basic / Learning" },
  ];

  return (
    <section
      id="achievements"
      className="py-20 md:py-32 bg-paper-bg border-t border-paper-border"
    >
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
            <p className="font-body-narrative text-base md:text-lg text-ink-muted leading-relaxed">
              An overview of my credentials, skills, and background formatted for quick scanning.
            </p>
          </motion.div>

          {/* Right Column: Clean Scannable Sub-sections */}
          <div className="lg:col-span-8 flex flex-col gap-14">
            {/* 1. Experience (3-Column Layout: What, Where, When) */}
            <motion.div
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="flex flex-col gap-6"
            >
              <h3 className="font-display text-xl font-bold text-ink-primary pb-3 border-b border-paper-border">
                Experience
              </h3>

              <div className="flex flex-col gap-5">
                {/* 3 Column Grid Header */}
                <div className="hidden sm:grid grid-cols-12 gap-4 font-mono text-xs text-ink-muted uppercase tracking-wider font-semibold pb-1">
                  <div className="col-span-5">What</div>
                  <div className="col-span-4">Where</div>
                  <div className="col-span-3 text-right">When</div>
                </div>

                {/* Rows */}
                {experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 py-3 border-b border-paper-border/60 items-baseline"
                  >
                    <div className="sm:col-span-5 font-body-narrative font-semibold text-base text-ink-primary">
                      {exp.what}
                    </div>
                    <div className="sm:col-span-4 font-body-narrative text-sm text-ink-muted">
                      {exp.where}
                    </div>
                    <div className="sm:col-span-3 font-mono text-xs text-ink-muted sm:text-right">
                      {exp.when}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 2. Education (3-Column Layout: What, Where, When) */}
            <motion.div
              custom={0.25}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="flex flex-col gap-6"
            >
              <h3 className="font-display text-xl font-bold text-ink-primary pb-3 border-b border-paper-border">
                Education
              </h3>

              <div className="flex flex-col gap-5">
                <div className="hidden sm:grid grid-cols-12 gap-4 font-mono text-xs text-ink-muted uppercase tracking-wider font-semibold pb-1">
                  <div className="col-span-5">What</div>
                  <div className="col-span-4">Where</div>
                  <div className="col-span-3 text-right">When</div>
                </div>

                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 py-3 border-b border-paper-border/60 items-baseline"
                  >
                    <div className="sm:col-span-5 font-body-narrative font-semibold text-base text-ink-primary">
                      {edu.what}
                    </div>
                    <div className="sm:col-span-4 font-body-narrative text-sm text-ink-muted">
                      {edu.where}
                    </div>
                    <div className="sm:col-span-3 font-mono text-xs text-ink-muted sm:text-right">
                      {edu.when}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. Skills (2-Column Layout: Category & Technologies) */}
            <motion.div
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="flex flex-col gap-6"
            >
              <h3 className="font-display text-xl font-bold text-ink-primary pb-3 border-b border-paper-border">
                Skills
              </h3>

              <div className="flex flex-col gap-4">
                <div className="hidden sm:grid grid-cols-12 gap-4 font-mono text-xs text-ink-muted uppercase tracking-wider font-semibold pb-1">
                  <div className="col-span-4">Category</div>
                  <div className="col-span-8">Technologies</div>
                </div>

                {skillGroups.map((group, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 py-3 border-b border-paper-border/60 items-baseline"
                  >
                    <div className="sm:col-span-4 font-body-narrative font-semibold text-base text-ink-primary">
                      {group.category}
                    </div>
                    <div className="sm:col-span-8 font-body-narrative text-sm text-ink-muted leading-relaxed">
                      {group.technologies.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 4. Languages (2-Column Layout: Language & Proficiency) */}
            <motion.div
              custom={0.35}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="flex flex-col gap-6"
            >
              <h3 className="font-display text-xl font-bold text-ink-primary pb-3 border-b border-paper-border">
                Languages
              </h3>

              <div className="flex flex-col gap-4">
                <div className="hidden sm:grid grid-cols-12 gap-4 font-mono text-xs text-ink-muted uppercase tracking-wider font-semibold pb-1">
                  <div className="col-span-6">Language</div>
                  <div className="col-span-6">Proficiency</div>
                </div>

                {languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 py-3 border-b border-paper-border/60 items-baseline"
                  >
                    <div className="sm:col-span-6 font-body-narrative font-semibold text-base text-ink-primary">
                      {lang.name}
                    </div>
                    <div className="sm:col-span-6 font-body-narrative text-sm text-ink-muted">
                      {lang.level}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
