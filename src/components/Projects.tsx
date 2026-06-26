import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProjectImage } from "./ProjectImage";
import { getProjectBySlug } from "@/lib/projects";

const Projects = () => {
  const optmyzrProject = getProjectBySlug("optmyzr-dashboard-migration");
  const ediaqiProject = getProjectBySlug("ediaqi-decision-support-system");

  const cards = [
    {
      project: optmyzrProject,
      slug: "optmyzr-dashboard-migration",
      monospaceHeader: "PROJECT 01 // PRODUCTION SYSTEM MIGRATION",
      title: "Migrating Legacy Ad Analytics to a Config-Driven React Architecture",
      metricBanner: "Dashboard initialization compressed from 8–10 seconds to under 1 second across enterprise account lines, establishing a flexible design blueprint used for downstream corporate tool development.",
      skillTags: ["React", "TypeScript", "Redux Toolkit", "State Optimization", "Component Engineering"],
      imageSide: "right",
    },
    {
      project: ediaqiProject,
      slug: "ediaqi-decision-support-system",
      monospaceHeader: "PROJECT 02 // COGNITIVE WORKFLOW HCI",
      title: "Translating Scientific Environmental Complexity into Low-Cognitive-Load Interfaces",
      metricBanner: "Architected a progressive, multi-stakeholder user platform to render high-volume, messy environmental datasets actionable for non-technical research pipelines without performance lag.",
      skillTags: ["Interaction Architecture", "User Testing Systems", "Data Visualization", "HCI Research"],
      imageSide: "left",
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-32 bg-background border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 md:mb-24 px-4 lg:px-0">
          <span className="font-label text-xs tracking-widest text-slate-500 uppercase">Selected Projects</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground mt-2">
            Engineered Interfaces
          </h2>
        </div>

        {/* Stacked Project Cards */}
        <div className="flex flex-col gap-24 md:gap-36">
          {cards.map((card, index) => {
            if (!card.project) return null;

            const isImageRight = card.imageSide === "right";

            return (
              <motion.div
                key={card.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center px-4 lg:px-0"
              >
                {/* Text Content */}
                <div
                  className={`lg:col-span-5 flex flex-col gap-6 ${
                    isImageRight ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Monospace Header */}
                  <span className="font-label text-xs tracking-widest text-[hsl(var(--primary))] font-semibold">
                    {card.monospaceHeader}
                  </span>

                  {/* Title */}
                  <Link to={`/projects/${card.slug}`} className="group/title">
                    <h3 className="text-2xl md:text-4xl font-bold font-display text-foreground group-hover/title:text-[hsl(var(--primary))] transition-colors duration-300 leading-tight">
                      {card.title}
                    </h3>
                  </Link>

                  {/* Metric Banner */}
                  <div className="bg-[hsl(var(--card))] border-l-4 border-[hsl(var(--primary))] p-5 rounded-r-xl shadow-sm">
                    <p className="text-sm md:text-base font-body-narrative text-foreground/95 leading-relaxed">
                      {card.metricBanner}
                    </p>
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2">
                    {card.skillTags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2.5 py-1 rounded bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border border-border/60 text-xs font-semibold font-label tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View case study */}
                  <div className="pt-2">
                    <Link
                      to={`/projects/${card.slug}`}
                      className="inline-flex items-center gap-2 font-label text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))] hover:gap-3 transition-all duration-300"
                    >
                      View Case Study
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Cover Image Container */}
                <div
                  className={`lg:col-span-7 ${
                    isImageRight ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <Link to={`/projects/${card.slug}`} className="block group">
                    <div className="relative overflow-hidden rounded-xl border border-border/80 bg-[hsl(var(--card))] aspect-[16/10] shadow-md group-hover:border-[hsl(var(--primary))/0.6] transition-colors duration-300">
                      {card.project.cover && (
                        <ProjectImage
                          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                          project={card.slug}
                          image={card.project.cover}
                        />
                      )}
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
