import type { Metadata } from "next";
import { Orbitron, Open_Sans } from "next/font/google";
import "./globals.css";
import HexTechBackground from "@/components/ui/HexTechBackground";
import Navbar from "@/components/Navbar";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Kreck Robotics | Smart Home Automation",
  description: "Ultimate Home Intelligent Automation Solution by Kreck Robotics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${orbitron.variable} antialiased selection:bg-[#ff0000] selection:text-white`}
      >
        <HexTechBackground />
        <Navbar />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
