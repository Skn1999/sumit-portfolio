import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Sparkles,
} from 'lucide-react';
import wireBasketImg from '../../assets/wire_basket.png';

export const POSTIT_COLORS = [
  { name: 'Yellow', hex: '#fde99b', border: '#ecd577' },
  { name: 'Mint', hex: '#9bd8a9', border: '#84c794' },
  { name: 'Blue', hex: '#b8caf5', border: '#9bb4ec' },
  { name: 'Peach', hex: '#ffbe98', border: '#f2a679' },
  { name: 'Rose', hex: '#f4c0d1', border: '#e8a3ba' },
];

interface FigmaBottomToolbarProps {
  archivedCount: number;
  onStartStickyDrag: (e: React.PointerEvent, color: string) => void;
  onQuickNewSticky: (color: string) => void;
  onQuickNewNote: () => void;
  onTidyDesk: () => void;
  onOpenBin: () => void;
  isDragOverBin?: boolean;
  className?: string;
}

export const FigmaBottomToolbar: React.FC<FigmaBottomToolbarProps> = ({
  archivedCount,
  onStartStickyDrag,
  onQuickNewSticky,
  onQuickNewNote,
  onTidyDesk,
  onOpenBin,
  isDragOverBin = false,
  className = '',
}) => {
  const [selectedColor, setSelectedColor] = useState(POSTIT_COLORS[0]);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<'pointer' | 'sticky' | 'note'>('pointer');

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none flex flex-col items-center pointer-events-auto ${className}`}
    >
      {/* Floating Color Palette Popover for Sticky Notes */}
      <AnimatePresence>
        {isPaletteOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="mb-2.5 px-4 py-2 bg-[#ffffff] border border-[#e1e1e1] rounded-full shadow-xl flex items-center gap-2.5 z-50 backdrop-blur-md"
          >
            {POSTIT_COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => {
                  setSelectedColor(c);
                  setIsPaletteOpen(false);
                }}
                className={`w-6 h-6 rounded-full transition-transform cursor-pointer border ${
                  selectedColor.name === c.name
                    ? 'scale-125 ring-2 ring-[#030302] shadow-sm'
                    : 'hover:scale-115'
                }`}
                style={{ backgroundColor: c.hex, borderColor: c.border }}
                title={`${c.name} Post-It`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Figma-style Floating Dock (Comfortable Studio Dimensions) */}
      <div
        className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-[#ffffff]/92 backdrop-blur-2xl border border-[#e1e1e1] rounded-3xl shadow-2xl flex items-center gap-2 sm:gap-2.5 transition-all"
        style={{
          boxShadow:
            '0 24px 48px -12px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.08)',
        }}
      >
        {/* 1. Sticky Note Tool (Draggable 3D Paper + Color Chooser) */}
        <div className="relative flex items-center">
          <div
            onPointerDown={(e) => {
              setActiveTool('sticky');
              onStartStickyDrag(e, selectedColor.hex);
            }}
            onClick={() => {
              setActiveTool('sticky');
              onQuickNewSticky(selectedColor.hex);
            }}
            className={`flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl cursor-grab active:cursor-grabbing transition-all select-none border ${
              activeTool === 'sticky'
                ? 'bg-[#030302] text-white border-[#030302] shadow-sm'
                : 'hover:bg-[#efefef] text-[#030302] border-transparent'
            }`}
            title="Drag to place 3D Sticky Note on Corkboard [S]"
          >
            {/* Visual Mini Post-it Preview icon */}
            <div
              className="w-5 h-5 rounded-md border shadow-xs relative flex items-center justify-center transform -rotate-3"
              style={{
                backgroundColor: selectedColor.hex,
                borderColor: selectedColor.border,
              }}
            >
              <div className="w-2.5 h-0.5 bg-black/20 absolute top-0.5 rounded-xs" />
            </div>
            <span className="text-sm font-semibold">Sticky</span>
          </div>

          {/* Color Switcher Dot */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPaletteOpen((prev) => !prev);
            }}
            className="p-1.5 ml-0.5 rounded-xl hover:bg-[#efefef] text-[#bebbba] hover:text-[#030302] transition-colors cursor-pointer"
            title="Choose Sticky Note Color"
          >
            <div
              className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs"
              style={{ backgroundColor: selectedColor.hex }}
            />
          </button>
        </div>

        {/* 2. Scratch Note Tool */}
        <button
          type="button"
          onClick={() => {
            setActiveTool('note');
            onQuickNewNote();
          }}
          className={`flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl transition-all cursor-pointer ${
            activeTool === 'note'
              ? 'bg-[#030302] text-white shadow-sm'
              : 'text-[#41413f] hover:bg-[#efefef] hover:text-[#030302]'
          }`}
          title="Add Blank Scratch Note [N]"
        >
          <FileText className="w-5 h-5 stroke-[2]" />
          <span className="text-sm font-semibold">Note</span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-[#e1e1e1] mx-0.5" />

        {/* 3. Tidy Desk Action */}
        <button
          type="button"
          onClick={onTidyDesk}
          className="p-2.5 sm:p-3 rounded-2xl text-[#41413f] hover:bg-[#efefef] hover:text-[#030302] transition-all cursor-pointer flex items-center justify-center"
          title="Tidy Desk • Organize scattered notes"
        >
          <Sparkles className="w-5 h-5 text-[#caa61a] stroke-[2]" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-[#e1e1e1] mx-0.5" />

        {/* 4. Figma Dock Wire Basket Tool (peeking out of the toolbar) */}
        <div className="relative flex items-center">
          <motion.button
            type="button"
            onClick={onOpenBin}
            whileTap={{ scale: 0.96 }}
            animate={
              isDragOverBin
                ? {
                    y: -10,
                    scale: 1.12,
                    rotate: -3,
                    transition: { type: 'spring', stiffness: 500, damping: 18 },
                  }
                : {
                    y: 0,
                    scale: 1,
                    rotate: 0,
                  }
            }
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-2xl transition-colors cursor-pointer select-none group border ${
              isDragOverBin
                ? 'bg-[#ff4500]/15 border-[#ff4500] shadow-lg ring-2 ring-[#ff4500]/40'
                : 'hover:bg-[#efefef] border-transparent'
            }`}
            title={`Archive Wire Basket (${archivedCount}) • Click to inspect discarded notes, or toss notes here [E]`}
          >
            {/* The wire basket graphic peeking out of the top */}
            <div className="relative -top-3.5 -mb-3 w-12 h-12 flex-shrink-0 flex items-center justify-center pointer-events-none">
              <img
                src={wireBasketImg}
                alt="Wire Basket"
                className="w-full h-full object-contain filter drop-shadow(0 4px 6px rgba(0,0,0,0.25))"
                draggable={false}
              />
              {/* If items in bin, show mini paper ball inside rim */}
              {archivedCount > 0 && (
                <div
                  className="absolute top-1 left-4 w-3.5 h-3.5 rounded-full bg-[#fdfdfd] border border-[#d6d6d6] shadow-xs"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 35% 35%, #ffffff, #dcdcdc 65%, #9e9e9e)',
                  }}
                />
              )}
            </div>

            <span className="text-sm font-bold text-[#030302] tracking-tight">
              {isDragOverBin ? 'Toss!' : 'Bin'}
            </span>

            {/* Count Pill Badge */}
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold transition-colors ${
                isDragOverBin
                  ? 'bg-[#ff4500] text-white shadow-xs'
                  : 'bg-[#efefef] text-[#41413f] group-hover:bg-[#e2e2e2]'
              }`}
            >
              {archivedCount}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
