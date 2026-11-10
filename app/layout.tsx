import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
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
  weight: ["400", "500", "600"],
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
      lang="id"
      data-type="product"
      data-motion="on"
      data-radius="soft"
      className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <meta name="page-type" content="product" />
        <meta name="site-kind" content="tech" />
        <link rel="stylesheet" href="/assets/system.css" />
        <link rel="stylesheet" href="/assets/ui/cards.css" />
        <link rel="stylesheet" href="/assets/motion/motion.css" />
        <link rel="stylesheet" href="/assets/moments/letters-assemble/moment.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700);`,
          }}
        />
      </head>
      <body className="bg-[#0C0C0C] text-[#EAE8E2] antialiased selection:bg-[#FF5728] selection:text-black">
        {children}
        <Script src="/assets/system.js" strategy="afterInteractive" />
        <Script src="/assets/motion/motion.js" type="module" strategy="afterInteractive" />
        <Script src="/assets/moments/moments.js" type="module" strategy="afterInteractive" />
      </body>
    </html>
  );
}
