"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { products, Product } from '@/data/products';
import { ArrowLeft, CheckCircle2, ChevronRight, Mail, ZoomIn } from 'lucide-react';

export default function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
    // Next.js 15: params is a Promise, need to unwrap it
    // But since we are likely in a client component, we use React.use() or just useEffect/await. 
    // Actually, for client components, we can just use useParams() hook which is easier.
    const params = useParams();
    const slug = params?.slug as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    // Gallery State
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Zoom State
    const [zoomStyle, setZoomStyle] = useState({ transform: 'scale(1)', transformOrigin: '50% 50%' });
    const [isZoomed, setIsZoomed] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (slug) {
            const found = products.find(p => p.slug === slug);
            if (found) {
                setProduct(found);
            } else {
                notFound();
            }
            setLoading(false);
        }
    }, [slug]);


    // Zoom Handlers
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;

        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomStyle({
            transform: 'scale(2)', // 2x Zoom level
            transformOrigin: `${x}% ${y}%`
        });
        setIsZoomed(true);
    };

    const handleMouseLeave = () => {
        setZoomStyle({
            transform: 'scale(1)',
            transformOrigin: '50% 50%'
        });
        setIsZoomed(false);
    };


    if (loading) return <div className="min-h-screen pt-32 flex justify-center"><div className="w-8 h-8 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div></div>;
    if (!product) return null; // handled by notFound()

    const currentImage = product.images?.[activeImageIndex] || product.image;

    // Suggest related products (random filter for demo, excluding current)
    const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 2);

    return (
        <section className="min-h-screen py-24 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Breadcrumb */}
                <nav className="flex items-center text-sm text-gray-500 mb-8 md:mb-12">
                    <Link href="/products" className="hover:text-[var(--primary-color)] transition-colors">Products</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="font-semibold text-gray-900 truncate">{product.name}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* LEFT: GALLERY */}
                    <div className="space-y-6">
                        {/* Main Image Stage */}
                        <div
                            className="relative w-full aspect-square md:aspect-[4/3] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 group cursor-crosshair"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                ref={imageRef}
                                src={currentImage}
                                alt={product.name}
                                className="w-full h-full object-contain p-8 transition-transform duration-200 ease-out"
                                style={zoomStyle}
                                onError={(e) => { (e.target as HTMLImageElement).src = "/panel.png"; }}
                            />

                            {/* Zoom Hint Overlay (Hide when zoomed) */}
                            <div className={`absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border border-gray-200 text-xs font-semibold text-gray-600 flex items-center gap-2 pointer-events-none transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
                                <ZoomIn className="w-3 h-3" /> Hover to Zoom
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`relative w-20 h-20 md:w-24 md:h-24 rounded-xl border-2 flex-shrink-0 overflow-hidden bg-gray-50 transition-all ${activeImageIndex === idx ? 'border-[var(--primary-color)] ring-2 ring-[var(--primary-color)]/20' : 'border-gray-100 hover:border-gray-300'}`}
                                    >
                                        <img src={img} alt="Thumbnail" className="w-full h-full object-contain p-2" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: INFO */}
                    <div className="flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)] text-xs font-bold uppercase tracking-wider">
                                {product.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black font-heading text-gray-900 mb-6 leading-tight">
                            {product.name}
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Features List */}
                        {product.features && (
                            <div className="mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <h3 className="font-bold font-heading text-gray-900 mb-4">Key Features</h3>
                                <ul className="space-y-3">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-gray-700 text-sm font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-4 mt-auto">
                            <Link
                                href="/contact"
                                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-[var(--primary-color)] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-black hover:shadow-xl transition-all hover:-translate-y-1 group"
                            >
                                <Mail className="w-5 h-5" />
                                <span>Enquire Now</span>
                            </Link>

                            <Link
                                href="/products"
                                className="flex-none flex items-center justify-center gap-2 bg-white text-gray-900 font-bold py-4 px-8 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RELATED PRODUCTS */}
                <div className="mt-32 pt-16 border-t border-gray-100">
                    <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8">Other Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {relatedProducts.map(p => (
                            <Link
                                key={p.id}
                                href={`/products/${p.slug}`}
                                className="flex items-center gap-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[var(--primary-color)] hover:bg-white hover:shadow-lg transition-all group"
                            >
                                <div className="w-24 h-24 bg-white rounded-xl p-2 shrink-0 border border-gray-100">
                                    <img src={p.image} alt={p.name} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = "/panel.png"; }} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-[var(--primary-color)] transition-colors">{p.name}</h4>
                                    <p className="text-sm text-gray-500 line-clamp-1">{p.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
