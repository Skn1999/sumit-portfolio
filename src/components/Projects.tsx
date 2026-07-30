import React from "react";
import { motion } from "framer-motion";
import { getProjectsBySubCategory } from "@/lib/projects";
import { ProjectIndexList } from "./ProjectIndexList";

const Projects = () => {
  const uxProjects = getProjectsBySubCategory("ux-design");

  return (
    <section
      id="ux-design"
      className="relative pt-24 md:pt-36 bg-paper-bg border-t border-paper-border"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-2">
            // UX DESIGN & INTERACTION ARCHITECTURE
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter">
            User Experience Projects
          </h2>
          <p className="font-body-narrative text-base md:text-lg text-ink-muted mt-3 max-w-2xl">
            Human-centered interaction frameworks, accessibility standards, and
            participatory design research.
          </p>
        </motion.div>

        {/* Minimalist Editorial Index List */}
        <ProjectIndexList projects={uxProjects} categoryTag="UX DESIGN" />
      </div>
    </section>
  );
};

export default Projects;
