import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Mail, ExternalLink, Paperclip, Star, Check, FileText, Archive } from 'lucide-react';
import { IngestionThread } from '../../types';
import { Pushpin } from './Pushpin';

interface EmailCardProps {
  thread: IngestionThread;
  isSelected?: boolean;
  onSelect: () => void;
  onDoubleClick?: () => void;
  onTriageToTodo: () => void;
  onTriageToNote: () => void;
  onArchive: () => void;
  onTogglePin: () => void;
  onPositionChange: (pos: { x: number; y: number }) => void;
  onDragMove?: (point: { x: number; y: number }) => void;
  onDragEndWithPoint?: (point: { x: number; y: number }, offset: { x: number; y: number }) => boolean;
}

export const EmailCard: React.FC<EmailCardProps> = ({
  thread,
  isSelected,
  onSelect,
  onDoubleClick,
  onTriageToTodo,
  onTriageToNote,
  onArchive,
  onTogglePin,
  onPositionChange,
  onDragMove,
  onDragEndWithPoint,
}) => {
  const isPinned = thread.position?.isPinned ?? true;
  const rotation = thread.position?.rotation ?? 0;

  const posX = thread.position?.x ?? 0;
  const posY = thread.position?.y ?? 0;

  const x = useMotionValue(posX);
  const y = useMotionValue(posY);

  // Guard against opening detail inspector when dragging
  const isDraggingRef = useRef(false);

  // Sync motion values if thread.position changes externally
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
      className={`absolute w-72 sm:w-80 p-4 rounded-2xl bg-[#ffffff] border border-[#e1e1e1] font-ui cursor-grab select-none text-left ${
        isSelected ? 'ring-2 ring-[#030302] shadow-2xl' : 'shadow-craft'
      }`}
      style={{
        x,
        y,
        boxShadow: isSelected
          ? '0 20px 30px -5px rgba(0,0,0,0.18), 0 8px 12px -5px rgba(0,0,0,0.08)'
          : 'rgba(0, 0, 0, 0.05) 0px 8px 16px 0px, rgba(0, 0, 0, 0.06) 0px 2px 4px 0px',
      }}
    >
      {/* Pushpin at Top */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
        <Pushpin
          color={thread.unread ? 'red' : 'silver'}
          isPinned={isPinned}
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin();
          }}
        />
      </div>

      {/* Header Info */}
      <div className="flex items-center justify-between gap-2 mb-2 pt-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-5 h-5 rounded-full bg-[#030302] text-[#ffffff] flex items-center justify-center font-editorial text-[10px] font-bold">
            {thread.sender.charAt(0)}
          </div>
          <span
            className={`text-xs truncate ${
              thread.unread ? 'font-bold text-[#030302]' : 'font-medium text-[#41413f]'
            }`}
          >
            {thread.sender}
          </span>
          {thread.unread && (
            <span className="w-2 h-2 rounded-full bg-[#0087ff] flex-shrink-0" />
          )}
        </div>

        <span className="text-[10px] text-[#bebbba] font-mono flex-shrink-0">
          {thread.timestamp}
        </span>
      </div>

      {/* Subject */}
      <h3
        className={`text-xs leading-snug line-clamp-2 mb-1.5 ${
          thread.unread ? 'font-bold text-[#030302]' : 'font-medium text-[#41413f]'
        }`}
      >
        {thread.subject}
      </h3>

      {/* Snippet */}
      <p className="text-[11px] text-[#41413f] line-clamp-2 leading-relaxed mb-3">
        {thread.snippet}
      </p>

      {/* Triage Action Bar */}
      <div className="pt-2 border-t border-[#e1e1e1] flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTriageToTodo();
            }}
            className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#030302] text-[#ffffff] hover:bg-[#41413f] transition-all flex items-center gap-1 shadow-xs"
            title="Convert to Todo (T)"
          >
            <Check className="w-3 h-3" />
            <span>[T] Todo</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTriageToNote();
            }}
            className="px-2 py-1 rounded-full text-[10px] font-medium bg-[#efefef] text-[#030302] hover:bg-[#e1e1e1] transition-all flex items-center gap-1"
            title="Save to Note (N)"
          >
            <FileText className="w-3 h-3" />
            <span>Note</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onArchive();
            }}
            className="p-1 rounded-full text-[#bebbba] hover:text-[#030302] hover:bg-[#efefef] transition-all"
            title="Archive (E)"
          >
            <Archive className="w-3.5 h-3.5" />
          </button>
        </div>

        <a
          href={`https://mail.google.com/mail/u/0/#inbox/${thread.threadId}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-[#0087ff] hover:text-[#005bb5] p-1 transition-colors"
          title="Open in Gmail ↗"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
};
