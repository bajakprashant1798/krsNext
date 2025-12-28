"use client";
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { dealerships } from '@/data/dealerships';

// --- Fix Leaflet Default Icon Issue in Next.js ---
// --- Fix Leaflet Default Icon Issue in Next.js ---
// We need to delete the _getIconUrl function from the prototype and set options manually
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom Blue Icon (Optional - reusing default for now to ensure stability first, or override if needed)
// Can be customized later.

// Component to handle map resizing
const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
        map.invalidateSize();
    }, [map]);
    return null;
};

const InteractiveMap = () => {
    // Center roughly on Middle East/India to show most pins
    const center: [number, number] = [25.0, 55.0];
    const zoom = 2; // Show world

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={false} // Disable auto scroll zoom to prevent getting stuck while scrolling page
            className="w-full h-full min-h-[400px] z-0"
            style={{ borderRadius: '0.75rem', background: '#F3F4F6' }}
        >
            <MapUpdater />

            {/* CartoDB Positron (Light Gray - Tech theme) */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            {dealerships.map((dealer) => (
                <Marker key={dealer.id} position={dealer.position}>
                    <Popup className="custom-popup">
                        <div className="p-1 min-w-[200px]">
                            <h3 className="font-bold text-blue-600 text-base">{dealer.name}</h3>
                            <p className="text-sm font-semibold text-gray-800 mt-1">{dealer.city}, {dealer.country}</p>
                            <div className="text-xs text-gray-600 mt-2 border-t pt-2">
                                <p>{dealer.address}</p>
                                {dealer.contact && (
                                    <p className="mt-1 flex items-center gap-2">
                                        📞 {dealer.contact}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default InteractiveMap;
