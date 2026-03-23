'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

interface LightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
}

export function Lightbox({ image, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            <X size={28} />
          </motion.button>

          <div 
            className="relative flex flex-col items-center max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()} // Prevent clicking the image from closing
          >
            <motion.img
              layoutId={`gallery-image-${image.id}`}
              src={image.src}
              alt={image.alt}
              className="max-h-[80vh] w-auto h-auto object-contain rounded-sm shadow-2xl"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            />
            {image.caption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center max-w-2xl"
              >
                <p className="text-gray-300 font-serif text-lg leading-relaxed shadow-black drop-shadow-md">
                  {image.caption}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
