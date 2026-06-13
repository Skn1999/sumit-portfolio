import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export const PullQuote: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="not-prose my-14 md:my-20 relative"
    >
      <motion.blockquote
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-2xl text-2xl md:text-3xl leading-snug font-light text-foreground px-6 py-8 border-l-2 border-primary bg-gradient-to-r from-primary/5 to-transparent rounded-r-xl"
      >
        <span className="absolute -top-4 -left-1 text-6xl text-primary/30 font-serif select-none">
          “
        </span>
        {children}
      </motion.blockquote>
    </motion.div>
  );
};

export default PullQuote;
