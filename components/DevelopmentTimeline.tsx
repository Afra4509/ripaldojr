"use client";

import { motion } from "framer-motion";

const STAGES = [
  {
    index: "01",
    phase: "PHASE 01 // ANALYSIS",
    title: "CONCEPT & REQUIREMENTS SPECIFICATION",
    description:
      "Team Ripaldo Jr merumuskan spesifikasi fungsional robot transport: sistem gerak 4WD differential pivot turn, lengan artikulasi 3-DOF dengan capit micro-stepping, kendali serial Bluetooth HC-05 (UART SPP 38400 bps), sensor garis IR otonom, dan suplai daya bebas brownout.",
  },
  {
    index: "02",
    phase: "PHASE 02 // CAD & STRUCTURE",
    title: "MECHANICAL DESIGN & 4WD CHASSIS PROTOTYPING",
    description:
      "Desain presisi pelat akrilik bening, dudukan 4 gearbox motor 12V, pilar struktural oranye, sendi bahu torsi tinggi (MG996R), sendi siku (MG90S), dan capit presisi dengan rasio jepit terkalibrasi.",
  },
  {
    index: "03",
    phase: "PHASE 03 // ELECTRICAL",
    title: "POWER DISTRIBUTION & ELECTRONICS INTEGRATION",
    description:
      "Perancangan jalur daya bertingkat dari baterai LiPo 3S 12V DC: isolasi Buck Converter LM2596 (5.0V logika bersih) dan XL4015 (6.0V servo arus tinggi) menggunakan Push-in Connector Terminal (PCT) anti-getar dan common ground bus.",
  },
  {
    index: "04",
    phase: "PHASE 04 // FIRMWARE",
    title: "STM32F401 FIRMWARE & TIM PWM GENERATION",
    description:
      "Pemrograman mikrokontroler STM32F401RCT6 Black Pill ARM Cortex-M4: inisialisasi TIM2_CH1/CH2 (PWM motor 250 Hz Soft-Ramp), TIM3/TIM4 (PWM servo 50 Hz), interupsi USART1 Bluetooth, dan algoritma sensor IR navigasi otonom.",
  },
  {
    index: "05",
    phase: "PHASE 05 // INTEGRATION",
    title: "SYSTEM INTEGRATION & WIRING HARNESS",
    description:
      "Pemasangan 4 motor DC, heatsink driver L298N dengan cross-polarity wiring, modul Bluetooth HC-05, perakitan lengan mekanik, dan penataan kabel rapi pada sasis akrilik transparan.",
  },
  {
    index: "06",
    phase: "PHASE 06 // VALIDATION",
    title: "DYNAMIC TESTING & FIELD CALIBRATION",
    description:
      "Pengujian sudut jepit capit (Buka 20°, Tutup 42° dengan Auto-Detach PWM), kalibrasi rentang bahu (10°–160°) dan siku (20°–165°), uji torsi belok 4WD, dan evaluasi latensi komunikasi Bluetooth.",
  },
];

export default function DevelopmentTimeline() {
  return (
    <section
      id="development"
      className="bg-[#181818] py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-[#303030] relative"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Section label */}
        <div className="mb-14">
          <span
            className="inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-[#929292] mb-10"
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
            <p className="text-[14px] md:text-[15px] text-[#929292] max-w-md leading-[1.7]">
              Lintasan rekayasa terstruktur dari riset mekanikal hingga pengujian komprehensif sistem kendali STM32 RJ7 Robot Transporter.
            </p>
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="max-w-3xl">
          {STAGES.map((stage, i) => (
            <div
              key={stage.index}
              className="relative pl-12 md:pl-20 pb-12 group last:pb-0"
            >
              {/* Vertical Track Line */}
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-[1px] bg-[#303030]" />

              {/* Number Badge */}
              <div className="absolute left-0 md:left-2 top-0">
                <div className="w-8 h-8 md:w-9 md:h-9 border border-[#303030] bg-[#141414] group-hover:border-[#FF5728] transition-colors duration-300 flex items-center justify-center shadow-lg">
                  <span
                    className="text-[10px] tracking-[0.16em] text-[#FF5728] font-bold"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {stage.index}
                  </span>
                </div>
              </div>

              {/* Content Block */}
              <div className="border border-[#303030] bg-[#141414] p-5 group-hover:border-[#FF5728]/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[9px] tracking-[0.24em] uppercase text-[#FF5728] font-semibold"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {stage.phase}
                  </span>
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase text-[#555]"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    MILESTONE 0{i + 1}
                  </span>
                </div>

                <h3
                  className="text-[14px] md:text-[15px] tracking-[0.08em] uppercase text-[#EAE8E2] font-bold mb-2 group-hover:text-[#FF5728] transition-colors"
                  style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                >
                  {stage.title}
                </h3>

                <p
                  className="text-[13px] leading-[1.7] text-[#929292]"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
