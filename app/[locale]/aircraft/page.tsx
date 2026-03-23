'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { GalleryGrid } from '@/components/GalleryGrid';

const galleryImages = [
  { id: '1', src: 'https://images.unsplash.com/photo-1544215286-90f23d463fd2?q=80&w=2670&auto=format&fit=crop', alt: 'PV-1 Cockpit Instruments', caption: 'Detailed view of the complex instrument panel required to navigate through zero-visibility conditions in the Aleutians.' },
  { id: '2', src: 'https://images.unsplash.com/photo-1518178144215-dcfae69e0618?q=80&w=2670&auto=format&fit=crop', alt: 'Archival Map of Action', caption: 'Original bombing run maps over Paramushiro, indicating target vectors and anti-aircraft strongholds.' },
  { id: '3', src: 'https://images.unsplash.com/photo-1605655963288-75d15ab4baca?q=80&w=2670&auto=format&fit=crop', alt: 'Crew Briefing Notes', caption: 'Handwritten mission notes detailing the extreme icing warnings and primary target coordinates.' },
  { id: '4', src: 'https://plus.unsplash.com/premium_photo-1673292418042-45e0766289b4?q=80&w=2670&auto=format&fit=crop', alt: 'Nose Art Scheme', caption: 'Distinctive squadron nose art painted on a PV-1 Ventura, showing the wear and tear of Pacific weather.' },
  { id: '5', src: 'https://images.unsplash.com/photo-1596484394467-fbd67d9f78ff?q=80&w=2670&auto=format&fit=crop', alt: 'Engine Maintenance', caption: 'Mechanics working on the twin Pratt & Whitney R-2800 engines under harsh conditions.' },
  { id: '6', src: 'https://images.unsplash.com/photo-1550937402-23b98c364177?q=80&w=2670&auto=format&fit=crop', alt: 'Post-Mission Debrief', caption: 'Exhausted crew members debriefing intelligence officers after a successful 12-hour patrol.' },
];

const aircraftPhotos = [
  { src: '/historic/VB-135_11V_-20V_Amchitka-450x450.jpg', title: 'PV-1 Venturas parked at Amchitka Airbase' },
];

const losses = [
  { date: '5/10/43', buno: '29847/9', crew: 'Lt. (j.g) Owen L. Parmenter (VB-136)', detail: 'Missing following operational search.' },
  { date: '5/10/43', buno: '29794/5', crew: 'Lt. (j.g.) Robert J. Molloy (VB-136)', detail: 'Crashed into Kuluk Bay, Adak, in bad weather while returning from rescue search.' },
  { date: '5/14/43', buno: '33142', crew: 'Lt. (j.g) Byron L. Lough (VB-138)', detail: 'Hit Mt. Washington near its top in heavy weather following departure.' },
  { date: '5/23/43', buno: '29787/21', crew: 'Grant T. Anderson (VB-135)', detail: 'Crash on takeoff. Action of a nearby Army B-24 saved the lives of three crew members.' },
];

export default function AircraftPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 root-layout">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-[var(--gold)] font-bold tracking-widest text-sm mb-4">AIRCRAFT & MACHINES</div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">The PV-1 Ventura</h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mb-12">
            The Lockheed PV-1 Ventura was the rugged workhorse of the North Pacific. Fighting blinding fogs, severe icing, and relentless winds, the Venturas required immense skill and bravery just to keep them in the sky.
          </p>

          <div className="w-full relative aspect-video rounded-sm overflow-hidden border border-white/10 mb-20 bg-black/40 xl:aspect-[21/9]">
            <Image 
              src={aircraftPhotos[0].src} 
              alt={aircraftPhotos[0].title}
              fill
              className="object-cover opacity-90 sepia-[.3] grayscale-[.4] hover:grayscale-0 transition-all duration-700" 
            />
             <div className="absolute bottom-6 left-6 p-4 glass-panel border-l-2 border-[var(--gold)] max-w-sm">
                <p className="text-sm text-gray-200 font-medium">{aircraftPhotos[0].title}</p>
            </div>
          </div>

          <h2 className="text-3xl font-serif text-[var(--gold)] mb-8 border-b border-white/5 pb-4">Honoring the Losses</h2>
          <p className="text-gray-400 text-sm mb-8 italic">Based on Craig Fuller's list and War Diaries of VP/VPB 131, 135, 136, 139.</p>

          <div className="grid grid-cols-1 gap-4 mb-20">
            {losses.map((loss, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel p-6 border-l-4 border-red-900/50 hover:border-red-500/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="text-lg font-bold text-white font-serif">{loss.crew}</div>
                  <div className="text-[var(--gold)] opacity-80 text-sm font-mono mt-2 md:mt-0">{loss.date} | BuNo: {loss.buno}</div>
                </div>
                <p className="text-sm text-gray-400">{loss.detail}</p>
              </motion.div>
            ))}
          </div>

          <h2 className="text-3xl font-serif text-[var(--gold)] mb-8 border-b border-white/5 pb-4">Primary Source Archives</h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mb-12">
            Explore the historical artifacts, mission briefing documents, and mechanical diagrams that kept the Empire Express flying. Click on any document to view the high-resolution archival scan.
          </p>
          
          <div className="glass-panel p-6 sm:p-8">
            <GalleryGrid images={galleryImages} />
          </div>

        </motion.div>
      </div>
    </div>
  );
}
