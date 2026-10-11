import React from "react";
import NavigationDock from "./NavigationDock";

export const Container: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  return (
    <div
      className={`container max-w-7xl mx-auto px-4 md:px-6 ${className ?? ""}`}
    >
      {children}
    </div>
  );
};

export const Layout: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  return (
    <div className={`min-h-screen flex flex-col ${className ?? ""}`}>
      <main className="flex-1 pb-28 sm:pb-32">{children}</main>
      {/* Preston-style floating bottom dock */}
      <NavigationDock />
    </div>
  );
};

export default Layout;
