import React from 'react';
import {
  Mail,
  Star,
  Paperclip,
  CheckCircle2,
  Circle,
  Calendar,
  Tag,
  Bot,
  AlertTriangle,
  ArrowRight,
  Pin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ViewCategory, IngestionThread, TodoItem, NoteItem } from '../types';
import { ArcBadge } from './arc/ArcBadge';
import { BotAvatar } from 'bot-avatars';
import { getAgentAvatarForTask } from '../lib/avatarService';

interface StreamViewProps {
  activeView: ViewCategory;
  threads: IngestionThread[];
  todos: TodoItem[];
  notes: NoteItem[];
  selectedId: string | null;
  onSelect: (id: string, type: 'thread' | 'todo' | 'note') => void;
  onTriageToTodo: (thread: IngestionThread) => void;
  onTriageToNote: (thread: IngestionThread) => void;
  onToggleTodoStatus: (id: string) => void;
  onArchiveThread: (id: string) => void;
}

export const StreamView: React.FC<StreamViewProps> = ({
  activeView,
  threads,
  todos,
  notes,
  selectedId,
  onSelect,
  onTriageToTodo,
  onTriageToNote,
  onToggleTodoStatus,
  onArchiveThread,
}) => {
  const isInbox = activeView.type === 'inbox';
  const isAction = activeView.type === 'action';
  const isNotes = activeView.type === 'notes';

  return (
    <div className="w-80 md:w-96 flex flex-col h-full bg-[#ffffff] border-r border-[#e1e1e1] font-ui">
      {/* Stream View Header */}
      <div className="p-4 border-b border-[#e1e1e1] flex items-center justify-between bg-[#ffffff]">
        <div>
          <h2 className="font-editorial text-xl font-medium text-[#030302] tracking-tight capitalize">
            {isInbox && `${activeView.provider} Stream`}
            {isAction && `${activeView.view} Tasks`}
            {isNotes && (activeView.view === 'scratchpad' ? 'Scratchpad' : 'Notes')}
          </h2>
          <p className="text-xs text-[#bebbba]">
            {isInbox && `${threads.length} threads`}
            {isAction && `${todos.length} action items`}
            {isNotes && `${notes.length} documents`}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#bebbba] font-mono">
          <kbd className="px-1.5 py-0.5 rounded bg-[#efefef] border border-[#e1e1e1]">j</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-[#efefef] border border-[#e1e1e1]">k</kbd>
          <span>nav</span>
        </div>
      </div>

      {/* Stream List Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#e1e1e1]">
        {/* INBOX THREADS */}
        {isInbox &&
          threads.map((thread) => {
            const isSelected = selectedId === thread.id;
            return (
              <div
                key={thread.id}
                onClick={() => onSelect(thread.id, 'thread')}
                className={`p-3.5 transition-all cursor-pointer relative group text-left ${
                  isSelected
                    ? 'bg-[#fff3e7] border-l-4 border-l-[#030302]'
                    : thread.unread
                    ? 'bg-[#ffffff] hover:bg-[#f7f7f7]'
                    : 'bg-[#fafafa] hover:bg-[#f7f7f7] opacity-80'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {thread.unread && (
                      <span className="w-2 h-2 rounded-full bg-[#0087ff] flex-shrink-0" />
                    )}
                    <span
                      className={`text-xs truncate ${
                        thread.unread ? 'font-bold text-[#030302]' : 'font-medium text-[#41413f]'
                      }`}
                    >
                      {thread.sender}
                    </span>
                  </div>

                  <span className="text-[10px] text-[#bebbba] flex-shrink-0 font-mono">
                    {thread.timestamp}
                  </span>
                </div>

                <h3
                  className={`text-xs line-clamp-1 mb-1 ${
                    thread.unread ? 'font-semibold text-[#030302]' : 'text-[#41413f]'
                  }`}
                >
                  {thread.subject}
                </h3>

                <p className="text-[11px] text-[#bebbba] line-clamp-2 leading-relaxed">
                  {thread.snippet}
                </p>

                {/* Micro Actions Bar */}
                <div className="mt-2.5 pt-2 border-t border-[#e1e1e1]/60 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {thread.attachmentsCount > 0 && (
                      <span className="text-[10px] text-[#bebbba] flex items-center gap-0.5">
                        <Paperclip className="w-3 h-3" />
                        {thread.attachmentsCount}
                      </span>
                    )}
                    {thread.isStarred && (
                      <Star className="w-3 h-3 fill-[#fde99b] text-[#fde99b]" />
                    )}
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTriageToTodo(thread);
                      }}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#030302] text-[#ffffff] hover:bg-[#41413f]"
                      title="Convert to Todo (T)"
                    >
                      [T] Todo
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTriageToNote(thread);
                      }}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#efefef] text-[#030302] hover:bg-[#e1e1e1]"
                      title="Save to Note (N)"
                    >
                      [N] Note
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onArchiveThread(thread.id);
                      }}
                      className="px-1.5 py-0.5 rounded-full text-[10px] text-[#bebbba] hover:text-[#030302]"
                      title="Mark Triaged (E)"
                    >
                      [E]
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

        {/* TODOS */}
        {isAction &&
          todos.map((todo) => {
            const isSelected = selectedId === todo.id;
            const isCompleted = todo.status === 'completed';

            return (
              <div
                key={todo.id}
                onClick={() => onSelect(todo.id, 'todo')}
                className={`p-3.5 transition-all cursor-pointer relative group text-left ${
                  isSelected
                    ? 'bg-[#fff3e7] border-l-4 border-l-[#030302]'
                    : 'bg-[#ffffff] hover:bg-[#f7f7f7]'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTodoStatus(todo.id);
                    }}
                    className="mt-0.5 flex-shrink-0 text-[#bebbba] hover:text-[#030302] transition-colors"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-[#9bd8a9]" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-xs font-medium leading-snug ${
                        isCompleted ? 'line-through text-[#bebbba]' : 'text-[#030302]'
                      }`}
                    >
                      {todo.title}
                    </h3>

                    {todo.description && (
                      <p className="text-[11px] text-[#bebbba] line-clamp-1 mt-1">
                        {todo.description}
                      </p>
                    )}

                    {/* Metadata tags */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {todo.priority === 1 && (
                        <ArcBadge variant="papaya" size="sm">
                          P1 Urgent
                        </ArcBadge>
                      )}
                      {todo.priority === 2 && (
                        <ArcBadge variant="marigold" size="sm">
                          P2 High
                        </ArcBadge>
                      )}

                      {todo.dueDate && (
                        <span className="text-[10px] text-[#bebbba] flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3" />
                          {todo.dueDate}
                        </span>
                      )}

                      {todo.source && (
                        <span className="text-[10px] text-[#0087ff] flex items-center gap-0.5 font-mono">
                          <Mail className="w-3 h-3" />
                          Gmail
                        </span>
                      )}

                      {todo.assignedTo === 'agent' && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#b8caf5]/30 text-[#1b2b5a] border border-[#b8caf5]">
                          <BotAvatar
                            type={getAgentAvatarForTask(todo.id, todo.agentAvatar)}
                            state={todo.agentStatus === 'in_progress' ? 'working' : 'default'}
                            size={14}
                          />
                          <span>
                            {todo.agentStatus === 'completed'
                              ? 'Dossier Ready'
                              : todo.agentStatus === 'awaiting_approval'
                              ? 'Needs Approval'
                              : 'Researching...'}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {/* NOTES */}
        {isNotes &&
          notes.map((note) => {
            const isSelected = selectedId === note.id;
            return (
              <div
                key={note.id}
                onClick={() => onSelect(note.id, 'note')}
                className={`p-3.5 transition-all cursor-pointer relative group text-left ${
                  isSelected
                    ? 'bg-[#fff3e7] border-l-4 border-l-[#030302]'
                    : 'bg-[#ffffff] hover:bg-[#f7f7f7]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-xs font-semibold text-[#030302] truncate">
                    {note.title}
                  </h3>
                  {note.isPinned && (
                    <Pin className="w-3 h-3 text-[#fde99b] fill-[#fde99b] flex-shrink-0" />
                  )}
                </div>

                <p className="text-[11px] text-[#bebbba] line-clamp-2 leading-relaxed">
                  {note.content.replace(/^#+\s+/gm, '')}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-1">
                  {note.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.2 rounded-full bg-[#efefef] text-[#41413f]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
