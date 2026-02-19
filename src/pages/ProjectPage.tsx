import React from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "@/lib/projects";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { MetadataStrip } from "@/components/projects/MetadataStrip";
import { ProjectFooter } from "@/components/projects/ProjectFooter";
import { TableOfContents } from "@/components/projects/TableOfContents";
import { ProjectGallery } from "@/components/ProjectImage";
import { useMode } from "@/contexts/ModeContext";
import { Layout } from "@/components/Layout";
import ReadingProgress from "@/components/ReadingProgress";

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");
  const { mode } = useMode();
  const isDesigner = mode === "designer";

  if (!project) {
    return (
      <Layout>
        <main className="min-h-screen flex items-center justify-center px-6">
          <div className="card-styled p-12 rounded-2xl text-center max-w-md">
            <h1 className="heading-primary text-4xl font-bold mb-4">
              Project not found
            </h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/"
              className="text-primary hover:underline font-medium inline-flex items-center gap-2"
            >
              ← Go home
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  const Component = project.Component;

  return (
    <Layout>
      <ReadingProgress />
      <div className="min-h-screen relative">
        {/* Hero Section */}
        <ProjectHero project={project} />

        {/* Table of Contents - Fixed position, outside flow */}
        <TableOfContents />

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          {/* Combined Metadata Strip - Full Width */}
          <div className="py-6 md:py-12 border-b border-border/20">
            {/* <MetadataStrip project={project} /> */}

            {/* Project Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-0 sm:gap-6">
              {/* Client/Company */}
              {project.links?.client && (
                <div className="py-4 sm:py-0 border-b sm:border-b-0 border-border/15">
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                    Client
                  </h3>
                  <p className="text-sm font-medium text-foreground">
                    {project.links.client}
                  </p>
                </div>
              )}

              {/* Project Type */}
              {project.type && (
                <div className="py-4 sm:py-0 border-b sm:border-b-0 border-border/15">
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                    Project Type
                  </h3>
                  <p className="text-sm font-medium text-foreground">
                    {project.type === "engineering"
                      ? "Engineering"
                      : "Design Case Study"}
                  </p>
                </div>
              )}

              {/* Role */}
              {project.roles && project.roles.length > 0 && (
                <div className="py-4 sm:py-0 border-b sm:border-b-0 border-border/15">
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                    Role
                  </h3>
                  <p className="text-sm font-medium text-foreground">
                    {project.roles.join(", ")}
                  </p>
                </div>
              )}

              {/* Timeline */}
              {project.date && (
                <div className="py-4 sm:py-0 border-b sm:border-b-0 border-border/15">
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                    Timeline
                  </h3>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(project.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              )}

              {/* Tech Stack */}
              {project.tech && project.tech.length > 0 && (
                <div className="col-span-1 sm:col-span-2 pt-4 sm:pt-0">
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          isDesigner
                            ? "bg-[hsl(var(--designer-surface))] text-[hsl(var(--designer-primary))] border border-[hsl(var(--designer-border))]"
                            : "bg-muted text-foreground border border-border"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* External Links */}
              {/* {project.links && Object.keys(project.links).length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                    Links
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(project.links)
                      .filter(([key]) => key !== "client")
                      .map(([key, url]) => (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm text-primary hover:underline font-medium"
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)} →
                        </a>
                      ))}
                  </div>
                </div>
              )} */}
            </div>
          </div>

          <div className="py-8 md:py-12">
            <article
              className={`
              mx-auto max-w-4xl
              prose prose-lg
              prose-headings:font-semibold
              ${
                isDesigner
                  ? "prose-headings:font-designer"
                  : "prose-headings:font-engineer"
              }
              ${
                isDesigner
                  ? "prose-h2:text-gradient-designer"
                  : "prose-h2:text-gradient-engineer"
              }
              ${
                isDesigner
                  ? "prose-blockquote:border-[hsl(var(--designer-primary))]"
                  : "prose-blockquote:border-primary"
              }
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-lg prose-img:shadow-md
              dark:prose-invert
            `}
            >
              {Component ? (
                <Component />
              ) : (
                <div>
                  <p>{project.summary || "No content available."}</p>
                </div>
              )}
            </article>

            {/* Gallery Section */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="mt-16 md:mt-24 pt-10 md:pt-16 border-t border-border/20">
                <h2
                  className={`heading-primary text-3xl md:text-4xl font-bold mb-12 text-center ${
                    isDesigner
                      ? "text-gradient-designer"
                      : "text-gradient-engineer"
                  }`}
                >
                  Project Gallery
                </h2>
                <ProjectGallery
                  project={project.slug}
                  images={project.gallery}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <ProjectFooter project={project} />
      </div>
    </Layout>
  );
};

export default ProjectPage;
