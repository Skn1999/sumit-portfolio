import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectMeta } from "@/lib/projects";
import { ProjectImageAsset } from "@/components/ui/project-image-asset";

interface ProjectHeroProps {
  project: ProjectMeta;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <header className="relative w-full mb-20">
      {/* Title - Above Image */}
      <div className="text-center pt-24 pb-16 px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight max-w-5xl mx-auto"
        >
          {project.title}
        </motion.h1>
        {project.tagline && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto"
          >
            {project.tagline}
          </motion.p>
        )}
      </div>

      {/* Hero Image - Full Width with Parallax */}
      {project.cover && (
        <motion.div 
          style={{ y, opacity }} 
          className="w-full h-[60vh] md:h-[70vh] overflow-hidden"
        >
          <ProjectImageAsset
            src={`${project.slug}/${project.cover.filename}`}
            alt={project.cover.alt || project.title}
            className="w-full h-full object-cover"
            priority
          />
        </motion.div>
      )}
    </header>
  );
};

export default ProjectHero;
