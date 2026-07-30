import React from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "@/lib/projects";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectFooter } from "@/components/projects/ProjectFooter";
import { TableOfContents } from "@/components/projects/TableOfContents";
import { Layout } from "@/components/Layout";
import ReadingProgress from "@/components/ReadingProgress";
import SEO from "@/components/SEO";

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");

  React.useEffect(() => {
    if (!project) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
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
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.05,
      }
    );

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
        <main className="min-h-screen flex items-center justify-center px-6 bg-paper-bg">
          <div className="p-12 text-center max-w-md border border-paper-border rounded-xl bg-paper-card">
            <h1 className="font-display text-3xl font-bold text-ink-primary mb-4">
              Project not found
            </h1>
            <p className="font-body-narrative text-ink-muted mb-6">
              The project you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/"
              className="font-mono text-xs text-ink-primary uppercase tracking-widest hover:underline"
            >
              ← Go home
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  const Component = project.Component;

  const seoDescription =
    project.summary ||
    project.tagline ||
    `${project.title} a project by Sumit Nayyar`;
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
      <TableOfContents />
      <div className="min-h-screen relative project-page-snap-container bg-paper-bg">
        {/* Text-first Hero Section */}
        <ProjectHero project={project} />

        {/* Main Content Container sitting on Slate Paper */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-20 py-12 md:py-16">
          <article
            className="
              mx-auto max-w-4xl
              prose prose-lg
              prose-headings:font-bold prose-headings:font-display prose-headings:tracking-tighter
              prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:text-ink-primary prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-paper-border prose-h2:pb-3
              prose-h3:text-lg prose-h3:md:text-xl prose-h3:text-ink-primary prose-h3:mt-8 prose-h3:mb-3
              prose-p:font-body-narrative prose-p:text-base prose-p:md:text-lg prose-p:text-ink-muted prose-p:leading-[1.8] prose-p:my-5
              prose-blockquote:font-body-narrative prose-blockquote:text-ink-primary prose-blockquote:border-l-2 prose-blockquote:border-paper-border prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-8
              prose-a:text-ink-primary prose-a:underline prose-a:decoration-paper-border hover:prose-a:decoration-ink-primary
              prose-li:font-body-narrative prose-li:text-ink-muted prose-li:text-base prose-li:md:text-lg
              prose-img:rounded-xl prose-img:border prose-img:border-paper-border prose-img:my-8
            "
          >
            {Component ? (
              <Component />
            ) : (
              <div>
                <p>{project.summary || "No content available."}</p>
              </div>
            )}
          </article>
        </div>

        {/* Simple Footer Navigation */}
        <ProjectFooter project={project} />
      </div>
    </Layout>
  );
};

export default ProjectPage;
