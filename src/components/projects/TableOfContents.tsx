import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMode } from "@/contexts/ModeContext";

export const TableOfContents: React.FC = () => {
  const { mode } = useMode();
  const isDesigner = mode === "designer";
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3"),
    );
    const headingData = elements.map((elem) => ({
      id: elem.id || elem.textContent?.toLowerCase().replace(/\s+/g, "-") || "",
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
      { rootMargin: "-100px 0px -66%" },
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Lock body scroll when expanded
  useEffect(() => {
    if (isHovered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setIsHovered(false), 200);
  };

  useEffect(() => {
    return () => clearTimeout(hoverTimeout.current);
  }, []);

  if (headings.length === 0) return null;

  const activeIndex = headings.findIndex((h) => h.id === activeId);
  const accentColor = isDesigner
    ? "hsl(var(--designer-primary))"
    : "hsl(var(--primary))";

  return (
    <div
      className="hidden xl:block fixed top-32 right-8 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative"
      >
        <AnimatePresence mode="wait">
          {!isHovered ? (
            /* Collapsed state: lines */
            <motion.div
              key="lines"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-[5px] items-end cursor-pointer py-2 pr-1"
            >
              {headings.map((heading, index) => (
                <motion.div
                  key={heading.id}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: heading.level === 3 ? "12px" : "20px",
                    height: "2.5px",
                    backgroundColor:
                      index === activeIndex
                        ? accentColor
                        : "hsl(var(--muted-foreground) / 0.25)",
                  }}
                />
              ))}
            </motion.div>
          ) : (
            /* Expanded state: full TOC */
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "rounded-xl p-4 origin-top-right",
                isDesigner
                  ? "bg-card/80 backdrop-blur-sm border border-border/30 shadow-lg"
                  : "bg-card/95 backdrop-blur-md border border-border/20 shadow-lg",
              )}
              style={{ maxWidth: "280px" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">
                On this page
              </p>
              <nav>
                <ul className="space-y-0.5">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      style={{
                        paddingLeft: heading.level === 3 ? "0.75rem" : "0",
                      }}
                    >
                      <a
                        href={`#${heading.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsHovered(false);
                          document.getElementById(heading.id)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }}
                        className={cn(
                          "block text-[13px] py-1 px-2 rounded-md transition-all duration-150",
                          activeId === heading.id
                            ? isDesigner
                              ? "text-[hsl(var(--designer-primary))] font-medium"
                              : "text-primary font-medium"
                            : "text-muted-foreground/70 hover:text-foreground",
                        )}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TableOfContents;
