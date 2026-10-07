import React from 'react';
import { motion } from 'framer-motion';
import pushpinRed from '../../assets/pushpin_red.png';
import pushpinGold from '../../assets/pushpin_gold.png';
import pushpinSilver from '../../assets/pushpin_silver.png';

interface PushpinProps {
  color?: 'red' | 'gold' | 'green' | 'blue' | 'silver';
  isPinned?: boolean;
  isDragging?: boolean;
  justPinned?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Pushpin: React.FC<PushpinProps> = ({
  color = 'red',
  isPinned = true,
  isDragging = false,
  justPinned = false,
  onClick,
  className = '',
  size = 'md',
}) => {
  // Select high-fidelity 3D rendered pushpin asset
  const pinImg =
    color === 'gold'
      ? pushpinGold
      : color === 'silver'
      ? pushpinSilver
      : pushpinRed;

  const sizeClasses = {
    sm: 'w-6 h-8',
    md: 'w-7 h-10',
    lg: 'w-8 h-12',
  }[size];

  // Dynamic animation depending on drag / pin impact state
  let animateTarget: any = {
    y: 0,
    rotate: 0,
    scale: 1,
    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.38))',
  };

  let transitionConfig: any = { type: 'spring', stiffness: 450, damping: 24 };

  if (isDragging) {
    // Lifted state while dragging note across the corkboard
    animateTarget = {
      y: -10,
      rotate: -7,
      scale: 1.08,
      filter: 'drop-shadow(2px 14px 10px rgba(0, 0, 0, 0.22))',
    };
    transitionConfig = { duration: 0.15 };
  } else if (justPinned) {
    // Microinteraction: Pin firmly pushes down into cork board
    animateTarget = {
      y: [-10, 3, 0],
      scale: [1.08, 0.88, 1],
      rotate: [-7, 1, 0],
      filter: [
        'drop-shadow(2px 14px 10px rgba(0, 0, 0, 0.22))',
        'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.55))',
        'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.38))',
      ],
    };
    transitionConfig = {
      duration: 0.32,
      times: [0, 0.55, 1],
      ease: [0.22, 1, 0.36, 1],
    };
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92, y: 1 }}
      title={isPinned ? 'Pushpin securing note to cork' : 'Loose pushpin'}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none focus:outline-none z-20 p-2.5 -m-2.5 before:absolute before:-inset-2 before:content-[''] ${className}`}
    >
      <motion.div
        animate={animateTarget}
        transition={transitionConfig}
        className="pointer-events-none flex items-center justify-center origin-bottom"
      >
        <img
          src={pinImg}
          alt={`${color} pushpin`}
          className={`${sizeClasses} object-contain pointer-events-none select-none`}
          draggable={false}
        />
      </motion.div>
    </motion.button>
  );
};
