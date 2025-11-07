import { ModeProvider, useMode } from "@/contexts/ModeContext";
import ModeToggle from "@/components/ModeToggle";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import FloatingShapes3D from "@/components/FloatingShapes3D";
import HeroRibbons from "@/components/HeroRibbons";
import ScrollProgress from "@/components/ScrollProgress";
import { motion } from "framer-motion";
import HeroWithSwirls from "@/components/HeroWithSwirls";

const IndexContent = () => {
  const { mode } = useMode();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen mode-transition relative mode-dependent-content"
    >
      <ScrollProgress />
      <div className="relative z-10">
        <ModeToggle />
        <HeroRibbons />
        {/* <HeroWithSwirls /> */}
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </motion.div>
  );
};

const Index = () => {
  return (
    <ModeProvider>
      <IndexContent />
    </ModeProvider>
  );
};

export default Index;
