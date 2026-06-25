import React from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "@/lib/projects";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectFooter } from "@/components/projects/ProjectFooter";
import { TableOfContents } from "@/components/projects/TableOfContents";
import { ProjectGallery } from "@/components/ProjectImage";
import { useMode } from "@/contexts/ModeContext";
import { Layout } from "@/components/Layout";
import ReadingProgress from "@/components/ReadingProgress";
import SEO from "@/components/SEO";

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

  // Build SEO props from frontmatter
  const seoDescription =
    project.summary ||
    project.tagline ||
    `${project.title} a project by Sumit Knayyar`;
  const seoKeywords = [
    ...(project.tech || []),
    ...(project.tags || []),
    project.type === "engineering" ? "engineering" : "design",
  ];

  return (
    <Layout>
      <SEO
        title={project.title}
        description={seoDescription}
        path={`/projects/${project.slug}`}
        type="article"
        keywords={seoKeywords}
        publishedDate={project.date}
      />
      <ReadingProgress />
      <div className="min-h-screen relative">
        {/* Hero Section */}
        <ProjectHero project={project} />

        {/* Table of Contents - Fixed position, outside flow */}
        <TableOfContents />

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
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
