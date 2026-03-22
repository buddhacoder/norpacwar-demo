'use client';

import { motion } from 'framer-motion';
import { ExhibitCard } from '../components/ExhibitCard';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-wide drop-shadow-md glow-text">
          NORTH PACIFIC SKIES
        </h1>
        <h2 className="text-xl md:text-2xl text-gold font-light mb-8 font-serif italic drop-shadow">
          People and Machines
        </h2>
        
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12 font-light">
          A historical archive honoring the American, Japanese, and Soviet forces of the Aleutian and Kurile Campaigns. Discover the men, the aircraft, and the grueling operations in one of the most forgotten theaters of World War II.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-museumRed/90 hover:bg-museumRed text-white tracking-widest text-sm font-semibold rounded-sm border border-red-500/30 transition-all shadow-[0_0_15px_rgba(139,0,0,0.5)]"
          >
            ENTER THE EXHIBITION
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass-panel text-white tracking-widest text-sm font-semibold rounded-sm transition-all hover:bg-white/10"
          >
            ВОЙТИ В МУЗЕЙ (RU)
          </motion.button>
        </div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
        >
          <ExhibitCard 
            title="The Campaigns" 
            description="Explore the strategic battles of Dutch Harbor, the Aleutian Campaign, and Kurile Operations." 
            link="/campaigns" 
          />
          <ExhibitCard 
            title="Men & Units" 
            description="Examine the detailed records of US, Japanese, and Soviet squadrons deployed." 
            link="/units" 
          />
          <ExhibitCard 
            title="Aircraft & Machines" 
            description="Technical schematics and historical painting schemes, including the PV-1 Venturas." 
            link="/aircraft" 
          />
          <ExhibitCard 
            title="Archival Diaries" 
            description="First-hand accounts, combat reports, and meticulously preserved casualty records." 
            link="/archives" 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
