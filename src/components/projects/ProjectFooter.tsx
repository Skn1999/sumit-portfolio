import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectMeta } from "@/lib/projects";
import { visibleProjects } from "@/lib/projects";

interface ProjectFooterProps {
  project: ProjectMeta;
}

export const ProjectFooter: React.FC<ProjectFooterProps> = ({ project }) => {
  const currentIndex = visibleProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? visibleProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < visibleProjects.length - 1 ? visibleProjects[currentIndex + 1] : null;

  return (
    <footer className="mt-24 pt-12 border-t border-border/20">
      {/* Links Section */}
      {project.links && Object.keys(project.links).length > 0 && (
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-4">View Project</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(project.links).map(([key, url]) => (
              <Button key={key} variant="outline" size="lg" asChild>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="grid md:grid-cols-3 gap-6 items-center">
        {/* Previous Project */}
        <div>
          {prevProject && (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="text-xs mb-1">Previous</div>
                <div className="font-medium">{prevProject.title}</div>
              </div>
            </Link>
          )}
        </div>

        {/* Back to Projects */}
        <div className="text-center">
          <Link to="/#projects">
            <Button variant="ghost">Back to Projects</Button>
          </Link>
        </div>

        {/* Next Project */}
        <div className="text-right">
          {nextProject && (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="group inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <div>
                <div className="text-xs mb-1">Next</div>
                <div className="font-medium">{nextProject.title}</div>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
};

export default ProjectFooter;
