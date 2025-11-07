import React, { useId } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type SwirlTextProps = {
  text: string;
  radius: number;
  count?: number;
  size?: number;
  outline?: boolean;
  opacity?: number;
  speed?: number;
  clockwise?: boolean;
  color?: string;
  z?: number;
  angle?: number; // NEW: initial rotation angle
  yPercent?: number; // NEW: vertical position as percent of hero height
  frequency?: number; // NEW: sine wave frequency
};

export const SwirlText: React.FC<SwirlTextProps> = ({
  text,
  radius,
  count = 6,
  size = 96,
  outline = true,
  opacity = 1,
  speed = 0.5,
  clockwise = true,
  color = "#111",
  z = 0,
  angle = 0,
  yPercent = 50,
  frequency = 1,
}) => {
  const id = useId();
  const pathId = `swirl-path-${id.replace(/[:.]/g, "")}`;

  const { scrollYProgress } = useScroll();
  const deg = (clockwise ? 1 : -1) * 360 * speed;
  const rotate = useTransform(scrollYProgress, [0, 1], [0, deg]);

  // Sine wave undulation for y position
  const yWave = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.sin(frequency * Math.PI) * 24]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [
      `calc(${yPercent}% + 0px)`,
      `calc(${yPercent}% + ${Math.sin(frequency * Math.PI) * 24}px)`,
    ]
  );

  // SVG viewbox sized to fit the largest radius + text size
  const vb = radius * 2 + size * 2;
  const viewBox = `-${vb / 2} -${vb / 2} ${vb} ${vb}`;

  return (
    <motion.div
      style={{
        x: "-50%",
        y,
        rotate,
        zIndex: z,
        pointerEvents: "none",
      }}
      className="swirl-svg-wrapper"
    >
      <svg
        viewBox={viewBox}
        width={vb}
        height={vb}
        className="swirl-svg"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        role="img"
      >
        <defs>
          <path
            id={pathId}
            d={`
              M 0,0
              m -${radius},0
              a ${radius},${radius} 0 1,0 ${radius * 2},0
              a ${radius},${radius} 0 1,0 -${radius * 2},0
            `}
          />
        </defs>
        <g style={{ opacity, transformOrigin: "center center" }}>
          {Array.from({ length: count }).map((_, i) => {
            const startOffset = `${(i / count) * 100}%`;
            const fontSize = size;
            // Alternate filled and outlined text
            const useOutline = outline ? i % 2 === 0 : false;
            return (
              <text
                key={i}
                fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                fontSize={fontSize}
                fontWeight="700"
                textAnchor="middle"
                dominantBaseline="middle"
                fill={useOutline ? "none" : color}
                stroke={useOutline ? color : "none"}
                strokeWidth={
                  useOutline
                    ? Math.max(1.5, Math.round(size * 0.035))
                    : undefined
                }
                strokeLinejoin={useOutline ? "round" : undefined}
                strokeLinecap={useOutline ? "round" : undefined}
                style={{
                  pointerEvents: "none",
                  userSelect: "none",
                  paintOrder: "stroke",
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))",
                }}
              >
                <textPath
                  href={`#${pathId}`}
                  startOffset={startOffset}
                  method="align"
                >
                  {text}
                </textPath>
              </text>
            );
          })}
        </g>
      </svg>
    </motion.div>
  );
};

export default SwirlText;
