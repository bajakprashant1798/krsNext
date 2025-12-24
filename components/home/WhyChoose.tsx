"use client";
import React from 'react';

const whyItems = [
    {
        icon: "/images/easy-installation.png", // Paths need check, will use fallback or img
        titleTop: "Easy",
        titleAccent: "Installation",
        text: "Switches and devices so effortless to install, they’re ready in no time!",
    },
    {
        icon: "/images/no-drilling.png",
        titleTop: "No Drilling. No Wiring",
        titleAccent: "Needed",
        text: "Wireless setups with minimal effort—automation without the mess.",
    },
    {
        icon: "/images/completely-wireless.png",
        titleTop: "Completely",
        titleAccent: "Wireless",
        text: "Say goodbye to messy cables—hello beautiful, uncluttered interiors.",
    },
    {
        icon: "/images/voice-controlled.png",
        titleTop: "Voice",
        titleAccent: "Controlled",
        text: "Control your home with simple voice commands—hands-free comfort.",
    },
];

const brandRow1 = [
    "Apple Homekit", "Samsung SmartThings", "Sonos", "Google Home", "IFTTT", "Amazon Alexa"
];

const brandRow2 = [
    "Zigbee 3.0", "Home Assistant", "Apple Airplay", "Matter", "Thread"
];

const WhyChoose = () => {
    return (
        <section id="why" className="px-6 md:px-12 py-16 md:py-24 bg-white dark:bg-black overflow-hidden relative">
            {/* Head */}
            <div className="max-w-5xl mx-auto text-center mb-16 relative z-10">
                <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[var(--primary-color)] font-bold mb-4">
                    Why Choose KRECK Smart Homes?
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-black text-[#23272b] dark:text-white leading-tight">
                    We turn homes into <span className="text-[var(--primary-color)]">intelligent spaces</span> that enhance comfort.
                </h2>
            </div>

            {/* Feature Cards */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24 relative z-10">
                {whyItems.map((item, i) => (
                    <div key={i} className="group relative bg-gray-50 dark:bg-[#111] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-[var(--primary-color)] transition-all duration-300 hover:-translate-y-2">
                        <div className="w-12 h-12 mb-6 bg-[var(--primary-color)]/10 rounded-full flex items-center justify-center text-[var(--primary-color)]">
                            {/* Fallback Icon */}
                            <span className="font-bold text-lg">{i + 1}</span>
                        </div>
                        <h3 className="text-xl font-bold font-heading leading-snug text-[#23272b] dark:text-white mb-2">
                            {item.titleTop} <br />
                            <span className="text-[var(--primary-color)]">{item.titleAccent}</span>
                        </h3>
                        <p className="text-sm text-[#565656] dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                            {item.text}
                        </p>
                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-[var(--primary-color)]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
                    </div>
                ))}
            </div>

            {/* Separator / Brands Header */}
            <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#23272b] dark:text-white">Best in Class Smart Home Devices</h2>
                <p className="mt-2 text-sm text-[#565656] dark:text-gray-400 uppercase tracking-widest">compatible with</p>
            </div>

            {/* Brands Ticker (Simplified as Grid for now) */}
            <div className="max-w-6xl mx-auto space-y-8 relative z-10 opacity-70">
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
                    {brandRow1.map((b, i) => (
                        <span key={i} className="text-lg md:text-xl font-bold text-gray-400 dark:text-gray-600 hover:text-[var(--primary-color)] transition-colors cursor-default">{b}</span>
                    ))}
                </div>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
                    {brandRow2.map((b, i) => (
                        <span key={i} className="text-lg md:text-xl font-bold text-gray-400 dark:text-gray-600 hover:text-[var(--primary-color)] transition-colors cursor-default">{b}</span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
