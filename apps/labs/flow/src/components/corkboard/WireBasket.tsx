import React from 'react';
import { motion } from 'framer-motion';
import { Package, Archive } from 'lucide-react';
import wireBasketImg from '../../assets/wire_basket.png';

interface WireBasketProps {
  archivedCount: number;
  isDragOver?: boolean;
  isCatching?: boolean;
  onClick: () => void;
  className?: string;
}

export const WireBasket: React.FC<WireBasketProps> = ({
  archivedCount,
  isDragOver = false,
  isCatching = false,
  onClick,
  className = '',
}) => {
  return (
    <motion.div
      onClick={onClick}
      initial={false}
      animate={
        isCatching
          ? {
              y: [-48, -12, -32, -18, 0],
              scale: [1.06, 0.96, 1.03, 1],
              rotate: [-11, -7, -9, -8],
              transition: { duration: 0.55, ease: 'easeOut' },
            }
          : isDragOver
          ? {
              y: -44,
              scale: 1.07,
              rotate: -5,
              transition: { type: 'spring', stiffness: 450, damping: 20 },
            }
          : {
              y: 0,
              scale: 1,
              rotate: -8,
              transition: { type: 'spring', stiffness: 350, damping: 25 },
            }
      }
      whileHover={
        !isDragOver && !isCatching
          ? { y: -18, scale: 1.03, transition: { duration: 0.2 } }
          : undefined
      }
      whileTap={{ scale: 0.97 }}
      title="Archive Wire Basket • Click to look inside or toss notes here with [E]"
      className={`relative select-none cursor-pointer flex flex-col items-end group ${className}`}
      style={{
        filter: isDragOver
          ? 'drop-shadow(0 -20px 32px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 24px rgba(253, 233, 155, 0.6))'
          : 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.35))',
      }}
    >
      {/* Floating Pill Badge Matched to Screenshot (tilted -12deg) */}
      <motion.div
        animate={{
          scale: isDragOver ? 1.15 : 1,
          y: isDragOver ? -12 : 0,
        }}
        className={`mb-2 mr-20 px-4 py-2 rounded-2xl text-xs font-mono font-bold flex items-center gap-2 shadow-xl border transition-all -rotate-12 cursor-pointer ${
          isDragOver
            ? 'bg-[#ff4500] text-white border-[#ff7b54] animate-pulse'
            : 'bg-[#ffffff] text-[#030302] border-[#e1e1e1] hover:bg-[#fafafa]'
        }`}
      >
        <Package className="w-4 h-4 flex-shrink-0" />
        <span className="tracking-tight text-sm font-extrabold">
          {isDragOver ? 'Drop to Crumple!' : `Bin (${archivedCount})`}
        </span>
      </motion.div>

      {/* Zoomed-in Large 3D Wire Basket Asset */}
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[410px] md:h-[410px] pointer-events-none origin-bottom-right">
        {/* Render Crumpled Paper Balls resting inside the rim of the basket */}
        {archivedCount > 0 && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center pointer-events-none">
            {/* Paper Ball 1 - White Sheet */}
            <div
              className="w-10 h-10 rounded-full bg-[#fdfdfd] border border-[#d6d6d6] shadow-sm transform -rotate-12 translate-x-2 translate-y-3"
              style={{
                backgroundImage: 'radial-gradient(circle at 35% 35%, #ffffff, #dcdcdc 65%, #9e9e9e)',
                boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.25), 2px 4px 6px rgba(0,0,0,0.15)',
              }}
            />
            {/* Paper Ball 2 - Yellow sticky crinkle */}
            {archivedCount > 1 && (
              <div
                className="w-9 h-9 rounded-full bg-[#fff4bd] border border-[#ebd880] shadow-sm transform rotate-45 -translate-x-4 translate-y-1"
                style={{
                  backgroundImage: 'radial-gradient(circle at 35% 35%, #fffbe6, #fae075 65%, #caa61a)',
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.25), 2px 4px 6px rgba(0,0,0,0.15)',
                }}
              />
            )}
            {/* Paper Ball 3 - Gray index card */}
            {archivedCount > 2 && (
              <div
                className="w-8 h-8 rounded-full bg-[#f5f5f5] border border-[#d0d0d0] shadow-sm transform -rotate-45 translate-x-4 -translate-y-1"
                style={{
                  backgroundImage: 'radial-gradient(circle at 35% 35%, #ffffff, #dedede 65%, #8f8f8f)',
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.25), 2px 4px 6px rgba(0,0,0,0.15)',
                }}
              />
            )}
            {/* Paper Ball 4 - Extra Yellow crinkle */}
            {archivedCount > 3 && (
              <div
                className="w-9 h-9 rounded-full bg-[#fde99b] border border-[#d4b534] shadow-sm transform rotate-18 translate-x-1 -translate-y-3"
                style={{
                  backgroundImage: 'radial-gradient(circle at 35% 35%, #fffbe6, #f2d45c 65%, #a6850c)',
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.25), 2px 4px 6px rgba(0,0,0,0.15)',
                }}
              />
            )}
            {/* Paper Ball 5 - White crumpled ball */}
            {archivedCount > 4 && (
              <div
                className="w-10 h-10 rounded-full bg-[#fafafa] border border-[#cccccc] shadow-sm transform -rotate-30 -translate-x-3 translate-y-5"
                style={{
                  backgroundImage: 'radial-gradient(circle at 35% 35%, #ffffff, #e5e5e5 65%, #949494)',
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.25), 2px 4px 6px rgba(0,0,0,0.15)',
                }}
              />
            )}
          </div>
        )}

        {/* 3D Wire Basket Image Asset */}
        <img
          src={wireBasketImg}
          alt="Office Wire Paper Basket"
          className="w-full h-full object-contain pointer-events-none select-none z-20 relative"
          draggable={false}
        />
      </div>
    </motion.div>
  );
};
