import React from 'react';
import { CONTENT } from '@/data/content';
import { Tv, Play, BookOpen, Film, ExternalLink } from 'lucide-react';
import styles from '../styles/left-column.module.css';

export const UnsaidMomentsPanel: React.FC = () => {
  const data = CONTENT.levels.L144;

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

      <div className={styles.unsaidExcerpt} data-stagger="3">
        <p className={styles.unsaidExcerptText}>“{data.excerpt}”</p>
      </div>

      <div className={styles.essayLinkRow} data-stagger="3">
        <a
          href={data.essayLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.substackBtn}
        >
          <Tv className="w-3.5 h-3.5 text-[#E8A64A]" />
          <span>{data.essayLink.label}</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      <div className={styles.unsaidContactBlock} data-stagger="4">
        <span className={styles.unsaidContactHeader}>OFFICIAL SERIES & LORE</span>
        <div className={styles.unsaidSocialGrid}>
          {data.contact.socials.map((social) => {
            const isExternal = social.href.startsWith('http');
            return (
              <a
                key={social.platform}
                href={social.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={styles.unsaidSocialLink}
              >
                <span>{social.label}</span>
                {social.platform === 'Apple TV+' && <Tv className="w-3.5 h-3.5 text-[#E8A64A]" />}
                {social.platform === 'Trailer' && <Play className="w-3.5 h-3.5 opacity-80" />}
                {social.platform === 'Book' && <BookOpen className="w-3.5 h-3.5 opacity-80" />}
                {social.platform === 'IMDb' && <Film className="w-3.5 h-3.5 opacity-80" />}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UnsaidMomentsPanel;
