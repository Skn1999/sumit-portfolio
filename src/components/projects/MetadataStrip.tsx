import { Calendar, Users, Tag, TrendingUp } from "lucide-react";
import { ProjectMeta } from "@/lib/projects";

interface MetadataStripProps {
  project: ProjectMeta;
}

export const MetadataStrip: React.FC<MetadataStripProps> = ({ project }) => {
  return (
    <div className="flex flex-wrap gap-4 py-8 border-b border-border/20">
      {project.date && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
        </div>
      )}
      
      {project.roles && project.roles.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{project.roles.join(", ")}</span>
        </div>
      )}
      
      {project.type && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Tag className="w-4 h-4" />
          <span className="capitalize">{project.type}</span>
        </div>
      )}
      
      {project.metric && (
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <TrendingUp className="w-4 h-4" />
          <span>{project.metric}</span>
        </div>
      )}
    </div>
  );
};

export default MetadataStrip;
