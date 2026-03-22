'use client';

import { motion } from 'framer-motion';

export default function Aircraft() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Aircraft & Machines</h1>
        <div className="h-1 w-24 bg-gold mb-12"></div>
        
        <p className="text-lg text-gray-300 max-w-3xl leading-relaxed mb-16 font-light">
          The war in the Aleutians was a technological crucible. Aircraft were subjected to extreme weather - icing, violent downdrafts, and impenetrable fog. Explore the primary warbirds that flew the North Pacific Skies.
        </p>

        <div className="flex flex-col gap-12">
          
          <div className="glass-panel p-8 rounded-sm grid md:grid-cols-2 gap-8 items-center border border-white/5">
            <div>
              <h3 className="text-3xl text-gold font-serif mb-4">PV-1 Ventura</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-4">
                The Lockheed PV-1 Ventura was the backbone of the US Navy's bombing squadrons in the Aleutians. Rugged, fast, and heavily armed, it served not only as a patrol bomber but as a strike aircraft against the Japanese home islands.
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mt-6">
                <li>• Operated extensively by VB/VPB-135, 136, and 139.</li>
                <li>• Specialized in low-level maritime strikes.</li>
                <li>• Subjected to unique "Aleutian Painting Schemes".</li>
              </ul>
            </div>
            <div className="h-64 w-full bg-gradient-to-br from-gray-800 to-black border border-white/10 rounded-sm flex items-center justify-center">
              <span className="text-gray-600 font-serif italic text-sm">PV-1 Schematic Archive</span>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-sm grid md:grid-cols-2 gap-8 items-center border border-white/5">
            <div className="order-2 md:order-1 h-64 w-full bg-gradient-to-br from-gray-800 to-black border border-white/10 rounded-sm flex items-center justify-center">
              <span className="text-gray-600 font-serif italic text-sm">Consolidated PBY Catalina Archive</span>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-3xl text-gold font-serif mb-4">PBY Catalina</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-4">
                The iconic flying boats were the unsung heroes of the early campaign. They conducted reconnaissance in zero-visibility conditions, rescued downed aircrews from freezing waters, and even flew strike missions.
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mt-6">
                <li>• Known as the "P-Boats" by their crews.</li>
                <li>• Flown by VP-41, VP-42, and VP-43 in the early months.</li>
              </ul>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
