"use client";

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AuthForm.module.css';

export default function ModalShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={handleClose} role="dialog" aria-modal="true">
      <div 
        className={styles.modalContainer} 
        onClick={(e) => e.stopPropagation()} 
        ref={modalRef}
      >
        <button 
          className={styles.closeButton} 
          onClick={handleClose} 
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
