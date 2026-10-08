export type Priority = 1 | 2 | 3 | 4; // 1 = Urgent, 4 = Low

export type TaskStatus = 'inbox' | 'today' | 'upcoming' | 'completed' | 'archived';

export type AgentStatus = 'idle' | 'queued' | 'in_progress' | 'completed' | 'awaiting_approval' | 'failed';

export type SourceProvider = 'gmail';

export interface BoardPosition {
  x: number;
  y: number;
  rotation?: number;
  isPinned?: boolean;
  pileId?: string;
}

export interface BoardPile {
  id: string;
  title: string;
  color?: string;
  itemIds: string[];
  position: { x: number; y: number };
}

export interface SourceReference {
  provider: SourceProvider;
  externalId: string;
  title: string;
  author: string;
  authorEmail?: string;
  snippet: string;
  permalink: string;
  timestamp: string;
}

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string | null; // YYYY-MM-DD
  tags: string[];
  color?: string;
  source?: SourceReference;
  assignedTo: 'user' | 'agent' | 'collaborative';
  agentStatus: AgentStatus;
  agentAvatar?: 'clover' | 'star' | 'ghost' | 'mech' | 'flower' | 'circle';
  agentNotes?: string;
  agentArtifacts?: string[];
  agentErrorReason?: string;
  agentRetryAt?: string;
  approvalId?: string;
  position?: BoardPosition;
  createdAt: string;
  updatedAt: string;
  completedAt?: string | null;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  linkedSources: SourceReference[];
  aiSummary?: string;
  position?: BoardPosition;
  createdAt: string;
  updatedAt: string;
}

export interface IngestionThread {
  id: string;
  provider: SourceProvider;
  threadId: string;
  subject: string;
  sender: string;
  senderEmail: string;
  snippet: string;
  body: string;
  timestamp: string;
  unread: boolean;
  triaged: boolean;
  isStarred: boolean;
  attachmentsCount: number;
  linkedTaskId?: string;
  linkedNoteId?: string;
  position?: BoardPosition;
}

export interface ApprovalRequest {
  id: string;
  taskId: string;
  taskTitle: string;
  actionType: 'send_email' | 'delete_item' | 'schedule_event' | 'external_call';
  summary: string;
  previewPayload: {
    recipient?: string;
    subject?: string;
    content?: string;
    details?: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  respondedAt?: string;
}

export interface AgentNotification {
  id: string;
  type: 'pickup' | 'completed' | 'approval_required' | 'sync' | 'overloaded';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  taskId?: string;
  approvalId?: string;
}

export type ViewCategory =
  | { type: 'inbox'; provider: SourceProvider }
  | { type: 'action'; view: 'today' | 'upcoming' | 'triage' | 'agent' | 'approvals' | 'done' }
  | { type: 'notes'; view: 'all' | 'pinned' | 'scratchpad' };

export type BoardViewMode = 'corkboard' | 'stream';

export interface ArchivedItem {
  id: string;
  type: 'thread' | 'todo' | 'note';
  title: string;
  sender?: string;
  senderEmail?: string;
  snippet?: string;
  body?: string;
  content?: string;
  tags?: string[];
  priority?: Priority;
  dueDate?: string | null;
  archivedAt: string;
  originalPosition?: BoardPosition;
  sourceThread?: IngestionThread;
  sourceTodo?: TodoItem;
  sourceNote?: NoteItem;
}
