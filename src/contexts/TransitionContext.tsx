import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

type ModeName = "engineer" | "designer";
type StartTransitionFn = (
  nextMode: ModeName,
  onMid?: () => void
) => Promise<void>;

const TransitionContext = createContext<
  { startTransition: StartTransitionFn } | undefined
>(undefined);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [overlayMode, setOverlayMode] = useState<ModeName>("engineer");
  const runningRef = useRef(false);

  // timings (ms)
  const ENTER = 500;
  const HOLD = 100;
  const EXIT = 500;

  const startTransition: StartTransitionFn = useCallback((nextMode, onMid) => {
    if (runningRef.current) return Promise.resolve();
    runningRef.current = true;
    setOverlayMode(nextMode);
    setVisible(true);

    return new Promise<void>((resolve) => {
      const midTimer = setTimeout(() => {
        try {
          onMid?.();
        } catch (e) {
          console.error("Error in transition mid-callback:", e);
        }
      }, ENTER);

      const hideTimer = setTimeout(() => {
        setVisible(false);
        const finishTimer = setTimeout(() => {
          runningRef.current = false;
          resolve();
        }, EXIT);
        return () => clearTimeout(finishTimer);
      }, ENTER + HOLD);

      return () => {
        clearTimeout(midTimer);
        clearTimeout(hideTimer);
      };
    });
  }, []);

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {children}

      <AnimatePresence mode="wait">
        {visible && (
          <>
            {/* Main wipe overlay */}
            <motion.div
              key={overlayMode + "-wipe"}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ 
                duration: ENTER / 1000, 
                ease: [0.65, 0, 0.35, 1]
              }}
              style={{ transformOrigin: "left center" }}
              className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
            >
              <div
                className={`absolute inset-0 ${
                  overlayMode === "engineer"
                    ? "bg-gradient-to-br from-[hsl(var(--engineer-primary))] via-[hsl(var(--engineer-accent))] to-[hsl(var(--engineer-glow))]"
                    : "bg-gradient-to-br from-[hsl(var(--designer-primary))] via-[hsl(var(--designer-accent))] to-[hsl(var(--designer-glow))]"
                }`}
              />
            </motion.div>

            {/* Morphing shapes */}
            <motion.div
              key={overlayMode + "-shapes"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ 
                duration: ENTER / 1000,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center"
            >
              <div className="relative w-40 h-40">
                {overlayMode === "engineer" ? (
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      borderRadius: ["30%", "50%", "30%"]
                    }}
                    transition={{ 
                      duration: ENTER / 500,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-full h-full bg-white/20 backdrop-blur-sm border-4 border-white/40"
                  />
                ) : (
                  <motion.div
                    animate={{ 
                      rotate: -360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: ENTER / 500,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-full h-full"
                    style={{
                      background: "white",
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                    }}
                  />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error("useTransition must be used within TransitionProvider");
  return ctx;
};
