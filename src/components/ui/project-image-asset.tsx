import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";

interface ProjectImageAssetProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * This component handles dynamic image imports in Vite
 */
export const ProjectImageAsset = memo(function ProjectImageAsset({
  src,
  fallbackSrc,
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

  const fallbackUrl = useMemo(() => {
    if (!fallbackSrc) return "";
    try {
      return new URL(`../../content/projects/${fallbackSrc}`, import.meta.url).href;
    } catch (e) {
      console.warn(`Failed to load fallback image: ${fallbackSrc}`, e);
      return "";
    }
  }, [fallbackSrc]);

  if (!imageUrl && !fallbackUrl) {
    // Return empty div with same dimensions to prevent layout shift
    return <div className={cn("bg-muted", className)} aria-hidden="true" />;
  }

  // If a GIF is provided with a PNG fallback, use <picture> with <source type="image/gif">
  if (fallbackUrl && (imageUrl.includes(".gif") || src.endsWith(".gif"))) {
    return (
      <picture className={className}>
        <source srcSet={imageUrl} type="image/gif" />
        <img
          src={fallbackUrl}
          alt={alt}
          className={cn("max-w-full h-auto", className)}
          loading={priority ? "eager" : "lazy"}
          onError={(e) => {
            if (e.currentTarget.src !== fallbackUrl) {
              e.currentTarget.src = fallbackUrl;
            }
          }}
        />
      </picture>
    );
  }

  return (
    <img
      src={imageUrl || fallbackUrl}
      alt={alt}
      className={cn("max-w-full h-auto", className)}
      loading={priority ? "eager" : "lazy"}
      onError={(e) => {
        if (fallbackUrl && e.currentTarget.src !== fallbackUrl) {
          e.currentTarget.src = fallbackUrl;
        }
      }}
    />
  );
});
