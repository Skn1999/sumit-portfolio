import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { TextReveal, TextRevealProps } from "./text-reveal";

export interface InViewTextRevealProps extends TextRevealProps {
  /** Optional viewport trigger margin to delay or hasten trigger. Defaults to top 60% threshold ("0px 0px -40% 0px") */
  viewportMargin?: string;
}

/**
 * Wraps TextReveal to ensure it ONLY executes when scrolled into view.
 * Default margin "0px 0px -40% 0px" ensures text only reveals once it has
 * entered the top 60% of the viewport height.
 */
export const InViewTextReveal: React.FC<InViewTextRevealProps> = ({
  text,
  as = "p",
  className,
  id,
  delay = 0.05,
  viewportMargin = "0px 0px -40% 0px",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: viewportMargin as any,
  });

  return (
    <div ref={containerRef} className="relative">
      {isInView ? (
        <TextReveal
          text={text}
          as={as}
          className={className}
          id={id}
          delay={delay}
        />
      ) : (
        <p
          className={`${className || ""} opacity-0 select-none pointer-events-none aria-hidden`}
          aria-hidden="true"
        >
          {text.replace(/\[\[[^:]+:([^\]]+)\]\]/g, "$1").replace(/\*\*/g, "")}
        </p>
      )}
    </div>
  );
};

export default InViewTextReveal;
