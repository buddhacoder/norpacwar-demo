'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import GlossaryHover from '@/components/GlossaryHover';

// High-definition, artistic vector carnation with stems, leaves, and intricate radial gradients.
// Darkened and bathed in warm fire-light ambiance to match the dark memorial setting.
const CarnationSVG = () => (
  <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] opacity-85 brightness-75 contrast-125 sepia-[.20]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0a1a08" />
        <stop offset="40%" stopColor="#1e3b16" />
        <stop offset="60%" stopColor="#254a1a" />
        <stop offset="100%" stopColor="#0a1a08" />
      </linearGradient>
      <radialGradient id="petalGrad1" cx="50%" cy="80%" r="80%">
        <stop offset="0%" stopColor="#2a0000" />
        <stop offset="60%" stopColor="#590000" />
        <stop offset="100%" stopColor="#8b0000" />
      </radialGradient>
      <radialGradient id="petalGrad2" cx="50%" cy="100%" r="100%">
        <stop offset="0%" stopColor="#4a0000" />
        <stop offset="70%" stopColor="#800000" />
        <stop offset="100%" stopColor="#b30000" />
      </radialGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
      </filter>
    </defs>
    
    {/* Stem */}
    <path d="M50 90 Q 55 130 40 190" fill="none" stroke="url(#stemGrad)" strokeWidth="3" strokeLinecap="round" filter="url(#shadow)" />
    
    {/* Right Leaf */}
    <path d="M51 140 Q 75 125 80 105 Q 65 135 45 150 Z" fill="url(#stemGrad)" filter="url(#shadow)" />
    
    {/* Left Leaf */}
    <path d="M47 125 Q 30 115 20 95 Q 35 125 43 133 Z" fill="url(#stemGrad)" filter="url(#shadow)" />
    
    {/* Base Calyx (green bulb) */}
    <path d="M42 85 Q 50 95 58 85 L 53 75 L 47 75 Z" fill="url(#stemGrad)" />
    
    {/* Petal Layer 1 (Back) */}
    <path d="M 40 80 Q 20 60 25 35 Q 35 45 45 30 Q 55 45 65 30 Q 75 45 75 35 Q 80 60 60 80 Z" fill="url(#petalGrad1)" filter="url(#shadow)" />
    
    {/* Petal Layer 2 (Middle) */}
    <path d="M 45 80 Q 15 65 15 45 Q 25 50 35 40 Q 40 55 50 40 Q 60 55 65 40 Q 75 50 85 45 Q 85 65 55 80 Z" fill="url(#petalGrad2)" filter="url(#shadow)" />
    
    {/* Petal Layer 3 (Inner Front) */}
    <path d="M 48 80 Q 30 70 30 55 Q 35 60 40 50 Q 50 65 60 50 Q 65 60 70 55 Q 70 70 52 80 Z" fill="#aa0000" filter="url(#shadow)" />
    
    {/* Delicate Ruffled Accents - Tinted warm for fire reflection */}
    <path d="M 35 45 Q 40 35 45 40 M 55 40 Q 60 35 65 45 M 30 55 Q 35 50 40 60" stroke="#cc4400" strokeWidth="1" fill="none" opacity="0.6" />
  </svg>
);

export default function TributeClientLayout() {
  const t = useTranslations('Tribute');
  const tRec = useTranslations('TributeRecords');
  const fallenRecords = [
    tRec('r1'), tRec('r2'), tRec('r3'), tRec('r4'), tRec('r5'),
    tRec('r6'), tRec('r7'), tRec('r8'), tRec('r9'), tRec('r10')
  ];

  const [carnations, setCarnations] = useState<any[]>([]);
  const [embers, setEmbers] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });

  const [hoveredCarnation, setHoveredCarnation] = useState<string | null>(null);
  const [currentRecordIndex, setCurrentRecordIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    
    // Pre-calculate ember physics safely on the client to avoid SSR/Framer Motion dimension bugs
    const generatedEmbers = Array.from({ length: 45 }).map(() => ({
      id: Math.random().toString(),
      startX: Math.random() * 100, // 0 to 100vw
      targetX: (Math.random() - 0.5) * 20, // drift left or right
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 5,
      size: 2 + Math.random() * 3
    }));
    setEmbers(generatedEmbers);

    fetch('/api/tribute')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCarnations(data);
      })
      .catch(err => console.error("Database sync delay", err));

    const interval = setInterval(() => {
      setCurrentRecordIndex(prev => (prev + 1) % fallenRecords.length);
    }, 8000); // 8 seconds per name in the spotlight

    return () => clearInterval(interval);
  }, []);

  const Embers = () => {
    if (!isMounted) return null;
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {embers.map((e) => (
          <motion.div
            key={e.id}
            className="absolute bottom-0 rounded-full bg-[var(--gold)]"
            style={{ 
              left: `${e.startX}%`, 
              width: e.size, 
              height: e.size,
              boxShadow: '0 0 10px 2px rgba(255, 170, 0, 0.8)'
            }}
            initial={{ y: 200, opacity: 0, x: 0 }}
            animate={{ 
              y: -1000, 
              opacity: [0, 1, 0.8, 0],
              x: `${e.targetX}vw`
            }}
            transition={{ 
              duration: e.duration, 
              repeat: Infinity, 
              delay: e.delay, 
              ease: "easeOut" 
            }}
          />
        ))}
      </div>
    );
  };

  const layCarnation = async () => {
    if (!formData.name.trim()) return;
    
    // Mathematically fan the flowers outward entirely away from the center button (40% to 60%)
    const isLeft = Math.random() > 0.5;
    const spawnX = isLeft ? 5 + Math.random() * 25 : 70 + Math.random() * 25;
    
    const newCarnation = {
      name: formData.name,
      message: formData.message,
      xLocation: spawnX,
      rotation: isLeft ? -50 - Math.random() * 30 : 50 + Math.random() * 30 // Splay heavily outward
    };

    // Optimistically update
    setCarnations(prev => [...prev, { _id: Date.now().toString(), ...newCarnation }]);
    setFormOpen(false);
    setFormData({ name: '', message: '' });

    // Sync to Sanity Backend
    await fetch('/api/tribute', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCarnation)
    });
  };

  return (
    <div className="fixed inset-0 z-40 h-[100dvh] bg-black overflow-hidden font-serif select-none flex flex-col items-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(40,15,5,0.4)_0%,black_60%)] z-0" />
      
      {/* Cinematic Volumetric Fire Simulation Base (Safari Safe) */}
      <div className="absolute inset-x-0 bottom-0 h-[60vh] z-0 pointer-events-none flex flex-row items-end overflow-hidden opacity-90">
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff2a00]/50 via-[#ff8800]/20 to-transparent" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 left-[10%] w-[500px] h-[500px] bg-[#ff3300]/50 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-32 right-[10%] w-[600px] h-[600px] bg-[#ff6600]/40 blur-[140px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }} 
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#ffaa00]/30 blur-[150px] rounded-full" 
        />
      </div>
      
      <Embers />

      <div className="relative z-30 flex flex-col h-full max-w-4xl mx-auto px-6 w-full">
        
        {/* The Eternal Flame Memorial Pillar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="pt-24 md:pt-32 pb-4 text-center z-40 relative"
        >
          <h1 className="text-[var(--gold)] tracking-[0.4em] uppercase text-xs md:text-sm font-mono mb-4">{t('inMemoriam')}</h1>
          <h2 className="text-3xl md:text-5xl text-white font-medium mb-6">{t('title')}</h2>
          <div className="h-px w-24 bg-[var(--museumRed)] mx-auto opacity-50 mb-6" />
          
          <p className="text-white/90 font-sans font-light tracking-wide max-w-2xl mx-auto text-lg md:text-xl leading-relaxed drop-shadow-md mb-6">
            {t('descriptionHook')}
          </p>
          
          <p className="text-white/80 font-sans font-light tracking-wide max-w-2xl mx-auto text-base md:text-lg leading-relaxed drop-shadow-lg">
            {t.rich('descriptionAction', {
              empire: (chunks) => <GlossaryHover term="Empire Express">{chunks}</GlossaryHover>,
              carnation: (chunks) => <GlossaryHover term="red carnation">{chunks}</GlossaryHover>
            })}
          </p>
        </motion.div>

        {/* The Fade-in Oscars-style Roll Call Spotlight */}
        <div className="absolute inset-0 pt-64 pb-48 w-full max-w-xl mx-auto pointer-events-none flex flex-col items-center justify-center z-20">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentRecordIndex}
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute w-full text-center px-4"
            >
              <div className="text-[var(--gold)] font-light tracking-[0.2em] text-3xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,200,100,0.6)] px-4 py-8 leading-snug">
                {fallenRecords[currentRecordIndex]}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* The Interactive Red Carnation Offering - Pinned absolutely to bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[30vh] min-h-[220px] w-full max-w-5xl mx-auto border-t border-[var(--museumRed)]/20 pointer-events-none z-50">
          
          {/* Stored Sanity Carnations */}
          {carnations.map((c) => {
            // Override legacy database centering to force a beautiful horizontal fanned array
            const isLeft = c.xLocation < 50;
            const forcedX = c.xLocation > 35 && c.xLocation < 65 ? (isLeft ? 15 + Math.random()*15 : 70 + Math.random()*15) : c.xLocation;
            const forcedRotation = isLeft ? -15 - Math.random() * 15 : 15 + Math.random() * 15;

            return (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
                className="absolute bottom-12 w-24 h-48 md:w-32 md:h-64 z-20 cursor-pointer pointer-events-auto"
                style={{ left: `${forcedX}%` }}
                onMouseEnter={() => setHoveredCarnation(c._id)}
                onMouseLeave={() => setHoveredCarnation(null)}
                onClick={() => setHoveredCarnation(prev => prev === c._id ? null : c._id)}
              >
                {/* Rotated Carnation Only */}
                <motion.div 
                  initial={{ rotate: forcedRotation }}
                  className="w-full h-full"
                  style={{ originX: 0.5, originY: 1 }}
                >
                  <CarnationSVG />
                </motion.div>
                
                {/* Spirited Away Ghost Whisper Label */}
                <AnimatePresence>
                  {hoveredCarnation === c._id && (
                    <motion.div 
                      key={`ghost-${c._id}`}
                      initial={{ opacity: 0, y: 0, filter: 'blur(8px)' }}
                      animate={{ 
                        opacity: [0, 0.9, 0.7, 0], 
                        y: "-100vh", 
                        x: [0, 40, -30, 20, -10], 
                        filter: ['blur(8px)', 'blur(0px)', 'blur(3px)', 'blur(15px)'],
                        scale: [0.9, 1, 1.1, 1.2]
                      }}
                      transition={{ duration: 7, ease: "easeOut", repeat: Infinity }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 w-96 pointer-events-none z-50 flex flex-col items-center justify-center gap-1"
                    >
                      <div className="text-xl md:text-2xl font-serif italic text-white/90 drop-shadow-[0_0_15px_rgba(255,100,0,0.8)] tracking-widest text-center whitespace-nowrap">
                        {c.name}
                      </div>
                      {c.message && (
                        <div className="text-sm border-t border-white/20 pt-2 font-serif italic text-white/60 drop-shadow-md text-center max-w-xs">
                          "{c.message}"
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Form UI */}
          <div className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-center pt-8">
            <AnimatePresence mode="wait">
              {!formOpen ? (
                <motion.button 
                  key="openBtn"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormOpen(true)}
                  className="px-6 py-3 md:px-8 md:py-4 pointer-events-auto border border-[var(--museumRed)]/50 text-[var(--museumRed)] hover:bg-[var(--museumRed)]/10 uppercase tracking-widest text-xs md:text-sm font-mono transition-colors bg-black/80 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                >
                  {t('leaveCarnation')}
                </motion.button>
              ) : (
              <motion.div 
                key="formBox"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="relative z-40 w-full max-w-sm mx-auto glass-panel p-6 border border-[var(--museumRed)]/30 backdrop-blur-xl bg-black/80 pointer-events-auto max-h-[90%] overflow-y-auto"
              >
                <div className="text-[var(--gold)] font-mono text-xs uppercase tracking-widest mb-4">{t('visitorLog')}</div>
                <input 
                  type="text" 
                  placeholder={t('namePlaceholder')}
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 mb-3 font-sans text-sm focus:outline-none focus:border-[var(--museumRed)]/50"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  maxLength={40}
                />
                <textarea 
                  placeholder={t('messagePlaceholder')}
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 mb-4 font-sans text-sm h-16 resize-none focus:outline-none focus:border-[var(--museumRed)]/50"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  maxLength={100}
                />
                <div className="flex gap-2">
                  <button onClick={() => setFormOpen(false)} className="flex-1 py-2 text-xs font-mono text-gray-400 hover:text-white transition-colors">{t('cancel')}</button>
                  <button onClick={layCarnation} disabled={!formData.name} className="flex-1 py-2 text-xs font-mono bg-[var(--museumRed)]/20 text-[var(--museumRed)] hover:bg-[var(--museumRed)]/40 transition-colors border border-[var(--museumRed)]/50 disabled:opacity-50">{t('placeFlower')}</button>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
          
          <div className="absolute bottom-2 md:bottom-4 inset-x-0 text-center text-[10px] md:text-xs text-[#ff5500]/60 font-mono uppercase tracking-widest pointer-events-none">
            {carnations.length > 0 ? t('carnationsLaid', { count: carnations.length * 2 }) : t('payRespects')}
          </div>
        </div>
      </div>
    </div>
  );
}
