import { useMode } from '@/contexts/ModeContext';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const { mode } = useMode();
  const isEngineer = mode === 'engineer';

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo - Left side */}
          <div className="order-2 md:order-1 flex justify-center">
            <div className={`relative mode-transition ${
              isEngineer 
                ? 'rounded-lg overflow-hidden border-2 border-[hsl(var(--engineer-primary))] glow-engineer' 
                : 'neubrutalism-card overflow-hidden bg-[hsl(var(--designer-surface))]'
            }`}>
              <div className="w-64 h-64 md:w-80 md:h-80 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Photo placeholder</span>
              </div>
            </div>
          </div>

          {/* Content - Right side */}
          <div className="space-y-6 order-1 md:order-2">
            <div className="space-y-4">
              <h1 
                className={`text-5xl md:text-7xl font-bold mode-transition ${
                  isEngineer 
                    ? 'font-engineer text-gradient-engineer' 
                    : 'font-designer text-gradient-designer tracking-tight'
                }`}
              >
                Sumit Knayyar
              </h1>
              
              <div className="flex items-start gap-3 flex-wrap">
                <div className={`px-4 py-2 mode-transition font-body ${
                  isEngineer 
                    ? 'bg-[hsl(var(--engineer-surface))] border border-[hsl(var(--engineer-primary))/0.3] rounded-lg' 
                    : 'neubrutalism-card bg-[hsl(var(--designer-accent))]'
                }`}>
                  <span className={`font-semibold mode-transition ${
                    isEngineer ? 'text-[hsl(var(--engineer-primary))]' : 'text-[hsl(var(--designer-border))]'
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
            </div>

            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-body">
              {isEngineer 
                ? "Building robust, scalable solutions with modern web technologies. Specialized in full-stack development and system architecture."
                : "Crafting delightful user experiences through research, iteration, and empathy. Masters student in Human-Computer Interaction & Design."
              }
            </p>

            <div className="flex items-center gap-4 flex-wrap pt-2">
              <Button 
                size="lg" 
                className={`mode-transition font-body font-semibold ${
                  isEngineer 
                    ? 'glow-engineer' 
                    : 'neubrutalism-button bg-[hsl(var(--designer-accent))] text-[hsl(var(--designer-border))] hover:bg-[hsl(var(--designer-accent))]'
                }`}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View {isEngineer ? 'Projects' : 'Portfolio'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className={`mode-transition font-body font-semibold ${
                  isEngineer ? '' : 'neubrutalism-button'
                }`}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a 
                href="https://github.com/sumit" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 mode-transition ${
                  isEngineer 
                    ? 'rounded-full bg-muted hover:bg-primary hover:text-primary-foreground' 
                    : 'neubrutalism-button bg-[hsl(var(--designer-surface))] hover:bg-[hsl(var(--designer-primary))] hover:text-white'
                }`}
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com/in/sumit-knayyar" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 mode-transition ${
                  isEngineer 
                    ? 'rounded-full bg-muted hover:bg-primary hover:text-primary-foreground' 
                    : 'neubrutalism-button bg-[hsl(var(--designer-surface))] hover:bg-[hsl(var(--designer-primary))] hover:text-white'
                }`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="mailto:sknayyar.sk@gmail.com"
                className={`p-3 mode-transition ${
                  isEngineer 
                    ? 'rounded-full bg-muted hover:bg-primary hover:text-primary-foreground' 
                    : 'neubrutalism-button bg-[hsl(var(--designer-surface))] hover:bg-[hsl(var(--designer-primary))] hover:text-white'
                }`}
                aria-label="Email Contact"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
