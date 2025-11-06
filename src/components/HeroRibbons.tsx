import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";

const separators = ["  •  ", "  /  ", "  |  ", "  ~  "];

const makeMarquee = (text: string, repeat: number, separatorIndex: number = 0) =>
  Array.from({ length: repeat })
    .map(() => text)
    .join(separators[separatorIndex % separators.length]);

const HeroRibbons: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { mode } = useMode();

  // Scroll progress for the section only
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Horizontal motion for four ribbons with different speeds
  const x1 = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-35%", "35%"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
  const x4 = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  // Wave motion - vertical sine wave undulation
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 15]);

  // Fade ribbons as section leaves viewport
  const ribbonsOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Photo parallax - subtle scale and parallax
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  // Text content with more instances for seamless loop
  const lineText = useMemo(
    () => [
      makeMarquee("SUMIT KNAYYAR", 32, 0),
      makeMarquee("SUMIT KNAYYAR", 32, 1),
      makeMarquee("SUMIT KNAYYAR", 32, 2),
      makeMarquee("SUMIT KNAYYAR", 32, 3),
    ],
    []
  );

  const isDesigner = mode === "designer";
  const ribbonFont = isDesigner ? "font-designer" : "font-engineer";

  // Four ribbons with varied properties
  const ribbons = [
    { 
      x: x1, 
      y: y1, 
      text: lineText[0], 
      rotation: -12, 
      top: "32%", 
      opacity: 0.4, 
      zIndex: 10,
      fontSize: "text-3xl md:text-5xl lg:text-6xl",
      style: isDesigner ? "text-foreground/40" : "text-foreground/30"
    },
    { 
      x: x2, 
      y: y2, 
      text: lineText[1], 
      rotation: -6, 
      top: "43%", 
      opacity: 0.6, 
      zIndex: 15,
      fontSize: "text-4xl md:text-6xl lg:text-7xl",
      style: isDesigner ? "text-foreground/60 font-semibold" : "text-gradient-engineer"
    },
    { 
      x: x3, 
      y: y3, 
      text: lineText[2], 
      rotation: 7, 
      top: "57%", 
      opacity: 0.75, 
      zIndex: 30,
      fontSize: "text-4xl md:text-6xl lg:text-7xl",
      style: isDesigner 
        ? "text-transparent [-webkit-text-stroke:2px_hsl(var(--foreground)/0.8)]" 
        : "text-foreground/70 font-bold"
    },
    { 
      x: x4, 
      y: y4, 
      text: lineText[3], 
      rotation: 13, 
      top: "68%", 
      opacity: 0.9, 
      zIndex: 35,
      fontSize: "text-3xl md:text-5xl lg:text-6xl",
      style: isDesigner ? "text-foreground/90 font-bold" : "text-foreground/80 font-semibold"
    }
  ];

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className="relative h-[100svh] overflow-hidden flex items-center justify-center bg-background"
    >
      {/* Photo centered with parallax */}
      <motion.div
        style={{ y: photoY, scale: photoScale }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[min(90vw,420px)] h-[min(90vw,420px)] md:w-[420px] md:h-[420px] will-change-transform"
      >
        <div className={`${isDesigner ? "neubrutalism-card" : "shadow-xl"} w-full h-full rounded-2xl overflow-hidden bg-card transition-transform duration-500 hover:scale-105`}>
          <img
            src="/images/hero.jpg"
            alt="Portrait of Sumit Knayyar"
            loading="eager"
            className="w-full h-full object-cover select-none"
            draggable={false}
          />
        </div>
      </motion.div>

      {/* Ribbons group with global fade */}
      <motion.div style={{ opacity: ribbonsOpacity }} className="absolute inset-0">
        {ribbons.map((ribbon, index) => (
          <motion.div
            key={index}
            style={{ 
              x: ribbon.x, 
              y: ribbon.y,
              top: ribbon.top,
              rotate: `${ribbon.rotation}deg`,
              zIndex: ribbon.zIndex,
            }}
            className="absolute left-0 right-0 will-change-transform"
            aria-hidden
          >
            <div
              className={`whitespace-nowrap ${ribbonFont} tracking-wide uppercase ${ribbon.style}`}
            >
              <span className={`inline-block px-4 ${ribbon.fontSize}`}>
                {ribbon.text}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Visually hidden H1 for SEO */}
      <h1 className="sr-only">Sumit Knayyar — Engineer and Designer Portfolio</h1>
    </section>
  );
};

export default HeroRibbons;
