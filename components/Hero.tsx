"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlayback = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      className="hero relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden bg-[#0C0C0C]"
      aria-labelledby="hero-h"
    >
      {/* High-res cinematic fallback poster */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/robot/hero-poster.jpg"
          alt="RJ7 Robot Transporter System"
          fill
          priority
          className="object-cover object-center brightness-90"
          sizes="100vw"
        />
      </div>

      {/* Background Video with direct multi-source fallback */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/robot/hero-poster.jpg"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      >
        <source src="/api/hero-video" type="video/mp4" />
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Vignette & Gradients to guarantee text readability */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0C0C0C]/85 to-transparent pointer-events-none z-[1]" />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-28 pb-10 md:pb-14 max-w-[1360px] mx-auto">
        {/* Top technical identifier */}
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] md:text-[11px] tracking-[0.24em] uppercase text-[#9E9D96]"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            RIPALDO JR / SYSTEM RJ7
          </span>

          <span
            className="hidden sm:inline-block text-[10px] tracking-[0.2em] uppercase text-[#9E9D96]"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            ROBOT TRANSPORTER // 4WD + 3-AXIS MANIPULATOR
          </span>
        </div>

        {/* Main headline block */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="mb-2">
              <span
                className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase text-[#FF5728] font-bold"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                RJ7 ROBOT TRANSPORTER
              </span>
            </div>
            <h1
              id="hero-h"
              className="text-[clamp(3.2rem,8.5vw,8.5rem)] font-bold leading-[0.88] tracking-[-0.03em] uppercase text-[#EAE8E2]"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              ENGINEERED
              <br />
              <span className="text-[#FF5728]">TO MOVE.</span>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-3 border-t border-[#262626]">
            {/* Description + Clean High-Contrast Action Buttons */}
            <div className="flex flex-col gap-5 max-w-lg">
              <p className="text-[13.5px] md:text-[14.5px] leading-[1.7] text-[#9E9D96]">
                Sistem robotika transport dan manipulasi terintegrasi bertenaga{" "}
                <strong className="text-[#EAE8E2] font-semibold">STM32F401 ARM Cortex-M4</strong>,
                dikembangkan oleh <strong className="text-[#EAE8E2] font-semibold">Team Ripaldo Jr (ITS)</strong>{" "}
                melalui divisi{" "}
                <span className="text-[#EAE8E2] font-medium border-b border-[#FF5728]/50">Electrical</span>,{" "}
                <span className="text-[#EAE8E2] font-medium border-b border-[#FF5728]/50">Mechanical</span>, dan{" "}
                <span className="text-[#EAE8E2] font-medium border-b border-[#FF5728]/50">Programming</span>.
              </p>

              <div className="flex items-center gap-5">
                <a
                  href="#overview"
                  className="btn btn--primary inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3.5 group bg-[#FF5728] text-black hover:bg-[#ff6e45]"
                  style={{
                    fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)",
                  }}
                >
                  <span>EXPLORE THE SYSTEM</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="#showcase"
                  className="btn btn--secondary inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#9E9D96] hover:text-[#EAE8E2] px-4 py-3"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  PANORAMA SHOWCASE ↓
                </a>
              </div>
            </div>

            {/* Right meta + Video Pause Control (WCAG R-39 compliance) */}
            <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
              <div className="text-left md:text-right">
                <span
                  className="block text-[10px] tracking-[0.22em] uppercase text-[#EAE8E2]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  AUTONOMOUS ENGINEERING / 2026
                </span>
                <span
                  className="block text-[9px] tracking-[0.22em] uppercase text-[#9E9D96]"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  TEAM RIPALDO JR // RJ7
                </span>
              </div>

              <button
                onClick={togglePlayback}
                className="inline-flex items-center gap-2 px-2.5 py-1 border border-[#303030] bg-[#141414]/80 hover:border-[#FF5728] text-[9px] tracking-[0.16em] uppercase text-[#9E9D96] hover:text-[#EAE8E2] transition-colors"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                aria-label={isPlaying ? "Pause background video" : "Play background video"}
              >
                {isPlaying ? <Pause size={10} /> : <Play size={10} />}
                <span>{isPlaying ? "VIDEO PAUSE" : "VIDEO PLAY"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clean scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-60">
        <div className="w-[1px] h-6 bg-[#FF5728]" />
        <span
          className="text-[8px] tracking-[0.3em] uppercase text-[#9E9D96]"
          style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
        >
          SCROLL
        </span>
      </div>
    </section>
  );
}
