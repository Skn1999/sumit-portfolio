import { cn } from "@/lib/utils";
import type { ProjectImage as ProjectImageType } from "@/lib/projects";
import { HTMLAttributes } from "react";
import { ProjectImageAsset } from "./ui/project-image-asset";

interface ProjectImageProps extends HTMLAttributes<HTMLImageElement> {
  project: string;
  image: ProjectImageType;
  className?: string;
}

export function ProjectImage({
  project,
  image,
  className,
  ...props
}: ProjectImageProps) {
  const imagePath = `${project}/${image.filename}`;

  return (
    <figure className={cn("relative", className)}>
      <ProjectImageAsset
        src={imagePath}
        alt={image.alt}
        className={cn("object-cover w-full h-full rounded-lg")}
        {...props}
      />
      {image.caption && (
        <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

interface ProjectGalleryProps {
  project: string;
  images: ProjectImageType[];
  className?: string;
}

export function ProjectGallery({
  project,
  images,
  className,
}: ProjectGalleryProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-12",
        className
      )}
    >
      {images.map((image) => (
        <div key={image.filename} className="group transition-all hover:shadow-xl">
          <ProjectImage
            project={project}
            image={image}
            className="aspect-[4/3]"
          />
        </div>
      ))}
    </div>
  );
}
