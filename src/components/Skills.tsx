import { useMode } from "@/contexts/ModeContext";
import { motion } from "framer-motion";

const Skills = () => {
  const { mode } = useMode();
  const isEngineer = mode === "engineer";

  const engineerSkills = {
    "Languages & Frameworks": [
      "JavaScript/TypeScript",
      "React",
      "Node.js",
      "Python",
      "Java",
      "Next.js",
    ],
    "Backend & Database": [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "REST APIs",
      "GraphQL",
      "Microservices",
    ],
    "DevOps & Tools": ["Docker", "AWS", "CI/CD", "Git", "Linux", "Kubernetes"],
    Architecture: [
      "System Design",
      "Scalability",
      "Performance Optimization",
      "Security",
    ],
  };

  const designerSkills = {
    "Design Tools": [
      "Figma",
      "Adobe XD",
      "Sketch",
      "Illustrator",
      "Prototyping Tools",
    ],
    "Research Methods": [
      "User Interviews",
      "Usability Testing",
      "Personas",
      "Journey Mapping",
      "A/B Testing",
    ],
    "Design Principles": [
      "Accessibility",
      "Responsive Design",
      "Design Systems",
      "Interaction Design",
    ],
    Collaboration: [
      "Stakeholder Management",
      "Design Critique",
      "Workshop Facilitation",
      "Agile/Scrum",
    ],
  };

  const skills = isEngineer ? engineerSkills : designerSkills;

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`heading-primary text-5xl md:text-6xl font-bold text-center mb-16 mode-transition ${
              isEngineer ? "text-gradient-engineer" : "text-gradient-designer"
            }`}
          >
            {isEngineer ? "// Skills & Tech" : "Skills & Expertise"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="card-styled p-8 rounded-2xl transition-all duration-300"
              >
                <h3
                  className={`text-2xl font-bold mb-6 text-primary mode-transition ${
                    isEngineer ? "font-engineer" : "font-designer"
                  }`}
                >
                  {category}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {items.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: skillIndex * 0.05,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -2, 2, 0],
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium cursor-default ${
                        isEngineer
                          ? "bg-[hsl(var(--engineer-surface))] text-[hsl(var(--engineer-primary))] border border-[hsl(var(--engineer-primary))/0.3] hover:border-[hsl(var(--engineer-primary))] hover:shadow-lg"
                          : "neubrutalism-button bg-[hsl(var(--designer-surface))] text-[hsl(var(--designer-primary))]"
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
