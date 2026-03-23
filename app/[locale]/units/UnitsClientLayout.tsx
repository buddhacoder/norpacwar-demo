'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const crewPhotos = [
  { src: '/historic/VB-135-Crew-1943-1-e1692617988418-450x450.jpeg', title: 'VB-135 Crew 1943' },
  { src: '/historic/VB-135_14V_17V_18V-e1692618822778-450x450.jpeg', title: 'VB-135 Ventura Formations' },
];

export default function UnitsClientLayout({ data }: any) {
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
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Imperial & Allied Squadrons</h1>
          <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed text-lg mb-8">
            <p>
              Detailed historic archives covering the various squadrons deployed during the hostile weather wars of the Aleutian and Kurile campaigns. 
            </p>
          </div>

          <div className="flex flex-col gap-12 mt-12">
            {data && data.length > 0 && data.map((unit: any, i: number) => (
              <div key={i} className="glass-panel p-8 text-left border-l-4 border-[var(--gold)]">
                <h3 className="text-2xl font-serif text-white mb-6">{unit.title_en}</h3>
                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed font-serif" dangerouslySetInnerHTML={{ __html: unit.content_en }} />
              </div>
            ))}
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
