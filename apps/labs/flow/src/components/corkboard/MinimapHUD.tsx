import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, Compass } from 'lucide-react';

interface MinimapHUDProps {
  scale: number;
  pan: { x: number; y: number };
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onJumpToZone: (zone: 'inbox' | 'today' | 'piles' | 'scratchpad') => void;
}

export const MinimapHUD: React.FC<MinimapHUDProps> = ({
  scale,
  pan,
  onZoomIn,
  onZoomOut,
  onResetView,
  onJumpToZone,
}) => {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2 p-1.5 rounded-full bg-[#ffffff]/90 backdrop-blur-md border border-[#e1e1e1] shadow-xl font-ui select-none">
      {/* Zoom controls */}
      <button
        type="button"
        onClick={onZoomOut}
        className="p-1.5 rounded-full hover:bg-[#efefef] text-[#41413f] hover:text-[#030302] transition-colors"
        title="Zoom Out"
      >
        <ZoomOut className="w-4 h-4" />
      </button>

      <span className="text-xs font-mono font-medium text-[#030302] px-1 min-w-[42px] text-center">
        {Math.round(scale * 100)}%
      </span>

      <button
        type="button"
        onClick={onZoomIn}
        className="p-1.5 rounded-full hover:bg-[#efefef] text-[#41413f] hover:text-[#030302] transition-colors"
        title="Zoom In"
      >
        <ZoomIn className="w-4 h-4" />
      </button>

      <div className="w-[1px] h-4 bg-[#e1e1e1] mx-0.5" />

      {/* Reset camera */}
      <button
        type="button"
        onClick={onResetView}
        className="p-1.5 rounded-full hover:bg-[#efefef] text-[#41413f] hover:text-[#030302] transition-colors"
        title="Fit All / Reset Board Camera"
      >
        <Maximize2 className="w-4 h-4" />
      </button>

      <div className="w-[1px] h-4 bg-[#e1e1e1] mx-0.5" />

      {/* Zone quick-jumps */}
      <div className="flex items-center gap-1 text-[11px] font-medium">
        <button
          type="button"
          onClick={() => onJumpToZone('inbox')}
          className="px-2 py-0.5 rounded-full hover:bg-[#efefef] text-[#41413f] hover:text-[#030302] transition-colors"
        >
          📥 In-Tray
        </button>
        <button
          type="button"
          onClick={() => onJumpToZone('today')}
          className="px-2 py-0.5 rounded-full hover:bg-[#efefef] text-[#41413f] hover:text-[#030302] transition-colors"
        >
          🎯 Today
        </button>
        <button
          type="button"
          onClick={() => onJumpToZone('piles')}
          className="px-2 py-0.5 rounded-full hover:bg-[#efefef] text-[#41413f] hover:text-[#030302] transition-colors"
        >
          📚 Piles
        </button>
        <button
          type="button"
          onClick={() => onJumpToZone('scratchpad')}
          className="px-2 py-0.5 rounded-full hover:bg-[#efefef] text-[#41413f] hover:text-[#030302] transition-colors"
        >
          📝 Notes
        </button>
      </div>
    </div>
  );
};
