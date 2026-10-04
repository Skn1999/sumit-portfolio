import React from 'react';
import { CONTENT } from '../../data/content';
import { ArrowUpRight } from 'lucide-react';
import styles from '../styles/left-column.module.css';

export const WorkPanel: React.FC = () => {
  const data = CONTENT.levels.L1;

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

      <div className={styles.workList} data-stagger="2">
        {data.items.map((item, index) => (
          <div
            key={`${item.company}-${item.period}`}
            className={styles.workItem}
            data-stagger={Math.min(2 + index, 4)}
          >
            <div className={styles.workMeta}>
              <span className={styles.workCompany}>{item.company}</span>
              <span className={styles.workPeriod}>{item.period}</span>
            </div>

            <span className={styles.workRole}>{item.role}</span>

            <p className={styles.workOutcome}>{item.outcome}</p>

            {item.projects && item.projects.length > 0 && (
              <div className={styles.workProjectLinks}>
                {item.projects.map((proj) => {
                  const isExternal = proj.href.startsWith('http');
                  const cleanTitle = proj.title.replace(/\s*[↗→]$/, '');
                  return (
                    <a
                      key={proj.href}
                      href={proj.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className={styles.projectLink}
                    >
                      <span>{cleanTitle}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-70" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkPanel;
