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
      const startScroll = 50;
      const endScroll = 500;

      // Calculate scroll fraction (0 to 1)
      const fraction = Math.min(1, Math.max(0, (scrollY - startScroll) / (endScroll - startScroll)));

      const inner = document.querySelector(".cinematic-hero-inner") as HTMLElement;
      const img = document.querySelector(".cinematic-hero-image") as HTMLElement;
      const overlay = document.querySelector(".cinematic-hero-overlay") as HTMLElement;
      const caption = document.querySelector(".cinematic-hero-caption") as HTMLElement;

      if (inner) {
        // Interpolate border radius: 16px (rounded-2xl) -> 0px
        const radius = 16 - fraction * 16;
        // Interpolate max-width: 64rem (1024px) -> window width
        const widthVal = fraction > 0.99 ? "100vw" : "100%";
        const maxWVal = fraction > 0.99 ? "100vw" : "64rem";
        const transformY = -fraction * 80;
        // Interpolate height from sticky frame 65vh to full vertical height 90vh
        const heightVal = fraction > 0.99 ? "90vh" : `${65 + fraction * 25}vh`;

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
        overlay.style.opacity = `${fraction * 0.95}`;
      }

      if (caption) {
        caption.style.opacity = `${1 - fraction}`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load to establish correct states if page is already scrolled
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [project]);

  return (
    <header className="relative overflow-hidden pt-14 md:pt-20 scroll-snap-item scroll-mt-0 pb-0">
      {/* Centered content with padding */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col gap-10 md:gap-12 pb-8 md:pb-12">
        {/* Top: Staggered Fade & Slide Up Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          {project.type && (
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {project.type === "engineering" ? "Engineering" : "Design"}
            </p>
          )}
          <h1 className="heading-primary text-5xl font-extrabold leading-tight text-foreground md:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          {project.tagline && (
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:text-2xl">
              {project.tagline}
            </p>
          )}
        </motion.div>

        {/* Middle: Staggered Fade In Metadata */}
        {hasMetadata && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border/60 bg-muted/30 p-5 md:p-6 max-w-5xl mx-auto w-full"
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

      {/* Bottom: Cover Image with scroll zoom layout - OUTSIDE center container for true full-width bleed */}
      {project.cover && (
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full cinematic-hero-wrapper mt-4 scroll-snap-item scroll-mt-24"
        >
          <div className="cinematic-hero-sticky">
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/40 shadow-lg cinematic-hero-inner">
              <ProjectImageAsset
                src={`${project.slug}/${project.cover.filename}`}
                alt={project.cover.alt || project.title}
                className="w-full h-full object-cover cinematic-hero-image"
                priority
              />
              {/* Premium gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20 opacity-0 cinematic-hero-overlay pointer-events-none" />
            </div>
          </div>
          {project.cover.caption && (
            <figcaption className="mt-4 text-sm italic text-muted-foreground text-center cinematic-hero-caption px-4">
              {project.cover.caption}
            </figcaption>
          )}
        </motion.figure>
      )}
    </header>
  );
};

export default ProjectHero;
