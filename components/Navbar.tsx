"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Menu, ChevronRight } from "lucide-react";

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
          {/* Brand: Official Ripaldo Jr Logo */}
          <a href="#" className="flex items-center group py-1" aria-label="Team Ripaldo Jr">
            <div className="relative h-9 sm:h-10 w-40 sm:w-48 shrink-0 transition-opacity duration-200 group-hover:opacity-85">
              <Image
                src="/images/logos/logo-ripaldo-clean.png"
                alt="Team Ripaldo Jr"
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 160px, 192px"
              />
            </div>
          </a>

          {/* Desktop Nav + Status */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <ul className="flex items-center gap-5 xl:gap-7 list-none m-0 p-0">
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
                        <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF5728] shadow-[0_0_8px_rgba(255,87,40,0.8)]" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2.5 pl-4 border-l border-white/[0.1] text-[9px] font-mono tracking-widest text-[#9E9D96]">
              <span className="pulse-indicator" />
              <span className="text-[#EAE8E2] uppercase">RJ7 ACTIVE</span>
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
            <div className="relative h-8 w-36">
              <Image
                src="/images/logos/logo-ripaldo-clean.png"
                alt="Team Ripaldo Jr"
                fill
                className="object-contain object-left"
                sizes="144px"
              />
            </div>
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
                  <ChevronRight size={13} className="text-[#444]" />
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
