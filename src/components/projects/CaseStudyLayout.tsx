import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

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
        className
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
        className
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
        "lg:w-[calc(100%+4rem)] lg:-mx-8 xl:w-[calc(100%+8rem)] xl:-mx-16 2xl:w-[calc(100%+12rem)] 2xl:-mx-24",
        reverse &&
          "md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] [&>*:first-child]:md:order-2",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function CaseStudyText({
  children,
  className,
  ...props
}: DivProps) {
  return (
    <div
      className={cn(
        "prose prose-slate max-w-none dark:prose-invert prose-headings:mt-0 prose-p:leading-relaxed prose-li:leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CaseStudyMedia({
  children,
  className,
  ...props
}: FigureProps) {
  return (
    <figure
      className={cn(
        "not-prose overflow-hidden rounded-2xl border border-border bg-muted/50 p-3 scroll-snap-item",
        className
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
        className
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
