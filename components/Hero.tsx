"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowDown, Info, X, Shield } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.loop = true;
      v.play().catch(() => {});
    }
  }, []);

  return (
    <>
      <section
        className="hero relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden bg-[#0C0C0C]"
        aria-labelledby="hero-h"
      >
        {/* High-res cinematic fallback poster */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/robot/hero-poster.jpg"
            alt="RJ7 Robot Transporter System"
            fill
            priority
            className="object-cover object-center brightness-90"
            sizes="100vw"
          />
        </div>

        {/* Background Video with direct multi-source fallback */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/robot/hero-poster.jpg"
          className="absolute inset-0 z-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        >
          <source src="/api/hero-video" type="video/mp4" />
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark Vignette & Gradients to guarantee text readability */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none z-[1]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent pointer-events-none z-[1]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0C0C0C]/85 to-transparent pointer-events-none z-[1]" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 pt-28 pb-12 md:pb-16 max-w-[1360px] mx-auto">
          {/* Main headline block */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="mb-2">
                <span
                  className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-[#FF5728] font-bold"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  RJ7 ROBOT TRANSPORTER
                </span>
              </div>
              <h1
                id="hero-h"
                className="text-[clamp(3.2rem,8.5vw,8.5rem)] font-bold leading-[0.88] tracking-[-0.03em] uppercase text-[#EAE8E2]"
                style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
              >
                ENGINEERED
                <br />
                <span className="text-[#FF5728]">TO MOVE.</span>
              </h1>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 border-t border-[#262626]">
              {/* Minimalist Specs Bar + Action Buttons */}
              <div className="flex flex-col gap-4 max-w-xl">
                {/* Clean Specs Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="px-2.5 py-1 border border-[#303030] bg-[#141414]/90 text-[10px] font-mono tracking-wider uppercase text-[#EAE8E2]"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    STM32F401 // 84 MHz
                  </span>
                  <span
                    className="px-2.5 py-1 border border-[#303030] bg-[#141414]/90 text-[10px] font-mono tracking-wider uppercase text-[#9E9D96]"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    4WD CHASSIS
                  </span>
                  <span
                    className="px-2.5 py-1 border border-[#303030] bg-[#141414]/90 text-[10px] font-mono tracking-wider uppercase text-[#9E9D96]"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    3-AXIS ARM
                  </span>
                  <button
                    onClick={() => setDetailModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#FF5728]/50 bg-[#161616] hover:bg-[#FF5728]/10 text-[10px] font-mono tracking-wider uppercase text-[#FF5728] transition-colors"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                    aria-label="Buka ringkasan sistem RJ7"
                  >
                    <Info size={12} />
                    <span>DETAIL SISTEM</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#overview"
                    className="btn btn--primary inline-flex items-center gap-2.5 text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3.5 group bg-[#FF5728] text-black hover:bg-[#ff6e45]"
                    style={{
                      fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)",
                    }}
                  >
                    <span>EXPLORE THE SYSTEM</span>
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </a>

                  <a
                    href="#showcase"
                    className="btn btn--secondary inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#9E9D96] hover:text-[#EAE8E2] px-4 py-3"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    <span>PANORAMA SHOWCASE</span>
                    <ArrowDown size={12} />
                  </a>
                </div>
              </div>

              {/* Right meta */}
              <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                <span
                  className="block text-[10px] tracking-[0.22em] uppercase text-[#EAE8E2]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  AUTONOMOUS ENGINEERING / 2026
                </span>
                <span
                  className="block text-[9px] tracking-[0.22em] uppercase text-[#9E9D96]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  TEAM RIPALDO JR // RJ7
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-60">
          <div className="w-[1px] h-6 bg-[#FF5728]" />
          <span
            className="text-[8px] tracking-[0.3em] uppercase text-[#9E9D96]"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            SCROLL
          </span>
        </div>
      </section>

      {/* System Overview Detail Modal */}
      <AnimatePresence>
        {detailModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setDetailModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border border-[#262626] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#222]">
                <div className="flex items-center gap-2.5">
                  <Shield size={16} className="text-[#FF5728]" />
                  <span
                    className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#FF5728]"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    RINGKASAN TEKNIS SISTEM RJ7
                  </span>
                </div>
                <button
                  onClick={() => setDetailModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center border border-[#2a2a2a] text-[#9E9D96] hover:text-[#EAE8E2] hover:border-[#FF5728] transition-colors"
                  aria-label="Tutup modal"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="space-y-4 text-[13px] leading-[1.7] text-[#9E9D96]">
                <p>
                  Sistem robotika transport dan manipulasi terintegrasi bertenaga{" "}
                  <strong className="text-[#EAE8E2] font-semibold">STM32F401 ARM Cortex-M4</strong>,
                  dikembangkan oleh <strong className="text-[#EAE8E2] font-semibold">Team Ripaldo Jr (ITS)</strong>{" "}
                  melalui sinergi divisi{" "}
                  <span className="text-[#EAE8E2] font-medium border-b border-[#FF5728]/50">Electrical</span>,{" "}
                  <span className="text-[#EAE8E2] font-medium border-b border-[#FF5728]/50">Mechanical</span>, dan{" "}
                  <span className="text-[#EAE8E2] font-medium border-b border-[#FF5728]/50">Programming</span>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="border border-[#222] bg-[#161616] p-3">
                    <span className="text-[9px] font-mono text-[#FF5728] uppercase block mb-1">ELECTRICAL</span>
                    <span className="text-[11px] text-[#EAE8E2] leading-tight block">Dual Buck LM2596 (5V) & XL4015 (6V)</span>
                  </div>
                  <div className="border border-[#222] bg-[#161616] p-3">
                    <span className="text-[9px] font-mono text-[#FF5728] uppercase block mb-1">MECHANICAL</span>
                    <span className="text-[11px] text-[#EAE8E2] leading-tight block">Sasis 4WD & Lengan 3-DOF</span>
                  </div>
                  <div className="border border-[#222] bg-[#161616] p-3">
                    <span className="text-[9px] font-mono text-[#FF5728] uppercase block mb-1">PROGRAMMING</span>
                    <span className="text-[11px] text-[#EAE8E2] leading-tight block">TIM PWM 250Hz & UART 38400</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-6 border-t border-[#222] flex items-center justify-between text-[10px] font-mono text-[#666]">
                <span>INSTITUT TEKNOLOGI SEPULUH NOPEMBER</span>
                <span className="text-[#FF5728]">PROTOTYPE VERIFIED</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
