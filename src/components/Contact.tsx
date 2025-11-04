import { useMode } from '@/contexts/ModeContext';
import { Mail, Linkedin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const { mode } = useMode();
  const isEngineer = mode === 'engineer';

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 
          className={`text-5xl md:text-6xl font-bold mb-8 mode-transition ${
            isEngineer 
              ? 'font-engineer text-gradient-engineer' 
              : 'font-designer text-gradient-designer'
          }`}
        >
          {isEngineer ? 'Let\'s Build Something' : 'Let\'s Create Together'}
        </h2>
        
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          {isEngineer 
            ? "I'm currently seeking internship opportunities where I can apply my engineering skills and continue learning. Open to challenging projects and collaborative teams."
            : "Looking for internships to apply my design thinking and create meaningful user experiences. Let's discuss how design can solve real problems."
          }
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            size="lg"
            className={`mode-transition ${
              isEngineer 
                ? 'glow-engineer font-engineer' 
                : 'glow-designer font-designer'
            }`}
            asChild
          >
            <a href="mailto:sknayyar.sk@gmail.com">
              <Mail className="w-5 h-5 mr-2" />
              Email Me
            </a>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className={`mode-transition ${
              isEngineer ? 'font-engineer' : 'font-designer'
            }`}
            asChild
          >
            <a href="https://linkedin.com/in/sumit-knayyar" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className={`mode-transition ${
              isEngineer ? 'font-engineer' : 'font-designer'
            }`}
            asChild
          >
            <a href="#" download>
              <FileText className="w-5 h-5 mr-2" />
              Resume
            </a>
          </Button>
        </div>

        <div className="mt-16 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            © 2025 Sumit Knayyar. Designed & Built with dual personality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
