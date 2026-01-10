import { motion, useScroll, useSpring } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";

export const ReadingProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const { mode } = useMode();
  const isDesigner = mode === "designer";

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 z-50 origin-left ${
        isDesigner
          ? "bg-gradient-to-r from-[hsl(var(--designer-primary))] to-[hsl(var(--designer-accent))]"
          : "bg-gradient-to-r from-[hsl(var(--engineer-primary))] to-[hsl(var(--engineer-accent))]"
      }`}
      style={{ scaleX }}
    />
  );
};

export default ReadingProgress;
