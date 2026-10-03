import React from 'react';
import { CONTENT } from '@/data/content';
import { useSpiralStore } from '@/lib/store';
import { Tv, Play, ArrowDown, ExternalLink } from 'lucide-react';
import styles from '../styles/left-column.module.css';

export const IntroPanel: React.FC = () => {
  const mode = useSpiralStore((state) => state.mode);
  const { intro } = CONTENT;

  const isVisible = mode === 'A';

  return (
    <div
      className={styles.introPanel}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, -12px, 0)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      aria-hidden={!isVisible}
    >
      {/* Apple TV+ Header Badge */}
      <div className={styles.appleTvBadge}>
        <Tv className="w-3.5 h-3.5 text-[#E8A64A]" />
        <span className={styles.appleTvBadgeText}>{intro.badge}</span>
        <span className={styles.appleTvDot}>•</span>
        <span className={styles.appleTvSubtext}>{intro.subtitle}</span>
      </div>

      <h1 className={styles.title}>{intro.headline}</h1>

      <p className={styles.introValueStatement}>{intro.valueStatement}</p>

      {/* Series Dossier & Pact Rules */}
      <div className={styles.timelineList}>
        {intro.timeline.map((row) => (
          <div key={`${row.company}-${row.period}`} className={styles.timelineRow}>
            <div className={styles.timelineHeader}>
              <span className={styles.timelineCompany}>{row.company}</span>
              <span className={styles.timelinePeriod}>{row.period}</span>
            </div>
            <span className={styles.timelineRole}>{row.role}</span>
          </div>
        ))}
      </div>

      {/* Streaming CTAs & Scroll Hint */}
      <div className={styles.introActionRow}>
        <a
          href="https://tv.apple.com/us/show/silo/umc.cmc.3yksgc857px0k0rqe5zd4jice"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.streamBtn}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Stream on Apple TV+</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>

        <div className={styles.scrollHintPill}>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#E8A64A]" />
          <span>Scroll to explore 144 levels</span>
        </div>
      </div>
    </div>
  );
};

export default IntroPanel;
