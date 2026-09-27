import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ProjectImageAsset } from "@/components/ui/project-image-asset";

interface EditorialSideBySideProps {
  mediaSrc: string;
  mediaAlt: string;
  fallbackSrc?: string;
  title: string;
  description: string | ReactNode;
  className?: string;
}

/**
 * Non-alternating side-by-side row (Rachel Chen layout):
 * Left column: Media (60%)
 * Right column: Title & Description (Auto / ~40%), aligned to bottom
 */
export function EditorialSideBySide({
  mediaSrc,
  mediaAlt,
  fallbackSrc,
  title,
  description,
  className,
}: EditorialSideBySideProps) {
  return (
    <div
      className={cn(
        "editorial-breakout editorial-side-by-side not-prose my-8 md:my-14",
        className
      )}
    >
      <div className="editorial-media-container">
        <ProjectImageAsset
          src={mediaSrc}
          fallbackSrc={fallbackSrc}
          alt={mediaAlt}
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="editorial-text-side">
        <h3 className="font-display font-bold text-base md:text-lg text-ink-primary tracking-tight leading-snug mb-1.5">
          {title}
        </h3>
        <div className="text-xs md:text-sm text-ink-muted leading-relaxed max-w-sm">
          {description}
        </div>
      </div>
    </div>
  );
}

interface EditorialGrid2UpProps {
  children: ReactNode;
  className?: string;
}

/**
 * 2-Up comparison grid for paired artifacts / design system plates
 */
export function EditorialGrid2Up({ children, className }: EditorialGrid2UpProps) {
  return (
    <div
      className={cn(
        "editorial-breakout editorial-grid-2up not-prose my-8 md:my-14",
        className
      )}
    >
      {children}
    </div>
  );
}

interface EditorialCardProps {
  mediaSrc: string;
  mediaAlt: string;
  fallbackSrc?: string;
  title: string;
  description: string | ReactNode;
  className?: string;
}

export function EditorialCard({
  mediaSrc,
  mediaAlt,
  fallbackSrc,
  title,
  description,
  className,
}: EditorialCardProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="editorial-media-container">
        <ProjectImageAsset
          src={mediaSrc}
          fallbackSrc={fallbackSrc}
          alt={mediaAlt}
          className="w-full h-auto object-contain"
        />
      </div>
      <div>
        <h4 className="font-display font-bold text-sm md:text-base text-ink-primary tracking-tight mb-1">
          {title}
        </h4>
        <div className="text-xs md:text-sm text-ink-muted leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
}
