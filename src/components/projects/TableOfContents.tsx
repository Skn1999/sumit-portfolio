import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectMeta } from "@/lib/projects";

interface TableOfContentsProps {
  project: ProjectMeta;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ project }) => {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from the page
    const elements = Array.from(document.querySelectorAll("h2, h3"));
    const headingData = elements.map((elem) => ({
      id: elem.id || elem.textContent?.toLowerCase().replace(/\s+/g, "-") || "",
      text: elem.textContent || "",
      level: parseInt(elem.tagName[1]),
    }));
    
    // Add IDs to headings if they don't have them
    elements.forEach((elem, index) => {
      if (!elem.id) {
        elem.id = headingData[index].id;
      }
    });
    
    setHeadings(headingData);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <aside className="hidden lg:block sticky top-24 h-fit">
      <nav className="space-y-1">
        <h4 className="text-sm font-semibold mb-4 text-foreground/60">On this page</h4>
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={cn(
              "block w-full text-left text-sm py-1.5 transition-colors relative",
              heading.level === 3 && "pl-4",
              activeId === heading.id
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {activeId === heading.id && (
              <motion.div
                layoutId="active-toc"
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"
                transition={{ duration: 0.2 }}
              />
            )}
            {heading.text}
          </button>
        ))}
      </nav>

      {/* Tech Stack */}
      {project.tech && project.tech.length > 0 && (
        <div className="mt-8 pt-8 border-t border-border/20">
          <h4 className="text-sm font-semibold mb-3 text-foreground/60">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default TableOfContents;
