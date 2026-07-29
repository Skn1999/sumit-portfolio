import React from "react";
import { Layout } from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
import Contact, { Footer } from "@/components/Contact";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const UxDesignPage: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="UX Design & Interaction Architecture | Sumit Nayyar"
        description="UX Design showcase featuring human-centered interaction architecture, decision-support systems, and complex product refactoring."
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

          {/* Section 2: UX Design Projects Showcase Index */}
          <Projects />

          {/* Section 3: Contact & Footer */}
          <Contact />
          <Footer />
        </div>
      </motion.div>
    </Layout>
  );
};

export default UxDesignPage;
