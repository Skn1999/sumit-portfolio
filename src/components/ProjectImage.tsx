import { cn } from "@/lib/utils";
import type { ProjectImage as ProjectImageType } from "@/lib/projects";
import { HTMLAttributes, useState } from "react";
import { ProjectImageAsset } from "./ui/project-image-asset";
import { useMode } from "@/contexts/ModeContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
        <figcaption className="mt-3 text-sm text-muted-foreground italic text-center">
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
  const { mode } = useMode();
  const isDesigner = mode === "designer";
  const [selectedImage, setSelectedImage] = useState<ProjectImageType | null>(
    null
  );

  return (
    <>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8", className)}>
        {images.map((image, index) => (
          <motion.div
            key={image.filename}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedImage(image)}
            className={`group cursor-pointer overflow-hidden transition-all ${
              isDesigner
                ? "rounded-xl border-4 border-[hsl(var(--designer-border))] hover:shadow-[6px_6px_0px_hsl(var(--designer-border))]"
                : "rounded-xl shadow-lg hover:shadow-2xl"
            }`}
          >
            <div className="relative overflow-hidden aspect-[4/3]">
              <ProjectImageAsset
                src={`${project}/${image.filename}`}
                alt={image.alt}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            {image.caption && (
              <div className="p-4 bg-card">
                <p className="text-sm text-muted-foreground text-center">
                  {image.caption}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[90vh] w-full"
            >
              <ProjectImageAsset
                src={`${project}/${selectedImage.filename}`}
                alt={selectedImage.alt}
                className="w-full h-full object-contain rounded-lg"
              />
              {selectedImage.caption && (
                <p className="mt-4 text-center text-white/80">
                  {selectedImage.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
