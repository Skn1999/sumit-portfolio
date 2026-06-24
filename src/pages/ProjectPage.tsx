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

  React.useEffect(() => {
    if (!project) return;

    // Only run if native CSS scroll timelines are NOT supported and user does not prefer reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || CSS.supports("animation-timeline: view()")) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        rootMargin: "0px 0px -10% 0px", // triggers slightly before entering full view
        threshold: 0.05,
      }
    );

    // Select all elements to reveal on scroll
    const selectors = [
      ".project-page-snap-container article > h2",
      ".project-page-snap-container article > h3",
      ".project-page-snap-container article > h4",
      ".project-page-snap-container article > p",
      ".project-page-snap-container article > ul",
      ".project-page-snap-container article > ol",
      ".project-page-snap-container .scroll-reveal",
      ".project-page-snap-container blockquote",
      ".project-page-snap-container pre",
      ".project-page-snap-container figure",
      ".project-page-snap-container .scroll-snap-item",
    ];

    const elements = document.querySelectorAll(selectors.join(", "));
    elements.forEach((el) => {
      el.classList.add("scroll-reveal-fallback");
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [project]);

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
      <div className="min-h-screen relative project-page-snap-container">
        {/* Hero Section */}
        <ProjectHero project={project} />

        {/* Table of Contents - Fixed position, outside flow */}
        <TableOfContents />

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-20 bg-background rounded-t-[2.5rem] pt-12">
          <div className="py-4 md:py-8">
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
              prose-a:text-primary
              prose-img:rounded-2xl prose-img:shadow-lg
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
              <div className="mt-16 md:mt-24 pt-10 md:pt-16 border-t border-border/20 scroll-snap-item scroll-mt-24">
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
