import { useMode } from "@/contexts/ModeContext";
import { Code2, Palette } from "lucide-react";
import ModeTransition from "./ModeTransition";
import { useTransition } from "../contexts/TransitionContext";

const ModeToggle = () => {
  const { mode, toggleMode } = useMode();
  const isEngineer = mode === "engineer";
  const { startTransition } = useTransition();

  const handleModeToggle = async () => {
    await startTransition(isEngineer ? "designer" : "engineer", () => {
      toggleMode();
      // Force any mode-dependent content to wait for the transition
      document.documentElement.style.setProperty(
        "--mode-transition-delay",
        "0.7s"
      );
      setTimeout(() => {
        document.documentElement.style.setProperty(
          "--mode-transition-delay",
          "0s"
        );
      }, 700);
    });
    // Add a slight delay to let the transition complete
  };

  return (
    <>
      <ModeTransition></ModeTransition>
      <button
        onClick={handleModeToggle}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 group"
        aria-label="Toggle between engineer and designer mode"
      >
        <div className="relative flex items-center gap-2 px-4 py-2 bg-card border-2 border-primary/20 rounded-full shadow-lg hover:shadow-xl mode-transition hover:scale-105">
          <div
            className={`absolute inset-0 rounded-full mode-transition ${
              isEngineer ? "glow-engineer" : "glow-designer"
            }`}
          />

          <div className="relative flex items-center gap-3">
            <div
              className={`flex items-center gap-2 mode-transition ${
                isEngineer ? "opacity-100" : "opacity-40"
              }`}
            >
              <Code2 className="w-5 h-5 text-primary" />
              <span className="font-engineer text-sm font-bold text-foreground">
                Engineer
              </span>
            </div>

            <div className="w-12 h-6 bg-muted rounded-full relative">
              <div
                className={`absolute top-0.5 w-5 h-5 bg-primary rounded-full mode-transition shadow-md ${
                  isEngineer ? "left-0.5" : "left-6"
                }`}
              />
            </div>

            <div
              className={`flex items-center gap-2 mode-transition ${
                !isEngineer ? "opacity-100" : "opacity-40"
              }`}
            >
              <span className="font-designer text-sm font-semibold text-foreground">
                Designer
              </span>
              <Palette className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </button>
    </>
  );
};

export default ModeToggle;
