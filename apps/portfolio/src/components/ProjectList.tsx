import React from "react";
import { visibleProjects } from "@/lib/projects";
import { Link } from "react-router-dom";

const ProjectList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {visibleProjects.map((p) => (
        <article key={p.slug} className="p-6 bg-card rounded-2xl">
          {p.cover && (
            <img
              src={p.cover.filename}
              alt={p.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          <h3 className="text-2xl font-bold">{p.title}</h3>
          {p.summary && <p className="text-sm text-muted mb-3">{p.summary}</p>}
          <Link to={`/projects/${p.slug}`} className="text-sm underline">
            View case study
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ProjectList;
