"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TechBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // 1. Randomly animate dash offset (Flowing current effect)
            const lines = gsap.utils.toArray('.tech-line');
            lines.forEach((line: any) => {
                gsap.to(line, {
                    strokeDashoffset: 0,
                    duration: gsap.utils.random(2, 5),
                    ease: "none",
                    repeat: -1,
                    yoyo: true, // Pulse effect
                });
            });

            // 2. Scroll-based drawing for specific path (The "Scroll Line")
            gsap.fromTo('.scroll-draw-line',
                { strokeDasharray: 1000, strokeDashoffset: 1000 },
                {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                    }
                }
            );

            // 3. Floating particles (Binary/Nodes)
            const particles = gsap.utils.toArray('.tech-particle');
            particles.forEach((p: any) => {
                gsap.to(p, {
                    y: gsap.utils.random(-30, 30),
                    x: gsap.utils.random(-20, 20),
                    rotation: gsap.utils.random(-15, 15),
                    opacity: gsap.utils.random(0.4, 0.9),
                    duration: gsap.utils.random(3, 8),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
            {/* 
         LAYER 1: GRID REMOVED
      */}

            {/* LAYER 2: Floating Binary (Background Noise) - Visible again */}
            <div className="absolute inset-0 flex flex-wrap justify-around items-center opacity-40 gap-20">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="tech-particle text-[10px] md:text-xs font-mono text-gray-400 font-bold select-none">
                        {Math.random().toString(2).slice(2, 8)}
                    </div>
                ))}
            </div>

            {/* LAYER 3: Interactive Circuit Lines */}
            <svg className="absolute w-full h-full top-0 left-0" preserveAspectRatio="xMidYMid slice">
                {/* Animated Flow Lines */}
                <path className="tech-line" d="M0,100 Q300,50 600,200 T1200,300" fill="none" stroke="var(--primary-color)" strokeWidth="0.8" strokeDasharray="20,10" opacity="0.4" />
                <path className="tech-line" d="M-100,500 Q400,600 800,400 T1400,600" fill="none" stroke="var(--secondary-color)" strokeWidth="0.8" strokeDasharray="30,15" opacity="0.3" />

                {/* Main Scroll Line - The "Other Line" user wanted */}
                <path className="scroll-draw-line" d="M50,0 V10000" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" opacity="0.2" />
                <path className="scroll-draw-line" d="M950,0 V10000" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" opacity="0.2" />
            </svg>

            {/* LAYER 4: Ambient Glows */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(220,34,35,0.06)_0%,transparent_70%)] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(86,86,86,0.06)_0%,transparent_70%)] pointer-events-none"></div>
        </div>
    );
};

export default TechBackground;
