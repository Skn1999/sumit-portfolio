import React, { useState } from 'react';
import {
  ExternalLink,
  Check,
  Calendar,
  Tag,
  Bot,
  AlertCircle,
  FileText,
  Mail,
  Share2,
  Trash2,
  Sparkles,
  Send,
  Plus,
} from 'lucide-react';
import { IngestionThread, TodoItem, NoteItem, Priority } from '../types';
import { ArcButton } from './arc/ArcButton';
import { ArcBadge } from './arc/ArcBadge';
import { ArcConfirmMorph } from './arc/ArcConfirmMorph';
import { BotAvatar } from 'bot-avatars';
import { getAgentAvatarForTask } from '../lib/avatarService';
import { renderDossierContent } from '../lib/dossierRenderer';

interface WorkspaceViewProps {
  selectedType: 'thread' | 'todo' | 'note' | null;
  activeThread: IngestionThread | null;
  activeTodo: TodoItem | null;
  activeNote: NoteItem | null;
  onTriageToTodo: (thread: IngestionThread) => void;
  onTriageToNote: (thread: IngestionThread) => void;
  onArchiveThread: (id: string) => void;
  onUpdateTodo: (todo: TodoItem) => void;
  onUpdateNote: (note: NoteItem) => void;
  onDelegateTodoToAgent: (todoId: string) => void;
  onRequestApproval: (todoId: string) => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
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
  onRequestApproval,
}) => {
  // Local state for edits
  const [noteContent, setNoteContent] = useState<string>('');

  if (!selectedType) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#fff3e7] text-center font-ui select-none">
        <div className="w-12 h-12 rounded-full bg-[#fde99b]/60 flex items-center justify-center text-[#554400] mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="font-editorial text-2xl font-medium text-[#030302] tracking-tight">
          Select an item to view or triage
        </h3>
        <p className="text-sm text-[#41413f] max-w-sm mt-1 leading-relaxed">
          Traverse incoming email threads with <kbd className="px-1.5 py-0.5 rounded bg-[#efefef] border text-xs font-mono">j</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-[#efefef] border text-xs font-mono">k</kbd>, or convert them into tracked actions with <kbd className="px-1.5 py-0.5 rounded bg-[#efefef] border text-xs font-mono">T</kbd>.
        </p>
      </div>
    );
  }

  // 1. EMAIL THREAD VIEW
  if (selectedType === 'thread' && activeThread) {
    return (
      <div className="flex-1 flex flex-col h-full bg-[#ffffff] font-ui overflow-y-auto">
        {/* Triage Action Header Bar */}
        <div className="p-4 border-b border-[#e1e1e1] bg-[#ffffff] sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ArcButton
              variant="primary"
              size="sm"
              icon={<Check className="w-3.5 h-3.5" />}
              shortcut="T"
              onClick={() => onTriageToTodo(activeThread)}
            >
              Turn into Todo
            </ArcButton>

            <ArcButton
              variant="secondary"
              size="sm"
              icon={<FileText className="w-3.5 h-3.5" />}
              shortcut="N"
              onClick={() => onTriageToNote(activeThread)}
            >
              Save to Note
            </ArcButton>

            <ArcButton
              variant="ghost"
              size="sm"
              shortcut="E"
              onClick={() => onArchiveThread(activeThread.id)}
            >
              Archive
            </ArcButton>
          </div>

          <a
            href={`https://mail.google.com/mail/u/0/#inbox/${activeThread.threadId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0087ff] hover:underline px-3 py-1.5 rounded-full hover:bg-[#efefef] transition-colors"
          >
            <span>Open in Gmail</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Reading Pane Content */}
        <div className="p-8 max-w-3xl space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ArcBadge variant="sky" size="sm">
                Gmail Thread
              </ArcBadge>
              <span className="text-xs text-[#bebbba] font-mono">{activeThread.timestamp}</span>
            </div>

            <h1 className="font-editorial text-3xl md:text-4xl text-[#030302] tracking-tight leading-tight">
              {activeThread.subject}
            </h1>
          </div>

          {/* Sender metadata card */}
          <div className="p-4 rounded-2xl bg-[#f7f7f7] border border-[#e1e1e1] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#030302] text-[#ffffff] flex items-center justify-center font-editorial font-bold text-sm">
                {activeThread.sender.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#030302]">{activeThread.sender}</p>
                <p className="text-[11px] text-[#bebbba] font-mono">{activeThread.senderEmail}</p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="prose prose-sm max-w-none text-[#030302] leading-relaxed whitespace-pre-line text-sm border-t border-[#e1e1e1] pt-6 font-ui">
            {activeThread.body}
          </div>
        </div>
      </div>
    );
  }

  // 2. TODO ITEM VIEW
  if (selectedType === 'todo' && activeTodo) {
    return (
      <div className="flex-1 flex flex-col h-full bg-[#ffffff] font-ui overflow-y-auto">
        {/* Todo Header Controls */}
        <div className="p-4 border-b border-[#e1e1e1] bg-[#ffffff] sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#bebbba] font-mono uppercase">Priority:</span>
            {([1, 2, 3, 4] as Priority[]).map((p) => (
              <button
                key={p}
                onClick={() => onUpdateTodo({ ...activeTodo, priority: p })}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  activeTodo.priority === p
                    ? p === 1
                      ? 'bg-[#ff4500] text-white shadow-sm'
                      : p === 2
                      ? 'bg-[#fde99b] text-[#554400] font-bold shadow-sm'
                      : 'bg-[#9bd8a9] text-[#194425] font-bold shadow-sm'
                    : 'bg-[#efefef] text-[#41413f] hover:bg-[#e1e1e1]'
                }`}
              >
                P{p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onDelegateTodoToAgent(activeTodo.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#b8caf5]/40 text-[#1b2b5a] hover:bg-[#b8caf5]/60 transition-colors shadow-sm"
              title="Assign this task to your autonomous agent"
            >
              <Bot className="w-3.5 h-3.5 text-[#1b2b5a]" />
              <span>Delegate to Agent</span>
            </button>
          </div>
        </div>

        {/* Todo Content Detail */}
        <div className="p-8 max-w-3xl space-y-6">
          <div>
            <input
              type="text"
              value={activeTodo.title}
              onChange={(e) => onUpdateTodo({ ...activeTodo, title: e.target.value })}
              className="w-full font-editorial text-2xl md:text-3xl text-[#030302] tracking-tight bg-transparent border-none focus:outline-none focus:ring-0 p-0"
              placeholder="Task title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono text-[#bebbba] uppercase mb-1.5">
              Context & Notes
            </label>
            <textarea
              value={activeTodo.description}
              onChange={(e) => onUpdateTodo({ ...activeTodo, description: e.target.value })}
              rows={4}
              className="w-full p-3 rounded-xl bg-[#f7f7f7] border border-[#e1e1e1] text-xs text-[#030302] focus:outline-none focus:ring-1 focus:ring-[#030302] leading-relaxed resize-none"
              placeholder="Add details, instructions, or sub-tasks..."
            />
          </div>

          {/* Source Link Card */}
          {activeTodo.source && (
            <div className="p-4 rounded-2xl bg-[#fff3e7] border border-[#e1e1e1] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#030302] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#ff4500]" />
                  <span>Linked Source: {activeTodo.source.author}</span>
                </span>
                <a
                  href={activeTodo.source.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#0087ff] hover:underline flex items-center gap-1"
                >
                  <span>Open Thread</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-[#41413f] italic font-serif">
                "{activeTodo.source.snippet}"
              </p>
            </div>
          )}

          {/* ASSISTANT WORKSPACE CARD */}
          <div className="p-5 rounded-2xl bg-[#f7f7f7] border border-[#b8caf5]/70 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#b8caf5] flex items-center justify-center overflow-hidden flex-shrink-0">
                  <BotAvatar
                    type={getAgentAvatarForTask(activeTodo.id, activeTodo.agentAvatar)}
                    state={activeTodo.agentStatus === 'in_progress' ? 'working' : 'default'}
                    size={26}
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

              {activeTodo.agentStatus === 'awaiting_approval' && (
                <ArcBadge variant="papaya" size="sm">
                  Action Held for Approval
                </ArcBadge>
              )}
            </div>

            {activeTodo.agentNotes && (
              <div className="p-3 rounded-xl bg-[#ffffff] border border-[#e1e1e1] text-xs text-[#41413f] leading-relaxed">
                <p className="font-semibold text-[#030302] text-[11px] mb-1">Notes:</p>
                <p>{activeTodo.agentNotes}</p>
              </div>
            )}

            {activeTodo.agentArtifacts && activeTodo.agentArtifacts.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-mono text-[#8a7f75]">
                  Deliverables:
                </span>
                {activeTodo.agentArtifacts.map((art, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#fffef9] border border-[#d3b57a]/60 shadow-xs max-h-72 overflow-y-auto"
                  >
                    {renderDossierContent(art)}
                  </div>
                ))}
              </div>
            )}

            {/* Test Trigger Approval button */}
            {activeTodo.agentStatus !== 'awaiting_approval' && (
              <div className="pt-2 flex items-center justify-end">
                <button
                  onClick={() => onRequestApproval(activeTodo.id)}
                  className="text-xs text-[#ff4500] hover:underline font-semibold"
                >
                  Simulate High-Stakes Action & Request Approval →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. NOTE / SCRATCHPAD VIEW
  if (selectedType === 'note' && activeNote) {
    return (
      <div className="flex-1 flex flex-col h-full bg-[#fff3e7] font-ui overflow-y-auto">
        {/* Note Header */}
        <div className="p-4 border-b border-[#e1e1e1] bg-[#ffffff]/80 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#bebbba] uppercase">Scratchpad</span>
            <ArcBadge variant="marigold" size="sm">
              Live Preview
            </ArcBadge>
          </div>

          <div className="flex items-center gap-2">
            <ArcButton
              variant="secondary"
              size="sm"
              icon={<Sparkles className="w-3.5 h-3.5 text-[#ff4500]" />}
              onClick={() => {
                onUpdateNote({
                  ...activeNote,
                  content: `${activeNote.content}\n\n## 🤖 AI Summary & Action Items\n- [ ] Follow up on design token PR\n- [ ] Send bio to Dr. Virtanen`,
                });
              }}
            >
              Ask AI to Expand
            </ArcButton>
          </div>
        </div>

        {/* Note Content Editor */}
        <div className="p-8 max-w-3xl space-y-4">
          <input
            type="text"
            value={activeNote.title}
            onChange={(e) => onUpdateNote({ ...activeNote, title: e.target.value })}
            className="w-full font-editorial text-3xl md:text-4xl text-[#030302] tracking-tight bg-transparent border-none focus:outline-none p-0"
            placeholder="Note title..."
          />

          <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-[#e1e1e1]">
            {activeNote.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-full bg-[#efefef] text-[#41413f] font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>

          <textarea
            value={activeNote.content}
            onChange={(e) => onUpdateNote({ ...activeNote, content: e.target.value })}
            rows={18}
            className="w-full p-4 rounded-2xl bg-[#ffffff] border border-[#e1e1e1] font-mono text-xs text-[#030302] leading-relaxed resize-none focus:outline-none shadow-sm"
            placeholder="Write notes in markdown..."
          />
        </div>
      </div>
    );
  }

  return null;
};
