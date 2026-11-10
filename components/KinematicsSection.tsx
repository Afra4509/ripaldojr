"use client";

import ArmKinematics from "./ArmKinematics";

export default function KinematicsSection() {
  return (
    <section
      id="kinematics"
      className="bg-[#0C0C0C] py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-[#242424] relative"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Section label */}
        <span
          className="inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-[#9E9D96] mb-10"
          style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
        >
          <span className="inline-block w-4 h-px bg-[#FF5728]" />
          05 / MANIPULATOR KINEMATICS
        </span>

        {/* Section Headline */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[0.92] tracking-[-0.025em] uppercase text-[#EAE8E2]"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              FORWARD KINEMATICS
              <br />
              <span className="text-[#FF5728]">& SERVO SIMULATION.</span>
            </h2>
          </div>
          <div>
            <span
              className="px-3 py-1 border border-[#2a2a2a] bg-[#121212] text-[10px] font-mono tracking-wider uppercase text-[#9E9D96]"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              TRIGONOMETRI 3-DOF // PWM TIM3 & TIM4 REAL-TIME
            </span>
          </div>
        </div>

        {/* Arm Kinematics Interactive Inspector */}
        <ArmKinematics />
      </div>
    </section>
  );
}

