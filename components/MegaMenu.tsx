'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import Image from 'next/image';

const menuData = {
  campaigns: [
    { title: "Operation Cottage", img: "/images/card1.png" },
    { title: "Attu Invasion", img: "/images/card2.png" },
    { title: "Dutch Harbor", img: "/images/card3.png" }
  ],
  units: [
    { title: "VB-135 Ventura Formations", img: "/historic/VB-135_14V_17V_18V-e1692618822778-450x450.jpeg" },
    { title: "VB-135 Crew 1943", img: "/historic/VB-135-Crew-1943-1-e1692617988418-450x450.jpeg" },
    { title: "Imperial Sentai", img: "/images/card4.png" }
  ],
  aircraft: [
    { title: "PV-1 Ventura", img: "/images/card3.png" },
    { title: "PBY Catalina", img: "/images/card2.png" },
    { title: "Ki-43 Hayabusa", img: "/images/card1.png" }
  ]
};

export default function MegaMenu({ locale }: { locale: string }) {
  const tNav = useTranslations('Navigation');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <nav 
      className="fixed w-full z-50 glass-panel border-b border-white/5 top-0 transition-all duration-300 backdrop-blur-md bg-black/50"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-50">
        <Link href="/" className="text-[var(--gold)] font-serif text-xl font-semibold tracking-wider">
          {tNav('title')}
        </Link>
        <div className="flex gap-8 text-sm text-gray-300 font-medium tracking-wide items-center">
          <div className="py-4" onMouseEnter={() => setActiveDropdown(null)}>
            <Link href="/about" className={`hover:text-[var(--gold)] transition-colors py-2 ${(pathname && pathname.includes('about')) ? 'text-[var(--gold)]' : ''}`}>
              {tNav('about')}
            </Link>
          </div>
          <div className="py-4" onMouseEnter={() => setActiveDropdown(null)}>
            <Link href="/tribute" className={`hover:text-[var(--museumRed)] transition-colors py-2 ${(pathname && pathname.includes('tribute')) ? 'text-[var(--museumRed)]' : ''}`}>
              {tNav('tribute')}
            </Link>
          </div>
          {['campaigns', 'units', 'aircraft'].map((key) => (
            <div 
              key={key} 
              className="relative py-4"
              onMouseEnter={() => setActiveDropdown(key)}
            >
              <Link href={`/${key}` as any} className={`hover:text-[var(--gold)] transition-colors py-2 ${(pathname && pathname.includes(key)) ? 'text-[var(--gold)]' : ''}`}>
                {tNav(key as any)}
              </Link>
            </div>
          ))}
          <div className="py-4" onMouseEnter={() => setActiveDropdown(null)}>
            <Link href="/archives" className={`hover:text-[var(--gold)] transition-colors py-2 ${(pathname && pathname.includes('archives')) ? 'text-[var(--gold)]' : ''}`}>
              {tNav('archives')}
            </Link>
          </div>
          <LocaleSwitcher locale={locale} />
        </div>
      </div>

      <AnimatePresence>
        {activeDropdown && menuData[activeDropdown as keyof typeof menuData] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full glass-panel border-t border-[var(--gold)]/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#0A0A0A]/95"
          >
            <div className="max-w-7xl mx-auto p-12 border-x border-white/5 relative bg-[url('/vintage-paper.jpg')] bg-blend-overlay">
              <h3 className="text-[var(--gold)] font-serif text-2xl mb-8 capitalize tracking-widest">{tNav(activeDropdown as any)} Preview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {menuData[activeDropdown as keyof typeof menuData].map((item, idx) => (
                   <motion.div 
                     key={idx} 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.15 }}
                     className="relative aspect-video rounded overflow-hidden group border border-white/10 bg-[#12141a]"
                   >
                     <Image src={item.img} alt={item.title} fill className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0" />
                     <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                       <p className="text-white font-serif text-lg">{item.title}</p>
                     </div>
                   </motion.div>
                 ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
