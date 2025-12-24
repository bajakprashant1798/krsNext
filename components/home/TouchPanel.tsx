"use client";
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TouchPanel = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();

        const anim = gsap.context(() => {
            // Text Reveal for Heading
            const heading = sectionRef.current?.querySelector('h2');
            if (heading) {
                const text = heading.textContent || "";
                heading.textContent = "";
                text.split("").forEach(char => {
                    const span = document.createElement("span");
                    span.textContent = char === " " ? "\u00A0" : char;
                    span.style.display = "inline-block";
                    span.style.opacity = "0";
                    span.style.transform = "translateY(20px)";
                    heading.appendChild(span);
                });

                gsap.to(heading.children, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.05,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 80%",
                    }
                });
            }

            // Panel Tilt Logic (min-width: 768px)
            mm.add("(min-width: 768px)", () => {
                if (imageContainerRef.current) {
                    gsap.fromTo(imageContainerRef.current,
                        {
                            rotateY: 0,
                            scale: 2.6,
                            opacity: 0,
                            y: -300,
                            transformPerspective: 1000
                        },
                        {
                            rotateY: 0,
                            scale: 1,
                            opacity: 1,
                            y: 50,
                            ease: "sine.out",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top bottom",
                                end: "center center",
                                scrub: true,
                            }
                        }
                    );
                }
            });

            // Mobile simple fade
            mm.add("(max-width: 767px)", () => {
                if (imageContainerRef.current) {
                    gsap.fromTo(imageContainerRef.current,
                        { opacity: 0, y: 100, scale: 0.9 },
                        { opacity: 1, y: 0, scale: 1, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
                    );
                }
            });

        }, sectionRef);

        return () => {
            anim.revert();
            mm.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative py-32 bg-[#f8f4f4] dark:bg-[#0f0f0f] min-h-[100vh] flex flex-col items-center justify-start overflow-hidden">
            <div className="relative z-10 text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-black font-heading text-[#565656] dark:text-gray-200 tracking-tight">
                    TOUCH PANEL
                </h2>
                <div className="w-24 h-1 bg-[var(--primary-color)] mx-auto mt-4 rounded-full"></div>
            </div>

            <div ref={imageContainerRef} className="z-10 relative mt-12">
                <img
                    src="/panel.png"
                    alt="Touch Panel"
                    className="relative max-w-[80vw] md:max-w-4xl mx-auto drop-shadow-2xl rounded-lg"
                />
            </div>

            <p className="relative z-10 mt-24 text-lg md:text-xl font-medium text-secondary dark:text-gray-400 tracking-wide uppercase text-center">
                Manufacturer of Touch Switch & Home Automation
            </p>
        </section>
    );
};

export default TouchPanel;
