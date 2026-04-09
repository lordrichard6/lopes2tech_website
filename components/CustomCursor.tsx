'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor — minimal dot + ring cursor for desktop.
 * - Dot: snaps instantly to cursor position
 * - Ring: lerps with slight lag for haptic weight
 * - Expands on hover over interactive elements
 * - Hidden on mobile (no pointer device)
 * - Hides the system cursor via global CSS injected once
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef<number>(0);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only run on pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Hide system cursor
    const style = document.createElement('style');
    style.id = 'custom-cursor-hide';
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(true);
      }
    };
    const onLeave = () => setHovered(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    // RAF loop: dot snaps, ring lerps
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
        ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf.current);
      document.getElementById('custom-cursor-hide')?.remove();
    };
  }, [visible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Dot — snaps */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          width: hovered ? '6px' : '4px',
          height: hovered ? '6px' : '4px',
          borderRadius: '50%',
          background: '#22d3ee',
          transition: 'width 300ms cubic-bezier(0.32,0.72,0,1), height 300ms cubic-bezier(0.32,0.72,0,1), opacity 300ms',
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Ring — lerps */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          width: hovered ? '40px' : '28px',
          height: hovered ? '40px' : '28px',
          borderRadius: '50%',
          border: '1px solid rgba(34,211,238,0.4)',
          transition: 'width 350ms cubic-bezier(0.32,0.72,0,1), height 350ms cubic-bezier(0.32,0.72,0,1), border-color 300ms, opacity 300ms',
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}
