"use client";

import { motion } from "framer-motion";

export default function MultiWaveTransition() {
  return (
    <div className="relative w-full overflow-hidden bg-white" style={{ height: "160px", marginBottom: "-2px" }}>

      {/* Layer 1 — back, lightest */}
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 h-full"
        style={{ width: "calc(100% + 120px)", left: "-60px" }}
      >
        <motion.path
          d="M0,80 C240,20 480,140 720,80 C960,20 1200,140 1440,80 L1440,160 L0,160 Z"
          fill="#1e293b"
          animate={{ x: [0, -60, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Layer 2 — mid */}
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 h-full"
        style={{ width: "calc(100% + 120px)", left: "-60px" }}
      >
        <motion.path
          d="M0,100 C200,40 440,150 720,95 C1000,40 1240,150 1440,100 L1440,160 L0,160 Z"
          fill="#162032"
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>

      {/* Layer 3 — front, matches Testimonials bg */}
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 h-full"
        style={{ width: "calc(100% + 120px)", left: "-60px" }}
      >
        <motion.path
          d="M0,120 C180,70 420,155 720,115 C1020,70 1260,155 1440,120 L1440,160 L0,160 Z"
          fill="#0f172a"
          animate={{ x: [0, -40, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
      </svg>

    </div>
  );
}
