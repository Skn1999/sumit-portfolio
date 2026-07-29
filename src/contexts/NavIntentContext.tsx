import React, { createContext, useContext, useState, useCallback } from "react";

interface NavIntentContextType {
  intendedRoute: string | null;
  setIntendedRoute: (route: string | null) => void;
}

const NavIntentContext = createContext<NavIntentContextType>({
  intendedRoute: null,
  setIntendedRoute: () => {},
});

export const NavIntentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [intendedRoute, setIntendedRouteState] = useState<string | null>(null);

  const setIntendedRoute = useCallback((route: string | null) => {
    setIntendedRouteState(route);
  }, []);

  return (
    <NavIntentContext.Provider value={{ intendedRoute, setIntendedRoute }}>
      {children}
    </NavIntentContext.Provider>
  );
};

export const useNavIntent = () => useContext(NavIntentContext);
