'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import GlossaryHover from '@/components/GlossaryHover';
import { useTranslations } from 'next-intl';

const StoryBlock = ({ text, highlight, imageSrc }: { text: React.ReactNode, highlight: string, imageSrc: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
      <motion.div style={{ scale: imageScale }} className="absolute inset-0 z-0">
        <Image src={imageSrc} alt="Historical Background" fill className="object-cover opacity-20 grayscale sepia-[.3]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0a0a0a]/80 to-black/90" />
      </motion.div>
      
      <motion.div style={{ opacity, y }} className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-[var(--gold)] font-mono tracking-[0.3em] text-xs md:text-sm mb-6 uppercase">{highlight}</h2>
        <p className="text-3xl md:text-5xl lg:text-6xl text-white font-serif leading-tight">
          {text}
        </p>
      </motion.div>
    </div>
  );
};

export default function AboutClientLayout() {
  const t = useTranslations('About');

  return (
    <div className="bg-black min-h-screen">
      
      {/* Pixar Arc 1: Once Upon a Time (The Setting) */}
      <StoryBlock 
        highlight={t('h1')}
        text={t('p1')}
        imageSrc="/images/card3.png"
      />

      {/* Pixar Arc 2: Until One Day (The Inciting Incident) */}
      <StoryBlock 
        highlight={t('h2')}
        text={t('p2')}
        imageSrc="/images/card1.png"
      />

      {/* Pixar Arc 3: Because of That (The Struggle) */}
      <StoryBlock 
        highlight={t('h3')}
        text={
          t.rich('p3', {
            pv1: (chunks) => <GlossaryHover term="PV-1 Venturas">{chunks as any}</GlossaryHover>,
            pby: (chunks) => <GlossaryHover term="PBY Catalinas">{chunks as any}</GlossaryHover>,
            williwaw: (chunks) => <GlossaryHover term="williwaw">{chunks as any}</GlossaryHover>
          })
        }
        imageSrc="/images/card2.png"
      />

      {/* Pixar Arc 4: Until Finally (The Purpose of the Archive) */}
      <div className="relative min-h-[80vh] flex items-center justify-center px-6 py-32 bg-[#0A0D14] border-t border-[var(--gold)]/20">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">{t('h4')}</h2>
            <div className="h-px w-32 bg-[var(--gold)] mx-auto mb-10"></div>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-serif mb-8">
              {t('p4')}
            </p>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-serif mb-12 border-l-4 border-[var(--gold)] pl-6 text-left bg-white/5 p-6 rounded-r-sm">
              {t.rich('p5', { bold: (chunks) => <strong>{chunks}</strong> })}
            </p>
            <NextLink href="/" className="inline-block border border-[var(--gold)]/50 hover:bg-[var(--gold)]/10 text-[var(--gold)] font-mono tracking-widest text-sm uppercase px-8 py-4 transition-colors">
              {t('btn')}
            </NextLink>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
