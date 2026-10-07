import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";

interface BiteImageProps {
  /** Path relative to src/content/ux-bites/ e.g. "joy-buying-flow/cover.jpg" */
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const BiteImage = memo(function BiteImage({
  src,
  alt,
  className,
  priority,
}: BiteImageProps) {
  const url = useMemo(() => {
    try {
      return new URL(`../../content/ux-bites/${src}`, import.meta.url).href;
    } catch {
      return "";
    }
  }, [src]);

  if (!url) return <div className={cn("bg-muted", className)} aria-hidden />;
  return (
    <img
      src={url}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
    />
  );
});

export default BiteImage;
