"use client";

import { motion } from "framer-motion";

export default function Glitch404() {
  return (
    <>
      <style>{`
        /* ── RGB channel split layers ───────────────────────────────── */
        .g-red  { clip-path: inset(0 0 100% 0); animation: glitch-red  5s steps(1) infinite; }
        .g-cyan { clip-path: inset(0 0 100% 0); animation: glitch-cyan 5s steps(1) infinite; animation-delay: -2.5s; }

        /* Red channel — fires twice per cycle, irregular timing */
        @keyframes glitch-red {
          0%,  4%  { clip-path: inset(0 0 100% 0); transform: translateX(0);    opacity: 0; }
          5%        { clip-path: inset(62% 0 18% 0); transform: translateX(-6px); opacity: 0.85; }
          6%        { clip-path: inset(22% 0 65% 0); transform: translateX( 5px); opacity: 0.85; }
          7%        { clip-path: inset(80% 0  5% 0); transform: translateX(-4px); opacity: 0.85; }
          8%,  59%  { clip-path: inset(0 0 100% 0); transform: translateX(0);    opacity: 0; }
          60%       { clip-path: inset(38% 0 48% 0); transform: translateX( 7px); opacity: 0.9; }
          61%       { clip-path: inset( 8% 0 80% 0); transform: translateX(-5px); opacity: 0.9; }
          62%       { clip-path: inset(70% 0 15% 0); transform: translateX( 3px); opacity: 0.9; }
          63%, 100% { clip-path: inset(0 0 100% 0); transform: translateX(0);    opacity: 0; }
        }

        /* Cyan channel — offset timing, slightly different slices */
        @keyframes glitch-cyan {
          0%,  19% { clip-path: inset(0 0 100% 0); transform: translateX(0);    opacity: 0; }
          20%       { clip-path: inset(50% 0 35% 0); transform: translateX( 5px); opacity: 0.8; }
          21%       { clip-path: inset(15% 0 72% 0); transform: translateX(-6px); opacity: 0.8; }
          22%       { clip-path: inset(85% 0  8% 0); transform: translateX( 4px); opacity: 0.8; }
          23%, 79%  { clip-path: inset(0 0 100% 0); transform: translateX(0);    opacity: 0; }
          80%       { clip-path: inset(30% 0 55% 0); transform: translateX(-7px); opacity: 0.85; }
          81%       { clip-path: inset(68% 0 20% 0); transform: translateX( 5px); opacity: 0.85; }
          82%, 100% { clip-path: inset(0 0 100% 0); transform: translateX(0);    opacity: 0; }
        }

        /* Scan line sweeping from bottom to top */
        @keyframes scanline {
          0%   { top: 110%; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: -10%;  opacity: 0; }
        }

        /* Horizontal noise bars that flash during glitch */
        @keyframes noise-bar-1 {
          0%,   4.9% { opacity: 0; transform: scaleY(0) translateY(0); }
          5%,   7.9% { opacity: 1; transform: scaleY(1) translateY(0); }
          8%,  59.9% { opacity: 0; transform: scaleY(0) translateY(0); }
          60%,  62.9% { opacity: 1; transform: scaleY(1) translateY(20px); }
          63%, 100%  { opacity: 0; transform: scaleY(0) translateY(0); }
        }
        @keyframes noise-bar-2 {
          0%,  19.9% { opacity: 0; transform: scaleY(0); }
          20%,  22.9% { opacity: 1; transform: scaleY(1); }
          23%,  79.9% { opacity: 0; transform: scaleY(0); }
          80%,  82.9% { opacity: 1; transform: scaleY(1); }
          83%, 100%   { opacity: 0; transform: scaleY(0); }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative select-none"
        style={{
          fontSize: "clamp(7.5rem, 22vw, 13rem)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {/* Red channel */}
        <span
          className="g-red absolute inset-0 pointer-events-none"
          style={{ color: "#ff2255" }}
          aria-hidden="true"
        >
          404
        </span>

        {/* Cyan channel */}
        <span
          className="g-cyan absolute inset-0 pointer-events-none"
          style={{ color: "#00e5ff" }}
          aria-hidden="true"
        >
          404
        </span>

        {/* Noise bars */}
        <span
          className="absolute left-0 right-0 h-[3px] bg-white/30 pointer-events-none"
          style={{
            top: "40%",
            animation: "noise-bar-1 5s steps(1) infinite",
            opacity: 0,
          }}
          aria-hidden="true"
        />
        <span
          className="absolute left-0 right-0 h-[2px] bg-white/20 pointer-events-none"
          style={{
            top: "70%",
            animation: "noise-bar-2 5s steps(1) infinite",
            animationDelay: "-2.5s",
            opacity: 0,
          }}
          aria-hidden="true"
        />

        {/* Scan line */}
        <span
          className="absolute left-0 right-0 h-[2px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.6) 30%, rgba(6,182,212,0.9) 50%, rgba(6,182,212,0.6) 70%, transparent 100%)",
            boxShadow: "0 0 8px rgba(6,182,212,0.8), 0 0 20px rgba(6,182,212,0.3)",
            animation: "scanline 3.5s linear infinite",
            animationDelay: "1.2s",
            top: "110%",
          }}
          aria-hidden="true"
        />

        {/* Main gradient text — sits on top */}
        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-cyan-300 to-purple-500">
          404
        </span>
      </motion.div>
    </>
  );
}
