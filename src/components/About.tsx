import { useMode } from '@/contexts/ModeContext';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const About = () => {
  const { mode } = useMode();
  const isEngineer = mode === 'engineer';
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const engineerJourney = [
    {
      icon: GraduationCap,
      title: "CS Engineering",
      description: "Built foundation in algorithms and software engineering",
      year: "2015-2019"
    },
    {
      icon: Briefcase,
      title: "Full-Stack Developer",
      description: "4 years crafting scalable applications",
      year: "2019-2023"
    },
    {
      icon: Award,
      title: "HCI Masters",
      description: "Merging code with human-centered design",
      year: "2023-Now"
    }
  ];

  const designerJourney = [
    {
      icon: Award,
      title: "Design Awakening",
      description: "Found joy in crafting beautiful experiences",
      year: "Journey"
    },
    {
      icon: Briefcase,
      title: "Design Thinking",
      description: "Brought empathy into every solution",
      year: "Evolution"
    },
    {
      icon: GraduationCap,
      title: "HCI Masters",
      description: "Learning to merge technology with empathy",
      year: "Growth"
    }
  ];

  const journey = isEngineer ? engineerJourney : designerJourney;

  return (
    <section id="about" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Scroll reveal animation wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
        <h2 
          className={`text-4xl md:text-5xl font-bold text-center mb-20 mode-transition ${
            isEngineer 
              ? 'font-engineer text-gradient-engineer' 
              : 'font-designer text-gradient-designer'
          }`}
        >
          {isEngineer ? 'From Code to Impact' : 'Where Empathy Meets Design'}
        </h2>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Central line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12 md:space-y-20">
            {journey.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIndex === index;
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline node - center on desktop, left on mobile */}
                  <div className="flex items-center md:justify-center mb-6 md:mb-0">
                    <motion.button
                      onClick={() => setActiveIndex(isActive ? null : index)}
                      className={`relative z-10 p-4 rounded-full border-4 border-background transition-all duration-300 ${
                        isEngineer 
                          ? 'bg-[hsl(var(--engineer-surface))] hover:bg-[hsl(var(--engineer-primary))/20]' 
                          : 'bg-[hsl(var(--designer-surface))] hover:bg-[hsl(var(--designer-primary))/20]'
                      } ${isActive ? 'ring-4 ring-primary/30 scale-110' : ''}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className={`w-6 h-6 md:w-8 md:h-8 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    </motion.button>
                  </div>

                  {/* Content card - alternating sides on desktop, below on mobile */}
                  <div className={`md:absolute md:top-0 md:w-[calc(50%-3rem)] ${
                    isLeft ? 'md:right-[calc(50%+3rem)]' : 'md:left-[calc(50%+3rem)]'
                  }`}>
                    {/* Year and Title - always visible */}
                    <motion.div
                      className={`text-sm font-bold mb-2 ${isLeft ? 'md:text-right' : 'md:text-left'}`}
                    >
                      <span className="text-primary">{item.year}</span>
                      <h3 className={`text-xl md:text-2xl mt-1 mode-transition ${
                        isEngineer ? 'font-engineer' : 'font-designer'
                      }`}>
                        {item.title}
                      </h3>
                    </motion.div>

                    {/* Description - revealed on click/active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`overflow-hidden ${isLeft ? 'md:text-right' : 'md:text-left'}`}
                        >
                          <p className="text-muted-foreground leading-relaxed pt-2">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
