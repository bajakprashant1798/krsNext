"use client";
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const panels = [
    {
        image: "/mockup1.png",
        alt: "Kreck app mockup",
        title: "Seamless User Experience",
        bullets: [
            { title: "Smart Automation", text: "AI-powered automation for enhanced productivity" },
            { title: "Real-time Control", text: "Instant device control and monitoring" },
        ],
    },
    {
        image: "/mockup2.png",
        alt: "Kreck app mockup 2",
        title: "Advanced Connectivity",
        bullets: [
            { title: "Scenes & Routines", text: "Create powerful multi-device scenes" },
            { title: "Voice Assistants", text: "Works with popular voice platforms" },
        ],
    },
    {
        image: "/mockup1.png",
        alt: "Kreck app mockup 3",
        title: "Secure & Reliable",
        bullets: [
            { title: "Secure Connection", text: "End-to-end encryption for data protection" },
            { title: "Local Fallback", text: "Keeps working even if internet drops" },
        ],
    }
];

const HorizontalScroll = () => {
    const containerRef = useRef<HTMLElement>(null);
    const panelsContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray(".horizontal-panel");

            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: () => "+=" + (panelsContainerRef.current?.offsetWidth || window.innerWidth * sections.length),
                    invalidateOnRefresh: true,
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative overflow-hidden bg-white/80 backdrop-blur-md">
            <div ref={panelsContainerRef} className="flex flex-row w-[300%] h-screen">
                {panels.map((panel, i) => (
                    <div key={i} className="horizontal-panel w-screen h-screen flex flex-col md:flex-row items-center justify-center p-8 md:p-24 border-r border-gray-100">
                        {/* Left: Image */}
                        <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
                            <div className="relative w-[300px] md:w-[400px]">
                                <div className="absolute inset-0 bg-red-500/20 blur-[60px] rounded-full"></div>
                                <img
                                    src={panel.image}
                                    alt={panel.alt}
                                    className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                    onError={(e) => { (e.target as HTMLImageElement).src = "/mockup1.png"; }}
                                />
                            </div>
                        </div>

                        {/* Right: Content */}
                        <div className="w-full md:w-1/2 space-y-8 pl-0 md:pl-12">
                            <h2 className="text-4xl md:text-5xl font-black font-heading text-secondary uppercase tracking-tighter">
                                {panel.title}
                            </h2>
                            <div className="space-y-6">
                                {panel.bullets.map((b, j) => (
                                    <div key={j} className="flex gap-4 items-start group">
                                        <div className="mt-1.5 w-3 h-3 rounded-full bg-[var(--primary-color)] group-hover:scale-125 transition-transform"></div>
                                        <div>
                                            <h3 className="text-xl font-bold font-heading text-[var(--primary-color)] mb-1">{b.title}</h3>
                                            <p className="text-gray-600 font-medium">{b.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HorizontalScroll;
