import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RJ7 ROBOT TRANSPORTER — RIPALDO JR",
  description:
    "An integrated robotic transport and manipulation system, developed by Team Ripaldo Jr through mechanical engineering, electronics, and embedded control.",
  keywords: [
    "RJ7",
    "Robot Transporter",
    "Ripaldo Jr",
    "Robotics Engineering",
    "Embedded Systems",
    "Mechatronics",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-[#101010] text-[#EAE8E2] antialiased selection:bg-[#FF5728] selection:text-black">
        {children}
      </body>
    </html>
  );
}
