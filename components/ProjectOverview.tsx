"use client";

import { Cpu, Wrench, Code2 } from "lucide-react";

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
    points: [
      "Firmware berbasis register/HAL STM32F401 (84 MHz) dengan pemanfaatan hardware timer TIM2, TIM3, dan TIM4.",
      "Kendali motor sasis menggunakan algoritma Soft-Ramp PWM 250 Hz untuk akselerasi bertahap tanpa slip traksi.",
      "Interrupt-driven USART1 @ 38400 bps untuk latensi respons telemetri Bluetooth mendekati nol dan proteksi auto-detach servo.",
    ],
  },
];

export default function ProjectOverview() {
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
        <div className="mb-14 max-w-3xl">
          <h2
            className="text-[clamp(2.4rem,5.5vw,4.8rem)] font-bold leading-[0.92] tracking-[-0.025em] uppercase text-[#EAE8E2] mb-6"
            style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
          >
            INTEGRATED DESIGN.
            <br />
            <span className="text-[#FF5728]">PRECISION</span> EXECUTION.
          </h2>
          <p className="text-[14.5px] md:text-[15.5px] text-[#9E9D96] leading-[1.75]">
            <strong className="text-[#EAE8E2]">RJ7 Robot Transporter</strong> adalah wahana robotika
            angkut dan manipulasi material yang dikembangkan secara terpadu oleh{" "}
            <strong className="text-[#EAE8E2]">Team Ripaldo Jr (ITS)</strong>. Menghubungkan arsitektur
            mikrokontroler 32-bit ARM Cortex-M4 dengan sasis 4WD diferensial dan lengan artikulasi 3-sumbu,
            seluruh modul dirancang berdasarkan data fisik nyata dan pengujian laboratorium.
          </p>
        </div>

        {/* Core Divisions Grid (Taste-Skill 3-Pillar Technical Dossier) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {DIVISIONS.map((div) => {
            const Icon = div.icon;
            return (
              <div
                key={div.name}
                className="border border-[#262626] bg-[#141414] p-6 md:p-7 flex flex-col justify-between hover:border-[#383838] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#FF5728]"
                      style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                    >
                      {div.name}
                    </span>
                    <Icon size={16} className="text-[#9E9D96]" />
                  </div>
                  <h3
                    className="text-[15px] font-bold text-[#EAE8E2] mb-3 tracking-[0.02em]"
                    style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                  >
                    {div.lead}
                  </h3>
                  <ul className="space-y-2.5 list-none p-0 m-0">
                    {div.points.map((pt, i) => (
                      <li
                        key={i}
                        className="text-[12px] leading-[1.65] text-[#9E9D96] flex items-start gap-2.5"
                      >
                        <span className="text-[#FF5728] font-mono text-[10px] pt-0.5">▪</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-5 mt-6 border-t border-[#222222] flex items-center justify-between text-[9px] font-mono text-[#777]">
                  <span>DIVISION SPEC // RJ7</span>
                  <span className="text-[#FF5728]">STATUS: OK</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Specification Dossier Table */}
        <div className="border border-[#262626] bg-[#141414] shadow-2xl">
          {/* Header */}
          <div className="px-6 py-4 bg-[#181818] border-b border-[#262626] flex items-center justify-between">
            <span
              className="text-[9px] tracking-[0.26em] uppercase text-[#9E9D96] font-semibold"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              TECHNICAL SPECIFICATION DOSSIER // BOM
            </span>
            <span
              className="px-2.5 py-1 border border-[#303030] bg-[#0C0C0C] text-[9px] tracking-[0.18em] uppercase text-[#9E9D96] font-semibold"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              LAB VALIDATED
            </span>
          </div>

          {/* 2-Column Grid of Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#222222]">
            <div className="divide-y divide-[#222222]">
              {SPECS.slice(0, 7).map((spec) => (
                <div
                  key={spec.label}
                  className="px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 hover:bg-[#181818] transition-colors"
                >
                  <span
                    className="text-[10px] tracking-[0.14em] uppercase text-[#9E9D96] shrink-0 font-medium"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {spec.label}
                  </span>
                  <span className="text-[12px] text-[#EAE8E2] sm:text-right font-normal">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="divide-y divide-[#222222]">
              {SPECS.slice(7).map((spec) => (
                <div
                  key={spec.label}
                  className="px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 hover:bg-[#181818] transition-colors"
                >
                  <span
                    className="text-[10px] tracking-[0.14em] uppercase text-[#9E9D96] shrink-0 font-medium"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {spec.label}
                  </span>
                  <span className="text-[12px] text-[#EAE8E2] sm:text-right font-normal">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer annotation */}
          <div className="px-6 py-3 bg-[#111111] border-t border-[#262626] flex items-center justify-between">
            <span
              className="text-[9px] tracking-[0.18em] uppercase text-[#9E9D96]"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              ENGINEERED BY TEAM RIPALDO JR // ITS SURABAYA
            </span>
            <span
              className="text-[9px] tracking-[0.18em] uppercase text-[#FF5728]"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              STM32F401 // PROTOTYPE COMPLETE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
