import React from 'react';
import { CONTENT } from '../../data/content';
import styles from '../styles/left-column.module.css';

export const HikingFoodPanel: React.FC = () => {
  const data = CONTENT.levels.L96;

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

      <div className={styles.fieldNotesList} data-stagger="2">
        {data.fieldNotes.map((note, idx) => (
          <div
            key={`${note.location}-${note.region}`}
            className={styles.fieldNoteItem}
            data-stagger={Math.min(2 + idx, 4)}
          >
            <div className={styles.fieldNoteLocation}>
              <span>{note.location}</span>
              <span className={styles.fieldNoteDot} />
              <span className={styles.fieldNoteRegion}>{note.region}</span>
            </div>

            <p className={styles.fieldNoteText}>“{note.note}”</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HikingFoodPanel;
