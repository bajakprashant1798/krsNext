"use client";
import React, { useEffect, useRef } from 'react';

interface Point {
    x: number;
    y: number;
}

interface Hexagon {
    x: number;
    y: number;
    size: number;
    active: number; // 0 to 1 for opacity
    targetActive: number;
}

interface Circuit {
    path: Point[];
    progress: number; // 0 to length of path
    speed: number;
    color: string;
}

const HexTechBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef<Point>({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let animationFrameId: number;
        let scrollY = window.scrollY;

        // Configuration
        const hexSize = 40; // Slightly larger for visibility
        const hexHeight = hexSize * Math.sqrt(3);
        const hexWidth = hexSize * 2;
        const xSpacing = hexWidth * 0.75;
        const ySpacing = hexHeight;

        // Colors
        const hexStrokeColor = 'rgba(37, 99, 235, 0.15)'; // Blue #2563eb with low opacity
        const activeHexFill = 'rgba(37, 99, 235, 0.1)'; // Subtle blue fill
        const activeHexStroke = 'rgba(37, 99, 235, 0.4)'; // Brighter blue stroke

        let hexagons: Hexagon[] = [];
        let circuits: Circuit[] = [];

        // Resize Handler
        const resize = () => {
            width = container.offsetWidth;
            height = container.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            initGrid();
        };

        // Initialize Hex Grid
        const initGrid = () => {
            hexagons = [];
            const rows = Math.ceil(height / ySpacing) + 2;
            const cols = Math.ceil(width / xSpacing) + 2;

            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    const xOffset = (c % 2 === 1) ? ySpacing / 2 : 0;
                    hexagons.push({
                        x: c * xSpacing,
                        y: r * ySpacing + xOffset,
                        size: hexSize,
                        active: 0,
                        targetActive: 0
                    });
                }
            }
        };

        // // Initialize Circuits (Random paths along grid)
        // const spawnCircuit = () => {
        //     if (hexagons.length === 0) return;
        //     // Pick random start hexagon
        //     const startHex = hexagons[Math.floor(Math.random() * hexagons.length)];
        //     const path: Point[] = [{ x: startHex.x, y: startHex.y }];
        //     let currentX = startHex.x;
        //     let currentY = startHex.y;

        //     // Generate path of 5-10 steps
        //     const length = 5 + Math.random() * 8;
        //     for (let i = 0; i < length; i++) {
        //         // Simple random walk (this is approximate)
        //         const angle = (Math.floor(Math.random() * 6) * Math.PI) / 3;
        //         currentX += Math.cos(angle) * hexSize * 1.5;
        //         currentY += Math.sin(angle) * hexSize * 1.5;
        //         path.push({ x: currentX, y: currentY });
        //     }

        //     circuits.push({
        //         path,
        //         progress: 0,
        //         speed: 4 + Math.random() * 3,
        //         color: 'rgba(37, 99, 235, 0.8)' // Strong Blue
        //     });

        //     // Cleanup old circuits
        //     if (circuits.length > 8) circuits.shift();
        // };

        // const circuitInterval = setInterval(spawnCircuit, 1000); // More frequent circuits

        // Draw Helper: Single Hexagon
        const drawHex = (x: number, y: number, size: number, active: number) => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const px = x + size * Math.cos(angle);
                const py = y + size * Math.sin(angle);
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();

            // Base Stroke
            if (active > 0.05) {
                ctx.strokeStyle = activeHexStroke;
                ctx.lineWidth = 1.5;
                ctx.fillStyle = `rgba(37, 99, 235, ${active * 0.15})`; // Glow fill
                ctx.fill();
            } else {
                ctx.strokeStyle = hexStrokeColor;
                ctx.lineWidth = 1;
            }
            ctx.stroke();
        };

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Mouse Interaction Logic
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y + (scrollY - window.scrollY) * 0.2; // Parallax correction

            // Apply slight scroll parallax to the whole grid container? 
            // Better to just shift Y coords slightly for simple parallax
            const parallaxY = -(window.scrollY * 0.1);

            ctx.save();
            ctx.translate(0, parallaxY % (hexHeight * 2)); // Loop pattern or just shift

            // Update & Draw Hexagons
            hexagons.forEach(hex => {
                // Adjust hex Y for mouse distance check to account for parallax
                const visualY = hex.y + (parallaxY % (hexHeight * 2));
                // Actually, the translate applies to drawing, so hex.y is effectively shifted. 
                // To check distance correctly, we need to map mouse to the shifted space.
                // Simplified: Just use screen coords for mouse

                const dist = Math.hypot(hex.x - mx, (hex.y + parallaxY) - my); // Approx

                // Activate on Hover
                if (dist < 200) {
                    hex.targetActive = 1 - (dist / 200);
                } else {
                    hex.targetActive = 0;
                }

                // Smooth Transition
                hex.active += (hex.targetActive - hex.active) * 0.1;

                drawHex(hex.x, hex.y, hex.size, hex.active);
            });

            // Update & Draw Circuits
            circuits.forEach(c => {
                c.progress += c.speed;
                if (c.path.length < 2) return;

                ctx.strokeStyle = c.color;
                ctx.lineWidth = 2.5;
                ctx.lineCap = 'round';

                // Animate dash offset for "flow" effect
                ctx.setLineDash([60, 200]); // Longer dashes
                ctx.lineDashOffset = -c.progress;

                ctx.beginPath();
                ctx.moveTo(c.path[0].x, c.path[0].y);
                for (let i = 1; i < c.path.length; i++) {
                    ctx.lineTo(c.path[i].x, c.path[i].y);
                }
                ctx.stroke();
                ctx.setLineDash([]);
            });

            ctx.restore();

            animationFrameId = requestAnimationFrame(animate);
        };

        // Event Listeners
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleScroll = () => {
            // We track scrollY in the specific variable or ref if needed
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            // clearInterval(circuitInterval);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gray-50/50">
            {/* Gradient Overlay for subtle vignette/focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.9)_90%)] z-10"></div>
            <canvas ref={canvasRef} className="block w-full h-full opacity-80" />
        </div>
    );
};

export default HexTechBackground;
