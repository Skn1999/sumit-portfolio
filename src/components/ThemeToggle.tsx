import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMode } from "@/contexts/ModeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { mode } = useMode();
  const isEngineer = mode === "engineer";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`mode-transition ${
        isEngineer
          ? "hover:bg-[hsl(var(--engineer-primary)/0.1)]"
          : "hover:bg-[hsl(var(--designer-primary)/0.1)]"
      }`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};
