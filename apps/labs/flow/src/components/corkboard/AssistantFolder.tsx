import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { Pushpin } from './Pushpin';

interface AssistantFolderProps {
  isDragOver: boolean;
  activeTaskCount: number;
  inProgressTaskCount: number;
  completedTaskCount: number;
  style?: React.CSSProperties;
}

export const AssistantFolder: React.FC<AssistantFolderProps> = ({
  isDragOver,
  activeTaskCount,
  inProgressTaskCount,
  completedTaskCount,
  style,
}) => {
  const isWorking = inProgressTaskCount > 0;

  return (
    <motion.div
      style={style}
      animate={{
        scale: isDragOver ? 1.03 : 1,
        y: isDragOver ? -6 : 0,
        boxShadow: isDragOver
          ? '0 24px 40px -10px rgba(70, 50, 20, 0.35), 0 0 0 2px #b8caf5'
          : '0 16px 28px -8px rgba(70, 50, 20, 0.22), 0 4px 10px -2px rgba(70, 50, 20, 0.1)',
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="relative w-72 h-[340px] sm:w-80 sm:h-[360px] rounded-2xl select-none transition-all group flex flex-col justify-between font-ui"
    >
      {/* Brass Pushpin at top center of folder back */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <Pushpin color="gold" isPinned={true} />
      </div>

      {/* Manila Folder Tab */}
      <div className="absolute -top-7 left-6 z-10 flex items-center gap-1.5 px-4 py-1.5 rounded-t-xl bg-[#e8cf9b] border-t border-l border-r border-[#d3b57a] shadow-xs text-xs font-mono font-bold text-[#4a3b1a] tracking-wide uppercase">
        <span>Assistant</span>
        {isWorking && (
          <span className="w-2 h-2 rounded-full bg-[#0087ff] animate-pulse ml-1" />
        )}
      </div>

      {/* Peeking Briefing Documents Inside the Folder */}
      <div className="absolute inset-x-4 top-2 h-24 pointer-events-none z-10 flex justify-center">
        {/* Document Sheet 1 */}
        <motion.div
          animate={{
            y: isDragOver ? -14 : 0,
            rotate: isDragOver ? -3 : -1.5,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute w-[86%] h-20 rounded-t-lg bg-[#ffffff] border border-[#e1e1e1] shadow-xs p-2.5 opacity-90"
        >
          <div className="w-16 h-1.5 bg-[#bebbba]/50 rounded-full mb-1.5" />
          <div className="w-24 h-1 bg-[#efefef] rounded-full" />
        </motion.div>

        {/* Document Sheet 2 */}
        <motion.div
          animate={{
            y: isDragOver ? -22 : 0,
            rotate: isDragOver ? 2 : 1.2,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute w-[92%] h-22 rounded-t-lg bg-[#faf8f5] border border-[#e1e1e1] shadow-sm p-3 top-1"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-20 h-1.5 bg-[#41413f]/40 rounded-full" />
            <span className="text-[9px] font-mono text-[#bebbba]">Brief #04</span>
          </div>
          <div className="w-28 h-1 bg-[#e1e1e1] rounded-full mb-1" />
          <div className="w-20 h-1 bg-[#e1e1e1] rounded-full" />
        </motion.div>
      </div>

      {/* Main Manila Folder Jacket (Front Pocket) */}
      <div
        className="relative z-20 w-full h-full rounded-2xl flex flex-col justify-between p-5 border border-[#d3b57a]"
        style={{
          backgroundColor: '#eed8ae',
          backgroundImage: `
            linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent 40%),
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 20px 20px, 20px 20px',
        }}
      >
        {/* Top Drop Pocket Opening */}
        <div className="pt-8">
          <div
            className={`w-full py-2.5 px-3 rounded-xl border-2 border-dashed transition-all flex items-center justify-center gap-2 ${
              isDragOver
                ? 'bg-[#b8caf5]/30 border-[#0087ff] text-[#1b2b5a]'
                : 'bg-black/5 border-[#c4a56a]/70 text-[#5c4722]'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isDragOver ? 'animate-spin' : ''}`} />
            <span className="text-xs font-mono font-medium">
              {isDragOver ? 'Release to delegate to Assistant' : 'Drop notes here to delegate'}
            </span>
          </div>
        </div>

        {/* Middle Folder Stamp / Description */}
        <div className="my-auto text-left space-y-1.5 pt-2">
          {isWorking && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#1b2b5a]">
              <span className="w-2 h-2 rounded-full bg-[#0087ff] animate-pulse" />
              <span>Researching...</span>
            </div>
          )}

          <h3 className="font-editorial text-2xl font-medium text-[#2d220f] leading-tight">
            Secretary's Briefcase
          </h3>
          <p className="text-xs text-[#5c4722] leading-relaxed">
            Drop notes here to delegate research and synthesis.
          </p>
        </div>

        {/* Folder Footer & Statistics */}
        <div className="pt-3 border-t border-[#dfbe82] flex items-center justify-between text-xs font-mono text-[#5c4722]">
          <span title="Delegated tasks" className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 opacity-70" />
            <strong>{activeTaskCount}</strong> delegated
          </span>
          {completedTaskCount > 0 && (
            <span title="Completed deliverables" className="flex items-center gap-1 text-[#2d6a4f]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <strong>{completedTaskCount}</strong> ready
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
