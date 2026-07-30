import React from "react";
import { Layout } from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
import { VisualDesignProjects } from "./VisualDesignPage";
import Contact, { Footer } from "@/components/Contact";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const UxDesignPage: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="Design Portfolio | UX & Visual Design | Sumit Nayyar"
        description="Design portfolio featuring UX design, human-centered interaction architecture, decision-support systems, visual design, and brand design systems."
        path="/ux-design"
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

          {/* Section 2: User Experience Projects Showcase */}
          <div id="user-experience">
            <Projects />
          </div>

          {/* Section 3: Visual Design Projects Showcase */}
          <VisualDesignProjects />

          {/* Section 4: Contact & Footer */}
          <Contact />
          <Footer />
        </div>
      </motion.div>
    </Layout>
  );
};

export default UxDesignPage;
