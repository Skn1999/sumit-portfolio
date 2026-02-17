import { ModeProvider, useMode } from "@/contexts/ModeContext";
import ModeToggle from "@/components/ModeToggle";
import { Layout, Container } from "@/components/Layout";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import { motion } from "framer-motion";

const IndexContent = () => {
  const { mode } = useMode();

  return (
    <Layout>
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
