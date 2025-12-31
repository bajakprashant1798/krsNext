"use client";
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, EnergyCircle, Lock, IconsMobileApp, IconsSavings, IconsUpdate, IconsWarranty } from '@/components/icons';
import PrimaryButton from '@/components/ui/PrimaryButton';

const HeroFeatures = () => {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // 1. Initial Hero Text Reveal (Staggered)
            gsap.from(".hero-text-reveal", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.2
            });

            // 2. Image Reveal (Scale + Clip)
            gsap.from(".hero-image-reveal", {
                scale: 0.9,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                delay: 0.5
            });

            // 3. Scroll-trigger for Feature Items (As user scrolls down)
            const features = gsap.utils.toArray('.hero-feature-item');
            features.forEach((item: any) => {
                gsap.from(item, {
                    opacity: 0,
                    x: -30,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative pt-32 pb-16 md:pt-32 px-6 md:px-12 overflow-hidden min-h-screen flex items-center z-10 w-full">

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
                {/* LEFT: Content */}
                <div className="order-1">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-3 mb-6 text-sm font-semibold text-[var(--primary-color)] hero-text-reveal">
                        <span className="flex items-center gap-2 px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full border border-[var(--primary-color)]/20">
                            <CheckCircle className="h-4 w-4 shrink-0" />
                            <span>Smart Control</span>
                        </span>

                        <span className="flex items-center gap-2 px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full border border-[var(--primary-color)]/20">
                            <CheckCircle className="h-4 w-4 shrink-0" />
                            <span>Customization</span>
                        </span>

                        <span className="flex items-center gap-2 px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full border border-[var(--primary-color)]/20">
                            <CheckCircle className="h-4 w-4 shrink-0" />
                            <span>Voice Activation</span>
                        </span>
                    </div>

                    <div className="mb-6 hero-text-reveal">
                        <h1 className="font-black font-heading text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5 text-gray-900 drop-shadow-sm">
                            Ultimate Home <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-orange-500">Intelligent</span><br className="hidden sm:block" /> Automation Solution
                        </h1>

                        <p className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed">
                            Experience Effortless Living with Cutting-Edge Technology. Seamlessly integrating convenience,
                            efficiency, and security into every aspect of your home life from Hommatic.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-3">
                        <FeatureItem
                            icon={<EnergyCircle className="w-full h-full" />}
                            title="Energy Efficiency"
                            desc="Reduce energy consumption with intelligent automation"
                        />
                        <FeatureItem
                            icon={<Lock />}
                            title="Security Integration"
                            desc="Enhance security with smart surveillance and monitoring"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-3">
                        <FeatureItem
                            icon={<IconsMobileApp />}
                            title="Glitch-Proof App"
                            desc="Company’s Own Mobile App & Glitch Proof Cloud System"
                        />
                        <FeatureItem
                            icon={<IconsSavings />}
                            title="High Savings, Zero Risk"
                            desc="Provides Savings upto 70% & Guaranteed 30%"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <FeatureItem
                            icon={<IconsUpdate />}
                            title="Free Updates"
                            desc="Regular software updates to enhance your experience"
                        />
                        <FeatureItem
                            icon={<IconsWarranty />}
                            title="9 Yrs. Warranty"
                            desc="Get worry-free performance backed by a warranty"
                        />
                    </div>

                    <div className="hero-text-reveal pt-4">
                        <PrimaryButton label="Get Started" href="/contact" className="shadow-[0_4px_14px_0_rgba(220,34,35,0.39)] hover:shadow-[0_6px_20px_rgba(220,34,35,0.23)] hover:translate-y-[-2px] transition-all" />
                    </div>
                </div>

                {/* RIGHT: Image */}
                <div className="order-2 flex items-center justify-center relative hero-image-reveal">
                    {/* Glow behind image */}
                    <div className="absolute inset-0 bg-[var(--primary-color)] opacity-20 blur-[80px] rounded-full scale-75 animate-pulse"></div>

                    <div className="relative z-10 p-2 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
                        <img
                            src="/herosection.png"
                            alt="Kreck Smart Home panel"
                            className="w-full h-auto object-cover rounded-xl shadow-2xl"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeatureItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="hero-feature-item flex items-start gap-4 p-2 rounded-xl hover:bg-white/50 transition-colors border border-transparent hover:border-gray-100">
        <div className="flex items-center justify-center rounded-full border border-gray-200 p-3 w-14 h-14 sm:w-16 sm:h-16 shrink-0 text-[var(--primary-color)] bg-white shadow-sm">
            <div className="w-8 h-8 sm:w-10 sm:h-10">{icon}</div>
        </div>
        <div>
            <p className="font-bold font-heading text-gray-900 text-base md:text-lg mb-1">{title}</p>
            <p className="text-sm text-gray-600 leading-snug">{desc}</p>
        </div>
    </div>
);

export default HeroFeatures;
