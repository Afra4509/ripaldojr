"use client";

import { motion } from "framer-motion";

const SPECS = [
  { label: "Robot Designation", value: "RJ7 Robot Transporter" },
  { label: "Engineering Team", value: "Ripaldo Jr" },
  { label: "Platform Type", value: "4WD (Four-Wheel Drive) Differential Pivot Turn" },
  { label: "Main Controller", value: 'STM32F401RCT6 "Black Pill" ARM Cortex-M4' },
  { label: "Motor Driver", value: "L298N Dual H-Bridge (250 Hz Smooth Torque PWM)" },
  { label: "Drive Actuators", value: "4x Motor DC 12V Gearbox (Cross-Polarity Wiring)" },
  { label: "Articulated Arm Servos", value: "1x MG996R (Bahu) + 1x MG90S (Siku) + 1x MG90S (Capit)" },
  { label: "End-Effector Technology", value: "Micro-Stepping (2 µs/step) + Auto-Detach PWM" },
  { label: "Power Regulation", value: "Dual Buck: LM2596 (5.0V Logika) + XL4015 (6.0V Servo)" },
  { label: "Power Bus Hardware", value: "PCT (Push-in Connector Terminal) — Tahan Arus & Getaran" },
  { label: "Communication Protocol", value: "Bluetooth Classic HC-05 / HC-06 (UART SPP 38400 bps)" },
  { label: "Autonomous Navigation", value: "2x Modul IR Line Follower (PB12 Kiri, PB14 Kanan)" },
  { label: "Main Power Source", value: "Baterai LiPo 3S / Aki 12V DC" },
  { label: "Development Status", value: "Prototype Complete // Functional Field Validated" },
];

export default function ProjectOverview() {
  return (
    <section
      id="overview"
      className="bg-[#101010] py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-[#303030]/60 relative"
    >
      {/* Background subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #EAE8E2 1px, transparent 1px),
            linear-gradient(to bottom, #EAE8E2 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-[1360px] mx-auto relative z-10">
        {/* Section label */}
        <span
          className="inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-[#929292] mb-10"
          style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
        >
          <span className="inline-block w-4 h-px bg-[#FF5728]" />
          01 / PROJECT OVERVIEW
        </span>

        {/* Two-column composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Editorial Headline & Narrative */}
          <div className="lg:col-span-7">
            <div>
              <h2
                className="text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[0.92] tracking-[-0.025em] uppercase text-[#EAE8E2] mb-8"
                style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
              >
                MORE THAN
                <br />
                A MACHINE.
                <br />
                <span className="text-[#FF5728]">A SYSTEM OF</span>
                <br />
                ENGINEERING.
              </h2>
            </div>

            <div className="space-y-5 text-[15px] leading-[1.8] text-[#929292] max-w-xl">
              <p>
                The <strong className="text-[#EAE8E2] font-semibold">RJ7 Robot Transporter</strong> is
                a high-performance autonomous and teleoperated robotic manipulator engineered by{" "}
                <strong className="text-[#EAE8E2] font-semibold">Team Ripaldo Jr</strong>. Built
                dengan kontrol inti mikrokontroler <strong className="text-[#EAE8E2]">STM32F401RCT6 Black Pill</strong> (ARM Cortex-M4),
                sistem ini mengintegrasikan penggerak 4WD bertenaga tinggi, lengan robot 3-axis berservo logam,
                serta regulasi daya bertingkat khusus.
              </p>
              <p>
                Struktur mekanik mengkombinasikan pelat akrilik transparan berpresisi tinggi dengan sambungan struktural oranye,
                roda gearbox berdaya cengkeram tinggi dengan teknik *differential pivot turn*, serta lengan mekanis
                yang digerakkan oleh kombinasi servo MG996R (Bahu) dan MG90S (Siku & Capit). Capit didukung teknologi
                micro-stepping 2 µs/step serta proteksi auto-detach PWM untuk memastikan daya jepit kokoh tanpa merusak roda gigi servo.
              </p>
              <p>
                Distribusi daya ditenagai baterai LiPo 3S 12V DC melalui blok terminal PCT anti-getar,
                dibagi secara terisolasi ke Buck Converter LM2596 (5.0V untuk logika STM32, Bluetooth HC-05, dan sensor IR)
                serta XL4015 (6.0V suplai arus tinggi untuk ketiga servo) demi kestabilan tegangan tanpa gangguan *brownout*.
              </p>
            </div>

            {/* Quick telemetry badges */}
            <div className="mt-8 pt-8 border-t border-[#303030] flex flex-wrap gap-4">
              <div className="px-4 py-2 border border-[#303030] bg-[#181818]">
                <span
                  className="block text-[9px] uppercase tracking-[0.2em] text-[#929292]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  MCU ARCHITECTURE
                </span>
                <span
                  className="text-[13px] font-semibold text-[#FF5728]"
                  style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                >
                  STM32F401 Cortex-M4
                </span>
              </div>
              <div className="px-4 py-2 border border-[#303030] bg-[#181818]">
                <span
                  className="block text-[9px] uppercase tracking-[0.2em] text-[#929292]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  DRIVE CHASSIS
                </span>
                <span
                  className="text-[13px] font-semibold text-[#EAE8E2]"
                  style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                >
                  4WD Differential Pivot
                </span>
              </div>
              <div className="px-4 py-2 border border-[#303030] bg-[#181818]">
                <span
                  className="block text-[9px] uppercase tracking-[0.2em] text-[#929292]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  TELEMETRY
                </span>
                <span
                  className="text-[13px] font-semibold text-[#EAE8E2]"
                  style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                >
                  Bluetooth HC-05 (38.4k)
                </span>
              </div>
            </div>
          </div>

          {/* Right: Technical Metadata & Project Specifications */}
          <div className="lg:col-span-5">
            <div className="border border-[#303030] bg-[#141414] shadow-2xl">
              {/* Header */}
              <div className="px-6 py-4 bg-[#181818] border-b border-[#303030] flex items-center justify-between">
                <span
                  className="text-[9px] tracking-[0.26em] uppercase text-[#929292] font-semibold"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  RJ7 SYSTEM SPECIFICATION SHEET
                </span>
                <span
                  className="px-2.5 py-1 border border-[#303030] bg-[#101010] text-[9px] tracking-[0.18em] uppercase text-[#929292] font-semibold"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  VERIFIED BOM
                </span>
              </div>

              {/* Spec List */}
              <div className="divide-y divide-[#303030]">
                {SPECS.map((spec) => (
                  <div
                    key={spec.label}
                    className="px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 hover:bg-[#1c1c1c] transition-colors"
                  >
                    <span
                      className="text-[10px] tracking-[0.14em] uppercase text-[#929292] shrink-0 font-medium"
                      style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                    >
                      {spec.label}
                    </span>
                    <span className="text-[12px] md:text-[13px] text-[#EAE8E2] sm:text-right font-normal">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer annotation */}
              <div className="px-6 py-3 bg-[#111111] border-t border-[#303030] flex items-center justify-between">
                <span
                  className="text-[9px] tracking-[0.18em] uppercase text-[#929292]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  TEAM: RIPALDO JR
                </span>
                <span
                  className="text-[9px] tracking-[0.18em] uppercase text-[#929292]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  STM32F401 // 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
