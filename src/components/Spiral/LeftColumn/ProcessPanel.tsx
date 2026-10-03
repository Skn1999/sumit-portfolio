import React from 'react';
import { CONTENT } from '@/data/content';
import { ArrowUpRight } from 'lucide-react';
import styles from '../styles/left-column.module.css';

export const ProcessPanel: React.FC = () => {
  const data = CONTENT.levels.L48;

  return (
    <>
      <div className={styles.eyebrow} data-stagger="0">
        <span>{data.eyebrow}</span>
        <span className={styles.eyebrowHairline} />
        <span>{data.label}</span>
      </div>

      <h2 className={styles.title} data-stagger="1">
        {data.title}
      </h2>

      <p className={styles.intro} data-stagger="2">
        {data.intro}
      </p>

      <div className={styles.processPillars} data-stagger="3">
        {data.pillars.map((pillar) => (
          <div key={pillar.title} className={styles.pillarItem}>
            <span className={styles.pillarTitle}>{pillar.title}</span>
            <span className={styles.pillarDesc}>{pillar.description}</span>
          </div>
        ))}
      </div>

      <div className={styles.liveToolsSection} data-stagger="4">
        <span className={styles.liveToolsHeader}>LIVE TOOLS</span>
        <div className={styles.liveToolsList}>
          {data.liveTools.map((tool) => {
            const isExternal = tool.href.startsWith('http');
            const cleanTitle = tool.title.replace(/\s*[↗→]$/, '');
            return (
              <a
                key={tool.href}
                href={tool.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={styles.liveToolCard}
              >
                <span>{cleanTitle}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProcessPanel;
