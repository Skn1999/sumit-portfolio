import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useMode } from "@/contexts/ModeContext";

interface FilterBarProps {
  skills: string[];
  selectedFilters: string[];
  onFilterToggle: (skill: string) => void;
  onClearAll: () => void;
  projectCounts: Record<string, number>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  skills,
  selectedFilters,
  onFilterToggle,
  onClearAll,
  projectCounts,
}) => {
  const { mode } = useMode();
  const isDesigner = mode === "designer";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      {/* Header with Clear All */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Filter by Skills
          </h3>
          {selectedFilters.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {selectedFilters.length} filter
              {selectedFilters.length > 1 ? "s" : ""} active
            </p>
          )}
        </div>

        <AnimatePresence>
          {selectedFilters.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={onClearAll}
              className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear all
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => {
          const isSelected = selectedFilters.includes(skill);
          const count = projectCounts[skill] || 0;

          return (
            <motion.button
              key={skill}
              onClick={() => onFilterToggle(skill)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-300
                flex items-center gap-2
                ${
                  isSelected
                    ? isDesigner
                      ? "bg-[hsl(var(--designer-primary))] text-white border-2 border-[hsl(var(--designer-border))] shadow-[3px_3px_0px_hsl(var(--designer-border))]"
                      : "bg-primary text-primary-foreground shadow-lg"
                    : isDesigner
                    ? "bg-card text-foreground border-2 border-border/30 hover:border-[hsl(var(--designer-primary))] hover:shadow-[2px_2px_0px_hsl(var(--designer-border))]"
                    : "bg-card text-foreground border border-border/50 hover:border-primary/50 hover:shadow-md"
                }
              `}
            >
              <span>{skill}</span>
              <span
                className={`
                  text-xs px-1.5 py-0.5 rounded-full
                  ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  }
                `}
              >
                {count}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* No Filters Message */}
      {skills.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No skills available for filtering
        </p>
      )}
    </motion.div>
  );
};
