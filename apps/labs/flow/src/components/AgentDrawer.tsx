import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  AlertTriangle,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  Paperclip,
  Copy,
  FileText,
  Pin,
} from 'lucide-react';
import { ApprovalRequest, TodoItem } from '../types';
import { ArcBadge } from './arc/ArcBadge';
import { ArcConfirmMorph } from './arc/ArcConfirmMorph';
import { BotAvatar } from 'bot-avatars';
import { getAgentAvatarForTask } from '../lib/avatarService';
import { renderDossierContent } from '../lib/dossierRenderer';

interface AgentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  approvals: ApprovalRequest[];
  agentTodos?: TodoItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onOpenInspector?: (taskId: string) => void;
  onPinDossierAsNote?: (todo: TodoItem) => void;
}

export const AgentDrawer: React.FC<AgentDrawerProps> = ({
  isOpen,
  onClose,
  approvals,
  agentTodos = [],
  onApprove,
  onReject,
  onOpenInspector,
  onPinDossierAsNote,
}) => {
  const completedDossiers = agentTodos.filter(
    (t) => t.agentStatus === 'completed' && t.agentArtifacts && t.agentArtifacts.length > 0
  );
  const inProgressTasks = agentTodos.filter((t) => t.agentStatus === 'in_progress');

  const defaultTab = approvals.length > 0 ? 'approvals' : 'dossiers';
  const [activeTab, setActiveTab] = useState<'dossiers' | 'approvals' | 'progress'>(defaultTab);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-40 backdrop-blur-xs"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-[#ffffff] border-l border-[#e1e1e1] shadow-2xl z-50 flex flex-col font-ui"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#e1e1e1] flex items-center justify-between bg-[#fff3e7]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#e1e1e1] flex items-center justify-center overflow-hidden flex-shrink-0">
                  <BotAvatar type="clover" state="default" size={26} />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-medium text-[#030302] tracking-tight">
                    Assistant Desk & Deliverables
                  </h3>
                  <p className="text-xs text-[#41413f]">
                    Executive Research Dossiers & Approvals
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#efefef] text-[#41413f] hover:text-[#030302] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Segmented Filter Bar */}
            <div className="px-5 pt-3.5 pb-2.5 border-b border-[#e1e1e1] bg-[#fafafa] flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('dossiers')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'dossiers'
                    ? 'bg-[#030302] text-[#ffffff] shadow-xs'
                    : 'bg-transparent text-[#41413f] hover:bg-black/5'
                }`}
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>Dossiers</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === 'dossiers' ? 'bg-white/20 text-white' : 'bg-black/10 text-[#41413f]'
                }`}>
                  {completedDossiers.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('approvals')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'approvals'
                    ? 'bg-[#030302] text-[#ffffff] shadow-xs'
                    : 'bg-transparent text-[#41413f] hover:bg-black/5'
                }`}
              >
                <AlertTriangle className={`w-3.5 h-3.5 ${approvals.length > 0 ? 'text-[#ff4500]' : ''}`} />
                <span>Approvals</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === 'approvals' ? 'bg-white/20 text-white' : 'bg-black/10 text-[#41413f]'
                }`}>
                  {approvals.length}
                </span>
              </button>

              {inProgressTasks.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab('progress')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'progress'
                      ? 'bg-[#030302] text-[#ffffff] shadow-xs'
                      : 'bg-transparent text-[#41413f] hover:bg-black/5'
                  }`}
                >
                  <BotAvatar type="clover" state="working" size={16} />
                  <span>In Progress</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    activeTab === 'progress' ? 'bg-white/20 text-white' : 'bg-black/10 text-[#41413f]'
                  }`}>
                    {inProgressTasks.length}
                  </span>
                </button>
              )}
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* 1. DOSSIERS TAB */}
              {activeTab === 'dossiers' && (
                <>
                  {completedDossiers.length === 0 ? (
                    <div className="text-center py-16 space-y-3 select-none">
                      <Paperclip className="w-10 h-10 text-[#c4a56a]/60 mx-auto" />
                      <h4 className="font-editorial text-lg text-[#030302]">No Dossiers Yet</h4>
                      <p className="text-xs text-[#bebbba] max-w-xs mx-auto leading-relaxed">
                        Drag any note or email card into the <strong>Assistant Folder</strong> on the corkboard to generate an executive research dossier.
                      </p>
                    </div>
                  ) : (
                    completedDossiers.map((todo) => (
                      <div
                        key={todo.id}
                        className="p-5 rounded-2xl bg-[#ffffff] border border-[#d3b57a]/70 shadow-craft space-y-3.5 text-left"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#8a7f75]">
                          <span className="flex items-center gap-1.5 text-[#4a3b1a] font-medium">
                            <Paperclip className="w-3.5 h-3.5 text-[#8a7750]" />
                            Executive Briefing
                          </span>
                          <span className="text-[10px]">
                            {todo.completedAt ? 'Completed' : 'Ready'}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-editorial text-xl text-[#030302] leading-snug font-medium">
                            {todo.title}
                          </h4>
                          {todo.agentNotes && (
                            <p className="text-xs text-[#41413f] mt-1 leading-relaxed bg-[#f7f7f7] p-2.5 rounded-xl border border-[#e1e1e1]">
                              {todo.agentNotes}
                            </p>
                          )}
                        </div>

                        {/* Rendered Dossier Sheet */}
                        {todo.agentArtifacts && todo.agentArtifacts.length > 0 && (
                          <div
                            className="p-4 rounded-xl bg-[#fffef9] border border-[#d3b57a]/60 max-h-72 overflow-y-auto selection:bg-[#fde99b]"
                            style={{
                              backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.4), transparent 30%)`,
                            }}
                          >
                            {renderDossierContent(todo.agentArtifacts[0])}
                          </div>
                        )}

                        {/* Deliverable Action Buttons */}
                        <div className="pt-2 border-t border-[#e1e1e1] flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const text = todo.agentArtifacts?.join('\n\n') || todo.agentNotes || '';
                                navigator.clipboard.writeText(text);
                                setCopiedId(todo.id);
                                setTimeout(() => setCopiedId(null), 2000);
                              }}
                              className="px-3 py-1.5 rounded-full bg-[#f7f7f7] hover:bg-[#efefef] text-[#030302] border border-[#e1e1e1] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Copy className="w-3.5 h-3.5 text-[#41413f]" />
                              <span>{copiedId === todo.id ? 'Copied!' : 'Copy'}</span>
                            </button>

                            {onPinDossierAsNote && (
                              <button
                                type="button"
                                onClick={() => onPinDossierAsNote(todo)}
                                className="px-3 py-1.5 rounded-full bg-[#f7f7f7] hover:bg-[#efefef] text-[#164e2e] border border-[#9bd8a9] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                                title="Pin this briefing to corkboard as a scratch note"
                              >
                                <Pin className="w-3.5 h-3.5 text-[#164e2e]" />
                                <span>Pin as Note</span>
                              </button>
                            )}
                          </div>

                          {onOpenInspector && (
                            <button
                              type="button"
                              onClick={() => {
                                onOpenInspector(todo.id);
                                onClose();
                              }}
                              className="px-3 py-1.5 rounded-full bg-[#030302] text-[#ffffff] font-semibold inline-flex items-center gap-1.5 hover:bg-[#222222] transition-colors cursor-pointer"
                            >
                              <span>Open Details</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}

              {/* 2. APPROVALS TAB */}
              {activeTab === 'approvals' && (
                <>
                  {approvals.length === 0 ? (
                    <div className="text-center py-16 space-y-2 select-none">
                      <ShieldCheck className="w-10 h-10 text-[#9bd8a9] mx-auto" />
                      <h4 className="font-editorial text-lg text-[#030302]">All Clear</h4>
                      <p className="text-xs text-[#bebbba] max-w-xs mx-auto leading-relaxed">
                        No actions pending approval.
                      </p>
                    </div>
                  ) : (
                    approvals.map((req) => (
                      <div
                        key={req.id}
                        className="p-5 rounded-2xl bg-[#ffffff] border border-[#e1e1e1] shadow-craft space-y-4 text-left"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <ArcBadge variant="papaya" size="sm" icon={<AlertTriangle className="w-3 h-3" />}>
                            Approval Required
                          </ArcBadge>
                          <span className="text-[10px] font-mono text-[#bebbba]">
                            {req.createdAt ? 'Just now' : ''}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-editorial text-lg text-[#030302] leading-snug">
                            {req.summary}
                          </h4>
                          <p className="text-xs text-[#bebbba] mt-0.5">
                            Related Task: <strong>{req.taskTitle}</strong>
                          </p>
                        </div>

                        {/* Preview Payload */}
                        <div className="p-3.5 rounded-xl bg-[#f7f7f7] border border-[#e1e1e1] space-y-2 text-xs">
                          {req.previewPayload.recipient && (
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono uppercase text-[#bebbba]">To:</span>
                              <span className="font-mono text-xs text-[#030302]">
                                {req.previewPayload.recipient}
                              </span>
                            </div>
                          )}

                          {req.previewPayload.subject && (
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono uppercase text-[#bebbba]">Subj:</span>
                              <span className="font-medium text-xs text-[#030302]">
                                {req.previewPayload.subject}
                              </span>
                            </div>
                          )}

                          {req.previewPayload.content && (
                            <div className="pt-2 border-t border-[#e1e1e1]">
                              <span className="block text-[10px] font-mono uppercase text-[#bebbba] mb-1">
                                Drafted Email Body:
                              </span>
                              <div className="p-3 rounded-lg bg-[#ffffff] border border-[#e1e1e1] font-mono text-[11px] whitespace-pre-wrap text-[#41413f] leading-relaxed">
                                {req.previewPayload.content}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Decision Action Buttons */}
                        <div className="pt-2 flex items-center justify-end gap-2.5">
                          <button
                            onClick={() => onReject(req.id)}
                            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#41413f] hover:bg-[#efefef] transition-colors cursor-pointer"
                          >
                            Reject
                          </button>

                          <ArcConfirmMorph
                            label="Approve & Send"
                            confirmLabel="Send live email?"
                            variant="approve"
                            onConfirm={() => onApprove(req.id)}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}

              {/* 3. IN PROGRESS TAB */}
              {activeTab === 'progress' && (
                <div className="space-y-4">
                  {inProgressTasks.map((todo) => (
                    <div
                      key={todo.id}
                      className="p-4 rounded-2xl bg-[#f0f4fd] border border-[#b8caf5] text-left space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#1b2b5a] flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md bg-white border border-[#b8caf5] flex items-center justify-center overflow-hidden flex-shrink-0">
                            <BotAvatar
                              type={getAgentAvatarForTask(todo.id, todo.agentAvatar)}
                              state="working"
                              size={18}
                            />
                          </div>
                          Researching...
                        </span>
                      </div>
                      <h4 className="font-editorial text-lg text-[#030302]">{todo.title}</h4>
                      <p className="text-xs text-[#41413f] font-mono bg-white/70 p-2.5 rounded-lg border border-[#b8caf5]/50 leading-relaxed">
                        {todo.agentNotes || 'Assistant inspecting context & references...'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
