"use client";
import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

const NetworkFeaturesBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let animationFrameId: number;
        let particles: Particle[] = [];

        const resize = () => {
            width = container.offsetWidth;
            height = container.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            // Density based on screen size
            const particleCount = Math.floor((width * height) / 15000);

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5, // Slow float speed
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            ctx.fillStyle = 'rgba(6, 182, 212, 0.8)'; // Cyan
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)'; // Cyan low opacity lines

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Draw Connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) { // Connection threshold
                        ctx.beginPath();
                        ctx.lineWidth = 1 - (distance / 150); // Fade out with distance
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-50">
            <div ref={containerRef} className="sticky top-0 w-full h-screen overflow-hidden" style={{ height: '100%' }}>
                {/* Optional: Radial Gradient for depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] z-10 opacity-40"></div>
                <canvas ref={canvasRef} className="block w-full h-full" />
            </div>
        </div>
    );
};

export default NetworkFeaturesBackground;
