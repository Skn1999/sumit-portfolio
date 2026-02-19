import React from "react";
import { ProjectMeta } from "@/lib/projects";
import { ProjectImageAsset } from "@/components/ui/project-image-asset";
import { useMode } from "@/contexts/ModeContext";
import { motion } from "framer-motion";

interface ProjectHeroProps {
  project: ProjectMeta;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
  const { mode } = useMode();
  const isDesigner = mode === "designer";

  return (
    <header className="relative pt-16 pb-16 px-4 md:px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Eyebrow - Project Type/Category */}
        {project.type && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <span className={`badge-styled inline-block`}>
              {project.type === "engineering" ? "Engineering" : "Design"}
            </span>
          </motion.div>
        )}

        {/* Title and Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-10 md:mb-16 max-w-4xl mx-auto"
        >
          <h1
            className={`heading-primary text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              isDesigner ? "text-gradient-designer" : "text-gradient-engineer"
            }`}
          >
            {project.title}
          </h1>
          {project.tagline && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {project.tagline}
            </p>
          )}
        </motion.div>

        {/* Cover Image */}
        {project.cover && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div
              className={`overflow-hidden ${
                isDesigner
                  ? "rounded-2xl border-4 border-[hsl(var(--designer-border))] shadow-[8px_8px_0px_hsl(var(--designer-border))]"
                  : "rounded-2xl shadow-2xl"
              }`}
            >
              <ProjectImageAsset
                src={`${project.slug}/${project.cover.filename}`}
                alt={project.cover.alt || project.title}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            {project.cover.caption && (
              <p className="text-sm text-muted-foreground text-center mt-4 italic">
                {project.cover.caption}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default ProjectHero;
