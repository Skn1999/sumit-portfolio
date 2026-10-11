import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { TextReveal, TextRevealProps } from "./text-reveal";

export interface InViewTextRevealProps extends TextRevealProps {
  /** Optional viewport trigger margin to delay or hasten trigger, e.g. "-10% 0px -20% 0px" */
  viewportMargin?: string;
}

/**
 * Wraps TextReveal to ensure it ONLY executes when scrolled into view.
 * Keeps text hidden/invisible before entering viewport so readers are never
 * overwhelmed by a large wall of text above or around the fold.
 */
export const InViewTextReveal: React.FC<InViewTextRevealProps> = ({
  text,
  as = "p",
  className,
  id,
  delay = 0.05,
  viewportMargin = "-10% 0px -15% 0px",
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
          {text}
        </p>
      )}
    </div>
  );
};

export default InViewTextReveal;
