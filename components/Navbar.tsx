"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);

        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
            <div
                className={`flex items-center justify-between mx-4 sm:mx-8 px-6 py-3 rounded-2xl shadow-md transition-all duration-300 ${'bg-[#f8f4f4] dark:bg-[#1a1a1a] dark:text-white'
                    }`}
            >
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        <img
                            src="/KRACK-ROBOTICS-LOGO.png"
                            alt="Kreck Robotics"
                            className="h-8 sm:h-10 w-auto select-none mr-4"
                            draggable="false"
                        />
                    </Link>
                </div>

                {/* Desktop Nav - Dark Pill */}
                <nav className="hidden md:flex items-center space-x-1 bg-[#181818] rounded-full px-2 py-1.5 shadow-sm">
                    {['Home', 'Products', 'Smart Home', 'About'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className="rounded-full px-5 py-2 text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/contact" className="text-secondary dark:text-gray-300 hover:text-[var(--primary-color)] transition-all font-semibold text-lg">
                        Contact Us
                    </Link>
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                        {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <button onClick={toggleTheme} className="p-2">
                        {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-white focus:outline-none">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden absolute left-4 right-4 top-full mt-2 bg-[#f8f4f4] dark:bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hidden transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                    }`}
            >
                <nav className="flex flex-col p-6 space-y-4 text-center">
                    {['Home', 'Products', 'Smart Home', 'About', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                            onClick={() => setIsOpen(false)}
                            className="text-xl font-bold text-secondary dark:text-white hover:text-[var(--primary-color)] transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
