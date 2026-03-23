'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, SkipForward, Music, Radio } from 'lucide-react';

const radioBroadcastUrl = "https://upload.wikimedia.org/wikipedia/commons/8/87/Levitan_-_Act_of_Military_Surrender_of_Germany_%28May_8%2C_1945%29.ogg";

// You will replace these URLs with the generated Suno audio files.
// Next.js layout.tsx keeps this component mounted constantly, so music NEVER stops or resets when clicking between pages.
const playlist = [
  { id: 1, title: "Холодный ветер над заливом", url: "/audio/Холодный ветер над заливом (The Gathering Storm).mp3" },
  { id: 2, title: "Письмо домой", url: "/audio/Письмо домой (The Letter Home).mp3" },
  { id: 3, title: "Двигатель Имперского Экспресса", url: "/audio/Двигатель Имперского Экспресса (The Engine of the Empire Express).mp3" },
  { id: 4, title: "Нулевая видимость (The Aftermath)", url: "/audio/Нулевая видимость (The Aftermath).mp3" },
  { id: 5, title: "Книга почёта (Roll of Honor)", url: "/audio/Книга почёта (Roll of Honor).mp3" }
];

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const stopAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset to beginning
    setIsPlaying(false);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  // Only handle loading a new track when the index changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying && playlist[currentTrackIndex]?.url) {
        audioRef.current.play().catch(e => {
          console.warn("Audio play blocked by browser:", e);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrackIndex]);

  // Handle play/pause toggling separately to avoid redundant load() calls
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.warn("Audio play blocked by browser:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div 
      className="fixed bottom-6 left-6 z-50 flex items-end gap-2"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* 
        Hidden audio element. 
        onEnded={nextTrack} automatically plays the next song in the array when one finishes!
      */}
      <audio 
        ref={audioRef} 
        src={playlist[currentTrackIndex].url}
        onEnded={nextTrack}
        preload="auto"
      />

      {/* WWII Radio Broadcast Element */}
      <audio 
        ref={radioRef} 
        src={radioBroadcastUrl}
        preload="none"
      />

      {/* Main Music Icon Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="glass-panel p-4 rounded-full border border-white/10 hover:border-[var(--gold)]/50 transition-colors flex items-center justify-center group shadow-2xl relative overflow-hidden"
        title="Historical Soundtrack Controls"
      >
        <div className={`absolute inset-0 bg-gradient-to-tr from-[var(--gold)]/20 to-transparent ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : 'opacity-0'} transition-opacity pointer-events-none`} />
        {isPlaying ? <Music className="w-6 h-6 text-[var(--gold)] relative z-10 animate-pulse" /> : <Music className="w-6 h-6 text-gray-500 relative z-10" />}
      </motion.button>

      {/* Slide-out Player Controls */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass-panel py-3 px-5 rounded-full border border-white/10 flex items-center gap-4 shadow-2xl mb-1 ml-1"
          >
             <div className="text-xs font-mono text-[var(--gold)] mr-2 max-w-[150px] truncate tracking-wider">
               {playlist[currentTrackIndex].title}
             </div>
             
             <button onClick={togglePlay} className="text-gray-400 hover:text-white transition-colors" title={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
             </button>
             
             <button onClick={stopAudio} className="text-gray-400 hover:text-white transition-colors" title="Stop">
                <Square className="w-4 h-4 fill-current" />
             </button>
             
             <button onClick={nextTrack} className="text-gray-400 hover:text-white transition-colors" title="Skip to Next Track">
                <SkipForward className="w-5 h-5 fill-current" />
             </button>

             <div className="w-px h-6 bg-white/20 mx-1"></div>

             <button 
               onClick={toggleRadio} 
               className={`${isRadioPlaying ? 'text-red-500 animate-pulse' : 'text-gray-400'} hover:text-red-400 transition-colors relative group`} 
               title="Listen to Authentic 1945 Yuri Levitan Radio Broadcast"
             >
                <Radio className="w-5 h-5" />
                {isRadioPlaying && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>}
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
