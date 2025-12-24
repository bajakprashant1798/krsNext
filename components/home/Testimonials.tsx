"use client";
import React from 'react';

const testimonials = [
    {
        name: "Dr. Arjun Mehta",
        role: "Homeowner",
        text: "Kreck Robotics transformed our home living experience. The voice controls are seamless and the design is truly futuristic.",
        location: "Mumbai, India"
    },
    {
        name: "Sarah Jenkins",
        role: "Interior Designer",
        text: "As a designer, I love how the King Series panels blend with my luxury aesthetics. No wires, no mess, just pure elegance.",
        location: "London, UK"
    },
    {
        name: "Rahul Verma",
        role: "Tech Enthusiast",
        text: "The responsiveness of the app and the glitch-free performance is what impressed me the most. Highly recommended!",
        location: "Bangalore, India"
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-gray-50/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-black text-gray-900 mb-4">
                        What Our Clients Say
                    </h2>
                    <div className="w-16 h-1 bg-[var(--primary-color)] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                            <div className="flex gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span key={star} className="text-yellow-400 text-lg">★</span>
                                ))}
                            </div>
                            <p className="text-gray-600 italic mb-6 leading-relaxed">
                                "{t.text}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[var(--primary-color)]">
                                    {t.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                                    <p className="text-xs text-gray-500">{t.role}, {t.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
