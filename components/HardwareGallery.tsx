"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { motion, useInView } from "framer-motion";
import { Maximize2, ArrowUpRight } from "lucide-react";
import { ImageLightbox, type GalleryImage } from "./ImageLightbox";

const IMAGES: GalleryImage[] = [
  {
    src: "/images/robot/front.png",
    label: "FRONT VIEW",
    index: "01",
    tag: "PERSPECTIVE // FRONT",
    perspective: "FRONT MECHANICAL ASSEMBLY",
    caption:
      "Front mechanical assembly showing the dual-arm robotic gripper, acrylic chassis front bulkhead, and high-traction drive wheels.",
  },
  {
    src: "/images/robot/side-left.png",
    label: "LEFT SIDE VIEW",
    index: "02",
    tag: "PERSPECTIVE // LEFT",
    perspective: "LEFT PROFILE & LINKAGE",
    caption:
      "Full left profile detailing the orange arm linkage geometry, structural riser brackets, servo pivot joints, and wheel alignment.",
  },
  {
    src: "/images/robot/side-right.png",
    label: "RIGHT SIDE VIEW",
    index: "03",
    tag: "PERSPECTIVE // RIGHT",
    perspective: "RIGHT PROFILE & SERVO MOUNT",
    caption:
      "Opposite mechanical profile showing servo actuator mounting, gripper actuation rods, and lateral chassis rigidity supports.",
  },
  {
    src: "/images/robot/rear.png",
    label: "REAR VIEW",
    index: "04",
    tag: "PERSPECTIVE // REAR",
    perspective: "REAR CHASSIS & ELECTRONICS",
    caption:
      "Rear structural chassis exhibiting battery tray integration, L298N driver heatsink, motor wire routing, and power distribution terminals.",
  },
  {
    src: "/images/robot/detail.png",
    label: "DETAIL VIEW",
    index: "05",
    tag: "PERSPECTIVE // MACRO",
    perspective: "DUAL-ARM GRIPPER MECHANISM",
    caption:
      "Close-up inspection of the articulated gripper end-effector, compliant mechanical fingers, and precision pivot hardware.",
  },
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HardwareCard({
  img,
  onClick,
  priority = false,
  aspectClass = "aspect-[16/10]",
}: {
  img: GalleryImage;
  onClick: () => void;
  priority?: boolean;
  aspectClass?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="card group relative bg-[#141414] border border-[#242424] hover:border-[#FF5728]/60 overflow-hidden cursor-pointer flex flex-col justify-between transition-colors duration-300"
      tabIndex={0}
      role="button"
      aria-label={`View ${img.perspective}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Image container */}
      <div className={`relative overflow-hidden w-full ${aspectClass} bg-[#111111]`}>
        <Image
          src={img.src}
          alt={img.perspective}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          quality={85}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-400" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span
            className="text-[9px] tracking-[0.2em] uppercase text-[#EAE8E2] bg-[#101010]/80 backdrop-blur-sm px-2 py-1 border border-[#303030]"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            {img.tag}
          </span>
          <span
            className="inline-flex items-center gap-1 text-[9px] tracking-[0.2em] uppercase text-[#FF5728] bg-[#101010]/80 backdrop-blur-sm px-2 py-1 border border-[#FF5728]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            <span>EXPAND</span>
            <Maximize2 size={10} />
          </span>
        </div>
      </div>

      {/* Meta Bar */}
      <div className="p-5 flex flex-col justify-between flex-1 border-t border-[#303030]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] tracking-[0.26em] text-[#FF5728] font-bold"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              {img.index}
            </span>
            <span
              className="text-[11px] tracking-[0.16em] uppercase text-[#EAE8E2] font-semibold"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              {img.label}
            </span>
          </div>
          <span
            className="inline-flex items-center gap-1 text-[10px] tracking-[0.18em] uppercase text-[#929292] group-hover:text-[#FF5728] transition-colors"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            <span>INSPECT</span>
            <ArrowUpRight size={12} />
          </span>
        </div>

        <h4
          className="text-[13px] text-[#EAE8E2] uppercase font-bold tracking-[0.08em]"
          style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
        >
          {img.perspective}
        </h4>
      </div>
    </motion.div>
  );
}

export default function HardwareGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <section
        id="hardware"
        className="bg-[#0C0C0C] py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-[#242424]"
      >
        <div className="max-w-[1360px] mx-auto">
          {/* Section label */}
          <FadeIn>
            <span
              className="inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-[#9E9D96] mb-10"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              <span className="inline-block w-4 h-px bg-[#FF5728]" />
              03 / HARDWARE EXPLORATION
            </span>
          </FadeIn>

          {/* Headline & description */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <FadeIn delay={0.1} className="max-w-xl">
              <h2
                className="text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[0.92] tracking-[-0.025em] uppercase text-[#EAE8E2]"
                style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
              >
                EVERY ANGLE.
                <br />
                EVERY <span className="text-[#FF5728]">COMPONENT.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <span
                className="px-3 py-1 border border-[#2a2a2a] bg-[#121212] text-[10px] font-mono tracking-wider uppercase text-[#9E9D96]"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                5 HIGH-DEFINITION PERSPECTIVES // CAD VERIFIED
              </span>
            </FadeIn>
          </div>

          {/* Asymmetric Hardware Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
            {/* Row 1: Front Assembly (Large featured 7 cols) */}
            <div className="lg:col-span-7">
              <HardwareCard
                img={IMAGES[0]}
                onClick={() => setLightboxIndex(0)}
                priority
                aspectClass="aspect-[16/11]"
              />
            </div>

            {/* Row 1: Left Side View (5 cols) */}
            <div className="lg:col-span-5">
              <HardwareCard
                img={IMAGES[1]}
                onClick={() => setLightboxIndex(1)}
                aspectClass="aspect-[16/11]"
              />
            </div>

            {/* Row 2: Right Side View (4 cols) */}
            <div className="lg:col-span-4">
              <HardwareCard
                img={IMAGES[2]}
                onClick={() => setLightboxIndex(2)}
                aspectClass="aspect-[4/3]"
              />
            </div>

            {/* Row 2: Rear Chassis & Wiring (4 cols) */}
            <div className="lg:col-span-4">
              <HardwareCard
                img={IMAGES[3]}
                onClick={() => setLightboxIndex(3)}
                aspectClass="aspect-[4/3]"
              />
            </div>

            {/* Row 2: Gripper Detail (4 cols) */}
            <div className="lg:col-span-4">
              <HardwareCard
                img={IMAGES[4]}
                onClick={() => setLightboxIndex(4)}
                aspectClass="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={IMAGES}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
