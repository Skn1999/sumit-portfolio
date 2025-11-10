import type { ProjectImage as ProjectImageType } from "./projects";

// Create a record of all project images using Vite's glob import
const projectImages = import.meta.glob<{ default: string }>(
  "../content/projects/**/*.{png,jpg,jpeg,gif,webp}",
  { eager: true }
);

/**
 * Get the path for a project image
 */
export function getProjectImagePath(
  projectSlug: string,
  imageName: string
): string {
  const imagePath = `../content/projects/${projectSlug}/${imageName}`;
  const image = projectImages[imagePath];

  if (!image) {
    console.warn(`Image not found: ${imagePath}`);
    return ""; // or a placeholder image path
  }

  return image.default;
}

/**
 * Get image object with URL
 */
export function getProjectImage(
  projectSlug: string,
  image: ProjectImageType
): {
  src: string;
  alt: string;
  caption?: string;
} {
  return {
    src: getProjectImagePath(projectSlug, image.filename),
    alt: image.alt,
    caption: image.caption,
  };
}
