import React from "react";
import Header from "./Header";

export const Container: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  return (
    <div className={`container max-w-7xl mx-auto px-6 ${className ?? ""}`}>
      {children}
    </div>
  );
};

export const Layout: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  return (
    <div className={`min-h-screen flex flex-col ${className ?? ""}`}>
      {/* Global mode toggle lives at top-level so it's present across pages */}
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
