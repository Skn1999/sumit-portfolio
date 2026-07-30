import React from "react";
import { Layout } from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import Contact, { Footer } from "@/components/Contact";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { getProjectsBySubCategory } from "@/lib/projects";
import { Link } from "react-router-dom";
import { ProjectImage } from "@/components/ProjectImage";

export const VisualDesignProjects: React.FC = () => {
  const visualProjects = getProjectsBySubCategory("visual-design");

  return (
    <section
      id="visual-design"
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
            // VISUAL DESIGN & BRAND SYSTEMS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter">
            Visual Design Projects
          </h2>
          <p className="font-body-narrative text-base md:text-lg text-ink-muted mt-4 max-w-2xl">
            Selected visual design explorations, component design systems, and mobile UI/UX case studies.
          </p>
        </motion.div>

        {/* Minimalist Editorial Index List for Visual Design */}
        <div className="flex flex-col border-b border-paper-border mb-16">
          {visualProjects.map((project, index) => {
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
                className="border-t border-paper-border py-8 md:py-12 group transition-colors duration-300 hover:bg-paper-card/40"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Monospace Tag & Index */}
                  <div className="lg:col-span-3 flex items-center justify-between lg:flex-col lg:items-start gap-2">
                    <span className="font-mono text-xs font-semibold tracking-widest text-ink-muted uppercase">
                      0{index + 1} // VISUAL
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {project.tech?.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-paper-card text-ink-muted border border-paper-border text-[10px] font-mono tracking-wider"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="lg:col-span-9 flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        {project.tagline && (
                          <span className="font-mono text-xs text-ink-muted uppercase tracking-wider block mb-1">
                            {project.tagline}
                          </span>
                        )}
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
                          aria-label={`View ${project.title} on Behance`}
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

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
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
                          <span>View on Behance</span>
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
                    </div>

                    {/* Image Thumbnail */}
                    {project.cover && (
                      <div className="mt-2 rounded-xl border border-paper-border bg-paper-card p-1 overflow-hidden aspect-[16/9] max-w-xl">
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

const VisualDesignPage: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="Visual Design & Design Systems | Sumit Nayyar"
        description="Visual design case studies, design system engineering, and Behance project portfolio by Sumit Nayyar."
        path="/visual-design"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="relative z-10 scroll-blur-content">
          {/* Section 1: Hero Section */}
          <HeroSection />

          {/* Section 2: Visual Design Projects Showcase */}
          <VisualDesignProjects />

          {/* Section 3: Contact & Footer */}
          <Contact />
          <Footer />
        </div>
      </motion.div>
    </Layout>
  );
};

export default VisualDesignPage;
