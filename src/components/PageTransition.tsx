import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    animate: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    exit: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
