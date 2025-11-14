import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMode } from "@/contexts/ModeContext";
import { List } from "lucide-react";

export const TableOfContents: React.FC = () => {
  const { mode } = useMode();
  const isDesigner = mode === "designer";
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    );
    const headingData = elements.map((elem) => ({
      id:
        elem.id ||
        elem.textContent?.toLowerCase().replace(/\s+/g, "-") ||
        "",
      text: elem.textContent || "",
      level: parseInt(elem.tagName[1]),
    }));

    elements.forEach((elem, index) => {
      if (!elem.id && headingData[index]) {
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

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:block fixed top-32 right-8 w-64 z-30">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`card-styled p-6 rounded-xl sticky top-32 ${
          isDesigner ? "bg-card/80 backdrop-blur-sm" : "bg-card/95 backdrop-blur-md"
        }`}
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/20">
          <List className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Contents
          </h3>
        </div>

        <nav>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{
                  paddingLeft: heading.level === 3 ? "1rem" : "0",
                }}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={cn(
                    "block text-sm py-1.5 px-2 rounded-md transition-all",
                    activeId === heading.id
                      ? isDesigner
                        ? "text-[hsl(var(--designer-primary))] bg-[hsl(var(--designer-primary))]/10 font-semibold border-l-3 border-[hsl(var(--designer-primary))]"
                        : "text-primary bg-primary/10 font-semibold border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </div>
  );
};

export default TableOfContents;
