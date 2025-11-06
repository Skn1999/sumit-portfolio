import React, { useId } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type SwirlTextProps = {
  text: string;
  radius: number;
  count?: number;
  size?: number; // font-size px
  outline?: boolean;
  opacity?: number;
  speed?: number; // multiplier for rotation
  clockwise?: boolean;
  color?: string;
  z?: number;
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
  color = "#ffffff",
  z = 0,
}) => {
  const id = useId();
  const pathId = `swirl-path-${id.replace(/[:.]/g, "")}`;

  const { scrollYProgress } = useScroll();
  const deg = (clockwise ? 1 : -1) * 360 * speed;
  const rotate = useTransform(scrollYProgress, [0, 1], [0, deg]);

  // SVG viewbox sized to fit the largest radius + text size
  const vb = radius * 2 + size * 2;
  const viewBox = `-${vb / 2} -${vb / 2} ${vb} ${vb}`;

  return (
    <motion.div
      style={{
        x: "-50%",
        y: "-50%",
        rotate,
        // small 3D tilt to give depth (Apple-like subtle tilt)
        rotateX: 0,
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
          {/* circular path centered at 0,0 */}
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

        <g
          transform="translate(2,4)"
          style={{ opacity, transformOrigin: "center center" }}
        >
          {Array.from({ length: count }).map((_, i) => {
            // offset along path so duplicates are spaced
            const startOffset = `${(i / count) * 100}%`;
            const fontSize = size;

            // when alternate is desired, alternate filled vs outline per item
            const useOutline = outline ? i % 2 === 0 : false;

            /*
              For a subtle 3D/extruded look we render a faint offset 'shadow' text
              behind the main text. SVG doesn't support translateZ, so we fake
              depth by drawing a dark copy slightly offset.
            */
            return (
              <g key={i} style={{ transformOrigin: "center center" }}>
                {/* extrude shadow - slightly offset along the path */}
                <text
                  fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                  fontSize={fontSize}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform="translate(2,4)"
                  style={{
                    pointerEvents: "none",
                    userSelect: "none",
                    paintOrder: "stroke",
                  }}
                  fill="rgba(0,0,0,0.45)"
                >
                  <textPath
                    href={`#${pathId}`}
                    startOffset={startOffset}
                    method="align"
                  >
                    {text}
                  </textPath>
                </text>

                {/* main text: either outline or filled (decided per instance) */}
                <text
                  fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                  fontSize={fontSize}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    pointerEvents: "none",
                    userSelect: "none",
                    paintOrder: "stroke",
                    filter: "drop-shadow(0 6px 18px rgba(50,50,50,0.35))",
                  }}
                  fill={useOutline ? "none" : color}
                  stroke={useOutline ? color : "none"}
                  strokeWidth={
                    useOutline
                      ? Math.max(1, Math.round(size * 0.05))
                      : undefined
                  }
                  strokeLinejoin={useOutline ? "round" : undefined}
                  strokeLinecap={useOutline ? "round" : undefined}
                >
                  <textPath
                    href={`#${pathId}`}
                    startOffset={startOffset}
                    method="align"
                  >
                    {text}
                  </textPath>
                </text>
              </g>
            );
          })}
        </g>

        {/* minimal SVG text styles; per-instance fill/stroke attributes handle visuals */}
        <style>{`
          .swirl-svg text {
            -webkit-font-smoothing: antialiased;
            mix-blend-mode: normal;
          }
        `}</style>
      </svg>
    </motion.div>
  );
};

export default SwirlText;
