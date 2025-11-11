import { ProjectMeta } from "@/lib/projects";

interface MetadataStripProps {
  project: ProjectMeta;
}

export const MetadataStrip: React.FC<MetadataStripProps> = ({ project }) => {
  const metadataItems = [];
  
  if (project.roles && project.roles.length > 0) {
    metadataItems.push(project.roles.join(", "));
  }
  
  if (project.date) {
    metadataItems.push(new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }));
  }
  
  if (project.type) {
    metadataItems.push(project.type.charAt(0).toUpperCase() + project.type.slice(1));
  }

  return (
    <div className="text-center py-12 border-b border-border/10">
      {metadataItems.length > 0 && (
        <p className="text-sm text-muted-foreground mb-4">
          {metadataItems.join(" • ")}
        </p>
      )}
      
      {project.tech && project.tech.length > 0 && (
        <p className="text-xs text-muted-foreground/70">
          {project.tech.join(" • ")}
        </p>
      )}
      
      {project.metric && (
        <p className="text-sm font-medium text-primary mt-4">
          {project.metric}
        </p>
      )}
    </div>
  );
};

export default MetadataStrip;
