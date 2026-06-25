import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";

interface ProjectImageAssetProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /**
   * Optional cap on rendered image width. Number → px, string passed through
   * (e.g. "720px", "48rem"). When set, the image is centered within its column.
   */
  maxWidth?: number | string;
}

/**
 * This component handles dynamic image imports in Vite
 */
export const ProjectImageAsset = memo(function ProjectImageAsset({
  src,
  alt,
  className,
  priority = false,
  maxWidth,
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

  const style =
    maxWidth !== undefined
      ? { maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth, width: "100%" }
      : undefined;
  const centerClass = maxWidth !== undefined ? "mx-auto block" : undefined;

  if (!imageUrl) {
    // Return empty div with same dimensions to prevent layout shift
    return (
      <div
        className={cn("bg-muted", centerClass, className)}
        style={style}
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={cn("max-w-full h-auto", className)}
      loading={priority ? "eager" : "lazy"}
    />
  );
});
