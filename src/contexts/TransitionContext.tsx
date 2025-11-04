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
  const ENTER = 350;
  const HOLD = 80;
  const EXIT = 350;

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
          <motion.div
            key={overlayMode + String(visible)}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: ENTER / 1000, ease: "easeInOut" }}
            style={{ transformOrigin: "left center" }}
            className="fixed inset-0 z-[100] pointer-events-none"
          >
            <div
              className={`absolute inset-0 backdrop-blur-md ${
                overlayMode === "engineer"
                  ? "bg-gradient-to-r from-blue-600/30 via-violet-600/25 to-purple-600/30"
                  : "bg-gradient-to-r from-orange-600/30 via-rose-600/25 to-pink-600/30"
              }`}
            />
          </motion.div>
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
