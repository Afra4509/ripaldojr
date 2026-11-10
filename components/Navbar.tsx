"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Menu } from "lucide-react";

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Panorama", href: "#showcase" },
  { label: "Hardware", href: "#hardware" },
  { label: "Electronics", href: "#electronics" },
  { label: "Kinematics", href: "#kinematics" },
  { label: "Timeline", href: "#development" },
  { label: "Specs", href: "#specs" },
  { label: "Team", href: "#team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0C0C0C]/95 backdrop-blur-md border-b border-[#242424]"
            : "bg-gradient-to-b from-[#0C0C0C]/90 to-transparent"
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 h-[70px] flex items-center justify-between">
          {/* Wordmark Lockup — Matches official engineering identity */}
          <a href="#" className="flex flex-col gap-0.5 group">
            <span
              className="text-[14px] md:text-[15px] font-bold tracking-[0.16em] uppercase text-[#EAE8E2] leading-none"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              RIPALDO JR
              <span className="text-[#FF5728]"> / </span>
              ROBOTICS
            </span>
            <span
              className="text-[9px] tracking-[0.24em] uppercase text-[#9E9D96] leading-none flex items-center gap-1.5 font-mono pt-0.5"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF5728]" />
              RJ7 ROBOT TRANSPORTER
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-5 xl:gap-7 list-none m-0 p-0">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`relative text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 py-1 ${
                      isActive ? "text-[#EAE8E2] font-semibold" : "text-[#9E9D96] hover:text-[#EAE8E2]"
                    }`}
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF5728]" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right: Clean Transparent Logos (Zero white background box) */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative w-6 h-6 opacity-75 hover:opacity-100 transition-opacity">
              <Image
                src="/images/logos/logo-its-clean.png"
                alt="ITS"
                fill
                className="object-contain"
                sizes="24px"
              />
            </div>
            <div className="relative w-7 h-6 opacity-75 hover:opacity-100 transition-opacity">
              <Image
                src="/images/logos/logo-robotic-clean.png"
                alt="Robotic ITS"
                fill
                className="object-contain"
                sizes="28px"
              />
            </div>
            <div className="w-px h-4 bg-[#2A2A2A]" />
            <div className="relative h-5 w-20 opacity-75 hover:opacity-100 transition-opacity">
              <Image
                src="/images/logos/logo-ripaldo-clean.png"
                alt="Ripaldo Jr"
                fill
                className="object-contain object-right"
                sizes="80px"
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center border border-[#303030] text-[#929292] hover:text-[#EAE8E2] transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={closeMenu}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-[#141414] border-l border-[#252525] flex flex-col pt-24 pb-8 px-6 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-6 pb-4 border-b border-[#252525]">
            <p
              className="text-[13px] font-bold tracking-[0.14em] uppercase text-[#EAE8E2]"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              RIPALDO JR / ROBOTICS
            </p>
          </div>

          <ul className="list-none m-0 p-0 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="text-[12px] tracking-[0.18em] uppercase text-[#929292] hover:text-[#EAE8E2] transition-colors flex items-center justify-between"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  {link.label}
                  <span className="text-[#303030]">→</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6 border-t border-[#252525] flex items-center justify-between opacity-60">
            <span
              className="text-[9px] tracking-[0.18em] uppercase text-[#929292]"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              ITS ROBOTICS 2026
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
