"use client";

import { useState } from "react";
import { Sliders, RotateCcw, Cpu, CheckCircle2 } from "lucide-react";

export default function ArmKinematics() {
  // Joint angles
  const [shoulder, setShoulder] = useState<number>(110); // 10° - 160°
  const [elbow, setElbow] = useState<number>(105);       // 20° - 165°
  const [gripper, setGripper] = useState<number>(20);     // 20° - 42°

  // Presets
  const applyPreset = (s: number, e: number, g: number) => {
    setShoulder(s);
    setElbow(e);
    setGripper(g);
  };

  // Convert angle to PWM pulse (500µs to 2500µs for standard 50Hz servos)
  const calcPwm = (deg: number, minDeg = 0, maxDeg = 180) => {
    const pulse = 500 + ((deg - minDeg) / (maxDeg - minDeg)) * 2000;
    return Math.round(pulse);
  };

  // Kinematic calculations for 2D visualization (Link1 = 120mm, Link2 = 100mm)
  // Base origin in SVG: (80, 240)
  const L1 = 110; // pixels
  const L2 = 90;  // pixels
  const baseOrigin = { x: 90, y: 230 };

  // Convert degrees to radians for SVG rendering
  // Shoulder angle: 0° is horizontal right, 90° is straight up
  const radShoulder = (shoulder * Math.PI) / 180;
  const elbowX = baseOrigin.x + L1 * Math.cos(radShoulder);
  const elbowY = baseOrigin.y - L1 * Math.sin(radShoulder);

  // Elbow relative angle
  const radElbow = ((shoulder - elbow + 90) * Math.PI) / 180;
  const wristX = elbowX + L2 * Math.cos(radElbow);
  const wristY = elbowY - L2 * Math.sin(radElbow);

  // Approximate physical X, Y in millimeters (scale 1px ~ 1.2mm)
  const realX = Math.round((wristX - baseOrigin.x) * 1.2);
  const realY = Math.round((baseOrigin.y - wristY) * 1.2);

  // Gripper jaw width (20° = 55mm open, 42° = 15mm clamped)
  const isClamped = gripper >= 40;
  const jawSpread = Math.max(8, 26 - ((gripper - 20) / 22) * 18);

  return (
    <div className="border border-[#303030] bg-[#141414] p-6 md:p-8 mt-16 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#303030] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sliders size={16} className="text-[#FF5728]" />
            <h3
              className="text-[14px] md:text-[15px] uppercase tracking-[0.12em] font-bold text-[#EAE8E2]"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              3-DOF ARM KINEMATICS & SERVO PWM INSPECTOR
            </h3>
          </div>
          <p
            className="text-[11px] tracking-[0.12em] text-[#929292]"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            Simulasi gerak sudut sendi & kalkulasi pulsa timer hardware STM32 (TIM3_CH1, TIM3_CH2, TIM4_CH3)
          </p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 border border-[#303030] bg-[#101010]">
            <span className={`w-2 h-2 rounded-full ${isClamped ? "bg-[#FF5728]" : "bg-[#555]"}`} />
            <span
              className="text-[9px] tracking-[0.18em] uppercase text-[#929292]"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              {isClamped ? "GRIPPER: CLAMPED (AUTO-DETACH)" : "GRIPPER: OPEN"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Kinematic Visualizer (7 cols) */}
        <div className="lg:col-span-7 bg-[#0d0d0d] border border-[#303030] p-4 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #EAE8E2 1px, transparent 1px),
                linear-gradient(to bottom, #EAE8E2 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Canvas SVG */}
          <svg viewBox="0 0 340 270" className="w-full h-auto max-h-[300px]">
            {/* Ground / Acrylic chassis base line */}
            <line x1="30" y1="245" x2="310" y2="245" stroke="#303030" strokeWidth="2" />
            <rect x="60" y="235" width="60" height="10" fill="#222" stroke="#444" strokeWidth="1" />

            {/* Base Riser Post */}
            <line x1={baseOrigin.x} y1="240" x2={baseOrigin.x} y2={baseOrigin.y} stroke="#666" strokeWidth="6" />

            {/* Reach circle indicator */}
            <circle
              cx={baseOrigin.x}
              cy={baseOrigin.y}
              r={L1 + L2}
              fill="none"
              stroke="#252525"
              strokeDasharray="4 4"
            />

            {/* Link 1: Shoulder to Elbow (Orange structural beam) */}
            <line
              x1={baseOrigin.x}
              y1={baseOrigin.y}
              x2={elbowX}
              y2={elbowY}
              stroke="#FF5728"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Link 2: Elbow to Wrist */}
            <line
              x1={elbowX}
              y1={elbowY}
              x2={wristX}
              y2={wristY}
              stroke="#EAE8E2"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Gripper Jaws */}
            <line
              x1={wristX}
              y1={wristY - jawSpread}
              x2={wristX + 22}
              y2={wristY - jawSpread}
              stroke="#FF5728"
              strokeWidth="3"
            />
            <line
              x1={wristX}
              y1={wristY + jawSpread}
              x2={wristX + 22}
              y2={wristY + jawSpread}
              stroke="#FF5728"
              strokeWidth="3"
            />

            {/* Shoulder Joint Pivot (MG996R) */}
            <circle cx={baseOrigin.x} cy={baseOrigin.y} r="8" fill="#181818" stroke="#FF5728" strokeWidth="2" />
            <circle cx={baseOrigin.x} cy={baseOrigin.y} r="3" fill="#FF5728" />

            {/* Elbow Joint Pivot (MG90S) */}
            <circle cx={elbowX} cy={elbowY} r="7" fill="#181818" stroke="#EAE8E2" strokeWidth="2" />
            <circle cx={elbowX} cy={elbowY} r="2.5" fill="#EAE8E2" />

            {/* Wrist Joint Pivot (MG90S) */}
            <circle cx={wristX} cy={wristY} r="5" fill="#181818" stroke="#FF5728" strokeWidth="2" />

            {/* Annotations */}
            <text x={baseOrigin.x - 40} y="260" fill="#777" fontSize="9" fontFamily="monospace">
              SHOULDER (MG996R)
            </text>
            <text x={wristX + 10} y={wristY - 14} fill="#FF5728" fontSize="10" fontFamily="monospace" fontWeight="bold">
              END-EFFECTOR ({realX}mm, {realY}mm)
            </text>
          </svg>

          {/* Live telemetry coordinates */}
          <div className="pt-3 border-t border-[#252525] flex flex-wrap items-center justify-between text-[10px] text-[#929292]">
            <span style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}>
              COORDINATES: X={realX}mm | Y={realY}mm
            </span>
            <span style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}>
              TOTAL ARM REACH: 200mm
            </span>
          </div>
        </div>

        {/* Interactive Sliders & Presets (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Preset Buttons */}
          <div>
            <span
              className="block text-[9px] tracking-[0.2em] uppercase text-[#929292] mb-2"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              POSE PRESETS
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => applyPreset(110, 105, 20)}
                className="px-3 py-2 border border-[#303030] bg-[#181818] hover:border-[#FF5728] text-[10px] tracking-[0.14em] uppercase text-[#EAE8E2] text-left transition-colors"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                01: INITIAL / HOME
              </button>
              <button
                onClick={() => applyPreset(40, 60, 20)}
                className="px-3 py-2 border border-[#303030] bg-[#181818] hover:border-[#FF5728] text-[10px] tracking-[0.14em] uppercase text-[#EAE8E2] text-left transition-colors"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                02: REACH & ALIGN
              </button>
              <button
                onClick={() => applyPreset(30, 45, 42)}
                className="px-3 py-2 border border-[#303030] bg-[#181818] hover:border-[#FF5728] text-[10px] tracking-[0.14em] uppercase text-[#EAE8E2] text-left transition-colors"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                03: CLAMP PAYLOAD
              </button>
              <button
                onClick={() => applyPreset(135, 90, 42)}
                className="px-3 py-2 border border-[#303030] bg-[#181818] hover:border-[#FF5728] text-[10px] tracking-[0.14em] uppercase text-[#EAE8E2] text-left transition-colors"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                04: ELEVATE TRANSIT
              </button>
            </div>
          </div>

          {/* Slider 1: Shoulder (MG996R) */}
          <div className="border border-[#303030] bg-[#181818] p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <span className="text-[11px] font-bold text-[#EAE8E2]">SENDIR BAHU (SHOULDER)</span>
                <span
                  className="block text-[9px] text-[#FF5728]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  PA7 // TIM3_CH2 // MG996R
                </span>
              </div>
              <div className="text-right">
                <span
                  className="text-[13px] font-bold text-[#EAE8E2]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  {shoulder}°
                </span>
                <span
                  className="block text-[9px] text-[#777]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  {calcPwm(shoulder, 10, 160)} µs
                </span>
              </div>
            </div>
            <input
              type="range"
              min={10}
              max={160}
              value={shoulder}
              onChange={(e) => setShoulder(Number(e.target.value))}
              className="w-full accent-[#FF5728] cursor-pointer"
            />
            <div className="flex justify-between text-[8px] text-[#666] mt-1 font-mono">
              <span>MIN: 10°</span>
              <span>INIT: 110°</span>
              <span>MAX: 160°</span>
            </div>
          </div>

          {/* Slider 2: Elbow (MG90S) */}
          <div className="border border-[#303030] bg-[#181818] p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <span className="text-[11px] font-bold text-[#EAE8E2]">SENDI SIKU (ELBOW)</span>
                <span
                  className="block text-[9px] text-[#FF5728]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  PB8 // TIM4_CH3 // MG90S
                </span>
              </div>
              <div className="text-right">
                <span
                  className="text-[13px] font-bold text-[#EAE8E2]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  {elbow}°
                </span>
                <span
                  className="block text-[9px] text-[#777]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  {calcPwm(elbow, 20, 165)} µs
                </span>
              </div>
            </div>
            <input
              type="range"
              min={20}
              max={165}
              value={elbow}
              onChange={(e) => setElbow(Number(e.target.value))}
              className="w-full accent-[#FF5728] cursor-pointer"
            />
            <div className="flex justify-between text-[8px] text-[#666] mt-1 font-mono">
              <span>MIN: 20°</span>
              <span>INIT: 105°</span>
              <span>MAX: 165°</span>
            </div>
          </div>

          {/* Slider 3: Gripper (MG90S) */}
          <div className="border border-[#303030] bg-[#181818] p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <span className="text-[11px] font-bold text-[#EAE8E2]">CAPIT (GRIPPER)</span>
                <span
                  className="block text-[9px] text-[#FF5728]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  PA6 // TIM3_CH1 // MG90S (2µs Step)
                </span>
              </div>
              <div className="text-right">
                <span
                  className={`text-[13px] font-bold ${isClamped ? "text-[#FF5728]" : "text-[#EAE8E2]"}`}
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  {gripper}° {isClamped ? "(CLAMP)" : "(OPEN)"}
                </span>
                <span
                  className="block text-[9px] text-[#777]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  {calcPwm(gripper, 20, 42)} µs
                </span>
              </div>
            </div>
            <input
              type="range"
              min={20}
              max={42}
              value={gripper}
              onChange={(e) => setGripper(Number(e.target.value))}
              className="w-full accent-[#FF5728] cursor-pointer"
            />
            <div className="flex justify-between text-[8px] text-[#666] mt-1 font-mono">
              <span>BUKA: 20°</span>
              <span>AUTO-DETACH: 42°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

