"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { Linkedin, Twitter, Instagram, FileText } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#0f172a]">
            <Navbar />

            {/* Small Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-cyan-400 blur-[100px] opacity-30 mix-blend-screen"
                    />
                    <motion.div
                        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 7 }}
                        className="absolute top-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-purple-500 blur-[100px] opacity-30 mix-blend-screen"
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm"
                    >
                        About Us
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 tracking-tight leading-[1.1]"
                    >
                        Innovation That Drives Results
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        We are a Swiss-based technology agency specializing in AI agents, web development, and automated solutions. We believe technology should serve people, not the other way around.
                    </motion.p>
                </div>
            </section>

            {/* Image Gallery Section */}
            <section className="relative py-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { src: "/about/about_01.png", alt: "Lopes2Tech Workspace" },
                            { src: "/about/about_02.png", alt: "Development Process" },
                            { src: "/about/about_03.png", alt: "Team Collaboration" }
                        ].map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Philosophy Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our Philosophy
                        </h2>
                        <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                            We are a Swiss-based technology agency specializing in AI agents, web development, and automated solutions. We believe technology should serve people, not the other way around.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { number: "99.9%", label: "Uptime Guarantee" },
                            { number: "3x", label: "Faster Delivery" },
                            { number: "100%", label: "Client Satisfaction" },
                            { number: "150+", label: "Coffees / Month" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="relative group"
                            >
                                {/* Glassmorphism Card */}
                                <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden transition-all duration-300 group-hover:bg-white/10 group-hover:border-cyan-400/30">
                                    {/* Gradient Border Effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="relative z-10">
                                        <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500 mb-3">
                                            {stat.number}
                                        </div>
                                        <div className="text-sm text-slate-400 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>

                                    {/* Glow Effect */}
                                    <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-cyan-400 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { src: "/about/swiss_alps.png", alt: "Swiss Alps Summer" },
                            { src: "/about/user_coding.png", alt: "Coding at Office" },
                            { src: "/about/zurich_view.png", alt: "Zurich Cityscape" }
                        ].map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About the Founder Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative aspect-square max-w-md mx-auto">
                                {/* Gradient Border */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400 via-purple-500 to-cyan-400 p-[3px]">
                                    <div className="w-full h-full rounded-3xl bg-[#0f172a] overflow-hidden">
                                        <Image
                                            src="/founder.jpg"
                                            alt="Paulo Lopes Reizinho Portrait"
                                            width={500}
                                            height={500}
                                            className="w-full h-full object-cover"
                                            priority
                                        />
                                    </div>
                                </div>

                                {/* Glow Effect */}
                                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-2xl -z-10" />
                            </div>
                        </motion.div>

                        {/* Right: Story & Quote */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                    About the Founder
                                </h2>
                                <div className="space-y-4 text-lg text-slate-400 leading-relaxed">
                                    <p>
                                        I am a Full Stack Developer and the founder of <span className="text-cyan-400 font-semibold">Lopes2Tech</span>, specializing in high-performance websites, intelligent automations, and AI-driven web applications. Based in Zurich but originally from Portugal (where <em>Bacalhau à Brás</em> and <em>Pastéis de Nata</em> are a religion), I combine technical precision with a deep passion for digital innovation.
                                    </p>
                                    <p>
                                        My professional character is defined by a relentless drive to solve complex problems. I don&apos;t just write code; I architect digital ecosystems. From scalable SaaS platforms to autonomous AI agents, I leverage a modern stack—including <span className="text-white">Next.js, TypeScript, Python, and Supabase</span>—to deliver solutions that are as robust as they are beautiful.
                                    </p>
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-purple-500/10 border border-cyan-400/20 backdrop-blur-sm">
                                <div className="absolute top-4 left-4 text-6xl text-cyan-400/30 font-serif">&quot;</div>
                                <p className="relative z-10 text-xl text-white font-medium italic pl-8">
                                    I simplify the digital landscape for businesses, building custom automations and web apps that work for you while you enjoy a Pastél de Nata.
                                </p>
                            </div>

                            {/* Social Links */}
                            <div>
                                <p className="text-sm text-slate-500 mb-4">Connect with me</p>
                                <div className="flex gap-4">
                                    <Link
                                        href="https://www.linkedin.com/in/pauloreizinho/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-cyan-400/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-all duration-300"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href="https://x.com/paulo_reizinho4"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-cyan-400/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-all duration-300"
                                    >
                                        <Twitter className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href="https://www.instagram.com/paulo_reizinho/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-cyan-400/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-all duration-300"
                                    >
                                        <Instagram className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href="https://medium.com/@paulolopesreizinho"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-cyan-400/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-all duration-300"
                                    >
                                        <FileText className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTA />

            <Footer />
        </main>
    );
}
