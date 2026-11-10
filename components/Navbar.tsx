"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Menu } from "lucide-react";

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Engineering", href: "#development" },
  { label: "Hardware", href: "#hardware" },
  { label: "Electronics", href: "#electronics" },
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
      { rootMargin: "-40% 0px -55% 0px" }
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#101010]/95 backdrop-blur-md border-b border-[#303030]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-5 md:px-10 h-[72px] flex items-center justify-between">
          {/* Wordmark */}
          <a href="#" className="flex flex-col gap-0.5 group">
            <span
              className="text-[15px] font-bold tracking-[0.12em] uppercase text-[#EAE8E2] leading-none"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              RIVAL
              <span className="text-[#FF5728]"> / </span>
              ROBOTICS
            </span>
            <span
              className="text-[9px] tracking-[0.22em] uppercase text-[#929292] leading-none"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              ENGINEERING PROJECT
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`relative text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 ${
                      isActive ? "text-[#EAE8E2]" : "text-[#929292] hover:text-[#EAE8E2]"
                    }`}
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#FF5728]" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-[#929292] hover:text-[#EAE8E2] transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-400 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeMenu}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-[#181818] border-l border-[#303030] flex flex-col pt-24 pb-10 px-8 transition-transform duration-400 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="list-none m-0 p-0 flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="text-[13px] tracking-[0.18em] uppercase text-[#929292] hover:text-[#EAE8E2] transition-colors"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <p
              className="text-[9px] tracking-[0.22em] uppercase text-[#303030]"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              RIVAL / ROBOTICS — 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
