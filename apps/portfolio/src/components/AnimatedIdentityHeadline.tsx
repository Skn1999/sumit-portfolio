import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type AnimationStep =
  | "initial" // "product designer"
  | "erasing1" // pencil eraser scrubbing out "product designer"
  | "engineer" // "engineer"
  | "erasing2" // pencil eraser scrubbing out "engineer"
  | "final"; // "product designer & builder."

interface AnimatedIdentityHeadlineProps {
  onAnimationComplete?: () => void;
}

// Module-level flag ensuring the story animation only runs on initial page load / refresh
let hasHeroIdentityAnimated = false;

// Rubber eraser shavings / friction dust particles
const EraserDust: React.FC<{ active: boolean; count?: number }> = ({
  active,
  count = 9,
}) => {
  if (!active) return null;

  return (
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 pointer-events-none overflow-visible z-40">
      {Array.from({ length: count }).map((_, i) => {
        const randomX = (i % 2 === 0 ? 1 : -1) * (12 + Math.random() * 26);
        const randomY = -8 - Math.random() * 18;
        const randomRot = Math.random() * 360;
        const size = 3 + (i % 3);

        return (
          <motion.span
            key={i}
            initial={{ opacity: 0.95, scale: 1, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 0.25,
              x: randomX,
              y: randomY + 18,
              rotate: randomRot,
            }}
            transition={{
              duration: 0.55,
              delay: (i * 0.09) % 0.45,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{
              width: size,
              height: size * 0.65,
              borderRadius: "45%",
              backgroundColor: "#f472b6", // pink rubber eraser shaving
            }}
            className="absolute shadow-xs"
          />
        );
      })}
    </div>
  );
};

export const AnimatedIdentityHeadline: React.FC<
  AnimatedIdentityHeadlineProps
> = ({ onAnimationComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [alreadyAnimated] = useState(() => hasHeroIdentityAnimated);
  const [step, setStep] = useState<AnimationStep>(
    shouldReduceMotion || alreadyAnimated ? "final" : "initial"
  );

  useEffect(() => {
    if (!alreadyAnimated && !shouldReduceMotion) {
      hasHeroIdentityAnimated = true;

      // Sequence timeline:
      // 0.0s - 1.8s: Read "product designer" (1.8s)
      // 1.8s - 4.4s: Eraser scrubs full width across "product designer" (2.6s)
      // 4.4s - 6.6s: "engineer" appears (2.2s)
      // 6.6s - 8.8s: Eraser scrubs full width across "engineer" (2.2s)
      // 8.8s+: "product designer & builder." resolves with slowed-down sketchy oval loop
      const t1 = setTimeout(() => setStep("erasing1"), 1800);
      const t2 = setTimeout(() => setStep("engineer"), 4400);
      const t3 = setTimeout(() => setStep("erasing2"), 6600);
      const t4 = setTimeout(() => {
        setStep("final");
        onAnimationComplete?.();
      }, 8800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [alreadyAnimated, shouldReduceMotion, onAnimationComplete]);

  const pencilEraserDown = `${import.meta.env.BASE_URL}images/pencil-eraser-down.png`;

  // Determine whether current step is the engineer stage
  const isEngineerStage = step === "engineer" || step === "erasing2";

  return (
    <div className="relative flex flex-col items-start select-none w-full text-left">
      <h1 className="font-display tracking-tight font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-ink-primary leading-[1.2] mb-6">
        {/* Line 1: Main Greeting */}
        <span className="block mb-1 sm:mb-1.5">Hi, I'm Sumit.</span>

        {/* Line 2: Prefix sentence intro with counter-sliding 'n' */}
        <span className="flex items-baseline text-ink-primary mb-1 sm:mb-1.5">
          <span>I'm a</span>
          <AnimatePresence initial={false}>
            {isEngineerStage && (
              <motion.span
                key="letter-n-wrapper"
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                exit={{
                  width: 0,
                  transition: { delay: 0.12, duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
                className="inline-flex overflow-visible items-baseline"
              >
                <motion.span
                  key="letter-n-inner"
                  initial={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    filter: "blur(8px)",
                    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  n
                </motion.span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        {/* Line 3: Dedicated title line on its own full line */}
        <div className="relative min-h-[1.4em] flex items-center pt-0.5">
          {shouldReduceMotion || alreadyAnimated ? (
            <span className="relative inline-block text-ink-primary font-bold px-3 py-1">
              product designer &amp; builder.
              {/* Static multi-stroke sketchy tilted oval loop for returning visits / reduced motion */}
              <div className="absolute -inset-x-6 sm:-inset-x-8 -inset-y-3 sm:-inset-y-4 pointer-events-none transform -rotate-2">
                <svg
                  className="w-full h-full text-slate-700/40 dark:text-slate-300/35 overflow-visible"
                  viewBox="0 0 400 85"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 22 36 C 60 14, 320 8, 375 22 C 398 34, 390 66, 335 76 C 225 86, 50 82, 14 66 C -6 50, 4 22, 58 14 C 165 4, 330 8, 372 26 C 388 38, 370 68, 318 76 C 210 84, 60 80, 20 64"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </span>
          ) : (
            <AnimatePresence mode="wait">
              {/* Step 1: "product designer" + Rubber Eraser Scrub */}
              {(step === "initial" || step === "erasing1") && (
                <motion.span
                  key="step-designer"
                  initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    filter: "blur(6px)",
                    transition: { duration: 0.3 },
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative inline-block text-ink-primary"
                >
                  {/* The text being erased */}
                  <motion.span
                    animate={
                      step === "erasing1"
                        ? {
                            opacity: [1, 0.9, 0.65, 0.4, 0.15, 0],
                            filter: [
                              "blur(0px)",
                              "blur(1.5px)",
                              "blur(3px)",
                              "blur(5px)",
                              "blur(8px)",
                              "blur(12px)",
                            ],
                            x: [0, -1, 1, -1, 1, 0],
                          }
                        : { opacity: 1, filter: "blur(0px)" }
                    }
                    transition={
                      step === "erasing1"
                        ? { duration: 2.4, ease: "easeInOut" }
                        : {}
                    }
                    className="inline-block"
                  >
                    product designer
                  </motion.span>

                  {/* Eraser scrubbing across 100% full width of "product designer" */}
                  {step === "erasing1" && (
                    <div className="absolute inset-0 pointer-events-none z-30">
                      <motion.div
                        className="absolute bottom-1.5 -translate-x-1/2"
                        style={{ transformOrigin: "bottom center" }}
                        initial={{ opacity: 0, left: "100%", y: -40, rotate: 15 }}
                        animate={{
                          opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0],
                          left: [
                            "100%",
                            "85%",
                            "5%",
                            "80%",
                            "15%",
                            "90%",
                            "0%",
                            "50%",
                            "-10%",
                          ],
                          y: [-40, -2, 2, -3, 3, -2, 2, 0, -35],
                          rotate: [15, 22, 8, 24, 10, 22, 12, 18, 6],
                        }}
                        transition={{
                          duration: 2.45,
                          ease: "easeInOut",
                          times: [
                            0, 0.08, 0.24, 0.42, 0.58, 0.74, 0.88, 0.95, 1,
                          ],
                        }}
                      >
                        <div className="relative w-6 sm:w-7 h-28 sm:h-36 flex flex-col justify-end items-center">
                          <img
                            src={pencilEraserDown}
                            alt=""
                            className="w-full h-full object-contain drop-shadow-md select-none pointer-events-none"
                            draggable={false}
                          />
                          <EraserDust active={true} count={9} />
                        </div>
                      </motion.div>
                    </div>
                  )}
                </motion.span>
              )}

              {/* Step 2: "engineer" + Rubber Eraser Scrub */}
              {(step === "engineer" || step === "erasing2") && (
                <motion.span
                  key="step-engineer"
                  initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    filter: "blur(6px)",
                    transition: { duration: 0.3 },
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative inline-block text-ink-primary font-mono"
                >
                  {/* The text being erased */}
                  <motion.span
                    animate={
                      step === "erasing2"
                        ? {
                            opacity: [1, 0.9, 0.6, 0.35, 0.1, 0],
                            filter: [
                              "blur(0px)",
                              "blur(1.5px)",
                              "blur(3px)",
                              "blur(5px)",
                              "blur(8px)",
                              "blur(12px)",
                            ],
                            x: [0, 1, -1, 1, -1, 0],
                          }
                        : { opacity: 1, filter: "blur(0px)" }
                    }
                    transition={
                      step === "erasing2"
                        ? { duration: 2.0, ease: "easeInOut" }
                        : {}
                    }
                    className="inline-block"
                  >
                    engineer
                  </motion.span>

                  {/* Eraser scrubbing across 100% full width of "engineer" */}
                  {step === "erasing2" && (
                    <div className="absolute inset-0 pointer-events-none z-30">
                      <motion.div
                        className="absolute bottom-1.5 -translate-x-1/2"
                        style={{ transformOrigin: "bottom center" }}
                        initial={{ opacity: 0, left: "100%", y: -40, rotate: 15 }}
                        animate={{
                          opacity: [0, 1, 1, 1, 1, 1, 0],
                          left: [
                            "100%",
                            "80%",
                            "0%",
                            "75%",
                            "10%",
                            "90%",
                            "-10%",
                          ],
                          y: [-40, -2, 2, -3, 2, 0, -35],
                          rotate: [15, 22, 8, 24, 12, 18, 6],
                        }}
                        transition={{
                          duration: 2.05,
                          ease: "easeInOut",
                          times: [0, 0.1, 0.3, 0.52, 0.72, 0.88, 1],
                        }}
                      >
                        <div className="relative w-6 sm:w-7 h-28 sm:h-36 flex flex-col justify-end items-center">
                          <img
                            src={pencilEraserDown}
                            alt=""
                            className="w-full h-full object-contain drop-shadow-md select-none pointer-events-none"
                            draggable={false}
                          />
                          <EraserDust active={true} count={9} />
                        </div>
                      </motion.div>
                    </div>
                  )}
                </motion.span>
              )}

              {/* Step 3: Final "product designer & builder." + Slowed Sketchy Oval Loop */}
              {step === "final" && (
                <motion.span
                  key="step-final"
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                    y: 4,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative inline-block font-bold text-ink-primary px-3 py-1"
                >
                  <span className="relative z-10 whitespace-nowrap sm:whitespace-normal">
                    product designer &amp; builder.
                  </span>

                  {/* Multi-Stroke Hand-Drawn Tilted Oval Loop */}
                  <div className="absolute -inset-x-6 sm:-inset-x-8 -inset-y-3 sm:-inset-y-4 pointer-events-none transform -rotate-2">
                    <svg
                      className="w-full h-full text-slate-700/40 dark:text-slate-300/35 overflow-visible"
                      viewBox="0 0 400 85"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d="M 22 36 C 60 14, 320 8, 375 22 C 398 34, 390 66, 335 76 C 225 86, 50 82, 14 66 C -6 50, 4 22, 58 14 C 165 4, 330 8, 372 26 C 388 38, 370 68, 318 76 C 210 84, 60 80, 20 64"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          delay: 0.15,
                          duration: 1.85,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </svg>
                  </div>
                </motion.span>
              )}
            </AnimatePresence>
          )}
        </div>
      </h1>
    </div>
  );
};

export default AnimatedIdentityHeadline;
