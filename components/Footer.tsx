import Link from 'next/link';
import React from 'react';
import { Instagram, Facebook, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative z-50 text-gray-700 bg-white py-3 px-3 md:px-5 font-sans shadow-md">
            <div className="bg-[#f8f4f4] px-3 py-5 md:px-14 md:py-10 rounded-2xl shadow-sm border border-gray-100">
                <div className="md:grid md:grid-cols-6 md:gap-4 md:pb-32 mb-5 border-b border-gray-300">
                    {/* Column 1: Brand & Social (Spans 3) */}
                    <div className="col-span-3 mb-10">
                        <div className="flex justify-center md:justify-start mb-4">
                            {/* Ensure image path matches public folder */}
                            <img
                                src="/KRACK-ROBOTICS-LOGO.png"
                                alt="KRACK ROBOTICS"
                                className="h-28 w-auto mr-4 select-none object-contain"
                            />
                        </div>
                        <p className="py-10 md:max-w-xl text-center md:text-left text-gray-500 leading-relaxed">
                            Krack Robotics is a leading provider of innovative robotic solutions, dedicated to enhancing efficiency and productivity across various industries. Our cutting-edge technology and expert team are committed to delivering exceptional results for our clients.
                        </p>
                        <ul className="flex justify-center md:justify-start space-x-4 mt-2">
                            <li className="bg-[#565656] rounded-full p-2 hover:bg-[#dc2223] transition-colors shadow-md mb-2 group">
                                <Link href="#" className="flex items-center justify-center cursor-pointer">
                                    <Instagram className="text-white w-6 h-6" />
                                </Link>
                            </li>
                            <li className="bg-[#565656] rounded-full p-2 hover:bg-[#dc2223] transition-colors shadow-md mb-2 group">
                                <Link href="#" className="flex items-center justify-center cursor-pointer">
                                    <Facebook className="text-white w-6 h-6" />
                                </Link>
                            </li>
                            <li className="bg-[#565656] rounded-full p-2 hover:bg-[#dc2223] transition-colors shadow-md mb-2 group">
                                <Link href="#" className="flex items-center justify-center cursor-pointer">
                                    <Youtube className="text-white w-6 h-6" />
                                </Link>
                            </li>
                            <li className="bg-[#565656] rounded-full p-2 hover:bg-[#dc2223] transition-colors shadow-md mb-2 group">
                                <Link href="#" className="flex items-center justify-center cursor-pointer">
                                    <Linkedin className="text-white w-6 h-6" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="mb-10 flex flex-col items-center text-center md:text-left md:block">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="hover:text-[#dc2223] transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-[#dc2223] transition-colors">Products</Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-[#dc2223] transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#dc2223] transition-colors">Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Products (Duplicate as per request, but can be updated) */}
                    <div className="mb-10 flex flex-col items-center text-center md:text-left md:block">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Products</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="hover:text-[#dc2223] transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-[#dc2223] transition-colors">Products</Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-[#dc2223] transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#dc2223] transition-colors">Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Us */}
                    <div className="mb-10 flex flex-col items-center text-center md:text-left md:block">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="mb-2">
                                <div className="flex items-center justify-center md:justify-start">
                                    <span className="mr-3 bg-[#565656] shadow-md rounded-full p-2 flex items-center justify-center">
                                        <Mail className="text-white w-5 h-5" />
                                    </span>
                                    <Link href="mailto:info@kreckrobotics.com" className="text-gray-600 hover:text-[#dc2223] transition-colors">
                                        info@kreckrobotics.com
                                    </Link>
                                </div>
                            </li>
                            <li className="mb-2">
                                <div className="flex items-center justify-center md:justify-start">
                                    <span className="mr-3 bg-[#565656] shadow-md rounded-full p-2 flex items-center justify-center">
                                        <Phone className="text-white w-5 h-5" />
                                    </span>
                                    <Link href="tel:+917518757518" className="text-gray-600 hover:text-[#dc2223] transition-colors">
                                        +91 75187 57518
                                    </Link>
                                </div>
                            </li>
                            <li className="mb-2">
                                <div className="flex items-start justify-center md:justify-start">
                                    <span className="mr-3 bg-[#565656] shadow-md rounded-full p-2 flex items-center justify-center mt-1">
                                        <MapPin className="text-white w-5 h-5" />
                                    </span>
                                    <p className="text-gray-600 text-sm leading-relaxed max-w-[200px]">
                                        410 RK World Tower,<br />
                                        Near Shital Park Chowk,<br />
                                        150ft Ring Road, Rajkot<br />
                                        360006
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="md:grid md:grid-cols-2 md:gap-4 text-sm pt-5 text-gray-500">
                    <div>
                        <p className="text-center md:text-left">
                            &copy; 2023 – {new Date().getFullYear()} KRECK ROBOTICS. ALL RIGHTS RESERVED.
                        </p>
                    </div>
                    <div>
                        <ul className="flex justify-center md:justify-end space-x-6 mt-4 md:mt-0">
                            <li className="hover:text-[#dc2223] transition-colors">
                                <Link href="/privacy-policy" className="underline underline-offset-1">Privacy Policy</Link>
                            </li>
                            <li className="hover:text-[#dc2223] transition-colors">
                                <Link href="/terms-of-service" className="underline underline-offset-1">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
