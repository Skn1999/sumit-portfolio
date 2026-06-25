import React from "react";
import { ProjectMeta } from "@/lib/projects";
import { ProjectImageAsset } from "@/components/ui/project-image-asset";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectHeroProps {
  project: ProjectMeta;
}

const formatTimeline = (date?: string) => {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

const MetadataSection: React.FC<{
  label: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, children, className }) => (
  <section className={cn("flex flex-col gap-1", className)}>
    <h2 className="mb-1 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-slate-500">
      {label}
    </h2>
    {children}
  </section>
);

export const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
  const timeline = formatTimeline(project.date);
  const linkEntries = project.links
    ? Object.entries(project.links).filter(([key]) => key !== "client")
    : [];
  const hasMetadata =
    Boolean(project.roles?.length) ||
    Boolean(project.tech?.length) ||
    Boolean(project.metric) ||
    Boolean(timeline) ||
    linkEntries.length > 0;

  React.useEffect(() => {
    if (!project.cover || CSS.supports("animation-timeline: scroll()")) {
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const startScroll = 0;
      const endScroll = 550;

      // Calculate scroll fraction (0 to 1)
      const fraction = Math.min(1, Math.max(0, (scrollY - startScroll) / (endScroll - startScroll)));

      const inner = document.querySelector(".cinematic-hero-inner") as HTMLElement;
      const img = document.querySelector(".cinematic-hero-image") as HTMLElement;
      const overlay = document.querySelector(".cinematic-hero-overlay") as HTMLElement;

      if (inner) {
        // Interpolate border radius: 16px (rounded-2xl) -> 0px
        const radius = 16 - fraction * 16;
        // Interpolate width: (window width minus padding) -> window width
        const widthVal = (() => {
          if (fraction > 0.99) return "100vw";
          const w = window.innerWidth;
          const pad = w < 768 ? 32 : w < 1024 ? 48 : 0;
          const initialWidth = w - pad;
          const currentWidth = initialWidth + fraction * pad;
          return `${currentWidth}px`;
        })();
        const maxWVal = fraction > 0.99 ? "100vw" : "64rem";
        const transformY = -fraction * 60;
        // Keep height at 50vh (do not exceed half of the viewport height)
        const heightVal = "50vh";

        inner.style.borderRadius = `${radius}px`;
        inner.style.width = widthVal;
        inner.style.maxWidth = maxWVal;
        inner.style.height = heightVal;
        inner.style.transform = `translateY(${transformY}px)`;
      }

      if (img) {
        // Interpolate scale: 1.05 -> 1.15
        const scale = 1.05 + fraction * 0.1;
        img.style.transform = `scale(${scale})`;
      }

      if (overlay) {
        overlay.style.opacity = `${0.15 + fraction * 0.8}`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load to establish correct states if page is already scrolled
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [project]);

  return (
    <header className="relative w-full overflow-hidden">
      {/* 1. Cover Image: Sticky flow underlay */}
      {project.cover && (
        <div className="cinematic-hero-wrapper pointer-events-none">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/40 shadow-lg cinematic-hero-inner">
            <ProjectImageAsset
              src={`${project.slug}/${project.cover.filename}`}
              alt={project.cover.alt || project.title}
              className="w-full h-full object-cover cinematic-hero-image"
              priority
            />
            {/* Dark base layer to ensure absolute legibility of light text in both modes */}
            <div className="absolute inset-0 bg-black/15 dark:bg-black/40 pointer-events-none" />
            {/* Premium gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/25 opacity-0 cinematic-hero-overlay pointer-events-none" />
          </div>
        </div>
      )}

      {/* 2. Foreground Content: Sit below cover image on page load, scrolls OVER it on scroll */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 md:px-6 pt-16 pb-20 flex flex-col gap-10 md:gap-12 pointer-events-auto bg-transparent text-foreground">
        {/* Top: Staggered Fade & Slide Up Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto flex flex-col items-center select-none"
        >
          {project.type && (
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-background/80 px-3.5 py-1 rounded-full backdrop-blur-md border border-border/40 inline-block shadow-sm">
              {project.type === "engineering" ? "Engineering" : "Design"}
            </p>
          )}
          <h1 className="heading-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-foreground drop-shadow-md select-text bg-background/15 dark:bg-background/5 px-4 py-2 rounded-2xl backdrop-blur-xs">
            {project.title}
          </h1>
          {project.tagline && (
            <p className="mt-6 max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-muted-foreground drop-shadow-sm select-text bg-background/15 dark:bg-background/5 px-4 py-2 rounded-xl backdrop-blur-xs">
              {project.tagline}
            </p>
          )}
        </motion.div>

        {/* Middle: Staggered Fade In Metadata with blur/semi-trans background */}
        {hasMetadata && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border/60 bg-background/70 dark:bg-card/75 backdrop-blur-md p-5 md:p-6 max-w-5xl mx-auto w-full shadow-lg"
          >
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-left">
              {project.roles && project.roles.length > 0 && (
                <MetadataSection label="Roles">
                  <p className="text-sm font-medium leading-relaxed text-foreground">
                    {project.roles.join(", ")}
                  </p>
                </MetadataSection>
              )}

              {timeline && (
                <MetadataSection label="Timeline">
                  <p className="text-sm font-medium text-foreground">
                    {timeline}
                  </p>
                </MetadataSection>
              )}

              {project.tech && project.tech.length > 0 && (
                <MetadataSection
                  label="Implementation Stack"
                  className="lg:col-span-2"
                >
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-border/60 bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </MetadataSection>
              )}

              {linkEntries.length > 0 && (
                <MetadataSection label="Links">
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {linkEntries.map(([key, url]) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)} →
                      </a>
                    ))}
                  </div>
                </MetadataSection>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default ProjectHero;
