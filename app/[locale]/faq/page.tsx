"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, MessageCircle } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqs: FAQItem[] = [
    {
        question: "How much does social media management cost in Zurich?",
        answer: "Our AI-powered social media management starts at CHF 249/month for the Social Starter package (8 posts/month, 1 platform). The Social Growth package is CHF 399/month (12 posts, 2 platforms), and Social Pro is CHF 579/month (16 posts, 3 platforms including full engagement management).",
        category: "Social Media"
    },
    {
        question: "What's included in your website packages?",
        answer: "Our website packages range from CHF 600 (Quick Start) to CHF 2,450 (Business Pro). All packages include mobile-responsive design, basic SEO, and professional deployment. Higher tiers include branding, advanced SEO, automation, and CMS integration. We also offer flexible 3-12 month payment plans.",
        category: "Web Design"
    },
    {
        question: "Do you speak German and Portuguese?",
        answer: "Yes! Our founder Paulo speaks fluent English, German, and Portuguese. We serve international clients and understand Swiss business culture. Our website is available in all three languages.",
        category: "General"
    },
    {
        question: "How long does it take to build a website?",
        answer: "Quick Start websites (CHF 600) are delivered in 3-5 days. Standard websites (Starter/Starter Plus) take 1-2 weeks. More complex projects (Business Pro, custom applications) typically take 2-3 weeks depending on features and complexity.",
        category: "Web Design"
    },
    {
        question: "What platforms do you manage for social media?",
        answer: "We manage Instagram, Facebook, LinkedIn, and Google Business Profile. Our packages include 1-3 platforms depending on the tier you choose. We also offer add-ons for additional platforms at CHF 99/month per platform.",
        category: "Social Media"
    },
    {
        question: "Do you provide SEO services?",
        answer: "Yes! Basic SEO (meta tags, sitemap, page optimization) is included in all website packages. We also offer ongoing SEO optimization as part of our Growth Care plan (CHF 179/month) which includes monthly SEO reports and proactive improvements.",
        category: "SEO & Marketing"
    },
    {
        question: "What's the difference between Social Starter, Growth, and Pro?",
        answer: "Social Starter (CHF 249/mo) includes 8 posts/month on 1 platform - perfect for small businesses getting started. Social Growth (CHF 399/mo) adds 12 posts, 2 platforms, Stories, and engagement management - ideal for scaling businesses. Social Pro (CHF 579/mo) delivers 16 posts, 3 platforms, full engagement, monthly strategy calls, and A/B testing - best for ambitious brands.",
        category: "Social Media"
    },
    {
        question: "Can I pay for my website in installments?",
        answer: "Absolutely! We offer 3-month (+5%), 6-month (+10%), and 12-month (+15%) payment plans. For example, a CHF 2,000 website can be paid as CHF 192/month over 12 months. The first payment is due at project start, then automatic monthly billing via Stripe.",
        category: "Pricing & Payments"
    },
    {
        question: "Do you provide photos for social media posts?",
        answer: "You provide the photos (from your phone/business) and we enhance them using professional AI tools - background removal, color correction, upscaling, etc. This keeps costs low while delivering professional results. We don't do photoshoots, but we transform your raw photos into stunning content.",
        category: "Social Media"
    },
    {
        question: "What about video content (Reels)?",
        answer: "Reels and video content are available as add-ons at CHF 79 per video. Video production is more time-intensive, so we price it separately. Let us know your needs and we'll create a custom package.",
        category: "Social Media"
    },
    {
        question: "Do you work with clients outside Zurich?",
        answer: "Yes! We serve all of Switzerland and work remotely with clients in Portugal and internationally. Our base in Zurich means we understand the Swiss market, but our services are available worldwide.",
        category: "General"
    },
    {
        question: "What happens after my website launches?",
        answer: "After launch, you can choose to self-host or use our managed hosting plans (starting CHF 39/month). Our plans include security updates, backups, small content changes, and support. Many clients also add social media management to drive traffic to their new site.",
        category: "Web Design"
    },
    {
        question: "Can you manage paid social media ads?",
        answer: "Yes! Paid ad management is available as an add-on for CHF 199/month. We handle Meta (Facebook/Instagram) and LinkedIn ads - campaign setup, optimization, A/B testing, and monthly reporting. Ad spend is billed separately by the platforms.",
        category: "SEO & Marketing"
    },
    {
        question: "What makes your social media management different?",
        answer: "We use AI to create content 10x faster than traditional agencies, passing those cost savings to you (60-70% cheaper than competitors). AI generates post ideas, captions, and hashtags, then we add the human touch for brand voice and quality. You get speed + quality at unbeatable prices.",
        category: "Social Media"
    },
    {
        question: "Do you offer business automation services?",
        answer: "Yes! We specialize in business automation - lead capture systems (CHF 449), appointment booking (CHF 369), review collection (CHF 329), and custom workflows. We can automate repetitive tasks to save you hours per week.",
        category: "Automation"
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const categories = ["All", ...Array.from(new Set(faqs.map(faq => faq.category)))];
    const filteredFAQs = activeCategory === "All"
        ? faqs
        : faqs.filter(faq => faq.category === activeCategory);

    // FAQ Schema for SEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <main className="min-h-screen bg-[#0f172a] relative">
            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <Navbar />

            {/* Video Background */}
            <div className="fixed inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/vids/dark.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#0f172a]/90" />
            </div>

            {/* Content */}
            <section className="relative z-10 pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Header */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
                            <MessageCircle className="inline w-4 h-4 mr-2" />
                            Frequently Asked Questions
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white">
                            Got Questions?{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                                We've Got Answers
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Everything you need to know about our web design, social media marketing, and automation services in Zurich, Switzerland.
                        </p>
                    </motion.header>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                                    activeCategory === category
                                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                                        : "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* FAQ Items */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        {filteredFAQs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * index }}
                                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="px-2 py-1 text-xs font-medium text-cyan-400 bg-cyan-400/10 rounded-full">
                                                {faq.category}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ml-4 ${
                                            openIndex === index ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5 text-slate-300 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 text-center p-8 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-3xl backdrop-blur-sm"
                    >
                        <h2 className="text-2xl font-bold text-white mb-3">
                            Still have questions?
                        </h2>
                        <p className="text-slate-400 mb-6">
                            Book a free 30-minute consultation to discuss your project
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                        >
                            Contact Us
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
