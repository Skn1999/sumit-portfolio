import React, { createContext, useContext, useState, useEffect } from "react";
import { useTransition } from "./TransitionContext";

type Mode = "engineer" | "designer";

interface ModeContextType {
  mode: Mode;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<Mode>("designer");
  const { startTransition } = useTransition();

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "engineer" ? "designer" : "engineer"));
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
};
