import { useMode } from '@/contexts/ModeContext';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const { mode } = useMode();
  const isEngineer = mode === 'engineer';

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl w-full">
        <div className="space-y-8 text-center">
          {/* Title */}
          <div className="space-y-4">
            <h1 
              className={`text-6xl md:text-8xl font-bold mode-transition ${
                isEngineer 
                  ? 'font-engineer text-gradient-engineer' 
                  : 'font-designer text-gradient-designer'
              }`}
            >
              Sumit Knayyar
            </h1>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className={`px-4 py-2 rounded-lg mode-transition ${
                isEngineer 
                  ? 'bg-[hsl(var(--engineer-surface))] border border-[hsl(var(--engineer-primary))/0.3]' 
                  : 'bg-[hsl(var(--designer-surface))] border border-[hsl(var(--designer-primary))/0.3]'
              }`}>
                <span className={`font-semibold mode-transition ${
                  isEngineer ? 'font-engineer text-[hsl(var(--engineer-primary))]' : 'font-designer text-[hsl(var(--designer-primary))]'
                }`}>
                  {isEngineer ? '{ Full-Stack Engineer }' : 'UX Designer'}
                </span>
              </div>
              
              <div className={`px-4 py-2 rounded-lg mode-transition ${
                isEngineer 
                  ? 'bg-[hsl(var(--engineer-surface))] border border-[hsl(var(--engineer-primary))/0.3]' 
                  : 'bg-[hsl(var(--designer-surface))] border border-[hsl(var(--designer-primary))/0.3]'
              }`}>
                <span className={`font-semibold mode-transition ${
                  isEngineer ? 'font-engineer text-[hsl(var(--engineer-primary))]' : 'font-designer text-[hsl(var(--designer-primary))]'
                }`}>
                  {isEngineer ? '4+ Years Experience' : 'Human-Centered Design'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isEngineer 
              ? "Building robust, scalable solutions with modern web technologies. Specialized in full-stack development and system architecture."
              : "Crafting delightful user experiences through research, iteration, and empathy. Masters student in Human-Computer Interaction & Design."
            }
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap pt-4">
            <Button 
              size="lg" 
              className={`mode-transition shadow-lg ${
                isEngineer 
                  ? 'glow-engineer font-engineer' 
                  : 'glow-designer font-designer'
              }`}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View {isEngineer ? 'Projects' : 'Portfolio'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className={`mode-transition ${
                isEngineer ? 'font-engineer' : 'font-designer'
              }`}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 pt-8">
            <a 
              href="https://github.com/sumit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground mode-transition"
              aria-label="GitHub Profile"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://linkedin.com/in/sumit-knayyar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground mode-transition"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:sknayyar.sk@gmail.com"
              className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground mode-transition"
              aria-label="Email Contact"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
