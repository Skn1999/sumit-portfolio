import { ProjectMeta } from "@/lib/projects";
import { useMode } from "@/contexts/ModeContext";
import { Calendar, Briefcase, Code2, Award } from "lucide-react";
import { motion } from "framer-motion";

interface MetadataStripProps {
  project: ProjectMeta;
}

export const MetadataStrip: React.FC<MetadataStripProps> = ({ project }) => {
  const { mode } = useMode();
  const isDesigner = mode === "designer";

  const metadataItems = [];

  if (project.roles && project.roles.length > 0) {
    metadataItems.push({
      icon: Briefcase,
      label: "Role",
      value: project.roles.join(", "),
    });
  }

  if (project.date) {
    metadataItems.push({
      icon: Calendar,
      label: "Timeline",
      value: new Date(project.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      }),
    });
  }

  if (project.type) {
    metadataItems.push({
      icon: project.type === "engineering" ? Code2 : Award,
      label: "Category",
      value: project.type.charAt(0).toUpperCase() + project.type.slice(1),
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="py-16 border-y border-border/20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {metadataItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    {item.label}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tech Stack */}
        {project.tech && project.tech.length > 0 && (
          <div className="text-center pt-8 border-t border-border/10">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">
              Technologies
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-transform hover:scale-105 ${
                    isDesigner
                      ? "bg-[hsl(var(--designer-surface))] text-[hsl(var(--designer-primary))] border-2 border-[hsl(var(--designer-border))]"
                      : "bg-muted text-foreground border border-border"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Metric/Impact */}
        {project.metric && (
          <div className="text-center mt-8 pt-8 border-t border-border/10">
            <div
              className={`inline-block px-6 py-3 rounded-xl font-bold text-sm ${
                isDesigner
                  ? "bg-[hsl(var(--designer-primary))] text-white border-3 border-[hsl(var(--designer-border))] shadow-[4px_4px_0px_hsl(var(--designer-border))]"
                  : "bg-primary text-primary-foreground shadow-lg"
              }`}
            >
              {project.metric}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MetadataStrip;
