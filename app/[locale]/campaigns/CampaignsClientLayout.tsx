'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import InteractiveCampaignMap from '@/components/InteractiveCampaignMap';

export default function CampaignsClientLayout({ data }: any) {
  const t = useTranslations('Campaigns');
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);

  const timelineEvents = [
    {
      id: 'dutch-harbor',
      date: 'June 1942',
      title: t('timeline.t1_title'),
      description: t('timeline.t1_desc'),
      image: '/aleutian_foggy_base.png'
    },
    {
      id: 'attu-invasion',
      date: '1942 – 1943',
      title: t('timeline.t2_title'),
      description: t('timeline.t2_desc'),
      image: null
    },
    {
      id: 'operation-cottage',
      date: '1943 – 1945',
      title: t('timeline.t3_title'),
      description: t('timeline.t3_desc'),
      image: '/pv1_ventura_flight.png'
    },
    {
      id: 'paramushiro-closure',
      date: 'August 1945',
      title: t('timeline.t4_title'),
      description: t('timeline.t4_desc'),
      image: null
    }
  ];

  return (
    <div className="relative min-h-[300vh] bg-black">
      {/* Sticky Interactive Map Background */}
      <div className="fixed inset-0 z-0">
        <InteractiveCampaignMap 
          activeIndex={activeIndex} 
          activeMedia={
            activeIndex < timelineEvents.length 
              ? timelineEvents[activeIndex].image 
              : (data?.[activeIndex - timelineEvents.length]?.image || null)
          } 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-48 flex justify-end pointer-events-none">
        {/* Right side scrolling dossier column */}
        <div className="w-full md:w-1/2 flex flex-col gap-64 pointer-events-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-8 md:p-12 text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">{t('title')}</h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              {t('description')}
            </p>
          </motion.div>

          {/* Core Timeline Events */}
          {timelineEvents.map((event, index) => (
            <motion.div 
              key={event.title}
              id={event.id}
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ amount: 0.5, margin: "-200px" }}
              className="glass-panel p-8 md:p-12 text-left"
            >
              <div className="text-[var(--gold)] font-bold tracking-widest text-sm mb-4">{event.date}</div>
              <h3 className="text-3xl lg:text-4xl font-serif text-white mb-6">{event.title}</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-8">{event.description}</p>
            </motion.div>
          ))}

          {/* Dynamic Legacy WordPress Copy */}
          {data && data.length > 0 && data.map((doc: any, i: number) => {
            const localizedTitle = locale === 'ru' && doc.title_ru ? doc.title_ru : doc.title_en;
            const localizedContent = locale === 'ru' && doc.content_ru ? doc.content_ru : doc.content_en;
            // Shift index beyond the timeline events
            const combinedIndex = timelineEvents.length + i;
            
            return (
              <motion.div 
                key={`doc-${i}`}
                onViewportEnter={() => setActiveIndex(Math.min(combinedIndex, 3))} // Cap at 3 for map pan targets
                viewport={{ amount: 0.3 }}
                className="glass-panel p-8 md:p-12 text-left"
              >
                <div className="text-[var(--gold)] font-bold tracking-widest text-sm mb-4">DECLASSIFIED LOG</div>
                <h3 className="text-3xl font-serif text-white mb-8 border-b border-[var(--gold)]/30 pb-4">{localizedTitle}</h3>
                
                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed font-serif" dangerouslySetInnerHTML={{ __html: localizedContent }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
