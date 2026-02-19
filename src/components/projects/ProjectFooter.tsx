import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectMeta } from "@/lib/projects";
import { visibleProjects } from "@/lib/projects";
import { useMode } from "@/contexts/ModeContext";
import { motion } from "framer-motion";
import MagneticButton from "../MagneticButton";

interface ProjectFooterProps {
  project: ProjectMeta;
}

export const ProjectFooter: React.FC<ProjectFooterProps> = ({ project }) => {
  const { mode } = useMode();
  const isDesigner = mode === "designer";
  const currentIndex = visibleProjects.findIndex(
    (p) => p.slug === project.slug,
  );
  const prevProject =
    currentIndex > 0 ? visibleProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < visibleProjects.length - 1
      ? visibleProjects[currentIndex + 1]
      : null;

  return (
    <footer className="pt-24 pb-16 max-w-7xl mx-auto">
      {/* Links Section */}
      {project.links && Object.keys(project.links).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
            View Live Project
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(project.links).map(([key, url]) => (
              <MagneticButton
                key={key}
                variant={key === "github" ? "outline" : "default"}
                size="lg"
                className={isDesigner ? "neubrutalism-button" : ""}
                asChild
              >
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {key === "github" ? (
                    <Github className="w-4 h-4 mr-2" />
                  ) : (
                    <ExternalLink className="w-4 h-4 mr-2" />
                  )}
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              </MagneticButton>
            ))}
          </div>
        </motion.div>
      )}

      {/* Divider */}
      <div className="border-t border-border/20 mb-16" />

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
      >
        {/* Previous Project */}
        <div className="order-2 md:order-1">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className={`card-styled group p-6 rounded-xl block transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start gap-4">
                <ArrowLeft className="w-5 h-5 mt-1 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                <div>
                  <div className="text-xs mb-2 uppercase tracking-wider text-muted-foreground font-semibold">
                    Previous
                  </div>
                  <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {prevProject.title}
                  </div>
                  {prevProject.tagline && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {prevProject.tagline}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Back to Projects */}
        <div className="text-center order-1 md:order-2">
          <Link to="/#projects">
            <Button
              variant="ghost"
              size="lg"
              className={`text-sm ${
                isDesigner ? "font-designer" : "font-engineer"
              }`}
            >
              ← Back to All Projects
            </Button>
          </Link>
        </div>

        {/* Next Project */}
        <div className="order-3">
          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug}`}
              className={`card-styled group p-6 rounded-xl block transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start gap-4 text-right">
                <div className="flex-1">
                  <div className="text-xs mb-2 uppercase tracking-wider text-muted-foreground font-semibold">
                    Next
                  </div>
                  <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {nextProject.title}
                  </div>
                  {nextProject.tagline && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {nextProject.tagline}
                    </p>
                  )}
                </div>
                <ArrowRight className="w-5 h-5 mt-1 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </motion.div>
    </footer>
  );
};

export default ProjectFooter;
