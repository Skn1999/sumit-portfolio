import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const BiteSection: React.FC<Props> = ({ children, className, id }) => {
  const reduced = useReducedMotion();
  return (
    <motion.section
      id={id}
      initial={reduced ? false : { opacity: 0, y: 24, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -50% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("my-10 md:my-16", className)}
    >
      {children}
    </motion.section>
  );
};

export default BiteSection;
