/**
 * GrainOverlay — fixed SVG noise texture at 3% opacity.
 * Creates the physical, expensive feel of Vercel/Linear/Resend.
 * Uses pointer-events:none and z-index:9998 (below any modal).
 * Performance: SVG feTurbulence renders once, no JS, no animation.
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998] select-none motion-reduce:hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.035,
        mixBlendMode: 'overlay',
      }}
    />
  );
}
