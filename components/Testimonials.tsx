"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Dr. Maria S.",
        role: "Clinic Director",
        company: "Swiss Health Practice",
        text: "Lopes2Tech transformed our online presence. The booking system integration alone saved us 10+ hours per week. Highly recommended for any healthcare professional.",
        rating: 5,
    },
    {
        name: "Thomas K.",
        role: "Restaurant Owner",
        company: "Gastro Zurich",
        text: "The reservation platform they built reduced our no-shows by 40%. Professional, fast delivery, and the ongoing support is exceptional.",
        rating: 5,
    },
    {
        name: "Ana R.",
        role: "Marketing Manager",
        company: "Swiss Startup",
        text: "Our new website loads in under 2 seconds and our organic traffic increased by 180% in 3 months. The SEO work was outstanding.",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] right-[-5%] w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
                        <Star className="inline w-4 h-4 mr-2" />
                        Client Feedback
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Trusted by Swiss{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                            Businesses
                        </span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Real results from real clients. Here&apos;s what they say about working with us.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/20 transition-all duration-300"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-cyan-400/20" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                &ldquo;{testimonial.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                                    <p className="text-slate-500 text-xs">{testimonial.role} &middot; {testimonial.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
