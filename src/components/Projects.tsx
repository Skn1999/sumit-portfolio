import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ProjectImage } from "./ProjectImage";
import { getProjectBySlug } from "@/lib/projects";

const Projects = () => {
  const optmyzrProject = getProjectBySlug("optmyzr-dashboard-migration");
  const ediaqiProject = getProjectBySlug("ediaqi-decision-support-system");
  const superEgoProject = getProjectBySlug("super-ego-app");

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const projectsData = [
    {
      index: "01",
      label: "01 // OPTMYZR",
      slug: "optmyzr-dashboard-migration",
      title: "Migrating Legacy Analytics with Config-Driven React & AI Refactoring",
      metricBanner: "Compressed load times from 8–10s to <1s while building human-in-the-loop AI refactoring scripts to safely convert thousands of legacy templates without breaking production logic.",
      tags: ["React", "TypeScript", "AI Refactoring", "System Architecture"],
      cover: optmyzrProject?.cover,
    },
    {
      index: "02",
      label: "02 // EDIAQI",
      slug: "ediaqi-decision-support-system",
      title: "Translating Scientific Environmental Complexity into Low-Cognitive-Load Interfaces",
      metricBanner: "Architected a progressive decision-support interface that bridges complex environmental data models with intuitive human workflows, preventing cognitive overload for non-technical researchers.",
      tags: ["Interaction Architecture", "Data Visualization", "HCI Research"],
      cover: ediaqiProject?.cover,
    },
    {
      index: "03",
      label: "03 // YOU (SUPEREGO)",
      slug: "super-ego-app",
      title: "YOU (SuperEgo) — OS-Level Assistant for Preconscious Habit Alignment",
      metricBanner: "Designed a human-first behavioral nudge assistant that interprets passive telemetry into subtle, ethical interface interactions that prioritize user agency over algorithmic intrusion.",
      tags: ["Behavioral Design", "Interaction Logic", "Social Psychology"],
      cover: superEgoProject?.cover,
    },
  ];

  return (
    <section
      id="projects"
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-36 bg-paper-bg border-t border-paper-border"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-2">
            Selected Projects // Engineered Systems &amp; Product Oversight
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter">
            Editorial Project Showcase
          </h2>
        </div>

        {/* Floating Paper Image Preview Card on Desktop Hover */}
        <AnimatePresence>
          {hoveredIndex !== null && projectsData[hoveredIndex]?.cover && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mousePos.x + 24,
                y: mousePos.y - 120,
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
              className="pointer-events-none absolute z-50 w-[360px] aspect-[16/10] bg-paper-card p-2 rounded-xl border border-paper-border shadow-xl overflow-hidden hidden lg:block"
              style={{
                left: 0,
                top: 0,
              }}
            >
              <ProjectImage
                project={projectsData[hoveredIndex].slug}
                image={projectsData[hoveredIndex].cover!}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimalist Editorial Index List */}
        <div className="flex flex-col border-b border-paper-border">
          {projectsData.map((project, index) => (
            <article
              key={project.slug}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="border-t border-paper-border py-8 md:py-12 group transition-colors duration-300 hover:bg-paper-card/40"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Index & Monospace Tag */}
                <div className="lg:col-span-3 flex items-center justify-between lg:flex-col lg:items-start gap-2">
                  <span className="font-mono text-xs font-semibold tracking-widest text-ink-muted uppercase">
                    {project.label}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-paper-card text-ink-muted border border-paper-border text-[10px] font-mono tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title & Narrative Metric Banner */}
                <div className="lg:col-span-9 flex flex-col gap-4">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group/link flex items-start justify-between gap-4"
                  >
                    <h3 className="text-xl md:text-3xl font-bold font-display text-ink-primary group-hover/link:text-ink-primary/70 transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 shrink-0 text-ink-muted group-hover/link:text-ink-primary transition-colors" />
                  </Link>

                  <p className="text-sm md:text-base font-body-narrative text-ink-muted leading-relaxed">
                    {project.metricBanner}
                  </p>

                  {/* Static Image Thumbnail on Mobile / Tablet */}
                  {project.cover && (
                    <div className="block lg:hidden mt-2 rounded-xl border border-paper-border bg-paper-card p-1 overflow-hidden aspect-[16/10]">
                      <ProjectImage
                        project={project.slug}
                        image={project.cover}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
