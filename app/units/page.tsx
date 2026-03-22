'use client';

import { motion } from 'framer-motion';

export default function Units() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">The Men & Units</h1>
        <div className="h-1 w-24 bg-gold mb-12"></div>
        
        <p className="text-lg text-gray-300 max-w-3xl leading-relaxed mb-16 font-light">
          The true story of the North Pacific Skies is written by the aviators and support staff who braved freezing fogs, mechanical failures, and fierce opponents. The records of these squadrons stand as testaments to endurance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="glass-panel p-8 rounded-sm hover:-translate-y-1 transition-transform border border-white/5 hover:border-gold/30">
            <h3 className="text-2xl text-gold font-serif mb-2">USN Air Units</h3>
            <p className="text-sm text-gray-400 mb-6 font-semibold tracking-wider">BOMBING SQUADRONS</p>
            <ul className="text-gray-300 font-light space-y-3">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold"></span> VB/VPB-135 (1st & 2nd Tours)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold"></span> VB/VPB-136</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold"></span> VB/VPB-139</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold"></span> VP-41, VP-42, VP-43, VP-45</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold"></span> VP-61, VP-62</li>
            </ul>
          </div>

          <div className="glass-panel p-8 rounded-sm hover:-translate-y-1 transition-transform border border-white/5 hover:border-gold/30">
            <h3 className="text-2xl text-gold font-serif mb-2">USAAF Units</h3>
            <p className="text-sm text-gray-400 mb-6 font-semibold tracking-wider">ARMY AIR FORCES</p>
            <ul className="text-gray-300 font-light space-y-3">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> 404 Bombardment Squadron (Heavy)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Bomber Squadron 77 (Medium)</li>
            </ul>
            <div className="mt-8 opacity-70 italic text-sm text-gray-500 text-center border-t border-white/10 pt-4">
              "They flew in conditions where the sea and sky merged into one icy gray wall."
            </div>
          </div>

          <div className="glass-panel p-8 rounded-sm hover:-translate-y-1 transition-transform border border-white/5 hover:border-museumRed/30">
            <h3 className="text-2xl text-museumRed font-serif mb-2">Japanese Air Units</h3>
            <p className="text-sm text-gray-400 mb-6 font-semibold tracking-wider">IMPERIAL FORCES</p>
            <ul className="text-gray-300 font-light space-y-3">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-museumRed"></span> IJNAF Units (Naval Air Force)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-museumRed"></span> IJAAF Units (Army Air Force)</li>
            </ul>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
