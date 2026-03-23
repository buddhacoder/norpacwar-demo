'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  { ru: "Ни шагу назад!", en: "Not a step back!", author: "Stalin's Order No. 227" },
  { ru: "Туман был нашим злейшим врагом.", en: "The fog was our worst enemy.", author: "Aleutian Veteran" },
  { ru: "Мы знали, что они там.", en: "We knew they were there.", author: "Silent Patrol" },
  { ru: "Холод пронизывал до костей, но мы продолжали лететь.", en: "The cold pierced our bones, but we kept flying.", author: "PBY Pilot" },
  { ru: "Только море и небо помнят их имена.", en: "Only the sea and sky remember their names.", author: "Unknown" },
];

export default function CyrillicGhostQuotes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 15000); // cycle every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center overflow-hidden opacity-30">
      <AnimatePresence mode="wait">
        <motion.div
           key={index}
           initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
           animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
           exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
           transition={{ duration: 6, ease: "easeInOut" }}
           className="text-center absolute w-full flex flex-col items-center justify-center translate-y-20 selection:bg-transparent"
        >
          <div className="text-5xl md:text-8xl text-white font-serif tracking-[0.1em] text-center max-w-[90vw] leading-tight mb-6 px-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            {quotes[index].ru}
          </div>
          <div className="text-lg md:text-2xl text-white font-serif italic tracking-widest opacity-70 px-4 text-center max-w-[80vw]">
            "{quotes[index].en}"
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
