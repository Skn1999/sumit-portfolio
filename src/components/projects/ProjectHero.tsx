import React from "react";
import { ProjectMeta } from "@/lib/projects";
import { ProjectImageAsset } from "@/components/ui/project-image-asset";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectHeroProps {
  project: ProjectMeta;
}

const formatTimeline = (date?: string) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

const MetadataItem: React.FC<{
  label: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, children, className }) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
      {label}
    </span>
    <div className="font-body-narrative text-sm md:text-base text-ink-primary">
      {children}
    </div>
  </div>
);

export const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
  const timeline = formatTimeline(project.date);
  const linkEntries = project.links
    ? Object.entries(project.links).filter(([key]) => key !== "client")
    : [];

  const inkFadeVariant = {
    hidden: { opacity: 0, filter: "blur(6px)", y: 16 },
    visible: (customDelay: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay: customDelay,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <header className="relative w-full bg-paper-bg pt-28 md:pt-36 pb-12 border-b border-paper-border">
      <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-col gap-8">
        {/* Monospace Discipline & Type Tracking */}
        <motion.div
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={inkFadeVariant}
          className="font-mono text-xs font-semibold tracking-widest text-ink-muted uppercase flex items-center gap-2"
        >
          <span>CASE STUDY //</span>
          <span>{project.type === "engineering" ? "ENGINEERING" : "DESIGN"}</span>
        </motion.div>

        {/* Primary Title */}
        <motion.h1
          custom={0.25}
          initial="hidden"
          animate="visible"
          variants={inkFadeVariant}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-primary tracking-tighter leading-[1.1]"
        >
          {project.title}
        </motion.h1>

        {/* Tagline / Summary Narrative */}
        {project.tagline && (
          <motion.p
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={inkFadeVariant}
            className="font-body-narrative text-base md:text-lg lg:text-xl text-ink-muted leading-[1.8] max-w-3xl"
          >
            {project.tagline}
          </motion.p>
        )}

        {/* Monospace Metadata Grid */}
        <motion.div
          custom={0.55}
          initial="hidden"
          animate="visible"
          variants={inkFadeVariant}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-paper-border/80"
        >
          {project.roles && project.roles.length > 0 && (
            <MetadataItem label="Roles">
              <p>{project.roles.join(", ")}</p>
            </MetadataItem>
          )}

          {timeline && (
            <MetadataItem label="Timeline">
              <p>{timeline}</p>
            </MetadataItem>
          )}

          {project.tech && project.tech.length > 0 && (
            <MetadataItem label="Stack" className="lg:col-span-2">
              <p>{project.tech.join(", ")}</p>
            </MetadataItem>
          )}

          {linkEntries.length > 0 && (
            <MetadataItem label="Links" className="sm:col-span-2 lg:col-span-4">
              <div className="flex flex-wrap gap-4">
                {linkEntries.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-ink-primary hover:text-ink-primary/70 uppercase tracking-widest font-semibold underline decoration-paper-border hover:decoration-ink-primary transition-all"
                  >
                    {key.replace(/_/g, " ")} →
                  </a>
                ))}
              </div>
            </MetadataItem>
          )}
        </motion.div>

        {/* Scroll-Revealed Cover Image */}
        {project.cover && (
          <motion.div
            custom={0.7}
            initial="hidden"
            animate="visible"
            variants={inkFadeVariant}
            className="mt-8 overflow-hidden rounded-xl border border-paper-border bg-paper-card aspect-[16/9] w-full"
          >
            <ProjectImageAsset
              src={`${project.slug}/${project.cover.filename}`}
              alt={project.cover.alt || project.title}
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default ProjectHero;
