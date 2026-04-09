// Clean section divider — replaces the dated animated wave pattern.
// Process (bg-[#080d1a]) → Testimonials (bg-[#0f172a])
// A hairline gradient rule with a subtle radial glow at centre.
export default function MultiWaveTransition() {
  return (
    <div className="relative w-full h-px bg-[#080d1a] overflow-visible">
      {/* Gradient hairline */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Centre glow accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[1px]"
        style={{ background: "radial-gradient(ellipse at center, rgba(34,211,238,0.35) 0%, transparent 70%)" }}
      />
    </div>
  );
}
