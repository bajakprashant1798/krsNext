"use client";
import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

const FloatingActions = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const whatsappNumber = "+917518757518"; // Replace with actual number
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi! I would like to know more about Kreck Robotics products.`;

    return (
        <div className="fixed bottom-8 right-8 z-[60] flex flex-col-reverse items-end">

            {/* Scroll to Top Button - Conditional Visibility with proper layout shift */}
            <div className={`transition-all duration-300 overflow-hidden flex flex-col items-end ${isVisible ? 'h-14 mt-4 opacity-100' : 'h-0 mt-0 opacity-0 pointer-events-none'}`}>
                <button
                    onClick={scrollToTop}
                    className="w-14 h-14 bg-[var(--primary-color)] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:shadow-2xl transition-transform duration-300 group"
                    aria-label="Scroll to Top"
                >
                    <ArrowUp size={28} className="group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>

            {/* WhatsApp Button - Always Visible (Visually Top, Markup Second due to flex-col-reverse) */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 group relative"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle size={28} fill="white" className="group-hover:rotate-12 transition-transform" />
                <span className="absolute right-full mr-4 px-3 py-1 bg-white text-[#25D366] text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm whitespace-nowrap pointer-events-none">
                    Chat with us
                </span>
            </a>
        </div>
    );
};

export default FloatingActions;
