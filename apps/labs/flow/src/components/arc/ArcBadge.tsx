import React from 'react';

export interface ArcBadgeProps {
  children: React.ReactNode;
  variant?: 'canvas' | 'mint' | 'marigold' | 'periwinkle' | 'sky' | 'papaya' | 'stone';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const ArcBadge: React.FC<ArcBadgeProps> = ({
  children,
  variant = 'mint',
  size = 'sm',
  icon,
  className = '',
}) => {
  const sizeStyles = size === 'sm' ? 'text-[11px] px-2 py-0.5 gap-1' : 'text-xs px-2.5 py-1 gap-1.5';

  const variantStyles = {
    canvas: 'bg-[#fff3e7] text-[#41413f] border border-[#e1e1e1]',
    mint: 'bg-[#9bd8a9]/30 text-[#194425] border border-[#9bd8a9]/50',
    marigold: 'bg-[#fde99b]/40 text-[#554400] border border-[#fde99b]/60',
    periwinkle: 'bg-[#b8caf5]/35 text-[#1b2b5a] border border-[#b8caf5]/60',
    sky: 'bg-[#9ed4ef]/35 text-[#0d3b54] border border-[#9ed4ef]/60',
    papaya: 'bg-[#ff4500]/15 text-[#aa2d00] border border-[#ff4500]/30 font-semibold',
    stone: 'bg-[#efefef] text-[#41413f] border border-[#e1e1e1]',
  }[variant];

  return (
    <span
      className={`inline-flex items-center font-ui font-medium rounded-full ${sizeStyles} ${variantStyles} ${className} select-none`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
