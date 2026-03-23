'use client';

import { motion } from 'framer-motion';
import { ExhibitCard } from '@/components/ExhibitCard';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-wide drop-shadow-md glow-text">
          {t('title')}
        </h1>
        <h2 className="text-xl md:text-2xl text-gold font-light mb-8 font-serif italic drop-shadow">
          {t('subtitle')}
        </h2>
        
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12 font-light">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link href="/campaigns">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-museumRed/90 hover:bg-museumRed text-white tracking-widest text-sm font-semibold rounded-sm border border-red-500/30 transition-all shadow-[0_0_15px_rgba(139,0,0,0.5)] w-full sm:w-auto"
            >
              {t('enterBtn')}
            </motion.button>
          </Link>
          
          <Link href="/campaigns" locale="ru">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass-panel text-white tracking-widest text-sm font-semibold rounded-sm transition-all hover:bg-white/10 w-full sm:w-auto"
            >
              {t('enterBtnRu')}
            </motion.button>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mt-16"
        >
          <ExhibitCard 
            title={t('card1Title')} 
            description={t('card1Desc')} 
            imageUrl="/images/card1.png"
            link="/campaigns" 
          />
          <ExhibitCard 
            title={t('card2Title')} 
            description={t('card2Desc')} 
            imageUrl="/images/card2.png"
            link="/units" 
          />
          <ExhibitCard 
            title={t('card3Title')} 
            description={t('card3Desc')} 
            imageUrl="/images/card3.png"
            link="/aircraft" 
          />
          <ExhibitCard 
            title={t('card4Title')} 
            description={t('card4Desc')} 
            imageUrl="/images/card4.png"
            link="/archives" 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
