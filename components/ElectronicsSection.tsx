"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, ChevronLeft, ChevronRight, Cpu, Radio, Zap, Activity, ArrowUpRight, ArrowRight } from "lucide-react";

const PCB_IMAGES = [
  {
    src: "/images/pcb/pcb-photo-1.jpg",
    title: "FABRICATED PCB // ASSEMBLED TOP",
    badge: "PHYSICAL HARDWARE",
    caption:
      "Physical fabricated control board assembled and populated by team Ripaldo Jr. Features integrated terminal headers, power isolation, and control breakout.",
  },
  {
    src: "/images/pcb/pcb-photo-2.jpg",
    title: "FABRICATED PCB // COMPONENT DETAIL",
    badge: "MACRO INSPECTION",
    caption:
      "Macro detail of solder joints, trace routing, onboard voltage regulation, and signal distribution bus for motor and actuator lines.",
  },
  {
    src: "/images/pcb/pcb-3d-top.png",
    title: "KICAD 3D BOARD SIMULATION",
    badge: "3D CAD MODEL",
    caption:
      "Full 3D photorealistic render generated from KiCad PCB design environment prior to fabrication. Component clearances and mechanical dimensions verified.",
  },
  {
    src: "/images/pcb/pcb-top.png",
    title: "PCB TOP COPPER & SILKSCREEN",
    badge: "EDA TRACE LAYOUT",
    caption:
      "Top-layer routing artwork showing signal interconnects, microcontroller breakout header pads, and high-frequency RF isolation zones.",
  },
  {
    src: "/images/pcb/pcb-bottom.png",
    title: "PCB BOTTOM COPPER & GROUND PLANE",
    badge: "GROUND PLANE",
    caption:
      "Bottom-layer continuous low-impedance ground pour minimizing EMI emissions from high-current DC motor switching transitions.",
  },
];

const STM32_PIN_MAPPING = [
  {
    module: "Driver L298N ENA",
    pinModule: "ENA",
    pinStm: "PA0",
    timer: "TIM2_CH1",
    desc: "Sinyal PWM Kecepatan Motor Kiri (250 Hz Smooth Torque)",
    type: "PWM Output",
  },
  {
    module: "Driver L298N ENB",
    pinModule: "ENB",
    pinStm: "PA1",
    timer: "TIM2_CH2",
    desc: "Sinyal PWM Kecepatan Motor Kanan (250 Hz Smooth Torque)",
    type: "PWM Output",
  },
  {
    module: "Driver L298N IN1",
    pinModule: "IN1",
    pinStm: "PA2",
    timer: "GPIO_Output",
    desc: "Logika Arah Putar Motor Kiri (Maju / Mundur / Rem)",
    type: "Digital Out",
  },
  {
    module: "Driver L298N IN2",
    pinModule: "IN2",
    pinStm: "PA3",
    timer: "GPIO_Output",
    desc: "Logika Arah Putar Motor Kiri (Maju / Mundur / Rem)",
    type: "Digital Out",
  },
  {
    module: "Driver L298N IN3",
    pinModule: "IN3",
    pinStm: "PB0",
    timer: "GPIO_Output",
    desc: "Logika Arah Putar Motor Kanan (Maju / Mundur / Rem)",
    type: "Digital Out",
  },
  {
    module: "Driver L298N IN4",
    pinModule: "IN4",
    pinStm: "PB1",
    timer: "GPIO_Output",
    desc: "Logika Arah Putar Motor Kanan (Maju / Mundur / Rem)",
    type: "Digital Out",
  },
  {
    module: "Servo Gripper (MG90S)",
    pinModule: "Signal (PWM)",
    pinStm: "PA6",
    timer: "TIM3_CH1",
    desc: "PWM 50 Hz Capit (Buka: 20°, Tutup: 42°, Micro-Step 2µs + Auto-Off)",
    type: "PWM Servo",
  },
  {
    module: "Servo Shoulder (MG996R)",
    pinModule: "Signal (PWM)",
    pinStm: "PA7",
    timer: "TIM3_CH2",
    desc: "PWM 50 Hz Sendi Bahu Utama (Range: 10° - 160°, Init: 110°)",
    type: "PWM Servo",
  },
  {
    module: "Servo Elbow (MG90S)",
    pinModule: "Signal (PWM)",
    pinStm: "PB8",
    timer: "TIM4_CH3",
    desc: "PWM 50 Hz Sendi Siku Lengan (Range: 20° - 165°, Init: 105°)",
    type: "PWM Servo",
  },
  {
    module: "Bluetooth HC-05 / HC-06",
    pinModule: "RXD",
    pinStm: "PA9",
    timer: "USART1_TX",
    desc: "Jalur Kirim Data Telemetri dari STM32 ke Bluetooth (38400 bps)",
    type: "UART TX",
  },
  {
    module: "Bluetooth HC-05 / HC-06",
    pinModule: "TXD",
    pinStm: "PA10",
    timer: "USART1_RX",
    desc: "Jalur Terima Perintah Karakter dari Bluetooth ke STM32 (Interrupt)",
    type: "UART RX",
  },
  {
    module: "Sensor Line Follower Kiri",
    pinModule: "OUT Kiri",
    pinStm: "PB12",
    timer: "GPIO_Input",
    desc: "Input Digital Sensor Garis Sisi Kiri (Deteksi Koridor & Kotak)",
    type: "Digital In",
  },
  {
    module: "Sensor Line Follower Kanan",
    pinModule: "OUT Kanan",
    pinStm: "PB14",
    timer: "GPIO_Input",
    desc: "Input Digital Sensor Garis Sisi Kanan (Deteksi Koridor & Kotak)",
    type: "Digital In",
  },
  {
    module: "Status LED",
    pinModule: "Built-in LED",
    pinStm: "PC13",
    timer: "GPIO_Output",
    desc: "LED Built-in Indikator Status Operasional & Heartbeat",
    type: "Digital Out",
  },
];

const ARCHITECTURE_METRICS = [
  {
    label: "Main Controller",
    value: 'STM32F401RCT6 "Black Pill" ARM Cortex-M4',
    sub: "Logika otonom, hardware timers presisi, & pengolah State Machine",
    icon: Cpu,
    image: "/images/components/stm32f401.png",
    tag: "32-BIT ARM // 84 MHz",
    spec: "84 MHz / 64KB RAM / 256KB Flash",
    details: [
      { k: "Core Processor", v: "ARM Cortex-M4 32-bit dengan Hardware FPU" },
      { k: "Clock Speed", v: "84 MHz Max Dynamic Frequency" },
      { k: "Memori On-Chip", v: "256 KB Flash ROM, 64 KB SRAM" },
      { k: "Peripheral Timers", v: "TIM2 (PWM Motor 250 Hz), TIM3 & TIM4 (PWM Servo 50 Hz)" },
      { k: "Komunikasi", v: "USART1 (PA9 TX, PA10 RX) @ 38400 bps ke Bluetooth HC-05" },
      { k: "Regulasi Daya", v: "5.0V VCC dari LM2596 Buck Converter terisolasi" },
    ],
    role: "Pusat pengendali logika keseluruhan sistem robot transporter. Menjalankan algoritma kendali diferensial sasis, pembacaan garis otonom, pengurai sinyal telemetri Bluetooth, serta kalkulasi pergerakan lengan artikulasi 3-DOF.",
  },
  {
    label: "Motor Driver & 4WD",
    value: "L298N Dual H-Bridge + 4x Motor DC 12V",
    sub: "Cross-Polarity Wiring, Soft-Ramp 250 Hz & Differential Pivot Turn",
    icon: Zap,
    image: "/images/components/l298n.png",
    tag: "DUAL H-BRIDGE // 12V",
    spec: "Dual Channel / 2A Peak / 12V High-Torque",
    details: [
      { k: "Driver Chip", v: "L298N Dual H-Bridge Driver dengan Heatsink Aluminium" },
      { k: "Konfigurasi Roda", v: "4WD (Four-Wheel Drive) dengan Cross-Polarity Wiring" },
      { k: "Frekuensi PWM", v: "250 Hz Soft-Ramp Smooth Torque (PA0 TIM2_CH1, PA1 TIM2_CH2)" },
      { k: "Logika Direction", v: "PA2 (IN1), PA3 (IN2) Sisi Kiri; PB0 (IN3), PB1 (IN4) Sisi Kanan" },
      { k: "Dinamika Putar", v: "Differential Pivot Turn (radius putar 0° untuk manuver sempit)" },
      { k: "Suplai Daya", v: "12V Langsung dari Bus Baterai LiPo 3S via Terminal PCT" },
    ],
    role: "Menghantarkan daya arus tinggi ke 4 motor DC gearbox sasis. Sinyal PWM berfrekuensi 250 Hz mencegah getaran motor saat akselerasi awal dan memungkinkan pengereman elektronik instan saat mendeteksi rintangan.",
  },
  {
    label: "Articulated Arm Servos",
    value: "1x MG996R (Bahu) + 2x MG90S (Siku & Capit)",
    sub: "High-Torque Metal Gear, micro-stepping 2 µs, & proteksi Auto-Detach",
    icon: Activity,
    image: "/images/components/servos-combo.png",
    tag: "METAL GEAR // 3-DOF",
    spec: "MG996R (11 kg·cm) + 2x MG90S (2.2 kg·cm)",
    gallery: [
      { name: "Servos Dual Combo", src: "/images/components/servos-combo.png" },
      { name: "MG996R (Bahu)", src: "/images/components/mg996r.png" },
      { name: "MG90S (Siku & Capit)", src: "/images/components/mg90s.png" },
    ],
    details: [
      { k: "Sendi Bahu (Link 1)", v: "1x TowerPro MG996R High-Torque Metal Gear (11 kg·cm)" },
      { k: "Sendi Siku (Link 2)", v: "1x TowerPro MG90S Metal Gear (2.2 kg·cm, 20° - 165°)" },
      { k: "Capit (End-Effector)", v: "1x MG90S dengan Micro-Stepping (2 µs/step, Buka 20°, Jepit 42°)" },
      { k: "Pin & Timer Bahu", v: "PA7 // TIM3_CH2 (Rentang sudut: 10° - 160°, Posisi Awal: 110°)" },
      { k: "Pin & Timer Siku", v: "PB8 // TIM4_CH3 (Rentang sudut: 20° - 165°, Posisi Awal: 105°)" },
      { k: "Proteksi Termal", v: "Auto-Detach PWM otomatis nonaktif setelah capit menahan muatan" },
    ],
    role: "Mekanisme manipulator fisik untuk mengambil, mengangkat, dan memindahkan benda kerja. Kombinasi servo torsi tinggi pada bahu dan servo presisi ringan pada siku serta capit memberikan efisiensi daya optimal.",
  },
  {
    label: "Power Distribution",
    value: "Dual Buck Converter (LM2596 5V + XL4015 6V) & LiPo 3S",
    sub: "Regulasi step-down independen untuk isolasi logika STM32 & servo lengan",
    icon: Zap,
    image: "/images/components/power-combo.png",
    tag: "POWER // 12V TO 5V & 6V",
    spec: "LM2596 (5.0V Logic) + XL4015 (6.0V Servo)",
    gallery: [
      { name: "Power Subsystem", src: "/images/components/power-combo.png" },
      { name: "Dual Buck (5V + 6V)", src: "/images/components/buck-combo.png" },
      { name: "Buck 5V LM2596", src: "/images/components/buck-5v.png" },
      { name: "Buck 6V XL4015", src: "/images/components/buck-6v.png" },
      { name: "Baterai LiPo 3S", src: "/images/components/baterai.png" },
    ],
    details: [
      { k: "Sumber Catu Daya", v: "Baterai LiPo 3S / Aki Kering 12V DC High Discharge" },
      { k: "Regulator Logika (5V)", v: "Step-Down LM2596 (Set 5.0V Presisi) untuk STM32 & Sensor" },
      { k: "Regulator Servo (6V)", v: "Step-Down XL4015 (Set 6.0V, 5A Arus Tinggi) untuk 3x Servo" },
      { k: "Terminal Bus", v: "PCT (Push-in Connector Terminal): Tahan Arus Besar & Getaran" },
      { k: "Isolasi Kelistrikan", v: "Rel daya 6V servo terpisah total dari rel 5V logika mikrokontroler" },
      { k: "Common Ground Bus", v: "Titik referensi nol potensial bersama pencegah noise ground loop" },
    ],
    role: "Menjamin kestabilan operasional robot dengan memisahkan suplai tegangan untuk beban induktif berarus besar (servo dan motor penggerak) dari jalur logika sensitif STM32. Dilengkapi Buck LM2596 (5V) dan Buck XL4015 (6V) yang terhubung melalui terminal PCT anti-getar.",
  },
  {
    label: "Telemetri & Komunikasi",
    value: "Bluetooth HC-05 / HC-06 UART SPP (38400 bps)",
    sub: "Transceiver serial nirkabel jarak jauh untuk kendali Android & telemetri",
    icon: Radio,
    image: "/images/components/bluetooth.png",
    tag: "COMM // WIRELESS UART",
    spec: "UART SPP 38400 bps / 2.4 GHz Band",
    details: [
      { k: "Protokol Nirkabel", v: "Bluetooth 2.0+EDR Serial Port Profile (SPP 2.4 GHz)" },
      { k: "Baud Rate", v: "38400 bps (8-N-1 Serial Communication)" },
      { k: "Koneksi STM32", v: "PA9 (TXD STM32 -> RXD BT) & PA10 (RXD STM32 -> TXD BT)" },
      { k: "Metode Pembacaan", v: "Interrupt-driven USART1_IRQHandler (respon latensi nol)" },
      { k: "Jarak Jangkauan", v: "Hingga 10 meter stabil di area workshop / kompetisi" },
      { k: "Aplikasi Kontroler", v: "Android Bluetooth Controller App (Custom Joystick Interface)" },
    ],
    role: "Menjadi jembatan komunikasi dua arah antara robot RJ7 dan operator manusia. Mengirimkan perintah arah gerakan sasis, koordinat lengan, serta menerima konfirmasi status telemetri secara real-time.",
  },
  {
    label: "Sensor Autonomous",
    value: "2x Modul Infrared Line Follower",
    sub: "PB12 (Kiri) & PB14 (Kanan) untuk navigasi koridor otonom & deteksi garis",
    icon: Activity,
    image: "/images/components/linefollower.png",
    tag: "SENSORS // IR REFLECTIVE",
    spec: "Dual Sensor / Digital Output / Low Latency",
    details: [
      { k: "Tipe Sensor", v: "Sepasang Optical Reflective Photodiode IR (TCRT5000 based)" },
      { k: "Pin Input Digital", v: "PB12 (Sensor Koridor Kiri) & PB14 (Sensor Koridor Kanan)" },
      { k: "Modus Deteksi", v: "Active-Low Digital Comparator dengan Trimpot Kalibrasi Ambang" },
      { k: "Logika Navigasi", v: "Deteksi koridor jalur hitam di atas lantai putih & kotak muatan" },
      { k: "Tegangan Operasional", v: "5.0V VCC dari Jalur Logika Terisolasi LM2596" },
      { k: "Respon Waktu", v: "Sangat cepat (< 1 ms) untuk manuver kecepatan tinggi" },
    ],
    role: "Mata optik bagi robot untuk menjalankan misi otonom tanpa campur tangan remote. Membimbing robot meluncur di sepanjang jalur koridor dan mendeteksi titik henti pengambilan beban secara presisi.",
  },
];

const POWER_RAILS = [
  {
    rail: "12V VCC BUS",
    source: "Baterai LiPo 3S / Aki 12V DC",
    destination: "Driver Motor L298N (Daya Motor 4WD) & Input Step-Down",
    protection: "PCT Push-in Connector Terminal tahan getaran & arus besar",
    img: "/images/components/baterai.png",
  },
  {
    rail: "6.0V SERVO BUS",
    source: "Buck Converter Step-Down XL4015",
    destination: "3x Motor Servo Lengan (1x MG996R Bahu + 2x MG90S Siku/Capit)",
    protection: "Regulator arus tinggi 5A terisolasi agar servo tidak memicu brownout STM32",
    img: "/images/components/buck-6v.png",
  },
  {
    rail: "5.0V LOGIC BUS",
    source: "Buck Converter Step-Down LM2596",
    destination: "STM32F401 'Black Pill', Bluetooth HC-05/06, dan 2x Sensor Garis IR",
    protection: "Suplai tegangan bersih bebas ripple dari noise induktif motor DC",
    img: "/images/components/buck-5v.png",
  },
  {
    rail: "COMMON GROUND",
    source: "Unified PCT Ground Bus",
    destination: "STM32 GND, L298N GND, Servo GND, Sensor GND, Baterai GND",
    protection: "Titik referensi nol potensial bersama untuk integritas sinyal PWM & UART",
    img: null,
  },
];

export default function ElectronicsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [componentModalIndex, setComponentModalIndex] = useState<number | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [pinTableModalOpen, setPinTableModalOpen] = useState(false);

  const prev = () => setActiveTab((a) => (a - 1 + PCB_IMAGES.length) % PCB_IMAGES.length);
  const next = () => setActiveTab((a) => (a + 1) % PCB_IMAGES.length);

  const currentImg = PCB_IMAGES[activeTab];
  const activeComponent = componentModalIndex !== null ? ARCHITECTURE_METRICS[componentModalIndex] : null;

  useEffect(() => {
    setActiveGalleryIndex(0);
  }, [componentModalIndex]);

  useEffect(() => {
    if (componentModalIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setComponentModalIndex(null);
      if (e.key === "ArrowLeft") {
        setComponentModalIndex((i) =>
          i !== null ? (i - 1 + ARCHITECTURE_METRICS.length) % ARCHITECTURE_METRICS.length : null
        );
      }
      if (e.key === "ArrowRight") {
        setComponentModalIndex((i) =>
          i !== null ? (i + 1) % ARCHITECTURE_METRICS.length : null
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [componentModalIndex]);

  return (
    <section
      id="electronics"
      className="bg-[#101010] py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-[#303030] relative"
    >
      {/* Background fine technical grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #EAE8E2 1px, transparent 1px),
            linear-gradient(to bottom, #EAE8E2 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[1360px] mx-auto relative z-10">
        {/* Section label */}
        <span
          className="inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-[#929292] mb-10"
          style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
        >
          <span className="inline-block w-4 h-px bg-[#FF5728]" />
          04 / ELECTRONICS & HARDWARE
        </span>

        {/* Section Headline */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[0.92] tracking-[-0.025em] uppercase text-[#EAE8E2]"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              THE INTELLIGENCE
              <br />
              <span className="text-[#FF5728]">BEHIND</span> THE MOTION.
            </h2>
          </div>
          <div>
            <span
              className="px-3 py-1 border border-[#2a2a2a] bg-[#121212] text-[10px] font-mono tracking-wider uppercase text-[#9E9D96]"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              STM32F401 // DUAL BUCK // 4WD // BLUETOOTH
            </span>
          </div>
        </div>

        {/* Architecture Grid with Component Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {ARCHITECTURE_METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                onClick={() => setComponentModalIndex(idx)}
                className="tech-card group border border-white/[0.08] bg-gradient-to-b from-[#161616] to-[#101010] hover:border-[#FF5728]/70 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl cursor-pointer rounded-sm corner-bracket"
                tabIndex={0}
                role="button"
                aria-label={`Inspect ${metric.value}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setComponentModalIndex(idx);
                  }
                }}
              >
                {/* Visual Stage */}
                <div className="relative w-full h-44 bg-[#0d0d0d] border-b border-[#252525] flex items-center justify-center p-4 overflow-hidden">
                  {/* Subtle radial studio glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,87,40,0.06),transparent_70%)] pointer-events-none" />

                  {/* Top-left component tag */}
                  <span
                    className="absolute top-3 left-3 text-[8px] tracking-[0.2em] uppercase text-[#929292] bg-[#141414]/90 px-2 py-0.5 border border-[#252525] font-mono z-10"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {metric.tag}
                  </span>

                  {/* Hover expand hint */}
                  <span
                    className="inline-flex items-center gap-1 absolute top-3 right-3 text-[8px] tracking-[0.2em] uppercase text-[#FF5728] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 bg-[#141414]/90 px-2 py-0.5 border border-[#FF5728]/30 font-mono"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    <span>INSPECT</span>
                    <ArrowUpRight size={10} />
                  </span>

                  {/* Component Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={metric.image}
                      alt={metric.value}
                      fill
                      className="object-contain p-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-[#141414]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[9px] tracking-[0.2em] uppercase text-[#FF5728] font-bold"
                        style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                      >
                        {metric.label}
                      </span>
                      <Icon size={15} className="text-[#929292] group-hover:text-[#FF5728] transition-colors" />
                    </div>

                    <h4
                      className="text-[14px] font-bold text-[#EAE8E2] leading-[1.35] group-hover:text-[#FF5728] transition-colors"
                      style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                    >
                      {metric.value}
                    </h4>
                  </div>

                  <div className="pt-3 mt-4 border-t border-[#252525] flex items-center justify-between text-[9px] text-[#777]">
                    <span style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}>
                      {metric.spec}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-[#FF5728] uppercase tracking-[0.14em] font-semibold text-[9px]"
                      style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                    >
                      <span>DETAIL</span>
                      <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two-Column: PCB Viewer (Left) & Power Rail Distribution (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16">
          {/* Left: Interactive PCB Viewer (7 cols) */}
          <div className="lg:col-span-7">
            <div className="border border-[#303030] bg-[#141414] overflow-hidden shadow-2xl">
              {/* Viewer Header */}
              <div className="px-5 py-3.5 bg-[#181818] border-b border-[#303030] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="text-[9px] tracking-[0.24em] uppercase text-[#FF5728] font-bold"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {currentImg.badge}
                  </span>
                  <span className="w-px h-3 bg-[#303030]" />
                  <span
                    className="text-[11px] tracking-[0.14em] uppercase text-[#EAE8E2] font-semibold truncate max-w-[220px] sm:max-w-none"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {currentImg.title}
                  </span>
                </div>

                <span
                  className="text-[10px] tracking-[0.2em] text-[#929292]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  {activeTab + 1} / {PCB_IMAGES.length}
                </span>
              </div>

              {/* Main PCB Stage */}
              <div className="relative aspect-[16/11] bg-[#0c0c0c] overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentImg.src}
                      alt={currentImg.title}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      quality={90}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Zoom button */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-[#181818]/90 border border-[#303030] text-[#929292] hover:text-[#EAE8E2] hover:border-[#FF5728] transition-colors"
                  aria-label="Enlarge PCB image"
                >
                  <ZoomIn size={15} />
                </button>

                {/* Navigation arrows */}
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#181818]/90 border border-[#303030] text-[#929292] hover:text-[#EAE8E2] hover:border-[#FF5728] transition-colors"
                  aria-label="Previous PCB view"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#181818]/90 border border-[#303030] text-[#929292] hover:text-[#EAE8E2] hover:border-[#FF5728] transition-colors"
                  aria-label="Next PCB view"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Caption */}
              <div className="px-5 py-3.5 bg-[#141414] border-t border-[#303030]">
                <p
                  className="text-[12px] leading-[1.6] text-[#929292]"
                  style={{ fontFamily: "var(--font-sans, sans-serif)" }}
                >
                  {currentImg.caption}
                </p>
              </div>

              {/* Switcher Tabs */}
              <div className="p-3 bg-[#111111] border-t border-[#303030] flex gap-2 overflow-x-auto">
                {PCB_IMAGES.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`relative px-3 py-2 border text-[10px] uppercase tracking-[0.14em] shrink-0 transition-all flex items-center gap-2 ${i === activeTab
                        ? "bg-[#1f1f1f] border-[#FF5728] text-[#EAE8E2]"
                        : "bg-[#141414] border-[#303030] text-[#929292] hover:text-[#EAE8E2] hover:border-[#555]"
                      }`}
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    <span className={i === activeTab ? "text-[#FF5728]" : "text-[#555]"}>
                      0{i + 1}
                    </span>
                    <span>{img.badge}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Power Distribution Rails (5 cols) */}
          <div className="lg:col-span-5 border border-[#303030] bg-[#141414]">
            <div className="px-5 py-3.5 bg-[#181818] border-b border-[#303030] flex items-center justify-between">
              <span
                className="text-[10px] tracking-[0.24em] uppercase text-[#929292] font-semibold"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                DISTRIBUSI DAYA & REGULASI TEGANGAN
              </span>
              <span
                className="text-[9px] tracking-[0.16em] uppercase text-[#929292] font-mono px-2 py-0.5 border border-[#303030] bg-[#101010]"
              >
                ISOLATED RAILS
              </span>
            </div>

            <div className="divide-y divide-[#252525]">
              {POWER_RAILS.map((rail) => (
                <div key={rail.rail} className="p-4 hover:bg-[#181818] transition-colors">
                  <div className="flex items-start gap-3.5">
                    {rail.img ? (
                      <div className="relative w-12 h-12 shrink-0 bg-[#0c0c0c] border border-[#303030] p-1 flex items-center justify-center">
                        <Image
                          src={rail.img}
                          alt={rail.source}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 shrink-0 bg-[#0c0c0c] border border-[#303030] flex items-center justify-center text-[#666] font-mono text-[9px] font-bold">
                        GND
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <span
                          className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#FF5728]"
                          style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                        >
                          {rail.rail}
                        </span>
                        <span className="text-[9px] font-mono text-[#929292] border border-[#303030] px-2 py-0.5 bg-[#101010]">
                          {rail.source}
                        </span>
                      </div>
                      <p className="text-[12px] font-medium text-[#EAE8E2] mb-0.5">
                        {rail.destination}
                      </p>
                      <p className="text-[11px] text-[#929292] leading-[1.5]">
                        {rail.protection}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#111111] border-t border-[#303030] flex items-center gap-2">
              <Zap size={14} className="text-[#FF5728]" />
              <span
                className="text-[10px] tracking-[0.14em] uppercase text-[#929292]"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                PCT TERMINAL BUS // ISOLATED NOISE PROTECTION
              </span>
            </div>
          </div>
        </div>

        {/* Minimalist STM32 Pinout Trigger Banner */}
        <div className="border border-white/[0.08] bg-[#121212] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5728]" />
              <span
                className="text-[10px] tracking-[0.24em] uppercase text-[#FF5728] font-bold"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                STM32F401RCT6 HARDWARE PINOUT
              </span>
            </div>
            <h3
              className="text-[17px] md:text-[19px] font-bold text-[#EAE8E2] uppercase tracking-wide"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              14-PIN ASSIGNMENT & TIMER MATRIX
            </h3>
            <p className="text-[12px] text-[#888] mt-1 font-mono">
              Konfigurasi hardware timer (TIM2, TIM3, TIM4), GPIO logic output, dan interupsi USART1
            </p>
          </div>

          <button
            onClick={() => setPinTableModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#181818] hover:bg-[#FF5728] hover:text-black text-[#EAE8E2] border border-white/[0.1] text-[10px] font-mono uppercase tracking-[0.18em] transition-all shrink-0"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            <span>BUKA TABEL PINOUT LENGKAP</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox for PCB */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#101010]/98 backdrop-blur-md flex flex-col justify-between"
          >
            <div className="px-6 py-4 border-b border-[#303030] bg-[#141414] flex items-center justify-between">
              <span
                className="text-[11px] tracking-[0.2em] uppercase text-[#FF5728] font-bold"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                {currentImg.title}
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
              <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
                <Image
                  src={currentImg.src}
                  alt={currentImg.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={95}
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#303030] bg-[#141414]">
              <p
                className="text-[12px] text-[#929292]"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                {currentImg.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Component Detail Lightbox / Technical Inspector Modal */}
      <AnimatePresence>
        {activeComponent && componentModalIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#101010]/98 backdrop-blur-md flex flex-col justify-between overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#303030] bg-[#141414] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] tracking-[0.2em] uppercase text-[#FF5728] font-bold"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  {activeComponent.tag}
                </span>
                <span className="w-px h-3 bg-[#303030]" />
                <span
                  className="text-[12px] tracking-[0.14em] uppercase text-[#EAE8E2] font-semibold truncate max-w-sm sm:max-w-none"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  {activeComponent.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="hidden sm:inline-block text-[9px] tracking-[0.2em] uppercase text-[#777] font-mono mr-2"
                >
                  ESC UNTUK MENUTUP
                </span>
                <button
                  onClick={() => setComponentModalIndex(null)}
                  className="w-9 h-9 flex items-center justify-center border border-[#303030] text-[#929292] hover:text-[#EAE8E2] hover:border-[#FF5728] transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 max-w-[1200px] w-full mx-auto p-6 md:p-10 flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-center">
                {/* Visual Stage (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-3.5">
                  <div className="bg-[#0a0a0a] border border-[#303030] p-6 relative aspect-square flex items-center justify-center overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,87,40,0.1),transparent_70%)] pointer-events-none" />
                    <div className="relative w-full h-full max-h-[380px]">
                      <Image
                        src={
                          activeComponent.gallery && activeComponent.gallery[activeGalleryIndex]
                            ? activeComponent.gallery[activeGalleryIndex].src
                            : activeComponent.image
                        }
                        alt={activeComponent.value}
                        fill
                        className="object-contain p-4 filter contrast-105"
                        sizes="(max-width: 1024px) 100vw, 500px"
                        priority
                      />
                    </div>
                  </div>

                  {/* Sub-gallery switcher pills */}
                  {activeComponent.gallery && activeComponent.gallery.length > 1 && (
                    <div className="flex flex-wrap gap-2">
                      {activeComponent.gallery.map((g, gi) => (
                        <button
                          key={g.name}
                          onClick={() => setActiveGalleryIndex(gi)}
                          className={`px-3 py-1.5 text-[9px] uppercase tracking-wider font-mono border transition-all ${
                            gi === activeGalleryIndex
                              ? "bg-[#FF5728]/20 border-[#FF5728] text-[#EAE8E2] font-bold"
                              : "bg-[#141414] border-[#303030] text-[#929292] hover:text-[#EAE8E2] hover:border-[#555]"
                          }`}
                        >
                          {g.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Technical Datasheet Breakdown (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div className="mb-6">
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase text-[#FF5728] font-bold block mb-2"
                      style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                    >
                      {activeComponent.label} // RJ7 ROBOT HARDWARE
                    </span>
                    <h3
                      className="text-[22px] md:text-[26px] font-bold text-[#EAE8E2] leading-tight mb-3"
                      style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                    >
                      {activeComponent.value}
                    </h3>
                    <p className="text-[13px] md:text-[14px] text-[#929292] leading-[1.7] mb-6">
                      {activeComponent.role}
                    </p>
                  </div>

                  {/* Spec Items Table */}
                  <div className="border border-[#303030] bg-[#141414] divide-y divide-[#252525]">
                    {activeComponent.details.map((d) => (
                      <div
                        key={d.k}
                        className="px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]"
                      >
                        <span
                          className="text-[#929292] uppercase tracking-[0.12em] font-medium shrink-0"
                          style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                        >
                          {d.k}
                        </span>
                        <span className="text-[#EAE8E2] font-mono sm:text-right">
                          {d.v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer with Controls */}
            <div className="px-6 py-4 border-t border-[#303030] bg-[#141414] flex items-center justify-between shrink-0">
              <button
                onClick={() =>
                  setComponentModalIndex(
                    (componentModalIndex - 1 + ARCHITECTURE_METRICS.length) % ARCHITECTURE_METRICS.length
                  )
                }
                className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#303030] bg-[#181818] hover:border-[#FF5728] text-[10px] tracking-[0.16em] uppercase text-[#EAE8E2] transition-colors font-mono"
              >
                <ChevronLeft size={14} />
                SEBELUMNYA
              </button>

              <span
                className="text-[10px] tracking-[0.2em] uppercase text-[#929292] font-mono"
              >
                KOMPONEN {String(componentModalIndex + 1).padStart(2, "0")} / {String(ARCHITECTURE_METRICS.length).padStart(2, "0")}
              </span>

              <button
                onClick={() =>
                  setComponentModalIndex((componentModalIndex + 1) % ARCHITECTURE_METRICS.length)
                }
                className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#303030] bg-[#181818] hover:border-[#FF5728] text-[10px] tracking-[0.16em] uppercase text-[#EAE8E2] transition-colors font-mono"
              >
                SELANJUTNYA
                <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dedicated STM32 Pin Mapping Table Modal */}
      <AnimatePresence>
        {pinTableModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setPinTableModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border border-white/[0.1] max-w-5xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                <div>
                  <span
                    className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#FF5728] block"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    TABEL PIN MAPPING STM32F401RCT6 BLACK PILL
                  </span>
                  <span className="text-[11px] text-[#888]">
                    Konfigurasi hardware timer, GPIO, dan interupsi komunikasi UART
                  </span>
                </div>
                <button
                  onClick={() => setPinTableModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center border border-white/[0.1] text-[#9E9D96] hover:text-[#EAE8E2] hover:border-[#FF5728] transition-colors"
                  aria-label="Tutup modal"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="overflow-x-auto border border-white/[0.08] bg-[#0E0E0E]">
                <table className="w-full text-left border-collapse text-[12px]">
                  <thead>
                    <tr className="border-b border-white/[0.08] bg-[#141414] text-[10px] tracking-[0.18em] uppercase text-[#888] font-mono">
                      <th className="py-3 px-4">Komponen / Modul</th>
                      <th className="py-3 px-3">Pin Modul</th>
                      <th className="py-3 px-3">Pin STM32</th>
                      <th className="py-3 px-3">Periferal / Timer</th>
                      <th className="py-3 px-3">Tipe</th>
                      <th className="py-3 px-4">Fungsi & Keterangan Teknis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {STM32_PIN_MAPPING.map((pin) => (
                      <tr key={pin.module + pin.pinStm} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 font-semibold text-[#EAE8E2] whitespace-nowrap">
                          {pin.module}
                        </td>
                        <td className="py-3 px-3 text-[#888] font-mono text-[11px]">
                          {pin.pinModule}
                        </td>
                        <td className="py-3 px-3 text-[#FF5728] font-bold font-mono">
                          {pin.pinStm}
                        </td>
                        <td className="py-3 px-3 text-[#EAE8E2] font-mono text-[11px]">
                          {pin.timer}
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-block px-2 py-0.5 border border-white/[0.08] bg-[#111111] text-[9px] uppercase tracking-wider text-[#999] font-mono">
                            {pin.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#888] text-[11.5px] leading-relaxed">
                          {pin.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-4 mt-6 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#666]">
                <span>TOTAL 14 HARDWARE PINS VERIFIED</span>
                <span className="text-[#FF5728]">STM32F401RCT6</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
