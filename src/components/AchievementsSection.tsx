import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Award, Globe, Code2 } from "lucide-react";

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
      role: "Frontend Engineer / UX Architect",
      organization: "Optmyzr",
      period: "2021 — Present",
      description:
        "Led frontend architecture migration for enterprise analytics applications. Compressed load times from 8–10s to <1s while supporting multi-platform scaling.",
    },
    {
      role: "HCI & UX Research Collaborator",
      organization: "EDIAQI (EU Horizon Europe)",
      period: "2024 — 2025",
      description:
        "Architected Decision Support Systems translating multi-sensor indoor air quality telemetry into actionable, low-cognitive-load guidance for non-technical users.",
    },
    {
      role: "Double Master's Candidate in HCI",
      organization: "Aalto University (FI) & University of Trento (IT)",
      period: "2023 — 2025",
      description:
        "Specialized track in Human-Computer Interaction, behavioral ergonomics, interaction architecture, and ubiquitous computing ecosystems.",
    },
  ];

  const skillGroups = [
    {
      title: "Frontend Engineering",
      items: ["React", "TypeScript", "Redux Toolkit", "Vite", "Tailwind CSS", "Next.js", "Three.js / R3F"],
    },
    {
      title: "Design & Research",
      items: ["Interaction Design", "User Research", "Heuristic Evaluation", "Figma", "Information Architecture", "Service Design"],
    },
    {
      title: "System Architecture",
      items: ["Design Systems", "Component Engineering", "State Optimization", "API Integration", "AI Workflow Refactoring"],
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
              An overview of my credentials and skills. Sourced directly from my professional CV and academic track record.
            </p>
          </motion.div>

          {/* Right Column: Experience, Skills, Languages */}
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

              <div className="flex flex-col gap-6">
                {experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-paper-card border border-paper-border flex flex-col gap-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-display font-bold text-lg text-ink-primary">
                        {exp.role} <span className="text-ink-muted font-normal">@ {exp.organization}</span>
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

            {/* 2. Skills */}
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
                  2. Skills
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {skillGroups.map((group, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-paper-card border border-paper-border flex flex-col gap-3"
                  >
                    <h4 className="font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider">
                      {group.title}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="px-2.5 py-1 rounded bg-paper-bg text-ink-primary border border-paper-border text-xs font-mono"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. Languages */}
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
                  3. Languages
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-paper-card border border-paper-border flex flex-col gap-1"
                  >
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
