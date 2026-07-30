import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";

interface NavIntentContextType {
  intendedRoute: string | null;
  setHoverIntent: (route: string | null, dwellMs?: number) => void;
  cancelHoverIntent: () => void;
}

const NavIntentContext = createContext<NavIntentContextType>({
  intendedRoute: null,
  setHoverIntent: () => {},
  cancelHoverIntent: () => {},
});

export const NavIntentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [intendedRoute, setIntendedRouteState] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const cancelHoverIntent = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIntendedRouteState(null);
  }, []);

  const setHoverIntent = useCallback(
    (route: string | null, dwellMs: number = 200) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (!route) {
        setIntendedRouteState(null);
        return;
      }

      // Dwell time threshold before registering navigation intent
      timerRef.current = setTimeout(() => {
        setIntendedRouteState(route);
      }, dwellMs);
    },
    []
  );

  // Safety resets on window blur or mouse leaving viewport
  useEffect(() => {
    const handleReset = () => cancelHoverIntent();
    window.addEventListener("blur", handleReset);
    document.addEventListener("mouseleave", handleReset);

    return () => {
      window.removeEventListener("blur", handleReset);
      document.removeEventListener("mouseleave", handleReset);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [cancelHoverIntent]);

  return (
    <NavIntentContext.Provider
      value={{
        intendedRoute,
        setHoverIntent,
        cancelHoverIntent,
      }}
    >
      {children}
    </NavIntentContext.Provider>
  );
};

export const useNavIntent = () => useContext(NavIntentContext);
