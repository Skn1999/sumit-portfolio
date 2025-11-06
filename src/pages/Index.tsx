import { ModeProvider, useMode } from "@/contexts/ModeContext";
import ModeToggle from "@/components/ModeToggle";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import FloatingShapes3D from "@/components/FloatingShapes3D";
import HeroRibbons from "@/components/HeroRibbons";

const IndexContent = () => {
  const { mode } = useMode();

  return (
    <div className="min-h-screen mode-transition relative mode-dependent-content">
      {mode === "designer" && <FloatingShapes3D />}
      <div className="relative z-10">
        <ModeToggle />
        <HeroRibbons />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
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
