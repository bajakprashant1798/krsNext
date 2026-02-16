"use client";

import HexTechBackground from "@/components/ui/HexTechBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/ui/FloatingActions";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <HexTechBackground />
            <Navbar />
            <div className="relative z-10">
                {children}
            </div>
            <FloatingActions />
            <Footer />
        </>
    );
}
