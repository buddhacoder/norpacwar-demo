'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const crewPhotos = [
  { src: '/historic/VB-135-Crew-1943-1-e1692617988418-450x450.jpeg', title: 'VB-135 Crew 1943' },
  { src: '/historic/VB-135_14V_17V_18V-e1692618822778-450x450.jpeg', title: 'VB-135 Ventura Formations' },
];

export default function UnitsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 root-layout">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-b border-white/10 pb-16"
        >
          <div className="text-[var(--gold)] font-bold tracking-widest text-sm mb-4">UNITED STATES NAVAL AIR UNITS</div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Squadron VB/VPB-135</h1>
          <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed text-lg">
            <p>
              Commissioned on 15 February 1943 at Ault Field, Whidbey Island, WA. The nucleus of the Squadron was obtained from a decommissioned PBY squadron, VP-42, that itself was formed from the VP-17. The VP-17 made an impressive record in the defense of Dutch Harbor when it was attacked by a Japanese task force in June 1942.
            </p>
            <p>
              VB-135 became the very first U.S. Navy Squadron operating PV-1 aircraft in the Western Aleutians and the Pacific Theater. Their tours of duty spearheaded the push deep into hostile weather and entrenched enemy airspace.
            </p>
          </div>
        </motion.div>

        {/* Authentic Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {crewPhotos.map((photo, i) => (
            <motion.div 
              key={photo.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative aspect-square md:aspect-video rounded-sm overflow-hidden border-2 border-white/5 group bg-[#0f1115]"
            >
              <Image 
                src={photo.src} 
                alt={photo.title} 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <h4 className="text-white font-serif">{photo.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
