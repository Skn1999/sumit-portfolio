import { useMode } from "@/contexts/ModeContext";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const Projects = () => {
  const { mode } = useMode();
  const isEngineer = mode === "engineer";

  const engineerProjects = [
    {
      title: "E-Commerce Platform",
      description:
        "Built a scalable microservices architecture handling 100K+ daily users with React, Node.js, and PostgreSQL.",
      tech: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
      github: "#",
      live: "#",
    },
    {
      title: "Real-Time Analytics Dashboard",
      description:
        "Developed a real-time data visualization platform with WebSocket integration and custom charting components.",
      tech: ["TypeScript", "WebSocket", "Redis", "D3.js"],
      github: "#",
      live: "#",
    },
    {
      title: "API Gateway & Auth System",
      description:
        "Designed and implemented a secure authentication system and API gateway serving multiple microservices.",
      tech: ["Node.js", "JWT", "OAuth", "Rate Limiting"],
      github: "#",
      live: "#",
    },
  ];

  const designerProjects = [
    {
      title: "Healthcare App Redesign",
      description:
        "Led UX research and redesign for a patient portal, improving task completion rate by 45% through iterative testing.",
      tech: ["User Research", "Figma", "Usability Testing", "Prototyping"],
      behance: "#",
      case: "#",
    },
    {
      title: "Design System Creation",
      description:
        "Created a comprehensive design system with 100+ components, ensuring consistency across multiple products.",
      tech: ["Figma", "Component Library", "Documentation", "Accessibility"],
      behance: "#",
      case: "#",
    },
    {
      title: "Mobile Banking Experience",
      description:
        "Designed an intuitive mobile banking interface focused on accessibility and clarity for diverse user groups.",
      tech: [
        "Mobile Design",
        "Accessibility",
        "User Flows",
        "Interaction Design",
      ],
      behance: "#",
      case: "#",
    },
  ];

  const projects = isEngineer ? engineerProjects : designerProjects;

  return (
    <section id="projects" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`text-5xl md:text-6xl font-bold text-center mb-16 mode-transition ${
              isEngineer
                ? "font-engineer text-gradient-engineer"
                : "font-designer text-gradient-designer"
            }`}
          >
            {isEngineer ? "Featured Projects" : "Featured Work"}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className={`group p-8 rounded-2xl bg-card border apple-lift ${
                  isEngineer
                    ? "hover:border-[hsl(var(--engineer-primary))]"
                    : "neubrutalism-card"
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <h3
                  className={`text-2xl font-bold mb-4 mode-transition ${
                    isEngineer ? "font-engineer" : "font-designer"
                  }`}
                >
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 rounded-md text-xs font-medium apple-scale ${
                        isEngineer
                          ? "bg-[hsl(var(--engineer-surface))] text-[hsl(var(--engineer-primary))]"
                          : "bg-[hsl(var(--designer-surface))] text-[hsl(var(--designer-primary))] border-2 border-[hsl(var(--designer-border))]"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {isEngineer ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" className="flex-1" asChild>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <a
                          href={(project as any).behance}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Design
                        </a>
                      </Button>
                      <Button size="sm" className="flex-1" asChild>
                        <a
                          href={(project as any).case}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Case Study
                        </a>
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
