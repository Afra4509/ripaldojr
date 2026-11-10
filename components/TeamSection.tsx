"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Phone, ArrowUpRight } from "lucide-react";

const TEAM = [
  {
    img: "/images/team/ahmad.png",
    name: "Ahmad Syahreza Nouval Siregar",
    code: "AnF",
    division: "Administration & Finance",
    role: "Project Administration, Resource Budgeting & Financial Planning",
    id: "DIV-01",
    tag: "AnF DIVISION",
    contactLabel: "CP",
    contactPhone: "+62 853-6605-0293",
    contactNick: "Ahmad Syahreza",
    waUrl: "https://wa.me/6285366050293",
  },
  {
    img: "/images/team/farrel.png",
    name: "Farrel Aryasatya Raharjo",
    code: "CnB",
    division: "Creative & Branding",
    role: "Visual Identity, Media Production, Editorial Design & Brand Communication",
    id: "DIV-02",
    tag: "CnB DIVISION",
  },
  {
    img: "/images/team/dhanishara.png",
    name: "Dhanishara Zaschya Putri Syamsudin",
    code: "SnE",
    division: "Sponsor & External",
    role: "Strategic Partnerships, External Relations, Stakeholder Outreach & Sponsorships",
    id: "DIV-03",
    tag: "SnE DIVISION",
    contactLabel: "Sponsor",
    contactPhone: "+62 822-6032-0812",
    contactNick: "naraa",
    waUrl: "https://wa.me/6282260320812",
  },
  {
    img: "/images/team/afra.png",
    name: "Afra Fadhma Dinata",
    code: "ELECTRICAL",
    division: "Electrical Engineering",
    role: "Circuit Architecture, Dual Buck Regulators (5V/6V), PCT Bus & Power Distribution",
    id: "DIV-04",
    tag: "HARDWARE",
  },
  {
    img: "/images/team/miraj.png",
    name: "Mi'raj Fahri Abdillah",
    code: "MECHANICAL",
    division: "Mechanical Engineering",
    role: "4WD Chassis Fabrication, Dual-Arm Gripper Linkages & Kinematics Modeling",
    id: "DIV-05",
    tag: "HARDWARE",
  },
  {
    img: "/images/team/haqqi.png",
    name: "Muhammad Haqqi Nazili",
    code: "PROGRAMMER",
    division: "Embedded Programming",
    role: "STM32F401 ARM Cortex-M4 Firmware, Hardware Timers PWM & Autonomous State Machine",
    id: "DIV-06",
    tag: "FIRMWARE",
  },
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TeamCard({ member, index }: { member: (typeof TEAM)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group border border-[#303030] bg-[#141414] overflow-hidden hover:border-[#FF5728]/60 transition-colors duration-300 flex flex-col justify-between shadow-2xl"
    >
      {/* Member Portrait */}
      <div className="relative overflow-hidden aspect-[3/4] bg-[#0d0d0d]">
        <Image
          src={member.img}
          alt={member.name}
          fill
          className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
        />
        {/* Bottom Vignette */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span
            className="text-[9px] tracking-[0.2em] uppercase text-[#FF5728] bg-[#101010]/90 backdrop-blur-sm px-2.5 py-1 border border-[#FF5728]/40 font-bold"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            {member.code}
          </span>
          <span
            className="text-[9px] tracking-[0.16em] uppercase text-[#EAE8E2] bg-[#101010]/90 backdrop-blur-sm px-2 py-1 border border-[#303030]"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            {member.id}
          </span>
        </div>
      </div>

      {/* Info Block */}
      <div className="p-5 border-t border-[#303030] bg-[#141414]">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5728] shrink-0" />
          <span
            className="text-[9px] tracking-[0.2em] uppercase text-[#FF5728] font-bold"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            {member.division}
          </span>
        </div>

        <h3
          className="text-[15px] font-bold text-[#EAE8E2] uppercase tracking-[0.04em] leading-tight mb-2 group-hover:text-[#FF5728] transition-colors"
          style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
        >
          {member.name}
        </h3>

        <p
          className="text-[12px] leading-[1.6] text-[#929292]"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          {member.role}
        </p>

        {member.contactPhone && (
          <a
            href={member.waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 pt-3 border-t border-[#252525] flex items-center justify-between text-[11px] text-[#929292] hover:text-[#EAE8E2] transition-colors group/contact"
          >
            <div className="flex items-center gap-2">
              <Phone size={12} className="text-[#FF5728]" />
              <span
                className="text-[10px] tracking-wider uppercase font-semibold text-[#EAE8E2]"
                style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
              >
                {member.contactLabel}: {member.contactPhone}
              </span>
            </div>
            <span
              className="text-[10px] text-[#FF5728] font-mono flex items-center gap-0.5"
              style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
            >
              ~{member.contactNick}
              <ArrowUpRight size={12} />
            </span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section
      id="team"
      className="bg-[#181818] py-24 md:py-36 px-6 md:px-12 lg:px-16 border-t border-[#303030] relative"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Section label */}
        <FadeIn>
          <span
            className="inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-[#929292] mb-10"
            style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
          >
            <span className="inline-block w-4 h-px bg-[#FF5728]" />
            08 / THE ENGINEERING TEAM
          </span>
        </FadeIn>

        {/* Headline */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <FadeIn delay={0.1} className="max-w-xl">
            <h2
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[0.92] tracking-[-0.025em] uppercase text-[#EAE8E2]"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              TEAM <span className="text-[#FF5728]">RIPALDO JR.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} className="max-w-md">
            <p className="text-[14px] md:text-[15px] text-[#929292] leading-[1.7]">
              Multidisciplinary crew driving engineering, embedded systems, sponsor relations,
              finance administration, and creative direction for the RJ7 Robot Transporter.
            </p>
          </FadeIn>
        </div>

        {/* 6-Member Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
