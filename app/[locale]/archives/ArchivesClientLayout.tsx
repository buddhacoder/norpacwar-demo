'use client';

import { motion } from 'framer-motion';
import { ArchiveSearch, Article } from '@/components/ArchiveSearch';

export default function ArchivesClientLayout({ articles }: { articles: Article[] }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Archival Diaries</h1>
        <div className="h-1 w-24 bg-[var(--gold)] mb-10"></div>
        
        <div className="max-w-3xl mb-16">
          <ArchiveSearch articles={articles} />
          <p className="text-lg text-gray-300 leading-relaxed font-light mt-8">
            Primary sources, from combat diaries to casualty records, provide an unstinting look into the human cost and the daily reality of the North Pacific theatre. Explore the preserved documents of the Allied and Japanese forces.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl text-[var(--gold)] font-serif border-b border-white/10 pb-4">Personal Accounts</h3>
            
            <div className="glass-panel p-6 rounded-sm border-l-4 border-[var(--gold)] bg-gradient-to-r from-white/5 to-transparent">
              <h4 className="text-lg text-white font-medium mb-2">Thomas "Bob" McKelvey</h4>
              <p className="text-gray-400 font-light text-sm italic mb-4">
                "The fog didn't just hide the land; it became the land. You flew on instruments and trust."
              </p>
              <div className="text-xs text-[var(--gold)] uppercase tracking-wider font-semibold hover:underline cursor-pointer">Read Full Diary →</div>
            </div>

            <div className="glass-panel p-6 rounded-sm border-l-4 border-[var(--gold)] bg-gradient-to-r from-white/5 to-transparent">
              <h4 className="text-lg text-white font-medium mb-2">Lewis "Pat" Patteson</h4>
              <p className="text-gray-400 font-light text-sm italic mb-4">
                "We knew the Japanese were there, but the weather was our worst enemy..."
              </p>
              <div className="text-xs text-[var(--gold)] uppercase tracking-wider font-semibold hover:underline cursor-pointer">Read Full Diary →</div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-2xl text-[var(--museumRed)] font-serif border-b border-white/10 pb-4">Loss Records</h3>
            
            <div className="glass-panel p-6 rounded-sm hover:bg-white/5 transition-colors cursor-pointer border border-white/5 hover:border-[var(--museumRed)]/30">
              <h4 className="text-lg text-white font-medium mb-2">PV-1 Ventura Losses</h4>
              <p className="text-gray-400 font-light text-sm mb-4">
                Detailed records of PV-1 aircraft lost in the North Pacific Theater due to combat and weather.
              </p>
              <div className="text-xs text-[var(--museumRed)] uppercase tracking-wider font-semibold">View Records →</div>
            </div>

            <div className="glass-panel p-6 rounded-sm hover:bg-white/5 transition-colors cursor-pointer border border-white/5 hover:border-[var(--museumRed)]/30">
              <h4 className="text-lg text-white font-medium mb-2">Allied & Japanese Aircraft Losses</h4>
              <p className="text-gray-400 font-light text-sm mb-4">
                Comprehensive database of downed aircraft from both sides of the conflict.
              </p>
              <div className="text-xs text-[var(--museumRed)] uppercase tracking-wider font-semibold">View Database →</div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
