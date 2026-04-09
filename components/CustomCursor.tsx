'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor — Spotlight Glow variant.
 *
 * Two layers:
 *  1. Precision dot  — snaps to exact cursor position, glows cyan (violet on hover)
 *  2. Spotlight glow — 360px soft radial gradient, heavy lerp (0.065) for cinematic lag.
 *     Two child divs cross-fade on hover (cyan-led ↔ violet-led) via CSS opacity only.
 *     Scale lerps in the RAF loop (GPU-safe: transform only).
 *
 * Rules:
 *  - pointer: coarse → hidden (mobile/touch)
 *  - prefers-reduced-motion → hidden (accessibility)
 *  - Only transform + opacity animated — no width/height/top/left in the RAF loop
 */
export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);

  // All RAF state via refs — zero React overhead inside the loop
  const pos        = useRef({ x: -500, y: -500 }); // start off-screen
  const glowPos    = useRef({ x: -500, y: -500 });
  const glowScale  = useRef(1);
  const hoveredRef = useRef(false);
  const raf        = useRef<number>(0);

  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  // Keep ref in sync with state so RAF loop reads current value
  useEffect(() => { hoveredRef.current = hovered; }, [hovered]);

  useEffect(() => {
    // Skip on touch/stylus devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    // Skip for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Hide the system cursor globally
    const style = document.createElement('style');
    style.id    = 'custom-cursor-hide';
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    // ── Event handlers ──────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(true);
      }
    };

    const onOut = () => setHovered(false);

    // Reset hover when cursor leaves the browser window
    const onDocLeave = () => setHovered(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);
    document.addEventListener('mouseleave', onDocLeave);

    // ── RAF loop — only transform + opacity ─────────────────────────────────
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const HALF = 180; // half of 360px glow size

    const tick = () => {
      // Dot: snap to exact position (offset by 2px — half of 4px dot)
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x - 2}px, ${pos.current.y - 2}px)`;
      }

      // Glow: heavy cinematic lerp on position + smooth scale lerp
      if (glowRef.current) {
        glowPos.current.x = lerp(glowPos.current.x, pos.current.x, 0.065);
        glowPos.current.y = lerp(glowPos.current.y, pos.current.y, 0.065);

        const targetScale = hoveredRef.current ? 1.18 : 1;
        glowScale.current = lerp(glowScale.current, targetScale, 0.08);

        glowRef.current.style.transform =
          `translate(${glowPos.current.x - HALF}px, ${glowPos.current.y - HALF}px) scale(${glowScale.current})`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    // ── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mouseleave', onDocLeave);
      cancelAnimationFrame(raf.current);
      document.getElementById('custom-cursor-hide')?.remove();
    };
  }, [visible]);

  // SSR + touch guard: don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* ── Precision dot — snaps to cursor ───────────────────────────────── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{
          width:        '4px',
          height:       '4px',
          borderRadius: '50%',
          background:   hovered ? '#a78bfa' : '#22d3ee',
          boxShadow:    hovered
            ? '0 0 10px 3px rgba(167,139,250,0.75)'
            : '0 0 10px 3px rgba(34,211,238,0.65)',
          opacity:    visible ? 1 : 0,
          transition: [
            'background 500ms cubic-bezier(0.16,1,0.3,1)',
            'box-shadow 500ms cubic-bezier(0.16,1,0.3,1)',
            'opacity 500ms',
          ].join(', '),
        }}
      />

      {/* ── Spotlight glow — 360px, cinematic lag ─────────────────────────── */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] will-change-transform"
        style={{
          width:        '360px',
          height:       '360px',
          borderRadius: '50%',
          opacity:      visible ? 1 : 0,
          transition:   'opacity 700ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Default state: cyan-led radial */}
        <div
          style={{
            position:     'absolute',
            inset:        0,
            borderRadius: '50%',
            background:   'radial-gradient(circle, rgba(34,211,238,0.17) 0%, rgba(139,92,246,0.07) 50%, transparent 70%)',
            opacity:      hovered ? 0 : 1,
            transition:   'opacity 600ms cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        {/* Hover state: violet-led radial */}
        <div
          style={{
            position:     'absolute',
            inset:        0,
            borderRadius: '50%',
            background:   'radial-gradient(circle, rgba(167,139,250,0.22) 0%, rgba(34,211,238,0.08) 45%, transparent 70%)',
            opacity:      hovered ? 1 : 0,
            transition:   'opacity 600ms cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </div>
    </>
  );
}
