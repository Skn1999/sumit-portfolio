import React from "react";
import { Layout } from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import Contact, { Footer } from "@/components/Contact";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { getProjectsBySubCategory } from "@/lib/projects";
import { ProjectIndexList } from "@/components/ProjectIndexList";

export const VisualDesignProjects: React.FC = () => {
  const visualProjects = getProjectsBySubCategory("visual-design");

  return (
    <section
      id="visual-design"
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
            // VISUAL DESIGN & BRAND SYSTEMS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter">
            Visual Design Projects
          </h2>
          <p className="font-body-narrative text-base md:text-lg text-ink-muted mt-4 max-w-2xl">
            Selected visual design explorations, component design systems, and mobile UI/UX case studies.
          </p>
        </motion.div>

        {/* Minimalist Editorial Index List for Visual Design */}
        <ProjectIndexList projects={visualProjects} categoryTag="VISUAL" />
      </div>
    </section>
  );
};

const VisualDesignPage: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="Visual Design & Design Systems | Sumit Nayyar"
        description="Visual design case studies, design system engineering, and Behance project portfolio by Sumit Nayyar."
        path="/visual-design"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="relative z-10 scroll-blur-content">
          {/* Section 1: Hero Section */}
          <HeroSection />

          {/* Section 2: Visual Design Projects Showcase */}
          <VisualDesignProjects />

          {/* Section 3: Contact & Footer */}
          <Contact />
          <Footer />
        </div>
      </motion.div>
    </Layout>
  );
};

export default VisualDesignPage;
