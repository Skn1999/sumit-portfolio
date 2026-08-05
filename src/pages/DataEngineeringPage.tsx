import React from "react";
import { Layout } from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import SEO from "@/components/SEO";
import { Footer } from "@/components/Contact";
import { getProjectsBySubCategory } from "@/lib/projects";
import { motion } from "framer-motion";
import { ProjectIndexList } from "@/components/ProjectIndexList";

export const AiAndDataSection: React.FC = () => {
  const aiProjects = getProjectsBySubCategory("ai-data");

  return (
    <section
      id="ai-data"
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
            // DATA & AI SYSTEMS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter">
            AI &amp; Data Engineering
          </h2>
          <p className="font-body-narrative text-base md:text-lg text-ink-muted mt-3 max-w-2xl">
            Human-in-the-loop AI workflows, LLM prompt engineering, autonomous
            agent tool integrations, and real-time data pipelines.
          </p>
        </motion.div>

        {/* Minimalist Editorial Index List for AI & Data */}
        <ProjectIndexList projects={aiProjects} categoryTag="AI & DATA" />
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

const DataEngineeringPage: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="Data & Front-End Engineering | Sumit Nayyar"
        description="AI LLM workflows, prompt engineering, data pipelines, and front-end WebGL engineering by Sumit Nayyar."
        path="/data-engineering"
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

          {/* Section 3: Front-End Engineering Section */}
          <FrontendEngineeringSection />
          {/* Section 2: AI & Data Section */}
          <AiAndDataSection />

          {/* Section 4: Footer */}
          <Footer />
        </div>
      </motion.div>
    </Layout>
  );
};

export default DataEngineeringPage;
