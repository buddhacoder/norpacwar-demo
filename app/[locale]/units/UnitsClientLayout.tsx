'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function AccordionDossier({ title, content, isOpen: initialOpen }: { title: string, content: string, isOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return (
    <div className="glass-panel border-l-4 border-[var(--gold)] overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left p-6 md:p-8 flex items-center justify-between hover:bg-white/5 transition-colors outline-none"
      >
        <h3 className="text-xl md:text-2xl font-serif text-white tracking-wide">{title}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-6 h-6 text-[var(--gold)]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 md:px-8 pb-8 pt-4 border-t border-white/5 mx-2">
               <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed font-serif" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const crewPhotos = [
  { src: '/historic/VB-135-Crew-1943-1-e1692617988418-450x450.jpeg', title: 'VB-135 Crew 1943' },
  { src: '/historic/VB-135_14V_17V_18V-e1692618822778-450x450.jpeg', title: 'VB-135 Ventura Formations' },
];

export default function UnitsClientLayout({ data }: any) {
  const t = useTranslations('Units');
  const locale = useLocale();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 root-layout">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-b border-white/10 pb-16"
        >
          <div className="text-[var(--gold)] font-bold tracking-widest text-sm mb-4">{t('subtitle')}</div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">{t('title')}</h1>
          <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed text-lg mb-8">
            <p>
              {t('description')}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-12">
            {data && data.length > 0 && data.map((unit: any, i: number) => {
              const localizedTitle = locale === 'ru' && unit.title_ru ? unit.title_ru : unit.title_en;
              const localizedContent = locale === 'ru' && unit.content_ru ? unit.content_ru : unit.content_en;
              // We'll manage open state locally inside a sub-component or just use a state for the active index
              return (
                <AccordionDossier 
                  key={i} 
                  title={localizedTitle} 
                  content={localizedContent} 
                  isOpen={i === 0} // temporary fallback until state is built
                />
              );
            })}
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
