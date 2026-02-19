import { useMode } from "@/contexts/ModeContext";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useState, useMemo } from "react";
import {
  getProjectsByType,
  getAllSkills,
  filterProjectsBySkills,
} from "@/lib/projects";
import { ProjectImage } from "./ProjectImage";
import { FilterBar } from "./FilterBar";
import { Link } from "react-router-dom";

const Projects = () => {
  const { mode } = useMode();
  const isEngineer = mode === "engineer";
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const engineerProjects = getProjectsByType("engineering");
  const designerProjects = getProjectsByType("design");

  const allProjects = isEngineer ? engineerProjects : designerProjects;

  // Get all skills and counts for current mode
  const { skills: availableSkills, counts: projectCounts } = useMemo(
    () => getAllSkills(isEngineer ? "engineering" : "design"),
    [isEngineer],
  );

  // Filter projects based on selected skills
  const projects = useMemo(
    () => filterProjectsBySkills(allProjects, selectedFilters),
    [allProjects, selectedFilters],
  );

  // Filter handlers
  const handleFilterToggle = (skill: string) => {
    setSelectedFilters((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
  };

  // Handle empty projects array
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-12 md:py-24 section-alt">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`heading-primary text-4xl md:text-5xl font-bold text-center mb-10 md:mb-16 mode-transition ${
                isEngineer ? "text-gradient-engineer" : "text-gradient-designer"
              }`}
            >
              {isEngineer ? "Building Solutions" : "Solving Problems"}
            </h2>
            <div className="card-styled p-12 rounded-2xl text-center">
              <p className="text-lg text-muted-foreground mb-4">
                {isEngineer
                  ? "Engineering projects coming soon! Switch to Designer mode to see available projects."
                  : "Design projects coming soon! Switch to Engineer mode to see available projects."}
              </p>
              <p className="text-sm text-muted-foreground">
                Use the mode toggle in the header to switch between modes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Ensure featuredIndex is valid
  const validFeaturedIndex = 0;
  const featuredProject = projects[validFeaturedIndex];

  return (
    <section id="projects" className="py-12 md:py-24 section-alt">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`heading-primary text-4xl md:text-5xl font-bold text-center mb-10 md:mb-16 mode-transition ${
              isEngineer ? "text-gradient-engineer" : "text-gradient-designer"
            }`}
          >
            {isEngineer ? "Building Solutions" : "Solving Problems"}
          </h2>

          {/* Filter Bar — commented out for now (only 2 projects) */}
          {/* {availableSkills.length > 0 && (
            <FilterBar
              skills={availableSkills}
              selectedFilters={selectedFilters}
              onFilterToggle={handleFilterToggle}
              onClearAll={handleClearFilters}
              projectCounts={projectCounts}
            />
          )} */}

          {/* No Results Message */}
          {projects.length === 0 && selectedFilters.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-styled p-12 rounded-2xl text-center"
            >
              <p className="text-lg text-muted-foreground mb-4">
                No projects found with selected skills
              </p>
              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="rounded-xl"
              >
                Clear filters
              </Button>
            </motion.div>
          )}

          {/* Projects Grid */}
          {projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group h-full"
                >
                  <div className="card-styled h-full p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col">
                    {/* Project Image */}
                    {project.cover ? (
                      <ProjectImage
                        className="w-full h-48 rounded-xl mb-4 overflow-hidden"
                        project={project.slug}
                        image={project.cover}
                      />
                    ) : (
                      <div
                        className={`w-full h-48 rounded-xl mb-4 flex items-center justify-center ${
                          isEngineer
                            ? "bg-[hsl(var(--engineer-surface))]"
                            : "bg-[hsl(var(--designer-surface))]"
                        }`}
                      >
                        <p className="text-muted-foreground text-sm">
                          No image
                        </p>
                      </div>
                    )}

                    {/* Metric Badge */}
                    {project.metric && (
                      <div className="mb-3">
                        <span
                          className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${
                            isEngineer
                              ? "bg-primary/10 text-primary border border-primary/20"
                              : "bg-[hsl(var(--designer-primary))]/10 text-[hsl(var(--designer-primary))] border border-[hsl(var(--designer-primary))]/20"
                          }`}
                        >
                          {project.metric}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3
                      className={`text-xl font-bold mb-2 group-hover:text-primary transition-colors ${
                        isEngineer ? "font-engineer" : "font-designer"
                      }`}
                    >
                      {project.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.tagline}
                    </p>

                    {/* Tech Stack */}
                    {project.tech && project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              isEngineer
                                ? "bg-[hsl(var(--engineer-surface))] text-[hsl(var(--engineer-primary))]"
                                : "bg-[hsl(var(--designer-surface))] text-[hsl(var(--designer-primary))] border border-[hsl(var(--designer-border))]"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="px-2 py-1 rounded text-xs font-medium text-muted-foreground">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {/* View Project Button - Sticky to Bottom */}
                    <div className="mt-auto pt-4 border-t border-border/20">
                      <Link
                        to={`/projects/${project.slug}`}
                        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all group-hover:gap-3 ${
                          isEngineer
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl"
                            : "bg-[hsl(var(--designer-primary))] text-white border-3 border-[hsl(var(--designer-border))] shadow-[4px_4px_0px_hsl(var(--designer-border))] hover:shadow-[2px_2px_0px_hsl(var(--designer-border))] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
                        }`}
                      >
                        View Project
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
