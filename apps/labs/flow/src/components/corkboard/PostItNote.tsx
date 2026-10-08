import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useVelocity,
  useSpring,
  useTransform,
  animate,
} from 'framer-motion';
import { Check, Bot, Archive, Mail, Paperclip, Sparkles, AlertTriangle } from 'lucide-react';
import { TodoItem } from '../../types';
import { Pushpin } from './Pushpin';
import { BotAvatar } from 'bot-avatars';
import { getAgentAvatarForTask } from '../../lib/avatarService';

interface PostItNoteProps {
  todo: TodoItem;
  isSelected?: boolean;
  onSelect: () => void;
  onDoubleClick?: () => void;
  onOpenInspector?: () => void;
  onToggleStatus: () => void;
  onTogglePin: () => void;
  onArchive?: () => void;
  onDelegateToAgent: () => void;
  onPositionChange: (pos: { x: number; y: number }) => void;
  onDragMove?: (point: { x: number; y: number }) => void;
  onDragEndWithPoint?: (point: { x: number; y: number }, offset: { x: number; y: number }) => boolean;
}

export const PostItNote: React.FC<PostItNoteProps> = ({
  todo,
  isSelected,
  onSelect,
  onDoubleClick,
  onOpenInspector,
  onToggleStatus,
  onTogglePin,
  onArchive,
  onDelegateToAgent,
  onPositionChange,
  onDragMove,
  onDragEndWithPoint,
}) => {
  const isPinned = todo.position?.isPinned ?? true;
  const rotation = todo.position?.rotation ?? 0;
  const isCompleted = todo.status === 'completed';
  const avatarType = getAgentAvatarForTask(todo.id, todo.agentAvatar);

  const posX = todo.position?.x ?? 0;
  const posY = todo.position?.y ?? 0;

  // Use motion values directly so Framer Motion drag binds to initial posX/posY on mount
  // preventing the "jump to (0,0)" bug
  const x = useMotionValue(posX);
  const y = useMotionValue(posY);

  // Velocity tracking for aerodynamic tilt physics (matching ThreeDPaperDragOverlay)
  const xVelocity = useVelocity(x);
  const yVelocity = useVelocity(y);

  // Smooth velocities using snappy physics springs
  const smoothVx = useSpring(xVelocity, { stiffness: 450, damping: 32 });
  const smoothVy = useSpring(yVelocity, { stiffness: 450, damping: 32 });

  // Lift / drag state progression: 0 (flat at rest on cork) -> 1 (airborne 3D flight)
  const dragProgress = useMotionValue(0);

  // Track base rotation in a motion value to seamlessly interpolate with drag banking
  const baseRotation = useMotionValue(rotation);
  useEffect(() => {
    baseRotation.set(rotation);
  }, [rotation]);

  // Aerodynamic Roll (rotZ): banks into horizontal turns proportional to velocity
  const rotateZ = useTransform(
    [dragProgress, smoothVx, baseRotation],
    ([progress, vx, baseRot]: number[]) => {
      // In ThreeDPaperDragOverlay: targetRotZ = -smoothVx * 0.009 (radians)
      // Clamped banking roll angle in degrees
      const bankAngle = Math.max(-22, Math.min(22, -vx * 0.012));
      return baseRot + bankAngle * progress;
    }
  );

  // Aerodynamic Pitch (rotX): tilts forward towards user & pitches with vertical air drag
  const rotateX = useTransform(
    [dragProgress, smoothVy],
    ([progress, vy]: number[]) => {
      // Base 5.5deg forward tilt when airborne + dynamic pitch against vertical drag
      const pitchAngle = 5.5 + Math.max(-16, Math.min(20, vy * 0.012));
      return pitchAngle * progress;
    }
  );

  // Aerodynamic Yaw (rotY): subtle lateral banking rotation into the direction of drag
  const rotateY = useTransform(
    [dragProgress, smoothVx],
    ([progress, vx]: number[]) => {
      const yawAngle = Math.max(-14, Math.min(14, vx * 0.008));
      return yawAngle * progress;
    }
  );

  // Dynamic Trailing Desk Shadow:
  // Lags behind motion in reverse direction of velocity, expands and blurs with speed
  const dynamicBoxShadow = useTransform(
    [dragProgress, smoothVx, smoothVy],
    ([progress, vx, vy]: number[]) => {
      if (progress < 0.01) {
        return isSelected
          ? '0 20px 32px -6px rgba(0,0,0,0.22), 0 8px 12px -4px rgba(0,0,0,0.1)'
          : 'rgba(0, 0, 0, 0.08) 0px 8px 20px 0px, rgba(0, 0, 0, 0.04) 0px 2px 4px 0px';
      }

      const speed = Math.hypot(vx, vy);
      const lagX = Math.max(-26, Math.min(26, -vx * 0.016));
      const lagY = Math.max(-6, Math.min(46, 26 - vy * 0.016));
      const blur = 20 + Math.min(26, speed * 0.024);
      const opacity = 0.22 * progress;

      return `${lagX * progress}px ${lagY * progress}px ${blur}px rgba(35, 18, 5, ${opacity}), 0px 4px 10px rgba(0, 0, 0, 0.06)`;
    }
  );

  // Dragging and pin microinteraction states
  const [isDraggingNote, setIsDraggingNote] = useState(false);
  const [justPinned, setJustPinned] = useState(false);
  const isDraggingRef = useRef(false);

  // Sync motion values if todo.position changes externally (e.g. Tidy Desk or resize)
  useEffect(() => {
    if (!isDraggingRef.current) {
      const currentX = x.get();
      const currentY = y.get();
      if (Math.hypot(currentX - posX, currentY - posY) > 1) {
        animate(x, posX, { type: 'spring', stiffness: 450, damping: 32 });
        animate(y, posY, { type: 'spring', stiffness: 450, damping: 32 });
      }
    }
  }, [posX, posY, x, y]);

  // Map color tag or hex to tactile pastel styling matching Three.js 3D paper
  const getColorStyles = (color?: string, tags?: string[]) => {
    const raw = `${color || ''} ${(tags || []).join(' ')}`.toLowerCase();
    if (raw.includes('mint') || raw.includes('9bd8a9')) {
      return {
        bg: '#eef8f0',
        border: '#9bd8a9',
        adhesive: 'rgba(155, 216, 169, 0.45)',
        pin: 'silver' as const,
      };
    }
    if (raw.includes('blue') || raw.includes('b8caf5')) {
      return {
        bg: '#f0f4fd',
        border: '#b8caf5',
        adhesive: 'rgba(184, 202, 245, 0.45)',
        pin: 'silver' as const,
      };
    }
    if (raw.includes('peach') || raw.includes('ffbe98')) {
      return {
        bg: '#fff3ec',
        border: '#ffbe98',
        adhesive: 'rgba(255, 190, 152, 0.45)',
        pin: 'gold' as const,
      };
    }
    if (raw.includes('rose') || raw.includes('f4c0d1')) {
      return {
        bg: '#fdf2f5',
        border: '#f4c0d1',
        adhesive: 'rgba(244, 192, 209, 0.45)',
        pin: 'red' as const,
      };
    }
    // Default classic yellow
    return {
      bg: '#fffbe6',
      border: '#fde99b',
      adhesive: 'rgba(253, 233, 155, 0.55)',
      pin: 'gold' as const,
    };
  };

  const colorTheme = getColorStyles(todo.color, todo.tags);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.08}
      onDragStart={() => {
        isDraggingRef.current = true;
        setIsDraggingNote(true);
        animate(dragProgress, 1, { type: 'spring', stiffness: 350, damping: 25 });
      }}
      onDrag={(_, info) => {
        onDragMove?.(info.point);
      }}
      onDragEnd={(_, info) => {
        setIsDraggingNote(false);
        animate(dragProgress, 0, { type: 'spring', stiffness: 320, damping: 28 });
        setJustPinned(true);
        setTimeout(() => setJustPinned(false), 500);

        const currentX = x.get();
        const currentY = y.get();

        const handled = onDragEndWithPoint?.(info.point, info.offset);
        if (!handled) {
          onPositionChange({
            x: currentX,
            y: currentY,
          });
        }
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 120);
      }}
      animate={{
        zIndex: isSelected ? 30 : 10,
      }}
      whileHover={{
        scale: 1.025,
        zIndex: 35,
      }}
      whileTap={{ scale: 0.98 }}
      whileDrag={{
        scale: 1.045,
        zIndex: 50,
        cursor: 'grabbing',
      }}
      onClick={() => {
        if (isDraggingRef.current) return;
        onSelect();
      }}
      onDoubleClick={() => {
        if (isDraggingRef.current) return;
        onDoubleClick?.();
      }}
      className={`absolute w-56 h-56 sm:w-60 sm:h-60 p-4 rounded-xl border font-ui cursor-grab select-none group flex flex-col justify-between ${
        isSelected ? 'ring-2 ring-[#030302] shadow-2xl' : 'shadow-craft'
      }`}
      style={{
        x,
        y,
        rotateZ,
        rotateX,
        rotateY,
        transformOrigin: '50% 15%',
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        backgroundColor: colorTheme.bg,
        borderColor: colorTheme.border,
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.038) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.038) 1px, transparent 1px)
        `,
        backgroundSize: '36px 36px',
        boxShadow: dynamicBoxShadow,
      }}
    >
      {/* Top Pushpin with physical lift/push-in microinteraction */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
        <Pushpin
          color={colorTheme.pin}
          isPinned={isPinned}
          isDragging={isDraggingNote}
          justPinned={justPinned}
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin();
          }}
        />
      </div>

      {/* Pinned Paperclip for Agent Deliverables */}
      {todo.agentArtifacts && todo.agentArtifacts.length > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenInspector?.();
          }}
          className="absolute -top-2.5 right-4 z-25 flex items-center gap-1 bg-[#ffffff] hover:bg-[#fff9ea] border border-[#d3b57a] hover:border-[#b89349] px-2 py-0.5 rounded-full shadow-sm text-[10px] font-mono font-medium text-[#4a3b1a] cursor-pointer hover:scale-105 active:scale-95 transition-all"
          title="Executive research dossier attached. Click to open dossier."
        >
          <Paperclip className="w-3 h-3 text-[#4a3b1a]" />
          <span>Dossier</span>
        </button>
      )}

      {/* Top Adhesive Strip (Authentic Post-It Band) */}
      <div
        className="absolute top-0 left-0 right-0 h-7 rounded-t-xl pointer-events-none"
        style={{
          backgroundColor: colorTheme.adhesive,
          borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
        }}
      />

      {/* Dog-eared Folded Corner at Bottom Right */}
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-gradient-to-tl from-black/10 to-transparent pointer-events-none rounded-br-xl" />

      {/* Note Body (Natural Handwritten Atmosphere) */}
      <div className="pt-4 text-left flex-1 flex flex-col justify-start overflow-hidden">
        {/* Title (Only rendered when user specified a title) */}
        {todo.title?.trim() ? (
          <h3
            className={`font-handwriting text-2xl font-bold leading-tight tracking-wide ${
              isCompleted ? 'line-through text-[#8e8e8e]' : 'text-[#1a1a1a]'
            }`}
          >
            {todo.title}
          </h3>
        ) : null}

        {/* AI In-Progress State */}
        {todo.assignedTo === 'agent' && todo.agentStatus === 'in_progress' && (
          <div className="mt-2 p-2 rounded-xl bg-[#b8caf5]/35 border border-[#b8caf5] text-[11px] font-mono text-[#1b2b5a] flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-white/90 border border-[#b8caf5] flex items-center justify-center overflow-hidden flex-shrink-0">
              <BotAvatar type={avatarType} state="working" size={20} />
            </div>
            <span className="line-clamp-2 leading-tight">
              {todo.agentNotes || 'Assistant researching in background...'}
            </span>
          </div>
        )}

        {/* AI Completed Dossier Preview Block */}
        {todo.assignedTo === 'agent' && todo.agentStatus === 'completed' && todo.agentArtifacts && todo.agentArtifacts.length > 0 && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onOpenInspector?.();
            }}
            className="mt-1.5 p-2 rounded-lg bg-white/85 border border-[#d3b57a]/70 shadow-2xs cursor-pointer hover:bg-white hover:border-[#b89349] transition-all group/dossier"
            title="Click to view full executive research dossier"
          >
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#4a3b1a] mb-0.5">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#c49a45]" />
                Executive Briefing
              </span>
              <span className="text-[#0087ff] group-hover/dossier:underline flex items-center gap-0.5">
                Inspect ↗
              </span>
            </div>
            <p className="text-[11px] font-sans text-[#2d220f] leading-snug line-clamp-3 font-normal">
              {todo.agentNotes || 'Synthesized executive research briefing ready.'}
            </p>
          </div>
        )}

        {/* Fallback Manual Description */}
        {!(todo.assignedTo === 'agent' && (todo.agentStatus === 'in_progress' || (todo.agentStatus === 'completed' && todo.agentArtifacts && todo.agentArtifacts.length > 0))) && (
          todo.description?.trim() ? (
            <p
              className={`font-handwriting leading-snug ${
                todo.title?.trim()
                  ? `mt-1.5 text-base line-clamp-3 ${isCompleted ? 'line-through text-[#a5a5a5]' : 'text-[#444444]'}`
                  : `text-xl line-clamp-6 ${isCompleted ? 'line-through text-[#8e8e8e]' : 'text-[#1f1f1f]'}`
              }`}
            >
              {todo.description}
            </p>
          ) : !todo.title?.trim() ? (
            <p className="mt-1 font-handwriting text-xl text-black/35 italic select-none">
              Write notes here...
            </p>
          ) : (
            <p className="mt-1 font-handwriting text-sm text-black/35 italic select-none">
              Double-click to write notes...
            </p>
          )
        )}

        {/* Source link badge if converted from Gmail */}
        {todo.source && (
          <div className="mt-auto pt-1 flex items-center gap-1 text-[10px] text-[#0066cc] font-mono opacity-80">
            <Mail className="w-3 h-3" />
            <span className="truncate">From {todo.source.author}</span>
          </div>
        )}
      </div>

      {/* Minimal Footer & Subtle Hover Actions */}
      <div className="pt-1 mt-auto flex items-center justify-between z-10">
        {/* Subtle Discard / Archive Box Icon at bottom-left */}
        {onArchive ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onArchive();
            }}
            className="p-1 rounded-md text-black/35 hover:text-black/80 hover:bg-black/5 opacity-55 hover:opacity-100 transition-all cursor-pointer"
            title="Toss to Bin [E]"
          >
            <Archive className="w-4 h-4 stroke-[1.8]" />
          </button>
        ) : (
          <div />
        )}

        {/* Dynamic Agent Status Indicator (quiet, non-redundant) */}
        {todo.assignedTo === 'agent' && (
          todo.agentStatus === 'awaiting_approval' ? (
            <div
              className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#ffeedd] text-[#ff4500] border border-[#ff4500]/50 font-bold flex items-center gap-1"
            >
              <AlertTriangle className="w-3 h-3 text-[#ff4500]" />
              <span>Approval Needed</span>
            </div>
          ) : todo.agentStatus === 'idle' ? (
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#8a7f75]">
              <BotAvatar type={avatarType} state="default" size={14} />
              <span>Assistant</span>
            </div>
          ) : null
        )}

        {/* Checkmark Status Toggle at bottom-right */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleStatus();
          }}
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all cursor-pointer ml-auto ${
            isCompleted
              ? 'bg-[#52b788] border-[#40916c] text-white opacity-100 shadow-xs'
              : 'border-black/30 text-transparent hover:border-black/70 opacity-55 hover:opacity-100'
          }`}
          title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
        >
          <Check className="w-3 h-3 stroke-[3]" />
        </button>
      </div>
    </motion.div>
  );
};
