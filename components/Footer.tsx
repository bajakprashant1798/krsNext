import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-24 pb-12 px-6 border-t border-gray-900">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="inline-block text-2xl font-black font-heading tracking-widest text-white mb-6">
                        KRECK
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Redefining home automation with state-of-the-art technology, seamless integration, and premium design.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Placeholders */}
                        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors cursor-pointer">IG</div>
                        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors cursor-pointer">TW</div>
                        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors cursor-pointer">LN</div>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-heading font-bold mb-6 text-gray-200">Company</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link href="/about" className="hover:text-[var(--primary-color)] transition-colors">About Us</Link></li>
                        <li><Link href="/careers" className="hover:text-[var(--primary-color)] transition-colors">Careers</Link></li>
                        <li><Link href="/contact" className="hover:text-[var(--primary-color)] transition-colors">Contact</Link></li>
                        <li><Link href="/partners" className="hover:text-[var(--primary-color)] transition-colors">Partners</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-heading font-bold mb-6 text-gray-200">Products</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link href="/king-series" className="hover:text-[var(--primary-color)] transition-colors">King Series</Link></li>
                        <li><Link href="/royal-series" className="hover:text-[var(--primary-color)] transition-colors">Royal Series</Link></li>
                        <li><Link href="/smart-series" className="hover:text-[var(--primary-color)] transition-colors">Smart Series</Link></li>
                        <li><Link href="/sensors" className="hover:text-[var(--primary-color)] transition-colors">Sensors</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-heading font-bold mb-6 text-gray-200">Stay Updated</h4>
                    <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for latest updates.</p>
                    <div className="flex">
                        <input type="email" placeholder="Enter your email" className="bg-gray-900 border-none outline-none px-4 py-3 rounded-l-lg text-sm w-full focus:ring-1 focus:ring-[var(--primary-color)]" />
                        <button className="bg-[var(--primary-color)] px-4 py-3 rounded-r-lg font-bold hover:bg-red-700 transition-colors">GO</button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                <p>&copy; {new Date().getFullYear()} Kreck Robotics. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-gray-400">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
