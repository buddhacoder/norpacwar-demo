'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export default function CampaignsClientLayout({ data }: any) {
  const t = useTranslations('Campaigns');
  const locale = useLocale();

  const timelineEvents = [
    {
      date: 'June 1942',
      title: t('timeline.t1_title'),
      description: t('timeline.t1_desc'),
      image: '/aleutian_foggy_base.png'
    },
    {
      date: '1942 – 1943',
      title: t('timeline.t2_title'),
      description: t('timeline.t2_desc'),
      image: null
    },
    {
      date: '1943 – 1945',
      title: t('timeline.t3_title'),
      description: t('timeline.t3_desc'),
      image: '/pv1_ventura_flight.png'
    },
    {
      date: 'August 1945',
      title: t('timeline.t4_title'),
      description: t('timeline.t4_desc'),
      image: null
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 shadow-inner">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">{t('title')}</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />

          {/* Timeline Nodes */}
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={event.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`relative flex flex-col md:flex-row items-center justify-between mb-24 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Center Node dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[var(--gold)] rounded-full transform -translate-x-[5px] md:-translate-x-1.5 shadow-[0_0_10px_#c5a059]" />

                {/* Content Side */}
                <div className={`w-full md:w-5/12 pl-12 md:pl-0 pt-1 md:pt-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="text-[var(--gold)] font-bold tracking-widest text-sm mb-2 opacity-80">{event.date}</div>
                  <h3 className="text-2xl font-serif text-white mb-4">{event.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">{event.description}</p>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-5/12 pl-12 md:pl-0 mt-6 md:mt-0 relative z-10">
                  {event.image ? (
                    <div className="relative h-64 w-full rounded-sm overflow-hidden border border-white/10 group">
                      <Image 
                        src={event.image} 
                        alt={event.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115]/80 via-transparent to-transparent opacity-80" />
                    </div>
                  ) : <div className="h-4 hidden md:block"></div>}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Dynamic Legacy WordPress Copy */}
        {data && data.length > 0 && (
          <div className="mt-32 border-t border-white/10 pt-16">
            <h2 className="text-3xl font-serif text-[var(--gold)] mb-12 text-center">{t('historicalReports')}</h2>
            <div className="flex flex-col gap-16">
              {data.map((doc: any, i: number) => {
                const localizedTitle = locale === 'ru' && doc.title_ru ? doc.title_ru : doc.title_en;
                const localizedContent = locale === 'ru' && doc.content_ru ? doc.content_ru : doc.content_en;
                
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel p-8 md:p-12 text-left"
                  >
                    <h3 className="text-3xl font-serif text-white mb-8 border-b border-white/5 pb-4">{localizedTitle}</h3>
                    {doc.image && (
                      <div className="w-full relative aspect-video rounded-sm overflow-hidden mb-8 border border-white/10">
                        <Image src={doc.image} alt={localizedTitle} fill className="object-cover opacity-80" />
                      </div>
                    )}
                    <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed font-serif" dangerouslySetInnerHTML={{ __html: localizedContent }} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
