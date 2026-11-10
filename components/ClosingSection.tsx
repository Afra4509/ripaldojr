"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

function AssembleHeadline({ inView }: { inView: boolean }) {
  const line1 = "BUILT TO MOVE.";
  const line2Part1 = "DESIGNED ";
  const line2Part2 = "TO SOLVE.";

  return (
    <h2
      className="text-[clamp(2.8rem,7.5vw,7rem)] font-bold leading-[0.88] tracking-[-0.03em] uppercase text-[#EAE8E2] mb-8 select-none"
      style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
    >
      <span className="block overflow-hidden">
        {line1.split("").map((char, i) => (
          <motion.span
            key={`l1-${i}`}
            initial={{ opacity: 0, y: 50, rotateX: 45 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.1 + i * 0.02,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
      <span className="block overflow-hidden">
        <span className="text-[#FF5728]">
          {line2Part1.split("").map((char, i) => (
            <motion.span
              key={`l2p1-${i}`}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.4 + i * 0.025,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
        <span>
          {line2Part2.split("").map((char, i) => (
            <motion.span
              key={`l2p2-${i}`}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.6 + i * 0.025,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      </span>
    </h2>
  );
}

export default function ClosingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0C0C0C] py-28 md:py-44 px-6 md:px-12 lg:px-16 border-t border-[#242424] overflow-hidden"
    >
      {/* Background robot photography backdrop */}
      <div className="absolute inset-0 opacity-[0.10] pointer-events-none">
        <Image
          src="/images/robot/front.png"
          alt="RJ7 Robot Transporter"
          fill
          className="object-cover object-center filter contrast-125"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/80 to-[#0C0C0C]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-[#0C0C0C]" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4">
            <span
              className="text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-[#FF5728] font-semibold"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              PROJECT CONCLUSION // RJ7 SYSTEM
            </span>
          </div>

          <AssembleHeadline inView={inView} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="text-[14px] md:text-[15px] leading-[1.8] text-[#9E9D96] max-w-xl mb-12">
            Proyek RJ7 membuktikan integrasi penuh antara perancangan mekanikal sasis 4WD,
            isolasi regulasi daya bertingkat (12V / 6V / 5V), serta pemrograman mikrokontroler
            STM32F401 32-bit ARM Cortex-M4. Dikonstruksi secara kolaboratif oleh mahasiswa
            Institut Teknologi Sepuluh Nopember (ITS) dalam wadah Team Ripaldo Jr.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap items-center gap-6"
        >
          <button
            onClick={scrollToTop}
            className="btn inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-[#0C0C0C] bg-[#EAE8E2] hover:bg-[#FF5728] hover:text-[#000000] px-6 py-3.5 font-bold group shadow-xl"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            BACK TO TOP
            <span className="inline-block transition-transform duration-200 group-hover:-translate-y-1">↑</span>
          </button>

          <span
            className="text-[10px] tracking-[0.2em] uppercase text-[#9E9D96]"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            TEAM RIPALDO JR // 2026
          </span>
        </motion.div>
      </div>
    </section>
  );
}
