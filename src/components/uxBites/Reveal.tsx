import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface Props {
  children: string;
  className?: string;
  delay?: number;
}

/** Word-by-word stagger reveal. Renders an inline span; wrap in your own heading tag. */
export const Reveal: React.FC<Props> = ({ children, className, delay = 0 }) => {
  const reduced = useReducedMotion();
  const words = children.split(" ");

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={cn("inline-block", className)}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: "0.25em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default Reveal;
