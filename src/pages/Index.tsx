import { Layout, Container } from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AchievementsSection from "@/components/AchievementsSection";
import Contact, { UnsaidMoments, Footer } from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const IndexContent = () => {
  return (
    <Layout>
      <SEO
        title="Sumit Nayyar | Product Designer & Design Engineer"
        rawTitle
        description="Helsinki-based Product Designer and Behavioral Science Researcher, bridging HCI research and enterprise B2B SaaS execution."
        path="/"
        keywords={[
          "portfolio",
          "product designer",
          "design engineer",
          "UX architect",
          "UX Researcher",
          "React",
          "front-end engineer",
        ]}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <ScrollProgress />
        <div className="relative z-10 scroll-blur-content">
          {/* Section 1: Hero Section */}
          <HeroSection />

          {/* Section 2: About & AI Philosophy */}
          <AboutSection />

          {/* Section 3: Achievements */}
          <AchievementsSection />

          {/* Section 4: Contact */}
          <Contact />

          {/* <UnsaidMoments /> */}

          <Footer />
        </div>
      </motion.div>
    </Layout>
  );
};

const Index = () => {
  return <IndexContent />;
};

export default Index;
