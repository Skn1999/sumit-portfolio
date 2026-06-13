import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import BiteImage from "./BiteImage";

interface Props {
  before: { src: string; alt: string; caption?: string };
  after: { src: string; alt: string; caption?: string };
}

const CONFETTI = ["#FFB4A2", "#FFD6A5", "#CDB4DB", "#A0E7E5", "#FFC8DD"];

export const BeforeAfter: React.FC<Props> = ({ before, after }) => {
  const reduced = useReducedMotion();

  return (
    <div className="not-prose my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.figure
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-2"
      >
        <div className="rounded-2xl overflow-hidden border border-border/40 bg-muted/30 shadow-sm">
          <BiteImage src={before.src} alt={before.alt} className="w-full h-auto block" />
        </div>
        <figcaption className="text-xs uppercase tracking-wider text-muted-foreground">
          Before {before.caption ? `· ${before.caption}` : ""}
        </figcaption>
      </motion.figure>

      <motion.figure
        initial={reduced ? false : { opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative space-y-2"
      >
        <div className="rounded-2xl overflow-hidden border-2 border-primary/40 bg-card shadow-lg relative">
          <BiteImage src={after.src} alt={after.alt} className="w-full h-auto block" />
          {!reduced && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {CONFETTI.map((c, i) => (
                <motion.span
                  key={i}
                  className="absolute top-0 left-1/2 w-1.5 h-3 rounded-sm"
                  style={{ background: c }}
                  initial={{ y: -10, x: 0, opacity: 0, rotate: 0 }}
                  whileInView={{
                    y: [0, 60 + i * 20, 200 + i * 30],
                    x: [0, (i - 2) * 30, (i - 2) * 50],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 1.6,
                    delay: 0.5 + i * 0.05,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <figcaption className="text-xs uppercase tracking-wider text-primary">
          After {after.caption ? `· ${after.caption}` : ""}
        </figcaption>
      </motion.figure>
    </div>
  );
};

export default BeforeAfter;
