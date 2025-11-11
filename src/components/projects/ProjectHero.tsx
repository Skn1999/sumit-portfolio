import React from "react";
import { ProjectMeta } from "@/lib/projects";
import { ProjectImageAsset } from "@/components/ui/project-image-asset";

interface ProjectHeroProps {
  project: ProjectMeta;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
  return (
    <header className="pt-24 pb-12 px-6">
      {/* Title and Tagline Above Image */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
          {project.title}
        </h1>
        {project.tagline && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {project.tagline}
          </p>
        )}
      </div>

      {/* Contained Cover Image */}
      {project.cover && (
        <div className="max-w-[80%] mx-auto">
          <ProjectImageAsset
            src={`${project.slug}/${project.cover.filename}`}
            alt={project.cover.alt || project.title}
            className="w-full h-auto object-cover rounded-2xl shadow-lg"
            priority
          />
        </div>
      )}
    </header>
  );
};

export default ProjectHero;
