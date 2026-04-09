'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll — Lenis lerp-based inertia scroll provider.
 *
 * Wraps the entire page in Lenis so all scrolling (wheel, touch, keyboard)
 * feels physically weighted and buttery, matching the Linear / Vercel tier.
 *
 * Config rationale:
 *   lerp: 0.08  — low value = more "mass" / heavier feel (0.1 is default)
 *   duration: 1.4 — slightly longer settle for a premium sensation
 *   easing: custom expo-out curve — fast start, slow settle
 *   smoothWheel: true — applies lerp to mouse wheel (desktop)
 *   touchMultiplier: 1.5 — slightly amplified touch for responsiveness
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.08,
            duration: 1.4,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
            smoothWheel: true,
            touchMultiplier: 1.5,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Sync Lenis with Framer Motion's requestAnimationFrame loop
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
