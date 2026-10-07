import React from 'react';
import { CONTENT } from '../data/content';
import { ArrowUp, Tv, Play, BookOpen, Film, ExternalLink } from 'lucide-react';
import styles from './styles/outro.module.css';

interface OutroFooterProps {
  onBackToTop: () => void;
}

export const OutroFooter: React.FC<OutroFooterProps> = ({ onBackToTop }) => {
  const contact = CONTENT.contact || CONTENT.levels?.L144?.contact;

  return (
    <footer id="outro" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <span className={styles.eyebrow}>APPLE TV+ ORIGINAL SERIES</span>
            <h2 className={styles.title}>The truth will surface.</h2>
            <p className={styles.description}>
              Stream all episodes of SILO exclusively on Apple TV+. Journey 144 levels deep into the subterranean earth and uncover the secrets keeping ten thousand citizens alive in the dark.
            </p>

            <div className={styles.contactRow}>
              <a
                href="https://tv.apple.com/us/show/silo/umc.cmc.3yksgc857px0k0rqe5zd4jice"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.emailBadge}
              >
                <Tv className="w-3.5 h-3.5 text-[#E8A64A]" />
                <span>Watch SILO on Apple TV+</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.socialGrid}>
              {(contact.socials || []).map((social) => {
                const isExternal = social.href.startsWith('http');
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className={styles.socialLink}
                  >
                    <span className={styles.socialName}>{social.label}</span>
                    {social.platform === 'Apple TV+' && <Tv className="w-3.5 h-3.5 text-[#E8A64A]" />}
                    {social.platform === 'Trailer' && <Play className="w-3.5 h-3.5 opacity-70" />}
                    {social.platform === 'Book' && <BookOpen className="w-3.5 h-3.5 opacity-70" />}
                    {social.platform === 'IMDb' && <Film className="w-3.5 h-3.5 opacity-70" />}
                  </a>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onBackToTop}
              className={styles.backToTopBtn}
              aria-label="Back to The Up Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to The Up Top</span>
            </button>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span className={styles.location}>Apple Original Series · Created by Graham Yost · Based on WOOL by Hugh Howey</span>
          <span className={styles.copyright}>Interactive Silo Experience for Portfolio Labs</span>
        </div>
      </div>
    </footer>
  );
};

export default OutroFooter;
