"use client";
import React from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { ArrowUpRight } from 'lucide-react';

export default function ProductsPage() {
    return (
        <section className="min-h-screen py-24 md:py-32 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 md:mb-24">
                    <p className="text-[var(--primary-color)] font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
                        Our Solutions
                    </p>
                    <h1 className="text-4xl md:text-6xl font-black font-heading text-gray-900 mb-6 drop-shadow-sm">
                        Smart <span className="text-[var(--primary-color)]">Products</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Discover our comprehensive range of home automation devices designed to elevate your living experience with style and intelligence.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[var(--primary-color)]/10 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                        >
                            {/* Image Container with subtle gradient bg */}
                            <div className="relative h-72 p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
                                <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white text-gray-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 shadow-sm">
                                    <ArrowUpRight className="w-5 h-5 text-[var(--primary-color)]" />
                                </div>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 drop-shadow-lg"
                                    onError={(e) => { (e.target as HTMLImageElement).src = "/panel.png"; }}
                                />
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow relative">
                                <div className="mb-auto">
                                    <p className="text-xs font-bold text-[var(--primary-color)] uppercase tracking-wider mb-2">
                                        {product.category}
                                    </p>
                                    <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3 group-hover:text-[var(--primary-color)] transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center text-sm font-bold text-gray-900 group-hover:text-[var(--primary-color)] transition-colors">
                                    Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
