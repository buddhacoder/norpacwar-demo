'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

export default function ArchivalLens({ 
  translatedHtml, 
  originalHtml,
  overlayText = "HOLD TO REVEAL ORIGINAL"
}: { 
  translatedHtml: string, 
  originalHtml: string,
  overlayText?: string
}) {
  const [isRevealing, setIsRevealing] = useState(false);

  return (
    <div className="relative group mt-4">
      {/* Action Button */}
      <div className="absolute -top-12 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onMouseDown={() => {
            setIsRevealing(true);
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
          }}
          onMouseUp={() => setIsRevealing(false)}
          onMouseLeave={() => setIsRevealing(false)}
          onTouchStart={(e) => {
            e.preventDefault(); // Prevents scroll blocking
            setIsRevealing(true);
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
          }}
          onTouchEnd={() => setIsRevealing(false)}
          className="bg-white/5 border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-mono tracking-widest px-4 py-2 flex items-center gap-2 hover:bg-[var(--gold)] hover:text-black transition-colors"
        >
          <Search className="w-3 h-3" />
          {overlayText}
        </button>
      </div>

      {/* The Lens Container */}
      <div className="relative overflow-hidden rounded-sm min-h-[100px]">
        <AnimatePresence mode="wait">
          {!isRevealing ? (
            <motion.div
              key="translated"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
              className="prose prose-invert max-w-none text-gray-300 leading-relaxed font-serif"
              dangerouslySetInnerHTML={{ __html: translatedHtml }}
            />
          ) : (
            <motion.div
              key="original"
              initial={{ opacity: 0, filter: "sepia(100%) blur(4px)" }}
              animate={{ opacity: 1, filter: "sepia(50%) blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
              className="prose prose-invert max-w-none text-amber-100/70 leading-relaxed font-mono tracking-tighter mix-blend-screen bg-black/40 p-4 rounded-md border border-white/10"
              style={{ fontFamily: '"Courier Prime", "Courier New", monospace' }}
              dangerouslySetInnerHTML={{ __html: originalHtml }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
