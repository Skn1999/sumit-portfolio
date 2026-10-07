import React from "react";
import { Link } from "react-router-dom";
import { ProjectMeta, visibleProjects } from "@/lib/projects";

interface ProjectFooterProps {
  project: ProjectMeta;
}

export const ProjectFooter: React.FC<ProjectFooterProps> = ({ project }) => {
  const currentIndex = visibleProjects.findIndex(
    (p) => p.slug === project.slug
  );

  // Cyclic next project selection
  const nextProject =
    currentIndex >= 0 && currentIndex < visibleProjects.length - 1
      ? visibleProjects[currentIndex + 1]
      : visibleProjects[0];

  return (
    <footer className="py-16 bg-paper-bg border-t border-paper-border">
      <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link
          to="/"
          className="font-mono text-xs text-ink-muted hover:text-ink-primary uppercase tracking-widest transition-colors"
        >
          ← Back to Portfolio
        </Link>

        {nextProject && (
          <Link
            to={`/projects/${nextProject.slug}`}
            className="font-mono text-xs font-semibold text-ink-primary uppercase tracking-widest hover:text-ink-primary/70 underline decoration-paper-border hover:decoration-ink-primary transition-all"
          >
            NEXT PROJECT: {nextProject.title.split(":")[0].toUpperCase()} →
          </Link>
        )}
      </div>
    </footer>
  );
};

export default ProjectFooter;
