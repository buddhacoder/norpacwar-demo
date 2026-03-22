'use client';

import { motion } from 'framer-motion';

export default function Campaigns() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">The Campaigns</h1>
        <div className="h-1 w-24 bg-gold mb-12"></div>
        
        <p className="text-lg text-gray-300 max-w-3xl leading-relaxed mb-16 font-light">
          The operations in the North Pacific were characterized by brutal weather, long distances, and fierce combat. From the surprise attack on Dutch Harbor to the final landings in the Kurile Islands, discover the timeline of the campaigns.
        </p>

        <div className="space-y-12 border-l-2 border-white/10 pl-8 ml-4 relative">
          
          <div className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-gold border-4 border-background"></div>
            <h3 className="text-xl text-gold font-serif font-medium mb-1">June 1942: The Dutch Harbor Attack</h3>
            <p className="text-gray-400 font-light leading-relaxed mb-4">
              Japanese carrier forces launch a surprise diversionary attack on the U.S. naval base at Dutch Harbor, marking the beginning of the Aleutian Campaign.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-gold border-4 border-background opacity-75"></div>
            <h3 className="text-xl text-gold font-serif font-medium mb-1">1942-1943: The Aleutian Campaign</h3>
            <p className="text-gray-400 font-light leading-relaxed mb-4">
              The grueling island-hopping struggle to reclaim Attu and Kiska from Japanese forces amidst some of the world's most treacherous weather conditions.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-museumRed border-4 border-background"></div>
            <h3 className="text-xl text-museumRed font-serif font-medium mb-1">1943-1945: Kurile Operations</h3>
            <p className="text-gray-400 font-light leading-relaxed mb-4">
              USAAF and USN bombers strike the Japanese home islands from their forward bases in the Aleutians, facing intense anti-aircraft fire and interceptors.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-museumRed border-4 border-background opacity-75"></div>
            <h3 className="text-xl text-museumRed font-serif font-medium mb-1">August 1945: Soviet Advance & Shumshu Landing</h3>
            <p className="text-gray-400 font-light leading-relaxed mb-4">
              Soviet forces execute a massive amphibious landing on the island of Shumshu, engaging deeply entrenched Japanese defenders in the final days of the war.
            </p>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}
