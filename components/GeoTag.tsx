'use client';
import { MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Hardcoded coordinates for historical map immersion
const geoCoords: Record<string, string> = {
  "Atsugi": "35°27'18\"N 139°27'00\"E",
  "Kamchatka": "56°00'00\"N 159°00'00\"E",
  "Yakutat": "59°32'49\"N 139°43'38\"W",
  "Shemya": "52°43'27\"N 174°06'35\"E",
  "Whidbey Island": "48°21'00\"N 122°39'00\"W",
  "Kurile": "46°30'00\"N 151°30'00\"E"
};

export default function GeoTag({ location }: { location: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const coords = geoCoords[location] || "CLASSIFIED COORDS";

  return (
    <span 
      className="relative inline-flex items-center gap-1 text-[var(--gold)]/80 font-sans tracking-wide border-b border-dotted border-[var(--gold)]/40 cursor-crosshair hover:text-[var(--gold)] transition-colors mx-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MapPin className="w-3 h-3 text-[var(--gold)]/90" />
      {location}
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-sm glass-panel border border-[var(--gold)]/40 text-xs font-mono text-cyan-100 shadow-2xl backdrop-blur-xl bg-[#0a0d14]/95 pointer-events-none text-center"
          >
            <div className="text-[var(--gold)] mb-1 uppercase tracking-widest text-[10px]">RADAR LOCK</div>
            <div className="tracking-widest">{coords}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
