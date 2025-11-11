import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectMeta } from "@/lib/projects";
import { ProjectImageAsset } from "@/components/ui/project-image-asset";
import { ChevronDown } from "lucide-react";

interface ProjectHeroProps {
  project: ProjectMeta;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <header className="relative h-[70vh] min-h-[500px] w-full overflow-hidden -mx-6 md:-mx-0 mb-12">
      {/* Parallax Background */}
      {project.cover && (
        <motion.div style={{ y }} className="absolute inset-0">
          <ProjectImageAsset
            src={`${project.slug}/${project.cover.filename}`}
            alt={project.cover.alt || project.title}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground drop-shadow-lg">
          {project.title}
        </h1>
        {project.tagline && (
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl drop-shadow-md">
            {project.tagline}
          </p>
        )}

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8"
        >
          <ChevronDown className="w-8 h-8 text-foreground/60" />
        </motion.div>
      </motion.div>
    </header>
  );
};

export default ProjectHero;
