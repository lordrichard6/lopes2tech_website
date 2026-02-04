"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import blogPosts from "@/data/blog-posts.json";

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    image: string;
    author: string;
    authorRole: string;
    tags: string[];
    content: string;
}

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;

    const post = (blogPosts as BlogPost[]).find(p => p.slug === slug);

    if (!post) {
        return (
            <main className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
                    <Link href="/insights" className="text-cyan-400 hover:underline">
                        ← Back to Insights
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0f172a]">
            <Navbar />

            <article className="relative pt-32 pb-20">
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
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(circle at center, transparent 0%, #0f172a 90%)'
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    {/* Back Button */}
                    <Link
                        href="/insights"
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Insights
                    </Link>

                    {/* Header */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-xs font-bold text-cyan-400 bg-cyan-400/10 rounded-full uppercase tracking-wider border border-cyan-400/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Excerpt */}
                        <p className="text-xl text-slate-400 mb-8">
                            {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pb-8 border-b border-white/10">
                            <span className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span className="text-white font-semibold">{post.author}</span>
                                <span className="text-slate-500">• {post.authorRole}</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>
                    </motion.header>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 border border-white/10"
                    >
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-invert prose-lg max-w-none
                            prose-headings:text-white prose-headings:font-bold
                            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-white prose-strong:font-bold
                            prose-em:text-slate-300
                            prose-ul:text-slate-300 prose-ul:my-6
                            prose-ol:text-slate-300 prose-ol:my-6
                            prose-li:my-2
                            prose-code:text-cyan-400 prose-code:bg-cyan-400/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
                            prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                            prose-blockquote:border-l-cyan-400 prose-blockquote:text-slate-400
                            prose-table:border-collapse prose-table:w-full
                            prose-th:border prose-th:border-white/10 prose-th:bg-white/5 prose-th:p-3 prose-th:text-left
                            prose-td:border prose-td:border-white/10 prose-td:p-3"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Author Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-16 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{post.author}</h3>
                                <p className="text-slate-400">{post.authorRole}</p>
                            </div>
                        </div>
                        <p className="text-slate-300">
                            Founder of Lopes2Tech, specializing in AI-powered development workflows and high-performance web applications for Swiss businesses.
                        </p>
                    </motion.div>

                    {/* Back to Insights */}
                    <div className="mt-12 text-center">
                        <Link
                            href="/insights"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to All Insights
                        </Link>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
