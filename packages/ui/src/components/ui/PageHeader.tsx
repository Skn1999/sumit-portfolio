import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  lead,
  className,
}) => {
  return (
    <header className={cn("py-12 lg:py-20", className)}>
      <div className="container mx-auto px-6">
        {eyebrow && <div className="text-sm text-muted mb-2">{eyebrow}</div>}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          {title}
        </h1>
        {lead && <p className="max-w-3xl text-lg text-muted">{lead}</p>}
      </div>
    </header>
  );
};

export default PageHeader;
