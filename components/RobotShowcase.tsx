"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, Compass, Layers, ChevronRight, ChevronLeft, Check, Info, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CalloutItem {
  id: number;
  num: string;
  name: string;
  badgeLabel: string;
  title: string;
  sub: string;
  desc: string;
  specs: { k: string; v: string }[];
  targetX: number;
  targetY: number;
}

const HARDWARE_CALLOUTS: CalloutItem[] = [
  {
    id: 1,
    num: "01",
    name: "CAPIT",
    badgeLabel: "CAPIT DUAL-ARM",
    title: "DUAL-ARM GRIPPER END-EFFECTOR",
    sub: "Servo MG90S // PA6 // TIM3_CH1",
    desc: "Mekanisme capit presisi dengan sudut jepit 42° dan buka 20°. Dilengkapi teknologi micro-stepping 2 µs/step serta proteksi auto-detach PWM untuk mencegah motor panas saat menahan beban muatan.",
    specs: [
      { k: "Aktuator", v: "TowerPro MG90S Metal Gear" },
      { k: "Sinyal Kendali", v: "PWM 50 Hz via TIM3_CH1 (PA6)" },
      { k: "Sudut Gerak", v: "Buka 20° | Jepit 42°" },
      { k: "Fitur Proteksi", v: "Auto-Detach PWM pasca penjepitan" },
    ],
    targetX: 35.5,
    targetY: 67.5,
  },
  {
    id: 2,
    num: "02",
    name: "LENGAN 3-DOF",
    badgeLabel: "LENGAN ARTIKULASI",
    title: "3-AXIS ARTICULATED ROBOTIC ARM",
    sub: "MG996R (Bahu) + MG90S (Siku)",
    desc: "Sendi bahu digerakkan servo torsi tinggi MG996R berbahan logam (10°-160°), dipadukan sendi siku MG90S (20°-165°) dengan radius jangkau payload 200 mm secara stabil.",
    specs: [
      { k: "Sendi Bahu", v: "MG996R High-Torque 11 kg·cm (PA7 // TIM3_CH2)" },
      { k: "Sendi Siku", v: "MG90S Metal Gear 2.2 kg·cm (PB8 // TIM4_CH3)" },
      { k: "Radius Jangkau", v: "200 mm Forward Reach" },
      { k: "Material Link", v: "Akrilik Presisi 4mm CNC" },
    ],
    targetX: 41.5,
    targetY: 48.0,
  },
  {
    id: 3,
    num: "03",
    name: "4WD PENGGERAK",
    badgeLabel: "4WD GEARBOX MOTOR",
    title: "4WD DIFFERENTIAL DRIVE TRAIN",
    sub: "4x Motor DC 12V Gearbox + L298N",
    desc: "Konfigurasi penggerak empat roda dengan wiring cross-polarity. Mampu melakukan zero-radius differential pivot turn secara presisi dengan frekuensi PWM 250 Hz Soft-Ramp.",
    specs: [
      { k: "Driver Motor", v: "L298N Dual H-Bridge dengan Heatsink" },
      { k: "Aktuator Penggerak", v: "4x Motor DC 12V Gearbox Torsi Tinggi" },
      { k: "Modus Manuver", v: "Differential Pivot Turn (0° Radius)" },
      { k: "Frekuensi PWM", v: "250 Hz Soft-Ramp Smooth Acceleration" },
    ],
    targetX: 55.0,
    targetY: 74.0,
  },
  {
    id: 4,
    num: "04",
    name: "SASIS AKRILIK",
    badgeLabel: "SASIS AKRILIK 4MM",
    title: "HIGH-RIGIDITY ACRYLIC CHASSIS",
    sub: "Laser-cut 4mm Plate + Structural Posts",
    desc: "Pelat akrilik transparan berpresisi tinggi dengan pilar struktural penopang getaran mekanis, menjamin stabilitas sumbu gerak saat bermanuver pada kecepatan maksimum.",
    specs: [
      { k: "Ketebalan Pelat", v: "Akrilik Bening 4.0 mm Laser-Cut" },
      { k: "Pilar Struktural", v: "Pilar Heksagonal Oranye Tahan Getaran" },
      { k: "Dudukan Baterai", v: "Kompartemen Pusat Gravitasi Rendah" },
      { k: "Beban Maksimal", v: "Hingga 1.5 kg Payload" },
    ],
    targetX: 63.0,
    targetY: 57.0,
  },
  {
    id: 5,
    num: "05",
    name: "ELEKTRONIKA",
    badgeLabel: "STM32F401 & POWER BAY",
    title: "STM32F401 & ISOLATED POWER BAY",
    sub: "ARM Cortex-M4 84 MHz // Dual Buck 5V & 6V",
    desc: "Pusat pengendali mikrokontroler Black Pill dengan terminal PCT tahan getaran, regulator LM2596 (5.0V logika) dan XL4015 (6.0V servo) dari baterai LiPo 3S 12V.",
    specs: [
      { k: "Mikrokontroler", v: "STM32F401RCT6 Black Pill 84 MHz" },
      { k: "Regulasi Logika", v: "Buck LM2596 (5.0V Terisolasi)" },
      { k: "Regulasi Servo", v: "Buck XL4015 (6.0V, 5A Arus Tinggi)" },
      { k: "Terminal Bus", v: "PCT Clamp Terminals Anti-Vibrasi" },
    ],
    targetX: 51.5,
    targetY: 55.0,
  },
];

export default function RobotShowcase() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [subsystemModalOpen, setSubsystemModalOpen] = useState(false);
  const [activeCallout, setActiveCallout] = useState<number | null>(1);

  const selectedItem = HARDWARE_CALLOUTS.find((c) => c.id === activeCallout) || null;

  return (
    <section
      id="showcase"
      className="bg-[#0C0C0C] py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-[#242424] relative"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Section label */}
        <span
          className="inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-[#9E9D96] mb-10"
          style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
        >
          <span className="inline-block w-4 h-px bg-[#FF5728]" />
          02 / PANORAMA SHOWCASE
        </span>

        {/* Section Headline */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
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
          <div className="flex items-center gap-2">
            <span
              className="px-3 py-1 border border-[#2a2a2a] bg-[#121212] text-[10px] font-mono tracking-wider uppercase text-[#9E9D96]"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              INTERACTIVE 3D BLUEPRINT // 5 SUBSISTEM
            </span>
          </div>
        </div>

        {/* Interactive CAD Blueprint Frame */}
        <div className="border border-white/[0.08] bg-[#0E0E0E] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group corner-bracket">
          {/* Top Control Bar */}
          <div className="px-5 py-3.5 bg-[#141414] border-b border-white/[0.08] flex items-center justify-between z-20 relative">
            <div className="flex items-center gap-3">
              <Compass size={15} className="text-[#FF5728]" />
              <span
                className="text-[10px] tracking-[0.2em] uppercase text-[#EAE8E2] font-semibold"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                RJ7 ROBOT TRANSPORTER // ANNOTATED HARDWARE BLUEPRINT
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
                className="inline-flex items-center gap-2 border border-[#282828] bg-[#181818] hover:border-[#FF5728] text-[9px] tracking-[0.16em] uppercase text-[#EAE8E2] px-3.5 py-1.5 transition-colors font-mono"
              >
                <ZoomIn size={12} />
                PERBESAR
              </button>
            </div>
          </div>

          {/* Main Stage Grid (Visual Canvas on Left/Center, Dedicated HUD Inspector on Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:min-h-[580px]">
            {/* Visual Canvas (8 cols on lg) */}
            <div className="lg:col-span-8 relative bg-[#0A0A0A] overflow-hidden flex items-center justify-center p-4 md:p-8 min-h-[380px] lg:min-h-full">
              {/* CAD Grid */}
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

              {/* Central Robot 3D Render */}
              <div className="relative w-full h-full max-h-[460px] aspect-[16/10] pointer-events-none">
                <Image
                  src="/images/robot/robot-panorama.png"
                  alt="RJ7 Robot Transporter Full Panorama View"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  quality={95}
                  priority
                />
              </div>

              {/* Interactive Hotspot Pins and In-Frame Annotation Badges directly on the model */}
              <div className="absolute inset-0 pointer-events-auto">
                {HARDWARE_CALLOUTS.map((item) => {
                  const isSelected = activeCallout === item.id;
                  return (
                    <div
                      key={item.id}
                      style={{ left: `${item.targetX}%`, top: `${item.targetY}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center group/pin"
                    >
                      <button
                        onClick={() => setActiveCallout(item.id)}
                        className="relative p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5728]"
                        aria-label={`Inspect ${item.title}`}
                      >
                        {/* Pulse Ring when Selected */}
                        {isSelected && (
                          <span className="absolute inset-1 rounded-full border border-[#FF5728] animate-ping opacity-75" />
                        )}

                        {/* Pin Button */}
                        <span
                          className={`relative w-7 h-7 flex items-center justify-center rounded-full text-[10px] font-mono font-bold transition-all duration-200 ${
                            isSelected
                              ? "bg-[#FF5728] text-black scale-110 shadow-[0_0_15px_rgba(255,87,40,0.6)]"
                              : "bg-[#141414]/90 text-[#EAE8E2] border border-[#FF5728]/70 hover:border-[#FF5728] hover:scale-110"
                          }`}
                        >
                          {item.num}
                        </span>
                      </button>

                      {/* In-Frame Connected Leader Tag (Directly inside image canvas) */}
                      <button
                        onClick={() => setActiveCallout(item.id)}
                        className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-mono tracking-wider uppercase border transition-all duration-200 ml-1.5 ${
                          isSelected
                            ? "bg-[#FF5728] text-black border-[#FF5728] font-bold shadow-[0_0_12px_rgba(255,87,40,0.5)] translate-x-1"
                            : "bg-[#101010]/85 text-[#9E9D96] border-[#303030] hover:text-[#EAE8E2] hover:border-[#FF5728]/70 backdrop-blur-sm"
                        }`}
                        style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                      >
                        <span>{item.badgeLabel}</span>
                        {isSelected ? (
                          <Check size={11} className="text-black" />
                        ) : (
                          <ChevronRight size={12} className="text-[#9E9D96]" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Canvas Corner Technical Coordinates */}
              <div className="absolute bottom-3 left-3 text-[8px] font-mono text-[#555] pointer-events-none uppercase tracking-widest hidden sm:block">
                SYS: 3D CAD MODEL // PANORAMA ORBIT 0° // RJ7
              </div>
            </div>

            {/* Dedicated HUD Inspector Panel (4 cols on lg, below on mobile) */}
            <div className="lg:col-span-4 bg-[#111111] border-t lg:border-t-0 lg:border-l border-white/[0.08] p-6 flex flex-col justify-between">
              {selectedItem ? (
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                      <span
                        className="text-[10px] font-mono font-bold text-[#FF5728] tracking-widest uppercase"
                        style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                      >
                        {selectedItem.num} // SUBSISTEM
                      </span>
                      <span
                        className="text-[9px] font-mono text-[#777] uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                      >
                        RJ7 ARCHITECTURE
                      </span>
                    </div>

                    {/* Subsystem Title */}
                    <h3
                      className="text-[17px] font-bold text-[#EAE8E2] uppercase tracking-[0.04em] leading-snug mb-2"
                      style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                    >
                      {selectedItem.title}
                    </h3>

                    {/* Sub / Tag */}
                    <div className="inline-block px-2.5 py-1 bg-[#181818] border border-white/[0.08] text-[10px] font-mono text-[#FF5728] mb-3">
                      {selectedItem.sub}
                    </div>

                    {/* Inspection Button (Clean Layout - Details in Modal) */}
                    <button
                      onClick={() => setSubsystemModalOpen(true)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/[0.08] bg-[#161616] hover:border-[#FF5728] text-[10px] font-mono tracking-wider uppercase text-[#FF5728] hover:text-[#FFA07A] mb-5 transition-all w-full justify-between"
                      style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Info size={12} />
                        <span>DETAIL DESKRIPSI TEKNIS</span>
                      </span>
                      <ArrowUpRight size={12} />
                    </button>

                    {/* Spec Items Table */}
                    <div className="border border-white/[0.08] bg-[#0E0E0E] divide-y divide-white/[0.06] mb-6">
                      {selectedItem.specs.map((s) => (
                        <div
                          key={s.k}
                          className="px-3.5 py-2 flex items-center justify-between text-[11px]"
                        >
                          <span
                            className="text-[#777] uppercase tracking-wider font-mono text-[9.5px]"
                          >
                            {s.k}
                          </span>
                          <span className="text-[#EAE8E2] font-mono text-right text-[11px]">
                            {s.v}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subsystem Navigation Arrows */}
                  <div className="pt-4 border-t border-[#202020] flex items-center justify-between">
                    <button
                      onClick={() => {
                        const prevId = selectedItem.id === 1 ? HARDWARE_CALLOUTS.length : selectedItem.id - 1;
                        setActiveCallout(prevId);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#282828] bg-[#161616] hover:border-[#FF5728] text-[10px] font-mono text-[#EAE8E2] transition-colors"
                    >
                      <ChevronLeft size={13} />
                      SEBELUMNYA
                    </button>

                    <span className="text-[10px] font-mono text-[#666]">
                      {selectedItem.id} / {HARDWARE_CALLOUTS.length}
                    </span>

                    <button
                      onClick={() => {
                        const nextId = selectedItem.id === HARDWARE_CALLOUTS.length ? 1 : selectedItem.id + 1;
                        setActiveCallout(nextId);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#282828] bg-[#161616] hover:border-[#FF5728] text-[10px] font-mono text-[#EAE8E2] transition-colors"
                    >
                      SELANJUTNYA
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <Layers size={24} className="text-[#555] mb-3" />
                  <p className="text-[12px] font-mono text-[#777] uppercase tracking-wider">
                    Pilih salah satu pin pada model untuk inspeksi
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Interactive Component Quick-Selector Bar */}
          <div className="px-5 py-3 bg-[#141414] border-t border-[#242424] flex flex-wrap items-center justify-between gap-2 z-20 relative">
            <div className="flex items-center gap-2">
              <Layers size={13} className="text-[#FF5728]" />
              <span
                className="text-[9px] tracking-[0.2em] uppercase text-[#9E9D96] font-semibold"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                PILIH SUBSISTEM:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {HARDWARE_CALLOUTS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCallout(c.id)}
                  className={`px-3 py-1 text-[9.5px] font-mono tracking-wider uppercase border transition-colors ${
                    activeCallout === c.id
                      ? "bg-[#FF5728] text-black font-bold border-[#FF5728]"
                      : "bg-[#181818] text-[#9E9D96] border-[#2A2A2A] hover:text-[#EAE8E2] hover:border-[#444]"
                  }`}
                >
                  {c.num} {c.name}
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
            className="fixed inset-0 z-50 bg-[#0C0C0C]/98 backdrop-blur-md flex flex-col justify-between"
          >
            <div className="px-6 py-4 border-b border-[#242424] bg-[#141414] flex items-center justify-between">
              <span
                className="text-[11px] tracking-[0.2em] uppercase text-[#FF5728] font-bold"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                RJ7 ROBOT TRANSPORTER // FULL RESOLUTION PANORAMA
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="w-9 h-9 flex items-center justify-center border border-[#282828] text-[#9E9D96] hover:text-[#EAE8E2] transition-colors"
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
            <div className="px-6 py-4 border-t border-[#242424] bg-[#141414] flex items-center justify-between text-[11px] text-[#9E9D96]">
              <span style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}>
                TEAM RIPALDO JR // 4WD TRANSPORTER PROTOTYPE
              </span>
              <span style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}>
                1920 x 760 HIGH DEFINITION
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Subsystem Detail Inspection Modal */}
      <AnimatePresence>
        {subsystemModalOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSubsystemModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border border-white/[0.1] border-t-2 border-t-[#FF5728] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative corner-bracket"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF5728]" />
                  <span
                    className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#FF5728]"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {selectedItem.num} // {selectedItem.title}
                  </span>
                </div>
                <button
                  onClick={() => setSubsystemModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center border border-white/[0.1] text-[#9E9D96] hover:text-[#EAE8E2] hover:border-[#FF5728] transition-colors"
                  aria-label="Tutup modal"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="inline-block px-2.5 py-1 bg-[#181818] border border-white/[0.08] text-[10px] font-mono text-[#FF5728] mb-4">
                {selectedItem.sub}
              </div>

              <p className="text-[13px] leading-[1.75] text-[#9E9D96] mb-6">
                {selectedItem.desc}
              </p>

              <div className="border border-white/[0.08] bg-[#0E0E0E] divide-y divide-white/[0.06] mb-6">
                {selectedItem.specs.map((s) => (
                  <div key={s.k} className="px-3.5 py-2 flex items-center justify-between text-[11px]">
                    <span className="text-[#888] uppercase tracking-wider font-mono text-[9.5px]">
                      {s.k}
                    </span>
                    <span className="text-[#EAE8E2] font-mono text-right text-[11px]">
                      {s.v}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#666]">
                <span>SUBSYSTEM CAD SPECIFICATION</span>
                <span className="text-[#FF5728]">VERIFIED</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
