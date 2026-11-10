"use client";

import { useState } from "react";
import { Terminal, ShieldCheck, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Square, Sliders } from "lucide-react";

const SPECS_GROUPS = [
  {
    category: "MECHANICAL & ACTUATION",
    code: "MEC-01",
    items: [
      { label: "Platform Sasis", value: "4WD (Four-Wheel Drive) Differential Pivot Turn" },
      { label: "Material Rangka", value: "Akrilik Presisi Bening + Rangka Struktural Oranye" },
      { label: "Motor Sasis", value: "4x Motor DC 12V Gearbox (Cross-Polarity Wiring)" },
      { label: "Sendi Bahu (Shoulder)", value: "1x Servo MG996R High-Torque Metal Gear (Range 10°–160°)" },
      { label: "Sendi Siku (Elbow)", value: "1x Servo MG90S Metal Gear (Range 20°–165°)" },
      { label: "Mekanisme Capit (Gripper)", value: "1x Servo MG90S (Micro-Stepping 2 µs + Auto-Detach PWM)" },
    ],
  },
  {
    category: "ELECTRICAL & POWER DISTRIBUTION",
    code: "ELE-02",
    items: [
      { label: "Mikrokontroler Utama", value: 'STM32F401RCT6 "Black Pill" ARM Cortex-M4 (32-bit)' },
      { label: "Driver Motor Sasis", value: "L298N Dual H-Bridge (Sinyal PWM 250 Hz Smooth Torque)" },
      { label: "Regulator Logika (5.0V)", value: "Step-Down LM2596 (Suplai STM32, Bluetooth HC-05, Sensor IR)" },
      { label: "Regulator Servo (6.0V)", value: "Step-Down XL4015 High-Current (Suplai 3x Motor Servo Lengan)" },
      { label: "Distribusi Jalur Kabel", value: "PCT (Push-in Connector Terminal): Tahan Arus & Getaran" },
      { label: "Sumber Catu Daya", value: "Baterai LiPo 3S / Aki 12V DC" },
    ],
  },
  {
    category: "SOFTWARE, TIMERS & SENSORS",
    code: "SFW-03",
    items: [
      { label: "Hardware Timers", value: "TIM2 (Motor PWM 250 Hz), TIM3 & TIM4 (Servo PWM 50 Hz)" },
      { label: "Modul Komunikasi", value: "Bluetooth Classic HC-05 / HC-06 (USART1 38400 bps)" },
      { label: "Sensor Otonom", value: "2x Modul IR Line Follower (PB12 Kiri, PB14 Kanan)" },
      { label: "Navigasi & Kontrol", value: "Autonomous Corridor Following + Android Teleoperation" },
      { label: "Proteksi Capit", value: "Auto-Detach PWM pasca jepit untuk cegah panas berlebih" },
      { label: "Status Indikator", value: "PC13 Onboard LED Built-in Heartbeat Status" },
    ],
  },
];

export default function TechnicalSpecs() {
  const [activeCmd, setActiveCmd] = useState<string>("S");
  const [telemetryLog, setTelemetryLog] = useState<string[]>([
    "[STM32_BOOT] STM32F401RCT6 Black Pill online. TIM2, TIM3, TIM4 initialized.",
    "[UART1_READY] Bluetooth HC-05 connected at 38400 bps. State: STANDBY.",
    "[POWER_SYS] LM2596 (5.0V) & XL4015 (6.0V) verified. Ready for command.",
  ]);

  const sendCommand = (cmd: string, desc: string, detail: string) => {
    setActiveCmd(cmd);
    const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });
    const newEntry = `[${timestamp}] USART1_RX: '${cmd}' (${desc}) -> ${detail}`;
    setTelemetryLog((prev) => [newEntry, ...prev.slice(0, 4)]);
  };

  return (
    <section
      id="specs"
      className="bg-[#0C0C0C] py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-[#242424] relative"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Section label */}
        <span
          className="inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-[#9E9D96] mb-10"
          style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
        >
          <span className="inline-block w-4 h-px bg-[#FF5728]" />
          07 / SYSTEM SPECIFICATIONS
        </span>

        {/* Section Headline */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[0.92] tracking-[-0.025em] uppercase text-[#EAE8E2]"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              ENGINEERING
              <br />
              <span className="text-[#FF5728]">DATASHEET.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-[14px] md:text-[15px] text-[#9E9D96] leading-[1.7]">
              Daftar Bill of Materials (BOM), timer periferal STM32, dan arsitektur kendali robot RJ7 Robot Transporter secara terperinci.
            </p>
          </div>
        </div>

        {/* 3-Column Structured Engineering Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SPECS_GROUPS.map((group) => (
            <div
              key={group.category}
              className="card border border-[#242424] bg-[#141414] divide-y divide-[#222222] h-full flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Category Header */}
                <div className="px-5 py-4 bg-[#181818] flex items-center justify-between">
                  <span
                    className="text-[10px] tracking-[0.22em] uppercase text-[#FF5728] font-bold"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {group.category}
                  </span>
                  <span
                    className="text-[9px] tracking-[0.18em] uppercase text-[#929292]"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {group.code}
                  </span>
                </div>

                {/* Items */}
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    className="px-5 py-3.5 flex flex-col gap-1 hover:bg-[#181818] transition-colors"
                  >
                    <span
                      className="text-[9px] tracking-[0.16em] uppercase text-[#929292] font-medium"
                      style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                    >
                      {item.label}
                    </span>
                    <span className="text-[13px] text-[#EAE8E2] leading-[1.4] font-normal">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="px-5 py-2.5 bg-[#111111] border-t border-[#303030]">
                <span
                  className="text-[8px] tracking-[0.2em] uppercase text-[#555]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  SYSTEM RJ7 // STM32 VERIFIED
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive STM32 Bluetooth & PWM Simulator */}
        <div className="border border-[#303030] bg-[#141414] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[#303030] gap-4">
            <div className="flex items-center gap-3">
              <Terminal size={18} className="text-[#FF5728]" />
              <div>
                <h3
                  className="text-[14px] uppercase tracking-[0.12em] font-bold text-[#EAE8E2]"
                  style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                >
                  STM32F401 COMMAND & PWM TELEMETRY SIMULATOR
                </h3>
                <p
                  className="text-[10px] tracking-[0.14em] uppercase text-[#929292]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  Simulasi perintah USART1 (PA9/PA10) Bluetooth HC-05 & Hardware Timers STM32
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#FF5728]" />
              <span
                className="text-[10px] tracking-[0.18em] uppercase text-[#EAE8E2]"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                BAUDRATE: 38400 BPS // TIM2 250HZ ACTIVE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Direction Pad */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <p
                className="text-[10px] tracking-[0.2em] uppercase text-[#929292] mb-4"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                BLUETOOTH TELEOPERATION COMMANDS
              </p>

              <div className="grid grid-cols-3 gap-2 w-52">
                <div />
                <button
                  onClick={() =>
                    sendCommand(
                      "F",
                      "MAJU (FORWARD)",
                      "PA0/PA1 TIM2=75% | PA2=HIGH, PA3=LOW | PB0=HIGH, PB1=LOW"
                    )
                  }
                  className={`h-12 border flex items-center justify-center transition-all ${
                    activeCmd === "F"
                      ? "bg-[#FF5728] border-[#FF5728] text-black font-bold"
                      : "border-[#303030] bg-[#181818] text-[#EAE8E2] hover:border-[#FF5728]"
                  }`}
                  aria-label="Forward"
                >
                  <ArrowUp size={18} />
                </button>
                <div />

                <button
                  onClick={() =>
                    sendCommand(
                      "L",
                      "PIVOT KIRI (PIVOT LEFT)",
                      "PA0/PA1 TIM2=60% | PA2=LOW, PA3=HIGH | PB0=HIGH, PB1=LOW"
                    )
                  }
                  className={`h-12 border flex items-center justify-center transition-all ${
                    activeCmd === "L"
                      ? "bg-[#FF5728] border-[#FF5728] text-black font-bold"
                      : "border-[#303030] bg-[#181818] text-[#EAE8E2] hover:border-[#FF5728]"
                  }`}
                  aria-label="Left"
                >
                  <ArrowLeft size={18} />
                </button>

                <button
                  onClick={() =>
                    sendCommand(
                      "S",
                      "REM (EMERGENCY BRAKE)",
                      "PA0/PA1 TIM2=0% | PA2=LOW, PA3=LOW | PB0=LOW, PB1=LOW"
                    )
                  }
                  className={`h-12 border flex items-center justify-center transition-all ${
                    activeCmd === "S"
                      ? "bg-[#EAE8E2] border-[#EAE8E2] text-black font-bold"
                      : "border-[#303030] bg-[#181818] text-[#FF5728] hover:border-[#EAE8E2]"
                  }`}
                  aria-label="Stop"
                >
                  <Square size={16} />
                </button>

                <button
                  onClick={() =>
                    sendCommand(
                      "R",
                      "PIVOT KANAN (PIVOT RIGHT)",
                      "PA0/PA1 TIM2=60% | PA2=HIGH, PA3=LOW | PB0=LOW, PB1=HIGH"
                    )
                  }
                  className={`h-12 border flex items-center justify-center transition-all ${
                    activeCmd === "R"
                      ? "bg-[#FF5728] border-[#FF5728] text-black font-bold"
                      : "border-[#303030] bg-[#181818] text-[#EAE8E2] hover:border-[#FF5728]"
                  }`}
                  aria-label="Right"
                >
                  <ArrowRight size={18} />
                </button>

                <div />
                <button
                  onClick={() =>
                    sendCommand(
                      "B",
                      "MUNDUR (REVERSE)",
                      "PA0/PA1 TIM2=75% | PA2=LOW, PA3=HIGH | PB0=LOW, PB1=HIGH"
                    )
                  }
                  className={`h-12 border flex items-center justify-center transition-all ${
                    activeCmd === "B"
                      ? "bg-[#FF5728] border-[#FF5728] text-black font-bold"
                      : "border-[#303030] bg-[#181818] text-[#EAE8E2] hover:border-[#FF5728]"
                  }`}
                  aria-label="Reverse"
                >
                  <ArrowDown size={18} />
                </button>
                <div />
              </div>

              {/* Arm & Gripper Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() =>
                    sendCommand(
                      "G_CLAMP",
                      "JEPIT CAPIT",
                      "PA6 TIM3_CH1: 42° -> Auto-Detach PWM Enabled"
                    )
                  }
                  className="px-3 py-1.5 border border-[#303030] bg-[#181818] hover:border-[#FF5728] text-[10px] tracking-[0.14em] uppercase text-[#EAE8E2]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  [ CAPIT JEPIT: 42° ]
                </button>
                <button
                  onClick={() =>
                    sendCommand(
                      "G_OPEN",
                      "BUKA CAPIT",
                      "PA6 TIM3_CH1: 20° Micro-step"
                    )
                  }
                  className="px-3 py-1.5 border border-[#303030] bg-[#181818] hover:border-[#FF5728] text-[10px] tracking-[0.14em] uppercase text-[#EAE8E2]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  [ CAPIT BUKA: 20° ]
                </button>
              </div>
            </div>

            {/* Simulated Telemetry Stream */}
            <div className="lg:col-span-7 bg-[#0d0d0d] border border-[#303030] p-4 font-mono text-[11px] leading-[1.8] min-h-[180px] flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#252525] text-[#929292]">
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[#FF5728]">
                    STM32 USART1 SERIAL MONITOR (38400 BAUD)
                  </span>
                  <span className="text-[9px]">TIM2: 250Hz | TIM3/4: 50Hz</span>
                </div>
                {telemetryLog.map((log, idx) => (
                  <p
                    key={idx}
                    className={idx === 0 ? "text-[#EAE8E2] font-semibold" : "text-[#777]"}
                  >
                    {log}
                  </p>
                ))}
              </div>

              <div className="pt-2 mt-2 border-t border-[#252525] flex items-center justify-between text-[9px] text-[#555]">
                <span>BT RX: PA10 (INTERRUPT) | TX: PA9</span>
                <span>IR SENSORS: PB12(L)=0, PB14(R)=0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
