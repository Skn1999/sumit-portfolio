import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useSpiralStore } from '../../lib/store';
import styles from '../styles/stage.module.css';

export interface BackButtonHandle {
  setOpacity: (opacity: number) => void;
}

export interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export const BackButton = forwardRef<BackButtonHandle, BackButtonProps>(
  ({ onClick, className }, ref) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const mode = useSpiralStore((s) => s.mode);

    useImperativeHandle(ref, () => ({
      setOpacity: (opacity: number) => {
        if (btnRef.current) {
          btnRef.current.style.opacity = String(opacity);
          btnRef.current.style.pointerEvents = opacity > 0.01 ? 'auto' : 'none';
        }
      },
    }));

    if (mode === 'A') {
      return null;
    }

    return (
      <button
        ref={btnRef}
        type="button"
        className={`${styles.backButton} ${className || ''}`}
        onClick={onClick}
        aria-label="Back to drawing"
      >
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Back to drawing</span>
      </button>
    );
  }
);

BackButton.displayName = 'BackButton';
