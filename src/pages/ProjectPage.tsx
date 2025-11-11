import React from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "@/lib/projects";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { MetadataStrip } from "@/components/projects/MetadataStrip";
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <ProjectHero project={project} />

      {/* Main Content Container */}
      <div className="max-w-3xl mx-auto px-6">
        {/* Metadata Strip */}
        <MetadataStrip project={project} />

        {/* Main Content Area */}
        <main className="pt-20">
          <article className="prose prose-xl dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-p:leading-loose prose-p:mb-8 prose-p:text-foreground/90 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md prose-img:w-full">
            {Component ? (
              <Component />
            ) : (
              <div>
                <p>{project.summary}</p>
              </div>
            )}
          </article>

          {/* Gallery Section */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-24">
              <h2 className="text-4xl font-bold mb-12 text-center">Gallery</h2>
              <ProjectGallery project={project.slug} images={project.gallery} />
            </div>
          )}

          {/* Footer Navigation */}
          <ProjectFooter project={project} />
        </main>
      </div>
    </div>
  );
};

export default ProjectPage;
