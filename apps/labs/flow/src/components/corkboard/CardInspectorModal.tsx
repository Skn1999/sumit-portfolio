import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Check,
  FileText,
  Save,
  Bot,
  Paperclip,
  Copy,
  Sparkles,
  Pin,
} from 'lucide-react';
import { IngestionThread, TodoItem, NoteItem } from '../../types';
import { ArcButton } from '../arc/ArcButton';
import { BotAvatar } from 'bot-avatars';
import { getAgentAvatarForTask } from '../../lib/avatarService';
import { renderDossierContent } from '../../lib/dossierRenderer';

interface CardInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedType: 'thread' | 'todo' | 'note' | null;
  activeThread: IngestionThread | null;
  activeTodo: TodoItem | null;
  activeNote: NoteItem | null;
  onTriageToTodo: (thread: IngestionThread) => void;
  onTriageToNote: (thread: IngestionThread) => void;
  onArchiveThread: (id: string) => void;
  onUpdateTodo: (todo: TodoItem) => void;
  onUpdateNote: (note: NoteItem) => void;
  onDelegateTodoToAgent: (id: string) => void;
  onRequestApproval?: (id: string) => void;
  onPinDossierAsNote?: (todo: TodoItem) => void;
}

export const CardInspectorModal: React.FC<CardInspectorModalProps> = ({
  isOpen,
  onClose,
  selectedType,
  activeThread,
  activeTodo,
  activeNote,
  onTriageToTodo,
  onTriageToNote,
  onArchiveThread,
  onUpdateTodo,
  onUpdateNote,
  onDelegateTodoToAgent,
  onPinDossierAsNote,
}) => {
  // Local editable draft state for Notes
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // Local editable draft state for Todos
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDesc, setTodoDesc] = useState('');
  const [copiedDossier, setCopiedDossier] = useState(false);

  const todoTextareaRef = useRef<HTMLTextAreaElement>(null);
  const noteTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus the details textarea whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (selectedType === 'todo' && todoTextareaRef.current) {
          todoTextareaRef.current.focus();
          const len = todoTextareaRef.current.value.length;
          todoTextareaRef.current.setSelectionRange(len, len);
        } else if (selectedType === 'note' && noteTextareaRef.current) {
          noteTextareaRef.current.focus();
          const len = noteTextareaRef.current.value.length;
          noteTextareaRef.current.setSelectionRange(len, len);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedType]);

  // Sync draft state whenever modal opens or active item changes
  useEffect(() => {
    if (activeNote) {
      setNoteTitle(activeNote.title || '');
      setNoteContent(activeNote.content || '');
    }
  }, [activeNote]);

  useEffect(() => {
    if (activeTodo) {
      setTodoTitle(activeTodo.title || '');
      setTodoDesc(activeTodo.description || '');
    }
  }, [activeTodo]);

  // Save Note Handler
  const handleSaveNote = () => {
    if (!activeNote) return;
    onUpdateNote({
      ...activeNote,
      title: noteTitle.trim() || 'Untitled Note',
      content: noteContent,
      updatedAt: new Date().toISOString(),
    });
    onClose();
  };

  // Save Todo Handler (automatically derives title from details if empty)
  const handleSaveTodo = () => {
    if (!activeTodo) return;
    const derivedTitle =
      todoTitle.trim() ||
      todoDesc.trim().split('\n')[0]?.slice(0, 60) ||
      'Action Item';
    onUpdateTodo({
      ...activeTodo,
      title: derivedTitle,
      description: todoDesc,
      updatedAt: new Date().toISOString(),
    });
    onClose();
  };

  // Shortcut key handling (Cmd+Enter to save, Esc to close, E to archive, T to todo, N to note)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const target = e.target as HTMLElement;
      const isInput =
        target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (selectedType === 'note') handleSaveNote();
        if (selectedType === 'todo') handleSaveTodo();
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Do not trigger triage shortcuts when typing in title/content fields
      if (isInput) return;

      if ((e.key === 'e' || e.key === 'E') && selectedType === 'thread' && activeThread) {
        e.preventDefault();
        onArchiveThread(activeThread.id);
        onClose();
      } else if ((e.key === 't' || e.key === 'T') && selectedType === 'thread' && activeThread) {
        e.preventDefault();
        onTriageToTodo(activeThread);
        onClose();
      } else if ((e.key === 'n' || e.key === 'N') && selectedType === 'thread' && activeThread) {
        e.preventDefault();
        onTriageToNote(activeThread);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpen,
    selectedType,
    noteTitle,
    noteContent,
    todoTitle,
    todoDesc,
    activeNote,
    activeTodo,
    activeThread,
    onArchiveThread,
    onTriageToTodo,
    onTriageToNote,
    onClose,
  ]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="inspector-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none font-ui bg-black/40"
        >
          {/* Modal Paper Sheet */}
          <motion.div
            key="inspector-modal-card"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[88vh] bg-[#ffffff] border border-[#e1e1e1] rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            {/* Header bar */}
            <div className="p-4 border-b border-[#e1e1e1] bg-[#fff3e7] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#bebbba] uppercase">
                  {selectedType === 'thread'
                    ? 'Gmail Thread'
                    : selectedType === 'todo'
                    ? 'Action Item'
                    : 'Scratchpad Note'}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#efefef] text-[#41413f] hover:text-[#030302] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
              {/* 1. THREAD INSPECTOR */}
              {selectedType === 'thread' && activeThread && (
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-editorial text-2xl md:text-3xl text-[#030302] tracking-tight leading-snug">
                        {activeThread.subject}
                      </h2>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-6 h-6 rounded-full bg-[#030302] text-[#ffffff] flex items-center justify-center font-editorial text-xs font-bold">
                          {activeThread.sender.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-[#030302]">
                          {activeThread.sender}
                        </span>
                        <span className="text-xs text-[#bebbba] font-mono">
                          &lt;{activeThread.senderEmail}&gt;
                        </span>
                        <span className="text-xs text-[#bebbba]">• {activeThread.timestamp}</span>
                      </div>
                    </div>

                    <a
                      href={`https://mail.google.com/mail/u/0/#inbox/${activeThread.threadId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0087ff] hover:underline px-3 py-1.5 rounded-full hover:bg-[#efefef] transition-colors flex-shrink-0"
                    >
                      <span>Open in Gmail</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Body Text */}
                  <div className="p-4 rounded-2xl bg-[#f7f7f7] border border-[#e1e1e1] text-xs leading-relaxed text-[#030302] font-ui whitespace-pre-line max-h-80 overflow-y-auto">
                    {activeThread.body}
                  </div>

                  {/* Triage Actions */}
                  <div className="pt-3 border-t border-[#e1e1e1] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArcButton
                        variant="primary"
                        size="sm"
                        icon={<Check className="w-3.5 h-3.5" />}
                        shortcut="T"
                        onClick={() => {
                          onTriageToTodo(activeThread);
                          onClose();
                        }}
                      >
                        Turn into Todo
                      </ArcButton>

                      <ArcButton
                        variant="secondary"
                        size="sm"
                        icon={<FileText className="w-3.5 h-3.5" />}
                        shortcut="N"
                        onClick={() => {
                          onTriageToNote(activeThread);
                          onClose();
                        }}
                      >
                        Save to Note
                      </ArcButton>

                      <ArcButton
                        variant="ghost"
                        size="sm"
                        shortcut="E"
                        onClick={() => {
                          onArchiveThread(activeThread.id);
                          onClose();
                        }}
                      >
                        Archive
                      </ArcButton>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. TODO INSPECTOR */}
              {selectedType === 'todo' && activeTodo && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#8a8785] mb-1.5">
                      Context & Details
                    </label>
                    <textarea
                      ref={todoTextareaRef}
                      value={todoDesc}
                      onChange={(e) => setTodoDesc(e.target.value)}
                      rows={6}
                      placeholder="Add details, notes, or steps for this task..."
                      className="w-full min-h-[140px] p-3.5 rounded-xl bg-[#f7f7f7] border border-[#e1e1e1] text-xs text-[#030302] focus:outline-none leading-relaxed resize-y focus:ring-1 focus:ring-[#030302]"
                    />
                  </div>

                  {/* AI Agent Status card & Deliverables */}
                  <div className="p-4 rounded-2xl bg-[#f7f7f7] border border-[#b8caf5] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white border border-[#b8caf5] flex items-center justify-center overflow-hidden flex-shrink-0">
                          <BotAvatar
                            type={getAgentAvatarForTask(activeTodo.id, activeTodo.agentAvatar)}
                            state={activeTodo.agentStatus === 'in_progress' ? 'working' : 'default'}
                            size={28}
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-[#030302]">Assistant</h4>
                          <p className="text-[11px] text-[#6e6e6d]">
                            {activeTodo.agentStatus === 'in_progress'
                              ? 'Researching...'
                              : activeTodo.agentStatus === 'completed'
                              ? 'Briefing ready'
                              : 'Ready'}
                          </p>
                        </div>
                      </div>

                      {activeTodo.assignedTo !== 'agent' && (
                        <ArcButton
                          variant="secondary"
                          size="sm"
                          icon={<Bot className="w-3.5 h-3.5" />}
                          onClick={() => {
                            onDelegateTodoToAgent(activeTodo.id);
                            onClose();
                          }}
                        >
                          Delegate to Assistant
                        </ArcButton>
                      )}
                    </div>

                    {/* Agent Notes / Live Progress */}
                    {activeTodo.agentNotes && (
                      <div className="p-2.5 rounded-xl bg-white border border-[#e1e1e1] text-[11px] font-mono text-[#41413f] flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#0087ff] flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{activeTodo.agentNotes}</span>
                      </div>
                    )}

                    {/* Generated Deliverables Dossier */}
                    {activeTodo.agentArtifacts && activeTodo.agentArtifacts.length > 0 && (
                      <div className="pt-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-editorial font-medium text-[#2d220f] flex items-center gap-1.5">
                            <Paperclip className="w-3.5 h-3.5 text-[#8a7750]" />
                            Executive Briefing
                          </span>
                          <div className="flex items-center gap-3">
                            {onPinDossierAsNote && (
                              <button
                                type="button"
                                onClick={() => {
                                  onPinDossierAsNote(activeTodo);
                                  onClose();
                                }}
                                className="text-[10px] font-mono text-[#164e2e] hover:underline flex items-center gap-1 cursor-pointer"
                                title="Pin this briefing to the corkboard as a scratch note"
                              >
                                <Pin className="w-3 h-3 text-[#164e2e]" />
                                Pin as Scratch Note
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                const text = activeTodo.agentArtifacts?.join('\n\n') || '';
                                navigator.clipboard.writeText(text);
                                setCopiedDossier(true);
                                setTimeout(() => setCopiedDossier(false), 2000);
                              }}
                              className="text-[10px] font-mono text-[#0087ff] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Copy className="w-3 h-3" />
                              {copiedDossier ? 'Copied to Clipboard!' : 'Copy Dossier'}
                            </button>
                          </div>
                        </div>

                        {activeTodo.agentArtifacts.map((artifact, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl bg-[#fffef9] border border-[#d3b57a]/60 shadow-xs max-h-80 overflow-y-auto selection:bg-[#fde99b]"
                            style={{
                              backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.4), transparent 30%)`,
                            }}
                          >
                            {renderDossierContent(artifact, (actionText) => {
                              onPinDossierAsNote?.({
                                ...activeTodo,
                                title: actionText,
                                description: actionText,
                                agentNotes: actionText,
                              });
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Explicit Save Action for Todo */}
                  <div className="pt-4 border-t border-[#e1e1e1] flex items-center justify-between">
                    <span className="text-[11px] text-[#bebbba] font-mono">
                      Press <kbd className="bg-[#efefef] px-1.5 py-0.5 rounded border text-[10px]">⌘+Enter</kbd> to save
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#41413f] hover:bg-[#efefef] transition-colors"
                      >
                        Cancel
                      </button>
                      <ArcButton
                        variant="primary"
                        size="md"
                        icon={<Save className="w-4 h-4" />}
                        onClick={handleSaveTodo}
                      >
                        Save Task
                      </ArcButton>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. NOTE INSPECTOR (WITH DEDICATED SAVE BUTTON) */}
              {selectedType === 'note' && activeNote && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#8a8785] mb-1.5">
                      Note Content
                    </label>
                    <textarea
                      ref={noteTextareaRef}
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      rows={12}
                      placeholder="Write your notes, markdown thoughts, or ideas here..."
                      className="w-full min-h-[220px] p-4 rounded-2xl bg-[#f7f7f7] border border-[#e1e1e1] font-mono text-xs text-[#030302] leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#030302]"
                    />
                  </div>

                  {/* Explicit Save Action for Note */}
                  <div className="pt-4 border-t border-[#e1e1e1] flex items-center justify-between">
                    <span className="text-[11px] text-[#bebbba] font-mono">
                      Press <kbd className="bg-[#efefef] px-1.5 py-0.5 rounded border text-[10px]">⌘+Enter</kbd> to save
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#41413f] hover:bg-[#efefef] transition-colors"
                      >
                        Cancel
                      </button>
                      <ArcButton
                        variant="primary"
                        size="md"
                        icon={<Save className="w-4 h-4" />}
                        onClick={handleSaveNote}
                      >
                        Save Note
                      </ArcButton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
