import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ChevronRight, X } from 'lucide-react';
import { BoardPile, TodoItem, IngestionThread } from '../../types';

interface PhysicsPileProps {
  pile: BoardPile;
  items: (TodoItem | IngestionThread)[];
  onSelectItem: (id: string, type: 'todo' | 'thread') => void;
  onPositionChange: (pos: { x: number; y: number }) => void;
}

export const PhysicsPile: React.FC<PhysicsPileProps> = ({
  pile,
  items,
  onSelectItem,
  onPositionChange,
}) => {
  const [isFannedOut, setIsFannedOut] = useState(false);

  return (
    <motion.div
      drag={!isFannedOut}
      dragElastic={0.15}
      dragMomentum={true}
      onDragEnd={(_, info) => {
        onPositionChange({
          x: pile.position.x + info.offset.x,
          y: pile.position.y + info.offset.y,
        });
      }}
      initial={{ x: pile.position.x, y: pile.position.y }}
      animate={{ x: pile.position.x, y: pile.position.y, zIndex: isFannedOut ? 35 : 12 }}
      className="absolute cursor-pointer select-none font-ui"
    >
      {!isFannedOut ? (
        // COLLAPSED PILE (BumpTop Stack with visible layers)
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsFannedOut(true)}
          className="relative w-64 h-40"
        >
          {/* Layer 3 (Deepest bottom shadow layer) */}
          <div
            className="absolute inset-0 rounded-2xl bg-[#f0ebd8] border border-[#d6ceba] shadow-sm"
            style={{ transform: 'rotate(-4deg) translate(4px, 6px)' }}
          />

          {/* Layer 2 (Middle layer) */}
          <div
            className="absolute inset-0 rounded-2xl bg-[#ffffff] border border-[#e1e1e1] shadow-sm"
            style={{ transform: 'rotate(2.5deg) translate(-2px, 3px)' }}
          />

          {/* Layer 1 (Top Cover Card) */}
          <div
            className="absolute inset-0 rounded-2xl bg-[#fffdfa] border border-[#e1e1e1] p-4 flex flex-col justify-between shadow-craft text-left"
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.08) 0px 15px 25px 0px, rgba(0, 0, 0, 0.05) 0px 5px 10px 0px',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#fde99b]/60 text-[#554400]">
                <Layers className="w-3 h-3" />
                <span>Pile ({items.length})</span>
              </span>
              <span className="text-[10px] text-[#bebbba] font-mono">Click to Fan</span>
            </div>

            <div>
              <h4 className="font-editorial text-lg text-[#030302] leading-tight line-clamp-1">
                {pile.title}
              </h4>
              <p className="text-[11px] text-[#bebbba] mt-0.5 line-clamp-1">
                {items[0]?.['title'] || items[0]?.['subject'] || 'Stacked documents'}
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        // FANNED-OUT DECK (Playing card spread)
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="p-4 rounded-3xl bg-[#ffffff]/90 backdrop-blur-md border border-[#e1e1e1] shadow-2xl space-y-3"
          style={{ minWidth: '380px' }}
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#e1e1e1]">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#030302]" />
              <h4 className="font-editorial text-base font-bold text-[#030302]">
                {pile.title}
              </h4>
              <span className="text-xs text-[#bebbba] font-mono">({items.length} items)</span>
            </div>

            <button
              type="button"
              onClick={() => setIsFannedOut(false)}
              className="p-1 rounded-full hover:bg-[#efefef] text-[#41413f] hover:text-[#030302]"
              aria-label="Collapse pile"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
            {items.map((item, idx) => {
              const isTodo = 'priority' in item;
              const title = isTodo ? item.title : item.subject;

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 4, backgroundColor: '#fff3e7' }}
                  onClick={() => {
                    onSelectItem(item.id, isTodo ? 'todo' : 'thread');
                    setIsFannedOut(false);
                  }}
                  className="p-3 rounded-xl bg-[#f7f7f7] border border-[#e1e1e1] flex items-center justify-between text-left cursor-pointer transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-mono text-[#bebbba] block">
                      {isTodo ? 'Task' : 'Email'} #{idx + 1}
                    </span>
                    <h5 className="text-xs font-semibold text-[#030302] truncate">
                      {title}
                    </h5>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#bebbba] flex-shrink-0" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
