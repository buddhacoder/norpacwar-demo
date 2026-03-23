'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbox, type GalleryImage } from './Lightbox';

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Reusable stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {images.map((img) => (
          <motion.div
            key={img.id}
            variants={itemVariants}
            className="group relative aspect-video cursor-pointer overflow-hidden rounded-md bg-white/5 border border-white/10"
            onClick={() => setSelectedImage(img)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.img
              layoutId={`gallery-image-${img.id}`}
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-opacity duration-300 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm font-medium truncate">{img.alt}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Lightbox 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </>
  );
}
