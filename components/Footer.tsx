import Image from "next/image";
import { Phone, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Panorama Showcase", href: "#showcase" },
  { label: "Hardware Exploration", href: "#hardware" },
  { label: "Electronics & PCB", href: "#electronics" },
  { label: "Arm Kinematics", href: "#kinematics" },
  { label: "Development Timeline", href: "#development" },
  { label: "System Specifications", href: "#specs" },
  { label: "The Engineering Team", href: "#team" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0c0c0c] border-t border-[#303030] px-6 md:px-12 lg:px-16 py-16">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          {/* Identity & Logos (5 cols) */}
          <div className="md:col-span-5">
            {/* 3 Matching Transparent Logos Row */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#252525]">
              <div className="relative w-9 h-9 shrink-0">
                <Image
                  src="/images/logos/logo-its-clean.png"
                  alt="Institut Teknologi Sepuluh Nopember"
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </div>
              <div className="relative w-10 h-9 shrink-0">
                <Image
                  src="/images/logos/logo-robotic-clean.png"
                  alt="Robotic ITS"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <div className="w-[1px] h-8 bg-[#303030]" />
              <div className="relative h-8 w-28 shrink-0">
                <Image
                  src="/images/logos/logo-ripaldo-clean.png"
                  alt="Team Ripaldo Jr"
                  fill
                  className="object-contain object-left"
                  sizes="112px"
                />
              </div>
            </div>

            <div className="mb-3">
              <span
                className="text-[16px] font-bold tracking-[0.14em] uppercase text-[#EAE8E2]"
                style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
              >
                RIPALDO JR
                <span className="text-[#FF5728]"> / </span>
                ROBOTICS
              </span>
            </div>
            <p
              className="text-[10px] tracking-[0.2em] uppercase text-[#FF5728] font-semibold mb-2"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              RJ7 ROBOT TRANSPORTER // 2026
            </p>
            <p className="text-[13px] leading-[1.7] text-[#929292] max-w-sm mb-4">
              Integrated robotics development project showcasing 4WD mechatronics,
              STM32F401 ARM Cortex-M4 embedded firmware, and 3-axis servo manipulation.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#303030] bg-[#141414]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5728]" />
              <span
                className="text-[9px] tracking-[0.16em] uppercase text-[#929292]"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                INSTITUT TEKNOLOGI SEPULUH NOPEMBER
              </span>
            </div>
          </div>

          {/* Navigation Links (4 cols) */}
          <div className="md:col-span-4">
            <p
              className="text-[10px] tracking-[0.26em] uppercase text-[#929292] font-semibold mb-4"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              SYSTEM DIRECTORY
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none m-0 p-0">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[11px] tracking-[0.14em] uppercase text-[#929292] hover:text-[#EAE8E2] hover:underline transition-colors block py-1"
                    style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Details & Docs (3 cols) */}
          <div className="md:col-span-3">
            <p
              className="text-[10px] tracking-[0.26em] uppercase text-[#929292] font-semibold mb-4"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              ENGINEERING REPOSITORIES
            </p>
            <ul className="space-y-2.5 list-none m-0 p-0 text-[11px]">
              <li>
                <span
                  className="text-[#929292] hover:text-[#FF5728] cursor-pointer transition-colors inline-flex items-center gap-1"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  <span>STM32F401 Firmware (C++)</span>
                  <ArrowUpRight size={11} />
                </span>
              </li>
              <li>
                <span
                  className="text-[#929292] hover:text-[#FF5728] cursor-pointer transition-colors inline-flex items-center gap-1"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  <span>KiCad PCB Layouts & Gerbers</span>
                  <ArrowUpRight size={11} />
                </span>
              </li>
              <li>
                <span
                  className="text-[#929292] hover:text-[#FF5728] cursor-pointer transition-colors inline-flex items-center gap-1"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  <span>3-DOF Arm Kinematics & CAD</span>
                  <ArrowUpRight size={11} />
                </span>
              </li>
              <li>
                <span
                  className="text-[#929292] hover:text-[#FF5728] cursor-pointer transition-colors inline-flex items-center gap-1"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  <span>Team Ripaldo Jr Contact</span>
                  <ArrowUpRight size={11} />
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Contact & Sponsorship Inquiries Block */}
        <div className="border-t border-[#202020] pt-10 pb-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Contact Person Card */}
            <div className="card p-5 border border-[#242424] bg-[#141414] flex flex-col justify-between hover:border-[#FF5728]/60 transition-colors shadow-lg">
              <div>
                <span
                  className="text-[9px] tracking-[0.2em] uppercase text-[#FF5728] font-bold block mb-1.5"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  CONTACT PERSON (CP) // ADMINISTRATION & GENERAL INQUIRIES
                </span>
                <h4
                  className="text-[15px] font-bold text-[#EAE8E2] mb-1 uppercase"
                  style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                >
                  Ahmad Syahreza Nouval Siregar
                </h4>
                <p className="text-[12px] text-[#9E9D96] mb-4">
                  Administrasi umum, koordinasi proyek, dan korespondensi resmi Team Ripaldo Jr.
                </p>
              </div>
              <a
                href="https://wa.me/6285366050293"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#EAE8E2] hover:text-[#FF5728] transition-colors"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                <Phone size={13} className="text-[#FF5728]" />
                <span className="font-bold">+62 853-6605-0293</span>
                <span className="text-[#777]">(~Ahmad Syahreza)</span>
                <ArrowUpRight size={12} className="text-[#FF5728]" />
              </a>
            </div>

            {/* Sponsor Card */}
            <div className="card p-5 border border-[#242424] bg-[#141414] flex flex-col justify-between hover:border-[#FF5728]/60 transition-colors shadow-lg">
              <div>
                <span
                  className="text-[9px] tracking-[0.2em] uppercase text-[#FF5728] font-bold block mb-1.5"
                  style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
                >
                  SPONSORSHIP & PARTNERSHIP // EXTERNAL RELATIONS
                </span>
                <h4
                  className="text-[15px] font-bold text-[#EAE8E2] mb-1 uppercase"
                  style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                >
                  Dhanishara Zaschya Putri Syamsudin
                </h4>
                <p className="text-[12px] text-[#9E9D96] mb-4">
                  Kemitraan industri, proposal sponsorship, kerja sama riset, dan pendanaan kompetisi.
                </p>
              </div>
              <a
                href="https://wa.me/6282260320812"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#EAE8E2] hover:text-[#FF5728] transition-colors"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                <Phone size={13} className="text-[#FF5728]" />
                <span className="font-bold">+62 822-6032-0812</span>
                <span className="text-[#777]">(~naraa)</span>
                <ArrowUpRight size={12} className="text-[#FF5728]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#303030] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span
            className="text-[9px] tracking-[0.2em] uppercase text-[#929292]"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            © 2026 TEAM RIPALDO JR // INSTITUT TEKNOLOGI SEPULUH NOPEMBER
          </span>
          <span
            className="text-[9px] tracking-[0.2em] uppercase text-[#929292]"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            RJ7 ROBOT TRANSPORTER // PRODUCTION SHOWCASE
          </span>
        </div>
      </div>
    </footer>
  );
}
