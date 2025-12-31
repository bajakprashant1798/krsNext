"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [sending, setSending] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitted(false);

        // Basic validation
        if (!form.firstName || !form.email || !form.message) {
            setError('Please fill in first name, email and a short message.');
            return;
        }

        setSending(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 900));
            setSubmitted(true);
            setForm({ firstName: '', lastName: '', email: '', message: '' });
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        } finally {
            setSending(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section className="bg-gray-50 min-h-screen py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* LEFT: Heading + Contact Info */}
                    <div className="pt-2">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading leading-tight text-gray-900 mb-6 drop-shadow-sm">
                            Get in — <br className="hidden md:block" />
                            <span className="text-[var(--primary-color)]">touch with us</span>
                        </h1>

                        <p className="text-base sm:text-lg text-gray-600 max-w-xl mb-10 leading-relaxed">
                            We’re here to help! Whether you have a question about our services, or want to provide feedback,
                            our team is ready to assist you.
                        </p>

                        <div className="text-gray-700 space-y-8 mb-10">
                            <div className="flex flex-col border-l-2 border-[var(--primary-color)] pl-6">
                                <span className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-1">Email</span>
                                <Link
                                    href="mailto:info@kreckrobotics.com"
                                    className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-[var(--primary-color)] transition-colors"
                                >
                                    info@kreckrobotics.com
                                </Link>
                            </div>

                            <div className="flex flex-col border-l-2 border-[var(--primary-color)] pl-6">
                                <span className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-1">Phone</span>
                                <Link
                                    href="tel:+917518757518"
                                    className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-[var(--primary-color)] transition-colors"
                                >
                                    +91 75187 57518
                                </Link>
                                <span className="text-sm text-gray-500 mt-2 font-medium">Available Monday to Friday, 9 AM - 6 PM GMT</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Form Card */}
                    <div className="order-first md:order-last">
                        <form
                            onSubmit={handleSubmit}
                            className={`bg-white rounded-[28px] p-8 md:p-10 shadow-xl shadow-gray-200/50 relative border border-gray-100 transition-all duration-300 ${submitted ? 'ring-2 ring-green-100' : ''}`}
                            noValidate
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">First Name</label>
                                    <input
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                        className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all"
                                        placeholder="John"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">Last Name</label>
                                    <input
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        type="text"
                                        className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">Email</label>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    type="email"
                                    required
                                    className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="mt-6">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">How can we help you?</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows={5}
                                    required
                                    className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all resize-none min-h-[120px]"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>

                            <div className="mt-8 flex items-center justify-end">
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="group inline-flex items-center gap-3 rounded-full bg-black text-white pl-6 pr-2 py-2 shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span className="font-semibold text-sm tracking-wide">{sending ? 'Sending...' : 'Send Message'}</span>
                                    <span className="w-10 h-10 bg-white text-black rounded-full grid place-items-center group-hover:bg-[var(--primary-color)] group-hover:text-white transition-colors">
                                        {sending ? (
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <ArrowRight className="w-5 h-5" />
                                        )}
                                    </span>
                                </button>
                            </div>

                            {/* Feedback Messages */}
                            {submitted && (
                                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-[28px] flex flex-col items-center justify-center p-8 z-10 animate-in fade-in zoom-in duration-300">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600 text-center mb-6">Thanks for reaching out. We'll get back to you shortly.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-sm font-semibold text-gray-900 underline hover:text-[var(--primary-color)]"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            )}

                            {error && (
                                <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg flex items-center gap-2 animate-in slide-in-from-top-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
