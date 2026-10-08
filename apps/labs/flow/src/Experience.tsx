import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  INITIAL_THREADS,
  INITIAL_TODOS,
  INITIAL_NOTES,
  INITIAL_APPROVALS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PILES,
} from './data/mockData';
import {
  IngestionThread,
  TodoItem,
  NoteItem,
  ApprovalRequest,
  AgentNotification,
  BoardPile,
  ArchivedItem,
} from './types';
import { NotificationToast } from './components/NotificationToast';
import { CorkboardCanvas } from './components/corkboard/CorkboardCanvas';
import { CardInspectorModal } from './components/corkboard/CardInspectorModal';
import { BinInspectionModal } from './components/corkboard/BinInspectionModal';
import { POSTIT_COLORS } from './components/toolbar/FigmaBottomToolbar';
import { GmailConnectModal } from './components/GmailConnectModal';
import {
  GmailSyncResult,
  getCachedAccessToken,
  syncGmailInbox,
  getGoogleClientId,
  authenticateGmail,
  fetchGmailProfile,
} from './lib/gmailService';
import { executeAgentWorkflow, ModelsOverloadedError } from './lib/agentService';
import { Bot, Bell, RefreshCw, Mail } from 'lucide-react';
import './styles/craftTheme.css';

export const FlowExperience: React.FC = () => {
  // Data State - Clean out sample mock threads/todos so only real synced content appears
  const [threads, setThreads] = useState<IngestionThread[]>(() => {
    const saved = localStorage.getItem('flow_threads_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter((t: IngestionThread) => !t.id.startsWith('thread-0'));
      } catch {
        return [];
      }
    }
    return INITIAL_THREADS;
  });

  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem('flow_todos_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter((td: TodoItem) => !td.id.startsWith('todo-0'));
      } catch {
        return [];
      }
    }
    return INITIAL_TODOS;
  });

  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem('flow_notes_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter((n: NoteItem) => !n.id.startsWith('note-0'));
      } catch {
        return [];
      }
    }
    return INITIAL_NOTES;
  });

  const [piles, setPiles] = useState<BoardPile[]>(() => {
    const saved = localStorage.getItem('flow_piles_v3');
    return saved ? JSON.parse(saved) : INITIAL_PILES;
  });

  const [approvals, setApprovals] = useState<ApprovalRequest[]>(() => {
    const saved = localStorage.getItem('flow_approvals_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter((a: ApprovalRequest) => !a.id.startsWith('approval-0'));
      } catch {
        return [];
      }
    }
    return INITIAL_APPROVALS;
  });

  const [notifications, setNotifications] = useState<AgentNotification[]>(() => {
    const saved = localStorage.getItem('flow_notifications_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter((n: AgentNotification) => !n.id.startsWith('notif-0'));
      } catch {
        return [];
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Bin & Archived Items State
  const [archivedItems, setArchivedItems] = useState<ArchivedItem[]>(() => {
    const saved = localStorage.getItem('flow_archived_items_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [isBinOpen, setIsBinOpen] = useState(false);

  // Canvas UI State
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'thread' | 'todo' | 'note' | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isGmailModalOpen, setIsGmailModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(() => localStorage.getItem('flow_gmail_user_email'));

  // Sync Window state: 2-day initial connect vs 1-day incremental
  const [syncStatus, setSyncStatus] = useState<{
    mode: 'initial_2days' | 'incremental_1day';
    lastSynced: string;
  }>({
    mode: 'initial_2days',
    lastSynced: 'Synced 5m ago',
  });

  // Registry of in-flight AbortControllers for active agent tasks
  const activeAgentControllersRef = useRef<Map<string, AbortController>>(new Map());

  // Persist state
  useEffect(() => {
    localStorage.setItem('flow_threads_v3', JSON.stringify(threads));
    localStorage.setItem('flow_todos_v3', JSON.stringify(todos));
    localStorage.setItem('flow_notes_v3', JSON.stringify(notes));
    localStorage.setItem('flow_piles_v3', JSON.stringify(piles));
    localStorage.setItem('flow_approvals_v3', JSON.stringify(approvals));
    localStorage.setItem('flow_notifications_v3', JSON.stringify(notifications));
    localStorage.setItem('flow_archived_items_v3', JSON.stringify(archivedItems));
  }, [threads, todos, notes, piles, approvals, notifications, archivedItems]);

  // Push notification helper
  const pushNotification = useCallback(
    (
      type: AgentNotification['type'],
      title: string,
      message: string,
      extra?: { taskId?: string; approvalId?: string }
    ) => {
      const newNotif: AgentNotification = {
        id: `notif-${Date.now()}`,
        type,
        title,
        message,
        timestamp: 'Just now',
        read: false,
        ...extra,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    },
    []
  );

  // Handle Sync Complete from Gmail Modal
  const handleSyncComplete = (result: GmailSyncResult) => {
    if (result.threads.length > 0) {
      setThreads((prev) => {
        const existingIds = new Set(result.threads.map((t) => t.id));
        const filteredPrev = prev.filter((p) => !existingIds.has(p.id));
        return [...result.threads, ...filteredPrev];
      });
    }

    setSyncStatus({
      mode: result.mode,
      lastSynced: 'Just now',
    });

    const storedEmail = localStorage.getItem('flow_gmail_user_email');
    if (storedEmail) setUserEmail(storedEmail);

    pushNotification(
      'sync',
      'Gmail Inbox Synced',
      `Ingested ${result.count} threads from your Gmail inbox.`
    );
  };

  const handleGmailDisconnect = () => {
    setUserEmail(null);
    setThreads([]);
    setSyncStatus({
      mode: 'initial_2days',
      lastSynced: 'Disconnected',
    });
    pushNotification('completed', 'Gmail Disconnected', 'Logged out of Google account.');
  };

  const handleLoadDemoData = () => {
    setThreads([]);
    setTodos([]);
    setNotes([]);
    setPiles([]);
    localStorage.removeItem('flow_threads_v3');
    localStorage.removeItem('flow_todos_v3');
    localStorage.removeItem('flow_notes_v3');
    pushNotification('completed', 'Board Cleared', 'Board reset to a clean workspace.');
  };

  // Sync handler (1-day incremental or modal prompt)
  const handleTriggerSync = async () => {
    const token = getCachedAccessToken();
    if (!userEmail || !token) {
      setIsGmailModalOpen(true);
      return;
    }

    try {
      pushNotification('sync', 'Syncing Gmail...', 'Fetching inbox updates for the last 1 day...');
      const result = await syncGmailInbox(token, false);
      handleSyncComplete(result);
    } catch (err: any) {
      setIsGmailModalOpen(true);
      pushNotification(
        'sync',
        'Gmail Sync Expired',
        err.message || 'Please reconnect your Google account to refresh your inbox.'
      );
    }
  };

  // 1-Click Connect Gmail: Directly triggers the Google OAuth popup window
  const handleConnectGmail = async () => {
    // If already connected, clicking executes an incremental 1-day delta sync
    if (userEmail) {
      handleTriggerSync();
      return;
    }

    const clientId = getGoogleClientId();
    if (!clientId) {
      // If no Client ID configured in .env or storage yet, open setup modal
      setIsGmailModalOpen(true);
      return;
    }

    try {
      pushNotification('sync', 'Opening Google Sign-In...', 'Please select your Google account in the popup.');
      const token = await authenticateGmail(clientId, true);
      const profile = await fetchGmailProfile(token);
      const syncResult = await syncGmailInbox(token, true);
      handleSyncComplete(syncResult);
    } catch (err: any) {
      const msg = err?.message || '';
      if (!msg.includes('closed') && !msg.includes('popup_closed_by_user')) {
        setIsGmailModalOpen(true);
        pushNotification('sync', 'OAuth Sign-In Issue', msg || 'Failed to authenticate with Google.');
      }
    }
  };

  // Convert Thread -> Todo (T)
  const handleTriageToTodo = (thread: IngestionThread) => {
    const newTodo: TodoItem = {
      id: `todo-${Date.now()}`,
      title: thread.subject,
      description: thread.snippet,
      status: 'today',
      priority: 2,
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
      tags: ['Email-Action', thread.sender.split(' ')[0]],
      source: {
        provider: 'gmail',
        externalId: thread.threadId,
        title: thread.subject,
        author: thread.sender,
        authorEmail: thread.senderEmail,
        snippet: thread.snippet,
        permalink: `https://mail.google.com/mail/u/0/#inbox/${thread.threadId}`,
        timestamp: thread.timestamp,
      },
      assignedTo: 'user',
      agentStatus: 'idle',
      position: {
        x: 420 + Math.floor((Math.random() - 0.5) * 60),
        y: 120 + Math.floor((Math.random() - 0.5) * 60),
        rotation: (Math.random() - 0.5) * 4,
        isPinned: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setThreads((prev) =>
      prev.map((t) => (t.id === thread.id ? { ...t, triaged: true, unread: false } : t))
    );

    setSelectedId(newTodo.id);
    setSelectedType('todo');
  };

  // Convert Thread -> Note (N)
  const handleTriageToNote = (thread: IngestionThread) => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: thread.subject,
      content: `# ${thread.subject}\n\n**From:** ${thread.sender} (${thread.senderEmail})\n**Date:** ${thread.timestamp}\n\n## Content\n${thread.body}`,
      tags: ['Email-Capture'],
      isPinned: false,
      linkedSources: [
        {
          provider: 'gmail',
          externalId: thread.threadId,
          title: thread.subject,
          author: thread.sender,
          authorEmail: thread.senderEmail,
          snippet: thread.snippet,
          permalink: `https://mail.google.com/mail/u/0/#inbox/${thread.threadId}`,
          timestamp: thread.timestamp,
        },
      ],
      position: {
        x: 950 + Math.floor((Math.random() - 0.5) * 60),
        y: 120 + Math.floor((Math.random() - 0.5) * 60),
        rotation: (Math.random() - 0.5) * 4,
        isPinned: false,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id);
    setSelectedType('note');
  };

  // Archive Thread (E)
  const handleArchiveThread = (id: string) => {
    const target = threads.find((t) => t.id === id);
    if (target) {
      const archived: ArchivedItem = {
        id: target.id,
        type: 'thread',
        title: target.subject,
        sender: target.sender,
        senderEmail: target.senderEmail,
        snippet: target.snippet,
        body: target.body,
        archivedAt: 'Just now',
        originalPosition: target.position,
        sourceThread: target,
      };
      setArchivedItems((prev) => [archived, ...prev.filter((a) => a.id !== id)]);
    }

    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, triaged: true, unread: false } : t))
    );
    if (selectedId === id) {
      setSelectedId(null);
      setSelectedType(null);
    }
  };

  // Archive Todo
  const handleArchiveTodo = (id: string) => {
    // Abort in-flight task if delegated to agent
    const activeCtrl = activeAgentControllersRef.current.get(id);
    if (activeCtrl) {
      activeCtrl.abort();
      activeAgentControllersRef.current.delete(id);
    }

    const target = todos.find((t) => t.id === id);
    if (target) {
      const archived: ArchivedItem = {
        id: target.id,
        type: 'todo',
        title: target.title,
        snippet: target.description,
        body: target.description,
        tags: target.tags,
        priority: target.priority,
        dueDate: target.dueDate,
        archivedAt: 'Just now',
        originalPosition: target.position,
        sourceTodo: target,
      };
      setArchivedItems((prev) => [archived, ...prev.filter((a) => a.id !== id)]);
    }

    setTodos((prev) =>
      prev.map((td) =>
        td.id === id ? { ...td, status: 'completed', completedAt: new Date().toISOString() } : td
      )
    );
    if (selectedId === id) {
      setSelectedId(null);
      setSelectedType(null);
    }
  };

  // Archive Note
  const handleArchiveNote = (id: string) => {
    const target = notes.find((n) => n.id === id);
    if (target) {
      const archived: ArchivedItem = {
        id: target.id,
        type: 'note',
        title: target.title,
        snippet: target.content.slice(0, 100),
        body: target.content,
        tags: target.tags,
        archivedAt: 'Just now',
        originalPosition: target.position,
        sourceNote: target,
      };
      setArchivedItems((prev) => [archived, ...prev.filter((a) => a.id !== id)]);
    }

    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
      setSelectedType(null);
    }
  };

  // Restore item from Wastebasket back to corkboard
  const handleRestoreItem = (item: ArchivedItem) => {
    setArchivedItems((prev) => prev.filter((a) => a.id !== item.id));

    if (item.type === 'thread') {
      if (item.sourceThread) {
        setThreads((prev) => {
          const exists = prev.some((t) => t.id === item.id);
          if (exists) {
            return prev.map((t) => (t.id === item.id ? { ...t, triaged: false } : t));
          }
          return [{ ...item.sourceThread!, triaged: false }, ...prev];
        });
      } else {
        setThreads((prev) =>
          prev.map((t) => (t.id === item.id ? { ...t, triaged: false } : t))
        );
      }
    } else if (item.type === 'todo') {
      if (item.sourceTodo) {
        setTodos((prev) => {
          const exists = prev.some((td) => td.id === item.id);
          if (exists) {
            return prev.map((td) => (td.id === item.id ? { ...td, status: 'today' } : td));
          }
          return [{ ...item.sourceTodo!, status: 'today' }, ...prev];
        });
      } else {
        setTodos((prev) =>
          prev.map((td) => (td.id === item.id ? { ...td, status: 'today' } : td))
        );
      }
    } else if (item.type === 'note') {
      if (item.sourceNote) {
        setNotes((prev) => [item.sourceNote!, ...prev.filter((n) => n.id !== item.id)]);
      }
    }
    pushNotification('completed', 'Note Restored', `Restored "${item.title}" back to corkboard.`);
  };

  const handleRestoreAll = () => {
    archivedItems.forEach((item) => handleRestoreItem(item));
    setArchivedItems([]);
    setIsBinOpen(false);
  };

  const handleEmptyBin = () => {
    setArchivedItems([]);
    setIsBinOpen(false);
    pushNotification('completed', 'Wastebasket Emptied', 'Permanently cleared discarded notes.');
  };

  const handleDeletePermanently = (id: string) => {
    setArchivedItems((prev) => prev.filter((a) => a.id !== id));
  };

  // Toggle Todo completion
  const handleToggleTodoStatus = (id: string) => {
    setTodos((prev) =>
      prev.map((td) => {
        if (td.id === id) {
          const nextStatus = td.status === 'completed' ? 'today' : 'completed';
          return {
            ...td,
            status: nextStatus,
            completedAt: nextStatus === 'completed' ? new Date().toISOString() : null,
          };
        }
        return td;
      })
    );
  };

  // Toggle Pin on Note/Todo
  const handleToggleTodoPin = (id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              position: {
                ...t.position!,
                isPinned: !(t.position?.isPinned ?? true),
              },
            }
          : t
      )
    );
  };

  // Toggle Pin on Note
  const handleToggleNotePin = (id: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              position: {
                ...n.position!,
                isPinned: !(n.position?.isPinned ?? false),
              },
            }
          : n
      )
    );
  };

  // Toggle Pin on Thread
  const handleToggleThreadPin = (id: string) => {
    setThreads((prev) =>
      prev.map((th) =>
        th.id === id
          ? {
              ...th,
              position: {
                ...th.position!,
                isPinned: !(th.position?.isPinned ?? true),
              },
            }
          : th
      )
    );
  };

  // Delegate Todo to AI Assistant (Notification & Live Research Execution)
  const handleDelegateTodoToAgent = async (todoId: string, initialTodo?: TodoItem) => {
    const target = initialTodo || todos.find((t) => t.id === todoId);
    if (!target) return;

    // Abort any prior in-flight workflow for this task
    const existingCtrl = activeAgentControllersRef.current.get(todoId);
    if (existingCtrl) {
      existingCtrl.abort();
      activeAgentControllersRef.current.delete(todoId);
    }

    const controller = new AbortController();
    activeAgentControllersRef.current.set(todoId, controller);

    // 1. Mark task in progress with Assistant
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId
          ? {
              ...t,
              assignedTo: 'agent',
              agentStatus: 'in_progress',
              agentNotes: 'Assistant reviewing context & briefing details...',
            }
          : t
      )
    );

    // 2. DISPATCH INSTANT NOTIFICATION
    pushNotification(
      'pickup',
      '🤖 Assistant Picked Up Task',
      `Assistant started working on: "${target.title}"`,
      { taskId: todoId }
    );

    // 3. Execute agentic research / drafting engine
    try {
      const deliverable = await executeAgentWorkflow(
        {
          id: target.id,
          title: target.title,
          description: target.description,
          tags: target.tags,
          source: target.source,
        },
        (progressText) => {
          if (controller.signal.aborted) return;
          setTodos((prev) =>
            prev.map((t) => (t.id === todoId ? { ...t, agentNotes: progressText } : t))
          );
        },
        { signal: controller.signal }
      );

      if (controller.signal.aborted) return;
      activeAgentControllersRef.current.delete(todoId);

      if (deliverable.requiresApproval && deliverable.draftEmail) {
        // Tier 2 High-Stakes Action: Register approval request
        const approvalId = `approval-${Date.now()}`;
        const newApproval: ApprovalRequest = {
          id: approvalId,
          taskId: todoId,
          taskTitle: target.title,
          actionType: 'send_email',
          summary:
            deliverable.approvalSummary ||
            `Send outbound email response to ${deliverable.draftEmail.recipient} regarding "${target.title}"`,
          previewPayload: {
            recipient: deliverable.draftEmail.recipient || target.source?.authorEmail || 'contact@client.com',
            subject: deliverable.draftEmail.subject || `Re: ${target.title}`,
            content: deliverable.draftEmail.body,
          },
          status: 'pending',
          createdAt: new Date().toISOString(),
        };

        setApprovals((prev) => [newApproval, ...prev]);
        setTodos((prev) =>
          prev.map((t) =>
            t.id === todoId
              ? {
                  ...t,
                  agentStatus: 'awaiting_approval',
                  approvalId,
                  agentNotes: deliverable.summary,
                  agentArtifacts: [deliverable.markdownReport],
                }
              : t
          )
        );

        pushNotification(
          'approval_required',
          '⚠️ Approval Required',
          `Assistant requires sign-off to send email for: "${target.title}"`,
          { taskId: todoId, approvalId }
        );
      } else {
        // Tier 1 Safe Autonomous Deliverable: Research or Plan completed
        setTodos((prev) =>
          prev.map((t) =>
            t.id === todoId
              ? {
                  ...t,
                  agentStatus: 'completed',
                  agentNotes: deliverable.summary,
                  agentArtifacts: [deliverable.markdownReport],
                }
              : t
          )
        );

        pushNotification(
          'completed',
          '🤖 Assistant Finished Research',
          `Deliverables ready for: "${target.title}"`,
          { taskId: todoId }
        );
      }
    } catch (err: any) {
      activeAgentControllersRef.current.delete(todoId);
      // Suppress error toast if user aborted intentionally (e.g., dragged note away from AI area)
      if (controller.signal.aborted || err?.name === 'AbortError') {
        return;
      }

      console.error('Agent execution error:', err);
      const isBusy =
        err instanceof ModelsOverloadedError ||
        err?.code === 'MODELS_BUSY' ||
        err?.message?.includes('capacity') ||
        err?.message?.includes('503') ||
        err?.message?.includes('busy') ||
        err?.message?.includes('overload');
      const errorMsg = isBusy
        ? 'All candidate models are at capacity right now.'
        : (err?.message || 'Assistant encountered an error executing research.');

      setTodos((prev) =>
        prev.map((t) =>
          t.id === todoId
            ? {
                ...t,
                agentStatus: 'failed',
                agentErrorReason: errorMsg,
                agentNotes: errorMsg,
              }
            : t
        )
      );

      pushNotification(
        'overloaded',
        'Models at Capacity',
        `Assistant could not finish "${target.title}". Models are resting.`,
        { taskId: todoId }
      );
    }
  };

  // Retry Assistant Execution on a Failed / Overloaded Task
  const handleRetryAgent = (todoId: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId
          ? {
              ...t,
              agentStatus: 'in_progress',
              agentRetryAt: undefined,
              agentErrorReason: undefined,
              agentNotes: 'Assistant reconnecting to candidate models...',
            }
          : t
      )
    );
    handleDelegateTodoToAgent(todoId);
  };

  // Schedule a Future Retry (e.g. 5 minutes)
  const handleScheduleRetry = (todoId: string, seconds: number = 300) => {
    const retryAt = new Date(Date.now() + seconds * 1000).toISOString();
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId
          ? {
              ...t,
              agentRetryAt: retryAt,
            }
          : t
      )
    );
    pushNotification(
      'sync',
      'Retry Scheduled',
      `Assistant will retry in ${Math.round(seconds / 60)} minutes.`
    );
  };

  // Cancel Scheduled Retry Countdown
  const handleCancelCountdown = (todoId: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId
          ? {
              ...t,
              agentRetryAt: undefined,
            }
          : t
      )
    );
  };

  // Automatic retry ticker for tasks scheduled with agentRetryAt
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      todos.forEach((t) => {
        if (t.assignedTo === 'agent' && t.agentStatus === 'failed' && t.agentRetryAt) {
          const retryTime = new Date(t.agentRetryAt).getTime();
          if (now >= retryTime) {
            handleRetryAgent(t.id);
          }
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [todos]);

  // Delegate Thread to AI Assistant
  const handleDelegateThreadToAgent = (threadId: string) => {
    const thread = threads.find((t) => t.id === threadId);
    if (!thread) return;

    const newTodoId = `todo-${Date.now()}`;
    const newTodo: TodoItem = {
      id: newTodoId,
      title: thread.subject,
      description: thread.snippet,
      status: 'today',
      priority: 2,
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
      tags: ['Email-Action', thread.sender.split(' ')[0]],
      source: {
        provider: 'gmail',
        externalId: thread.threadId,
        title: thread.subject,
        author: thread.sender,
        authorEmail: thread.senderEmail,
        snippet: thread.snippet,
        permalink: `https://mail.google.com/mail/u/0/#inbox/${thread.threadId}`,
        timestamp: thread.timestamp,
      },
      assignedTo: 'agent',
      agentStatus: 'in_progress',
      agentNotes: 'Assistant drafting context-aware response...',
      position: {
        x: 420 + Math.floor((Math.random() - 0.5) * 60),
        y: 120 + Math.floor((Math.random() - 0.5) * 60),
        rotation: (Math.random() - 0.5) * 4,
        isPinned: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, triaged: true, unread: false } : t))
    );

    handleDelegateTodoToAgent(newTodoId, newTodo);
  };

  // Delegate Note to AI Assistant
  const handleDelegateNoteToAgent = (noteId: string) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    const newTodoId = `todo-${Date.now()}`;
    const newTodo: TodoItem = {
      id: newTodoId,
      title: note.title,
      description: note.content,
      status: 'today',
      priority: 2,
      dueDate: new Date().toISOString().slice(0, 10),
      tags: [...(note.tags || []), 'Note-Delegated'],
      assignedTo: 'agent',
      agentStatus: 'in_progress',
      agentNotes: 'Assistant researching note contents...',
      position: {
        x: 420 + Math.floor((Math.random() - 0.5) * 60),
        y: 120 + Math.floor((Math.random() - 0.5) * 60),
        rotation: (Math.random() - 0.5) * 4,
        isPinned: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    handleDelegateTodoToAgent(newTodoId, newTodo);
  };

  // Pin Completed Research Dossier as Scratch Note to corkboard
  const handlePinDossierAsNote = (todo: TodoItem) => {
    const report = todo.agentArtifacts?.[0] || todo.agentNotes || '';
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: `Briefing: ${todo.title}`,
      content: report,
      tags: ['Dossier', 'Assistant'],
      isPinned: true,
      linkedSources: todo.source ? [todo.source] : [],
      position: {
        x: 950 + Math.floor((Math.random() - 0.5) * 40),
        y: 180 + Math.floor((Math.random() - 0.5) * 40),
        rotation: (Math.random() - 0.5) * 4,
        isPinned: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    pushNotification('completed', 'Dossier Pinned', `Saved briefing as a permanent note on corkboard.`);
  };

  // Reclaim Todo from Assistant (when user drags note back to working board or reverts)
  const handleRevertTodoFromAgent = (todoId: string) => {
    // Immediately abort any in-flight agent workflow for this task
    const activeCtrl = activeAgentControllersRef.current.get(todoId);
    if (activeCtrl) {
      activeCtrl.abort();
      activeAgentControllersRef.current.delete(todoId);
    }

    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId
          ? {
              ...t,
              assignedTo: 'user',
              agentStatus: 'idle',
              agentNotes: undefined,
              agentErrorReason: undefined,
              agentRetryAt: undefined,
            }
          : t
      )
    );
    // Cancel any pending approvals associated with this task
    setApprovals((prev) => prev.filter((a) => a.taskId !== todoId));
    pushNotification('sync', 'Task Reclaimed', 'Note returned to manual working board.');
  };

  // Simulate High-Stakes Action & Request Approval
  const handleRequestApproval = (todoId: string) => {
    const target = todos.find((t) => t.id === todoId);
    if (!target) return;

    const approvalId = `approval-${Date.now()}`;
    const newApproval: ApprovalRequest = {
      id: approvalId,
      taskId: todoId,
      taskTitle: target.title,
      actionType: 'send_email',
      summary: `Send outbound email response for "${target.title}"`,
      previewPayload: {
        recipient: target.source?.authorEmail || 'contact@client.com',
        subject: `Re: ${target.title}`,
        content: `Hi,\n\nI have reviewed the details for "${target.title}" and we are all set to proceed.\n\nBest regards,\nSumit`,
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setApprovals((prev) => [newApproval, ...prev]);
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId ? { ...t, agentStatus: 'awaiting_approval', approvalId } : t
      )
    );

    pushNotification(
      'approval_required',
      '⚠️ Approval Required',
      `Agent requires approval to send email for: "${target.title}"`,
      { taskId: todoId, approvalId }
    );
  };

  // Approve action
  const handleApprove = (approvalId: string) => {
    const target = approvals.find((a) => a.id === approvalId);
    setApprovals((prev) => prev.filter((a) => a.id !== approvalId));

    if (target) {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === target.taskId
            ? {
                ...t,
                status: 'today',
                agentStatus: 'completed',
                agentNotes: 'Action approved by user and executed successfully via API.',
              }
            : t
        )
      );
    }

    pushNotification('completed', 'Action Approved & Executed', 'Email sent successfully via Gmail API.');
  };

  // Reject action
  const handleReject = (approvalId: string) => {
    const target = approvals.find((a) => a.id === approvalId);
    setApprovals((prev) => prev.filter((a) => a.id !== approvalId));

    if (target) {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === target.taskId
            ? {
                ...t,
                agentStatus: 'idle',
                agentNotes: 'Action rejected by user. Reverted to manual queue.',
              }
            : t
        )
      );
    }

    pushNotification('completed', 'Action Rejected', 'Agent action cancelled.');
  };

  // Active item references
  const activeThread = threads.find((t) => t.id === selectedId) || null;
  const activeTodo = todos.find((t) => t.id === selectedId) || null;
  const activeNote = notes.find((t) => t.id === selectedId) || null;

  // Add Todo at specific position from 3D Paper Drag Drop or Toolbar
  const handleAddTodoAtPosition = (pos: { x: number; y: number }, color?: string) => {
    let colorTag = 'Today';
    if (color) {
      const match = POSTIT_COLORS.find((c) => c.hex.toLowerCase() === color.toLowerCase());
      if (match) colorTag = match.name;
    }

    const newTodo: TodoItem = {
      id: `todo-${Date.now()}`,
      title: '',
      description: '',
      status: 'today',
      priority: 2,
      dueDate: new Date().toISOString().slice(0, 10),
      tags: [colorTag],
      color: color,
      assignedTo: 'user',
      agentStatus: 'idle',
      position: {
        x: pos.x,
        y: pos.y,
        rotation: (Math.random() - 0.5) * 5,
        isPinned: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setSelectedId(newTodo.id);
    setSelectedType('todo');
  };

  // Quick Add Note directly to Corkboard (Scratchpad)
  const handleQuickNewNote = () => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: 'Untitled Scratch Note',
      content: '# Untitled Scratch Note\n\nCapture spontaneous ideas, thoughts, or snippets here...',
      tags: ['Scratchpad'],
      isPinned: false,
      linkedSources: [],
      position: {
        x: 950 + Math.floor((Math.random() - 0.5) * 60),
        y: 160 + Math.floor((Math.random() - 0.5) * 60),
        rotation: (Math.random() - 0.5) * 6,
        isPinned: false,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id);
    setSelectedType('note');
    setIsInspectorOpen(true);
  };

  // Open Inspector Sheet for any item
  const handleOpenInspector = (id: string, type: 'thread' | 'todo' | 'note') => {
    setSelectedId(id);
    setSelectedType(type);
    setIsInspectorOpen(true);
  };

  return (
    <div className="relative w-full h-screen flex flex-col bg-[#fff3e7] text-[#030302] overflow-hidden font-ui">
      {/* Top Header Bar */}
      <header className="h-14 px-5 border-b border-[#e1e1e1] bg-[#ffffff]/90 backdrop-blur-md flex items-center justify-between select-none z-30">
        <div className="flex items-center gap-4">
          {/* Handwritten Corkboard Title */}
          <h1 className="font-handwriting text-3xl font-bold tracking-wide text-[#030302] select-none -rotate-1 cursor-default pr-2">
            Corkboard
          </h1>
        </div>

        {/* Board Overview Metrics */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-[#41413f]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4500]" />
            <span>Inbox:</span>
            <strong className="text-[#030302] font-semibold">
              {threads.filter((t) => !t.triaged).length}
            </strong>
          </span>
          <span className="text-[#e1e1e1]">|</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9bd8a9]" />
            <span>Today Focus:</span>
            <strong className="text-[#030302] font-semibold">
              {todos.filter((t) => t.status === 'today').length}
            </strong>
          </span>
          <span className="text-[#e1e1e1]">|</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8caf5]" />
            <span>Scratchpad:</span>
            <strong className="text-[#030302] font-semibold">{notes.length}</strong>
          </span>
        </div>

        {/* Global Controls & Status */}
        <div className="flex items-center gap-3">
          {/* Gmail Connection & Sync Status Button */}
          <div className="flex items-center bg-[#fff3e7] border border-[#e1e1e1] rounded-full p-0.5 shadow-xs">
            <button
              onClick={handleConnectGmail}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#030302] hover:bg-[#efefef] transition-colors cursor-pointer"
              title={
                userEmail
                  ? `Connected as ${userEmail}. Click to run 1-day incremental sync.`
                  : 'Click to open Google Sign-In popup directly'
              }
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  userEmail ? 'bg-[#9bd8a9]' : 'bg-[#fde99b]'
                } animate-pulse`}
              />
              <Mail className="w-3.5 h-3.5 text-[#ff4500]" />
              <span className="max-w-[130px] truncate font-medium">
                {userEmail ? userEmail : 'Connect Gmail'}
              </span>
              <span className="text-[10px] text-[#bebbba] border-l border-[#e1e1e1] pl-1.5 font-mono">
                {syncStatus.mode === 'initial_2days' ? '2-Days' : '1-Day'}
              </span>
            </button>

            <button
              onClick={() => setIsGmailModalOpen(true)}
              className="p-1.5 rounded-full hover:bg-[#efefef] text-[#bebbba] hover:text-[#030302] transition-colors cursor-pointer"
              title="Manage Gmail OAuth credentials or switch accounts"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Experience Body: Dedicated Living Physics Corkboard */}
      <div className="flex-1 relative overflow-hidden">
        <CorkboardCanvas
          threads={threads}
          todos={todos}
          notes={notes}
          piles={piles}
          selectedId={selectedId}
          onSelectItem={(id, type) => {
            setSelectedId(id);
            setSelectedType(type);
          }}
          onOpenInspector={handleOpenInspector}
          onTriageToTodo={handleTriageToTodo}
          onTriageToNote={handleTriageToNote}
          onArchiveThread={handleArchiveThread}
          onArchiveTodo={handleArchiveTodo}
          onArchiveNote={handleArchiveNote}
          onToggleTodoStatus={handleToggleTodoStatus}
          onToggleTodoPin={handleToggleTodoPin}
          onToggleThreadPin={handleToggleThreadPin}
          onToggleNotePin={handleToggleNotePin}
          onDelegateTodoToAgent={handleDelegateTodoToAgent}
          onRevertTodoFromAgent={handleRevertTodoFromAgent}
          onRetryAgent={handleRetryAgent}
          onScheduleRetry={handleScheduleRetry}
          onCancelCountdown={handleCancelCountdown}
          onUpdateThreadPosition={(id, pos) => {
            setThreads((prev) =>
              prev.map((t) => (t.id === id ? { ...t, position: { ...t.position!, ...pos } } : t))
            );
          }}
          onUpdateTodoPosition={(id, pos) => {
            setTodos((prev) =>
              prev.map((td) => (td.id === id ? { ...td, position: { ...td.position!, ...pos } } : td))
            );
          }}
          onUpdateNotePosition={(id, pos) => {
            setNotes((prev) =>
              prev.map((n) => (n.id === id ? { ...n, position: { ...n.position!, ...pos } } : n))
            );
          }}
          onUpdatePilePosition={(id, pos) => {
            setPiles((prev) =>
              prev.map((p) => (p.id === id ? { ...p, position: pos } : p))
            );
          }}
          archivedCount={archivedItems.length}
          onOpenArchiveBasket={() => {
            setIsBinOpen(true);
          }}
          onAddTodoAtPosition={handleAddTodoAtPosition}
          onQuickNewNote={handleQuickNewNote}
          onDelegateThreadToAgent={handleDelegateThreadToAgent}
          onDelegateNoteToAgent={handleDelegateNoteToAgent}
        />
      </div>

      {/* 3D Wire Basket Interior Inspection Modal */}
      <BinInspectionModal
        isOpen={isBinOpen}
        onClose={() => setIsBinOpen(false)}
        archivedItems={archivedItems}
        onRestoreItem={handleRestoreItem}
        onRestoreAll={handleRestoreAll}
        onEmptyBin={handleEmptyBin}
        onDeletePermanently={handleDeletePermanently}
      />

      {/* Card Inspector Paper Sheet Modal (For Corkboard clicks) */}
      <CardInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        selectedType={selectedType}
        activeThread={activeThread}
        activeTodo={activeTodo}
        activeNote={activeNote}
        onTriageToTodo={handleTriageToTodo}
        onTriageToNote={handleTriageToNote}
        onArchiveThread={handleArchiveThread}
        onUpdateTodo={(updated) => {
          setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        }}
        onUpdateNote={(updated) => {
          setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
        }}
        onDelegateTodoToAgent={handleDelegateTodoToAgent}
        onRequestApproval={handleRequestApproval}
        onPinDossierAsNote={handlePinDossierAsNote}
        onRetryAgent={handleRetryAgent}
        onScheduleRetry={handleScheduleRetry}
        onCancelCountdown={handleCancelCountdown}
        onRevertTodoFromAgent={handleRevertTodoFromAgent}
      />

      {/* Real-time Notification Toasts */}
      <NotificationToast
        notifications={notifications}
        onDismiss={(id) => setNotifications((prev) => prev.filter((n) => n.id !== id))}
        onViewApproval={(approvalId) => {
          const approval = approvals.find((a) => a.id === approvalId);
          if (approval) {
            handleOpenInspector(approval.taskId, 'todo');
          }
        }}
        onViewDossier={(taskId) => {
          handleOpenInspector(taskId, 'todo');
        }}
      />

      {/* Gmail OAuth Connection & Ingestion Modal */}
      <GmailConnectModal
        isOpen={isGmailModalOpen}
        onClose={() => setIsGmailModalOpen(false)}
        userEmail={userEmail}
        onSyncComplete={handleSyncComplete}
        onDisconnect={handleGmailDisconnect}
        onLoadDemoData={handleLoadDemoData}
      />
    </div>
  );
};

export default FlowExperience;
