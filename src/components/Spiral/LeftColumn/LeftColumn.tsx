import React, { useState, useEffect } from 'react';
import { useSpiralStore } from '@/lib/store';
import { LEVEL_IDS, type LevelId } from '@/lib/timeline';
import { ChevronUp, ChevronDown, Eye, EyeOff } from 'lucide-react';
import IntroPanel from './IntroPanel';
import LevelPanelWrapper from './LevelPanelWrapper';
import WorkPanel from './WorkPanel';
import ProcessPanel from './ProcessPanel';
import HikingFoodPanel from './HikingFoodPanel';
import UnsaidMomentsPanel from './UnsaidMomentsPanel';
import styles from '../styles/left-column.module.css';

const NUMERAL_MAP: Record<LevelId, string> = {
  L1: '01',
  L48: '48',
  L96: '96',
  L144: '144',
};

const CURRENT_LEVEL_LABEL: Record<LevelId, string> = {
  L1: 'LEVEL 01 // THE UP TOP',
  L48: 'LEVEL 48 // MID-LEVELS',
  L96: 'LEVEL 96 // THE GREEN TIERS',
  L144: 'LEVEL 144 // THE DOWN DEEP',
};

export const LeftColumn: React.FC = () => {
  const mode = useSpiralStore((state) => state.mode);
  const activeLevel = useSpiralStore((state) => state.activeLevel);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [displayLevel, setDisplayLevel] = useState<LevelId>(activeLevel);
  const [prevLevel, setPrevLevel] = useState<LevelId | null>(null);
  const [rollDir, setRollDir] = useState<'down' | 'up'>('down');
  const [isAnimatingNumeral, setIsAnimatingNumeral] = useState(false);

  // Manage numeral vertical roll on activeLevel change (Section 10.4: 24px vertical roll, 360ms)
  useEffect(() => {
    if (activeLevel !== displayLevel) {
      const prevIdx = LEVEL_IDS.indexOf(displayLevel);
      const nextIdx = LEVEL_IDS.indexOf(activeLevel);
      const dir = nextIdx >= prevIdx ? 'down' : 'up';

      setPrevLevel(displayLevel);
      setDisplayLevel(activeLevel);
      setRollDir(dir);
      setIsAnimatingNumeral(true);

      const timer = setTimeout(() => {
        setIsAnimatingNumeral(false);
        setPrevLevel(null);
      }, 360);

      return () => clearTimeout(timer);
    }
  }, [activeLevel, displayLevel]);

  // Reset minimized state when returning to drawing Mode A
  useEffect(() => {
    if (mode === 'A') {
      setIsMinimized(false);
    }
  }, [mode]);

  const showModeBPanels = mode !== 'A';
  const isCentered = mode === 'B';

  return (
    <aside
      className={`${styles.leftColumn} ${isCentered ? styles.isCentered : ''} ${isMinimized ? styles.isMinimized : ''} ${isExpanded ? styles.isExpanded : ''}`}
      aria-label="Portfolio narrative and level details"
    >
      {/* Background scrim for text contrast */}
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.contentInner}>
        {/* Apple VisionOS Top Bar for Mode B */}
        {showModeBPanels && (
          <div className={styles.visionHeader}>
            <div className={styles.visionBadge}>
              <span className={styles.visionDot} />
              <span>{CURRENT_LEVEL_LABEL[displayLevel]}</span>
            </div>

            <button
              type="button"
              className={styles.inspectBtn}
              onClick={() => setIsMinimized((prev) => !prev)}
              title={isMinimized ? "Show series details" : "Inspect Silo artwork"}
              aria-label={isMinimized ? "Show series details" : "Inspect Silo artwork"}
            >
              {isMinimized ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-[#E8A64A]" />
                  <span>Show details</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 opacity-70" />
                  <span>Inspect Silo</span>
                </>
              )}
            </button>
          </div>
        )}
        {/* Big Background Level Numeral (Mode B, Section 10.4) */}
        <div
          className={styles.numeralContainer}
          style={{
            opacity: showModeBPanels ? 1 : 0,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          {isAnimatingNumeral && prevLevel && (
            <span
              className={styles.numeralSlot}
              style={{
                position: 'absolute',
                transform: rollDir === 'down' ? 'translate3d(0, -24px, 0)' : 'translate3d(0, 24px, 0)',
                opacity: 0,
              }}
            >
              {NUMERAL_MAP[prevLevel]}
            </span>
          )}

          <span
            className={styles.numeralSlot}
            style={{
              transform: isAnimatingNumeral
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(0, 0, 0)',
              opacity: 0.75,
            }}
          >
            {NUMERAL_MAP[displayLevel]}
          </span>
        </div>

        {/* Stacked Panels Grid (All 4 panels + Intro in DOM for SEO/accessibility) */}
        <div className={styles.panelsGrid}>
          {/* Mode A: Intro Panel */}
          <div className={styles.introPanelCell}>
            <IntroPanel />
          </div>

          {/* Mode B: Level 01 - Work */}
          <LevelPanelWrapper levelId="L1">
            <WorkPanel />
          </LevelPanelWrapper>

          {/* Mode B: Level 48 - Process */}
          <LevelPanelWrapper levelId="L48">
            <ProcessPanel />
          </LevelPanelWrapper>

          {/* Mode B: Level 96 - Hiking & food */}
          <LevelPanelWrapper levelId="L96">
            <HikingFoodPanel />
          </LevelPanelWrapper>

          {/* Mode B: Level 144 - Unsaid Moments */}
          <LevelPanelWrapper levelId="L144">
            <UnsaidMomentsPanel />
          </LevelPanelWrapper>
        </div>

        {/* Mobile Expand / Collapse Bar (< 768px, Section 14) */}
        <div className={styles.mobileToggleBar}>
          <button
            type="button"
            className={styles.mobileToggleBtn}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse section' : 'Expand full section'}
          >
            <span>{isExpanded ? 'Show less' : 'Read more'}</span>
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default LeftColumn;
