import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, RotateCcw, Package, Archive, Sparkles } from 'lucide-react';
import { ArchivedItem } from '../../types';
import { CrumpledNoteShaderModal } from './CrumpledNoteShaderModal';
import wireBasketImg from '../../assets/wire_basket.png';

interface BinInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  archivedItems: ArchivedItem[];
  onRestoreItem: (item: ArchivedItem) => void;
  onRestoreAll: () => void;
  onEmptyBin: () => void;
  onDeletePermanently: (id: string) => void;
}

export const BinInspectionModal: React.FC<BinInspectionModalProps> = ({
  isOpen,
  onClose,
  archivedItems,
  onRestoreItem,
  onRestoreAll,
  onEmptyBin,
  onDeletePermanently,
}) => {
  const [selectedNote, setSelectedNote] = useState<ArchivedItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Close on Escape if no note is actively inspected
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || selectedNote) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedNote, onClose]);

  if (!isOpen) return null;

  // Calculate organic scatter positions across the circular bottom of the basket
  const getBallPosition = (index: number, total: number) => {
    if (total === 1) return { x: 0, y: 15, rot: -12 };
    const goldenAngle = 137.5 * (Math.PI / 180);
    const radius = Math.min(130, 35 + Math.sqrt(index) * 32);
    const angle = index * goldenAngle;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * (radius * 0.7) + 20; // Flattened ellipse perspective
    const rot = ((index * 67) % 360) - 180;
    return { x, y, rot };
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none font-ui">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* 3D Wire Basket Modal Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 60 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-[#f7f2eb] rounded-3xl border border-[#e1e1e1] shadow-2xl overflow-hidden flex flex-col z-10"
          style={{
            boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.45)',
          }}
        >
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-[#e1e1e1] bg-[#ffffff]/90 backdrop-blur-md flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#030302] text-white flex items-center justify-center shadow-xs">
                <Archive className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-editorial text-lg font-bold text-[#030302] tracking-tight flex items-center gap-2">
                  <span>Wastebasket Interior</span>
                  <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-[#efefef] text-[#41413f]">
                    {archivedItems.length} {archivedItems.length === 1 ? 'item' : 'items'}
                  </span>
                </h3>
                <p className="text-xs text-[#bebbba] font-mono">
                  Look inside the bin • Click any crumpled note to unfold & inspect
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {archivedItems.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={onRestoreAll}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#ffffff] hover:bg-[#efefef] text-[#030302] border border-[#e1e1e1] flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    title="Restore all crumpled notes back to the corkboard"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore All</span>
                  </button>

                  <button
                    type="button"
                    onClick={onEmptyBin}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Permanently discard all items in bin"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Empty Bin</span>
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#efefef] text-[#41413f] hover:text-[#030302] transition-colors ml-2 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3D Wire Basket Interior Viewport */}
          <div
            className="relative w-full h-[520px] flex items-center justify-center overflow-hidden"
            style={{
              perspective: 1200,
              backgroundColor: '#e6ded4',
              backgroundImage: `
                radial-gradient(#d3c7b7 12%, transparent 14%),
                radial-gradient(#ebd9c5 12%, transparent 14%)
              `,
              backgroundSize: '24px 24px, 48px 48px',
              backgroundPosition: '0 0, 24px 24px',
            }}
          >
            {/* 3D Perspective Stage of the Wire Basket */}
            <div
              className="relative w-[480px] h-[480px] flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(52deg) rotateZ(-3deg)',
              }}
            >
              {/* Outer Circular Basket Rim Ring */}
              <div
                className="absolute inset-0 rounded-full border-[10px] border-[#c0c0c0] shadow-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(30,30,30,0.45) 0%, rgba(20,20,20,0.7) 70%, rgba(10,10,10,0.85) 100%)',
                  boxShadow:
                    'inset 0 0 60px rgba(0,0,0,0.8), 0 35px 50px rgba(0,0,0,0.5)',
                }}
              />

              {/* Metallic Circular Wire Mesh Floor Grid */}
              <div
                className="absolute w-[360px] h-[360px] rounded-full border-4 border-[#888888] pointer-events-none"
                style={{
                  backgroundImage: `
                    radial-gradient(circle, transparent 20%, rgba(0,0,0,0.4) 100%),
                    repeating-linear-gradient(0deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 1.5px, transparent 1.5px, transparent 16px),
                    repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 1.5px, transparent 1.5px, transparent 16px)
                  `,
                  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.7)',
                }}
              >
                {/* Concentric Wire Rings on Bottom */}
                <div className="absolute inset-8 rounded-full border border-white/20" />
                <div className="absolute inset-16 rounded-full border border-white/20" />
                <div className="absolute inset-24 rounded-full border border-white/20" />
                <div className="absolute inset-[130px] rounded-full bg-black/40 border border-white/25" />
              </div>

              {/* Crumpled Notes Resting on the Floor */}
              {archivedItems.length > 0 ? (
                <div className="relative w-[340px] h-[340px] flex items-center justify-center">
                  {archivedItems.map((item, index) => {
                    const { x, y, rot } = getBallPosition(index, archivedItems.length);
                    const isTodo = item.type === 'todo';
                    const isHovered = hoveredId === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        onClick={() => setSelectedNote(item)}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          x,
                          y,
                          rotate: rot,
                          scale: isHovered ? 1.25 : 1,
                          zIndex: isHovered ? 40 : 10 + index,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                        className="absolute cursor-pointer select-none group"
                        title="Click to unfold & read note"
                      >
                        {/* 3D Crumpled Paper Ball */}
                        <div
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center relative transform -rotate-12 transition-transform"
                          style={{
                            backgroundColor: isTodo ? '#fef7c2' : '#ffffff',
                            backgroundImage: isTodo
                              ? 'radial-gradient(circle at 35% 35%, #fffbe6 15%, #fae075 60%, #caa61a 100%)'
                              : 'radial-gradient(circle at 35% 35%, #ffffff 15%, #dedede 60%, #8f8f8f 100%)',
                            border: isTodo ? '1.5px solid #ebd880' : '1.5px solid #d4d4d4',
                            boxShadow: isHovered
                              ? 'inset -3px -3px 8px rgba(0,0,0,0.35), inset 3px 3px 6px rgba(255,255,255,0.8), 0 16px 24px rgba(0,0,0,0.5)'
                              : 'inset -3px -3px 6px rgba(0,0,0,0.3), inset 3px 3px 6px rgba(255,255,255,0.7), 0 8px 14px rgba(0,0,0,0.35)',
                            filter: 'contrast(150%) brightness(95%)',
                            borderRadius: '45% 55% 52% 48% / 48% 46% 54% 52%', // Organic irregular crumpled paper contour
                          }}
                        >
                          {/* Crumple wrinkle creases */}
                          <div
                            className="absolute inset-0 rounded-full opacity-60 pointer-events-none"
                            style={{
                              backgroundImage: `
                                linear-gradient(135deg, transparent 46%, rgba(0,0,0,0.2) 48%, rgba(255,255,255,0.3) 50%, transparent 52%),
                                linear-gradient(45deg, transparent 46%, rgba(0,0,0,0.18) 48%, rgba(255,255,255,0.3) 50%, transparent 52%)
                              `,
                            }}
                          />

                          {/* Tiny snippet of text on crumpled paper */}
                          <span className="text-[9px] font-mono text-black/60 truncate max-w-[42px] px-1 pointer-events-none select-none">
                            {item.title}
                          </span>
                        </div>

                        {/* Floating Tooltip Label on Hover (Counter-rotated against 3D basket angle) */}
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 4, scale: 0.9 }}
                            animate={{ opacity: 1, y: -16, scale: 1 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#030302] text-white rounded-full text-xs font-mono font-medium shadow-xl whitespace-nowrap z-50 pointer-events-none flex items-center gap-1.5"
                            style={{
                              transform: 'rotateX(-52deg)', // counter-acts basket perspective for crystal-clear readability
                            }}
                          >
                            <Sparkles className="w-3 h-3 text-[#fde99b]" />
                            <span className="max-w-[200px] truncate">{item.title}</span>
                            <span className="text-[10px] text-[#bebbba] border-l border-white/20 pl-1.5">
                              Unfold ↗
                            </span>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                /* Empty Basket State */
                <div
                  className="flex flex-col items-center justify-center text-center p-6 pointer-events-none z-10"
                  style={{ transform: 'rotateX(-52deg)' }}
                >
                  <Package className="w-8 h-8 text-white/50 mb-2" />
                  <p className="text-sm font-editorial font-bold text-white/90">
                    Wastebasket is Empty
                  </p>
                  <p className="text-xs text-white/60 max-w-[220px] mt-0.5 font-mono">
                    Select any note and press <strong>[E]</strong> or drag to the bin to discard.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Unfolded Crumpled Note Shader Modal */}
        <CrumpledNoteShaderModal
          item={selectedNote}
          onClose={() => setSelectedNote(null)}
          onRestore={(item) => {
            onRestoreItem(item);
            setSelectedNote(null);
          }}
          onDeletePermanently={(id) => {
            onDeletePermanently(id);
            setSelectedNote(null);
          }}
        />
      </div>
    </AnimatePresence>
  );
};
