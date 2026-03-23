'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const points = {
  dutchHarbor: { x: '80%', y: '45%' },
  kiska: { x: '45%', y: '65%' },
  attu: { x: '30%', y: '70%' },
  paramushiro: { x: '5%', y: '85%' },
};

export default function InteractiveCampaignMap({ activeIndex }: { activeIndex: number }) {
  // Map zoom and pan based on the active campaign index
  const getMapTransform = () => {
    switch (activeIndex) {
      case 0: return { scale: 1.5, x: '-20%', y: '10%' }; // Zoom into Dutch Harbor
      case 1: return { scale: 1.5, x: '10%', y: '-10%' }; // Pan to Kiska/Attu
      case 2: return { scale: 1.8, x: '20%', y: '-20%' }; // Pan to Kurils/Paramushiro
      case 3: return { scale: 1.2, x: '0%', y: '0%' }; // Final wide shot
      default: return { scale: 1, x: '0%', y: '0%' };
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0A0D14]">
      {/* Dynamic Zooming Map Container */}
      <motion.div 
        animate={getMapTransform()}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full origin-center"
      >
        <Image 
          src="/images/card1.png" 
          alt="Topographical Base"
          fill 
          className="object-cover opacity-60 contrast-125"
          unoptimized
        />
        
        {/* SVG Drawing Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Dutch Harbor Attack Route (Index 0) */}
          <motion.path
            d={`M 50% 10% Q 65% 20% ${points.dutchHarbor.x} ${points.dutchHarbor.y}`}
            fill="transparent"
            stroke="#ff3333"
            strokeWidth="3"
            strokeDasharray="10, 10"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: activeIndex === 0 ? 1 : 0, 
              opacity: activeIndex >= 0 ? 0.8 : 0 
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Allied Retaking of Kiska/Attu Route (Index 1) */}
          <motion.path
            d={`M ${points.dutchHarbor.x} ${points.dutchHarbor.y} Q 60% 70% ${points.kiska.x} ${points.kiska.y}`}
            fill="transparent"
            stroke="var(--gold)"
            strokeWidth="3"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: activeIndex === 1 || activeIndex === 2 ? 1 : 0, 
              opacity: activeIndex >= 1 ? 0.8 : 0 
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Empire Express to Paramushiro (Index 2) */}
          <motion.path
            d={`M ${points.attu.x} ${points.attu.y} Q 15% 55% ${points.paramushiro.x} ${points.paramushiro.y}`}
            fill="transparent"
            stroke="var(--gold)"
            strokeWidth="3"
            strokeDasharray="5, 15"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: activeIndex === 2 ? 1 : 0, 
              opacity: activeIndex >= 2 ? 0.8 : 0 
            }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>

        {/* Tactical Nodes */}
        {Object.entries(points).map(([key, coords]) => {
          let isVisible = false;
          if (activeIndex >= 0 && key === 'dutchHarbor') isVisible = true;
          if (activeIndex >= 1 && (key === 'kiska' || key === 'attu')) isVisible = true;
          if (activeIndex >= 2 && key === 'paramushiro') isVisible = true;

          return (
            <motion.div
              key={key}
              className="absolute w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-[0_0_15px_red] transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ left: coords.x, top: coords.y }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isVisible ? [0, 1.5, 1] : 0, 
                opacity: isVisible ? 1 : 0 
              }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              {isVisible && (
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-[10px] md:text-sm font-mono text-white whitespace-nowrap bg-black/50 px-2 py-1 border border-white/20 rounded backdrop-blur-sm">
                  {key.toUpperCase()}
                </div>
              )}
            </motion.div>
          );
        })}

      </motion.div>

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none z-30 opacity-80" />
    </div>
  );
}
