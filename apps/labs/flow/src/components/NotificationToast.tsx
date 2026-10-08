import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, AlertCircle, CheckCircle2, RefreshCw, X, Paperclip } from 'lucide-react';
import { AgentNotification } from '../types';
import { BotAvatar } from 'bot-avatars';

interface NotificationToastProps {
  notifications: AgentNotification[];
  onDismiss: (id: string) => void;
  onViewApproval?: (approvalId: string) => void;
  onViewDossier?: (taskId: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  notifications,
  onDismiss,
  onViewApproval,
  onViewDossier,
}) => {
  // Only show the top 2 toasts at any time to avoid screen clutter
  const visible = notifications.slice(0, 2);

  // Auto-dismiss non-approval notifications after 4 seconds
  useEffect(() => {
    if (visible.length === 0) return;
    const oldest = visible[visible.length - 1];
    if (oldest.type !== 'approval_required') {
      const timer = setTimeout(() => {
        onDismiss(oldest.id);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  return (
    <div className="fixed top-16 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      <AnimatePresence>
        {visible.map((notif) => {
          const isPickup = notif.type === 'pickup';
          const isApproval = notif.type === 'approval_required';
          const isOverloaded = notif.type === 'overloaded';

          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className={`pointer-events-auto p-3.5 ${
                isOverloaded
                  ? 'bg-[#fff9ef] border border-[#e8d7bd]'
                  : 'bg-[#ffffff] border border-[#e1e1e1]'
              } rounded-2xl shadow-xl flex items-start gap-3 text-left font-ui`}
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 20px 30px 0px, rgba(0, 0, 0, 0.08) 0px 3px 10px 0px',
              }}
            >
              <div
                className={`p-2 rounded-xl flex-shrink-0 ${
                  isOverloaded
                    ? 'bg-[#f7f0e4] text-[#8c5820] border border-[#e4d5c1]'
                    : isPickup
                    ? 'bg-[#b8caf5]/40 text-[#1a2e66]'
                    : isApproval
                    ? 'bg-[#ff4500]/15 text-[#aa2d00]'
                    : 'bg-[#9bd8a9]/40 text-[#194425]'
                }`}
              >
                {isOverloaded ? (
                  <BotAvatar type="clover" state="sleeping" size={16} />
                ) : isPickup ? (
                  <BotAvatar type="clover" state="working" size={16} />
                ) : isApproval ? (
                  <AlertCircle className="w-4 h-4 text-[#ff4500]" />
                ) : notif.type === 'sync' ? (
                  <RefreshCw className="w-4 h-4" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-semibold text-[#030302] truncate">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-[#bebbba] flex-shrink-0">
                    {notif.timestamp}
                  </span>
                </div>
                <p className="text-xs text-[#41413f] mt-0.5 leading-snug line-clamp-2">
                  {notif.message}
                </p>

                {isApproval && notif.approvalId && onViewApproval && (
                  <button
                    onClick={() => onViewApproval(notif.approvalId!)}
                    className="mt-2 text-[11px] font-semibold text-[#0087ff] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    Review & Decide →
                  </button>
                )}

                {notif.type === 'completed' && notif.taskId && onViewDossier && (
                  <button
                    onClick={() => onViewDossier(notif.taskId!)}
                    className="mt-2 text-[11px] font-semibold text-[#164e2e] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Paperclip className="w-3 h-3 text-[#164e2e]" />
                    <span>View Dossier →</span>
                  </button>
                )}

                {isOverloaded && notif.taskId && onViewDossier && (
                  <button
                    onClick={() => onViewDossier(notif.taskId!)}
                    className="mt-2 text-[11px] font-semibold text-[#8c5820] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect Note →</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => onDismiss(notif.id)}
                className="text-[#bebbba] hover:text-[#030302] p-1 rounded-full hover:bg-[#efefef] transition-colors flex-shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
