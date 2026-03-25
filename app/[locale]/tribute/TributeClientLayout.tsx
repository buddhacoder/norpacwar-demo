'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const fallenRecords = [
  "Crew of PV-1 Ventura #34582 - Lost in Fog, Paramushiro",
  "Lt. Cmdr. William Jones - Action over Kiska",
  "Ens. Robert Smith - Williwaw strike off Adak coast",
  "PBY Catalina Crew #9 - Night patrol disappearance",
  "Sgt. Mikhail Ivanov - Kuril Landing Force",
  "Cpt. James Rockford - Dutch Harbor Defense",
  "Sub-Lt. Alexei Volkov - Air combat over Shumshu",
  "Crew of B-24 Liberator #41-237 - Missing Presumed Dead",
  "Pvt. Thomas McKelvey - Attu Ridge assault",
  "Unidentified Soviet Aviator - North Pacific Sea"
];

export default function TributeClientLayout() {
  const [carnations, setCarnations] = useState<{ id: number, x: number, r: number }[]>([]);

  // Simple particle system for the Eternal Flame embers
  const Embers = () => {
    return (
      <div className="absolute inset-x-0 bottom-0 h-96 pointer-events-none overflow-hidden z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-1.5 h-1.5 bg-[var(--gold)] rounded-full shadow-[0_0_10px_var(--gold)]"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: 50, 
              opacity: 0 
            }}
            animate={{ 
              y: -500 - Math.random() * 200, 
              opacity: [0, 1, 0],
              x: `calc(${Math.random() * 100}% + ${Math.random() * 40 - 20}px)` 
            }}
            transition={{ 
              duration: 3 + Math.random() * 4, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    );
  };

  const layCarnation = () => {
    if (carnations.length > 50) return; // limit to prevent DOM overload
    const newCarnation = {
      id: Date.now(),
      x: 30 + Math.random() * 40, // percentage x between 30 and 70
      r: -30 + Math.random() * 60 // rotation angle
    };
    setCarnations([...carnations, newCarnation]);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden pt-32 pb-48 font-serif select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(40,15,5,0.4)_0%,black_60%)] z-0" />
      <Embers />

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        
        {/* The Eternal Flame Memorial Pillar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="mb-16"
        >
          <h1 className="text-[var(--gold)] tracking-[0.4em] uppercase text-sm md:text-base font-mono mb-6">In Memoriam</h1>
          <h2 className="text-4xl md:text-6xl text-white font-medium mb-8">The Eternal Flame</h2>
          <div className="h-px w-24 bg-[var(--museumRed)] mx-auto opacity-50 mb-8" />
          
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            In Russian tradition, the memory of the fallen is guarded by the <em>Вечный огонь</em> (Eternal Flame) and the offering of two red carnations—a symbol of blood shed and unending grief. We honor all those lost to the freezing fog of the North Pacific.
          </p>
        </motion.div>

        {/* The Slow Scrolling Oscars-style Roll Call */}
        <div className="relative h-96 w-full max-w-lg mx-auto overflow-hidden mt-16 mb-24 border-y border-white/5 mask-image-vertical">
          <motion.div 
            animate={{ y: ["100%", "-100%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-full space-y-8 text-center"
          >
            {fallenRecords.map((record, i) => (
              <div key={i} className="text-gray-300 font-light tracking-wide text-lg md:text-xl opacity-80">
                {record}
              </div>
            ))}
          </motion.div>
          {/* Top/Bottom Fade mask via CSS */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        {/* The Interactive Red Carnation Offering */}
        <div className="relative pt-12">
          {carnations.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: -50, rotate: c.r }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-32 w-12 h-12 text-[var(--museumRed)] z-30 drop-shadow-lg"
              style={{ left: `${c.x}%` }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-90"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </motion.div>
          ))}

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={layCarnation}
            className="relative z-40 px-8 py-4 border border-[var(--museumRed)]/50 text-[var(--museumRed)] hover:bg-[var(--museumRed)]/10 uppercase tracking-widest text-sm font-mono transition-colors"
          >
            Leave a Red Carnation
          </motion.button>
          
          <div className="mt-8 text-xs text-gray-500 font-mono uppercase tracking-widest">
            {carnations.length > 0 ? `${carnations.length * 2} Carnations placed globally` : "Pay your respects"}
          </div>
        </div>

      </div>
    </div>
  );
}
