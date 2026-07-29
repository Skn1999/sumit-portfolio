import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ProjectImageAsset } from "@/components/ui/project-image-asset";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
};

type DivProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

type FigureProps = ComponentPropsWithoutRef<"figure"> & {
  children: ReactNode;
};

type ImpactMetricProps = ComponentPropsWithoutRef<"div"> & {
  value: ReactNode;
  label: ReactNode;
  children?: ReactNode;
};

type CaseStudySplitProps = SectionProps & {
  reverse?: boolean;
};

type EngineeringCalloutProps = ComponentPropsWithoutRef<"aside"> & {
  children: ReactNode;
  title?: ReactNode;
};

export function ImpactMetricBanner({
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "not-prose my-10 grid gap-4 rounded-2xl border border-border bg-muted/50 p-5 sm:grid-cols-2 md:my-12 md:grid-cols-3 md:p-6 scroll-snap-item",
        "lg:w-[calc(100%+4rem)] lg:-mx-8 xl:w-[calc(100%+8rem)] xl:-mx-16 2xl:w-[calc(100%+12rem)] 2xl:-mx-24",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function ImpactMetric({
  value,
  label,
  children,
  className,
  ...props
}: ImpactMetricProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background p-4",
        className,
      )}
      {...props}
    >
      <p className="font-mono text-3xl font-semibold leading-none text-primary md:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {children && (
        <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
}

export function CaseStudySplit({
  children,
  className,
  reverse = false,
  ...props
}: CaseStudySplitProps) {
  return (
    <section
      className={cn(
        "not-prose my-10 grid gap-6 md:my-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start md:gap-8 scroll-snap-item",
        "lg:w-[calc(100%+4rem)] lg:-mx-8 xl:w-[calc(100%+8rem)] xl:-mx-16 2xl:w-[calc(100%+12rem)] 2xl:-mx-24 lg:place-items-center",
        reverse &&
          "md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] [&>*:first-child]:md:order-2 lg:place-items-center",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function CaseStudyText({ children, className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "prose prose-slate max-w-none dark:prose-invert prose-headings:mt-0 prose-p:leading-relaxed prose-li:leading-relaxed",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CaseStudyMedia({ children, className, ...props }: FigureProps) {
  return (
    <figure
      className={cn(
        "not-prose overflow-hidden rounded-2xl border border-border bg-muted/50 p-3 scroll-snap-item",
        className,
      )}
      {...props}
    >
      <div className="overflow-hidden rounded-xl bg-background">{children}</div>
    </figure>
  );
}

export function EngineeringCallout({
  title,
  children,
  className,
  ...props
}: EngineeringCalloutProps) {
  return (
    <aside
      className={cn(
        "not-prose my-8 rounded-2xl border border-border bg-muted/50 p-5 md:p-6 scroll-snap-item",
        className,
      )}
      {...props}
    >
      {title && (
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
          {title}
        </p>
      )}
      <div className="text-sm leading-relaxed text-foreground md:text-base">
        {children}
      </div>
    </aside>
  );
}

/* ===== 4-Zone Editorial Layout Components (v2 Magazine Spread) ===== */

// ---- Types ----

type ProjectHeaderProps = {
  label: string;
  title: string;
  tagline: string;
  tags: string[];
  coverSrc: string;
  coverAlt: string;
  accentColor?: string;
  className?: string;
};

type ContextStripProps = {
  problem: ReactNode;
  role: ReactNode;
  className?: string;
};

type WorkSectionProps = {
  heading: string;
  body: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageCaption?: string;
  imagePosition?: "left" | "right" | "full";
  className?: string;
};

type OutcomeMetric = {
  value: string;
  label: string;
};

type OutcomeFooterProps = {
  metrics: OutcomeMetric[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

// ---- Zone 1: ProjectHeader ----

/**
 * Zone 1: Asymmetric two-column header block.
 * Left: type label, h1 title, one-sentence tagline, skill tag pills.
 * Right: cover image with optional accent border.
 */
export function ProjectHeader({
  label,
  title,
  tagline,
  tags,
  coverSrc,
  coverAlt,
  accentColor,
  className,
}: ProjectHeaderProps) {
  return (
    <section
      className={cn(
        "not-prose project-header-zone py-12 md:py-16",
        "grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-12",
        className,
      )}
      aria-label={`${title} — project header`}
    >
      {/* Left: text stack */}
      <div className="flex flex-col gap-4">
        <span className="font-mono text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        <h1
          className="font-display text-3xl md:text-4xl xl:text-5xl font-bold text-foreground leading-[1.1]"
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground leading-[1.6] font-medium max-w-[48ch]">
          {tagline}
        </p>
        {/* Skill pill row */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1" role="list" aria-label="Technologies used">
            {tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                role="listitem"
                className="inline-flex items-center rounded-xl bg-foreground text-background text-[10px] md:text-xs font-semibold px-3 py-1.5 leading-none tracking-wide select-none"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right: cover image */}
      <div
        className="overflow-hidden rounded-2xl w-full aspect-[4/3] md:aspect-auto md:h-[420px]"
        style={{
          border: accentColor
            ? `2px solid ${accentColor}`
            : "2px solid hsl(var(--primary) / 0.35)",
        }}
      >
        <ProjectImageAsset
          src={coverSrc}
          alt={coverAlt}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </section>
  );
}

// ---- Zone 2: ContextStrip ----

/**
 * Zone 2: Two-column context strip.
 * Left: "The Problem" (2 sentences). Right: "My Role" (2 sentences).
 * Features a 1px top divider and muted uppercase section labels.
 */
export function ContextStrip({ problem, role, className }: ContextStripProps) {
  return (
    <section
      className={cn(
        "not-prose context-strip-zone",
        "border-t border-border/60 pt-10 pb-10 md:pt-12 md:pb-12",
        "grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12",
        className,
      )}
      aria-label="Project context: problem and role"
    >
      <div className="flex flex-col gap-3">
        <h2
          className="font-mono text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          aria-label="The problem"
        >
          The Problem
        </h2>
        <div className="text-sm md:text-base text-foreground/90 leading-[1.6]">
          {problem}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2
          className="font-mono text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          aria-label="My role"
        >
          My Role
        </h2>
        <div className="text-sm md:text-base text-foreground/90 leading-[1.6]">
          {role}
        </div>
      </div>
    </section>
  );
}

// ---- Zone 3: WorkSection ----

/**
 * Zone 3: A standalone work section block.
 * Heading: declarative claim (≤12 words).
 * Body: supporting prose (2 sentences).
 * Image: full-width or split (left/right), with optional muted caption below.
 * imagePosition: "left" | "right" | "full" (default "right")
 */
export function WorkSection({
  heading,
  body,
  imageSrc,
  imageAlt,
  imageCaption,
  imagePosition = "right",
  className,
}: WorkSectionProps) {
  const isFull = imagePosition === "full";

  const textBlock = (
    <div className="flex flex-col gap-4 justify-center">
      <h2
        className="font-display text-xl md:text-2xl xl:text-3xl font-bold text-foreground leading-[1.2]"
        style={{ letterSpacing: "-0.03em" }}
      >
        {heading}
      </h2>
      <div className="text-sm md:text-base text-muted-foreground leading-[1.6] max-w-[52ch]">
        {body}
      </div>
    </div>
  );

  const imageBlock = (
    <figure className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
        <ProjectImageAsset
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto object-cover"
        />
      </div>
      {imageCaption && (
        <figcaption className="text-xs md:text-sm italic text-muted-foreground leading-[1.5] text-center px-2">
          {imageCaption}
        </figcaption>
      )}
    </figure>
  );

  if (isFull) {
    return (
      <section
        className={cn(
          "not-prose work-section-zone py-12 md:py-16 flex flex-col gap-8",
          className,
        )}
      >
        {textBlock}
        {imageBlock}
      </section>
    );
  }

  return (
    <section
      className={cn(
        "not-prose work-section-zone py-12 md:py-16",
        "grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-12",
        className,
      )}
    >
      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </section>
  );
}

// ---- Zone 4: OutcomeFooter ----

/**
 * Zone 4: Compact outcome footer.
 * Three metric callouts (value + label) in a grid.
 * Optional single CTA button below.
 */
export function OutcomeFooter({
  metrics,
  ctaLabel,
  ctaHref,
  className,
}: OutcomeFooterProps) {
  return (
    <section
      className={cn(
        "not-prose outcome-footer-zone",
        "border-t border-border/60 pt-10 md:pt-12 pb-12 md:pb-16",
        className,
      )}
      aria-label="Project outcomes and results"
    >
      {/* Metrics grid */}
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-3"
        role="list"
        aria-label="Key metrics"
      >
        {metrics.slice(0, 3).map((m, i) => (
          <div key={i} className="flex flex-col gap-1.5" role="listitem">
            <span
              className="font-display text-4xl md:text-5xl font-bold text-primary leading-none"
              style={{ letterSpacing: "-0.03em" }}
            >
              {m.value}
            </span>
            <span className="text-xs md:text-sm text-muted-foreground leading-[1.4] font-medium">
              {m.label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA row */}
      {ctaLabel && ctaHref && (
        <div className="mt-10">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2",
              "rounded-xl bg-foreground text-background",
              "text-xs md:text-sm font-semibold px-4 py-3 leading-none",
              "transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            )}
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </section>
  );
}
