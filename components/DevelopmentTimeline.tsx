"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, CheckCircle2, FileText } from "lucide-react";

const STAGES = [
  {
    index: "01",
    phase: "PHASE 01 // ANALYSIS",
    title: "CONCEPT & REQUIREMENTS SPECIFICATION",
    description:
      "Team Ripaldo Jr merumuskan spesifikasi fungsional robot transport: sistem gerak 4WD differential pivot turn, lengan artikulasi 3-DOF dengan capit micro-stepping, kendali serial Bluetooth HC-05 (UART SPP 38400 bps), sensor garis IR otonom, dan suplai daya bebas brownout.",
    metrics: "4WD Chassis + 3-DOF Arm + HC-05 UART",
  },
  {
    index: "02",
    phase: "PHASE 02 // CAD & STRUCTURE",
    title: "MECHANICAL DESIGN & 4WD CHASSIS PROTOTYPING",
    description:
      "Desain presisi pelat akrilik bening, dudukan 4 gearbox motor 12V, pilar struktural oranye, sendi bahu torsi tinggi (MG996R), sendi siku (MG90S), dan capit presisi dengan rasio jepit terkalibrasi.",
    metrics: "Akrilik 4.0mm CNC + 4x Motor 12V Gearbox",
  },
  {
    index: "03",
    phase: "PHASE 03 // ELECTRICAL",
    title: "POWER DISTRIBUTION & ELECTRONICS INTEGRATION",
    description:
      "Perancangan jalur daya bertingkat dari baterai LiPo 3S 12V DC: isolasi Buck Converter LM2596 (5.0V logika bersih) dan XL4015 (6.0V servo arus tinggi) menggunakan Push-in Connector Terminal (PCT) anti-getar dan common ground bus.",
    metrics: "Dual Buck LM2596 & XL4015 + PCT Bus",
  },
  {
    index: "04",
    phase: "PHASE 04 // FIRMWARE",
    title: "STM32F401 FIRMWARE & TIM PWM GENERATION",
    description:
      "Pemrograman mikrokontroler STM32F401RCT6 Black Pill ARM Cortex-M4: inisialisasi TIM2_CH1/CH2 (PWM motor 250 Hz Soft-Ramp), TIM3/TIM4 (PWM servo 50 Hz), interupsi USART1 Bluetooth, dan algoritma sensor IR navigasi otonom.",
    metrics: "TIM2 (250Hz) + TIM3/4 (50Hz) + USART1",
  },
  {
    index: "05",
    phase: "PHASE 05 // INTEGRATION",
    title: "SYSTEM INTEGRATION & WIRING HARNESS",
    description:
      "Pemasangan 4 motor DC, heatsink driver L298N dengan cross-polarity wiring, modul Bluetooth HC-05, perakitan lengan mekanik, dan penataan kabel rapi pada sasis akrilik transparan.",
    metrics: "Driver L298N 12V + HC-05 Shield",
  },
  {
    index: "06",
    phase: "PHASE 06 // VALIDATION",
    title: "DYNAMIC TESTING & FIELD CALIBRATION",
    description:
      "Pengujian sudut jepit capit (Buka 20°, Tutup 42° dengan Auto-Detach PWM), kalibrasi rentang bahu (10° hingga 160°) dan siku (20° hingga 165°), uji torsi belok 4WD, dan evaluasi latensi komunikasi Bluetooth.",
    metrics: "Auto-Detach PWM 42° + Zero-Radius Turn",
  },
];

export default function DevelopmentTimeline() {
  const [selectedStage, setSelectedStage] = useState<(typeof STAGES)[0] | null>(null);

  return (
    <section
      id="development"
      className="bg-[#0C0C0C] py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-[#242424] relative"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Section label */}
        <div className="mb-12">
          <span
            className="inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-[#9E9D96] mb-10"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            <span className="inline-block w-4 h-px bg-[#FF5728]" />
            06 / DEVELOPMENT PROCESS
          </span>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[0.92] tracking-[-0.025em] uppercase text-[#EAE8E2]"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              FROM DESIGN
              <br />
              <span className="text-[#FF5728]">TO REALITY.</span>
            </h2>
            <div>
              <span
                className="px-3 py-1 border border-[#2a2a2a] bg-[#121212] text-[10px] font-mono tracking-wider uppercase text-[#9E9D96]"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                6 REKAYASA TAHAPAN // 100% TERVERIFIKASI
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="max-w-3xl">
          {STAGES.map((stage, i) => (
            <div
              key={stage.index}
              className="relative pl-12 md:pl-20 pb-8 group last:pb-0"
            >
              {/* Vertical Track Line */}
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-[1px] bg-[#242424]" />

              {/* Number Badge */}
              <div className="absolute left-0 md:left-2 top-0">
                <div className="w-8 h-8 md:w-9 md:h-9 border border-[#242424] bg-[#141414] group-hover:border-[#FF5728] transition-colors duration-300 flex items-center justify-center shadow-lg">
                  <span
                    className="text-[10px] tracking-[0.16em] text-[#FF5728] font-bold"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {stage.index}
                  </span>
                </div>
              </div>

              {/* Content Block (Clean, Zero Text Clutter) */}
              <div className="card border border-[#242424] bg-[#141414] p-5 group-hover:border-[#FF5728]/50 transition-colors shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[9px] tracking-[0.24em] uppercase text-[#FF5728] font-semibold"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {stage.phase}
                  </span>
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase text-[#777]"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    MILESTONE 0{i + 1}
                  </span>
                </div>

                <h3
                  className="text-[14px] md:text-[15px] tracking-[0.08em] uppercase text-[#EAE8E2] font-bold mb-3 group-hover:text-[#FF5728] transition-colors"
                  style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                >
                  {stage.title}
                </h3>

                <div className="flex items-center justify-between pt-2 border-t border-[#202020]">
                  <span className="text-[10px] font-mono text-[#888]">
                    {stage.metrics}
                  </span>

                  <button
                    onClick={() => setSelectedStage(stage)}
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#FF5728] hover:text-[#ff7a52] transition-colors"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    <span>LOG DETAIL</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Detail Modal */}
      <AnimatePresence>
        {selectedStage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedStage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border border-[#262626] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#222]">
                <div className="flex items-center gap-2.5">
                  <FileText size={16} className="text-[#FF5728]" />
                  <span
                    className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#FF5728]"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {selectedStage.phase}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedStage(null)}
                  className="w-8 h-8 flex items-center justify-center border border-[#2a2a2a] text-[#9E9D96] hover:text-[#EAE8E2] hover:border-[#FF5728] transition-colors"
                  aria-label="Tutup modal"
                >
                  <X size={15} />
                </button>
              </div>

              <h4
                className="text-[16px] font-bold text-[#EAE8E2] uppercase mb-4"
                style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
              >
                {selectedStage.title}
              </h4>

              <div className="space-y-4 mb-6">
                <p className="text-[13px] leading-[1.75] text-[#9E9D96]">
                  {selectedStage.description}
                </p>

                <div className="border border-[#222] bg-[#161616] p-3 text-[11px] font-mono text-[#EAE8E2]">
                  <span className="text-[#FF5728] block mb-1">METRIK PENGUJIAN:</span>
                  {selectedStage.metrics}
                </div>
              </div>

              <div className="pt-4 border-t border-[#222] flex items-center justify-between text-[10px] font-mono text-[#666]">
                <span>TEAM RIPALDO JR // ITS</span>
                <span className="text-[#FF5728]">LOG VERIFIED</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
