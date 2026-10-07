import React, { useState, useEffect } from 'react';
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
const parseFormattedText = (text: string): React.ReactNode => {
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        return (
          <a
            key={i}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0066cc] underline hover:text-[#004499] inline-flex items-center gap-0.5 font-medium cursor-pointer"
          >
            {match[1]}
            <ExternalLink className="w-2.5 h-2.5 inline" />
          </a>
        );
      }
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[#1a140b]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-[11px] text-[#4a3b1a] border border-[#ebd8ba]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
};

const renderDossierContent = (content: string) => {
  const lines = content.split('\n');
  return (
    <div className="space-y-2.5 font-sans text-xs text-[#2d220f] leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-0.5" />;

        // Main Title (# )
        if (trimmed.startsWith('# ')) {
          return (
            <h3 key={idx} className="font-editorial text-lg font-bold text-[#1a140b] border-b border-[#e8d7b8] pb-1.5 pt-1">
              {trimmed.slice(2)}
            </h3>
          );
        }
        // Section Header (## )
        if (trimmed.startsWith('## ')) {
          return (
            <h4 key={idx} className="font-editorial text-sm font-bold text-[#3d2c14] pt-2.5 pb-0.5 flex items-center gap-1.5">
              {trimmed.slice(3)}
            </h4>
          );
        }
        // Horizontal Rule (---)
        if (trimmed === '---') {
          return <hr key={idx} className="border-t border-[#ebd8ba] my-2" />;
        }
        // Bullet Point (* or -)
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          const itemText = trimmed.slice(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c4a56a] mt-1.5 flex-shrink-0" />
              <div className="flex-1 leading-relaxed">
                {parseFormattedText(itemText)}
              </div>
            </div>
          );
        }
        // Numbered List
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1.5">
              <span className="font-mono text-[10px] font-bold text-[#c4a56a] mt-0.5 flex-shrink-0 w-3.5">
                {numMatch[1]}.
              </span>
              <div className="flex-1 leading-relaxed">
                {parseFormattedText(numMatch[2])}
              </div>
            </div>
          );
        }
        // Paragraph / Metadata
        return (
          <p key={idx} className="leading-relaxed">
            {parseFormattedText(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

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

  // Save Todo Handler
  const handleSaveTodo = () => {
    if (!activeTodo) return;
    onUpdateTodo({
      ...activeTodo,
      title: todoTitle.trim(),
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
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono text-[#bebbba] uppercase mb-1">
                      Task Title
                    </label>
                    <input
                      type="text"
                      value={todoTitle}
                      onChange={(e) => setTodoTitle(e.target.value)}
                      className="w-full font-editorial text-2xl text-[#030302] tracking-tight bg-[#f7f7f7] px-3.5 py-2 rounded-xl border border-[#e1e1e1] focus:outline-none focus:ring-1 focus:ring-[#030302]"
                      placeholder="Task title..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#bebbba] uppercase mb-1.5">
                      Context & Details (Resizable)
                    </label>
                    <textarea
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
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-[#b8caf5]/50 text-[#1b2b5a]">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#030302]">Autonomous Assistant</h4>
                          <p className="text-[10px] text-[#bebbba] font-mono">
                            Status: <span className="uppercase text-[#1b2b5a] font-bold">{activeTodo.agentStatus}</span>
                          </p>
                        </div>
                      </div>

                      {activeTodo.assignedTo !== 'agent' ? (
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
                      ) : (
                        <span className="text-[10px] font-mono text-[#0087ff] bg-white px-2 py-0.5 rounded-full border border-[#b8caf5]">
                          Assigned to Assistant
                        </span>
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
                          <span className="text-[10px] font-mono uppercase text-[#4a3b1a] font-bold flex items-center gap-1">
                            <Paperclip className="w-3.5 h-3.5 text-[#4a3b1a]" />
                            Executive Research Dossier
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
                            {renderDossierContent(artifact)}
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
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono text-[#bebbba] uppercase mb-1">
                      Note Title
                    </label>
                    <input
                      type="text"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                      placeholder="Note Title..."
                      className="w-full font-editorial text-2xl text-[#030302] tracking-tight bg-[#f7f7f7] px-3.5 py-2 rounded-xl border border-[#e1e1e1] focus:outline-none focus:ring-1 focus:ring-[#030302]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#bebbba] uppercase mb-1.5">
                      Note Content (Resizable)
                    </label>
                    <textarea
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
