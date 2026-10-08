import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IngestionThread, TodoItem, NoteItem, BoardPile } from '../../types';
import { PostItNote } from './PostItNote';
import { EmailCard } from './EmailCard';
import { ScratchNoteCard } from './ScratchNoteCard';
import { FigmaBottomToolbar } from '../toolbar/FigmaBottomToolbar';
import { ThreeDPaperDragOverlay } from './ThreeDPaperDragOverlay';
import { AssistantFolder } from './AssistantFolder';
import { Sparkles, Inbox, CheckCircle2, FileText, Bot } from 'lucide-react';

interface CorkboardCanvasProps {
  threads: IngestionThread[];
  todos: TodoItem[];
  notes: NoteItem[];
  piles: BoardPile[];
  selectedId: string | null;
  archivedCount?: number;
  onSelectItem: (id: string, type: 'thread' | 'todo' | 'note') => void;
  onOpenInspector?: (id: string, type: 'thread' | 'todo' | 'note') => void;
  onTriageToTodo: (thread: IngestionThread) => void;
  onTriageToNote: (thread: IngestionThread) => void;
  onArchiveThread: (id: string) => void;
  onArchiveTodo?: (id: string) => void;
  onArchiveNote?: (id: string) => void;
  onToggleTodoStatus: (id: string) => void;
  onToggleTodoPin: (id: string) => void;
  onToggleThreadPin: (id: string) => void;
  onToggleNotePin?: (id: string) => void;
  onDelegateTodoToAgent: (id: string) => void;
  onDelegateThreadToAgent?: (id: string) => void;
  onDelegateNoteToAgent?: (id: string) => void;
  onRevertTodoFromAgent?: (id: string) => void;
  onRetryAgent?: (id: string) => void;
  onScheduleRetry?: (id: string, seconds: number) => void;
  onCancelCountdown?: (id: string) => void;
  onUpdateThreadPosition: (id: string, pos: { x: number; y: number }) => void;
  onUpdateTodoPosition: (id: string, pos: { x: number; y: number }) => void;
  onUpdateNotePosition: (id: string, pos: { x: number; y: number }) => void;
  onUpdatePilePosition?: (id: string, pos: { x: number; y: number }) => void;
  onOpenArchiveBasket: () => void;
  onAddTodoAtPosition?: (pos: { x: number; y: number }, color?: string) => void;
  onQuickNewNote?: () => void;
}

interface CrumplingItem {
  id: string;
  type: 'thread' | 'todo' | 'note';
  title: string;
  color: string;
  startPos: { x: number; y: number };
  targetPos: { x: number; y: number };
}

export const CorkboardCanvas: React.FC<CorkboardCanvasProps> = ({
  threads,
  todos,
  notes,
  selectedId,
  archivedCount,
  onSelectItem,
  onOpenInspector,
  onTriageToTodo,
  onTriageToNote,
  onArchiveThread,
  onArchiveTodo,
  onArchiveNote,
  onToggleTodoStatus,
  onToggleTodoPin,
  onToggleThreadPin,
  onToggleNotePin,
  onDelegateTodoToAgent,
  onDelegateThreadToAgent,
  onDelegateNoteToAgent,
  onRevertTodoFromAgent,
  onRetryAgent,
  onScheduleRetry,
  onCancelCountdown,
  onUpdateThreadPosition,
  onUpdateTodoPosition,
  onUpdateNotePosition,
  onOpenArchiveBasket,
  onAddTodoAtPosition,
  onQuickNewNote,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1400, height: 800 });

  // Tactile Wire Basket & Toolbar Bin interaction states
  const [isDragOverBin, setIsDragOverBin] = useState(false);
  const [isCatchingBin, setIsCatchingBin] = useState(false);
  const [crumplingItem, setCrumplingItem] = useState<CrumplingItem | null>(null);

  // Assistant Manila Folder interaction state
  const [isDragOverAssistant, setIsDragOverAssistant] = useState(false);

  // 3D Paper Physics Drag State
  const [is3DDragging, setIs3DDragging] = useState(false);
  const [threeDDragColor, setThreeDDragColor] = useState('#fde99b');
  const [initialPointer, setInitialPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const activeThreads = threads.filter((t) => !t.triaged);
  const activeTodos = todos.filter((t) => t.status !== 'completed');
  const completedCount =
    archivedCount !== undefined
      ? archivedCount
      : todos.filter((t) => t.status === 'completed').length +
        threads.filter((t) => t.triaged).length;

  // Safe clamping helper ensuring no card is pushed off the visible corkboard screen
  const getSafePosition = (
    pos?: { x: number; y: number },
    fallback = { x: 50, y: 50 }
  ) => {
    const rawX = pos?.x ?? fallback.x;
    const rawY = pos?.y ?? fallback.y;
    const maxX = Math.max(100, dimensions.width - 330);
    const maxY = Math.max(100, dimensions.height - 240);
    return {
      x: Math.max(16, Math.min(rawX, maxX)),
      y: Math.max(16, Math.min(rawY, maxY)),
    };
  };

  // Launch the physical paper crumple sequence into the toolbar wire basket
  const triggerCrumpleAndArchive = useCallback(
    (
      id: string,
      type: 'thread' | 'todo' | 'note',
      title: string,
      startPos: { x: number; y: number }
    ) => {
      // Toolbar wire basket sits at bottom center + 125px offset
      const targetPos = {
        x: Math.max(100, dimensions.width / 2 + 125),
        y: Math.max(100, dimensions.height - 40),
      };

      setCrumplingItem({
        id,
        type,
        title,
        color: type === 'todo' ? '#fffbe6' : '#ffffff',
        startPos,
        targetPos,
      });

      // Execute actual archive action in parent state
      if (type === 'thread') {
        onArchiveThread(id);
      } else if (type === 'todo') {
        if (onArchiveTodo) onArchiveTodo(id);
        else onToggleTodoStatus(id);
      } else if (type === 'note') {
        if (onArchiveNote) onArchiveNote(id);
      }
    },
    [dimensions.width, dimensions.height, onArchiveThread, onArchiveTodo, onArchiveNote, onToggleTodoStatus]
  );

  const handleCrumpleComplete = () => {
    setCrumplingItem(null);
    setIsCatchingBin(true);
    setTimeout(() => {
      setIsCatchingBin(false);
    }, 550);
  };

  // Assistant Folder geometry
  const folderWidth = 320;
  const folderHeight = 360;
  const folderX = Math.max(760, dimensions.width - 340);
  const folderY = 50;

  // Drag hit-testing for Wire Basket and Assistant Folder
  const handleCardDragMove = (point: { x: number; y: number }) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = point.x - rect.left;
    const relY = point.y - rect.top;

    // 1. Wire basket hit test
    const basketCenterX = dimensions.width / 2 + 125;
    const basketCenterY = dimensions.height - 35;
    const distToBasket = Math.hypot(relX - basketCenterX, relY - basketCenterY);

    const isNearBasket =
      distToBasket < 90 ||
      (Math.abs(relX - basketCenterX) < 70 && relY > dimensions.height - 95);

    setIsDragOverBin(isNearBasket);

    // 2. Assistant folder hit test
    const isNearAssistant =
      relX >= folderX - 30 &&
      relX <= folderX + folderWidth + 30 &&
      relY >= folderY - 30 &&
      relY <= folderY + folderHeight + 30;

    setIsDragOverAssistant(isNearAssistant);
  };

  const handleCardDragEnd = (
    id: string,
    type: 'thread' | 'todo' | 'note',
    point: { x: number; y: number },
    title: string
  ): boolean => {
    if (!containerRef.current) {
      setIsDragOverBin(false);
      setIsDragOverAssistant(false);
      return false;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const relX = point.x - rect.left;
    const relY = point.y - rect.top;

    // 1. Wire basket drop
    const basketCenterX = dimensions.width / 2 + 125;
    const basketCenterY = dimensions.height - 35;
    const distToBasket = Math.hypot(relX - basketCenterX, relY - basketCenterY);

    const isDroppedInBin =
      distToBasket < 90 ||
      (Math.abs(relX - basketCenterX) < 70 && relY > dimensions.height - 95);

    setIsDragOverBin(false);

    if (isDroppedInBin) {
      triggerCrumpleAndArchive(id, type, title, {
        x: relX - 90,
        y: relY - 60,
      });
      return true;
    }

    // 2. Assistant folder drop
    const isDroppedInAssistant =
      relX >= folderX - 30 &&
      relX <= folderX + folderWidth + 30 &&
      relY >= folderY - 30 &&
      relY <= folderY + folderHeight + 30;

    setIsDragOverAssistant(false);

    if (isDroppedInAssistant) {
      if (type === 'todo') {
        onDelegateTodoToAgent(id);
        return true;
      }
      if (type === 'thread' && onDelegateThreadToAgent) {
        onDelegateThreadToAgent(id);
        return true;
      }
      if (type === 'note' && onDelegateNoteToAgent) {
        onDelegateNoteToAgent(id);
        return true;
      }
    }

    return false;
  };

  // 3D Paper Physics Drag handlers from Figma Toolbar
  const handleStartStickyDrag = (e: React.PointerEvent, color: string) => {
    setIs3DDragging(true);
    setThreeDDragColor(color);
    setInitialPointer({ x: e.clientX, y: e.clientY });
  };

  const handle3DPointerMove = (point: { x: number; y: number }) => {
    handleCardDragMove(point);
  };

  const handle3DDropOnBoard = (point: { x: number; y: number }, color: string) => {
    setIs3DDragging(false);
    setIsDragOverBin(false);

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Check if it was just a click (minimal drag distance from initialPointer)
    const dragDist = Math.hypot(point.x - initialPointer.x, point.y - initialPointer.y);
    if (dragDist < 14) {
      // Place in center of Today's focus board
      const centerPos = getSafePosition({
        x: Math.max(380, dimensions.width / 2 - 150),
        y: Math.max(120, dimensions.height / 2 - 120),
      });
      onAddTodoAtPosition?.(centerPos, color);
      return;
    }

    // Place where cursor dropped
    const boardX = point.x - rect.left - 140;
    const boardY = point.y - rect.top - 40;
    const safePos = getSafePosition({ x: boardX, y: boardY });
    onAddTodoAtPosition?.(safePos, color);
  };

  const handle3DDropInBin = () => {
    setIs3DDragging(false);
    setIsDragOverBin(false);
    setIsCatchingBin(true);
    setTimeout(() => {
      setIsCatchingBin(false);
    }, 550);
  };

  // Global Keyboard shortcuts when on Corkboard Canvas (E, T, N, P, Enter, Space, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // 1. [E] Archive / Discard Shortcut
      if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        if (selectedId) {
          const selectedThread = threads.find((t) => t.id === selectedId);
          if (selectedThread) {
            triggerCrumpleAndArchive(
              selectedThread.id,
              'thread',
              selectedThread.subject,
              selectedThread.position ?? { x: 50, y: 50 }
            );
            return;
          }
          const selectedTodo = todos.find((t) => t.id === selectedId);
          if (selectedTodo) {
            triggerCrumpleAndArchive(
              selectedTodo.id,
              'todo',
              selectedTodo.title,
              selectedTodo.position ?? { x: 400, y: 100 }
            );
            return;
          }
          const selectedNote = notes.find((n) => n.id === selectedId);
          if (selectedNote) {
            triggerCrumpleAndArchive(
              selectedNote.id,
              'note',
              selectedNote.title,
              selectedNote.position ?? { x: 800, y: 100 }
            );
            return;
          }
        }
      }

      // 2. [T] Convert Selected Thread to Todo
      if ((e.key === 't' || e.key === 'T') && selectedId) {
        const selectedThread = threads.find((t) => t.id === selectedId);
        if (selectedThread) {
          e.preventDefault();
          onTriageToTodo(selectedThread);
        }
      }

      // 3. [N] Convert Selected Thread to Note
      if ((e.key === 'n' || e.key === 'N') && selectedId) {
        const selectedThread = threads.find((t) => t.id === selectedId);
        if (selectedThread) {
          e.preventDefault();
          onTriageToNote(selectedThread);
        }
      }

      // 4. [P] Toggle Pushpin on Selected item
      if ((e.key === 'p' || e.key === 'P') && selectedId) {
        e.preventDefault();
        const selectedThread = threads.find((t) => t.id === selectedId);
        if (selectedThread) onToggleThreadPin(selectedThread.id);
        const selectedTodo = todos.find((t) => t.id === selectedId);
        if (selectedTodo) onToggleTodoPin(selectedTodo.id);
        const selectedNote = notes.find((n) => n.id === selectedId);
        if (selectedNote && onToggleNotePin) onToggleNotePin(selectedNote.id);
      }

      // 5. [Enter] or [Space] Open Inspector Modal
      if (
        (e.key === 'Enter' || e.key === ' ') &&
        selectedId &&
        onOpenInspector
      ) {
        e.preventDefault();
        if (threads.some((t) => t.id === selectedId)) {
          onOpenInspector(selectedId, 'thread');
        } else if (todos.some((t) => t.id === selectedId)) {
          onOpenInspector(selectedId, 'todo');
        } else if (notes.some((n) => n.id === selectedId)) {
          onOpenInspector(selectedId, 'note');
        }
      }

      // 6. [Escape] Deselect
      if (e.key === 'Escape' && selectedId) {
        onSelectItem('', 'thread');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    selectedId,
    threads,
    todos,
    notes,
    activeThreads,
    triggerCrumpleAndArchive,
    onTriageToTodo,
    onTriageToNote,
    onToggleThreadPin,
    onToggleTodoPin,
    onToggleNotePin,
    onOpenInspector,
    onSelectItem,
  ]);

  // Tidy Desk Action: Re-arranges scattered notes into organic studio clusters
  const handleTidyDesk = () => {
    activeThreads.forEach((th, idx) => {
      onUpdateThreadPosition(th.id, {
        x: 28 + (idx % 2) * 12,
        y: 45 + idx * 225,
      });
    });

    activeTodos.forEach((td, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      onUpdateTodoPosition(td.id, {
        x: 370 + col * 300 + (Math.random() - 0.5) * 20,
        y: 45 + row * 235 + (Math.random() - 0.5) * 15,
      });
    });

    notes.forEach((nt, idx) => {
      onUpdateNotePosition(nt.id, {
        x: Math.min(dimensions.width - 340, 970) + (idx % 2) * 10,
        y: 45 + idx * 230,
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{
        backgroundColor: '#cb9b69', // Rich warm natural cork
        backgroundImage: `
          radial-gradient(#ab7643 14%, transparent 16%),
          radial-gradient(#dfb382 14%, transparent 16%),
          linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px, 48px 48px, 64px 64px, 64px 64px',
        backgroundPosition: '0 0, 24px 24px, 0 0, 0 0',
        boxShadow: 'inset 0 0 120px rgba(0,0,0,0.28)',
      }}
    >
      {/* ================= STUDIO CHALK MARKINGS ON CORK ================= */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-4 left-6 flex items-center gap-2 text-white/50 font-editorial text-sm font-bold tracking-wider uppercase">
          <Inbox className="w-3.5 h-3.5 opacity-70" />
          <span>In-Tray ({activeThreads.length})</span>
        </div>

        <div className="absolute top-4 left-[380px] flex items-center gap-2 text-[#fffbe6]/60 font-editorial text-sm font-bold tracking-wider uppercase">
          <CheckCircle2 className="w-3.5 h-3.5 opacity-70 text-[#fde99b]" />
          <span>Today's Working Board ({activeTodos.filter((t) => t.assignedTo !== 'agent').length})</span>
        </div>

        <div className="absolute top-4 right-[320px] hidden md:flex items-center gap-2 text-[#eed8ae]/90 font-editorial text-sm font-bold tracking-wider uppercase">
          <Bot className="w-3.5 h-3.5 text-[#eed8ae]" />
          <span>Assistant Desk</span>
        </div>
      </div>

      {/* ================= ASSISTANT MANILA FOLDER ================= */}
      <div
        className="absolute z-10"
        style={{
          left: folderX,
          top: folderY,
        }}
      >
        <AssistantFolder
          isDragOver={isDragOverAssistant}
          activeTaskCount={todos.filter((t) => t.assignedTo === 'agent').length}
          inProgressTaskCount={
            todos.filter((t) => t.assignedTo === 'agent' && t.agentStatus === 'in_progress').length
          }
          completedTaskCount={
            todos.filter((t) => t.assignedTo === 'agent' && t.agentStatus === 'completed').length
          }
        />
      </div>

      {/* ================= EMPTY STATE HINTS ================= */}
      {activeThreads.length === 0 && (
        <div className="absolute top-12 left-6 w-72 h-44 rounded-2xl border-2 border-dashed border-white/25 flex flex-col items-center justify-center p-4 text-center text-white/60 pointer-events-none">
          <Inbox className="w-6 h-6 mb-1.5 opacity-60" />
          <p className="text-xs font-medium text-white/80">In-Tray is clear</p>
          <p className="text-[10px] opacity-75 mt-0.5">
            Incoming emails from Gmail will pin here as index cards.
          </p>
        </div>
      )}

      {activeTodos.length === 0 && (
        <div className="absolute top-12 left-[380px] w-80 h-48 rounded-xl border-2 border-dashed border-[#fde99b]/30 flex flex-col items-center justify-center p-4 text-center text-[#fffbe6]/70 pointer-events-none">
          <CheckCircle2 className="w-6 h-6 mb-1.5 opacity-60 text-[#fde99b]" />
          <p className="text-xs font-medium text-white/90">No tasks pinned for today</p>
          <p className="text-[10px] opacity-75 mt-0.5 max-w-[200px]">
            Press <strong>[T]</strong> on any mail card, or click <strong>+ New Post-It</strong> above.
          </p>
        </div>
      )}

      {/* ================= 1. IN-TRAY EMAIL CARDS (PHYSICAL INDEX CARDS) ================= */}
      {activeThreads.map((thread, index) => {
        const safePos = getSafePosition(thread.position, {
          x: 28 + (index % 2) * 12,
          y: 45 + index * 225,
        });

        return (
          <EmailCard
            key={thread.id}
            thread={{ ...thread, position: { ...thread.position, ...safePos } }}
            isSelected={selectedId === thread.id}
            onSelect={() => onSelectItem(thread.id, 'thread')}
            onDoubleClick={() => onOpenInspector?.(thread.id, 'thread')}
            onTriageToTodo={() => onTriageToTodo(thread)}
            onTriageToNote={() => onTriageToNote(thread)}
            onArchive={() =>
              triggerCrumpleAndArchive(
                thread.id,
                'thread',
                thread.subject,
                thread.position ?? safePos
              )
            }
            onTogglePin={() => onToggleThreadPin(thread.id)}
            onPositionChange={(pos) => onUpdateThreadPosition(thread.id, pos)}
            onDragMove={handleCardDragMove}
            onDragEndWithPoint={(point) =>
              handleCardDragEnd(thread.id, 'thread', point, thread.subject)
            }
          />
        );
      })}

      {/* ================= 2. TODAY'S FOCUS (YELLOW POST-IT NOTES) ================= */}
      {activeTodos.map((todo, index) => {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const isAgent = todo.assignedTo === 'agent';
        const safePos = getSafePosition(todo.position, {
          x: isAgent ? folderX + 18 + (index % 3) * 10 : 370 + col * 300,
          y: isAgent ? folderY + 70 + (index % 3) * 12 : 45 + row * 235,
        });

        return (
          <PostItNote
            key={todo.id}
            todo={{ ...todo, position: { ...todo.position, ...safePos } }}
            isSelected={selectedId === todo.id}
            onSelect={() => onSelectItem(todo.id, 'todo')}
            onDoubleClick={() => onOpenInspector?.(todo.id, 'todo')}
            onOpenInspector={() => onOpenInspector?.(todo.id, 'todo')}
            onToggleStatus={() => onToggleTodoStatus(todo.id)}
            onTogglePin={() => onToggleTodoPin(todo.id)}
            onArchive={() =>
              triggerCrumpleAndArchive(
                todo.id,
                'todo',
                todo.title || todo.description || 'Note',
                todo.position ?? safePos
              )
            }
            onDelegateToAgent={() => onDelegateTodoToAgent(todo.id)}
            onRetryAgent={onRetryAgent}
            onScheduleRetry={onScheduleRetry}
            onCancelCountdown={onCancelCountdown}
            onRevertToManualNote={() => onRevertTodoFromAgent?.(todo.id)}
            onPositionChange={(pos) => {
              // If note is dragged outside the folder back to working board, reclaim it!
              if (todo.assignedTo === 'agent' && pos.x < folderX - 80) {
                onRevertTodoFromAgent?.(todo.id);
              }
              onUpdateTodoPosition(todo.id, pos);
            }}
            onDragMove={handleCardDragMove}
            onDragEndWithPoint={(point) =>
              handleCardDragEnd(todo.id, 'todo', point, todo.title || todo.description || 'Note')
            }
          />
        );
      })}

      {/* ================= 3. SCRATCHPAD (WHITE SCRATCH NOTES) ================= */}
      {notes.map((note, index) => {
        const safePos = getSafePosition(note.position, {
          x: Math.min(dimensions.width - 340, 970),
          y: 430 + index * 230,
        });

        return (
          <ScratchNoteCard
            key={note.id}
            note={{ ...note, position: { ...note.position, ...safePos } }}
            isSelected={selectedId === note.id}
            onSelect={() => onSelectItem(note.id, 'note')}
            onDoubleClick={() => onOpenInspector?.(note.id, 'note')}
            onArchive={() =>
              triggerCrumpleAndArchive(
                note.id,
                'note',
                note.title,
                note.position ?? safePos
              )
            }
            onTogglePin={() => onToggleNotePin?.(note.id)}
            onPositionChange={(pos) => onUpdateNotePosition(note.id, pos)}
            onDragMove={handleCardDragMove}
            onDragEndWithPoint={(point) =>
              handleCardDragEnd(note.id, 'note', point, note.title)
            }
          />
        );
      })}

      {/* ================= CRUMPLING PAPER BALL PARTICLE ================= */}
      <AnimatePresence>
        {crumplingItem && (
          <motion.div
            key={`crumple-${crumplingItem.id}`}
            initial={{
              x: crumplingItem.startPos.x,
              y: crumplingItem.startPos.y,
              scale: 1,
              rotate: 0,
              borderRadius: '16px',
              opacity: 1,
            }}
            animate={{
              x: [
                crumplingItem.startPos.x,
                (crumplingItem.startPos.x + crumplingItem.targetPos.x) / 2,
                crumplingItem.targetPos.x,
              ],
              y: [
                crumplingItem.startPos.y,
                Math.min(crumplingItem.startPos.y, crumplingItem.targetPos.y) - 120,
                crumplingItem.targetPos.y,
              ],
              scale: [1, 0.42, 0.18],
              rotate: [0, 240, 720],
              borderRadius: ['16px', '42%', '50%'],
              opacity: [1, 1, 0.9, 0],
            }}
            transition={{
              duration: 0.65,
              times: [0, 0.45, 1],
              ease: [0.25, 0.8, 0.35, 1],
            }}
            onAnimationComplete={handleCrumpleComplete}
            className="absolute pointer-events-none z-50 overflow-hidden flex items-center justify-center select-none"
            style={{
              width: 200,
              height: 140,
              transformOrigin: 'center center',
              backgroundColor: crumplingItem.color,
              backgroundImage:
                crumplingItem.type === 'todo'
                  ? 'radial-gradient(circle at 35% 35%, #fffbe6, #fae075 60%, #baa01b 100%)'
                  : 'radial-gradient(circle at 35% 35%, #ffffff, #dedede 60%, #8c8c8c 100%)',
              boxShadow:
                'inset -4px -4px 10px rgba(0,0,0,0.3), inset 4px 4px 10px rgba(255,255,255,0.7), 0 16px 28px rgba(0,0,0,0.3)',
              filter: 'contrast(160%) brightness(92%)',
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0.2, 0] }}
              transition={{ duration: 0.25 }}
              className="p-3 text-[11px] font-mono text-black/60 truncate"
            >
              {crumplingItem.title}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ================= 5. 3D PAPER DRAG OVERLAY ================= */}
      <ThreeDPaperDragOverlay
        isDragging={is3DDragging}
        color={threeDDragColor}
        initialPointer={initialPointer}
        isOverBin={isDragOverBin}
        onPointerMove={handle3DPointerMove}
        onDropOnBoard={handle3DDropOnBoard}
        onDropInBin={handle3DDropInBin}
        onCancel={() => {
          setIs3DDragging(false);
          setIsDragOverBin(false);
        }}
      />

      {/* ================= 6. FIGMA-STYLE FLOATING BOTTOM TOOLBAR ================= */}
      <FigmaBottomToolbar
        archivedCount={completedCount}
        onStartStickyDrag={handleStartStickyDrag}
        onQuickNewSticky={(color) => {
          const centerPos = getSafePosition({
            x: Math.max(380, dimensions.width / 2 - 150),
            y: Math.max(120, dimensions.height / 2 - 120),
          });
          onAddTodoAtPosition?.(centerPos, color);
        }}
        onQuickNewNote={() => {
          onQuickNewNote?.();
        }}
        onTidyDesk={handleTidyDesk}
        onOpenBin={onOpenArchiveBasket}
        isDragOverBin={isDragOverBin}
      />
    </div>
  );
};
