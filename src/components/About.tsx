import { useMode } from '@/contexts/ModeContext';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const About = () => {
  const { mode } = useMode();
  const isEngineer = mode === 'engineer';

  const engineerJourney = [
    {
      icon: GraduationCap,
      title: "Computer Science Engineering",
      description: "Foundation in algorithms, data structures, and software engineering principles",
      year: "2015-2019"
    },
    {
      icon: Briefcase,
      title: "Full-Stack Developer",
      description: "4 years building scalable web applications and leading technical initiatives",
      year: "2019-2023"
    },
    {
      icon: Award,
      title: "Masters in HCI & Design",
      description: "Currently expanding expertise in human-computer interaction and design thinking",
      year: "2023-Present"
    }
  ];

  const designerJourney = [
    {
      icon: Award,
      title: "Design Mindset",
      description: "Discovered passion for creating intuitive and beautiful user experiences",
      year: "Journey"
    },
    {
      icon: Briefcase,
      title: "User-Centered Approach",
      description: "Integrated design thinking into engineering solutions for better outcomes",
      year: "Evolution"
    },
    {
      icon: GraduationCap,
      title: "HCI & Design Masters",
      description: "Formally studying human-computer interaction to merge technology and empathy",
      year: "Growth"
    }
  ];

  const journey = isEngineer ? engineerJourney : designerJourney;

  return (
    <section id="about" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 
          className={`text-5xl md:text-6xl font-bold text-center mb-16 mode-transition ${
            isEngineer 
              ? 'font-engineer text-gradient-engineer' 
              : 'font-designer text-gradient-designer'
          }`}
        >
          {isEngineer ? '>> My Journey' : 'My Story'}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {journey.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`p-8 rounded-2xl bg-card border mode-transition hover:shadow-xl ${
                  isEngineer 
                    ? 'hover:border-[hsl(var(--engineer-primary))] hover:glow-engineer' 
                    : 'hover:border-[hsl(var(--designer-primary))] hover:glow-designer'
                }`}
              >
                <div className={`inline-flex p-4 rounded-xl mb-6 mode-transition ${
                  isEngineer 
                    ? 'bg-[hsl(var(--engineer-surface))]' 
                    : 'bg-[hsl(var(--designer-surface))]'
                }`}>
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 
                  className={`text-2xl font-bold mb-2 mode-transition ${
                    isEngineer ? 'font-engineer' : 'font-designer'
                  }`}
                >
                  {item.title}
                </h3>
                
                <p className="text-sm text-primary font-semibold mb-4">{item.year}</p>
                
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-xl text-muted-foreground leading-relaxed">
            {isEngineer 
              ? "With a strong foundation in computer science and years of hands-on development experience, I build reliable, efficient, and maintainable software solutions. My technical expertise spans across modern web frameworks, cloud infrastructure, and system design."
              : "I believe great design emerges from deep understanding of human needs and behaviors. My approach combines research, empathy, and creativity to craft experiences that are not just functional, but delightful and meaningful."
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
