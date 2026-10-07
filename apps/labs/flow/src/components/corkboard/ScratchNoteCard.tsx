import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { FileText, Archive } from 'lucide-react';
import { NoteItem } from '../../types';
import { Pushpin } from './Pushpin';

interface ScratchNoteCardProps {
  note: NoteItem;
  isSelected?: boolean;
  onSelect: () => void;
  onDoubleClick?: () => void;
  onArchive?: () => void;
  onTogglePin?: () => void;
  onPositionChange: (pos: { x: number; y: number }) => void;
  onDragMove?: (point: { x: number; y: number }) => void;
  onDragEndWithPoint?: (point: { x: number; y: number }, offset: { x: number; y: number }) => boolean;
}

export const ScratchNoteCard: React.FC<ScratchNoteCardProps> = ({
  note,
  isSelected,
  onSelect,
  onDoubleClick,
  onArchive,
  onTogglePin,
  onPositionChange,
  onDragMove,
  onDragEndWithPoint,
}) => {
  const rotation = note.position?.rotation ?? 0;
  const isPinned = note.position?.isPinned ?? false;

  const posX = note.position?.x ?? 0;
  const posY = note.position?.y ?? 0;

  const x = useMotionValue(posX);
  const y = useMotionValue(posY);

  // Guard against opening detail inspector when dragging
  const isDraggingRef = useRef(false);

  // Sync motion values if note.position changes externally
  useEffect(() => {
    if (!isDraggingRef.current) {
      const currentX = x.get();
      const currentY = y.get();
      if (Math.hypot(currentX - posX, currentY - posY) > 1) {
        animate(x, posX, { type: 'spring', stiffness: 450, damping: 32 });
        animate(y, posY, { type: 'spring', stiffness: 450, damping: 32 });
      }
    }
  }, [posX, posY, x, y]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.08}
      onDragStart={() => {
        isDraggingRef.current = true;
      }}
      onDrag={(_, info) => {
        onDragMove?.(info.point);
      }}
      onDragEnd={(_, info) => {
        const currentX = x.get();
        const currentY = y.get();

        const handled = onDragEndWithPoint?.(info.point, info.offset);
        if (!handled) {
          onPositionChange({
            x: currentX,
            y: currentY,
          });
        }
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 120);
      }}
      animate={{
        rotate: rotation,
        zIndex: isSelected ? 30 : 10,
      }}
      whileHover={{
        scale: 1.02,
        rotate: rotation > 0 ? rotation + 0.5 : rotation - 0.5,
        zIndex: 35,
      }}
      whileTap={{ scale: 0.98 }}
      whileDrag={{ scale: 1.04, zIndex: 50, cursor: 'grabbing' }}
      onClick={() => {
        if (isDraggingRef.current) return;
        onSelect();
      }}
      onDoubleClick={() => {
        if (isDraggingRef.current) return;
        onDoubleClick?.();
      }}
      className={`absolute w-72 sm:w-80 p-4 rounded-xl bg-[#ffffff] border border-[#e1e1e1] font-ui cursor-grab select-none text-left ${
        isSelected ? 'ring-2 ring-[#030302] shadow-2xl' : 'shadow-craft'
      }`}
      style={{
        x,
        y,
        boxShadow: isSelected
          ? '0 20px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.06)'
          : 'rgba(0, 0, 0, 0.05) 0px 8px 16px 0px, rgba(0, 0, 0, 0.06) 0px 2px 4px 0px',
      }}
    >
      {/* 3D Pushpin at Top */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
        <Pushpin
          color="silver"
          isPinned={isPinned}
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin?.();
          }}
        />
      </div>

      <div className="pt-1.5 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-editorial text-base font-semibold text-[#030302] tracking-tight truncate">
            {note.title || 'Untitled Note'}
          </h3>
          <span className="text-[10px] text-[#bebbba] font-mono flex-shrink-0">
            {note.updatedAt ? new Date(note.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
          </span>
        </div>

        <p className="text-xs text-[#41413f] leading-relaxed line-clamp-3 font-mono whitespace-pre-line bg-[#f7f7f7] p-2 rounded-xl border border-[#efefef]">
          {note.content || 'Empty note. Double-click to edit...'}
        </p>

        <div className="pt-1 flex items-center justify-between">
          {note.linkedSources && note.linkedSources.length > 0 ? (
            <div className="flex items-center gap-1 text-[10px] text-[#0087ff] font-mono">
              <FileText className="w-3 h-3" />
              <span className="truncate">Linked: {note.linkedSources[0].title}</span>
            </div>
          ) : <div />}

          {onArchive && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onArchive();
              }}
              className="p-1 rounded-full text-[#bebbba] hover:text-[#030302] hover:bg-[#efefef] transition-colors"
              title="Archive / Discard to Bin (E)"
            >
              <Archive className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
