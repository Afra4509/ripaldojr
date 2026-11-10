"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HARDWARE_CALLOUTS = [
  {
    num: "01",
    title: "DUAL-ARM GRIPPER END-EFFECTOR",
    sub: "Servo MG90S // PA6 // TIM3_CH1",
    desc: "Mekanisme capit presisi dengan sudut jepit 42° dan buka 20°. Dilengkapi teknologi micro-stepping 2 µs/step serta proteksi auto-detach PWM untuk mencegah motor panas saat menahan beban.",
  },
  {
    num: "02",
    title: "3-AXIS ARTICULATED ROBOTIC ARM",
    sub: "MG996R (Bahu) + MG90S (Siku)",
    desc: "Sendi bahu digerakkan servo torsi tinggi MG996R berbahan roda gigi logam (10°–160°), dipadukan sendi siku MG90S (20°–165°) untuk jangkauan payload hingga radius 200 mm.",
  },
  {
    num: "03",
    title: "4WD DIFFERENTIAL DRIVE TRAIN",
    sub: "4x Motor DC 12V Gearbox",
    desc: "Konfigurasi penggerak empat roda dengan wiring cross-polarity. Mampu melakukan differential pivot turn secara presisi dengan frekuensi kendali PWM 250 Hz Soft-Ramp.",
  },
  {
    num: "04",
    title: "HIGH-RIGIDITY ACRYLIC CHASSIS",
    sub: "Laser-cut 4mm Plate + Orange Posts",
    desc: "Pelat akrilik transparan berpresisi tinggi dengan pilar struktural oranye penopang getaran mekanis, memastikan kestabilan sumbu robot saat bermanuver pada kecepatan penuh.",
  },
  {
    num: "05",
    title: "STM32F401 & ISOLATED POWER BAY",
    sub: "ARM Cortex-M4 // Dual Buck 5V & 6V",
    desc: "Pusat pengendali mikrokontroler Black Pill dengan terminal PCT tahan getaran, regulator LM2596 (5.0V logika bersih) dan XL4015 (6.0V servo arus tinggi) dari baterai LiPo 3S 12V.",
  },
];

export default function RobotShowcase() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section
      id="showcase"
      className="bg-[#181818] py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-[#252525] relative"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Section label */}
        <span
          className="inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-[#929292] mb-10"
          style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
        >
          <span className="inline-block w-4 h-px bg-[#FF5728]" />
          02 / PANORAMA SHOWCASE
        </span>

        {/* Section Headline */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[0.92] tracking-[-0.025em] uppercase text-[#EAE8E2]"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              THE MACHINE
              <br />
              <span className="text-[#FF5728]">IN FOCUS.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-[14px] md:text-[15px] text-[#929292] leading-[1.7]">
              Dokumentasi visual ultra-wide resolusi tinggi menampilkan keseluruhan struktur mekanikal,
              roda 4WD berdaya traksi tinggi, dan modul lengan manipulator robotik RJ7 secara utuh.
            </p>
          </div>
        </div>

        {/* Cinematic Panorama Frame — Clean editorial presentation */}
        <div className="border border-[#303030] bg-[#101010] overflow-hidden shadow-2xl mb-12 group">
          {/* Header Bar */}
          <div className="px-6 py-4 bg-[#141414] border-b border-[#252525] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Compass size={15} className="text-[#FF5728]" />
              <span
                className="text-[10px] tracking-[0.2em] uppercase text-[#EAE8E2] font-semibold"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                RJ7 ROBOT TRANSPORTER — PANORAMIC VIEW
              </span>
            </div>

            <button
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center gap-2 border border-[#303030] bg-[#181818] hover:border-[#FF5728] text-[9px] tracking-[0.16em] uppercase text-[#EAE8E2] px-3.5 py-1.5 transition-colors"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              <ZoomIn size={12} />
              PERBESAR RESOLUSI PENUH
            </button>
          </div>

          {/* Main Panorama Image */}
          <div
            onClick={() => setLightboxOpen(true)}
            className="relative aspect-[16/7] w-full bg-[#0d0d0d] overflow-hidden cursor-pointer"
          >
            <Image
              src="/images/robot/robot-panorama.png"
              alt="RJ7 Robot Transporter Full Panorama View"
              fill
              className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.01]"
              sizes="100vw"
              quality={95}
              priority
            />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span
                className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] tracking-[0.2em] uppercase text-[#EAE8E2] bg-[#101010]/80 px-4 py-2 border border-[#303030]"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                KLIK UNTUK MEMPERBESAR
              </span>
            </div>
          </div>
        </div>

        {/* Clean Engineering Callouts Grid — Grounded technical information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {HARDWARE_CALLOUTS.map((item) => (
            <div
              key={item.num}
              className="border border-[#252525] bg-[#141414] p-5 flex flex-col justify-between hover:border-[#FF5728]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[11px] font-mono font-bold text-[#FF5728]"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {item.num}
                  </span>
                  <span
                    className="text-[9px] font-mono text-[#777] uppercase tracking-[0.14em]"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {item.sub}
                  </span>
                </div>
                <h4
                  className="text-[13px] font-bold text-[#EAE8E2] uppercase tracking-[0.06em] mb-2"
                  style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                >
                  {item.title}
                </h4>
              </div>
              <p className="text-[12px] leading-[1.65] text-[#929292]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox for Panorama */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#101010]/98 backdrop-blur-md flex flex-col justify-between"
          >
            <div className="px-6 py-4 border-b border-[#252525] bg-[#141414] flex items-center justify-between">
              <span
                className="text-[11px] tracking-[0.2em] uppercase text-[#FF5728] font-bold"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                RJ7 ROBOT TRANSPORTER — FULL RESOLUTION PANORAMA
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="w-9 h-9 flex items-center justify-center border border-[#303030] text-[#929292] hover:text-[#EAE8E2] transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 relative p-6 flex items-center justify-center">
              <div className="relative w-full h-full max-w-7xl max-h-[82vh]">
                <Image
                  src="/images/robot/robot-panorama.png"
                  alt="RJ7 Robot Panorama Full Res"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={100}
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#252525] bg-[#141414] flex items-center justify-between text-[11px] text-[#929292]">
              <span style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}>
                TEAM RIPALDO JR // 4WD TRANSPORTER PROTOTYPE
              </span>
              <span style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}>
                1920 × 760 HIGH DEFINITION
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
