import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code2, Globe } from "lucide-react";

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
      role: "Design Engineer",
      organization: "Groundwork",
      location: "Remote",
      period: "2025 — Present",
      description:
        "Led design and strategy focused on accessibility in regulated digital products. Co-designed tools and workshops for disabled participants, translating regulatory requirements into actionable product practice. 2nd place award at EIT Jumpstarter (New European Bauhaus).",
    },
    {
      role: "Service Design Intern",
      organization: "Dedanext S.p.a",
      location: "Trento, Italy",
      period: "Mar 2024 — May 2024",
      description:
        "Conducted card-sorting and category ranking studies to map mental models for multi-stakeholder environmental platforms. Built and tested interface prototypes across 4 real-world interactive scenarios to measure human comprehension speed.",
    },
    {
      role: "Frontend Engineer (Core Systems)",
      organization: "Optmyzr Inc.",
      location: "Hyderabad, India",
      period: "May 2020 — July 2023",
      description:
        "Redesigned onboarding journey into a 3-step configuration wizard. Co-authored the core Design System React & TypeScript component library and optimized high-density data layouts for 10,000+ rows of analytical metrics.",
    },
  ];

  const education = [
    {
      degree: "Double-degree M.Sc. Human-Computer Interaction & Design",
      institutions: "Aalto University (Finland) | University of Trento (Italy)",
      period: "2023 — 2025",
      focus:
        "User-Centered Design, Interface Engineering, UI Construction, Usability Testing, Social Cognition, Digital Nudging, Participatory Design, Attention Computing.",
    },
  ];

  const skillGroups = [
    {
      title: "Core Methodologies",
      items: [
        "Data Schema Design",
        "Information Architecture",
        "React",
        "TypeScript",
        "Interaction Testing",
        "Usability Evaluation",
      ],
    },
    {
      title: "Design Skills",
      items: [
        "Figma",
        "Design Systems",
        "Component Architecture",
        "Prototyping",
        "WCAG",
        "Interaction Design",
      ],
    },
    {
      title: "Technical Stack",
      items: [
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
          {/* Left Column: Heading & Overview Description */}
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
              An overview of my credentials and skills, sourced directly from my official Design Engineer resume.
            </p>
          </motion.div>

          {/* Right Column: Experience, Education, Skills, Languages (Clean borderless layout) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            {/* 1. Experience */}
            <motion.div
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-paper-border">
                <Briefcase className="w-4 h-4 text-ink-muted" />
                <h3 className="font-mono text-xs tracking-widest uppercase font-semibold text-ink-primary">
                  1. Experience
                </h3>
              </div>

              <div className="flex flex-col gap-8 pl-4 border-l border-paper-border">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-display font-bold text-lg text-ink-primary">
                        {exp.role}{" "}
                        <span className="text-ink-muted font-normal">
                          @ {exp.organization} ({exp.location})
                        </span>
                      </h4>
                      <span className="font-mono text-xs text-ink-muted">
                        {exp.period}
                      </span>
                    </div>
                    <p className="font-body-narrative text-sm text-ink-muted leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 2. Education */}
            <motion.div
              custom={0.25}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-paper-border">
                <GraduationCap className="w-4 h-4 text-ink-muted" />
                <h3 className="font-mono text-xs tracking-widest uppercase font-semibold text-ink-primary">
                  2. Education
                </h3>
              </div>

              <div className="flex flex-col gap-6 pl-4 border-l border-paper-border">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-display font-bold text-lg text-ink-primary">
                        {edu.degree}
                      </h4>
                      <span className="font-mono text-xs text-ink-muted">
                        {edu.period}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-ink-muted font-medium">
                      {edu.institutions}
                    </p>
                    <p className="font-body-narrative text-sm text-ink-muted leading-relaxed">
                      {edu.focus}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. Skills */}
            <motion.div
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-paper-border">
                <Code2 className="w-4 h-4 text-ink-muted" />
                <h3 className="font-mono text-xs tracking-widest uppercase font-semibold text-ink-primary">
                  3. Skills
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skillGroups.map((group, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <h4 className="font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider">
                      {group.title}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="px-2 py-1 rounded border border-paper-border text-xs font-mono text-ink-primary"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 4. Languages */}
            <motion.div
              custom={0.4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inkFadeVariant}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-paper-border">
                <Globe className="w-4 h-4 text-ink-muted" />
                <h3 className="font-mono text-xs tracking-widest uppercase font-semibold text-ink-primary">
                  4. Languages
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {languages.map((lang, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5">
                    <span className="font-display font-bold text-base text-ink-primary">
                      {lang.name}
                    </span>
                    <span className="font-mono text-xs text-ink-muted">
                      {lang.level}
                    </span>
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
