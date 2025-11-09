import { useMode } from "@/contexts/ModeContext";
import { ExternalLink, Github, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { useState } from "react";
import engineeringProjects from "@/data/engineeringProjects";
import designerProjectsData from "@/data/designProjects";

const Projects = () => {
  const { mode } = useMode();
  const isEngineer = mode === "engineer";
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const engineerProjects = engineeringProjects;

  const designerProjects = designerProjectsData;

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
            className={`text-4xl md:text-5xl font-bold text-center mb-16 mode-transition ${
              isEngineer
                ? "font-engineer text-gradient-engineer"
                : "font-designer text-gradient-designer"
            }`}
          >
            {isEngineer ? "Building Solutions" : "Solving Problems"}
          </h2>

          {/* Featured + Grid Layout */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Featured Project - Large Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2 md:row-span-2"
            >
              <div
                className={`h-full p-8 md:p-10 rounded-2xl bg-card border apple-lift ${
                  isEngineer
                    ? "hover:border-[hsl(var(--engineer-primary))]"
                    : "neubrutalism-card"
                }`}
              >
                {/* Image placeholder */}
                <div
                  className={`w-full h-48 md:h-64 rounded-xl mb-6 flex items-center justify-center mode-transition ${
                    isEngineer
                      ? "bg-[hsl(var(--engineer-surface))]"
                      : "bg-[hsl(var(--designer-surface))]"
                  }`}
                >
                  <span className="text-muted-foreground text-sm">
                    Project Preview
                  </span>
                </div>

                {/* Metric Badge */}
                <div className="inline-block mb-4">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold mode-transition ${
                      isEngineer
                        ? "bg-[hsl(var(--engineer-primary))] text-white"
                        : "bg-[hsl(var(--designer-primary))] text-white"
                    }`}
                  >
                    {projects[featuredIndex].metric}
                  </span>
                </div>

                <h3
                  className={`text-3xl md:text-4xl font-bold mb-4 mode-transition ${
                    isEngineer ? "font-engineer" : "font-designer"
                  }`}
                >
                  {projects[featuredIndex].title}
                </h3>

                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  {projects[featuredIndex].tagline}
                </p>

                {/* Expandable description */}
                <AnimatePresence>
                  {expandedProject === featuredIndex ? (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-muted-foreground mb-6 leading-relaxed overflow-hidden"
                    >
                      {projects[featuredIndex].fullDescription}
                    </motion.p>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-muted-foreground mb-6 leading-relaxed overflow-hidden"
                    >
                      {projects[featuredIndex].description}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  onClick={() =>
                    setExpandedProject(
                      expandedProject === featuredIndex ? null : featuredIndex
                    )
                  }
                  className="text-sm text-primary font-medium mb-6 flex items-center gap-1 hover:gap-2 transition-all"
                >
                  {expandedProject === featuredIndex
                    ? "Show Less"
                    : "Read More"}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedProject === featuredIndex ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[featuredIndex].tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium ${
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
                      <Button variant="outline" size="lg" asChild>
                        <a
                          href={(projects[featuredIndex] as any).github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-5 h-5 mr-2" />
                          View Code
                        </a>
                      </Button>
                      <Button size="lg" asChild>
                        <a
                          href={(projects[featuredIndex] as any).live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="lg" asChild>
                        <a
                          href={(projects[featuredIndex] as any).behance}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Design
                        </a>
                      </Button>
                      <Button size="lg" asChild>
                        <a
                          href={(projects[featuredIndex] as any).case}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Case Study
                        </a>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Supporting Projects - Smaller Cards */}
            {projects.map((project, index) => {
              if (index === featuredIndex) return null;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setFeaturedIndex(index)}
                  className={`group cursor-pointer p-6 rounded-2xl bg-card border apple-lift ${
                    isEngineer
                      ? "hover:border-[hsl(var(--engineer-primary))]"
                      : "neubrutalism-card"
                  }`}
                >
                  <h3
                    className={`text-xl font-bold mb-2 mode-transition ${
                      isEngineer ? "font-engineer" : "font-designer"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4">
                    {project.tagline}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          isEngineer
                            ? "bg-[hsl(var(--engineer-surface))] text-[hsl(var(--engineer-primary))]"
                            : "bg-[hsl(var(--designer-surface))] text-[hsl(var(--designer-primary))]"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full group-hover:bg-primary/10"
                  >
                    View Project
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
