"use client";

import { useState } from "react";
import { Cpu, Wrench, Code2, ArrowUpRight, Info, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SPECS = [
  { label: "Robot Designation", value: "RJ7 Robot Transporter" },
  { label: "Engineering Team", value: "Ripaldo Jr (ITS Surabaya)" },
  { label: "Platform Type", value: "4WD Differential Pivot-Turn Chassis" },
  { label: "Main Controller", value: 'STM32F401RCT6 "Black Pill" ARM Cortex-M4' },
  { label: "Core Clock / Memory", value: "84 MHz / 64 KB SRAM / 256 KB Flash" },
  { label: "Motor Driver", value: "L298N Dual H-Bridge (250 Hz PWM Soft-Ramp)" },
  { label: "Drive Actuators", value: "4x Motor DC 12V Gearbox (Cross-Polarity)" },
  { label: "Manipulator Servos", value: "1x MG996R (Bahu) + 1x MG90S (Siku) + 1x MG90S (Capit)" },
  { label: "End-Effector Control", value: "Micro-Stepping (2 µs/step) + Auto-Detach PWM" },
  { label: "Power Isolation", value: "Dual Buck: LM2596 (5.0V Logika) + XL4015 (6.0V Servo)" },
  { label: "Wiring & Bus System", value: "PCT Push-in Clamp Terminals (Vibration Resistant)" },
  { label: "Wireless Telemetry", value: "Bluetooth HC-05 / HC-06 (UART SPP 38400 bps)" },
  { label: "Autonomous Corridor", value: "2x Sensor IR Reflective (PB12 Kiri, PB14 Kanan)" },
  { label: "Primary Power", value: "LiPo 3S 12.6V DC / Aki Kering 12V" },
];

const DIVISIONS = [
  {
    name: "DIVISI ELECTRICAL",
    icon: Cpu,
    lead: "Regulasi Daya & Isolasi Jalur Logika",
    tags: ["BUCK LM2596 (5V)", "BUCK XL4015 (6V)", "TERMINAL PCT", "OPTO-ISOLATION"],
    points: [
      "Regulasi bertingkat: Buck LM2596 (5.0V stabil) untuk suplai logika MCU dan sensor; Buck XL4015 (6.0V, 5A arus tinggi) khusus beban servo.",
      "Isolasi rel daya total untuk mencegah spike induktif motor DC dan servo memicu brownout/reset pada STM32.",
      "Blok terminal PCT (Push-in Connector Terminal) tahan guncangan mekanis dan getaran chassis saat akselerasi penuh.",
    ],
  },
  {
    name: "DIVISI MECHANICAL",
    icon: Wrench,
    lead: "Sasis 4WD & Lengan Artikulasi 3-DOF",
    tags: ["AKRILIK 4MM CNC", "4WD CROSS-POLARITY", "SERVO MG996R 11KG", "PIVOT TURN 0°"],
    points: [
      "Struktur sasis akrilik presisi potong laser dengan pilar heksagonal pengaku getaran beban mekanis.",
      "Penggerak 4WD cross-polarity dengan ban kompon karet berdaya cengkeram tinggi untuk manuver pivot turn 0° radius.",
      "Lengan artikulasi 3-sumbu dengan capit presisi; servo MG996R torsi 11 kg·cm pada bahu dipadu MG90S pada siku dan capit.",
    ],
  },
  {
    name: "DIVISI PROGRAMMING",
    icon: Code2,
    lead: "Firmware STM32 & Algoritma Kendali Otonom",
    tags: ["ARM CORTEX-M4 84MHZ", "PWM 250HZ SOFT-RAMP", "USART1 38400 BAUD", "LINE FOLLOWER IR"],
    points: [
      "Firmware berbasis register/HAL STM32F401 (84 MHz) dengan pemanfaatan hardware timer TIM2, TIM3, dan TIM4.",
      "Kendali motor sasis menggunakan algoritma Soft-Ramp PWM 250 Hz untuk akselerasi bertahap tanpa slip traksi.",
      "Interrupt-driven USART1 @ 38400 bps untuk latensi respons telemetri Bluetooth mendekati nol dan proteksi auto-detach servo.",
    ],
  },
];

export default function ProjectOverview() {
  const [activeDivisionModal, setActiveDivisionModal] = useState<(typeof DIVISIONS)[0] | null>(null);
  const [overviewModalOpen, setOverviewModalOpen] = useState(false);
  const [bomModalOpen, setBomModalOpen] = useState(false);

  return (
    <section
      id="overview"
      className="bg-[#0C0C0C] py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-[#242424] relative"
    >
      {/* Background subtle technical grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #EAE8E2 1px, transparent 1px),
            linear-gradient(to bottom, #EAE8E2 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-[1360px] mx-auto relative z-10">
        {/* Section label */}
        <span
          className="inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-[#9E9D96] mb-8"
          style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
        >
          <span className="inline-block w-4 h-px bg-[#FF5728]" />
          01 / SYSTEM ARCHITECTURE
        </span>

        {/* Section Headline */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2
              className="text-[clamp(2.4rem,5.5vw,4.8rem)] font-bold leading-[0.92] tracking-[-0.025em] uppercase text-[#EAE8E2]"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              INTEGRATED DESIGN.
              <br />
              <span className="text-[#FF5728]">PRECISION</span> EXECUTION.
            </h2>
          </div>

          <div>
            <button
              onClick={() => setOverviewModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#303030] bg-[#141414] hover:border-[#FF5728] text-[10px] tracking-[0.16em] uppercase text-[#EAE8E2] hover:text-[#FF5728] transition-colors"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              <Info size={13} className="text-[#FF5728]" />
              <span>DETAIL ARSITEKTUR SISTEM</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>

        {/* Core Divisions Grid (Clean, Spacious Editorial Design) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {DIVISIONS.map((div, idx) => {
            const Icon = div.icon;
            return (
              <div
                key={div.name}
                className="border border-white/[0.08] bg-[#121212] p-8 flex flex-col justify-between hover:border-[#FF5728]/50 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-[11px] tracking-[0.24em] uppercase font-bold text-[#FF5728]"
                      style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                    >
                      0{idx + 1} // {div.name}
                    </span>
                    <Icon size={16} className="text-[#666] group-hover:text-[#FF5728] transition-colors" />
                  </div>

                  <h3
                    className="text-[18px] md:text-[20px] font-bold text-[#EAE8E2] mb-3 tracking-[-0.01em] leading-snug"
                    style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                  >
                    {div.lead}
                  </h3>

                  <p className="text-[13px] text-[#888] leading-relaxed mb-8">
                    {div.points[0]}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => setActiveDivisionModal(div)}
                    className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#EAE8E2] group-hover:text-[#FF5728] transition-colors"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    <span>DETAIL DIVISI</span>
                    <ArrowUpRight size={13} className="text-[#FF5728]" />
                  </button>

                  <span
                    className="text-[9px] font-mono text-[#555] uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    VERIFIED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modern Minimalist Key Metrics & BOM Trigger */}
        <div className="border border-white/[0.08] bg-[#101010] p-8 md:p-10 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-white/[0.08]">
            <div>
              <span className="text-[clamp(2.4rem,4.5vw,3.6rem)] font-bold text-[#EAE8E2] tracking-tight block leading-none">
                84<span className="text-[#FF5728] text-base font-mono font-normal ml-1">MHz</span>
              </span>
              <span
                className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#888] block mt-2"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                ARM CORTEX-M4
              </span>
            </div>
            <div>
              <span className="text-[clamp(2.4rem,4.5vw,3.6rem)] font-bold text-[#EAE8E2] tracking-tight block leading-none">
                4<span className="text-[#FF5728] text-base font-mono font-normal ml-1">WD</span>
              </span>
              <span
                className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#888] block mt-2"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                DIFFERENTIAL DRIVE
              </span>
            </div>
            <div>
              <span className="text-[clamp(2.4rem,4.5vw,3.6rem)] font-bold text-[#EAE8E2] tracking-tight block leading-none">
                3<span className="text-[#FF5728] text-base font-mono font-normal ml-1">DOF</span>
              </span>
              <span
                className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#888] block mt-2"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                ARTICULATED ARM
              </span>
            </div>
            <div>
              <span className="text-[clamp(2.4rem,4.5vw,3.6rem)] font-bold text-[#EAE8E2] tracking-tight block leading-none">
                200<span className="text-[#FF5728] text-base font-mono font-normal ml-1">mm</span>
              </span>
              <span
                className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#888] block mt-2"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                FORWARD REACH
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span
              className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#888]"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              TECHNICAL SPECIFICATION DOSSIER // BOM
            </span>
            <button
              onClick={() => setBomModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/[0.12] bg-[#161616] hover:border-[#FF5728] text-[10px] font-mono tracking-[0.16em] uppercase text-[#EAE8E2] hover:text-[#FF5728] transition-all"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              <span>BUKA DOSSIER SPESIFIKASI LENGKAP</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Division Inspection Detail Modal */}
      <AnimatePresence>
        {activeDivisionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveDivisionModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border border-white/[0.1] border-t-2 border-t-[#FF5728] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative corner-bracket"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#222]">
                <div className="flex items-center gap-2.5">
                  <activeDivisionModal.icon size={18} className="text-[#FF5728]" />
                  <span
                    className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#FF5728]"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {activeDivisionModal.name}
                  </span>
                </div>
                <button
                  onClick={() => setActiveDivisionModal(null)}
                  className="w-8 h-8 flex items-center justify-center border border-[#2a2a2a] text-[#9E9D96] hover:text-[#EAE8E2] hover:border-[#FF5728] transition-colors"
                  aria-label="Tutup modal"
                >
                  <X size={15} />
                </button>
              </div>

              <h4
                className="text-[16px] font-bold text-[#EAE8E2] mb-4"
                style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
              >
                {activeDivisionModal.lead}
              </h4>

              <div className="space-y-3 mb-6">
                {activeDivisionModal.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[12.5px] leading-[1.65] text-[#9E9D96]">
                    <CheckCircle2 size={13} className="text-[#FF5728] shrink-0 mt-1" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#222] flex items-center justify-between text-[10px] font-mono text-[#666]">
                <span>TEAM RIPALDO JR // RJ7</span>
                <span className="text-[#FF5728]">DIVISION SPEC VERIFIED</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* System Architecture Overview Modal */}
      <AnimatePresence>
        {overviewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setOverviewModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border border-white/[0.1] border-t-2 border-t-[#FF5728] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative corner-bracket"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#222]">
                <div className="flex items-center gap-2.5">
                  <Info size={16} className="text-[#FF5728]" />
                  <span
                    className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#FF5728]"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    DETAIL ARSITEKTUR SISTEM RJ7
                  </span>
                </div>
                <button
                  onClick={() => setOverviewModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center border border-[#2a2a2a] text-[#9E9D96] hover:text-[#EAE8E2] hover:border-[#FF5728] transition-colors"
                  aria-label="Tutup modal"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="space-y-4 text-[13px] leading-[1.75] text-[#9E9D96]">
                <p>
                  <strong className="text-[#EAE8E2]">RJ7 Robot Transporter</strong> adalah wahana robotika angkut dan manipulasi material yang dikembangkan secara terpadu oleh <strong className="text-[#EAE8E2]">Team Ripaldo Jr (ITS)</strong>.
                </p>
                <p>
                  Menghubungkan arsitektur mikrokontroler 32-bit ARM Cortex-M4 dengan sasis 4WD diferensial dan lengan artikulasi 3-sumbu, seluruh modul dirancang berdasarkan data fisik nyata dan pengujian laboratorium.
                </p>
                <div className="border border-[#222] bg-[#161616] p-4 text-[12px] font-mono text-[#EAE8E2]">
                  <span className="text-[#FF5728] block mb-1">INTI SISTEM:</span>
                  STM32F401 (84 MHz) + Driver L298N (250 Hz Soft-Ramp) + Dual Buck LM2596 (5.0V) & XL4015 (6.0V) + Bluetooth HC-05 (38400 baud)
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[#222] flex items-center justify-between text-[10px] font-mono text-[#666]">
                <span>INSTITUT TEKNOLOGI SEPULUH NOPEMBER</span>
                <span className="text-[#FF5728]">LABORATORY VALIDATED</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full BOM Dossier Modal */}
      <AnimatePresence>
        {bomModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setBomModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border border-white/[0.1] max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF5728]" />
                  <span
                    className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#FF5728]"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    TECHNICAL SPECIFICATION DOSSIER // BOM
                  </span>
                </div>
                <button
                  onClick={() => setBomModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center border border-white/[0.1] text-[#9E9D96] hover:text-[#EAE8E2] hover:border-[#FF5728] transition-colors"
                  aria-label="Tutup modal"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="border border-white/[0.08] bg-[#0E0E0E] divide-y divide-white/[0.06] mb-6">
                {SPECS.map((spec) => (
                  <div
                    key={spec.label}
                    className="px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 hover:bg-white/[0.02] transition-colors text-[12px]"
                  >
                    <span
                      className="text-[10px] tracking-[0.14em] uppercase text-[#888] font-mono shrink-0"
                      style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                    >
                      {spec.label}
                    </span>
                    <span className="text-[#EAE8E2] sm:text-right font-normal">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#666]">
                <span>TEAM RIPALDO JR // 14 HARDWARE PARAMETERS</span>
                <span className="text-[#FF5728]">BOM VALIDATED</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
