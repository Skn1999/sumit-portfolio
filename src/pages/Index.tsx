import { ModeProvider } from '@/contexts/ModeContext';
import ModeToggle from '@/components/ModeToggle';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <ModeProvider>
      <div className="min-h-screen mode-transition">
        <ModeToggle />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </ModeProvider>
  );
};

export default Index;
