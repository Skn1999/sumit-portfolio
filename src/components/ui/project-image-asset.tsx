import React, { memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import imageDimensions from "@/lib/image-dimensions.json";

interface ImageDimension {
  width: number;
  height: number;
  aspectRatio?: string;
}

interface ProjectImageAssetProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * This component handles dynamic image imports in Vite
 * and sets intrinsic width/height + aspect ratio to prevent CLS.
 */
export const ProjectImageAsset = memo(function ProjectImageAsset({
  src,
  fallbackSrc,
  alt,
  className,
  priority = false,
  width,
  height,
  style,
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

  const dims = useMemo(() => {
    const table = imageDimensions as Record<string, ImageDimension | undefined>;
    const exact = table[src];
    if (exact) return exact;
    const basename = src.split("/").pop() || "";
    return table[basename];
  }, [src]);

  const resolvedWidth = width ?? dims?.width;
  const resolvedHeight = height ?? dims?.height;

  if (!imageUrl && !fallbackUrl) {
    // Return empty div with same dimensions to prevent layout shift
    return (
      <div
        className={cn("bg-muted w-full h-auto", className)}
        style={{
          aspectRatio:
            resolvedWidth && resolvedHeight
              ? `${resolvedWidth} / ${resolvedHeight}`
              : undefined,
          ...style,
        }}
        aria-hidden="true"
      />
    );
  }

  // If a GIF is provided with a PNG fallback, use <picture> with <source type="image/gif">
  if (fallbackUrl && (imageUrl.includes(".gif") || src.endsWith(".gif"))) {
    return (
      <picture className={className}>
        <source srcSet={imageUrl} type="image/gif" />
        <img
          src={fallbackUrl}
          alt={alt}
          width={resolvedWidth}
          height={resolvedHeight}
          className={cn("w-full h-auto", className)}
          style={{
            aspectRatio:
              resolvedWidth && resolvedHeight
                ? `${resolvedWidth} / ${resolvedHeight}`
                : undefined,
            ...style,
          }}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
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
      width={resolvedWidth}
      height={resolvedHeight}
      className={cn("w-full h-auto", className)}
      style={{
        aspectRatio:
          resolvedWidth && resolvedHeight
            ? `${resolvedWidth} / ${resolvedHeight}`
            : undefined,
        ...style,
      }}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={(e) => {
        if (fallbackUrl && e.currentTarget.src !== fallbackUrl) {
          e.currentTarget.src = fallbackUrl;
        }
      }}
    />
  );
});
