"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, Compass, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CalloutItem {
  num: string;
  id: number;
  title: string;
  sub: string;
  desc: string;
  // Percentage coordinates relative to image (0-100)
  targetX: number;
  targetY: number;
  // Card anchor point
  anchorX: number;
  anchorY: number;
  elbowX: number;
  elbowY: number;
  side: "left" | "right";
  // Desktop card positioning
  desktopStyle: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const HARDWARE_CALLOUTS: CalloutItem[] = [
  {
    id: 1,
    num: "01",
    title: "DUAL-ARM GRIPPER END-EFFECTOR",
    sub: "Servo MG90S // PA6 // TIM3_CH1",
    desc: "Mekanisme capit presisi dengan sudut jepit 42° dan buka 20°. Dilengkapi teknologi micro-stepping 2 µs/step serta proteksi auto-detach PWM.",
    targetX: 35.5,
    targetY: 67.5,
    anchorX: 25.0,
    anchorY: 72.0,
    elbowX: 30.5,
    elbowY: 72.0,
    side: "left",
    desktopStyle: {
      bottom: "10%",
      left: "3%",
    },
  },
  {
    id: 2,
    num: "02",
    title: "3-AXIS ARTICULATED ROBOTIC ARM",
    sub: "MG996R (Bahu) + MG90S (Siku)",
    desc: "Sendi bahu digerakkan servo torsi tinggi MG996R berbahan logam (10°–160°), dipadukan sendi siku MG90S (20°–165°) dengan radius jangkau 200 mm.",
    targetX: 41.5,
    targetY: 51.5,
    anchorX: 25.5,
    anchorY: 34.0,
    elbowX: 33.5,
    elbowY: 34.0,
    side: "left",
    desktopStyle: {
      top: "12%",
      left: "3%",
    },
  },
  {
    id: 3,
    num: "03",
    title: "4WD DIFFERENTIAL DRIVE TRAIN",
    sub: "4x Motor DC 12V Gearbox",
    desc: "Konfigurasi penggerak empat roda dengan wiring cross-polarity. Mampu melakukan zero-radius differential pivot turn dengan PWM 250 Hz Soft-Ramp.",
    targetX: 55.0,
    targetY: 74.0,
    anchorX: 74.5,
    anchorY: 78.0,
    elbowX: 66.0,
    elbowY: 78.0,
    side: "right",
    desktopStyle: {
      bottom: "10%",
      right: "3%",
    },
  },
  {
    id: 4,
    num: "04",
    title: "HIGH-RIGIDITY ACRYLIC CHASSIS",
    sub: "Laser-cut 4mm Plate + Orange Posts",
    desc: "Pelat akrilik transparan berpresisi tinggi dengan pilar struktural penopang getaran mekanis, menjamin stabilitas sumbu gerak saat bermanuver penuh.",
    targetX: 62.0,
    targetY: 57.0,
    anchorX: 74.5,
    anchorY: 53.0,
    elbowX: 68.0,
    elbowY: 53.0,
    side: "right",
    desktopStyle: {
      top: "43%",
      right: "3%",
    },
  },
  {
    id: 5,
    num: "05",
    title: "STM32F401 & ISOLATED POWER BAY",
    sub: "ARM Cortex-M4 // Dual Buck 5V & 6V",
    desc: "Pusat pengendali mikrokontroler Black Pill dengan terminal PCT tahan getaran, regulator LM2596 (5.0V) dan XL4015 (6.0V) dari baterai LiPo 3S 12V.",
    targetX: 51.5,
    targetY: 55.0,
    anchorX: 74.5,
    anchorY: 26.0,
    elbowX: 64.5,
    elbowY: 26.0,
    side: "right",
    desktopStyle: {
      top: "10%",
      right: "3%",
    },
  },
];

export default function RobotShowcase() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeCallout, setActiveCallout] = useState<number | null>(null);

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
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
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
              Eksplorasi blueprint interaktif 3D struktur mekanikal, aktuator capit, sasis 4WD, dan tata letak kelistrikan robot transporter RJ7 secara terintegrasi.
            </p>
          </div>
        </div>

        {/* Interactive CAD Blueprint Frame with Internal Callout Leader Lines */}
        <div className="border border-[#303030] bg-[#101010] shadow-2xl relative overflow-hidden group">
          {/* Top Control Bar */}
          <div className="px-5 py-3.5 bg-[#141414] border-b border-[#252525] flex items-center justify-between z-20 relative">
            <div className="flex items-center gap-3">
              <Compass size={15} className="text-[#FF5728]" />
              <span
                className="text-[10px] tracking-[0.2em] uppercase text-[#EAE8E2] font-semibold"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                RJ7 ROBOT TRANSPORTER — ANNOTATED HARDWARE BLUEPRINT
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="hidden md:inline-block text-[9px] tracking-[0.2em] uppercase text-[#777]"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                INTERACTIVE CAD VIEWER
              </span>
              <button
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-2 border border-[#303030] bg-[#181818] hover:border-[#FF5728] text-[9px] tracking-[0.16em] uppercase text-[#EAE8E2] px-3.5 py-1.5 transition-colors"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                <ZoomIn size={12} />
                PERBESAR
              </button>
            </div>
          </div>

          {/* Main Visual Stage (Contains Image, SVG Leader Lines, and Internal Cards) */}
          <div className="relative w-full aspect-[16/10] md:aspect-[16/8] lg:aspect-[16/7.5] min-h-[500px] lg:min-h-[580px] bg-[#0c0c0c] overflow-hidden select-none">
            {/* Fine CAD Coordinate Grid Background */}
            <div
              className="absolute inset-0 opacity-[0.035] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #EAE8E2 1px, transparent 1px),
                  linear-gradient(to bottom, #EAE8E2 1px, transparent 1px)
                `,
                backgroundSize: "32px 32px",
              }}
            />

            {/* Central Robot 3D Render Image */}
            <div className="absolute inset-0 flex items-center justify-center p-2 md:p-6 pointer-events-none">
              <div className="relative w-full h-full">
                <Image
                  src="/images/robot/robot-panorama.png"
                  alt="RJ7 Robot Transporter Full Panorama View"
                  fill
                  className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  sizes="100vw"
                  quality={95}
                  priority
                />
              </div>
            </div>

            {/* SVG Leader Lines Layer (Connects Callouts Directly to Robot Parts) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="0.4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {HARDWARE_CALLOUTS.map((item) => {
                const isFocused = activeCallout === null || activeCallout === item.id;
                const isSelected = activeCallout === item.id;

                return (
                  <g
                    key={item.id}
                    className="transition-opacity duration-300"
                    style={{ opacity: isFocused ? 1 : 0.2 }}
                  >
                    {/* Leader Line path: Anchor -> Elbow -> Target */}
                    <polyline
                      points={`${item.anchorX},${item.anchorY} ${item.elbowX},${item.elbowY} ${item.targetX},${item.targetY}`}
                      fill="none"
                      stroke={isSelected ? "#FF5728" : "#EAE8E2"}
                      strokeWidth={isSelected ? "0.3" : "0.18"}
                      strokeDasharray={isSelected ? "none" : "0.8,0.8"}
                      filter={isSelected ? "url(#glow)" : undefined}
                    />

                    {/* Target Pin on Robot Component */}
                    <circle
                      cx={item.targetX}
                      cy={item.targetY}
                      r={isSelected ? "0.9" : "0.6"}
                      fill="#FF5728"
                      stroke="#101010"
                      strokeWidth="0.2"
                    />
                    {isSelected && (
                      <circle
                        cx={item.targetX}
                        cy={item.targetY}
                        r="1.8"
                        fill="none"
                        stroke="#FF5728"
                        strokeWidth="0.15"
                        opacity="0.6"
                      />
                    )}

                    {/* Small connection dot at elbow */}
                    <circle
                      cx={item.elbowX}
                      cy={item.elbowY}
                      r="0.3"
                      fill={isSelected ? "#FF5728" : "#888"}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Desktop Internal Callout Cards Placed Around Robot */}
            <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block">
              {HARDWARE_CALLOUTS.map((item) => {
                const isSelected = activeCallout === item.id;
                const isDimmed = activeCallout !== null && !isSelected;

                return (
                  <div
                    key={item.id}
                    style={{ ...item.desktopStyle, width: "270px" }}
                    className={`absolute pointer-events-auto transition-all duration-300 ${
                      isDimmed ? "opacity-30 scale-95" : "opacity-100 scale-100"
                    }`}
                    onMouseEnter={() => setActiveCallout(item.id)}
                    onMouseLeave={() => setActiveCallout(null)}
                  >
                    <div
                      className={`p-3.5 border transition-all duration-200 cursor-pointer shadow-2xl backdrop-blur-md ${
                        isSelected
                          ? "bg-[#181818]/95 border-[#FF5728] shadow-[0_0_25px_rgba(255,87,40,0.15)]"
                          : "bg-[#121212]/90 border-[#303030] hover:border-[#FF5728]/70 hover:bg-[#161616]/95"
                      }`}
                      onClick={() =>
                        setActiveCallout(activeCallout === item.id ? null : item.id)
                      }
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-[10px] font-mono font-bold text-[#FF5728]"
                          style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                        >
                          {item.num} // {item.side === "left" ? "FRONT WING" : "REAR BAY"}
                        </span>
                        <span
                          className="text-[8px] font-mono text-[#777] uppercase tracking-[0.14em]"
                          style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                        >
                          {item.sub.split("//")[0]}
                        </span>
                      </div>

                      <h4
                        className="text-[12px] font-bold text-[#EAE8E2] uppercase tracking-[0.05em] mb-1 leading-snug"
                        style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                      >
                        {item.title}
                      </h4>

                      <p className="text-[11px] leading-[1.55] text-[#929292]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile / Tablet Interactive Pins on the Robot */}
            <div className="absolute inset-0 z-20 pointer-events-auto lg:hidden">
              {HARDWARE_CALLOUTS.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    setActiveCallout(activeCallout === item.id ? null : item.id)
                  }
                  style={{ left: `${item.targetX}%`, top: `${item.targetY}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full text-[10px] font-mono font-bold transition-transform ${
                    activeCallout === item.id
                      ? "bg-[#FF5728] text-black scale-125 shadow-lg border-2 border-white"
                      : "bg-[#181818]/90 text-[#EAE8E2] border border-[#FF5728] scale-100"
                  }`}
                  aria-label={`Inspect ${item.title}`}
                >
                  {item.num}
                </button>
              ))}

              {/* Mobile Active Callout Bottom Drawer */}
              <AnimatePresence>
                {activeCallout !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute inset-x-3 bottom-3 p-4 border border-[#FF5728] bg-[#141414]/95 backdrop-blur-md shadow-2xl z-30"
                  >
                    {(() => {
                      const item = HARDWARE_CALLOUTS.find((c) => c.id === activeCallout);
                      if (!item) return null;
                      return (
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span
                              className="text-[10px] font-mono font-bold text-[#FF5728]"
                              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                            >
                              {item.num} // {item.sub}
                            </span>
                            <button
                              onClick={() => setActiveCallout(null)}
                              className="text-[#929292] hover:text-[#EAE8E2] text-xs font-mono"
                            >
                              ✕
                            </button>
                          </div>
                          <h4
                            className="text-[13px] font-bold text-[#EAE8E2] uppercase tracking-[0.05em] mb-1"
                            style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                          >
                            {item.title}
                          </h4>
                          <p className="text-[11px] leading-[1.5] text-[#929292]">
                            {item.desc}
                          </p>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Interactive Component Quick-Selector Bar */}
          <div className="px-5 py-3 bg-[#141414] border-t border-[#252525] flex flex-wrap items-center justify-between gap-2 z-20 relative">
            <div className="flex items-center gap-2">
              <Layers size={13} className="text-[#FF5728]" />
              <span
                className="text-[9px] tracking-[0.2em] uppercase text-[#929292] font-semibold"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                SUBSISTEM:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setActiveCallout(null)}
                className={`px-2.5 py-1 text-[9px] font-mono tracking-wider uppercase border transition-colors ${
                  activeCallout === null
                    ? "bg-[#FF5728] text-black font-bold border-[#FF5728]"
                    : "bg-[#181818] text-[#929292] border-[#303030] hover:text-[#EAE8E2]"
                }`}
              >
                SEMUA POINTER
              </button>
              {HARDWARE_CALLOUTS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCallout(activeCallout === c.id ? null : c.id)}
                  className={`px-2.5 py-1 text-[9px] font-mono tracking-wider uppercase border transition-colors ${
                    activeCallout === c.id
                      ? "bg-[#FF5728] text-black font-bold border-[#FF5728]"
                      : "bg-[#181818] text-[#929292] border-[#303030] hover:text-[#EAE8E2]"
                  }`}
                >
                  {c.num} {c.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
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
