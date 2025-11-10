import React from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "@/lib/projects";

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");

  if (!project) {
    return (
      <main className="max-w-4xl mx-auto py-16">
        <p>Project not found.</p>
        <Link to="/">Go home</Link>
      </main>
    );
  }

  const Component = project.Component;

  return (
    <main className="max-w-4xl mx-auto py-16">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{project.title}</h1>
        {project.tagline && <p className="text-muted">{project.tagline}</p>}
      </header>

      <section>
        {Component ? (
          <Component />
        ) : (
          <div>
            <p>{project.summary}</p>
            <pre>{JSON.stringify(project, null, 2)}</pre>
          </div>
        )}
      </section>
    </main>
  );
};

export default ProjectPage;
