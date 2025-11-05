import { useMode } from '@/contexts/ModeContext';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const { mode } = useMode();
  const isEngineer = mode === 'engineer';
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const ribbonX = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const ribbonRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col items-center gap-8">
          
          {/* Animated Ribbon with Name */}
          <motion.div 
            style={{ x: ribbonX, rotate: ribbonRotate }}
            className="relative w-full mb-8"
          >
            <div className={`relative py-6 px-8 mode-transition ${
              isEngineer 
                ? 'bg-gradient-to-r from-[hsl(var(--engineer-primary))] to-[hsl(var(--engineer-accent))] rounded-2xl shadow-lg' 
                : 'bg-[hsl(var(--designer-accent))] neubrutalism-card'
            }`}>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className={`text-5xl md:text-7xl font-bold text-center mode-transition ${
                  isEngineer 
                    ? 'font-engineer text-white' 
                    : 'font-designer text-white tracking-tight'
                }`}
              >
                Sumit Knayyar
              </motion.h1>
            </div>
          </motion.div>

          {/* Photo - Front and Center */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-8"
          >
            <div className={`relative apple-lift ${
              isEngineer 
                ? 'rounded-2xl overflow-hidden border-2 border-[hsl(var(--engineer-primary))] shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
                : 'neubrutalism-card overflow-hidden bg-white'
            }`}>
              <div className="w-72 h-72 md:w-96 md:h-96 bg-muted flex items-center justify-center group cursor-pointer">
                <img 
                  src={isEngineer ? "/images/hero-engineer.png" : "/images/hero-designer.png"}
                  alt="Sumit Knayyar - Full-Stack Engineer and UX Designer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          {/* Content - Centered */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 text-center"
          >
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div className={`px-4 py-2 mode-transition font-body ${
                isEngineer 
                  ? 'bg-[hsl(var(--engineer-surface))] border border-[hsl(var(--engineer-primary))/0.3] rounded-lg' 
                  : 'neubrutalism-card bg-[hsl(var(--designer-accent))]'
              }`}>
                <span className={`font-semibold mode-transition ${
                  isEngineer ? 'text-[hsl(var(--engineer-primary))]' : 'text-white'
                }`}>
                  {isEngineer ? '{ Full-Stack Engineer }' : 'UX Designer'}
                </span>
              </div>
              
              <div className={`px-4 py-2 mode-transition font-body ${
                isEngineer 
                  ? 'bg-[hsl(var(--engineer-surface))] border border-[hsl(var(--engineer-primary))/0.3] rounded-lg' 
                  : 'neubrutalism-card bg-[hsl(var(--designer-primary))]'
              }`}>
                <span className={`font-semibold mode-transition ${
                  isEngineer ? 'text-[hsl(var(--engineer-primary))]' : 'text-white'
                }`}>
                  {isEngineer ? '4+ Years' : 'HCI Masters'}
                </span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-body max-w-2xl">
              {isEngineer 
                ? "Building robust, scalable solutions with modern web technologies. Specialized in full-stack development and system architecture."
                : "Crafting delightful user experiences through research, iteration, and empathy. Masters student in Human-Computer Interaction & Design."
              }
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
              <Button 
                size="lg" 
                className={`font-body font-semibold ${
                  isEngineer 
                    ? '' 
                    : 'neubrutalism-button bg-[hsl(var(--designer-accent))] text-white hover:bg-[hsl(var(--designer-accent))]'
                }`}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View {isEngineer ? 'Projects' : 'Portfolio'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className={`font-body font-semibold ${
                  isEngineer ? '' : 'neubrutalism-button bg-white'
                }`}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 pt-4">
              <a 
                href="https://github.com/sumit" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 apple-scale ${
                  isEngineer 
                    ? 'rounded-full bg-muted hover:bg-primary hover:text-primary-foreground' 
                    : 'neubrutalism-button bg-white hover:bg-[hsl(var(--designer-primary))] hover:text-white'
                }`}
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com/in/sumit-knayyar" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 apple-scale ${
                  isEngineer 
                    ? 'rounded-full bg-muted hover:bg-primary hover:text-primary-foreground' 
                    : 'neubrutalism-button bg-white hover:bg-[hsl(var(--designer-primary))] hover:text-white'
                }`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="mailto:sknayyar.sk@gmail.com"
                className={`p-3 apple-scale ${
                  isEngineer 
                    ? 'rounded-full bg-muted hover:bg-primary hover:text-primary-foreground' 
                    : 'neubrutalism-button bg-white hover:bg-[hsl(var(--designer-primary))] hover:text-white'
                }`}
                aria-label="Email Contact"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
