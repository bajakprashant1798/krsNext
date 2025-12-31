
"use client";
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import map to avoid SSR issues with Leaflet
const InteractiveMapPromise = dynamic(
    () => import('./InteractiveMap'),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full min-h-[400px] bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">
                Loading Map...
            </div>
        )
    }
);

const GlobalPresence = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                        Global Presence
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Delivering excellence worldwide. Zoom in to find your nearest authorised dealership.
                    </p>
                </div>

                <div className="w-full h-[500px] max-w-6xl mx-auto rounded-xl shadow-lg border border-gray-100 overflow-hidden relative">
                    <InteractiveMapPromise />
                </div>
            </div>
        </section>
    );
};

export default GlobalPresence;
