"use client";
import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Link from 'next/link';

// Using the exact structure from Nuxt snippet
const features = [
    {
        title: "King Series",
        subTitle: "Touch Panel",
        text: "The pinnacle of sophistication. Sleek touch panel switches that blends luxury with seamless home automation.",
        link: "contact",
        image: "/images/products/king_touch_panel/k_touch_panel.png",
        color: "#00071b"
    },
    {
        title: "Royal Series",
        subTitle: "Touch Panel",
        text: "Intelligent design meets effortless control. Touch and dimmer functionality for a smarter, more elegant living.",
        link: "contact",
        image: "/images/products/royal_touch_panel/r_touch_panel.png",
        color: "#0142ab"
    },
    {
        title: "Smart Series",
        subTitle: "Retrofit Switch",
        text: "Classic made contemporary. Transform your existing switches into smart, automated elegance without compromise.",
        link: "contact",
        image: "/images/products/smart_retrofit/s_retrofit.png",
        color: "#022e67"
    },
    {
        title: "Sensor Hub",
        subTitle: "",
        text: "Smart power saving mode, workflow support, and seamless integration with smart home systems.",
        link: "contact",
        image: "/images/products/sensor_hub/sensor_hub.png",
        color: "#001453"
    },
    {
        title: "Digital Door Lock",
        subTitle: "",
        text: "Classic made contemporary. Transform your existing switches into smart, automated elegance without compromise. (Made in China)",
        link: "contact",
        image: "/images/products/door_lock/door_lock.png",
        color: "#333"
    },
    {
        title: "Intruder Alert Sensor",
        subTitle: "",
        text: "Classic made contemporary. Transform your existing switches into smart, automated elegance without compromise. (Made in China)",
        link: "contact",
        image: "/images/products/intruder_alert/intruder_alert.png",
        color: "#444"
    },
    {
        title: "Door Window &",
        subTitle: "Cuboart Sensor Alert",
        text: "Classic made contemporary. Transform your existing switches into smart, automated elegance without compromise.",
        link: "contact",
        image: "/images/products/panel1.png",
        color: "#555"
    },
    {
        title: "Automatic Curtain",
        subTitle: "",
        text: "Classic made contemporary. Transform your existing switches into smart, automated elegance without compromise.",
        link: "contact",
        image: "/images/products/automatic_curtain/automatic_curtain.png",
        color: "#666"
    },
];

const ScrollFeatures = () => {
    const containerRef = useRef<HTMLElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    // Using arrays for refs
    const featureTextRefs = useRef<(HTMLDivElement | null)[]>([]);
    const mobileFeatureRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();

        // DESKTOP: PINNED IMAGE + SCROLL TEXT
        mm.add("(min-width: 768px)", () => {
            // Pin the image wrapper
            if (containerRef.current && imageWrapperRef.current) {
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: imageWrapperRef.current,
                    scrub: true,
                });
            }

            // Background color changes
            featureTextRefs.current.forEach((el, index) => {
                if (!el) return;

                // Only handle color change trigger here
                ScrollTrigger.create({
                    trigger: el,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => animateToSection(index),
                    onEnterBack: () => animateToSection(index),
                });
            });
        });

        // MOBILE: STACKED ANIMATION
        mm.add("(max-width: 767px)", () => {
            gsap.set(mobileFeatureRefs.current, { opacity: 0, y: 50 });

            ScrollTrigger.batch(mobileFeatureRefs.current, {
                start: "top 80%",
                onEnter: (elements) => {
                    gsap.to(elements, { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "power2.out" });
                },
                onLeaveBack: (elements) => {
                    gsap.to(elements, { opacity: 0, y: 50 });
                }
            });
        });

        return () => mm.revert();
    }, []);

    const [activeIndex, setActiveIndex] = useState(0);

    const animateToSection = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="scroll-features-wrapper">
            {/* DESKTOP VERSION */}
            <section
                ref={containerRef}
                className="hidden md:block relative transition-colors duration-700"
                style={{ backgroundColor: features[activeIndex]?.color || '#000' }}
            >
                <div className="max-w-7xl mx-auto flex">
                    {/* Left: Text Column (Scrolls) */}
                    <div className="w-1/2 ">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                ref={el => { featureTextRefs.current[i] = el }}
                                className="h-screen flex flex-col justify-center px-12"
                            >
                                <h2 className="text-5xl lg:text-7xl font-bold text-white mb-2 leading-tight">
                                    {feature.title}
                                </h2>
                                <h2 className="text-5xl lg:text-7xl font-bold text-gray-300 mb-6 leading-tight">
                                    {feature.subTitle}
                                </h2>
                                <p className="text-xl text-gray-300 mb-8 max-w-md leading-relaxed">
                                    {feature.text}
                                </p>
                                <div>
                                    <PrimaryButton label="Know More" href={`/${feature.link}`} className="bg-white text-black hover:bg-gray-200 border-transparent shadow-lg" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Image Column (Pinned) */}
                    <div className="w-1/2 h-screen"> {/* Ensure this column is full height for pinning context */}
                        <div ref={imageWrapperRef} className="h-full flex items-center justify-center w-full">
                            <div className="relative w-full max-w-xl aspect-square p-6">
                                {features.map((feature, i) => (
                                    <img
                                        key={i}
                                        src={feature.image}
                                        alt={feature.title}
                                        className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-in-out ${i === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                        onError={(e) => { (e.target as HTMLImageElement).src = "/panel.png"; }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MOBILE VERSION */}
            <section className="md:hidden bg-white py-16 px-6 space-y-16">
                {features.map((feature, i) => (
                    <div
                        key={i}
                        ref={el => { mobileFeatureRefs.current[i] = el }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-full max-w-sm mb-6 bg-gray-50 rounded-3xl p-6 shadow-lg border border-gray-100">
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="w-full h-auto object-contain"
                                onError={(e) => { (e.target as HTMLImageElement).src = "/panel.png"; }}
                            />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <h3 className="text-xl font-bold text-gray-500 mb-3">{feature.subTitle}</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">{feature.text}</p>

                        <PrimaryButton label="Know More" href={`/${feature.link}`} className="py-2 px-6 text-sm" />
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ScrollFeatures;
