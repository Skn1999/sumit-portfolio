import { useMode } from '@/contexts/ModeContext';

const Skills = () => {
  const { mode } = useMode();
  const isEngineer = mode === 'engineer';

  const engineerSkills = {
    "Languages & Frameworks": [
      "JavaScript/TypeScript", "React", "Node.js", "Python", "Java", "Next.js"
    ],
    "Backend & Database": [
      "PostgreSQL", "MongoDB", "Redis", "REST APIs", "GraphQL", "Microservices"
    ],
    "DevOps & Tools": [
      "Docker", "AWS", "CI/CD", "Git", "Linux", "Kubernetes"
    ],
    "Architecture": [
      "System Design", "Scalability", "Performance Optimization", "Security"
    ]
  };

  const designerSkills = {
    "Design Tools": [
      "Figma", "Adobe XD", "Sketch", "Illustrator", "Prototyping Tools"
    ],
    "Research Methods": [
      "User Interviews", "Usability Testing", "Personas", "Journey Mapping", "A/B Testing"
    ],
    "Design Principles": [
      "Accessibility", "Responsive Design", "Design Systems", "Interaction Design"
    ],
    "Collaboration": [
      "Stakeholder Management", "Design Critique", "Workshop Facilitation", "Agile/Scrum"
    ]
  };

  const skills = isEngineer ? engineerSkills : designerSkills;

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 
          className={`text-5xl md:text-6xl font-bold text-center mb-16 mode-transition ${
            isEngineer 
              ? 'font-engineer text-gradient-engineer' 
              : 'font-designer text-gradient-designer'
          }`}
        >
          {isEngineer ? '// Skills & Tech' : 'Skills & Expertise'}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items], index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl bg-card border apple-lift ${
                isEngineer 
                  ? 'hover:border-[hsl(var(--engineer-primary))]' 
                  : 'neubrutalism-card'
              }`}
              style={{
                transitionDelay: `${index * 50}ms`
              }}
            >
              <h3 
                className={`text-2xl font-bold mb-6 text-primary mode-transition ${
                  isEngineer ? 'font-engineer' : 'font-designer'
                }`}
              >
                {category}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {items.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`px-4 py-2 rounded-lg text-sm font-medium apple-scale ${
                      isEngineer 
                        ? 'bg-[hsl(var(--engineer-surface))] text-[hsl(var(--engineer-primary))] border border-[hsl(var(--engineer-primary))/0.3]' 
                        : 'neubrutalism-button bg-[hsl(var(--designer-surface))] text-[hsl(var(--designer-primary))]'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
