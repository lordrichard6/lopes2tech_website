"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();

    // Parallax Transforms - Different speeds for depth perception
    const yTitle = useTransform(scrollY, [0, 500], [0, 150]);
    const yText = useTransform(scrollY, [0, 500], [0, 200]);
    const yButton = useTransform(scrollY, [0, 500], [0, 300]); // Moves fastest (feels closest)
    const yImage = useTransform(scrollY, [0, 500], [0, 50]);   // Moves slowest (feels furthest/heaviest)

    const openCalBooking = () => {
        window.open('https://cal.com/lopes2tech/initial-consult', '_blank', 'noopener,noreferrer');
    };

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative min-h-screen flex items-end pb-[140px] overflow-hidden bg-black"
        >
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                >
                    <source src="/vids/hero.mp4" type="video/mp4" />
                </video>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Circle 1 */}
                    <motion.div
                        animate={{
                            y: [0, -30, 20, 0],
                            x: [0, 20, -15, 0],
                            rotate: [0, 120, 240, 360]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-[80px] h-[80px] top-[20%] left-[10%] rounded-full bg-gradient-to-br from-cyan-500/15 to-cyan-500/10"
                    />
                    {/* Circle 2 */}
                    <motion.div
                        animate={{
                            y: [0, -40, 30, 0],
                            x: [0, -20, 15, 0],
                            rotate: [0, -100, -200, -360]
                        }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute w-[120px] h-[120px] top-[60%] right-[15%] rounded-full bg-gradient-to-br from-cyan-500/15 to-cyan-500/10"
                    />
                    {/* Circle 3 */}
                    <motion.div
                        animate={{
                            y: [0, 20, -20, 0],
                            x: [0, 10, -10, 0],

                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute w-[60px] h-[60px] top-[30%] right-[25%] rounded-full bg-gradient-to-br from-cyan-500/15 to-cyan-500/10"
                    />
                    {/* Circle 4 */}
                    <motion.div
                        animate={{
                            y: [0, -50, 40, 0],
                            rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute w-[100px] h-[100px] bottom-[20%] left-[20%] rounded-full bg-gradient-to-br from-cyan-500/15 to-cyan-500/10"
                    />
                    {/* Circle 5 */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                        className="absolute w-[40px] h-[40px] top-[15%] left-[60%] rounded-full bg-gradient-to-br from-cyan-500/15 to-cyan-500/10"
                    />
                </div>

                {/* Background Waves */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="relative block w-[calc(100%+2rem)] h-[120px]"
                    >
                        <motion.path
                            animate={{ x: [0, -25, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            d="M0,120V73.71c47.79-22.2,103.59-32.17,158-28,70.36,5.37,136.33,33.31,206.8,37.5,73.84,4.36,147.54-16.88,218.2-35.26,69.27-18,138.3-24.88,209.4-13.08,36.15,6,69.85,17.84,104.45,29.34,92.64,30.79,216.14,70.08,303.85,2.52V120Z"
                            className="fill-[#f3f0e7] opacity-25"
                        ></motion.path>
                        <motion.path
                            animate={{ x: [0, -25, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                            d="M0,120V104.19C13,83.08,27.64,63.14,47.69,47.95,99.41,8.73,165,9,224.58,28.42c31.15,10.15,60.09,26.07,89.67,39.8,40.92,19,84.73,46,130.83,49.67,36.26,2.85,70.9-9.42,98.6-31.56,31.77-25.39,62.32-62,103.63-73,40.44-10.79,81.35,6.69,119.13,24.28s75.16,39,116.92,43.05c59.73,5.85,113.28-22.88,168.9-38.84,30.2-8.66,59-6.17,87.09,7.5,22.43,10.89,48,26.93,60.65,49.24V120Z"
                            className="fill-[#f3f0e7] opacity-50"
                        ></motion.path>
                    </svg>
                </div>
            </div>

            {/* Content Container - No single Y transform anymore */}
            <div
                className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 mb-8 md:mb-0 flex flex-col md:flex-row items-end md:justify-between text-left gap-8 md:gap-0"
            >
                <div className="w-full md:max-w-[60%] flex flex-col items-center md:items-start text-center md:text-left relative z-20">
                    <motion.h1
                        style={{ y: yTitle }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-[2.5rem] leading-[1.1] font-extrabold tracking-tight text-white mb-4 md:text-[3.5rem]"
                    >
                        <span className="block neon-text-purple">Websites & Automations</span>
                        <span className="block neon-text-blue">for Service Businesses</span>
                    </motion.h1>

                    <motion.p
                        style={{ y: yText }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-white text-[1rem] md:text-[1.25rem] leading-[1.6] max-w-[700px] mb-8"
                    >
                        We help small and medium companies get more leads, automate admin, and scale without complexity.
                    </motion.p>

                    <motion.div
                        style={{ y: yButton }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex gap-6 mb-8"
                    >
                        <button
                            onClick={openCalBooking}
                            className="group relative px-8 py-4 rounded-xl bg-cyan-500/10 text-white font-semibold border border-[#00f5ff] shadow-[0_0_15px_rgba(0,245,255,0.3),inset_0_0_15px_rgba(0,245,255,0.1)] hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(0,245,255,0.6),inset_0_0_20px_rgba(0,245,255,0.2)] hover:-translate-y-[2px] transition-all flex items-center gap-2 overflow-hidden"
                        >
                            <span className="relative z-10">Talk with me</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />

                            {/* Shiny wipe effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                        </button>
                    </motion.div>
                </div>

                {/* Hero Image - Parallax Effect */}
                <div className="hidden md:block relative w-[60%] h-[700px] z-10 pointer-events-none">
                    <motion.div
                        style={{ y: yImage }}
                        initial={{ opacity: 0, scale: 0.8, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute bottom-[-120px] right-[-50px] w-full h-full flex items-end justify-center"
                    >
                        <Image
                            src="/me_paper.png"
                            alt="Paulo Lopes - Founder of Lopes2Tech"
                            width={800}
                            height={1000}
                            priority
                            className="w-auto h-full max-h-[95vh] object-contain drop-shadow-[0_0_50px_rgba(34,211,238,0.2)] scale-x-[-1]"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Foreground Wave (In Front of Content) */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-[calc(100%+2rem)] h-[120px]"
                >
                    <path
                        d="M0,120V114.37C149.93,61,314.09,48.68,475.83,77.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48-12.24,165.56-35.4C827.93,42.78,886,24.76,951.2,30c86.53,7,172.46,45.71,248.8,84.81V120Z"
                        className="fill-[#f3f0e7]"
                    ></path>
                </svg>
            </div>
        </section>
    );
}
