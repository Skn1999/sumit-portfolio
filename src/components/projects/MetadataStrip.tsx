import { Calendar, Users, Tag, TrendingUp } from "lucide-react";
import { ProjectMeta } from "@/lib/projects";

interface MetadataStripProps {
  project: ProjectMeta;
}

export const MetadataStrip: React.FC<MetadataStripProps> = ({ project }) => {
  const metadata = [
    { label: "Deliverables", value: project.tags?.join(", "), show: project.tags?.length },
    { label: "My Role", value: project.roles?.join(", "), show: project.roles?.length },
    { label: "Type", value: project.type, show: project.type },
    { label: "Completed", value: project.date ? new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : null, show: project.date },
  ].filter(item => item.show);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
      {metadata.map((item, index) => (
        <div key={index} className="text-center">
          <div className="text-sm font-semibold text-foreground/60 mb-2 uppercase tracking-wide">
            {item.label}
          </div>
          <div className="text-sm text-foreground/80">
            {item.value || "—"}
          </div>
        </div>
      ))}
      
      {project.metric && (
        <div className="col-span-2 md:col-span-4 text-center mt-4">
          <div className="inline-block px-6 py-3 bg-primary/10 rounded-lg">
            <div className="text-sm font-semibold text-primary">
              {project.metric}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetadataStrip;
