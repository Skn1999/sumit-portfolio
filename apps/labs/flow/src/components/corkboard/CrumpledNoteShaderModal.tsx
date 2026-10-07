import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Trash2, Mail, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { ArchivedItem } from '../../types';

interface CrumpledNoteShaderModalProps {
  item: ArchivedItem | null;
  onClose: () => void;
  onRestore: (item: ArchivedItem) => void;
  onDeletePermanently: (id: string) => void;
}

export const CrumpledNoteShaderModal: React.FC<CrumpledNoteShaderModalProps> = ({
  item,
  onClose,
  onRestore,
  onDeletePermanently,
}) => {
  // Shortcut keys: Escape to close, R to restore
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        onRestore(item);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onRestore]);

  if (!item) return null;

  const isTodo = item.type === 'todo';
  const isThread = item.type === 'thread';
  const isNote = item.type === 'note';

  // Paper styling depending on item type
  const paperBg = isTodo ? '#fef7c2' : '#faf8f2';
  const paperBorder = isTodo ? '#edd776' : '#d8d4cb';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none font-ui">
        {/* SVG Crumpled Paper Lighting & Displacement Shader Filter */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <filter id="crumpled-paper-shader" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.038"
              numOctaves="5"
              result="noise"
            />
            <feDiffuseLighting
              in="noise"
              lightingColor="#ffffff"
              surfaceScale="3.4"
              result="light"
            >
              <feDistantLight azimuth="45" elevation="52" />
            </feDiffuseLighting>
            <feComponentTransfer in="light" result="creases">
              <feFuncR type="linear" slope="1.18" intercept="-0.09" />
              <feFuncG type="linear" slope="1.18" intercept="-0.09" />
              <feFuncB type="linear" slope="1.18" intercept="-0.09" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="creases" mode="multiply" />
          </filter>
        </svg>

        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Uncrumpled Paper Sheet */}
        <motion.div
          initial={{ scale: 0.35, rotate: -18, opacity: 0 }}
          animate={{ scale: 1, rotate: [-2, 1, -0.5], opacity: 1 }}
          exit={{ scale: 0.4, rotate: 15, opacity: 0 }}
          transition={{ type: 'spring', damping: 24, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 text-left border"
          style={{
            backgroundColor: paperBg,
            borderColor: paperBorder,
            filter: 'url(#crumpled-paper-shader) drop-shadow(0 25px 35px rgba(0,0,0,0.38))',
            boxShadow:
              'inset 0 0 50px rgba(0,0,0,0.06), 0 30px 60px -12px rgba(0,0,0,0.45)',
          }}
        >
          {/* Layered CSS Diagonal Fold & Crease Overlays */}
          <div
            className="absolute inset-0 pointer-events-none z-20 opacity-75"
            style={{
              backgroundImage: `
                linear-gradient(130deg, transparent 48%, rgba(0,0,0,0.08) 50%, rgba(255,255,255,0.22) 51%, transparent 53%),
                linear-gradient(65deg, transparent 47%, rgba(0,0,0,0.07) 49%, rgba(255,255,255,0.18) 50%, transparent 52%),
                linear-gradient(-40deg, transparent 48%, rgba(0,0,0,0.09) 50%, rgba(255,255,255,0.24) 51%, transparent 53%),
                linear-gradient(15deg, transparent 48.5%, rgba(0,0,0,0.05) 50%, rgba(255,255,255,0.15) 51%, transparent 53%)
              `,
              backgroundSize: '100% 100%, 100% 100%, 100% 100%, 100% 100%',
            }}
          />

          {/* Top Bar with Stamp & Close */}
          <div className="p-5 pb-3 border-b border-black/10 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#41413f] flex items-center gap-1.5">
                {isThread && <Mail className="w-3.5 h-3.5 text-[#ff4500]" />}
                {isTodo && <CheckCircle2 className="w-3.5 h-3.5 text-[#caa61a]" />}
                {isNote && <FileText className="w-3.5 h-3.5 text-[#0087ff]" />}
                <span>
                  {isThread
                    ? 'Discarded Gmail Thread'
                    : isTodo
                    ? 'Discarded Todo Post-It'
                    : 'Discarded Note'}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Rubber Stamp */}
              <div className="rotate-[-8deg] border-2 border-[#ff4500]/70 text-[#ff4500] px-2.5 py-0.5 rounded font-mono text-[10px] font-black tracking-widest uppercase opacity-85 select-none shadow-xs">
                CRUMPLED IN BIN
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-full hover:bg-black/10 text-[#41413f] hover:text-[#030302] transition-colors cursor-pointer"
                title="Back to Wastebasket (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 z-10 text-[#030302]">
            {/* Title / Subject */}
            <h2 className="font-editorial text-2xl font-bold tracking-tight leading-snug">
              {item.title}
            </h2>

            {/* Sender / Metadata Info */}
            {item.sender && (
              <div className="flex items-center gap-2 text-xs text-[#41413f]">
                <div className="w-5 h-5 rounded-full bg-[#030302] text-white flex items-center justify-center font-editorial text-[10px] font-bold">
                  {item.sender.charAt(0)}
                </div>
                <span className="font-semibold">{item.sender}</span>
                {item.senderEmail && (
                  <span className="text-[#bebbba] font-mono">&lt;{item.senderEmail}&gt;</span>
                )}
                <span className="text-[#bebbba]">• Discarded {item.archivedAt}</span>
              </div>
            )}

            {/* Text / Body */}
            <div className="p-4 rounded-xl bg-black/[0.03] border border-black/10 text-xs leading-relaxed font-ui whitespace-pre-line max-h-64 overflow-y-auto shadow-inner">
              {item.body || item.content || item.snippet || 'No text content available.'}
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/5 text-[#41413f] border border-black/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="p-4 border-t border-black/10 bg-black/[0.02] flex items-center justify-between z-10">
            <button
              type="button"
              onClick={() => onDeletePermanently(item.id)}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Permanently</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#41413f] hover:bg-black/10 transition-colors cursor-pointer"
              >
                Back to Bin
              </button>

              <button
                type="button"
                onClick={() => onRestore(item)}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#030302] hover:bg-[#41413f] text-white flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore to Board [R]</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
