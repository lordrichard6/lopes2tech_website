"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { useLocale } from "next-intl";
import { blogPostsByLocale } from "@/lib/blog";

export default function TagArchivePage() {
    const params = useParams();
    const locale = useLocale();
    const rawTag = params.tag as string;
    const tag = decodeURIComponent(rawTag);

    const allPosts = [...(blogPostsByLocale[locale] || blogPostsByLocale.en)]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const posts = allPosts.filter(p => p.tags.includes(tag));

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://www.lopes2tech.ch/${locale}` },
            { "@type": "ListItem", "position": 2, "name": "Insights", "item": `https://www.lopes2tech.ch/${locale}/insights` },
            { "@type": "ListItem", "position": 3, "name": tag, "item": `https://www.lopes2tech.ch/${locale}/insights/tag/${rawTag}` },
        ]
    };

    return (
        <main className="min-h-screen bg-[#0f172a]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Navbar />

            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                >
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, #0f172a 90%)' }} />
                </div>

                {/* Floating orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
                    <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[80px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    {/* Back link */}
                    <Link href="/insights" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        All Insights
                    </Link>

                    {/* Header */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
                            <Tag className="w-4 h-4" />
                            Topic
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-white">
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                                {tag}
                            </span>
                        </h1>
                        <p className="text-lg text-slate-400">
                            {posts.length} article{posts.length !== 1 ? 's' : ''} tagged with &ldquo;{tag}&rdquo;
                        </p>
                    </motion.div>

                    {/* Grid */}
                    {posts.length === 0 ? (
                        <p className="text-center text-slate-500 py-16">No articles found for this tag.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, idx) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.08 }}
                                >
                                    <Link href={`/insights/${post.slug}`} className="group block h-full">
                                        <div className="h-full flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-cyan-400/30 transition-all duration-500">
                                            <div className="relative aspect-[16/9] overflow-hidden isolate" style={{ transform: 'translateZ(0)' }}>
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                    priority={idx < 6}
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110 [backface-visibility:hidden]"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                            </div>
                                            <div className="flex-1 flex flex-col p-6">
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {post.tags.slice(0, 2).map((t) => (
                                                        <span key={t} className="px-2 py-1 text-xs font-bold text-cyan-400 bg-cyan-400/10 rounded-full uppercase tracking-wider">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                                <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                                                    {post.title}
                                                </h2>
                                                <p className="text-sm text-slate-400 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                                                <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 border-t border-white/5">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(post.date).toLocaleDateString(
                                                            locale === 'de' ? 'de-CH' : locale === 'pt' ? 'pt-PT' : locale === 'fr' ? 'fr-CH' : locale === 'it' ? 'it-CH' : 'en-GB',
                                                            { month: 'short', day: 'numeric', year: 'numeric' }
                                                        )}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {post.readTime}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
