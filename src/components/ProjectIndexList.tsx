import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { ProjectMeta } from "@/lib/projects";
import { ProjectImage } from "./ProjectImage";

interface ProjectIndexListProps {
  projects: (ProjectMeta & { Component?: React.ComponentType })[];
  categoryTag?: string;
}

export const ProjectIndexList: React.FC<ProjectIndexListProps> = ({
  projects,
  categoryTag,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      {/* Floating Paper Image Preview Card on Desktop Hover */}
      <AnimatePresence>
        {hoveredIndex !== null && projects[hoveredIndex]?.cover && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              x: mousePos.x + 24,
              y: mousePos.y - 120,
            }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 25,
              mass: 0.5,
            }}
            className="pointer-events-none absolute z-50 w-[360px] aspect-[16/10] bg-paper-card p-2 rounded-xl border border-paper-border shadow-xl overflow-hidden hidden lg:block"
            style={{
              left: 0,
              top: 0,
            }}
          >
            <ProjectImage
              project={projects[hoveredIndex].slug}
              image={projects[hoveredIndex].cover!}
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimalist Editorial Index List */}
      <div className="flex flex-col border-b border-paper-border">
        {projects.map((project, index) => {
          const isExternal = Boolean(project.externalUrl);
          const targetUrl = project.externalUrl || `/projects/${project.slug}`;

          const tagPrefix = categoryTag
            ? categoryTag
            : project.slug.replace(/-/g, " ").toUpperCase();

          return (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, filter: "blur(6px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="border-t border-paper-border py-8 md:py-12 group transition-colors duration-300 hover:bg-paper-card/40"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Index & Monospace Tag */}
                <div className="lg:col-span-3 flex items-center justify-between lg:flex-col lg:items-start gap-2">
                  <span className="font-mono text-xs font-semibold tracking-widest text-ink-muted uppercase">
                    0{index + 1} // {tagPrefix}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.tech?.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-paper-card text-ink-muted border border-paper-border text-[10px] font-mono tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title & Summary */}
                <div className="lg:col-span-9 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {/* {project.tagline && (
                        <span className="font-mono text-xs text-ink-muted uppercase tracking-wider block mb-1">
                          {project.tagline}
                        </span>
                      )} */}
                      {isExternal ? (
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/title hover:text-ink-primary/70 transition-colors"
                        >
                          <h3 className="text-xl md:text-3xl font-bold font-display text-ink-primary leading-tight">
                            {project.title}
                          </h3>
                        </a>
                      ) : (
                        <Link
                          to={targetUrl}
                          className="group/title hover:text-ink-primary/70 transition-colors"
                        >
                          <h3 className="text-xl md:text-3xl font-bold font-display text-ink-primary leading-tight">
                            {project.title}
                          </h3>
                        </Link>
                      )}
                    </div>

                    {isExternal ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-paper-border bg-paper-card text-ink-primary hover:border-ink-primary transition-all shrink-0"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    ) : (
                      <Link
                        to={targetUrl}
                        className="p-2 rounded-lg border border-paper-border bg-paper-card text-ink-primary hover:border-ink-primary transition-all shrink-0"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </Link>
                    )}
                  </div>

                  {project.summary && (
                    <p className="text-sm md:text-base font-body-narrative text-ink-muted leading-relaxed">
                      {project.summary}
                    </p>
                  )}

                  {/* <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    {project.metric && (
                      <span className="font-mono text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">
                        Impact: {project.metric}
                      </span>
                    )}

                    {isExternal ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-ink-primary hover:underline ml-auto"
                      >
                        <span>View Presentation</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        to={targetUrl}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-ink-primary hover:underline ml-auto"
                      >
                        <span>Read Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div> */}

                  {/* Static Image Thumbnail on Mobile / Tablet */}
                  {project.cover && (
                    <div className="block lg:hidden mt-2 rounded-xl border border-paper-border bg-paper-card p-1 overflow-hidden aspect-[16/10]">
                      <ProjectImage
                        project={project.slug}
                        image={project.cover}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectIndexList;
