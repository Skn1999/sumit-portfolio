import { useMode } from "@/contexts/ModeContext";
import { motion, AnimatePresence } from "framer-motion";

const ModeTransition = () => {
  const { mode } = useMode();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 pointer-events-none"
      >
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            mode === "engineer"
              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20"
              : "bg-gradient-to-r from-orange-500/20 to-pink-500/20"
          }`}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ModeTransition;
