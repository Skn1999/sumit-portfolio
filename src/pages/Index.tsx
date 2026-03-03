import { ModeProvider, useMode } from "@/contexts/ModeContext";
import ModeToggle from "@/components/ModeToggle";
import { Layout, Container } from "@/components/Layout";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const IndexContent = () => {
  const { mode } = useMode();

  return (
    <Layout>
      <SEO
        title="Sumit Knayyar — Engineer & Designer"
        rawTitle
        description="Full-stack Engineer & UX Designer with 4+ years of experience crafting delightful digital experiences at the intersection of design and engineering."
        path="/"
        keywords={[
          "portfolio",
          "full-stack engineer",
          "UX designer",
          "HCI",
          "React",
          "product design",
        ]}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mode-transition relative mode-dependent-content"
      >
        <ScrollProgress />
        <div className="relative z-10">
          <Container>
            <HeroSection />
          </Container>

          {/* main sections */}
          <Container>
            <Projects />
          </Container>

          <Container>
            <Contact />
          </Container>
        </div>
      </motion.div>
    </Layout>
  );
};

const Index = () => {
  return <IndexContent />;
};

export default Index;
