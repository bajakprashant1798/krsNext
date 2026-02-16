import React from 'react';
import type { Metadata } from 'next';
import { CheckCircle, Heart, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About Us | Kreck Robotics',
    description: 'Learn about Kreck Robotics — our mission, values, and how we build smart home automation solutions.',
};

const timeline = [
    { year: '2018', title: 'Company Founded', body: 'Started with a small team building smart switches and basic home automation flows.' },
    { year: '2019', title: 'First Pilot', body: 'Completed our first pilot installs in apartments and small offices.' },
    { year: '2021', title: 'Retail Launch', body: 'Launched product line for installers and consumers.' },
    { year: '2023', title: 'Scaling Up', body: 'Expanded to multiple cities and launched cloud integrations.' },
];

const team = [
    { name: 'Amit Kumar', role: 'Founder & CEO', img: '/team/amit.jpg', bio: 'Product & business lead. 12+ years in IoT & home automation.' },
    { name: 'Neha Sharma', role: 'Head of Design', img: '/team/neha.jpg', bio: 'Design lead — UX, visual systems and brand.' },
    { name: 'Ravi Patel', role: 'Engineering Lead', img: '/team/ravi.jpg', bio: 'Firmware & cloud engineer focused on reliability.' },
    { name: 'Priya Joshi', role: 'Customer Success', img: '/team/priya.jpg', bio: 'On-site install & support lead.' },
];

const faqs = [
    { q: 'Do your systems work during power cuts?', a: 'Yes — core control works locally for basic scenes. Cloud features require internet.' },
    { q: 'Which voice assistants do you support?', a: 'Google Assistant and Amazon Alexa. Apple HomeKit integration available for certain SKUs.' },
    { q: 'What is the warranty period?', a: 'Standard 2-year onsite warranty. Extended options available.' },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white text-gray-800">
            {/* HERO */}
            <section className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-sm text-[var(--primary-color)] font-bold tracking-widest mb-3 uppercase">About Us</p>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight mb-6 text-gray-900 leading-tight">
                            We make homes <span className="text-[var(--primary-color)]">smarter</span> — simply, reliably.
                        </h1>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            We design and deliver elegant smart lighting, touch panels and automation systems that integrate seamlessly with everyday life. From pilot to full installation — we handle design, hardware, and long-term support.
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <Link href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3.5 bg-[var(--primary-color)] text-white font-semibold rounded-lg shadow-lg shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/30 transition-all transform hover:-translate-y-0.5">
                                Book a free site visit
                            </Link>
                            <a href="https://wa.me/917518757518" target="_blank" rel="noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3.5 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-tr from-red-50 to-white rounded-3xl p-2 shadow-2xl shadow-gray-200/50 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] relative">
                                {/* Placeholder for About Image if available, otherwise generic pattern */}
                                <img src="/herosection.png" alt="Smart home mockup" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MISSION & VALUES */}
            <section className="border-t border-gray-100 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold font-heading mb-6 text-gray-900">Our mission</h2>
                        <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                            To make safe, dependable and beautiful home automation accessible to everyone. We focus on reliability, easy install, and long-term maintainability — so your home keeps getting smarter without headaches.
                        </p>

                        <h3 className="text-xl font-bold font-heading mb-6 text-gray-900">How we work</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { id: 1, title: 'Consult', desc: 'On-site survey and requirement mapping.' },
                                { id: 2, title: 'Design', desc: 'Custom wiring & product selection for the space.' },
                                { id: 3, title: 'Install', desc: 'Certified technicians & clean installation.' },
                                { id: 4, title: 'Support', desc: 'On-site warranty & remote assistance.' }
                            ].map((step) => (
                                <li key={step.id} className="flex gap-4 items-start p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="h-10 w-10 rounded-full bg-red-50 text-[var(--primary-color)] flex items-center justify-center font-bold text-lg shrink-0">
                                        {step.id}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 mb-1">{step.title}</p>
                                        <p className="text-sm text-gray-600">{step.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50 lg:sticky lg:top-32 h-fit">
                        <h4 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
                            <Shield className="text-[var(--primary-color)] w-5 h-5" /> Core values
                        </h4>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-start gap-3">
                                <Shield className="w-5 h-5 text-[var(--primary-color)] mt-0.5 shrink-0" />
                                <span><strong>Reliability</strong> — hardware and software you can trust.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Zap className="w-5 h-5 text-[var(--primary-color)] mt-0.5 shrink-0" />
                                <span><strong>Simplicity</strong> — minimal learning curve for users & installers.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[var(--primary-color)] mt-0.5 shrink-0" />
                                <span><strong>Privacy</strong> — local-first operation where possible.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Heart className="w-5 h-5 text-[var(--primary-color)] mt-0.5 shrink-0" />
                                <span><strong>Design</strong> — beautiful, tactile hardware & UI.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* TEAM (Optional - Commented out if no images, but keeping structure as per request) */}
            <section className="bg-white py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold font-heading mb-10 text-center">Meet the team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((m, idx) => (
                            <article key={idx} className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all border border-transparent hover:border-gray-100 group">
                                <div className="w-28 h-28 rounded-full bg-gray-200 mx-auto mb-5 overflow-hidden ring-4 ring-white group-hover:ring-[var(--primary-color)]/20 transition-all">
                                    {/* Using generic placeholder if image fails or not present */}
                                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold text-2xl">
                                        {m.name.charAt(0)}
                                    </div>
                                    {/* <img src={m.img} alt={m.name} className="w-full h-full object-cover" /> */}
                                </div>
                                <h4 className="font-bold text-lg text-gray-900">{m.name}</h4>
                                <p className="text-sm text-[var(--primary-color)] font-medium mb-3">{m.role}</p>
                                <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                <div>
                    <h3 className="text-3xl font-bold font-heading mb-8">Frequently asked questions</h3>
                    <div className="space-y-4">
                        {faqs.map((f, i) => (
                            <details key={i} className="group p-5 border border-gray-200 rounded-xl bg-white open:bg-gray-50 open:shadow-sm transition-all">
                                <summary className="font-bold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                                    {f.q}
                                    <span className="text-[var(--primary-color)] transform group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-3 text-gray-600 leading-relaxed text-sm lg:text-base border-t border-gray-100 pt-3">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>

                <div className="bg-red-50/50 rounded-3xl p-8 lg:p-10 flex flex-col justify-center border border-red-100">
                    <div>
                        <h3 className="text-2xl font-bold font-heading mb-4 text-gray-900">Ready to upgrade your home?</h3>
                        <p className="text-gray-600 mb-8 text-lg">Book a site visit and get a custom plan with transparent pricing.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/contact" className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                            Book site visit
                        </Link>
                        <Link href="mailto:info@kreckrobotics.com" className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                            Email us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
