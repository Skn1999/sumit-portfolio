import React from "react";
import { Layout } from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import SEO from "@/components/SEO";
import { Footer } from "@/components/Contact";
import { getProjectsBySubCategory } from "@/lib/projects";
import { motion } from "framer-motion";
import { ProjectIndexList } from "@/components/ProjectIndexList";
import ProductHuntBadge from "@/components/ProductHuntBadge";
import ActAiShowcase from "@/components/ActAiShowcase";

export const AiSideProjectsSection: React.FC = () => {
  // Query both ai-side-projects and ai-data for index listing
  const sideProjects = getProjectsBySubCategory("ai-side-projects");
  const aiDataProjects = getProjectsBySubCategory("ai-data");
  const combinedProjects = [...sideProjects, ...aiDataProjects];

  return (
    <section
      id="ai-side-projects"
      className="py-20 md:py-32 bg-paper-bg border-t border-paper-border"
    >
      {/* Anchor alias for legacy #ai-data links */}
      <span id="ai-data" className="sr-only" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-2">
            // AI &amp; SIDE PROJECTS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter">
            AI Side Projects &amp; Prototypes
          </h2>
          <p className="font-body-narrative text-base md:text-lg text-ink-muted mt-3 max-w-2xl">
            Human-in-the-loop AI workflows, autonomous system oversight, and interactive prototypes built with AI and Design principles.
          </p>
        </motion.div>

        {/* Flagship ActAI Feature Spotlight */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <ActAiShowcase />
        </motion.div>

        {/* Product Decision Tool Launch Badge */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-16 md:mb-20"
        >
          <ProductHuntBadge />
        </motion.div>

        {/* Minimalist Editorial Index List */}
        {combinedProjects.length > 0 && (
          <div>
            <h3 className="font-mono text-xs tracking-widest text-ink-muted uppercase mb-6">
              // ALL AI &amp; SYSTEM PROJECTS
            </h3>
            <ProjectIndexList projects={combinedProjects} categoryTag="AI &amp; DATA" />
          </div>
        )}
      </div>
    </section>
  );
};

export const FrontendEngineeringSection: React.FC = () => {
  const feProjects = getProjectsBySubCategory("frontend-engineering");

  return (
    <section
      id="frontend-engineering"
      className="py-20 md:py-32 bg-paper-bg border-t border-paper-border"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-2">
            // FRONT-END ARCHITECTURE
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter">
            Front-End Engineering &amp; Systems
          </h2>
          <p className="font-body-narrative text-base md:text-lg text-ink-muted mt-3 max-w-2xl">
            Bridging complex full-stack backends with performant, responsive
            React/TypeScript interfaces, WebGL 3D graphics, and design token
            systems.
          </p>
        </motion.div>

        {/* Minimalist Editorial Index List for Front-End Engineering */}
        <ProjectIndexList projects={feProjects} categoryTag="FRONT-END" />
      </div>
    </section>
  );
};

export const DesignEngineeringPage: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="Design Engineering &amp; Systems | Sumit Nayyar"
        description="AI LLM workflows, autonomous agent oversight, ActAI email delegation, and front-end React systems by Sumit Nayyar."
        path="/design-engineering"
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

          {/* Section 2: AI & Side Projects */}
          <AiSideProjectsSection />

          {/* Section 3: Front-End Systems */}
          <FrontendEngineeringSection />

          {/* Section 4: Footer */}
          <Footer />
        </div>
      </motion.div>
    </Layout>
  );
};

// Aliases for backwards compatibility
export const DataEngineeringPage = DesignEngineeringPage;
export const AiAndDataSection = AiSideProjectsSection;

export default DesignEngineeringPage;
