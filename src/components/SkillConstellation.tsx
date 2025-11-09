import { useMode } from '@/contexts/ModeContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Code2, Database, Cloud, Lightbulb, Palette, Users, Layers, TestTube } from 'lucide-react';

const SkillConstellation = () => {
  const { mode } = useMode();
  const isEngineer = mode === 'engineer';
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const engineerCategories = [
    {
      icon: Code2,
      name: "Languages & Frameworks",
      color: "hsl(var(--engineer-primary))",
      skills: [
        { name: "JavaScript/TypeScript", size: 1.2 },
        { name: "React", size: 1.2 },
        { name: "Node.js", size: 1.1 },
        { name: "Python", size: 1.0 },
        { name: "Java", size: 0.9 },
        { name: "Next.js", size: 1.0 }
      ]
    },
    {
      icon: Database,
      name: "Backend & Database",
      color: "hsl(220, 70%, 60%)",
      skills: [
        { name: "PostgreSQL", size: 1.1 },
        { name: "MongoDB", size: 1.0 },
        { name: "Redis", size: 0.9 },
        { name: "REST APIs", size: 1.1 },
        { name: "GraphQL", size: 1.0 },
        { name: "Microservices", size: 0.9 }
      ]
    },
    {
      icon: Cloud,
      name: "DevOps & Tools",
      color: "hsl(280, 65%, 65%)",
      skills: [
        { name: "Docker", size: 1.1 },
        { name: "AWS", size: 1.0 },
        { name: "CI/CD", size: 1.0 },
        { name: "Git", size: 1.2 },
        { name: "Linux", size: 0.9 },
        { name: "Kubernetes", size: 0.9 }
      ]
    },
    {
      icon: Lightbulb,
      name: "Architecture",
      color: "hsl(40, 80%, 60%)",
      skills: [
        { name: "System Design", size: 1.1 },
        { name: "Scalability", size: 1.0 },
        { name: "Performance", size: 1.0 },
        { name: "Security", size: 1.1 }
      ]
    }
  ];

  const designerCategories = [
    {
      icon: Palette,
      name: "Design Tools",
      color: "hsl(var(--designer-primary))",
      skills: [
        { name: "Figma", size: 1.2 },
        { name: "Adobe XD", size: 1.0 },
        { name: "Sketch", size: 0.9 },
        { name: "Illustrator", size: 1.0 },
        { name: "Prototyping", size: 1.1 }
      ]
    },
    {
      icon: TestTube,
      name: "Research Methods",
      color: "hsl(280, 70%, 60%)",
      skills: [
        { name: "User Interviews", size: 1.1 },
        { name: "Usability Testing", size: 1.1 },
        { name: "Personas", size: 1.0 },
        { name: "Journey Mapping", size: 1.0 },
        { name: "A/B Testing", size: 0.9 }
      ]
    },
    {
      icon: Layers,
      name: "Design Principles",
      color: "hsl(200, 70%, 60%)",
      skills: [
        { name: "Accessibility", size: 1.2 },
        { name: "Responsive Design", size: 1.1 },
        { name: "Design Systems", size: 1.1 },
        { name: "Interaction Design", size: 1.0 }
      ]
    },
    {
      icon: Users,
      name: "Collaboration",
      color: "hsl(340, 75%, 65%)",
      skills: [
        { name: "Stakeholder Mgmt", size: 1.0 },
        { name: "Design Critique", size: 1.0 },
        { name: "Workshops", size: 0.9 },
        { name: "Agile/Scrum", size: 1.0 }
      ]
    }
  ];

  const categories = isEngineer ? engineerCategories : designerCategories;

  // Position calculations for constellation layout
  const getCategoryPosition = (index: number) => {
    const positions = [
      { x: '25%', y: '30%' },
      { x: '75%', y: '30%' },
      { x: '25%', y: '70%' },
      { x: '75%', y: '70%' }
    ];
    return positions[index];
  };

  // Get skill position relative to category (circular distribution)
  const getSkillPosition = (skillIndex: number, totalSkills: number, categoryIndex: number) => {
    const radius = 140; // Distance from center
    const angle = (skillIndex / totalSkills) * Math.PI * 2 - Math.PI / 2;
    // Add slight variation based on category for organic feel
    const variance = categoryIndex * 0.3;
    return {
      x: Math.cos(angle + variance) * radius,
      y: Math.sin(angle + variance) * radius
    };
  };

  return (
    <section id="skills" className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className={`text-4xl md:text-5xl font-bold text-center mb-8 mode-transition ${
              isEngineer 
                ? 'font-engineer text-gradient-engineer' 
                : 'font-designer text-gradient-designer'
            }`}
          >
            {isEngineer ? 'Built With' : 'I Work With'}
          </h2>
          
          <p className="text-center text-muted-foreground mb-20 max-w-2xl mx-auto">
            {isEngineer 
              ? 'Hover to explore my technical toolkit'
              : 'Hover to discover my design capabilities'
            }
          </p>

          {/* Constellation Container */}
          <div className="relative min-h-[600px] md:min-h-[700px]">
            {categories.map((category, catIndex) => {
              const Icon = category.icon;
              const position = getCategoryPosition(catIndex);
              const isHovered = hoveredCategory === catIndex;
              const isDimmed = hoveredCategory !== null && !isHovered;

              return (
                <div
                  key={catIndex}
                  className="absolute"
                  style={{
                    left: position.x,
                    top: position.y,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Category Center Node */}
                  <motion.div
                    onMouseEnter={() => setHoveredCategory(catIndex)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                    className={`relative z-20 cursor-pointer transition-opacity duration-300 ${
                      isDimmed ? 'opacity-30' : 'opacity-100'
                    }`}
                  >
                    <motion.div
                      className={`w-20 h-20 rounded-full flex items-center justify-center border-2 mode-transition ${
                        isEngineer 
                          ? 'bg-[hsl(var(--engineer-surface))] border-[hsl(var(--engineer-primary))]' 
                          : 'bg-[hsl(var(--designer-surface))] border-[hsl(var(--designer-primary))]'
                      }`}
                      style={{
                        boxShadow: isHovered 
                          ? `0 0 30px ${category.color}40` 
                          : 'none'
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon 
                        className="w-8 h-8" 
                        style={{ color: category.color }}
                      />
                    </motion.div>
                    
                    {/* Category Label */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0.7 }}
                      className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    >
                      <p className={`text-sm font-bold mode-transition ${
                        isEngineer ? 'font-engineer' : 'font-designer'
                      }`}>
                        {category.name}
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Skills orbiting the category */}
                  {category.skills.map((skill, skillIndex) => {
                    const skillPos = getSkillPosition(skillIndex, category.skills.length, catIndex);
                    
                    return (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.4, 
                          delay: catIndex * 0.1 + skillIndex * 0.05 
                        }}
                        className={`absolute transition-all duration-300 ${
                          isDimmed ? 'opacity-20' : 'opacity-100'
                        }`}
                        style={{
                          left: `${skillPos.x}px`,
                          top: `${skillPos.y}px`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {/* Connecting line */}
                        <svg
                          className="absolute top-1/2 left-1/2 pointer-events-none transition-opacity duration-300"
                          style={{
                            width: Math.abs(skillPos.x) * 2,
                            height: Math.abs(skillPos.y) * 2,
                            transform: 'translate(-50%, -50%)',
                            opacity: isHovered ? 0.15 : 0
                          }}
                        >
                          <line
                            x1="50%"
                            y1="50%"
                            x2={skillPos.x > 0 ? '0%' : '100%'}
                            y2={skillPos.y > 0 ? '0%' : '100%'}
                            stroke={category.color}
                            strokeWidth="1"
                            strokeDasharray="4 4"
                          />
                        </svg>

                        {/* Skill tag */}
                        <motion.div
                          whileHover={{ scale: 1.15, zIndex: 30 }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-default whitespace-nowrap border mode-transition ${
                            isEngineer 
                              ? 'bg-[hsl(var(--engineer-surface))] text-[hsl(var(--engineer-primary))] border-[hsl(var(--engineer-primary))/30]' 
                              : 'bg-[hsl(var(--designer-surface))] text-[hsl(var(--designer-primary))] border-[hsl(var(--designer-primary))/30]'
                          }`}
                          style={{
                            fontSize: `${0.75 * skill.size}rem`,
                            boxShadow: isHovered ? `0 0 15px ${category.color}20` : 'none'
                          }}
                        >
                          {skill.name}
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillConstellation;
