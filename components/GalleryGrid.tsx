"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Photo = {
  src: string;
  caption: string;
};

export const GalleryGrid = ({ photos }: { photos: Photo[] }) => {
  if (photos.length === 0) {
    return (
      <p className="text-sm font-mono text-newsprint-ink/40 uppercase tracking-widest py-12 text-center">
        No photos yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-newsprint-ink">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.src}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="border-r border-b border-newsprint-ink group overflow-hidden"
        >
          <div className="relative w-full aspect-[3/2] overflow-hidden bg-newsprint-muted">
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          {photo.caption && (
            <div className="px-4 py-3 border-t border-newsprint-ink">
              <p className="text-xs font-mono text-newsprint-ink/60 uppercase tracking-wide leading-relaxed">
                {photo.caption}
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
