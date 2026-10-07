import React from 'react';
import {
  Inbox,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  Bot,
  AlertTriangle,
  FileText,
  Pin,
  Sparkles,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { ViewCategory, SourceProvider } from '../types';
import { ArcBadge } from './arc/ArcBadge';

interface SidebarProps {
  activeView: ViewCategory;
  onSelectView: (view: ViewCategory) => void;
  counts: {
    gmailUnread: number;
    todayTasks: number;
    approvalsPending: number;
    agentTasks: number;
    notesCount: number;
  };
  syncStatus: {
    mode: 'initial_2days' | 'incremental_1day';
    lastSynced: string;
  };
  onTriggerSync: () => void;
  onQuickNewTodo: () => void;
  onQuickNewNote: () => void;
  userEmail?: string | null;
  onOpenGmailModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  counts,
  syncStatus,
  onTriggerSync,
  onQuickNewTodo,
  onQuickNewNote,
  userEmail,
  onOpenGmailModal,
}) => {
  const isInboxActive = (provider: SourceProvider) =>
    activeView.type === 'inbox' && activeView.provider === provider;

  const isActionActive = (view: string) =>
    activeView.type === 'action' && activeView.view === view;

  const isNotesActive = (view: string) =>
    activeView.type === 'notes' && activeView.view === view;

  return (
    <aside className="w-64 flex flex-col h-full bg-[#f7f7f7] border-r border-[#e1e1e1] font-ui select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#e1e1e1] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#030302] text-[#ffffff] flex items-center justify-center font-editorial text-lg shadow-sm">
            T
          </div>
          <div>
            <h1 className="font-editorial text-lg font-medium text-[#030302] tracking-tight">
              Tack
            </h1>
            <p className="text-[10px] text-[#41413f] font-mono tracking-wider uppercase">
              Spatial Corkboard
            </p>
          </div>
        </div>

        <button
          onClick={onTriggerSync}
          title={
            syncStatus.mode === 'initial_2days'
              ? 'First connect: Fetched last 2 days. Click to trigger 1-day incremental sync.'
              : 'Incremental sync: Fetched last 1 day. Click to refresh.'
          }
          className="p-1.5 rounded-full hover:bg-[#efefef] text-[#41413f] hover:text-[#030302] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Sync Window Badge */}
      <div className="px-4 py-2 bg-[#fff3e7] border-b border-[#e1e1e1] flex items-center justify-between text-[11px]">
        <span className="flex items-center gap-1.5 text-[#41413f]">
          <span className="w-2 h-2 rounded-full bg-[#9bd8a9] animate-pulse" />
          {syncStatus.mode === 'initial_2days' ? 'Initial (2 Days)' : 'Delta (1 Day)'}
        </span>
        <span className="text-[#bebbba] text-[10px]">{syncStatus.lastSynced}</span>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        {/* INBOXES */}
        <div>
          <div className="px-2 pb-1.5 flex items-center justify-between text-[11px] font-mono text-[#bebbba] tracking-wider uppercase">
            <span>Inboxes</span>
            <Inbox className="w-3 h-3" />
          </div>

          <nav className="space-y-0.5">
            <button
              onClick={() => onSelectView({ type: 'inbox', provider: 'gmail' })}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                isInboxActive('gmail')
                  ? 'bg-[#ffffff] text-[#030302] shadow-sm font-semibold'
                  : 'text-[#41413f] hover:bg-[#efefef] hover:text-[#030302]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#ff4500]" />
                <span>Gmail</span>
              </span>
              {counts.gmailUnread > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#fde99b] text-[#554400]">
                  {counts.gmailUnread}
                </span>
              )}
            </button>

            {/* Gmail Connection Status Row */}
            {onOpenGmailModal && (
              <button
                type="button"
                onClick={onOpenGmailModal}
                className="w-full text-left px-2.5 py-1 text-[10px] rounded-lg text-[#41413f] hover:bg-[#efefef] flex items-center justify-between transition-colors font-mono"
              >
                <span className="flex items-center gap-1.5 truncate">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      userEmail ? 'bg-[#9bd8a9]' : 'bg-[#fde99b]'
                    }`}
                  />
                  <span className="truncate">{userEmail ? userEmail : 'Demo Mode (Connect)'}</span>
                </span>
                <span className="text-[#0087ff] flex-shrink-0 underline">
                  {userEmail ? 'Manage' : 'Setup'}
                </span>
              </button>
            )}
          </nav>
        </div>

        {/* ACTIONS */}
        <div>
          <div className="px-2 pb-1.5 flex items-center justify-between text-[11px] font-mono text-[#bebbba] tracking-wider uppercase">
            <span>Actions & Todos</span>
            <CheckCircle2 className="w-3 h-3" />
          </div>

          <nav className="space-y-0.5">
            <button
              onClick={() => onSelectView({ type: 'action', view: 'today' })}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                isActionActive('today')
                  ? 'bg-[#ffffff] text-[#030302] shadow-sm font-semibold'
                  : 'text-[#41413f] hover:bg-[#efefef] hover:text-[#030302]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#9bd8a9]" />
                <span>Today</span>
              </span>
              {counts.todayTasks > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#9bd8a9]/40 text-[#194425]">
                  {counts.todayTasks}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectView({ type: 'action', view: 'upcoming' })}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                isActionActive('upcoming')
                  ? 'bg-[#ffffff] text-[#030302] shadow-sm font-semibold'
                  : 'text-[#41413f] hover:bg-[#efefef] hover:text-[#030302]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#b8caf5]" />
                <span>Upcoming</span>
              </span>
            </button>

            <button
              onClick={() => onSelectView({ type: 'action', view: 'agent' })}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                isActionActive('agent')
                  ? 'bg-[#ffffff] text-[#030302] shadow-sm font-semibold'
                  : 'text-[#41413f] hover:bg-[#efefef] hover:text-[#030302]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-[#b8caf5]" />
                <span>Agent Queue</span>
              </span>
              {counts.agentTasks > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#b8caf5]/50 text-[#1b2b5a]">
                  {counts.agentTasks}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectView({ type: 'action', view: 'approvals' })}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                isActionActive('approvals')
                  ? 'bg-[#ffffff] text-[#030302] shadow-sm font-semibold'
                  : 'text-[#41413f] hover:bg-[#efefef] hover:text-[#030302]'
              }`}
            >
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-[#ff4500]" />
                <span>Approvals</span>
              </span>
              {counts.approvalsPending > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#ff4500] text-[#ffffff] font-bold">
                  {counts.approvalsPending}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* NOTES */}
        <div>
          <div className="px-2 pb-1.5 flex items-center justify-between text-[11px] font-mono text-[#bebbba] tracking-wider uppercase">
            <span>Notes & Scratchpad</span>
            <FileText className="w-3 h-3" />
          </div>

          <nav className="space-y-0.5">
            <button
              onClick={() => onSelectView({ type: 'notes', view: 'all' })}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                isNotesActive('all')
                  ? 'bg-[#ffffff] text-[#030302] shadow-sm font-semibold'
                  : 'text-[#41413f] hover:bg-[#efefef] hover:text-[#030302]'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#41413f]" />
                <span>All Notes</span>
              </span>
              <span className="text-[10px] font-mono text-[#bebbba]">{counts.notesCount}</span>
            </button>

            <button
              onClick={() => onSelectView({ type: 'notes', view: 'scratchpad' })}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                isNotesActive('scratchpad')
                  ? 'bg-[#ffffff] text-[#030302] shadow-sm font-semibold'
                  : 'text-[#41413f] hover:bg-[#efefef] hover:text-[#030302]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Pin className="w-3.5 h-3.5 text-[#fde99b]" />
                <span>Scratchpad</span>
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Quick Add Bar */}
      <div className="p-3 border-t border-[#e1e1e1] flex items-center gap-2">
        <button
          onClick={onQuickNewTodo}
          className="flex-1 px-3 py-1.5 rounded-full text-xs font-medium bg-[#ffffff] border border-[#e1e1e1] hover:bg-[#efefef] text-[#030302] flex items-center justify-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Task</span>
        </button>

        <button
          onClick={onQuickNewNote}
          className="p-1.5 rounded-full bg-[#ffffff] border border-[#e1e1e1] hover:bg-[#efefef] text-[#030302] shadow-sm transition-all"
          title="New Note"
        >
          <FileText className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
