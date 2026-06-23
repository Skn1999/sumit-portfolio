import React from "react";
import { ProjectMeta } from "@/lib/projects";
import { ProjectImageAsset } from "@/components/ui/project-image-asset";
import { motion } from "framer-motion";

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

const MetadataSection: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <section className="border-t border-slate-200 pt-4 first:border-t-0 first:pt-0">
    <h2 className="mb-2 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-slate-500">
      {label}
    </h2>
    {children}
  </section>
);

export const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
  const timeline = formatTimeline(project.date);
  const linkEntries = project.links
    ? Object.entries(project.links).filter(([key]) => key !== "client")
    : [];
  const hasMetadata =
    Boolean(project.roles?.length) ||
    Boolean(project.tech?.length) ||
    Boolean(project.metric) ||
    Boolean(timeline) ||
    linkEntries.length > 0;

  return (
    <header className="relative overflow-hidden px-4 pb-12 pt-14 md:px-6 md:pb-16 md:pt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`grid gap-8 lg:gap-12 ${
            project.cover ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" : ""
          }`}
        >
          <div className="flex flex-col justify-between gap-8">
            <div>
              {project.type && (
                <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {project.type === "engineering" ? "Engineering" : "Design"}
                </p>
              )}
              <h1 className="heading-primary max-w-4xl text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              {project.tagline && (
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {project.tagline}
                </p>
              )}
            </div>

            {hasMetadata && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 md:p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {project.roles && project.roles.length > 0 && (
                    <MetadataSection label="Roles">
                      <p className="text-sm font-medium leading-relaxed text-slate-900">
                        {project.roles.join(", ")}
                      </p>
                    </MetadataSection>
                  )}

                  {timeline && (
                    <MetadataSection label="Timeline">
                      <p className="text-sm font-medium text-slate-900">
                        {timeline}
                      </p>
                    </MetadataSection>
                  )}

                  {project.tech && project.tech.length > 0 && (
                    <MetadataSection label="Implementation Stack">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </MetadataSection>
                  )}

                  {project.metric && (
                    <MetadataSection label="Metric">
                      <p className="text-sm font-medium leading-relaxed text-slate-900">
                        {project.metric}
                      </p>
                    </MetadataSection>
                  )}

                  {linkEntries.length > 0 && (
                    <MetadataSection label="Links">
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {linkEntries.map(([key, url]) => (
                          <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)} →
                          </a>
                        ))}
                      </div>
                    </MetadataSection>
                  )}
                </div>
              </div>
            )}
          </div>

          {project.cover && (
            <figure className="lg:pt-10">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <ProjectImageAsset
                  src={`${project.slug}/${project.cover.filename}`}
                  alt={project.cover.alt || project.title}
                  className="aspect-[4/3] w-full object-cover"
                  priority
                />
              </div>
              {project.cover.caption && (
                <figcaption className="mt-3 text-sm italic text-muted-foreground">
                  {project.cover.caption}
                </figcaption>
              )}
            </figure>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default ProjectHero;
