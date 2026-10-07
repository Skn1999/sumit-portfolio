import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertTriangle } from 'lucide-react';

interface ArcConfirmMorphProps {
  label: string;
  confirmLabel?: string;
  onConfirm: () => void;
  variant?: 'danger' | 'approve';
  className?: string;
}

export const ArcConfirmMorph: React.FC<ArcConfirmMorphProps> = ({
  label,
  confirmLabel = 'Confirm?',
  onConfirm,
  variant = 'approve',
  className = '',
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const colors = variant === 'approve'
    ? {
        idle: 'bg-[#9bd8a9] text-[#1b3d24] hover:bg-[#8cc79a]',
        active: 'bg-[#030302] text-[#ffffff]',
        confirmBtn: 'bg-[#9bd8a9] text-[#1b3d24]',
      }
    : {
        idle: 'bg-[#ff4500] text-[#ffffff] hover:bg-[#e03d00]',
        active: 'bg-[#030302] text-[#ffffff]',
        confirmBtn: 'bg-[#ff4500] text-[#ffffff]',
      };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <AnimatePresence mode="wait">
        {!isConfirming ? (
          <motion.button
            key="idle"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsConfirming(true)}
            className={`px-3.5 py-1.5 rounded-full font-ui text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer ${colors.idle}`}
          >
            {variant === 'approve' ? <Check className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            <span>{label}</span>
          </motion.button>
        ) : (
          <motion.div
            key="confirming"
            initial={{ opacity: 0, width: 'auto', scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`flex items-center gap-1.5 p-1 rounded-full border border-[#e1e1e1] bg-[#ffffff] shadow-md`}
          >
            <span className="text-[11px] font-ui font-medium text-[#41413f] pl-2 pr-1">
              {confirmLabel}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onConfirm();
                setIsConfirming(false);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm ${colors.confirmBtn}`}
            >
              <Check className="w-3 h-3" />
              <span>Yes</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsConfirming(false)}
              className="p-1 rounded-full text-[#41413f] hover:bg-[#efefef] hover:text-[#030302] transition-colors"
              aria-label="Cancel"
            >
              <X className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
