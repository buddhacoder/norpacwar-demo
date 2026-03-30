'use client';

import Script from 'next/script';
import { motion } from 'framer-motion';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        'environment-image'?: string;
        exposure?: string;
        'shadow-intensity'?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Lock, ScanLine } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export interface Artifact {
  _id: string;
  artifact_id: string;
  title_en: string;
  title_ru?: string;
  description_en?: string;
  description_ru?: string;
  model_url?: string | null;
}

export default function ArtifactViewer({ initialArtifacts }: { initialArtifacts?: Artifact[] }) {
  const t = useTranslations('Artifacts');
  const locale = useLocale();

  const ARTIFACTS = initialArtifacts && initialArtifacts.length > 0 
    ? initialArtifacts.map(a => ({
        id: a.artifact_id,
        title: locale === 'ru' && a.title_ru ? a.title_ru : a.title_en,
        description: locale === 'ru' && a.description_ru ? a.description_ru : a.description_en,
        src: a.model_url || null,
        status: a.model_url ? t('statusAvailable') : t('statusSecurity'),
      }))
    : [
        {
          id: "8-71A",
          title: t('a1_title'),
          description: t('a1_desc'),
          src: "/models/camera.glb",
          status: t('statusAvailable'),
        },
        {
          id: "4-90B",
          title: t('a2_title'),
          description: t('a2_desc'),
          src: null,
          status: t('statusPending'),
        },
        {
          id: "9-11C",
          title: t('a3_title'),
          description: t('a3_desc'),
          src: null,
          status: t('statusSecurity'),
        }
      ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const active = ARTIFACTS[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % ARTIFACTS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + ARTIFACTS.length) % ARTIFACTS.length);

  return (
    <div className="w-full relative py-12">
      <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js" />
      
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-xl font-serif text-[var(--gold)] flex items-center gap-3">
          <ScanLine className="w-5 h-5 opacity-70" />
          {t('terminal')}
        </h2>
        <div className="flex gap-2">
          <button onClick={prev} className="p-2 border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors rounded-sm">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="p-2 border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors rounded-sm">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <motion.div 
        key={active.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[60vh] md:h-[75vh] rounded-sm overflow-hidden border border-white/10 bg-[#0A0D14]"
      >
        {active.src ? (
          <model-viewer
            src={active.src}
            alt={active.title}
            auto-rotate
            camera-controls
            environment-image="neutral"
            exposure="1.2"
            shadow-intensity="1.5"
            style={{ width: '100%', height: '100%', outline: 'none' }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-80">
            <div className="w-48 h-48 md:w-64 md:h-64 border border-dashed border-white/20 rounded-full flex flex-col items-center justify-center mb-8 relative">
              <div className="absolute inset-0 rounded-full border border-[var(--gold)]/20 animate-ping opacity-20" />
              <Lock className="w-10 h-10 text-white/40 mb-3" />
              <div className="text-xs font-mono text-white/50 tracking-widest">{active.status}</div>
            </div>
          </div>
        )}

        {/* Glassmorphic Curation Card */}
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-10 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="glass-panel p-6 md:p-8 max-w-md border-l-4 border-[var(--gold)] backdrop-blur-xl bg-[#0A0D14]/90 shadow-2xl pointer-events-auto"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="text-[var(--gold)] font-bold tracking-widest text-xs font-mono">ARTIFACT #{active.id}</div>
              <div className="text-[10px] font-mono tracking-widest px-2 py-0.5 border border-white/20 bg-white/5 rounded-sm">
                {currentIndex + 1} / {ARTIFACTS.length}
              </div>
            </div>
            
            <h3 className="text-2xl font-serif text-white mb-3">{active.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-serif mb-5">
              {active.description}
            </p>
            
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
              <span className={`w-2 h-2 rounded-full ${active.src ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              {active.src ? t('active') : t('awaiting')}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
