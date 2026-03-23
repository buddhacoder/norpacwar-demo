'use client';

import { motion } from 'framer-motion';

interface ExhibitCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  link: string;
}

export function ExhibitCard({ title, description, imageUrl, link }: ExhibitCardProps) {
  return (
    <motion.a 
      href={link}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="block glass-panel rounded-md overflow-hidden transition-colors hover:border-gold/30 group"
    >
      {imageUrl && (
        <div className="h-48 w-full bg-cover bg-center grayscale-[.5] sepia-[.4] opacity-80 group-hover:opacity-100 group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-700 border-b border-white/5" style={{ backgroundImage: `url(${imageUrl})` }} />
      )}
      {!imageUrl && (
        <div className="h-48 w-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center border-b border-white/5">
          <span className="text-gray-600 font-serif italic">Exhibit Archive</span>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-serif text-white mb-2 group-hover:text-gold transition-colors">{title}</h3>
        <p className="text-sm text-gray-400 font-light leading-relaxed">{description}</p>
        <div className="mt-6 flex items-center text-xs text-gold/80 font-semibold tracking-wider">
          EXPLORE THE ARCHIVE 
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </motion.a>
  );
}
