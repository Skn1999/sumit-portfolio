import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import SEO from "@/components/SEO";
import { Footer } from "@/components/Contact";
import { visibleProjects, ProjectSubCategory } from "@/lib/projects";
import { ProjectIndexList } from "@/components/ProjectIndexList";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

type FilterKey = "all" | ProjectSubCategory;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Work" },
  { key: "ux-design", label: "Product & UX Design" },
  { key: "frontend-engineering", label: "Design Engineering" },
  { key: "ai-data", label: "AI & Data Systems" },
  { key: "visual-design", label: "Visual Design" },
];

const WorkPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredProjects = visibleProjects.filter((p) => {
    if (activeFilter === "all") return true;
    return p.subCategory === activeFilter;
  });

  return (
    <Layout>
      <SEO
        title="Work & Systems | Sumit Nayyar"
        description="Curated case studies, design engineering systems, and human-in-the-loop AI workflows."
        path="/work"
      />

      <div className="relative pt-20 md:pt-32 pb-24 max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 16 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-ink-muted uppercase mb-3">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SELECTED WORK &amp; CASE STUDIES</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display text-ink-primary tracking-tighter">
            Craft, Code &amp; Systems
          </h1>
          <p className="font-body-narrative text-base md:text-xl text-ink-muted mt-4 max-w-2xl leading-relaxed">
            Enterprise B2B SaaS architecture, interactive design engineering prototypes,
            and research-backed decision support systems.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center gap-2 mb-12"
        >
          {FILTERS.map((filter) => {
            const isSelected = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-mono tracking-wide transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-ink-primary text-paper-bg font-semibold shadow-xs"
                    : "bg-paper-card text-ink-muted hover:text-ink-primary border border-paper-border hover:border-ink-primary/40"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </motion.div>

        {/* Project List */}
        <div className="mb-20">
          <ProjectIndexList
            projects={filteredProjects}
            categoryTag={
              FILTERS.find((f) => f.key === activeFilter)?.label.toUpperCase() ||
              "WORK"
            }
          />
        </div>

        {/* Labs Playground Teaser Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10 rounded-2xl bg-paper-card border border-paper-border flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-ink-muted uppercase tracking-wider mb-2">
              <Sparkles className="size-3.5 text-amber-500" />
              <span>LABS PLAYGROUND</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-ink-primary tracking-tight">
              Experimental Prototypes &amp; Creative Code
            </h3>
            <p className="text-sm font-body-narrative text-ink-muted mt-1 max-w-xl">
              Micro-interactions, 3D Canvas experiments, shader explorations, and proof-of-concepts live in the Labs repository.
            </p>
          </div>

          <Link
            to="/for-startups"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-paper-bg hover:bg-paper-card border border-paper-border hover:border-ink-primary text-xs font-mono font-semibold text-ink-primary transition-all shrink-0 self-start md:self-center"
          >
            <span>Explore Collabs</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        </motion.div>

        {/* Footer */}
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default WorkPage;
