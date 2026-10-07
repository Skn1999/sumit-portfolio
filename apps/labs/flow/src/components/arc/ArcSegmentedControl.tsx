import React from 'react';
import { motion } from 'framer-motion';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface ArcSegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (val: T) => void;
  className?: string;
}

export function ArcSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className = '',
}: ArcSegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      className={`inline-flex items-center p-1 bg-[#efefef] rounded-full border border-[#e1e1e1] font-ui ${className}`}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            className={`relative px-3 py-1 text-xs font-medium rounded-full transition-colors flex items-center gap-1.5 z-10 select-none ${
              isSelected ? 'text-[#030302]' : 'text-[#41413f] hover:text-[#030302]'
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="segmented-pill"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                className="absolute inset-0 bg-[#ffffff] rounded-full shadow-sm -z-10 border border-[#e1e1e1]"
              />
            )}
            {opt.icon && <span className="w-3.5 h-3.5 flex-shrink-0">{opt.icon}</span>}
            <span>{opt.label}</span>
            {opt.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-[#fde99b] text-[#41413f]' : 'bg-[#e1e1e1] text-[#41413f]'
                }`}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
