import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface ArcBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const ArcBreadcrumb: React.FC<ArcBreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`inline-flex items-center gap-1.5 text-xs font-ui ${className}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={items[0]?.onClick}
        className="flex items-center gap-1 text-[#41413f] hover:text-[#030302] transition-colors p-1 rounded-md"
        aria-label="Home"
      >
        <Home className="w-3.5 h-3.5" />
      </motion.button>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-[#bebbba] flex-shrink-0" />
          {item.active ? (
            <span className="font-medium text-[#030302] px-2 py-0.5 rounded-full bg-[#fde99b]/40">
              {item.label}
            </span>
          ) : (
            <motion.button
              whileHover={{ x: 1 }}
              onClick={item.onClick}
              className="text-[#41413f] hover:text-[#030302] transition-colors px-1 py-0.5 rounded hover:bg-[#efefef]"
            >
              {item.label}
            </motion.button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
