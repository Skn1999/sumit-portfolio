import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { ProjectImage } from "./ProjectImage";
import { getProjectsBySubCategory } from "@/lib/projects";

const Projects = () => {
  const uxProjects = getProjectsBySubCategory("ux-design");

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <section
      id="ux-design"
      onMouseMove={handleMouseMove}
      className="relative pt-24 md:pt-36 bg-paper-bg border-t border-paper-border"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-2">
            // UX DESIGN & INTERACTION ARCHITECTURE
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter">
            User Experience Projects
          </h2>
          <p className="font-body-narrative text-base md:text-lg text-ink-muted mt-3 max-w-2xl">
            Human-centered interaction frameworks, decision-support systems, accessibility standards, and participatory design research.
          </p>
        </motion.div>

        {/* Floating Paper Image Preview Card on Desktop Hover */}
        <AnimatePresence>
          {hoveredIndex !== null && uxProjects[hoveredIndex]?.cover && (
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
                project={uxProjects[hoveredIndex].slug}
                image={uxProjects[hoveredIndex].cover!}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimalist Editorial Index List */}
        <div className="flex flex-col border-b border-paper-border">
          {uxProjects.map((project, index) => {
            const isExternal = Boolean(project.externalUrl);
            const targetUrl = project.externalUrl || `/projects/${project.slug}`;

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
                      0{index + 1} // {project.slug.replace(/-/g, " ").toUpperCase()}
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
                    {isExternal ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-start justify-between gap-4"
                      >
                        <h3 className="text-xl md:text-3xl font-bold font-display text-ink-primary group-hover/link:text-ink-primary/70 transition-colors leading-tight">
                          {project.title}
                        </h3>
                        <ExternalLink className="w-5 h-5 shrink-0 text-ink-muted group-hover/link:text-ink-primary transition-colors" />
                      </a>
                    ) : (
                      <Link
                        to={targetUrl}
                        className="group/link flex items-start justify-between gap-4"
                      >
                        <h3 className="text-xl md:text-3xl font-bold font-display text-ink-primary group-hover/link:text-ink-primary/70 transition-colors leading-tight">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 shrink-0 text-ink-muted group-hover/link:text-ink-primary transition-colors" />
                      </Link>
                    )}

                    {project.summary && (
                      <p className="text-sm md:text-base font-body-narrative text-ink-muted leading-relaxed">
                        {project.summary}
                      </p>
                    )}

                    {project.metric && (
                      <div className="pt-1">
                        <span className="font-mono text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20 inline-block">
                          Impact: {project.metric}
                        </span>
                      </div>
                    )}

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
    </section>
  );
};

export default Projects;
