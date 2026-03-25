'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const dictionary: Record<string, string> = {
  "Empire Express": "The unofficial name for the grueling American bombing missions originating from the Aleutians, targeting the Japanese naval bases in the Kuril Islands.",
  "williwaw": "Sudden, violently destructive freezing squalls descending from snow-covered mountains, capable of flipping an aircraft mid-flight.",
  "PV-1 Venturas": "A twin-engine American patrol bomber known for its speed and heavy armament, utilized effectively in the extreme weather of the Aleutian campaign.",
  "PBY Catalinas": "A slow, durable American flying boat used heavily for search operations, rescue, and anti-submarine warfare.",
  "Dutch Harbor": "An American naval operating base in the Aleutian Islands, heavily bombed by the Japanese carrier strike force in June 1942.",
};

export default function GlossaryHover({ term, children }: { term: string, children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const definition = dictionary[term];

  return (
    <span 
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="border-b-[1.5px] border-dotted border-[var(--gold)]/60 text-[var(--gold)]/90 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors">
        {children}
      </span>
      
      <AnimatePresence>
        {isHovered && definition && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 rounded-sm glass-panel border-l-2 border-[var(--gold)] text-sm font-sans text-gray-200 shadow-2xl backdrop-blur-xl bg-[#0a0d14]/95 pointer-events-none"
          >
            <strong className="block text-[var(--gold)] font-mono tracking-wider text-xs mb-1 uppercase">{term}</strong>
            {definition}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
