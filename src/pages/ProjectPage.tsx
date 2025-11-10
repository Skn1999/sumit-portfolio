import React from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "@/lib/projects";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { MetadataStrip } from "@/components/projects/MetadataStrip";
import { TableOfContents } from "@/components/projects/TableOfContents";
import { ProjectFooter } from "@/components/projects/ProjectFooter";
import { ProjectGallery } from "@/components/ProjectImage";

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Go home
          </Link>
        </div>
      </main>
    );
  }

  const Component = project.Component;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Full Width */}
      <ProjectHero project={project} />

      {/* Main Story Container - Centered, Narrow */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        {/* Metadata Boxes - Minimal, Centered */}
        <MetadataStrip project={project} />

        {/* Main Story Content */}
        <article className="mt-20 prose prose-lg lg:prose-xl dark:prose-invert max-w-none
          prose-headings:font-bold 
          prose-headings:tracking-tight
          prose-h2:text-4xl 
          prose-h2:mt-24 
          prose-h2:mb-8
          prose-h3:text-2xl 
          prose-h3:mt-16 
          prose-h3:mb-6
          prose-p:leading-loose 
          prose-p:text-foreground/80
          prose-p:mb-8
          prose-a:text-primary 
          prose-a:no-underline 
          hover:prose-a:underline
          prose-img:rounded-none
          prose-img:w-full
          prose-img:my-16
          prose-ul:my-8
          prose-li:my-2">
          
          {Component ? (
            <Component />
          ) : (
            <div>
              <p className="text-xl leading-relaxed">{project.summary}</p>
            </div>
          )}
        </article>

        {/* Gallery Section - Full Bleed Within Container */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-24 mb-24">
            <h2 className="text-4xl font-bold mb-12 tracking-tight">Gallery</h2>
            <ProjectGallery project={project.slug} images={project.gallery} className="gap-8" />
          </div>
        )}

        {/* Footer Navigation */}
        <ProjectFooter project={project} />
      </div>
    </div>
  );
};

export default ProjectPage;
