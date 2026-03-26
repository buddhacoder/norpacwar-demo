'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

import { useTranslations } from 'next-intl';

// Stylized realistic carnation overlapping SVG paths
const CarnationSVG = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-90 drop-shadow-xl saturate-150">
    <path d="M50 85 C 40 100, 60 100, 50 85 C 30 75, 70 75, 50 85 Z" className="text-green-800" />
    <path d="M50 15 C 60 5, 80 5, 80 20 C 80 25, 65 30, 50 35 C 35 30, 20 25, 20 20 C 20 5, 40 5, 50 15 Z" className="text-red-700" />
    <path d="M50 25 C 70 10, 95 15, 90 35 C 85 45, 65 45, 50 50 C 35 45, 15 45, 10 35 C 5 15, 30 10, 50 25 Z" className="text-red-600" />
    <path d="M50 40 C 75 25, 105 40, 90 65 C 80 75, 60 70, 50 75 C 40 70, 20 75, 10 65 C -5 40, 25 25, 50 40 Z" className="text-red-500" />
    <path d="M50 55 C 80 45, 100 65, 80 85 C 65 95, 55 85, 50 90 C 45 85, 35 95, 20 85 C 0 65, 20 45, 50 55 Z" className="text-red-600" />
    <path d="M50 75 C 65 65, 85 85, 65 100 C 55 105, 50 95, 50 95 C 50 95, 45 105, 35 100 C 15 85, 35 65, 50 75 Z" className="text-red-700" />
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
  const [isMounted, setIsMounted] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });

  useEffect(() => {
    setIsMounted(true);
    fetch('/api/tribute')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCarnations(data);
      })
      .catch(err => console.error("Database sync delay", err));
  }, []);

  const Embers = () => {
    if (!isMounted) return null;
    return (
      <div className="absolute inset-x-0 bottom-0 h-96 pointer-events-none overflow-hidden z-10">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-1.5 h-1.5 bg-[var(--gold)] rounded-full shadow-[0_0_15px_var(--gold)]"
            initial={{ x: `${Math.random() * 100}%`, y: 100, opacity: 0 }}
            animate={{ 
              y: -800 - Math.random() * 400, 
              opacity: [0, 1, 0.8, 0],
              x: `calc(${Math.random() * 100}% + ${Math.random() * 60 - 30}px)` 
            }}
            transition={{ duration: 4 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5, ease: "easeOut" }}
          />
        ))}
      </div>
    );
  };

  const layCarnation = async () => {
    if (!formData.name.trim()) return;
    const newCarnation = {
      name: formData.name,
      message: formData.message,
      xLocation: 20 + Math.random() * 60,
      rotation: -45 + Math.random() * 90
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
    <div className="relative min-h-screen bg-black overflow-hidden pt-32 pb-48 font-serif select-none flex flex-col items-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(40,15,5,0.4)_0%,black_60%)] z-0" />
      
      {/* Flickering Fire Base Simulation */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[var(--museumRed)]/30 via-[var(--gold)]/10 to-transparent mix-blend-screen opacity-80 animate-pulse pointer-events-none z-0" />
      <Embers />

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center w-full">
        
        {/* The Eternal Flame Memorial Pillar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="mb-16"
        >
          <h1 className="text-[var(--gold)] tracking-[0.4em] uppercase text-sm md:text-base font-mono mb-6">{t('inMemoriam')}</h1>
          <h2 className="text-4xl md:text-6xl text-white font-medium mb-8">{t('title')}</h2>
          <div className="h-px w-24 bg-[var(--museumRed)] mx-auto opacity-50 mb-8" />
          
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: t('description') }} />
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
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        {/* The Interactive Red Carnation Offering */}
        <div className="relative pt-12 min-h-[30vh] w-full max-w-2xl mx-auto border-t border-[var(--museumRed)]/20">
          
          {/* Stored Sanity Carnations */}
          {carnations.map((c) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, y: -50, rotate: c.rotation }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-16 w-16 h-16 text-[var(--museumRed)] z-30 group cursor-pointer"
              style={{ left: `${c.xLocation}%` }}
            >
              <CarnationSVG />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 border border-[var(--gold)]/30 p-3 rounded-sm text-xs font-mono text-white shadow-2xl pointer-events-none z-50">
                <div className="text-[var(--gold)] font-bold mb-1">{c.name}</div>
                {c.message && <div className="text-gray-400 italic break-words">"{c.message}"</div>}
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {!formOpen ? (
              <motion.button 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFormOpen(true)}
                className="relative z-40 px-8 py-4 border border-[var(--museumRed)]/50 text-[var(--museumRed)] hover:bg-[var(--museumRed)]/10 uppercase tracking-widest text-sm font-mono transition-colors mx-auto mt-24 bg-black/50 backdrop-blur-sm"
              >
                {t('leaveCarnation')}
              </motion.button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="relative z-40 max-w-sm mx-auto mt-16 glass-panel p-6 border border-[var(--museumRed)]/30 backdrop-blur-xl bg-black/80"
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
          
          <div className="absolute bottom-0 inset-x-0 text-center text-xs text-gray-600 font-mono uppercase tracking-widest">
            {carnations.length > 0 ? t('carnationsLaid', { count: carnations.length * 2 }) : t('payRespects')}
          </div>
        </div>

      </div>
    </div>
  );
}
