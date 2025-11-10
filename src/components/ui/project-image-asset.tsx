import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";

interface ProjectImageAssetProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * This component handles dynamic image imports in Vite
 */
export const ProjectImageAsset = memo(function ProjectImageAsset({
  src,
  alt,
  className,
  priority = false,
}: ProjectImageAssetProps) {
  const imageUrl = useMemo(() => {
    try {
      // Try to get the image using dynamic import
      // This will be processed by Vite during build
      return new URL(`../../content/projects/${src}`, import.meta.url).href;
    } catch (e) {
      console.warn(`Failed to load image: ${src}`, e);
      return "";
    }
  }, [src]);

  if (!imageUrl) {
    // Return empty div with same dimensions to prevent layout shift
    return <div className={cn("bg-muted", className)} aria-hidden="true" />;
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
    />
  );
});
