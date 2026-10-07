import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ArcButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'mint' | 'marigold' | 'papaya';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  shortcut?: string;
}

export const ArcButton: React.FC<ArcButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  shortcut,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-ui font-medium rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#030302]/20 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1 gap-1.5',
    md: 'text-xs md:text-sm px-4 py-1.5 gap-2',
    lg: 'text-sm md:text-base px-6 py-2.5 gap-2.5',
  }[size];

  const variantStyles = {
    primary: 'bg-[#030302] text-[#ffffff] hover:bg-[#1f1f1d] shadow-sm',
    secondary: 'bg-[#ffffff] text-[#030302] border border-[#e1e1e1] hover:bg-[#efefef] shadow-subtle',
    ghost: 'bg-transparent text-[#41413f] hover:bg-[#efefef] hover:text-[#030302]',
    mint: 'bg-[#9bd8a9] text-[#1b3d24] hover:bg-[#8cc79a] shadow-sm font-semibold',
    marigold: 'bg-[#fde99b] text-[#554400] hover:bg-[#fae284] shadow-sm font-semibold',
    papaya: 'bg-[#ff4500] text-[#ffffff] hover:bg-[#e03d00] shadow-sm font-semibold',
  }[variant];

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {shortcut && (
        <kbd className="ml-1 px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[10px] font-mono tracking-wider opacity-80 uppercase">
          {shortcut}
        </kbd>
      )}
    </motion.button>
  );
};
