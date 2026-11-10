"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface GalleryImage {
  src: string;
  label: string;
  index: string;
  tag?: string;
  perspective: string;
  caption: string;
}

interface LightboxProps {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const img = images[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-[#101010]/98 backdrop-blur-md flex flex-col justify-between"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-[#303030] bg-[#141414]">
        <div className="flex items-center gap-4">
          <span
            className="text-[10px] tracking-[0.26em] uppercase text-[#FF5728] font-bold"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            {img.index} // {img.tag || "CAMERA PERSPECTIVE"}
          </span>
          <span className="hidden sm:inline-block w-px h-3 bg-[#303030]" />
          <span
            className="text-[12px] tracking-[0.14em] uppercase text-[#EAE8E2] font-semibold"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            {img.perspective}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span
            className="text-[10px] tracking-[0.2em] uppercase text-[#929292]"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            PERSPECTIVE {current + 1} OF {images.length}
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-[#303030] bg-[#181818] text-[#929292] hover:text-[#EAE8E2] hover:border-[#FF5728] transition-colors"
            aria-label="Close lightbox"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="flex-1 relative flex items-center justify-center px-6 md:px-20 py-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full max-w-6xl max-h-[75vh]"
          >
            <Image
              src={img.src}
              alt={img.perspective}
              fill
              className="object-contain"
              sizes="100vw"
              quality={95}
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-[#303030] bg-[#181818]/90 text-[#929292] hover:text-[#EAE8E2] hover:border-[#FF5728] transition-colors shadow-2xl"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-[#303030] bg-[#181818]/90 text-[#929292] hover:text-[#EAE8E2] hover:border-[#FF5728] transition-colors shadow-2xl"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Bottom Info Bar & Thumbnails */}
      <div className="border-t border-[#303030] bg-[#141414] px-6 md:px-10 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="max-w-2xl">
          <p
            className="text-[12px] leading-[1.6] text-[#929292]"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            <strong className="text-[#EAE8E2] uppercase">{img.label}:</strong> {img.caption}
          </p>
        </div>

        {/* Thumbnail Selector */}
        <div className="flex gap-2 self-center md:self-auto overflow-x-auto pb-1 max-w-full">
          {images.map((im, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative w-16 h-11 shrink-0 overflow-hidden border transition-all ${
                i === current
                  ? "border-[#FF5728] ring-1 ring-[#FF5728]"
                  : "border-[#303030] opacity-40 hover:opacity-90"
              }`}
            >
              <Image src={im.src} alt={im.perspective} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
