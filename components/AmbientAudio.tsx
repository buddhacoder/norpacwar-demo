'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Tchaikovsky - Symphony No 6 (Pathetique) - IV. Finale Adagio lamentoso. Exceptionally haunting and public domain via Musopen (Wikimedia).
  const bgAudioUrl = "https://upload.wikimedia.org/wikipedia/commons/b/b4/Tchaikovsky_-_Symphony_No_6_in_B_minor%2C_Op_74_%28Pathetique%29_-_IV._Finale._Adagio_lamentoso_-_Andante_%28Musopen%29.ogg";

  // The browser prevents autoplay without interaction. 
  // The toggle allows them to start the cinematic experience deliberately.
  
  const togglePlay = () => {
    if(!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={bgAudioUrl} 
        loop
        preload="auto"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="fixed bottom-6 left-6 z-50 glass-panel p-4 rounded-full border border-white/10 hover:border-[var(--gold)]/50 transition-colors flex items-center justify-center group shadow-2xl overflow-hidden"
        title="Toggle Historical Soundtrack"
      >
        <div className={`absolute inset-0 bg-gradient-to-tr from-[var(--gold)]/20 to-transparent ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : 'opacity-0'} transition-opacity pointer-events-none`} />
        
        <svg 
          width="24" height="24" viewBox="0 0 24 24" 
          fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
          className={`text-[var(--gold)] group-hover:text-white transition-colors relative z-10`}
        >
          {isPlaying ? (
            <>
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </>
          ) : (
            <>
               <path d="M9 18V5l12-2v13" opacity="0.3"></path>
               <circle cx="6" cy="18" r="3" opacity="0.3"></circle>
               <circle cx="18" cy="16" r="3" opacity="0.3"></circle>
               <line x1="2" y1="2" x2="22" y2="22" className="text-red-500"></line>
            </>
          )}
        </svg>
      </motion.button>
    </>
  );
}
