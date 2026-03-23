'use client';
import { useEffect } from 'react';

export default function HapticsProvider() {
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If click target is inside a button, link, or interactive element
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          // Double 'heartbeat' shudder
          navigator.vibrate([15, 30, 15]);
        }
      }
    };
    
    document.body.addEventListener('click', handleGlobalClick);
    return () => document.body.removeEventListener('click', handleGlobalClick);
  }, []);

  return null;
}
