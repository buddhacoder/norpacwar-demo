'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const timelineEvents = [
  {
    date: 'June 1942',
    title: 'Dutch Harbor Attack',
    description: 'Japanese forces launch a diversionary strike against the US Naval Base at Dutch Harbor, bringing the war to North American soil and sparking the long Aleutian Campaign.',
    image: '/aleutian_foggy_base.png'
  },
  {
    date: '1942 – 1943',
    title: 'The Weather War',
    description: 'US and Canadian forces endure brutal, freezing conditions to establish forward airbases. More aircraft are lost to the sudden, violent storms and zero-visibility fog than to enemy fire.',
    image: null
  },
  {
    date: '1943 – 1945',
    title: 'Kurile Operations',
    description: 'Armed with the rugged PV-1 Venturas, the Empire Express squadrons push the offensive from the Aleutians deep into the Japanese-held Kurile Islands, conducting relentless bombing runs.',
    image: '/pv1_ventura_flight.png'
  },
  {
    date: 'August 1945',
    title: 'Shumshu Landing',
    description: 'Soviet forces execute a massive amphibious assault on the fortified island of Shumshu. The ensuing battle became the final, bloody engagement of the Pacific Theater.',
    image: null
  }
];

export default function CampaignsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 shadow-inner">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">The Aleutian Campaign</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A forgotten theater characterized by lethal weather, extreme isolation, and the relentless endurance of the men who fought there.
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
      </div>
    </div>
  )
}
