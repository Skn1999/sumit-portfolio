import React from "react";

export const ProjectHero: React.FC<{
  title?: string;
  tagline?: string;
  cover?: string;
}> = ({ title, tagline, cover }) => {
  return (
    <header className="project-hero mb-8">
      {cover && (
        <div className="w-full h-64 rounded-lg overflow-hidden mb-6">
          <img src={cover} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      {tagline && <p className="text-muted">{tagline}</p>}
    </header>
  );
};

export default ProjectHero;
