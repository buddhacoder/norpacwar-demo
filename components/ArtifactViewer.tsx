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

export default function ArtifactViewer() {
  return (
    <div className="w-full relative py-12">
      <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-[60vh] md:h-[75vh] rounded-sm overflow-hidden border border-white/5 bg-[#0A0D14]"
      >
        {/* The 3D Engine */}
        <model-viewer
          src="/models/camera.glb"
          alt="WWII Aerial Reconnaissance Camera"
          auto-rotate
          camera-controls
          environment-image="neutral"
          exposure="1.2"
          shadow-intensity="1.5"
          style={{ width: '100%', height: '100%', outline: 'none' }}
        >
          {/* Glassmorphic Curation Card */}
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="glass-panel p-6 md:p-8 max-w-sm border-l-4 border-[var(--gold)] backdrop-blur-xl bg-[#12141a]/80"
            >
              <div className="text-[var(--gold)] font-bold tracking-widest text-xs mb-3 font-mono">ARTIFACT #8-71A</div>
              <h3 className="text-2xl font-serif text-white mb-2">Aerial Reconnaissance Camera</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-serif">
                Recovered hardware similar to the optical equipment utilized by PV-1 Ventura crews over the Kuril Islands. Essential for plotting the Empire Express supply lines.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 font-mono">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                INTERACTIVE 3D RENDER
              </div>
            </motion.div>
          </div>
        </model-viewer>
      </motion.div>
    </div>
  );
}
