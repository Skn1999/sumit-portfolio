import React from "react";
import { Layout } from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import SEO from "@/components/SEO";
import { Footer } from "@/components/Contact";
import { getProjectsBySubCategory, visibleProjects } from "@/lib/projects";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Layers, Terminal, Sparkles } from "lucide-react";
import { ProjectImage } from "@/components/ProjectImage";

export const AiAndDataSection: React.FC = () => {
  const aiProjects = visibleProjects.filter(
    (p) =>
      p.subCategory === "ai-data" ||
      (p.type === "engineering" && p.subCategory !== "frontend-engineering") ||
      p.tags?.some((t) =>
        ["AI", "LLM", "Data", "Python", "Machine Learning"].includes(t)
      )
  );

  return (
    <section
      id="ai-data"
      className="py-20 md:py-32 bg-paper-bg border-t border-paper-border"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-2">
            // DATA &amp; AI SYSTEMS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter">
            AI &amp; Data Engineering
          </h2>
          <p className="font-body-narrative text-base md:text-lg text-ink-muted mt-3 max-w-2xl">
            Human-in-the-loop AI workflows, LLM prompt engineering, autonomous agent tool integrations, and real-time data pipelines.
          </p>
        </motion.div>

        {/* AI Capabilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-2xl bg-paper-card border border-paper-border flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-paper-bg border border-paper-border flex items-center justify-center text-ink-primary mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-ink-primary mb-2">
                LLM Workflows &amp; Agents
              </h3>
              <p className="font-body-narrative text-sm text-ink-muted leading-relaxed">
                Designing deterministic agent chains, structured JSON schema outputs, tool calling mechanisms, and human oversight interfaces.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-paper-border/60 font-mono text-[11px] text-ink-muted uppercase">
              // LangChain • OpenAI • Anthropic • Function Calling
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-2xl bg-paper-card border border-paper-border flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-paper-bg border border-paper-border flex items-center justify-center text-ink-primary mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-ink-primary mb-2">
                Prompt Engineering &amp; Eval
              </h3>
              <p className="font-body-narrative text-sm text-ink-muted leading-relaxed">
                System prompt optimization, few-shot contextual conditioning, evaluation metrics, and guardrails for production LLM deployments.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-paper-border/60 font-mono text-[11px] text-ink-muted uppercase">
              // RAG • Context Windows • System Prompts • Guardrails
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-2xl bg-paper-card border border-paper-border flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-paper-bg border border-paper-border flex items-center justify-center text-ink-primary mb-4">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-ink-primary mb-2">
                Data Pipelines &amp; Analytics
              </h3>
              <p className="font-body-narrative text-sm text-ink-muted leading-relaxed">
                Real-time sensor telemetry processing, environmental air quality monitoring (EDIAQI EU Horizon), and data visualization dashboards.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-paper-border/60 font-mono text-[11px] text-ink-muted uppercase">
              // Time Series • Telemetry • Python • REST &amp; WebSockets
            </div>
          </motion.div>
        </div>

        {/* AI & Data Projects List */}
        {aiProjects.length > 0 && (
          <div>
            <h3 className="font-mono text-xs tracking-widest text-ink-muted uppercase mb-6">
              // FEATURED DATA &amp; AI CASE STUDIES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 md:p-8 rounded-2xl bg-paper-card border border-paper-border flex flex-col justify-between group hover:border-ink-primary/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted uppercase tracking-wider mb-4">
                      <span>{project.type || "ENGINEERING"}</span>
                      <span>{project.date}</span>
                    </div>

                    <Link to={`/projects/${project.slug}`} className="block group/link">
                      <h4 className="text-xl md:text-2xl font-bold font-display text-ink-primary group-hover/link:text-ink-primary/70 transition-colors leading-tight mb-3 flex items-start justify-between gap-3">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-5 h-5 shrink-0 text-ink-muted group-hover/link:text-ink-primary transition-colors" />
                      </h4>
                    </Link>

                    {project.summary && (
                      <p className="font-body-narrative text-sm text-ink-muted leading-relaxed mb-6 line-clamp-3">
                        {project.summary}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-paper-border/60">
                    {project.tech?.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-paper-bg text-ink-muted border border-paper-border text-[10px] font-mono tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export const FrontendEngineeringSection: React.FC = () => {
  const feProjects = getProjectsBySubCategory("frontend-engineering");

  return (
    <section
      id="frontend-engineering"
      className="py-20 md:py-32 bg-paper-bg border-t border-paper-border"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-2">
            // FRONT-END ARCHITECTURE
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter">
            Front-End Engineering &amp; Systems
          </h2>
          <p className="font-body-narrative text-base md:text-lg text-ink-muted mt-3 max-w-2xl">
            Bridging complex full-stack backends with performant, responsive React/TypeScript interfaces, WebGL 3D graphics, and design token systems.
          </p>
        </motion.div>

        {/* Featured Case Study: Optmyzr */}
        {feProjects.map((project) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, filter: "blur(6px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8 rounded-2xl bg-paper-card border border-paper-border mb-12 group hover:border-ink-primary/50 transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <span className="font-mono text-xs font-semibold tracking-widest text-ink-muted uppercase">
                  FEATURED FRONT-END CASE STUDY // {project.slug.replace(/-/g, " ").toUpperCase()}
                </span>
                <Link to={`/projects/${project.slug}`} className="group/link">
                  <h3 className="text-2xl md:text-4xl font-bold font-display text-ink-primary group-hover/link:text-ink-primary/70 transition-colors leading-tight flex items-start justify-between gap-4">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-6 h-6 shrink-0 text-ink-muted group-hover/link:text-ink-primary transition-colors" />
                  </h3>
                </Link>
                {project.summary && (
                  <p className="font-body-narrative text-base text-ink-muted leading-relaxed">
                    {project.summary}
                  </p>
                )}
                {project.metric && (
                  <span className="font-mono text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20 inline-block w-fit">
                    Impact: {project.metric}
                  </span>
                )}
              </div>

              {project.cover && (
                <div className="lg:col-span-5 rounded-xl border border-paper-border bg-paper-bg p-1 overflow-hidden aspect-[16/10]">
                  <ProjectImage
                    project={project.slug}
                    image={project.cover}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Component Systems */}
          <div className="p-8 rounded-2xl bg-paper-card border border-paper-border flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-paper-bg border border-paper-border flex items-center justify-center text-ink-primary mb-6">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-display text-ink-primary mb-3">
                Design System Engine &amp; Component Tokens
              </h3>
              <p className="font-body-narrative text-sm text-ink-muted leading-relaxed mb-6">
                Architecture of scalable CSS custom properties, HSL token pipelines, accessible Radix UI primitives, and Wabi-Sabi paper visual systems.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs text-ink-muted pt-4 border-t border-paper-border/60">
              <div className="flex justify-between">
                <span>Architecture</span>
                <span className="text-ink-primary">TypeScript + React 18</span>
              </div>
              <div className="flex justify-between">
                <span>Styling Engine</span>
                <span className="text-ink-primary">Tailwind CSS + Tokens</span>
              </div>
              <div className="flex justify-between">
                <span>Primitives</span>
                <span className="text-ink-primary">Radix UI + Headless</span>
              </div>
            </div>
          </div>

          {/* Interactive WebGL */}
          <div className="p-8 rounded-2xl bg-paper-card border border-paper-border flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-paper-bg border border-paper-border flex items-center justify-center text-ink-primary mb-6">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-display text-ink-primary mb-3">
                Interactive 3D WebGL &amp; Graphics
              </h3>
              <p className="font-body-narrative text-sm text-ink-muted leading-relaxed mb-6">
                High-performance 3D particle swarms, GLTF surface mesh sampling, custom GLSL shaders, and React Three Fiber (R3F) canvas integration.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs text-ink-muted pt-4 border-t border-paper-border/60">
              <div className="flex justify-between">
                <span>3D Graphics</span>
                <span className="text-ink-primary">Three.js + R3F</span>
              </div>
              <div className="flex justify-between">
                <span>Shaders</span>
                <span className="text-ink-primary">GLSL Vert &amp; Frag</span>
              </div>
              <div className="flex justify-between">
                <span>Asset Pipeline</span>
                <span className="text-ink-primary">GLTF / GLB Mesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DataEngineeringPage: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="Data & Front-End Engineering | Sumit Nayyar"
        description="AI LLM workflows, prompt engineering, data pipelines, and front-end WebGL engineering by Sumit Nayyar."
        path="/data-engineering"
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

          {/* Section 2: AI & Data Section */}
          <AiAndDataSection />

          {/* Section 3: Front-End Engineering Section */}
          <FrontendEngineeringSection />

          {/* Section 4: Footer */}
          <Footer />
        </div>
      </motion.div>
    </Layout>
  );
};

export default DataEngineeringPage;
