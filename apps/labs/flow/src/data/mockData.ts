import {
  IngestionThread,
  TodoItem,
  NoteItem,
  ApprovalRequest,
  AgentNotification,
  BoardPile,
} from '../types';
import backupData from './tack_backup.json';

export const INITIAL_THREADS: IngestionThread[] = (backupData.flow_threads_v3 || []) as unknown as IngestionThread[];
export const INITIAL_TODOS: TodoItem[] = (backupData.flow_todos_v3 || []) as unknown as TodoItem[];
export const INITIAL_NOTES: NoteItem[] = (backupData.flow_notes_v3 || []) as unknown as NoteItem[];
export const INITIAL_PILES: BoardPile[] = (backupData.flow_piles_v3 || []) as unknown as BoardPile[];
export const INITIAL_APPROVALS: ApprovalRequest[] = (backupData.flow_approvals_v3 || []) as unknown as ApprovalRequest[];
export const INITIAL_NOTIFICATIONS: AgentNotification[] = (backupData.flow_notifications_v3 || []) as unknown as AgentNotification[];
